import "server-only";

import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import { hasSupabaseAdminConfig, isFrilanserenAdminEmail } from "@/lib/env";
import { createAdminClient, createServerComponentClient } from "@/lib/supabase/serverClient";

import { FRILANSEREN_MEDIA_BUCKET } from "./constants";
import type { FrilanserenUserContext, RegisteredUserOverview, UserRole } from "./types";

function isAdminAuthUser(user: Pick<User, "email" | "app_metadata"> | null | undefined) {
  if (!user) {
    return false;
  }

  return user.app_metadata?.role === "admin" || isFrilanserenAdminEmail(user.email);
}

async function createSignedImageUrl(path: string | null | undefined) {
  if (!path || !hasSupabaseAdminConfig()) {
    return null;
  }

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from(FRILANSEREN_MEDIA_BUCKET)
    .createSignedUrl(path, 60 * 60);

  if (error) {
    console.error("[frilanseren/signed-image-url-failed]", {
      path,
      message: error.message,
    });
    return null;
  }

  return data.signedUrl;
}

export async function getCurrentUserContext(): Promise<FrilanserenUserContext | null> {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id || !user.email) {
    return null;
  }

  const isAdmin = isAdminAuthUser(user);

  const { data: userMeta } = await supabase
    .from("users_meta")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!userMeta) {
    return {
      userId: user.id,
      email: user.email,
      isAdmin,
      userMeta: null,
      employerProfile: null,
      freelancerProfile: null,
      profileImageUrl: null,
    };
  }

  if (userMeta.role === "employer") {
    const { data: employerProfile } = await supabase
      .from("employer_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    const profileImageUrl = await createSignedImageUrl(employerProfile?.logo_path);

    return {
      userId: user.id,
      email: user.email,
      isAdmin,
      userMeta,
      employerProfile,
      freelancerProfile: null,
      profileImageUrl,
    };
  }

  const { data: freelancerProfile } = await supabase
    .from("freelancer_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const profileImageUrl = await createSignedImageUrl(freelancerProfile?.profile_image_path);

  return {
    userId: user.id,
    email: user.email,
    isAdmin,
    userMeta,
    employerProfile: null,
    freelancerProfile,
    profileImageUrl,
  };
}

export async function requireCurrentUserContext() {
  const context = await getCurrentUserContext();

  if (!context) {
    redirect("/frilanseren/login");
  }

  return context;
}

export async function getCurrentRole(): Promise<UserRole | null> {
  const context = await getCurrentUserContext();
  return context?.userMeta?.role ?? null;
}

export async function requireAdminUser() {
  const context = await requireCurrentUserContext();

  if (!context.isAdmin) {
    redirect("/frilanseren/dashboard");
  }

  return context;
}

async function listAllAuthUsers() {
  const admin = createAdminClient();
  const users: User[] = [];
  const perPage = 200;

  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });

    if (error) {
      throw error;
    }

    const batch = data.users ?? [];
    users.push(...batch);

    if (batch.length < perPage) {
      break;
    }
  }

  return users;
}

export async function listRegisteredUsersForAdmin(): Promise<RegisteredUserOverview[]> {
  if (!hasSupabaseAdminConfig()) {
    return [];
  }

  const admin = createAdminClient();
  const [authUsers, userMetaRows, employerRows, freelancerRows] = await Promise.all([
    listAllAuthUsers(),
    admin.from("users_meta").select("*").order("created_at", { ascending: false }),
    admin.from("employer_profiles").select("*"),
    admin.from("freelancer_profiles").select("*"),
  ]);

  if (userMetaRows.error) {
    throw userMetaRows.error;
  }

  if (employerRows.error) {
    throw employerRows.error;
  }

  if (freelancerRows.error) {
    throw freelancerRows.error;
  }

  const authById = new Map(authUsers.map((user) => [user.id, user]));
  const userMetaById = new Map((userMetaRows.data ?? []).map((row) => [row.id, row]));
  const employerById = new Map((employerRows.data ?? []).map((row) => [row.user_id, row]));
  const freelancerById = new Map((freelancerRows.data ?? []).map((row) => [row.user_id, row]));
  const ids = new Set<string>([
    ...authById.keys(),
    ...userMetaById.keys(),
    ...employerById.keys(),
    ...freelancerById.keys(),
  ]);

  const imagePathById = new Map<string, string>();

  ids.forEach((id) => {
    const employerProfile = employerById.get(id);
    const freelancerProfile = freelancerById.get(id);
    const imagePath = employerProfile?.logo_path ?? freelancerProfile?.profile_image_path ?? null;

    if (imagePath) {
      imagePathById.set(id, imagePath);
    }
  });

  const signedUrlEntries = await Promise.all(
    Array.from(imagePathById.entries()).map(async ([id, path]) => {
      const { data, error } = await admin.storage
        .from(FRILANSEREN_MEDIA_BUCKET)
        .createSignedUrl(path, 60 * 60);

      if (error) {
        console.error("[frilanseren/admin-signed-image-url-failed]", {
          userId: id,
          path,
          message: error.message,
        });
        return [id, null] as const;
      }

      return [id, data.signedUrl] as const;
    }),
  );

  const signedUrlById = new Map(signedUrlEntries);

  return Array.from(ids)
    .map((id) => {
      const authUser = authById.get(id);
      const userMeta = userMetaById.get(id);
      const employerProfile = employerById.get(id);
      const freelancerProfile = freelancerById.get(id);
      const createdAt = authUser?.created_at ?? userMeta?.created_at ?? null;

      return {
        id,
        email: authUser?.email ?? null,
        emailConfirmedAt: authUser?.email_confirmed_at ?? authUser?.confirmed_at ?? null,
        lastSignInAt: authUser?.last_sign_in_at ?? null,
        createdAt,
        role: userMeta?.role ?? null,
        fullName: userMeta?.full_name ?? null,
        companyName: employerProfile?.company_name ?? null,
        productionTypes: employerProfile?.production_types ?? [],
        annualVolume: employerProfile?.annual_volume ?? null,
        freelancerRoles: freelancerProfile?.roles ?? [],
        experienceLevel: freelancerProfile?.experience_level ?? null,
        deletedAt: userMeta?.deleted_at ?? null,
        imageUrl: signedUrlById.get(id) ?? null,
        imageLabel:
          userMeta?.role === "employer" ? "Logo" : userMeta?.role === "freelancer" ? "Profilbilde" : null,
        hasProfileRecord: Boolean(userMeta),
      } satisfies RegisteredUserOverview;
    })
    .sort((left, right) => {
      const leftTime = left.createdAt ? new Date(left.createdAt).getTime() : 0;
      const rightTime = right.createdAt ? new Date(right.createdAt).getTime() : 0;
      return rightTime - leftTime;
    });
}
