-- Minimal cloud contract shared by the desktop Salgscoach writer and the
-- private website dashboard. The website still treats the desktop app as the
-- source of recordings; this table contains only call-level summaries.

begin;

create extension if not exists pgcrypto;

-- Web login is shared with Frilanseren. An authenticated account is therefore
-- not sufficient authorization for private Salgscoach data. Membership is
-- provisioned by a database administrator after the user's auth account exists.
create table if not exists public.salgscoach_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.salgscoach_members enable row level security;
alter table public.salgscoach_members force row level security;

revoke all on table public.salgscoach_members from public, anon, authenticated;
grant select on table public.salgscoach_members to authenticated;

drop policy if exists "salgscoach_members_select_own" on public.salgscoach_members;
create policy "salgscoach_members_select_own"
on public.salgscoach_members
for select
to authenticated
using ((select auth.uid()) = user_id and active);

drop policy if exists "salgscoach_members_restrict_self" on public.salgscoach_members;
create policy "salgscoach_members_restrict_self"
on public.salgscoach_members
as restrictive
for select
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.is_salgscoach_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.salgscoach_members
    where user_id = (select auth.uid())
      and active
  );
$$;

revoke all on function public.is_salgscoach_member() from public, anon;
grant execute on function public.is_salgscoach_member() to authenticated;

create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  source text not null,
  app_version text not null,
  ai_provider text,
  ai_model text,
  analysis_mode text default 'fallback_rules',
  knowledge_version text,
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

-- `create table if not exists` does not reconcile an older partial table.
-- Keep all fields written by desktop/lib/repositories.js available without
-- imposing new NOT NULL constraints on legacy rows.
alter table public.calls
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists user_id uuid,
  add column if not exists source text,
  add column if not exists app_version text,
  add column if not exists ai_provider text,
  add column if not exists ai_model text,
  add column if not exists analysis_mode text default 'fallback_rules',
  add column if not exists knowledge_version text,
  add column if not exists analyzed_at timestamptz default timezone('utc', now()),
  add column if not exists call_type text,
  add column if not exists pipeline_stage text,
  add column if not exists call_goal text,
  add column if not exists outcome text,
  add column if not exists methodology_name text,
  add column if not exists duration_seconds integer default 0,
  add column if not exists north_star_score numeric(4, 1),
  add column if not exists score_band text,
  add column if not exists talk_ratio_seller numeric(5, 2),
  add column if not exists talk_ratio_prospect numeric(5, 2),
  add column if not exists talk_ratio_reliable boolean default false,
  add column if not exists first_two_minute_sentiment numeric(6, 2) default 0,
  add column if not exists audio_url text,
  add column if not exists created_at timestamptz default timezone('utc', now()),
  add column if not exists updated_at timestamptz default timezone('utc', now());

-- PostgREST uses the primary key as the default conflict target for upserts.
-- A legacy/partial table must therefore have a real `id` primary key, not
-- merely a unique index. Abort clearly instead of guessing if an incompatible
-- primary key or invalid legacy rows are present.
do $$
declare
  primary_key_columns text[];
begin
  select array_agg(attribute.attname order by key_column.ordinality)
    into primary_key_columns
  from pg_catalog.pg_constraint as constraint_record
  cross join lateral unnest(constraint_record.conkey)
    with ordinality as key_column(attribute_number, ordinality)
  join pg_catalog.pg_attribute as attribute
    on attribute.attrelid = constraint_record.conrelid
   and attribute.attnum = key_column.attribute_number
  where constraint_record.conrelid = 'public.calls'::regclass
    and constraint_record.contype = 'p';

  if primary_key_columns is null then
    if exists (select 1 from public.calls where id is null) then
      raise exception 'Salgscoach preflight failed: public.calls.id contains NULL';
    end if;
    if exists (
      select 1
      from public.calls
      group by id
      having count(*) > 1
    ) then
      raise exception 'Salgscoach preflight failed: public.calls.id contains duplicates';
    end if;

    alter table public.calls
      add constraint calls_pkey primary key (id);
  elsif primary_key_columns <> array['id']::text[] then
    raise exception
      'Salgscoach preflight failed: public.calls primary key must be exactly (id), found %',
      primary_key_columns;
  end if;
end;
$$;

-- The first desktop schema allowed only live/manual/demo, while the current
-- integration also writes wispr_flow. Keep this as a closed data-integrity
-- allowlist so malformed or invented source labels fail at the database edge.
alter table public.calls drop constraint if exists calls_source_check;
alter table public.calls drop constraint if exists calls_source_supported_check;
alter table public.calls drop constraint if exists calls_source_nonempty_check;
alter table public.calls
  add constraint calls_source_supported_check
  check (
    source is not null
    and source in ('live', 'manual', 'demo', 'wispr_flow')
  ) not valid;

create index if not exists idx_calls_user_id_created_at
  on public.calls (user_id, analyzed_at desc);

alter table public.calls enable row level security;
alter table public.calls force row level security;

revoke all on table public.calls from public, anon, authenticated;
grant select, insert, update, delete on table public.calls to authenticated;

drop policy if exists "calls_owner_all" on public.calls;
create policy "calls_owner_all"
on public.calls
for all
to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.is_salgscoach_member())
)
with check (
  (select auth.uid()) = user_id
  and (select public.is_salgscoach_member())
);

-- Restrictive policies are AND-combined with every permissive policy. This
-- prevents an unknown legacy policy from widening access on an older project.
drop policy if exists "calls_salgscoach_gate" on public.calls;
create policy "calls_salgscoach_gate"
on public.calls
as restrictive
for all
to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.is_salgscoach_member())
)
with check (
  (select auth.uid()) = user_id
  and (select public.is_salgscoach_member())
);

notify pgrst, 'reload schema';

commit;
