import "server-only";

import { hasSupabaseAdminConfig } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/serverClient";

import { ODYSSEUS_DEVICE_ID } from "./config";

export type OdysseusCommandRow = {
  id: string;
  action: string;
  status: string;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  result: Record<string, unknown> | null;
  error_code: string | null;
};

export type OdysseusPortalState = {
  configured: boolean;
  online: boolean;
  lastSeenAt: string | null;
  snapshot: Record<string, unknown>;
  commands: OdysseusCommandRow[];
  error?: string;
};

export async function loadOdysseusPortalState(): Promise<OdysseusPortalState> {
  if (!hasSupabaseAdminConfig()) {
    return {
      configured: false,
      online: false,
      lastSeenAt: null,
      snapshot: {},
      commands: [],
      error: "Databasekonfigurasjon mangler.",
    };
  }

  const admin = createAdminClient();
  const [deviceResult, commandsResult] = await Promise.all([
    admin
      .from("odysseus_devices")
      .select("last_seen_at,status_snapshot")
      .eq("id", ODYSSEUS_DEVICE_ID)
      .maybeSingle(),
    admin
      .from("odysseus_commands")
      .select("id,action,status,created_at,started_at,completed_at,result,error_code")
      .eq("device_id", ODYSSEUS_DEVICE_ID)
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  if (deviceResult.error || commandsResult.error) {
    return {
      configured: false,
      online: false,
      lastSeenAt: null,
      snapshot: {},
      commands: [],
      error: "Odysseus-tabellene er ikke klare ennå.",
    };
  }

  const lastSeenAt = deviceResult.data?.last_seen_at ?? null;
  const ageMs = lastSeenAt ? Date.now() - new Date(lastSeenAt).getTime() : Number.POSITIVE_INFINITY;
  return {
    configured: true,
    online: ageMs >= 0 && ageMs < 90_000,
    lastSeenAt,
    snapshot: (deviceResult.data?.status_snapshot as Record<string, unknown>) ?? {},
    commands: (commandsResult.data ?? []) as OdysseusCommandRow[],
  };
}
