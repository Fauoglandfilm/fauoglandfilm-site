begin;

create extension if not exists pgcrypto;

create table if not exists public.call_scores (
  id uuid primary key default gen_random_uuid(),
  call_id uuid not null references public.calls (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  dimension_key text not null,
  dimension_title text not null,
  score numeric(4, 1),
  display_score text,
  is_na boolean not null default false,
  rubric_band text,
  rubric_text text,
  meta text,
  detail text,
  analysis_status text not null default 'graded',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.call_evidence (
  id uuid primary key default gen_random_uuid(),
  call_id uuid not null references public.calls (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  dimension_key text not null,
  evidence_type text not null default 'primary_quote',
  quote text,
  summary text,
  meta text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.skill_progression_snapshots (
  id uuid primary key default gen_random_uuid(),
  call_id uuid not null references public.calls (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  snapshot_date timestamptz not null default timezone('utc', now()),
  analysis_status text not null default 'graded',
  scores_per_dimension jsonb not null default '{}'::jsonb,
  total_score numeric(4, 1),
  costliest_mistake text,
  primary_focus text,
  tags jsonb not null default '[]'::jsonb,
  patterns_detected jsonb not null default '[]'::jsonb,
  weakest_dimension text,
  most_improved_dimension text,
  progression_summary text,
  top_weaknesses jsonb not null default '[]'::jsonb,
  closing_trend jsonb not null default '{}'::jsonb,
  discovery_trend jsonb not null default '{}'::jsonb,
  objection_handling_trend jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.calls
  add column if not exists ai_provider text,
  add column if not exists ai_model text,
  add column if not exists analysis_mode text default 'fallback_rules',
  add column if not exists knowledge_version text;

alter table public.call_reports
  add column if not exists ai_provider text,
  add column if not exists ai_model text,
  add column if not exists analysis_mode text default 'fallback_rules',
  add column if not exists knowledge_version text,
  add column if not exists ai_metadata jsonb not null default '{}'::jsonb;

alter table public.call_scores
  add column if not exists dimension_title text,
  add column if not exists score numeric(4, 1),
  add column if not exists display_score text,
  add column if not exists is_na boolean not null default false,
  add column if not exists rubric_band text,
  add column if not exists rubric_text text,
  add column if not exists meta text,
  add column if not exists detail text,
  add column if not exists analysis_status text not null default 'graded',
  add column if not exists created_at timestamptz not null default timezone('utc', now()),
  add column if not exists updated_at timestamptz not null default timezone('utc', now());

alter table public.call_evidence
  add column if not exists evidence_type text not null default 'primary_quote',
  add column if not exists quote text,
  add column if not exists summary text,
  add column if not exists meta text,
  add column if not exists created_at timestamptz not null default timezone('utc', now());

alter table public.skill_progression_snapshots
  add column if not exists snapshot_date timestamptz not null default timezone('utc', now()),
  add column if not exists analysis_status text not null default 'graded',
  add column if not exists scores_per_dimension jsonb not null default '{}'::jsonb,
  add column if not exists total_score numeric(4, 1),
  add column if not exists costliest_mistake text,
  add column if not exists primary_focus text,
  add column if not exists tags jsonb not null default '[]'::jsonb,
  add column if not exists patterns_detected jsonb not null default '[]'::jsonb,
  add column if not exists weakest_dimension text,
  add column if not exists most_improved_dimension text,
  add column if not exists progression_summary text,
  add column if not exists top_weaknesses jsonb not null default '[]'::jsonb,
  add column if not exists closing_trend jsonb not null default '{}'::jsonb,
  add column if not exists discovery_trend jsonb not null default '{}'::jsonb,
  add column if not exists objection_handling_trend jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default timezone('utc', now()),
  add column if not exists updated_at timestamptz not null default timezone('utc', now());

create unique index if not exists idx_call_scores_call_dimension_unique
  on public.call_scores (call_id, dimension_key);
create unique index if not exists idx_skill_progression_call_unique
  on public.skill_progression_snapshots (call_id);
create index if not exists idx_call_scores_user_call
  on public.call_scores (user_id, call_id);
create index if not exists idx_call_evidence_user_call
  on public.call_evidence (user_id, call_id);
create index if not exists idx_skill_progression_snapshots_user_date
  on public.skill_progression_snapshots (user_id, snapshot_date desc);

drop trigger if exists on_call_scores_updated on public.call_scores;
create trigger on_call_scores_updated
before update on public.call_scores
for each row execute function public.touch_updated_at();

drop trigger if exists on_skill_progression_snapshots_updated on public.skill_progression_snapshots;
create trigger on_skill_progression_snapshots_updated
before update on public.skill_progression_snapshots
for each row execute function public.touch_updated_at();

alter table public.call_scores enable row level security;
alter table public.call_evidence enable row level security;
alter table public.skill_progression_snapshots enable row level security;

alter table public.call_scores force row level security;
alter table public.call_evidence force row level security;
alter table public.skill_progression_snapshots force row level security;

revoke all on table
  public.call_scores,
  public.call_evidence,
  public.skill_progression_snapshots
from public, anon, authenticated;

grant select, insert, update, delete on table
  public.call_scores,
  public.call_evidence,
  public.skill_progression_snapshots
to authenticated;

drop policy if exists "call_scores_owner_all" on public.call_scores;
create policy "call_scores_owner_all"
on public.call_scores for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "call_evidence_owner_all" on public.call_evidence;
create policy "call_evidence_owner_all"
on public.call_evidence for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "skill_progression_snapshots_owner_all" on public.skill_progression_snapshots;
create policy "skill_progression_snapshots_owner_all"
on public.skill_progression_snapshots for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

notify pgrst, 'reload schema';

commit;
