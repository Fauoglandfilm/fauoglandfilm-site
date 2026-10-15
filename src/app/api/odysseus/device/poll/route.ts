import { NextResponse } from "next/server";
import { z } from "zod";

import { hasSupabaseAdminConfig } from "@/lib/env";
import { authenticateOdysseusDevice } from "@/lib/odysseus/device-auth";
import { ODYSSEUS_DEVICE_ID } from "@/lib/odysseus/config";
import { createAdminClient } from "@/lib/supabase/serverClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const heartbeatSchema = z.object({
  device_id: z.literal(ODYSSEUS_DEVICE_ID),
  agent_version: z.string().trim().min(1).max(80),
  status_snapshot: z.record(z.string(), z.unknown()).default({}),
});

export async function POST(request: Request) {
  if (!authenticateOdysseusDevice(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json({ error: "portal_not_configured" }, { status: 503 });
  }

  const parsed = heartbeatSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_heartbeat" }, { status: 422 });
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const { error: heartbeatError } = await admin.from("odysseus_devices").upsert({
    id: ODYSSEUS_DEVICE_ID,
    name: "Odysseus Server Mac #2",
    agent_version: parsed.data.agent_version,
    last_seen_at: now,
    status_snapshot: parsed.data.status_snapshot,
    updated_at: now,
  });
  if (heartbeatError) {
    return NextResponse.json({ error: "heartbeat_failed" }, { status: 503 });
  }

  const { data: queued, error: queueError } = await admin
    .from("odysseus_commands")
    .select("id,action,payload,created_at")
    .eq("device_id", ODYSSEUS_DEVICE_ID)
    .eq("status", "queued")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (queueError || !queued) {
    return NextResponse.json({ ok: true, command: null });
  }

  const { data: claimed } = await admin
    .from("odysseus_commands")
    .update({ status: "running", started_at: now })
    .eq("id", queued.id)
    .eq("status", "queued")
    .select("id,action,payload,created_at")
    .maybeSingle();

  return NextResponse.json({ ok: true, command: claimed ?? null });
}
