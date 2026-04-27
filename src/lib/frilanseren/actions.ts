"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { hasSupabaseAdminConfig, hasSupabaseAuthConfig, missingSupabaseEnvs } from "@/lib/env";
import { absoluteAuthUrl, getRequestMetadata } from "@/lib/supabase/auth";
import { createAdminClient, createServerComponentClient } from "@/lib/supabase/serverClient";

import { FRILANSEREN_MEDIA_BUCKET } from "./constants";
import {
  ACCESS_REQUEST_SUCCESS_MESSAGE,
  DELETE_REQUEST_SUCCESS_MESSAGE,
  getConsentTextVersion,
} from "./gdpr";
import { buildProfileImagePath, getUploadedFile, validateImageFile } from "./media";
import { requireCurrentUserContext } from "./queries";
import {
  DUPLICATE_EMAIL_MESSAGE,
  findMatchingUserByEmail,
  looksLikeObfuscatedExistingUser,
  mapRegistrationErrorMessage,
} from "./signup";
import type { FrilanserenActionState } from "./types";
import {
  employerProfileSchema,
  employerRegistrationSchema,
  freelancerProfileSchema,
  freelancerRegistrationSchema,
} from "./validation";

type AdminClient = ReturnType<typeof createAdminClient>;

function issueMapToFieldErrors(error: z.ZodError) {
  return Object.fromEntries(
    error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
  );
}

function stringArrayFromFormData(formData: FormData, field: string) {
  return formData
    .getAll(field)
    .map((value) => String(value).trim())
    .filter(Boolean);
}

function registrationUnavailableState(): FrilanserenActionState {
  console.error("[frilanseren/registration-unavailable]", {
    missing: missingSupabaseEnvs({ includeAdmin: true }),
  });

  return {
    status: "error",
    message:
      "Registrering er midlertidig utilgjengelig. Vi jobber med å få det opp igjen. Prøv igjen om litt.",
  };
}

function getGenericServerErrorMessage() {
  return "Vi kunne ikke lagre informasjonen akkurat nå. Prøv igjen.";
}

function getRegistrationImageWarning(role: "employer" | "freelancer") {
  return role === "employer"
    ? "Kontoen ble opprettet, men firmalogoen kunne ikke lagres akkurat nå."
    : "Kontoen ble opprettet, men profilbildet kunne ikke lagres akkurat nå.";
}

function getProfileUpdateImageWarning(role: "employer" | "freelancer") {
  return role === "employer"
    ? "Profilen din er oppdatert, men firmalogoen kunne ikke lagres akkurat nå."
    : "Profilen din er oppdatert, men profilbildet kunne ikke lagres akkurat nå.";
}

async function createConsentLog(userId: string, admin: AdminClient) {
  const metadata = await getRequestMetadata();
  const { error } = await admin.from("consent_logs").insert({
    user_id: userId,
    consent_type: "pilot_account",
    consent_text_version: getConsentTextVersion(),
    ip_address: metadata.ipAddress,
    user_agent: metadata.userAgent,
  });

  if (error) {
    throw error;
  }
}

async function logAdminAction(
  action: string,
  targetUserId: string,
  metadata: Record<string, unknown>,
  admin?: AdminClient,
) {
  if (!hasSupabaseAdminConfig()) {
    return;
  }

  const client = admin ?? createAdminClient();
  const { error } = await client.from("admin_audit_logs").insert({
    admin_user_id: null,
    action,
    target_user_id: targetUserId,
    metadata,
  });

  if (error) {
    console.error("[frilanseren/admin-audit-log-failed]", {
      action,
      targetUserId,
      message: error.message,
    });
  }
}

