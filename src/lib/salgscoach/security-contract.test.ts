import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationUrl = new URL(
  "../../../supabase/migrations/20261015160000_salgscoach_calls_portal_rls.sql",
  import.meta.url,
);
const dashboardUrl = new URL(
  "../../../src/app/salgscoach/page.tsx",
  import.meta.url,
);
const loginActionUrl = new URL("./actions.ts", import.meta.url);
const accessUrl = new URL("./access.ts", import.meta.url);
const loginFormUrl = new URL(
  "../../components/salgscoach/login-form.tsx",
  import.meta.url,
);
const desktopSchemaUrls = [
  "../../../supabase/migrations/20261015161000_salgscoach_desktop_core.sql",
  "../../../supabase/migrations/20261015161100_salgscoach_grading.sql",
  "../../../supabase/migrations/20261015161200_salgscoach_analysis_metadata.sql",
  "../../../supabase/migrations/20261015161300_salgscoach_schema_reconciliation.sql",
].map((path) => new URL(path, import.meta.url));

test("calls-migrasjonen dekker desktop-upserten", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  const desktopCallColumns = [
    "id",
    "user_id",
    "source",
    "app_version",
    "ai_provider",
    "ai_model",
    "analysis_mode",
    "knowledge_version",
    "analyzed_at",
    "call_type",
    "pipeline_stage",
    "call_goal",
    "outcome",
    "methodology_name",
    "duration_seconds",
    "north_star_score",
    "score_band",
    "talk_ratio_seller",
    "talk_ratio_prospect",
    "talk_ratio_reliable",
    "first_two_minute_sentiment",
    "audio_url",
  ];

  for (const column of desktopCallColumns) {
    assert.match(migration, new RegExp(`\\b${column}\\b`), column);
  }
  assert.match(migration, /drop constraint if exists calls_source_check/i);
  assert.match(
    migration,
    /check \(\s*source is not null\s+and source in \('live', 'manual', 'demo', 'wispr_flow'\)\s*\)/i,
  );
  assert.match(migration, /add constraint calls_pkey primary key \(id\)/i);
  assert.match(
    migration,
    /public\.calls primary key must be exactly \(id\)/i,
  );
});

test("calls er låst til aktivt Salgscoach-medlem med RLS og minste privilegier", async () => {
  const migration = await readFile(migrationUrl, "utf8");

  assert.match(migration, /create table if not exists public\.salgscoach_members/i);
  assert.match(migration, /create or replace function public\.is_salgscoach_member\(\)/i);
  assert.match(
    migration,
    /revoke all on table public\.salgscoach_members from public, anon, authenticated/i,
  );
  assert.match(migration, /alter table public\.calls enable row level security/i);
  assert.match(migration, /alter table public\.calls force row level security/i);
  assert.match(
    migration,
    /revoke all on table public\.calls from public, anon, authenticated/i,
  );
  assert.match(
    migration,
    /grant select, insert, update, delete on table public\.calls to authenticated/i,
  );
  assert.match(migration, /for all\s+to authenticated/i);
  assert.match(
    migration,
    /using \([\s\S]*?auth\.uid\(\)[\s\S]*?is_salgscoach_member\(\)[\s\S]*?\)\s+with check \([\s\S]*?auth\.uid\(\)[\s\S]*?is_salgscoach_member\(\)/i,
  );
});

test("webtilgang krever aktivt databasemedlemskap i tillegg til e-postallowlist", async () => {
  const [access, actions] = await Promise.all([
    readFile(accessUrl, "utf8"),
    readFile(loginActionUrl, "utf8"),
  ]);

  assert.match(access, /\.from\("salgscoach_members"\)/);
  assert.match(access, /\.eq\("user_id", userId\)/);
  assert.match(access, /\.eq\("active", true\)/);
  assert.match(access, /hasActiveSalgscoachMembership\(supabase, user\.id\)/);
  assert.match(actions, /hasActiveSalgscoachMembership\(supabase, data\.user!\.id\)/);
});

test("dashboardspørringen har eksplisitt eierfilter i tillegg til RLS", async () => {
  const dashboard = await readFile(dashboardUrl, "utf8");

  assert.match(
    dashboard,
    /\.from\("calls"\)[\s\S]*?\.eq\("user_id", user\.id\)[\s\S]*?\.limit\(20\)/,
  );
});

test("skyskjemaet dekker alle tabellene som desktop-repositoryet skriver", async () => {
  const schema = (
    await Promise.all(desktopSchemaUrls.map((url) => readFile(url, "utf8")))
  ).join("\n");
  const tables = [
    "users",
    "teams",
    "team_memberships",
    "calls",
    "call_metadata",
    "call_transcripts",
    "call_reports",
    "live_nudges",
    "training_plans",
    "historical_patterns",
    "ab_tests",
    "call_scores",
    "call_evidence",
    "skill_progression_snapshots",
  ];

  for (const table of tables) {
    assert.match(
      schema,
      new RegExp(`create table if not exists public\\.${table}\\b`, "i"),
      table,
    );
  }
});

test("alle desktop-tabeller krever aktivt Salgscoach-medlemskap", async () => {
  const schema = (
    await Promise.all(desktopSchemaUrls.map((url) => readFile(url, "utf8")))
  ).join("\n");

  assert.doesNotMatch(schema, /using \(user_id = auth\.uid\(\)\)/i);
  assert.doesNotMatch(schema, /with check \(user_id = auth\.uid\(\)\)/i);
  assert.match(schema, /alter table public\.call_reports force row level security/i);
  assert.match(schema, /alter table public\.call_scores force row level security/i);
  assert.match(schema, /is_salgscoach_member\(\)/i);
  assert.match(schema, /as restrictive\s+for all\s+to authenticated/i);
});

test("child-rader kan ikke kobles til en annen brukers samtale", async () => {
  const schema = (
    await Promise.all(desktopSchemaUrls.map((url) => readFile(url, "utf8")))
  ).join("\n");
  const ownerBoundTables = [
    "call_metadata",
    "call_transcripts",
    "call_reports",
    "live_nudges",
    "training_plans",
    "historical_patterns",
    "ab_tests",
    "call_scores",
    "call_evidence",
    "skill_progression_snapshots",
  ];

  assert.match(schema, /unique[\s\S]*?calls \(id, user_id\)/i);
  for (const table of ownerBoundTables) {
    assert.match(
      schema,
      new RegExp(
        `alter table public\\.${table}[\\s\\S]*?foreign key \\(call_id, user_id\\) references public\\.calls \\(id, user_id\\)`,
        "i",
      ),
      table,
    );
  }
});

test("partielle graderingstabeller repareres før indekser opprettes", async () => {
  const grading = await readFile(desktopSchemaUrls[1], "utf8");

  assert.ok(
    grading.indexOf("alter table public.call_scores") <
      grading.indexOf("create index if not exists idx_call_scores_user_call"),
  );
  assert.ok(
    grading.indexOf("alter table public.skill_progression_snapshots") <
      grading.indexOf("create index if not exists idx_skill_progression_snapshots_user_date"),
  );
});

test("innlogging avviser ikke eldre gyldige Supabase-passord", async () => {
  const [action, form] = await Promise.all([
    readFile(loginActionUrl, "utf8"),
    readFile(loginFormUrl, "utf8"),
  ]);

  assert.match(action, /password:\s*z\.string\(\)\.min\(1\)\.max\(200\)/);
  assert.match(form, /minLength=\{1\}/);
  assert.doesNotMatch(action, /password:[^\n]*\.min\(8\)/);
});
