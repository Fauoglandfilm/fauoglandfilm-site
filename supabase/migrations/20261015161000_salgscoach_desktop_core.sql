begin;

create extension if not exists pgcrypto;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  last_seen_at timestamptz
);

-- Reconcile legacy/partial tables before any later table or index references
-- their columns. New columns stay nullable so existing rows never get guessed.
alter table public.users
  add column if not exists id uuid,
  add column if not exists email text,
  add column if not exists full_name text,
  add column if not exists avatar_url text,
  add column if not exists created_at timestamptz default timezone('utc', now()),
  add column if not exists updated_at timestamptz default timezone('utc', now()),
  add column if not exists last_seen_at timestamptz;

create unique index if not exists idx_salgscoach_users_id_unique
  on public.users (id);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.teams
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists owner_user_id uuid,
  add column if not exists name text,
  add column if not exists created_at timestamptz default timezone('utc', now()),
  add column if not exists updated_at timestamptz default timezone('utc', now());

create unique index if not exists idx_salgscoach_teams_id_unique
  on public.teams (id);

create table if not exists public.team_memberships (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default timezone('utc', now()),
  unique (team_id, user_id)
);

create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  source text not null check (source in ('live', 'manual', 'demo')),
  app_version text not null,
  analyzed_at timestamptz not null default timezone('utc', now()),
  call_type text not null,
  pipeline_stage text not null,
  call_goal text not null,
  outcome text,
  methodology_name text not null,
  duration_seconds integer not null default 0,
  north_star_score numeric(4, 1) not null,
  score_band text,
  talk_ratio_seller numeric(5, 2),
  talk_ratio_prospect numeric(5, 2),
  talk_ratio_reliable boolean not null default false,
  first_two_minute_sentiment numeric(6, 2) default 0,
  audio_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.call_metadata (
  call_id uuid primary key references public.calls (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  seller_name text,
  prospect_name text,
  company text,
  title text,
  call_type text,
  pipeline_stage text,
  methodology_name text,
  prospect_role text,
  call_goal text,
  industry text,
  acv_range text,
  industry_acv text,
  opener_tag text,
  declared_outcome text,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.call_transcripts (
  call_id uuid primary key references public.calls (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  raw_transcript text not null,
  cleaned_transcript text,
  transcript_segments jsonb not null default '[]'::jsonb,
  transcript_quality_label text,
  transcript_quality_score numeric(5, 2),
  transcript_quality_low_confidence boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.call_reports (
  call_id uuid primary key references public.calls (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  app_version text not null,
  report_text text not null,
  report_sections jsonb not null default '{}'::jsonb,
  scores jsonb not null default '{}'::jsonb,
  north_star_score numeric(4, 1) not null,
  tags jsonb not null default '[]'::jsonb,
  methodology_coverage jsonb not null default '{}'::jsonb,
  objection_categories jsonb not null default '[]'::jsonb,
  wins jsonb not null default '[]'::jsonb,
  must_fix jsonb not null default '[]'::jsonb,
  top_cost text,
  rewrites jsonb not null default '{}'::jsonb,
  action_plan jsonb not null default '{}'::jsonb,
  primary_goal text,
  summary_context text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.live_nudges (
  id uuid primary key default gen_random_uuid(),
  call_id uuid not null references public.calls (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  time_label text,
  nudge_type text,
  text text not null,
  critical boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.training_plans (
  id uuid primary key default gen_random_uuid(),
  call_id uuid not null unique references public.calls (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  plan_json jsonb not null default '{}'::jsonb,
  primary_goal text,
  methodology_question text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.historical_patterns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  call_id uuid references public.calls (id) on delete cascade,
  pattern_type text not null,
  summary text not null,
  recommendation text,
  streak_count integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.ab_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  call_id uuid not null unique references public.calls (id) on delete cascade,
  opener_tag text not null,
  success boolean not null default false,
  outcome text,
  first_two_minute_sentiment numeric(6, 2) default 0,
  notes jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.team_memberships
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists team_id uuid,
  add column if not exists user_id uuid,
  add column if not exists role text default 'member',
  add column if not exists created_at timestamptz default timezone('utc', now());

alter table public.call_metadata
  add column if not exists call_id uuid,
  add column if not exists user_id uuid,
  add column if not exists seller_name text,
  add column if not exists prospect_name text,
  add column if not exists company text,
  add column if not exists title text,
  add column if not exists call_type text,
  add column if not exists pipeline_stage text,
  add column if not exists methodology_name text,
  add column if not exists prospect_role text,
  add column if not exists call_goal text,
  add column if not exists industry text,
  add column if not exists acv_range text,
  add column if not exists industry_acv text,
  add column if not exists opener_tag text,
  add column if not exists declared_outcome text,
  add column if not exists metadata_json jsonb default '{}'::jsonb,
  add column if not exists created_at timestamptz default timezone('utc', now()),
  add column if not exists updated_at timestamptz default timezone('utc', now());

alter table public.call_transcripts
  add column if not exists call_id uuid,
  add column if not exists user_id uuid,
  add column if not exists raw_transcript text,
  add column if not exists cleaned_transcript text,
  add column if not exists transcript_segments jsonb default '[]'::jsonb,
  add column if not exists transcript_quality_label text,
  add column if not exists transcript_quality_score numeric(5, 2),
  add column if not exists transcript_quality_low_confidence boolean default false,
  add column if not exists created_at timestamptz default timezone('utc', now()),
  add column if not exists updated_at timestamptz default timezone('utc', now());

alter table public.call_reports
  add column if not exists call_id uuid,
  add column if not exists user_id uuid,
  add column if not exists app_version text,
  add column if not exists report_text text,
  add column if not exists report_sections jsonb default '{}'::jsonb,
  add column if not exists scores jsonb default '{}'::jsonb,
  add column if not exists north_star_score numeric(4, 1),
  add column if not exists tags jsonb default '[]'::jsonb,
  add column if not exists methodology_coverage jsonb default '{}'::jsonb,
  add column if not exists objection_categories jsonb default '[]'::jsonb,
  add column if not exists wins jsonb default '[]'::jsonb,
  add column if not exists must_fix jsonb default '[]'::jsonb,
  add column if not exists top_cost text,
  add column if not exists rewrites jsonb default '{}'::jsonb,
  add column if not exists action_plan jsonb default '{}'::jsonb,
  add column if not exists primary_goal text,
  add column if not exists summary_context text,
  add column if not exists created_at timestamptz default timezone('utc', now()),
  add column if not exists updated_at timestamptz default timezone('utc', now());

alter table public.live_nudges
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists call_id uuid,
  add column if not exists user_id uuid,
  add column if not exists time_label text,
  add column if not exists nudge_type text,
  add column if not exists text text,
  add column if not exists critical boolean default false,
  add column if not exists created_at timestamptz default timezone('utc', now());

alter table public.training_plans
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists call_id uuid,
  add column if not exists user_id uuid,
  add column if not exists plan_json jsonb default '{}'::jsonb,
  add column if not exists primary_goal text,
  add column if not exists methodology_question text,
  add column if not exists created_at timestamptz default timezone('utc', now()),
  add column if not exists updated_at timestamptz default timezone('utc', now());

alter table public.historical_patterns
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists user_id uuid,
  add column if not exists call_id uuid,
  add column if not exists pattern_type text,
  add column if not exists summary text,
  add column if not exists recommendation text,
  add column if not exists streak_count integer default 0,
  add column if not exists created_at timestamptz default timezone('utc', now());

alter table public.ab_tests
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists user_id uuid,
  add column if not exists call_id uuid,
  add column if not exists opener_tag text,
  add column if not exists success boolean default false,
  add column if not exists outcome text,
  add column if not exists first_two_minute_sentiment numeric(6, 2) default 0,
  add column if not exists notes jsonb default '{}'::jsonb,
  add column if not exists created_at timestamptz default timezone('utc', now());

create unique index if not exists idx_calls_id_user_id_unique
  on public.calls (id, user_id);
create unique index if not exists idx_team_memberships_team_user_unique
  on public.team_memberships (team_id, user_id);
create unique index if not exists idx_call_metadata_call_id_unique
  on public.call_metadata (call_id);
create unique index if not exists idx_call_transcripts_call_id_unique
  on public.call_transcripts (call_id);
create unique index if not exists idx_call_reports_call_id_unique
  on public.call_reports (call_id);
create unique index if not exists idx_training_plans_call_id_unique
  on public.training_plans (call_id);
create unique index if not exists idx_ab_tests_call_id_unique
  on public.ab_tests (call_id);

alter table public.call_metadata
  drop constraint if exists call_metadata_call_owner_fk;
alter table public.call_metadata
  add constraint call_metadata_call_owner_fk
  foreign key (call_id, user_id) references public.calls (id, user_id)
  on delete cascade not valid;

alter table public.call_transcripts
  drop constraint if exists call_transcripts_call_owner_fk;
alter table public.call_transcripts
  add constraint call_transcripts_call_owner_fk
  foreign key (call_id, user_id) references public.calls (id, user_id)
  on delete cascade not valid;

alter table public.call_reports
  drop constraint if exists call_reports_call_owner_fk;
alter table public.call_reports
  add constraint call_reports_call_owner_fk
  foreign key (call_id, user_id) references public.calls (id, user_id)
  on delete cascade not valid;

alter table public.live_nudges
  drop constraint if exists live_nudges_call_owner_fk;
alter table public.live_nudges
  add constraint live_nudges_call_owner_fk
  foreign key (call_id, user_id) references public.calls (id, user_id)
  on delete cascade not valid;

alter table public.training_plans
  drop constraint if exists training_plans_call_owner_fk;
alter table public.training_plans
  add constraint training_plans_call_owner_fk
  foreign key (call_id, user_id) references public.calls (id, user_id)
  on delete cascade not valid;

alter table public.historical_patterns
  drop constraint if exists historical_patterns_call_owner_fk;
alter table public.historical_patterns
  add constraint historical_patterns_call_owner_fk
  foreign key (call_id, user_id) references public.calls (id, user_id)
  on delete cascade not valid;

alter table public.ab_tests
  drop constraint if exists ab_tests_call_owner_fk;
alter table public.ab_tests
  add constraint ab_tests_call_owner_fk
  foreign key (call_id, user_id) references public.calls (id, user_id)
  on delete cascade not valid;

create index if not exists idx_calls_user_id_created_at on public.calls (user_id, analyzed_at desc);
create index if not exists idx_call_reports_user_id on public.call_reports (user_id);
create index if not exists idx_call_transcripts_user_id on public.call_transcripts (user_id);
create index if not exists idx_live_nudges_call_id on public.live_nudges (call_id);
create index if not exists idx_historical_patterns_user_id on public.historical_patterns (user_id, created_at desc);
create index if not exists idx_ab_tests_user_id on public.ab_tests (user_id, created_at desc);
create index if not exists idx_team_memberships_user_id on public.team_memberships (user_id);

drop trigger if exists on_users_updated on public.users;
create trigger on_users_updated
before update on public.users
for each row execute function public.touch_updated_at();

drop trigger if exists on_teams_updated on public.teams;
create trigger on_teams_updated
before update on public.teams
for each row execute function public.touch_updated_at();

drop trigger if exists on_calls_updated on public.calls;
create trigger on_calls_updated
before update on public.calls
for each row execute function public.touch_updated_at();

drop trigger if exists on_call_metadata_updated on public.call_metadata;
create trigger on_call_metadata_updated
before update on public.call_metadata
for each row execute function public.touch_updated_at();

drop trigger if exists on_call_transcripts_updated on public.call_transcripts;
create trigger on_call_transcripts_updated
before update on public.call_transcripts
for each row execute function public.touch_updated_at();

drop trigger if exists on_call_reports_updated on public.call_reports;
create trigger on_call_reports_updated
before update on public.call_reports
for each row execute function public.touch_updated_at();

drop trigger if exists on_training_plans_updated on public.training_plans;
create trigger on_training_plans_updated
before update on public.training_plans
for each row execute function public.touch_updated_at();

alter table public.users enable row level security;
alter table public.teams enable row level security;
alter table public.team_memberships enable row level security;
alter table public.calls enable row level security;
alter table public.call_metadata enable row level security;
alter table public.call_transcripts enable row level security;
alter table public.call_reports enable row level security;
alter table public.live_nudges enable row level security;
alter table public.training_plans enable row level security;
alter table public.historical_patterns enable row level security;
alter table public.ab_tests enable row level security;

alter table public.users force row level security;
alter table public.teams force row level security;
alter table public.team_memberships force row level security;
alter table public.calls force row level security;
alter table public.call_metadata force row level security;
alter table public.call_transcripts force row level security;
alter table public.call_reports force row level security;
alter table public.live_nudges force row level security;
alter table public.training_plans force row level security;
alter table public.historical_patterns force row level security;
alter table public.ab_tests force row level security;

revoke all on table
  public.users,
  public.teams,
  public.team_memberships,
  public.calls,
  public.call_metadata,
  public.call_transcripts,
  public.call_reports,
  public.live_nudges,
  public.training_plans,
  public.historical_patterns,
  public.ab_tests
from public, anon, authenticated;

grant select, insert, update on table public.users to authenticated;
grant select, insert, update, delete on table
  public.teams,
  public.team_memberships,
  public.calls,
  public.call_metadata,
  public.call_transcripts,
  public.call_reports,
  public.live_nudges,
  public.training_plans,
  public.historical_patterns,
  public.ab_tests
to authenticated;

drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
on public.users for select
to authenticated
using ((select auth.uid()) = id and (select public.is_salgscoach_member()));

drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own"
on public.users for insert
to authenticated
with check ((select auth.uid()) = id and (select public.is_salgscoach_member()));

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
on public.users for update
to authenticated
using ((select auth.uid()) = id and (select public.is_salgscoach_member()))
with check ((select auth.uid()) = id and (select public.is_salgscoach_member()));

drop policy if exists "teams_owner_all" on public.teams;
create policy "teams_owner_all"
on public.teams
for all
to authenticated
using (owner_user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (owner_user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "team_memberships_select_own" on public.team_memberships;
create policy "team_memberships_select_own"
on public.team_memberships
for select
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "team_memberships_manage_owner" on public.team_memberships;
create policy "team_memberships_manage_owner"
on public.team_memberships
for all
to authenticated
using (
  (select public.is_salgscoach_member())
  and
  exists (
    select 1
    from public.teams
    where public.teams.id = team_memberships.team_id
      and public.teams.owner_user_id = (select auth.uid())
  )
)
with check (
  (select public.is_salgscoach_member())
  and
  exists (
    select 1
    from public.teams
    where public.teams.id = team_memberships.team_id
      and public.teams.owner_user_id = (select auth.uid())
  )
);

drop policy if exists "calls_owner_all" on public.calls;
create policy "calls_owner_all"
on public.calls
for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "call_metadata_owner_all" on public.call_metadata;
create policy "call_metadata_owner_all"
on public.call_metadata
for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "call_transcripts_owner_all" on public.call_transcripts;
create policy "call_transcripts_owner_all"
on public.call_transcripts
for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "call_reports_owner_all" on public.call_reports;
create policy "call_reports_owner_all"
on public.call_reports
for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "live_nudges_owner_all" on public.live_nudges;
create policy "live_nudges_owner_all"
on public.live_nudges
for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "training_plans_owner_all" on public.training_plans;
create policy "training_plans_owner_all"
on public.training_plans
for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "historical_patterns_owner_all" on public.historical_patterns;
create policy "historical_patterns_owner_all"
on public.historical_patterns
for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "ab_tests_owner_all" on public.ab_tests;
create policy "ab_tests_owner_all"
on public.ab_tests
for all
to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

-- These restrictive gates are AND-combined with every legacy permissive
-- policy that may already exist on a partially migrated Supabase project.
drop policy if exists "users_salgscoach_gate" on public.users;
create policy "users_salgscoach_gate"
on public.users as restrictive for all to authenticated
using ((select auth.uid()) = id and (select public.is_salgscoach_member()))
with check ((select auth.uid()) = id and (select public.is_salgscoach_member()));

drop policy if exists "teams_salgscoach_gate" on public.teams;
create policy "teams_salgscoach_gate"
on public.teams as restrictive for all to authenticated
using (owner_user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (owner_user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "team_memberships_salgscoach_gate" on public.team_memberships;
create policy "team_memberships_salgscoach_gate"
on public.team_memberships as restrictive for all to authenticated
using (
  (select public.is_salgscoach_member())
  and (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.teams
      where public.teams.id = team_memberships.team_id
        and public.teams.owner_user_id = (select auth.uid())
    )
  )
)
with check (
  (select public.is_salgscoach_member())
  and (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.teams
      where public.teams.id = team_memberships.team_id
        and public.teams.owner_user_id = (select auth.uid())
    )
  )
);

drop policy if exists "call_metadata_salgscoach_gate" on public.call_metadata;
create policy "call_metadata_salgscoach_gate"
on public.call_metadata as restrictive for all to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "call_transcripts_salgscoach_gate" on public.call_transcripts;
create policy "call_transcripts_salgscoach_gate"
on public.call_transcripts as restrictive for all to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "call_reports_salgscoach_gate" on public.call_reports;
create policy "call_reports_salgscoach_gate"
on public.call_reports as restrictive for all to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "live_nudges_salgscoach_gate" on public.live_nudges;
create policy "live_nudges_salgscoach_gate"
on public.live_nudges as restrictive for all to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "training_plans_salgscoach_gate" on public.training_plans;
create policy "training_plans_salgscoach_gate"
on public.training_plans as restrictive for all to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "historical_patterns_salgscoach_gate" on public.historical_patterns;
create policy "historical_patterns_salgscoach_gate"
on public.historical_patterns as restrictive for all to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

drop policy if exists "ab_tests_salgscoach_gate" on public.ab_tests;
create policy "ab_tests_salgscoach_gate"
on public.ab_tests as restrictive for all to authenticated
using (user_id = (select auth.uid()) and (select public.is_salgscoach_member()))
with check (user_id = (select auth.uid()) and (select public.is_salgscoach_member()));

commit;
