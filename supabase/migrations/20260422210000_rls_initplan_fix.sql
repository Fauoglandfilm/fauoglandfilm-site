-- 20260422210000_rls_initplan_fix.sql
--
-- Fix Postgres initplan warnings on RLS policies by wrapping auth.uid()
-- in a scalar subquery. This causes Postgres to evaluate auth.uid() once
-- per query instead of once per row, which speeds up sequential scans
-- on larger tables.
--
-- Scope per user instruction: ONLY the four tables below. Do not touch
-- admin_* policies or policies on data_requests / admin_audit_logs.
--   - public.users_meta                (referred to as "users" in prompt)
--   - public.freelancer_profiles
--   - public.employer_profiles
--   - public.consent_logs              (referred to as "consent_log" in prompt)
--
-- Admin policies on these tables use public.is_admin() (not auth.uid()
-- directly) so they are left untouched per "Ikke endre noen andre policies".
--
-- Also (re)creates the missing index on consent_logs(user_id) idempotently.

begin;

--------------------------------------------------------------------------
-- public.users_meta
--------------------------------------------------------------------------

drop policy if exists select_own_meta on public.users_meta;
create policy select_own_meta
on public.users_meta
for select
to authenticated
using (id = (select auth.uid()));

drop policy if exists insert_own_meta on public.users_meta;
create policy insert_own_meta
on public.users_meta
for insert
to authenticated
with check (id = (select auth.uid()));

drop policy if exists update_own_meta on public.users_meta;
create policy update_own_meta
on public.users_meta
for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

--------------------------------------------------------------------------
-- public.employer_profiles
--------------------------------------------------------------------------

drop policy if exists select_own_employer_profile on public.employer_profiles;
create policy select_own_employer_profile
on public.employer_profiles
for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists insert_own_employer_profile on public.employer_profiles;
create policy insert_own_employer_profile
on public.employer_profiles
for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists update_own_employer_profile on public.employer_profiles;
create policy update_own_employer_profile
on public.employer_profiles
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

--------------------------------------------------------------------------
-- public.freelancer_profiles
--------------------------------------------------------------------------

drop policy if exists select_own_freelancer_profile on public.freelancer_profiles;
create policy select_own_freelancer_profile
on public.freelancer_profiles
for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists insert_own_freelancer_profile on public.freelancer_profiles;
create policy insert_own_freelancer_profile
on public.freelancer_profiles
for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists update_own_freelancer_profile on public.freelancer_profiles;
create policy update_own_freelancer_profile
on public.freelancer_profiles
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

--------------------------------------------------------------------------
-- public.consent_logs
--------------------------------------------------------------------------

drop policy if exists select_own_consent_logs on public.consent_logs;
create policy select_own_consent_logs
on public.consent_logs
for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists insert_own_consent_logs on public.consent_logs;
create policy insert_own_consent_logs
on public.consent_logs
for insert
to authenticated
with check (user_id = (select auth.uid()));

--------------------------------------------------------------------------
-- Missing index on consent_logs(user_id)
-- (Repo schema already has this, but the prompt flags it as missing in
-- the deployed DB. Idempotent — safe to re-run.)
--------------------------------------------------------------------------

create index if not exists consent_logs_user_id_idx
  on public.consent_logs (user_id);

commit;
