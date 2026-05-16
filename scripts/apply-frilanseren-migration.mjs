import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

import pg from "pg";

const { Client } = pg;

const ROOT = process.cwd();
const MIGRATION_PATH = path.join(
  ROOT,
  "supabase",
  "migrations",
  "20260515140000_filmlanseren_market_timesheets.sql",
);
const REQUIRED_TABLES = [
  "jobs",
  "job_roles",
  "job_applications",
  "contact_requests",
  "timesheets",
  "timesheet_entries",
  "moderation_reports",
  "notifications",
];

function readDatabaseUrl() {
  return process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

function redactDatabaseUrl(value) {
  try {
    const url = new URL(value);
    if (url.password) {
      url.password = "****";
    }
    if (url.username) {
      url.username = "****";
    }
    return url.toString();
  } catch {
    return "<redacted database url>";
  }
}

function printMissingUrlHelp() {
  console.error("Missing database connection string.");
  console.error("");
  console.error("Set one of these before running the migration:");
  console.error("- SUPABASE_DB_URL");
  console.error("- DATABASE_URL");
  console.error("- POSTGRES_URL");
  console.error("");
  console.error("Example:");
  console.error('SUPABASE_DB_URL="postgresql://..." npm run db:migrate:frilanseren');
  console.error("");
  console.error("Use the Supabase production database URI, preferably the direct/session connection string with SSL.");
}

async function verifyTables(client) {
  const { rows } = await client.query(
    `
      select table_name
      from information_schema.tables
      where table_schema = 'public'
        and table_name = any($1::text[])
      order by table_name
    `,
    [REQUIRED_TABLES],
  );
  const found = new Set(rows.map((row) => row.table_name));
  const missing = REQUIRED_TABLES.filter((table) => !found.has(table));

  if (missing.length) {
    throw new Error(`Migration finished, but these tables are still missing: ${missing.join(", ")}`);
  }
}

async function main() {
  const databaseUrl = readDatabaseUrl();

  if (!databaseUrl) {
    printMissingUrlHelp();
    process.exitCode = 1;
    return;
  }

  if (!/^postgres(ql)?:\/\//i.test(databaseUrl)) {
    throw new Error("Database URL must start with postgres:// or postgresql://");
  }

  const migrationSql = await fs.readFile(MIGRATION_PATH, "utf8");
  const client = new Client({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 15_000,
    ssl: process.env.SUPABASE_DB_SSL === "false" ? false : { rejectUnauthorized: false },
    statement_timeout: 120_000,
  });

  console.log("Applying Frilanseren marketplace migration.");
  console.log(`Migration: ${path.relative(ROOT, MIGRATION_PATH)}`);
  console.log(`Database: ${redactDatabaseUrl(databaseUrl)}`);

  await client.connect();

  try {
    await client.query("select pg_advisory_lock(hashtext($1))", ["frilanseren_market_timesheets"]);
    try {
      await client.query(migrationSql);
    } catch (error) {
      await client.query("rollback").catch(() => undefined);
      throw error;
    } finally {
      await client.query("select pg_advisory_unlock(hashtext($1))", ["frilanseren_market_timesheets"]);
    }

    await verifyTables(client);
    console.log("Frilanseren migration applied and verified.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Failed to apply Frilanseren migration.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
