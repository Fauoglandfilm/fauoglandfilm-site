import { NextResponse } from "next/server";

import { hasSupabaseAdminConfig, hasSupabaseAuthConfig } from "@/lib/env";
import { getOdysseusOwnerConfig } from "@/lib/odysseus/config";

export const dynamic = "force-dynamic";

export async function GET() {
  const owner = getOdysseusOwnerConfig();
  const deviceHash = String(process.env.ODYSSEUS_DEVICE_TOKEN_SHA256 ?? "").trim();
  return NextResponse.json(
    {
      ok:
        owner.ready &&
        /^[a-f0-9]{64}$/i.test(deviceHash) &&
        hasSupabaseAuthConfig() &&
        hasSupabaseAdminConfig(),
      release: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      ownerConfigured: owner.ready,
      deviceAuthenticationConfigured: /^[a-f0-9]{64}$/i.test(deviceHash),
      authConfigured: hasSupabaseAuthConfig(),
      adminConfigured: hasSupabaseAdminConfig(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
