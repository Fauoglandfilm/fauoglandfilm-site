import "server-only";

import { redirect } from "next/navigation";

import { createServerComponentClient } from "@/lib/supabase/serverClient";

import { isOdysseusOwnerEmail } from "./config";
import { loadOwnerAccess } from "./mfa-access";

export async function getOdysseusOwnerAccess() {
  const supabase = await createServerComponentClient();
  return loadOwnerAccess(supabase.auth, isOdysseusOwnerEmail);
}

export async function getOdysseusOwner() {
  const access = await getOdysseusOwnerAccess();
  return access.state === "ready" ? access.user : null;
}

export async function requireOdysseusOwner() {
  const access = await getOdysseusOwnerAccess();
  if (access.state === "unauthenticated") redirect("/odysseus/login");
  if (access.state !== "ready" || !access.user) redirect("/odysseus/mfa");
  return access.user;
}
