"use server";

import { redirect } from "next/navigation";
import { createServerComponentClient } from "@/lib/supabase/serverClient";
import { isOdysseusOwnerEmail } from "./config";
import { ODYSSEUS_SESSION_SCOPE } from "./contracts";
import { cancelOwnerMfaEnrollment, enrollOwnerMfa, verifyOwnerMfa, type MfaState } from "./mfa-access";

export async function enrollOdysseusMfaAction(): Promise<MfaState> {
  const supabase = await createServerComponentClient(ODYSSEUS_SESSION_SCOPE);
  return enrollOwnerMfa(supabase.auth, isOdysseusOwnerEmail);
}

export async function verifyOdysseusMfaAction(_previous: MfaState, form: FormData): Promise<MfaState> {
  const supabase = await createServerComponentClient(ODYSSEUS_SESSION_SCOPE);
  const result = await verifyOwnerMfa(supabase.auth, isOdysseusOwnerEmail,
    String(form.get("factor_id") ?? ""), String(form.get("code") ?? "").trim());
  if (result.status === "success") redirect("/odysseus");
  return result;
}

export async function cancelOdysseusMfaAction(_previous: MfaState, form: FormData): Promise<MfaState> {
  const supabase = await createServerComponentClient(ODYSSEUS_SESSION_SCOPE);
  const result = await cancelOwnerMfaEnrollment(supabase.auth, isOdysseusOwnerEmail, String(form.get("factor_id") ?? ""));
  if (result.status === "success") redirect("/odysseus/mfa");
  return result;
}
