import "server-only";
import { createAdminClient, createServerComponentClient } from "@/lib/supabase/serverClient";
import { isKulturarenaIdentity } from "./policy";
import { DEVICE, TENANT, type Envelope, unseal } from "./crypto";
export function hasKulturarenaAuthConfig() {
  const distinct = process.env.KULTURARENA_LOGIN_EMAIL?.trim().toLowerCase() !== process.env.ODYSSEUS_OWNER_EMAIL?.trim().toLowerCase();
  return distinct && ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "KULTURARENA_USER_ID", "KULTURARENA_LOGIN_EMAIL"].every((key) => Boolean(process.env[key]?.trim()));
}
export async function kulturarenaClient() { return createServerComponentClient({ name: "ka-auth", path: "/kulturarena" }); }
export async function authorizedKulturarenaUser() {
  if (!hasKulturarenaAuthConfig()) return null;
  try {
    const supabase = await kulturarenaClient(); const { data, error } = await supabase.auth.getUser();
    if (error || !isKulturarenaIdentity(data.user, process.env.KULTURARENA_USER_ID, process.env.KULTURARENA_LOGIN_EMAIL)) return null;
    return data.user;
  } catch { return null; }
}
export async function loadKulturarenaState() {
  const admin = createAdminClient().schema("kulturarena_portal");
  const { data, error } = await admin.from("devices").select("encrypted_state,revision,last_seen_at").eq("tenant_id", TENANT).eq("id", DEVICE).maybeSingle();
  if (error || !data?.encrypted_state) throw new Error("Kulturarena state unavailable");
  const value = unseal<Record<string, unknown>>(data.encrypted_state as Envelope, "snapshot", process.env.KULTURARENA_DATA_KEY || "");
  if (value.project_id !== "kulturarena-sales" || value.send_enabled !== false || typeof value.revision !== "number" || !Number.isSafeInteger(value.revision)) throw new Error("Wrong system or revision");
  return { ...value, revision: value.revision, portal: { last_seen_at: data.last_seen_at, online: Date.now() - new Date(data.last_seen_at).getTime() >= 0 && Date.now() - new Date(data.last_seen_at).getTime() < 90_000 } };
}
