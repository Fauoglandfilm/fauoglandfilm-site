import "server-only";
import { createAdminClient, createServerComponentClient } from "@/lib/supabase/serverClient";
import { authorizedKulturarenaMember, kulturarenaConnection, kulturarenaMembers } from "./access";
import { DEVICE, TENANT, type Envelope, unseal } from "./crypto";
export function hasKulturarenaAuthConfig() {
  return Boolean(kulturarenaConnection() && kulturarenaMembers().length);
}
export async function kulturarenaClient() {
  const connection = kulturarenaConnection();
  if (!connection) throw new Error("Kulturarena database is not configured");
  return createServerComponentClient({ name: "ka-auth", path: "/kulturarena" }, connection);
}
export function kulturarenaAdminClient() {
  const connection = kulturarenaConnection(), key = process.env.KULTURARENA_SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!connection || !key) throw new Error("Kulturarena service is not configured");
  return createAdminClient({ url: connection.url, key });
}
export async function authorizedKulturarenaUser() {
  if (!hasKulturarenaAuthConfig()) return null;
  try {
    const supabase = await kulturarenaClient(); const { data, error } = await supabase.auth.getUser();
    if (error || !authorizedKulturarenaMember(data.user, kulturarenaMembers())) return null;
    return data.user;
  } catch { return null; }
}
export async function loadKulturarenaState() {
  const admin = kulturarenaAdminClient().schema("kulturarena_portal");
  const { data, error } = await admin.from("devices").select("encrypted_state,revision,last_seen_at").eq("tenant_id", TENANT).eq("id", DEVICE).maybeSingle();
  if (error || !data?.encrypted_state) throw new Error("Kulturarena state unavailable");
  const value = unseal<Record<string, unknown>>(data.encrypted_state as Envelope, "snapshot", process.env.KULTURARENA_DATA_KEY || "");
  if (value.project_id !== "kulturarena-sales" || value.send_enabled !== false || typeof value.revision !== "number" || !Number.isSafeInteger(value.revision)) throw new Error("Wrong system or revision");
  return { ...value, revision: value.revision, portal: { last_seen_at: data.last_seen_at, online: Date.now() - new Date(data.last_seen_at).getTime() >= 0 && Date.now() - new Date(data.last_seen_at).getTime() < 90_000 } };
}
