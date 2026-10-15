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

  return { supabase, user };
}