async function cleanupFailedRegistration(userId: string) {
  if (!hasSupabaseAdminConfig()) {
    return;
  }

  try {
    const admin = createAdminClient();
    const { error } = await admin.auth.admin.deleteUser(userId);

    if (error) {
      console.error("[frilanseren/registration-cleanup-failed]", {
        userId,
        message: error.message,
      });
    }
  } catch (error) {
    console.error("[frilanseren/registration-cleanup-threw]", {
      userId,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

async function findExistingAuthUserByEmail(admin: AdminClient, email: string) {
  const perPage = 200;

  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });

    if (error) {
      throw error;
    }

    const batch = data.users ?? [];
    const existingUser = findMatchingUserByEmail(batch, email);

    if (existingUser) {
      return existingUser;
    }

    if (batch.length < perPage) {
      break;
    }
  }

  return null;
}

async function uploadProfileImage(
  admin: AdminClient,
  userId: string,
  role: "employer" | "freelancer",
  file: File | null,
  previousPath?: string | null,
) {
  if (!file) {
    return {
      path: previousPath ?? null,
      failed: false,
    };
  }

  const path = buildProfileImagePath(userId, role, file);
  const { error } = await admin.storage
    .from(FRILANSEREN_MEDIA_BUCKET)
    .upload(path, await file.arrayBuffer(), {
      contentType: file.type,
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("[frilanseren/profile-image-upload-failed]", {
      userId,
      role,
      message: error.message,
    });

    return {
      path: previousPath ?? null,
      failed: true,
    };
  }

  if (previousPath && previousPath !== path) {
    const { error: removeError } = await admin.storage.from(FRILANSEREN_MEDIA_BUCKET).remove([previousPath]);

    if (removeError) {
      console.error("[frilanseren/profile-image-remove-old-failed]", {
        userId,
        role,
        previousPath,
        message: removeError.message,
      });
    }
  }

  return {
    path,
    failed: false,
  };
}

export async function registerEmployerAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const logoFile = getUploadedFile(formData, "company_logo");
  const payload = employerRegistrationSchema.safeParse({
    full_name: formData.get("full_name"),
    company_name: formData.get("company_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    production_types: stringArrayFromFormData(formData, "production_types"),
    annual_volume: formData.get("annual_volume"),
    consent: formData.get("consent") === "on",
  });

  if (!payload.success) {
    return {
      status: "error",
      fieldErrors: issueMapToFieldErrors(payload.error),
    };
  }

  const logoError = validateImageFile(logoFile);

  if (logoError) {
    return {
      status: "error",
      fieldErrors: {
        company_logo: logoError,
      },
    };
  }

  if (!hasSupabaseAuthConfig() || !hasSupabaseAdminConfig()) {
    return registrationUnavailableState();
  }

  const admin = createAdminClient();

  try {
    const existingUser = await findExistingAuthUserByEmail(admin, payload.data.email);

    if (existingUser) {
      return {
        status: "error",
        message: DUPLICATE_EMAIL_MESSAGE,
      };
    }
  } catch (error) {
    console.error("[frilanseren/register-employer-precheck-failed]", {
      email: payload.data.email,
      message: error instanceof Error ? error.message : String(error),
    });

    return {
      status: "error",
      message: getGenericServerErrorMessage(),
    };
  }

  const supabase = await createServerComponentClient();
  const { data, error } = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      emailRedirectTo: absoluteAuthUrl("/auth/confirm?next=/frilanseren/dashboard"),
      data: {
        full_name: payload.data.full_name,
        role: "employer",
        company_name: payload.data.company_name,
      },
    },
  });

  if (error || !data.user) {
    return {
      status: "error",
      message: mapRegistrationErrorMessage(error?.message),
    };
  }

  if (looksLikeObfuscatedExistingUser(data.user)) {
    return {
      status: "error",
      message: DUPLICATE_EMAIL_MESSAGE,
    };
  }

  try {
    const uploadResult = await uploadProfileImage(admin, data.user.id, "employer", logoFile);

    const { error: userMetaError } = await admin.from("users_meta").upsert({
      id: data.user.id,
      role: "employer",
      full_name: payload.data.full_name,
    });

    if (userMetaError) {
      throw userMetaError;
    }

    const { error: profileError } = await admin.from("employer_profiles").upsert({
      user_id: data.user.id,
      company_name: payload.data.company_name,
      production_types: payload.data.production_types,
      annual_volume: payload.data.annual_volume,
      logo_path: uploadResult.path,
    });

    if (profileError) {
      throw profileError;
    }

    await createConsentLog(data.user.id, admin);
    await logAdminAction(
      "employer_registered",
      data.user.id,
      {
        role: "employer",
      },
      admin,
    );

    if (data.session) {
      redirect("/frilanseren/dashboard");
    }

    return {
      status: "success",
      message: uploadResult.failed
        ? `Vi har sendt deg en bekreftelseslenke på e-post. Bekreft e-posten din for å aktivere kontoen. ${getRegistrationImageWarning("employer")}`
        : "Vi har sendt deg en bekreftelseslenke på e-post. Bekreft e-posten din for å aktivere kontoen. Når vi er klare til å teste jobbmatching, kontakter vi deg med konkrete forslag til hvordan vi kan fylle neste produksjon.",
    };
  } catch (adminError) {
    await cleanupFailedRegistration(data.user.id);

    console.error("[frilanseren/register-employer-failed]", {
      userId: data.user.id,
      message: adminError instanceof Error ? adminError.message : String(adminError),
    });

    return {
      status: "error",
      message: getGenericServerErrorMessage(),
    };
  }
}

