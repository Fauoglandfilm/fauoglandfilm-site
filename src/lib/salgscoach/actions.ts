"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { hasSalgscoachAuthConfig } from "./config";
import { createSalgscoachServerClient } from "./supabase";

import {
  hasActiveSalgscoachMembership,
  isSalgscoachUser,
} from "./access";
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

  if (!parsed.success || !hasSalgscoachAuthConfig()) {
    return genericLoginError;
  }

  const supabase = await createSalgscoachServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  const hasAccess =
    !error &&
    Boolean(data.user?.id) &&
    isSalgscoachUser(data.user?.email) &&
    (await hasActiveSalgscoachMembership(supabase, data.user!.id));

  if (!hasAccess) {
    await supabase.auth.signOut();
    return genericLoginError;
  }

  redirect(next);
}

export async function signOutSalgscoachAction() {
  if (hasSalgscoachAuthConfig()) {
    const supabase = await createSalgscoachServerClient();
    await supabase.auth.signOut();
  }
  redirect("/salgscoach/login");
}
