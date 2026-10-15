import { NextResponse } from "next/server";
import { z } from "zod";
import { DEVICE,SYSTEM,TENANT,tokenMatches } from "@/lib/kulturarena/crypto";
import { BodyTooLarge,readLimitedBody } from "@/lib/kulturarena/policy";
import { createAdminClient } from "@/lib/supabase/serverClient";
export const dynamic="force-dynamic";
export const runtime="nodejs";
const envelope=z.object({v:z.literal(1),tenant_id:z.literal(TENANT),purpose:z.string().max(100),nonce:z.string().max(30),ciphertext:z.string().max(2_000_000),tag:z.string().max(30)}).strict();
const schema=z.object({tenant_id:z.literal(TENANT),system_id:z.literal(SYSTEM),device_id:z.literal(DEVICE),command_id:z.string().uuid(),lease_token:z.string().uuid(),status:z.enum(["completed","failed"]),encrypted_result:envelope,encrypted_state:envelope,revision:z.number().int().nonnegative(),source_fingerprint:z.string().regex(/^[a-f0-9]{64}$/)}).strict();
export async function POST(request:Request){
  if(!tokenMatches(request.headers.get("authorization"),process.env.KULTURARENA_DEVICE_TOKEN_SHA256))return NextResponse.json({error:"unauthorized"},{status:401});
  try{
    const p=schema.parse(JSON.parse(await readLimitedBody(request,4_000_000)));
    if(p.encrypted_result.purpose!==`result:${p.command_id}`||p.encrypted_state.purpose!=="snapshot")return NextResponse.json({error:"wrong_scope"},{status:403});
    const {data,error}=await createAdminClient().schema("kulturarena_portal").rpc("finish_command",{command_uuid:p.command_id,supplied_lease:p.lease_token,outcome:p.status,encrypted_response:p.encrypted_result,new_snapshot:p.encrypted_state,new_revision:p.revision,new_fingerprint:p.source_fingerprint});
    if(error||!data)return NextResponse.json({error:"command_not_running"},{status:409});
    return NextResponse.json({ok:true});
  }catch(error){return NextResponse.json({error:error instanceof BodyTooLarge?"too_large":"portal_unavailable"},{status:error instanceof BodyTooLarge?413:503});}
}
