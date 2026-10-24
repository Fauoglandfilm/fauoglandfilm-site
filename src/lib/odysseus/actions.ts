"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { hasSupabaseAdminConfig, hasSupabaseAuthConfig } from "@/lib/env";
import { createAdminClient, createServerComponentClient } from "@/lib/supabase/serverClient";

import { requireOdysseusOwner } from "./auth";
import { ODYSSEUS_SESSION_SCOPE } from "./contracts";
import {
  getOdysseusOwnerConfig,
  isOdysseusCommand,
  isOdysseusOwnerEmail,
  ODYSSEUS_DEVICE_ID,
} from "./config";

export type OdysseusAuthState = {
  status: "idle" | "error" | "success";
  message?: string;
};

const loginSchema = z.object({
  username: z.string().trim().min(1).max(80),
  password: z.string().min(10).max(200),
});

export async function signInOdysseusAction(
  _previous: OdysseusAuthState,
  formData: FormData,
): Promise<OdysseusAuthState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  const owner = getOdysseusOwnerConfig();

  if (!parsed.success || !owner.ready || !hasSupabaseAuthConfig()) {
    return { status: "error", message: "Feil brukernavn eller passord." };
  }
  if (parsed.data.username.toLowerCase() !== owner.username) {
    return { status: "error", message: "Feil brukernavn eller passord." };
  }

  const supabase = await createServerComponentClient(ODYSSEUS_SESSION_SCOPE);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: owner.email,
    password: parsed.data.password,
  });
  if (error || !isOdysseusOwnerEmail(data.user?.email)) {
    await supabase.auth.signOut();
    return { status: "error", message: "Feil brukernavn eller passord." };
  }

  redirect("/odysseus/mfa");
}

export async function requestOdysseusPasswordResetAction(
  _previous: OdysseusAuthState,
  formData: FormData,
): Promise<OdysseusAuthState> {
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const owner = getOdysseusOwnerConfig();

  if (owner.ready && username === owner.username && hasSupabaseAuthConfig()) {
    // Existing /auth/confirm -> Frilanseren reset flow needs its original
    // PKCE verifier scope. It must not create or replace an owner session.
    const supabase = await createServerComponentClient();
    await supabase.auth.resetPasswordForEmail(owner.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://fauoglandfilm.com"}/auth/confirm?next=/frilanseren/reset-password`,
    });
  }

  return {
    status: "success",
    message: "Hvis brukeren finnes, er en sikker passordlenke sendt til eierens private e-post.",
  };
}

export async function signOutOdysseusAction() {
  if (hasSupabaseAuthConfig()) {
    const supabase = await createServerComponentClient(ODYSSEUS_SESSION_SCOPE);
    await supabase.auth.signOut();
  }
  redirect("/odysseus/login");
}

function commandPayload(action: string, formData: FormData) {
  if (action !== "set_daily_send_limit") {
    return {};
  }
  const dailyLimit = Number(formData.get("daily_limit"));
  if (!Number.isInteger(dailyLimit) || dailyLimit < 1 || dailyLimit > 50) {
    throw new Error("Daglig grense må være mellom 1 og 50.");
  }
  return { daily_limit: dailyLimit };
}

export async function enqueueOdysseusCommand(formData: FormData) {
  const owner = await requireOdysseusOwner();
  if (!hasSupabaseAdminConfig()) {
    throw new Error("Odysseus-portalen mangler databasekonfigurasjon.");
  }

  const action = String(formData.get("action") ?? "");
  if (!isOdysseusCommand(action)) {
    throw new Error("Ugyldig Odysseus-kommando.");
  }
  const payload = commandPayload(action, formData);
  const commandId = randomUUID();
  const admin = createAdminClient();
  const { error } = await admin.from("odysseus_commands").insert({
    id: commandId,
    device_id: ODYSSEUS_DEVICE_ID,
    created_by: owner.id,
    action,
    payload,
    status: "queued",
    idempotency_key: `${owner.id}:${action}:${commandId}`,
  });
  if (error) {
    throw new Error("Kommandoen kunne ikke legges i kø.");
  }

  await admin.from("odysseus_audit_logs").insert({
    actor_user_id: owner.id,
    event_type: "command_queued",
    command_id: commandId,
    detail: { action },
  });
  revalidatePath("/odysseus");
}
