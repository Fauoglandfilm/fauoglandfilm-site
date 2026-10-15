"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { hasSupabaseAuthConfig } from "@/lib/env";
import { createServerComponentClient } from "@/lib/supabase/serverClient";

import { isSalgscoachUser } from "./access";
import { safeSalgscoachPath } from "./access-policy";

export type SalgscoachAuthState = {
  status: "idle" | "error";
  message?: string;
};

const loginSchema = z.object({
  email: z.string().trim().email().max(320),
  // This is login, not password creation: accept every non-empty password that
  // Supabase may already consider valid.
  password: z.string().min(1).max(200),
});

const genericLoginError: SalgscoachAuthState = {
  status: "error",
  message: "Feil e-post eller passord.",
};

export async function signInSalgscoachAction(
  _previous: SalgscoachAuthState,
  formData: FormData,
): Promise<SalgscoachAuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const next = safeSalgscoachPath(formData.get("next"));

  if (!parsed.success || !hasSupabaseAuthConfig()) {
    return genericLoginError;
  }

  const supabase = await createServerComponentClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !isSalgscoachUser(data.user?.email)) {
    await supabase.auth.signOut();
    return genericLoginError;
  }

  redirect(next);
}

export async function signOutSalgscoachAction() {
  if (hasSupabaseAuthConfig()) {
    const supabase = await createServerComponentClient();
    await supabase.auth.signOut();
  }
  redirect("/salgscoach/login");
}
