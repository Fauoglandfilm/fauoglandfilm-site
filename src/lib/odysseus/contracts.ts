export const ODYSSEUS_DEVICE_ID = "mac-2";
export const ODYSSEUS_COMMAND_LEASE_MS = 15 * 60 * 1_000;

export const ODYSSEUS_NAV_ITEMS = [
  { label: "Oversikt", href: "#oversikt" },
  { label: "Salg", href: "#salg" },
  { label: "CRM-synk", href: "#crmsynk" },
  { label: "System", href: "#system" },
  { label: "Innstillinger", href: "#innstillinger" },
  { label: "Hendelser", href: "#hendelser" },
] as const;

function normalized(value: string | null | undefined) {
  return String(value ?? "").trim().toLowerCase();
}

export function resolveOdysseusOwnerConfig(
  username: string | null | undefined,
  email: string | null | undefined,
) {
  const configuredEmail = normalized(email);

  return {
    username: normalized(username) || "tommy",
    email: configuredEmail,
    ready: Boolean(configuredEmail),
  };
}

export function runningOdysseusCommandScope(commandId: string) {
  return {
    id: commandId,
    deviceId: ODYSSEUS_DEVICE_ID,
    status: "running" as const,
  };
}

export function odysseusCommandLeaseCutoff(nowMs = Date.now()) {
  return new Date(nowMs - ODYSSEUS_COMMAND_LEASE_MS).toISOString();
}

export function expiredOdysseusCommandUpdate(completedAt: string) {
  return {
    status: "failed" as const,
    completed_at: completedAt,
    error_code: "lease_expired_no_automatic_retry",
  };
}

export function readBoundedDailySendLimit(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 50
    ? value
    : null;
}

const MISSING_PORTAL_TABLE_CODES = new Set(["42P01", "PGRST204", "PGRST205"]);

export function classifyOdysseusBackendProbe(
  responseReceived: boolean,
  errorCode?: string | null,
) {
  if (!responseReceived) {
    return { backendReady: false, databaseReady: false, tableReady: false };
  }
  // `undefined` is the only success sentinel. Supabase can return an error
  // object without a populated PostgREST code (for example on a failed fetch).
  // Treating an empty code as success created a false-green portal state.
  if (errorCode === undefined) {
    return { backendReady: true, databaseReady: true, tableReady: true };
  }
  if (typeof errorCode === "string" && MISSING_PORTAL_TABLE_CODES.has(errorCode)) {
    return { backendReady: true, databaseReady: true, tableReady: false };
  }
  return { backendReady: true, databaseReady: false, tableReady: false };
}

export function odysseusReadinessState(
  configReady: boolean,
  backend: ReturnType<typeof classifyOdysseusBackendProbe>,
) {
  const readinessStatus = !configReady
    ? "configuration_incomplete"
    : backend.tableReady
      ? "ready"
      : backend.databaseReady
        ? "portal_table_unavailable"
        : backend.backendReady
          ? "database_unavailable"
          : "backend_unreachable";

  return {
    ok: configReady && backend.tableReady,
    readinessStatus,
  };
}
