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

function sanitizeErrorMessage(message: string | undefined) {
  if (!message) {
    return undefined;
  }

  return message
    .replace(/https?:\/\/[^\s"']+/g, "<url>")
    .replace(/eyJ[a-zA-Z0-9._-]+/g, "<token>");
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
  const tableChecks = canCheckTables ? await Promise.all(MARKETPLACE_TABLES.map(checkTable)) : [];
  const failedTables = tableChecks.filter((check) => !check.ok);
  const ok = authMissing.length === 0 && failedTables.length === 0;

  return NextResponse.json(
    {
      ok,
      status: ok ? "ready" : authMissing.length ? "missing_env" : "schema_or_access_pending",
      release: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? null,
      checkedAt: new Date().toISOString(),
      supabase: {
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