export async function registerFreelancerAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const profileImageFile = getUploadedFile(formData, "profile_image");
  const payload = freelancerRegistrationSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    roles: stringArrayFromFormData(formData, "roles"),
    experience_level: formData.get("experience_level"),
    consent: formData.get("consent") === "on",
  });

  if (!payload.success) {
    return {
      status: "error",
      fieldErrors: issueMapToFieldErrors(payload.error),
    };
  }

  const profileImageError = validateImageFile(profileImageFile);

  if (profileImageError) {
    return {
      status: "error",
      fieldErrors: {
        profile_image: profileImageError,
      },
    };
  }

  if (!hasSupabaseAuthConfig() || !hasSupabaseAdminConfig()) {
    return registrationUnavailableState();
  }

  const admin = createAdminClient();

  try {
    const existingUser = await findExistingAuthUserByEmail(admin, payload.data.email);

    if (existingUser) {
      return {
        status: "error",
        message: DUPLICATE_EMAIL_MESSAGE,
      };
    }
  } catch (error) {
    console.error("[frilanseren/register-freelancer-precheck-failed]", {
      email: payload.data.email,
      message: error instanceof Error ? error.message : String(error),
    });

    return {
      status: "error",
      message: getGenericServerErrorMessage(),
    };
  }

  const supabase = await createServerComponentClient();
  const { data, error } = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      emailRedirectTo: absoluteAuthUrl("/auth/confirm?next=/frilanseren/dashboard"),
      data: {
        full_name: payload.data.full_name,
        role: "freelancer",
      },
    },
  });

  if (error || !data.user) {
    return {
      status: "error",
      message: mapRegistrationErrorMessage(error?.message),
    };
  }

  if (looksLikeObfuscatedExistingUser(data.user)) {
    return {
      status: "error",
      message: DUPLICATE_EMAIL_MESSAGE,
    };
  }

  try {
    const uploadResult = await uploadProfileImage(admin, data.user.id, "freelancer", profileImageFile);

    const { error: userMetaError } = await admin.from("users_meta").upsert({
      id: data.user.id,
      role: "freelancer",
      full_name: payload.data.full_name,
    });

    if (userMetaError) {
      throw userMetaError;
    }

    const { error: profileError } = await admin.from("freelancer_profiles").upsert({
      user_id: data.user.id,
      roles: payload.data.roles,
      experience_level: payload.data.experience_level,
      profile_image_path: uploadResult.path,
    });

    if (profileError) {
      throw profileError;
    }

    await createConsentLog(data.user.id, admin);
    await logAdminAction(
      "freelancer_registered",
      data.user.id,
      {
        role: "freelancer",
      },
      admin,
    );

    if (data.session) {
      redirect("/frilanseren/dashboard");
    }

    return {
      status: "success",
      message: uploadResult.failed
        ? `Vi har sendt deg en bekreftelseslenke på e-post. Bekreft e-posten din for å aktivere kontoen. ${getRegistrationImageWarning("freelancer")}`
        : "Vi har sendt deg en bekreftelseslenke på e-post. Bekreft e-posten din for å aktivere kontoen. Når vi åpner for jobbmatching, får du beskjed og blir prioritert i de første pilotoppdragene.",
    };
  } catch (adminError) {
    await cleanupFailedRegistration(data.user.id);

    console.error("[frilanseren/register-freelancer-failed]", {
      userId: data.user.id,
      message: adminError instanceof Error ? adminError.message : String(adminError),
    });

    return {
      status: "error",
      message: getGenericServerErrorMessage(),
    };
  }
}

