import "server-only";

import { redirect } from "next/navigation";

import { createServerComponentClient } from "@/lib/supabase/serverClient";

import { isOdysseusOwnerEmail } from "./config";

export async function getOdysseusOwner() {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id || !isOdysseusOwnerEmail(user.email)) {
    return null;
  }

  return user;
}

export async function requireOdysseusOwner() {
  const owner = await getOdysseusOwner();
  if (!owner) {
    redirect("/odysseus/login");
  }
  return owner;
}
