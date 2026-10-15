import { NextResponse } from "next/server";
import { z } from "zod";

import { hasSupabaseAdminConfig } from "@/lib/env";
import { authenticateOdysseusDevice } from "@/lib/odysseus/device-auth";
import { createAdminClient } from "@/lib/supabase/serverClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resultSchema = z.object({
  command_id: z.string().uuid(),
  status: z.enum(["completed", "failed"]),
  result: z.record(z.string(), z.unknown()).default({}),
  error_code: z.string().trim().max(120).optional(),
});

export async function POST(request: Request) {
  if (!authenticateOdysseusDevice(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json({ error: "portal_not_configured" }, { status: 503 });
  }

  const parsed = resultSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_result" }, { status: 422 });
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const { data, error } = await admin
    .from("odysseus_commands")
    .update({
      status: parsed.data.status,
      result: parsed.data.result,
      error_code: parsed.data.error_code ?? null,
      completed_at: now,
    })
    .eq("id", parsed.data.command_id)
    .eq("status", "running")
    .select("id,action,status")
    .maybeSingle();
  if (error || !data) {
    return NextResponse.json({ error: "command_not_running" }, { status: 409 });
  }

  await admin.from("odysseus_audit_logs").insert({
    event_type: `command_${parsed.data.status}`,
    command_id: data.id,
    detail: { action: data.action, error_code: parsed.data.error_code ?? null },
  });
  return NextResponse.json({ ok: true });
}
