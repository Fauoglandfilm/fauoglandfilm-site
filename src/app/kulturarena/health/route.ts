import { NextResponse } from "next/server";
import { hasKulturarenaAuthConfig, kulturarenaAdminClient } from "@/lib/kulturarena/server";
import { DEVICE, SYSTEM, TENANT, type Envelope, unseal } from "@/lib/kulturarena/crypto";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET() {
  const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };
  const configured = hasKulturarenaAuthConfig();
  if (!configured) return NextResponse.json({ ok: false, configured: false, backend_ready: false, agent_online: false }, { status: 503, headers });
  try {
    const { data, error } = await kulturarenaAdminClient().schema("kulturarena_portal").from("devices")
      .select("revision,last_seen_at,encrypted_state").eq("tenant_id", TENANT).eq("id", DEVICE)
      .abortSignal(AbortSignal.timeout(3000)).maybeSingle();
    if (error) throw new Error("Backend unavailable");
    const age = data ? Date.now() - new Date(data.last_seen_at).getTime() : NaN;
    const online = Number.isFinite(age) && age >= 0 && age < 90_000;
    const snapshot = data?.encrypted_state
      ? unseal<Record<string, unknown>>(data.encrypted_state as Envelope, "snapshot", process.env.KULTURARENA_DATA_KEY || "")
      : null;
    const ready = Boolean(online && snapshot?.project_id === SYSTEM && snapshot?.send_enabled === false && Number.isSafeInteger(snapshot?.revision) && snapshot?.revision === data?.revision);
    return NextResponse.json({ ok: ready, configured: true, backend_ready: true, agent_online: online }, { status: ready ? 200 : 503, headers });
  } catch {
    return NextResponse.json({ ok: false, configured: true, backend_ready: false, agent_online: false }, { status: 503, headers });
  }
}
