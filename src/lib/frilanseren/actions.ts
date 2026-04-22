"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createAdminClient, createServerComponentClient } from "@/lib/supabase/serverClient";
import { getRequestMetadata } from "@/lib/supabase/auth";

import {
  ACCESS_REQUEST_SUCCESS_MESSAGE,
  DELETE_REQUEST_SUCCESS_MESSAGE,
  getConsentTextVersion,
} from "./gdpr";
import { requireCurrentUserContext } from "./queries";
import type { FrilanserenActionState } from "./types";
import {
  employerProfileSchema,
  employerRegistrationSchema,
  freelancerProfileSchema,
  freelancerRegistrationSchema,
} from "./validation";

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

function getGenericServerErrorMessage() {
  return "Vi kunne ikke lagre informasjonen akkurat nå. Prøv igjen.";
}

function mapSupabaseRegistrationError(message: string | undefined) {
  if (!message) {
    return getGenericServerErrorMessage();
  }

  if (message.toLowerCase().includes("already registered")) {
    return "Denne e-postadressen er allerede registrert.";
  }

  if (message.toLowerCase().includes("password")) {
    return "Passordet må være lengre. Minst 10 tegn.";
  }

  return getGenericServerErrorMessage();
}

async function createConsentLog(userId: string) {
  const admin = createAdminClient();
  const metadata = await getRequestMetadata();

  await admin.from("consent_logs").insert({
    user_id: userId,
    consent_type: "pilot_account",
    consent_text_version: getConsentTextVersion(),
    ip_address: metadata.ipAddress,
    user_agent: metadata.userAgent,
  });
}

async function logAdminAction(action: string, targetUserId: string, metadata: Record<string, unknown>) {
  const admin = createAdminClient();

  await admin.from("admin_audit_logs").insert({
    admin_user_id: null,
    action,
    target_user_id: targetUserId,
    metadata,
  });
}

export async function registerEmployerAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
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

  const supabase = await createServerComponentClient();
  const { data, error } = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/confirm?next=/frilanseren/dashboard`,
    },
  });

  if (error || !data.user) {
    return {
      status: "error",
      message: mapSupabaseRegistrationError(error?.message),
    };
  }

  const admin = createAdminClient();

  await admin.from("users_meta").upsert({
    id: data.user.id,
    role: "employer",
    full_name: payload.data.full_name,
  });

  await admin.from("employer_profiles").upsert({
    user_id: data.user.id,
    company_name: payload.data.company_name,
    production_types: payload.data.production_types,
    annual_volume: payload.data.annual_volume,
  });

  await createConsentLog(data.user.id);
  await logAdminAction("employer_registered", data.user.id, {
    role: "employer",
  });

  if (data.session) {
    redirect("/frilanseren/dashboard");
  }

  return {
    status: "success",
    message:
      "Du er med i piloten. Bekreft e-posten din for å aktivere kontoen. Når vi er klare til å teste jobbmatching, kontakter vi deg med konkrete forslag til hvordan vi kan fylle neste produksjon.",
  };
}

export async function registerFreelancerAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
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

  const supabase = await createServerComponentClient();
  const { data, error } = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/confirm?next=/frilanseren/dashboard`,
    },
  });

  if (error || !data.user) {
    return {
      status: "error",
      message: mapSupabaseRegistrationError(error?.message),
    };
  }

  const admin = createAdminClient();

  await admin.from("users_meta").upsert({
    id: data.user.id,
    role: "freelancer",
    full_name: payload.data.full_name,
  });

  await admin.from("freelancer_profiles").upsert({
    user_id: data.user.id,
    roles: payload.data.roles,
    experience_level: payload.data.experience_level,
  });

  await createConsentLog(data.user.id);
  await logAdminAction("freelancer_registered", data.user.id, {
    role: "freelancer",
  });

  if (data.session) {
    redirect("/frilanseren/dashboard");
  }

  return {
    status: "success",
    message:
      "Du er med i piloten. Bekreft e-posten din for å aktivere kontoen. Når vi åpner for jobbmatching, får du beskjed og blir prioritert i de første pilotoppdragene.",
  };
}

export async function updateEmployerProfileAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();

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

  const supabase = await createServerComponentClient();

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
    });

  if (userMetaError || profileError) {
    return {
      status: "error",
      message: getGenericServerErrorMessage(),
    };
  }

  return {
    status: "success",
    message: "Profilen din er oppdatert.",
  };
}

export async function updateFreelancerProfileAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();

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

  const supabase = await createServerComponentClient();

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
    });

  if (userMetaError || profileError) {
    return {
      status: "error",
      message: getGenericServerErrorMessage(),
    };
  }

  return {
    status: "success",
    message: "Profilen din er oppdatert.",
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