export async function updateEmployerProfileAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();
  const logoFile = getUploadedFile(formData, "company_logo");

  const payload = employerProfileSchema.safeParse({
    full_name: formData.get("full_name"),
    company_name: formData.get("company_name"),
    production_types: stringArrayFromFormData(formData, "production_types"),
    annual_volume: formData.get("annual_volume"),
  });

  if (!payload.success) {
    return {
      status: "error",
      fieldErrors: issueMapToFieldErrors(payload.error),
    };
  }

  const logoError = validateImageFile(logoFile);

  if (logoError) {
    return {
      status: "error",
      fieldErrors: {
        company_logo: logoError,
      },
    };
  }

  const supabase = await createServerComponentClient();
  const admin = hasSupabaseAdminConfig() ? createAdminClient() : null;
  const uploadResult = admin
    ? await uploadProfileImage(admin, context.userId, "employer", logoFile, context.employerProfile?.logo_path)
    : {
        path: context.employerProfile?.logo_path ?? null,
        failed: Boolean(logoFile),
      };

  const { error: userMetaError } = await supabase
    .from("users_meta")
    .update({
      full_name: payload.data.full_name,
    })
    .eq("id", context.userId);

  const { error: profileError } = await supabase
    .from("employer_profiles")
    .upsert({
      user_id: context.userId,
      company_name: payload.data.company_name,
      production_types: payload.data.production_types,
      annual_volume: payload.data.annual_volume,
      logo_path: uploadResult.path,
    });

  if (userMetaError || profileError) {
    return {
      status: "error",
      message: getGenericServerErrorMessage(),
    };
  }

  return {
    status: "success",
    message: uploadResult.failed ? getProfileUpdateImageWarning("employer") : "Profilen din er oppdatert.",
  };
}

export async function updateFreelancerProfileAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();
  const profileImageFile = getUploadedFile(formData, "profile_image");

  const payload = freelancerProfileSchema.safeParse({
    full_name: formData.get("full_name"),
    roles: stringArrayFromFormData(formData, "roles"),
    experience_level: formData.get("experience_level"),
  });

  if (!payload.success) {
    return {
      status: "error",
      fieldErrors: issueMapToFieldErrors(payload.error),
    };
  }

  const profileImageError = validateImageFile(profileImageFile);

  if (profileImageError) {
    return {
      status: "error",
      fieldErrors: {
        profile_image: profileImageError,
      },
    };
  }

  const supabase = await createServerComponentClient();
  const admin = hasSupabaseAdminConfig() ? createAdminClient() : null;
  const uploadResult = admin
    ? await uploadProfileImage(
        admin,
        context.userId,
        "freelancer",
        profileImageFile,
        context.freelancerProfile?.profile_image_path,
      )
    : {
        path: context.freelancerProfile?.profile_image_path ?? null,
        failed: Boolean(profileImageFile),
      };

  const { error: userMetaError } = await supabase
    .from("users_meta")
    .update({
      full_name: payload.data.full_name,
    })
    .eq("id", context.userId);

  const { error: profileError } = await supabase
    .from("freelancer_profiles")
    .upsert({
      user_id: context.userId,
      roles: payload.data.roles,
      experience_level: payload.data.experience_level,
      profile_image_path: uploadResult.path,
    });

  if (userMetaError || profileError) {
    return {
      status: "error",
      message: getGenericServerErrorMessage(),
    };
  }

  return {
    status: "success",
    message: uploadResult.failed ? getProfileUpdateImageWarning("freelancer") : "Profilen din er oppdatert.",
  };
}

export async function requestAccessDataAction(
  previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  void previousState;
  void formData;

  const context = await requireCurrentUserContext();
  const supabase = await createServerComponentClient();

  const { error } = await supabase.from("data_requests").insert({
    user_id: context.userId,
    request_type: "access",
    status: "open",
  });

  if (error) {
    return {
      status: "error",
      message: getGenericServerErrorMessage(),
    };
  }

  await logAdminAction("data_access_requested", context.userId, {
    source: "frilanseren_dashboard",
  });

  return {
    status: "success",
    message: ACCESS_REQUEST_SUCCESS_MESSAGE,
  };
}

export async function requestAccountDeletionAction() {
  const context = await requireCurrentUserContext();
  const supabase = await createServerComponentClient();
  const timestamp = new Date().toISOString();

  await supabase
    .from("users_meta")
    .update({
      deleted_at: timestamp,
    })
    .eq("id", context.userId);

  await supabase.from("data_requests").insert({
    user_id: context.userId,
    request_type: "delete",
    status: "open",
  });

  await logAdminAction("account_deletion_requested", context.userId, {
    source: "frilanseren_dashboard",
  });

  await supabase.auth.signOut();

  const params = new URLSearchParams({
    message: DELETE_REQUEST_SUCCESS_MESSAGE,
  });

  redirect(`/frilanseren/login?${params.toString()}`);
}
