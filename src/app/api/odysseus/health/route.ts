import { NextResponse } from "next/server";

import { hasSupabaseAdminConfig, hasSupabaseAuthConfig } from "@/lib/env";
import { getOdysseusOwnerConfig } from "@/lib/odysseus/config";
import {
  classifyOdysseusBackendProbe,
  odysseusReadinessState,
} from "@/lib/odysseus/contracts";
import { createAdminClient } from "@/lib/supabase/serverClient";

export const dynamic = "force-dynamic";

export async function GET() {
  const owner = getOdysseusOwnerConfig();
  const deviceHash = String(process.env.ODYSSEUS_DEVICE_TOKEN_SHA256 ?? "").trim();
  const ownerConfigured = owner.ready;
  const deviceAuthenticationConfigured = /^[a-f0-9]{64}$/i.test(deviceHash);
  const authConfigured = hasSupabaseAuthConfig();
  const adminConfigured = hasSupabaseAdminConfig();
  const configReady =
    ownerConfigured &&
    deviceAuthenticationConfigured &&
    authConfigured &&
    adminConfigured;
  let backend = classifyOdysseusBackendProbe(false);

  if (configReady) {
    try {
      const { error, status } = await createAdminClient()
        .from("odysseus_devices")
        .select("id,name,agent_version,last_seen_at,status_snapshot,created_at,updated_at")
        .limit(1)
        .abortSignal(AbortSignal.timeout(3_000));
      backend = classifyOdysseusBackendProbe(
        true,
        error ? String(error.code ?? "").trim() || null : undefined,
        error ? status : undefined,
      );
      if (error) {
        console.error("[ODYSSEUS_HEALTH] readiness probe failed", {
          category: status === 0 ? "transport_error" : "database_error",
          code: String(error.code ?? "").trim() || "unknown_error",
          status,
          readinessStatus: odysseusReadinessState(configReady, backend).readinessStatus,
        });
      }
    } catch (error) {
      console.error("[ODYSSEUS_HEALTH] readiness probe did not receive a response", {
        errorType: error instanceof Error ? error.name : "UnknownError",
      });
    }
  }
  const readiness = odysseusReadinessState(configReady, backend);

  return NextResponse.json(
    {
      ok: readiness.ok,
      release: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      readinessStatus: readiness.readinessStatus,
      configReady,
      backendReady: backend.backendReady,
      databaseReady: backend.databaseReady,
      tableReady: backend.tableReady,
      ownerConfigured,
      deviceAuthenticationConfigured,
      authConfigured,
      adminConfigured,
    },
    { headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=15" } },
  );
}
