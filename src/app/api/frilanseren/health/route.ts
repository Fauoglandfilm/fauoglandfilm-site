import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { hasSupabaseAdminConfig, hasSupabaseAuthConfig, missingSupabaseEnvs } from "@/lib/env";

export const dynamic = "force-dynamic";

const MARKETPLACE_TABLES = [
  "users_meta",
  "freelancer_profiles",
  "employer_profiles",
  "jobs",
  "job_roles",
  "job_applications",
  "contact_requests",
  "timesheets",
  "timesheet_entries",
  "moderation_reports",
  "notifications",
] as const;

type TableCheck = {
  table: string;
  ok: boolean;
  code?: string;
  message?: string;
};

type ConnectivityCheck = {
  ok: boolean;
  host: string | null;
  status?: number;
  durationMs?: number;
  message?: string;
};

function sanitizeErrorMessage(message: string | undefined) {
  if (!message) {
    return undefined;
  }

  return message
    .replace(/https?:\/\/[^\s"']+/g, "<url>")
    .replace(/eyJ[a-zA-Z0-9._-]+/g, "<token>");
}

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "") ?? null;
}

function getSupabaseKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null;
}

function getSupabaseHost() {
  const url = getSupabaseUrl();

  if (!url) {
    return null;
  }

  try {
    return new URL(url).hostname;
  } catch {
    return "invalid-url";
  }
}

function getSupabaseClient() {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function checkSupabaseConnectivity(): Promise<ConnectivityCheck> {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  const host = getSupabaseHost();

  if (!url || !key) {
    return {
      ok: false,
      host,
      message: "Supabase URL or key is missing.",
    };
  }

  const startedAt = Date.now();

  try {
    const response = await fetch(`${url}/rest/v1/`, {
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
      },
      signal: AbortSignal.timeout(2_500),
    });

    return {
      ok: response.ok,
      host,
      status: response.status,
      durationMs: Date.now() - startedAt,
      message: response.ok ? undefined : response.statusText,
    };
  } catch (error) {
    return {
      ok: false,
      host,
      durationMs: Date.now() - startedAt,
      message: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
    };
  }
}

async function checkTable(table: string): Promise<TableCheck> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      table,
      ok: false,
      code: "missing_env",
      message: "Supabase URL or key is missing.",
    };
  }

  try {
    const { error } = await supabase
      .from(table)
      .select("id", { count: "exact", head: true })
      .limit(1)
      .abortSignal(AbortSignal.timeout(2_500));

    if (!error) {
      return { table, ok: true };
    }

    return {
      table,
      ok: false,
      code: error.code,
      message: sanitizeErrorMessage(error.message),
    };
  } catch (error) {
    return {
      table,
      ok: false,
      code: error instanceof Error ? error.name : "unknown_error",
      message: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function GET() {
  const authMissing = missingSupabaseEnvs();
  const adminMissing = missingSupabaseEnvs({ includeAdmin: true });
  const canCheckTables = hasSupabaseAuthConfig();
  const connectivity = canCheckTables
    ? await checkSupabaseConnectivity()
    : { ok: false, host: getSupabaseHost(), message: "Supabase auth environment is missing." };
  const tableChecks =
    canCheckTables && connectivity.ok ? await Promise.all(MARKETPLACE_TABLES.map(checkTable)) : [];
  const failedTables = tableChecks.filter((check) => !check.ok);
  const ok = authMissing.length === 0 && connectivity.ok && failedTables.length === 0;
  const status = ok
    ? "ready"
    : authMissing.length
      ? "missing_env"
      : !connectivity.ok
        ? "supabase_unreachable"
        : "schema_or_access_pending";

  return NextResponse.json(
    {
      ok,
      status,
      release: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? null,
      checkedAt: new Date().toISOString(),
      supabase: {
        connectivity,
        authEnv: {
          ok: hasSupabaseAuthConfig(),
          missing: authMissing,
        },
        adminEnv: {
          ok: hasSupabaseAdminConfig(),
          missing: adminMissing,
        },
      },
      marketplaceTables: tableChecks,
    },
    {
      status: ok ? 200 : 503,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
