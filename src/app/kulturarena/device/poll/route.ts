import { NextResponse } from "next/server";
import { z } from "zod";
import { DEVICE, SYSTEM, TENANT, tokenMatches } from "@/lib/kulturarena/crypto";
import { BodyTooLarge, readLimitedBody } from "@/lib/kulturarena/policy";
import { createAdminClient } from "@/lib/supabase/serverClient";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const envelope = z.object({v:z.literal(1),tenant_id:z.literal(TENANT),purpose:z.literal("snapshot"),nonce:z.string().max(30),ciphertext:z.string().max(2_000_000),tag:z.string().max(30)}).strict();
const schema = z.object({tenant_id:z.literal(TENANT),system_id:z.literal(SYSTEM),device_id:z.literal(DEVICE),agent_version:z.string().max(80),revision:z.number().int().nonnegative(),source_fingerprint:z.string().regex(/^[a-f0-9]{64}$/),encrypted_state:envelope.nullable(),status_snapshot:z.object({new_prospects:z.number().int().nonnegative(),open_tasks:z.number().int().nonnegative(),send_enabled:z.literal(false)}).strict()}).strict();
export async function POST(request: Request) {
  if (!tokenMatches(request.headers.get("authorization"),process.env.KULTURARENA_DEVICE_TOKEN_SHA256)) return NextResponse.json({error:"unauthorized"},{status:401});
  try {
    const p=schema.parse(JSON.parse(await readLimitedBody(request,2_100_000))),admin=createAdminClient().schema("kulturarena_portal"),now=new Date().toISOString();
    const {data:old,error:readError}=await admin.from("devices").select("revision").eq("tenant_id",TENANT).eq("id",DEVICE).maybeSingle();
    if(readError||old&&old.revision>p.revision)return NextResponse.json({error:"state_conflict"},{status:409});
    const row={id:DEVICE,tenant_id:TENANT,last_seen_at:now,agent_version:p.agent_version,revision:p.revision,telemetry:p.status_snapshot,...(p.encrypted_state?{encrypted_state:p.encrypted_state,state_fingerprint:p.source_fingerprint}:{})};
    const {error}=await admin.from("devices").upsert(row);
    if(error)throw new Error("heartbeat_failed");
    const claimed=await admin.rpc("claim_command");
    if(claimed.error)throw new Error("queue_unavailable");
    return NextResponse.json({ok:true,command:claimed.data?.[0]||null});
  }catch(error){return NextResponse.json({error:error instanceof BodyTooLarge?"too_large":"portal_unavailable"},{status:error instanceof BodyTooLarge?413:503});}
}
