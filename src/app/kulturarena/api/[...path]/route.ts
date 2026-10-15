import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { allowedBridgePath, BodyTooLarge, readLimitedBody, sameOrigin } from "@/lib/kulturarena/policy";
import { authorizedKulturarenaUser, kulturarenaAdminClient, loadKulturarenaState } from "@/lib/kulturarena/server";
import { DEVICE, SYSTEM, TENANT, seal, unseal, type Envelope } from "@/lib/kulturarena/crypto";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;
type Context = { params: Promise<{ path: string[] }> };
const headers = { "Cache-Control": "no-store, private", "X-Robots-Tag": "noindex, nofollow, noarchive", "X-Content-Type-Options": "nosniff" };
async function proxy(request: Request, context: Context) {
  if (request.method === "POST" && !sameOrigin(request)) return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 403, headers });
  const user = await authorizedKulturarenaUser();
  if (!user) return NextResponse.json({ error: "Innlogging kreves" }, { status: 401, headers });
  const parts = (await context.params).path;
  const commandId = parts[0] === "command" && /^[a-f0-9-]{36}$/.test(parts[1] || "") && parts.length === 2 ? parts[1] : null;
  const path = commandId && request.method === "GET" ? "command" : allowedBridgePath(request.method, parts);
  if (!path || path === "system" || path === "health") return NextResponse.json({ error: "Ikke funnet" }, { status: 404, headers });
  try {
    if (path === "state") return NextResponse.json(await loadKulturarenaState(), { headers });
    const admin = kulturarenaAdminClient().schema("kulturarena_portal");
    if (commandId) {
      const { data, error } = await admin.from("commands").select("id,status,encrypted_result").eq("id", commandId).eq("tenant_id", TENANT).eq("device_id", DEVICE).eq("created_by", user.id).maybeSingle();
      if (error || !data) return NextResponse.json({ error: "Ikke funnet" }, { status: 404, headers });
      const decoded = data.status === "completed" && data.encrypted_result ? unseal(data.encrypted_result as Envelope, `result:${data.id}`, process.env.KULTURARENA_DATA_KEY || "") : null;
      return NextResponse.json({ command_id: data.id, status: data.status, result: decoded }, { headers });
    }
    const snapshot = await loadKulturarenaState();
    if (!snapshot.portal.online) return NextResponse.json({ error: "Hovedserveren er frakoblet. Endringen er ikke lagret." }, { status: 503, headers });
    let payload: Record<string, unknown>;
    if (path.startsWith("file/")) payload = { file: path.slice(5), revision: snapshot.revision };
    else {
      if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ error: "JSON kreves" }, { status: 415, headers });
      payload = JSON.parse(await readLimitedBody(request, 30_000));
      if (!payload || typeof payload !== "object" || !Number.isInteger(payload.revision)) return NextResponse.json({ error: "Mangler dataversjon" }, { status: 422, headers });
    }
    const receivedId = request.headers.get("X-Kulturarena-Request-ID") || randomUUID();
    if (!/^[a-f0-9-]{36}$/.test(receivedId)) return NextResponse.json({ error: "Ugyldig forespørsels-ID" }, { status: 422, headers });
    const id = randomUUID(), action = path.startsWith("file/") ? "read-file" : path;
    const content = { tenant_id: TENANT, system_id: SYSTEM, device_id: DEVICE, id, actor: user.id, action, revision: payload.revision, payload };
    const fingerprint = createHash("sha256").update(JSON.stringify({ action, payload })).digest("hex"), idempotencyKey = `${user.id}:${receivedId}`;
    const row = { id, tenant_id: TENANT, device_id: DEVICE, created_by: user.id, action, expected_revision: payload.revision, payload_hash: fingerprint, encrypted_payload: seal(content, `command:${id}`, process.env.KULTURARENA_DATA_KEY || ""), idempotency_key: idempotencyKey };
    const { error } = await admin.from("commands").insert(row);
    if (error) {
      const { data: old } = await admin.from("commands").select("id,payload_hash").eq("tenant_id", TENANT).eq("device_id", DEVICE).eq("created_by", user.id).eq("idempotency_key", idempotencyKey).maybeSingle();
      if (!old || old.payload_hash !== fingerprint) throw new Error("Queue unavailable");
      return NextResponse.json({ command_id: old.id, status: "queued" }, { status: 202, headers });
    }
    return NextResponse.json({ command_id: id, status: "queued" }, { status: 202, headers });
  } catch (error) {
    if (error instanceof BodyTooLarge) return NextResponse.json({ error: "For stor forespørsel" }, { status: 413, headers });
    return NextResponse.json({ error: "Serverforbindelsen er utilgjengelig. Ingen lagring er bekreftet." }, { status: 503, headers });
  }
}
export const GET = proxy;
export const POST = proxy;
