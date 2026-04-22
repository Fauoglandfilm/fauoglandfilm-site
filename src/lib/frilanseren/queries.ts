import "server-only";

import { redirect } from "next/navigation";

import { createServerComponentClient } from "@/lib/supabase/serverClient";

import type { FrilanserenUserContext, UserRole } from "./types";

export async function getCurrentUserContext(): Promise<FrilanserenUserContext | null> {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id || !user.email) {
    return null;
  }

  const { data: userMeta } = await supabase
    .from("users_meta")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!userMeta) {
    return {
      userId: user.id,
      email: user.email,
      userMeta: null,
      employerProfile: null,
      freelancerProfile: null,
    };
  }

  if (userMeta.role === "employer") {
    const { data: employerProfile } = await supabase
      .from("employer_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    return {
      userId: user.id,
      email: user.email,
      userMeta,
      employerProfile,
      freelancerProfile: null,
    };
  }

  const { data: freelancerProfile } = await supabase
    .from("freelancer_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    userId: user.id,
    email: user.email,
    userMeta,
    employerProfile: null,
    freelancerProfile,
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
