import "server-only";

import { redirect } from "next/navigation";

import { createServerComponentClient } from "@/lib/supabase/serverClient";

import { isAllowedSalgscoachEmail } from "./access-policy";

export function isSalgscoachUser(email: string | null | undefined) {
  return isAllowedSalgscoachEmail(
    email,
    process.env.SALGSCOACH_ALLOWED_EMAILS,
  );
}

export async function hasActiveSalgscoachMembership(
  supabase: Awaited<ReturnType<typeof createServerComponentClient>>,
  userId: string,
) {
  const { data, error } = await supabase
    .from("salgscoach_members")
    .select("user_id")
    .eq("user_id", userId)
    .eq("active", true)
    .maybeSingle();

  return !error && data?.user_id === userId;
}

export async function requireSalgscoachUser() {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    redirect("/salgscoach/login");
  }
  if (!isSalgscoachUser(user.email)) {
    redirect("/salgscoach/login?error=no_access");
  }
  if (!(await hasActiveSalgscoachMembership(supabase, user.id))) {
    redirect("/salgscoach/login?error=no_access");
  }

  return { supabase, user };
}
