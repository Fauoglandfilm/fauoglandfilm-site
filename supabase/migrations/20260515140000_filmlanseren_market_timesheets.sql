begin;

alter table public.users_meta
  add column if not exists slug text,
  add column if not exists onboarding_status text not null default 'started',
  add column if not exists public_status text not null default 'private',
  add column if not exists moderation_status text not null default 'pending',
  add column if not exists last_seen_at timestamptz;

create unique index if not exists users_meta_slug_key
  on public.users_meta (slug)
  where slug is not null;

alter table public.freelancer_profiles
  add column if not exists slug text,
  add column if not exists headline text,
  add column if not exists bio text,
  add column if not exists city text,
  add column if not exists region text,
  add column if not exists availability_status text not null default 'hidden',
  add column if not exists is_public boolean not null default false,
  add column if not exists is_available boolean not null default false,
  add column if not exists portfolio_links jsonb not null default '[]'::jsonb,
  add column if not exists showreel_url text,
  add column if not exists license_tags text[] not null default '{}',
  add column if not exists rate_day integer,
  add column if not exists rate_hour integer,
  add column if not exists public_contact_mode text not null default 'request',
  add column if not exists moderation_status text not null default 'pending',
  add column if not exists approved_at timestamptz;

create unique index if not exists freelancer_profiles_slug_key
  on public.freelancer_profiles (slug)
  where slug is not null;

create index if not exists freelancer_profiles_public_idx
  on public.freelancer_profiles (is_public, moderation_status, availability_status);

alter table public.employer_profiles
  add column if not exists slug text,
  add column if not exists company_description text,
  add column if not exists website_url text,
  add column if not exists city text,
  add column if not exists region text,
  add column if not exists is_public boolean not null default false,
  add column if not exists verified_status text not null default 'pending',
  add column if not exists moderation_status text not null default 'pending',
  add column if not exists approved_at timestamptz;

create unique index if not exists employer_profiles_slug_key
  on public.employer_profiles (slug)
  where slug is not null;

create index if not exists employer_profiles_public_idx
  on public.employer_profiles (is_public, moderation_status, verified_status);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  employer_user_id uuid not null references public.users_meta(id) on delete cascade,
  title text not null,
  slug text not null unique,
  production_type text,
  description text not null,
  location text,
  region text,
  starts_on date,
  ends_on date,
  application_deadline date,
  compensation_label text,
  rate_amount integer,
  rate_unit text check (rate_unit in ('hour', 'day', 'project')),
  status text not null default 'draft' check (status in ('draft', 'open', 'filled', 'closed', 'archived')),
  is_public boolean not null default false,
  moderation_status text not null default 'pending' check (moderation_status in ('pending', 'approved', 'rejected', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_public_idx
  on public.jobs (is_public, moderation_status, status, created_at desc);

create index if not exists jobs_employer_user_id_idx
  on public.jobs (employer_user_id, created_at desc);

create table if not exists public.job_roles (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  role_tag text not null,
  created_at timestamptz not null default now(),
  unique (job_id, role_tag)
);

create index if not exists job_roles_role_tag_idx
  on public.job_roles (role_tag);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  freelancer_user_id uuid not null references public.users_meta(id) on delete cascade,
  message text,
  status text not null default 'interested' check (status in ('interested', 'contacted', 'shortlisted', 'declined', 'hired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, freelancer_user_id)
);

create index if not exists job_applications_job_id_idx
  on public.job_applications (job_id, created_at desc);

create index if not exists job_applications_freelancer_user_id_idx
  on public.job_applications (freelancer_user_id, created_at desc);

create table if not exists public.saved_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references public.users_meta(id) on delete cascade,
  freelancer_user_id uuid not null references public.users_meta(id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  unique (owner_user_id, freelancer_user_id)
);

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  requester_user_id uuid not null references public.users_meta(id) on delete cascade,
  target_user_id uuid not null references public.users_meta(id) on delete cascade,
  job_id uuid references public.jobs(id) on delete set null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_requests_target_user_id_idx
  on public.contact_requests (target_user_id, created_at desc);

create index if not exists contact_requests_requester_user_id_idx
  on public.contact_requests (requester_user_id, created_at desc);

create table if not exists public.timesheets (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references public.users_meta(id) on delete cascade,
  project_name text not null,
  employer_name text not null,
  role_label text not null,
  period_start date,
  period_end date,
  status text not null default 'draft' check (status in ('draft', 'exported', 'sent')),
  default_rate integer not null default 0,
  total_hours numeric(8,2) not null default 0,
  total_amount integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists timesheets_owner_user_id_idx
  on public.timesheets (owner_user_id, created_at desc);

create table if not exists public.timesheet_entries (
  id uuid primary key default gen_random_uuid(),
  timesheet_id uuid not null references public.timesheets(id) on delete cascade,
  work_date date not null,
  hours numeric(6,2) not null check (hours >= 0 and hours <= 24),
  rate integer not null default 0,
  supplement integer not null default 0,
  note text,
  line_total integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists timesheet_entries_timesheet_id_idx
  on public.timesheet_entries (timesheet_id, work_date);

create table if not exists public.moderation_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid references public.users_meta(id) on delete set null,
  subject_type text not null check (subject_type in ('freelancer_profile', 'employer_profile', 'job')),
  subject_id uuid not null,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'reviewing', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users_meta(id) on delete cascade,
  notification_type text not null,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_id_idx
  on public.notifications (user_id, read_at, created_at desc);

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at
before update on public.jobs
for each row execute function public.set_updated_at();

drop trigger if exists job_applications_set_updated_at on public.job_applications;
create trigger job_applications_set_updated_at
before update on public.job_applications
for each row execute function public.set_updated_at();

drop trigger if exists contact_requests_set_updated_at on public.contact_requests;
create trigger contact_requests_set_updated_at
before update on public.contact_requests
for each row execute function public.set_updated_at();

drop trigger if exists timesheets_set_updated_at on public.timesheets;
create trigger timesheets_set_updated_at
before update on public.timesheets
for each row execute function public.set_updated_at();

alter table public.jobs enable row level security;
alter table public.job_roles enable row level security;
alter table public.job_applications enable row level security;
alter table public.saved_profiles enable row level security;
alter table public.contact_requests enable row level security;
alter table public.timesheets enable row level security;
alter table public.timesheet_entries enable row level security;
alter table public.moderation_reports enable row level security;
alter table public.notifications enable row level security;

grant select on public.users_meta to anon, authenticated;
grant select on public.freelancer_profiles to anon, authenticated;
grant select on public.employer_profiles to anon, authenticated;
grant select on public.jobs to anon, authenticated;
grant select on public.job_roles to anon, authenticated;
grant select, insert, update on public.jobs to authenticated;
grant select, insert, update, delete on public.job_roles to authenticated;
grant select, insert, update on public.job_applications to authenticated;
grant select, insert, update, delete on public.saved_profiles to authenticated;
grant select, insert, update on public.contact_requests to authenticated;
grant select, insert, update, delete on public.timesheets to authenticated;
grant select, insert, update, delete on public.timesheet_entries to authenticated;
grant select, insert, update on public.moderation_reports to authenticated;
grant select, insert, update on public.notifications to authenticated;

drop policy if exists public_select_visible_users_meta on public.users_meta;
create policy public_select_visible_users_meta
on public.users_meta
for select
to anon, authenticated
using (
  deleted_at is null
  and (
    exists (
      select 1 from public.freelancer_profiles
      where freelancer_profiles.user_id = users_meta.id
        and freelancer_profiles.is_public = true
        and freelancer_profiles.moderation_status = 'approved'
    )
    or exists (
      select 1 from public.employer_profiles
      where employer_profiles.user_id = users_meta.id
        and employer_profiles.is_public = true
        and employer_profiles.moderation_status = 'approved'
    )
  )
);

drop policy if exists public_select_visible_freelancer_profiles on public.freelancer_profiles;
create policy public_select_visible_freelancer_profiles
on public.freelancer_profiles
for select
to anon, authenticated
using (is_public = true and moderation_status = 'approved');

drop policy if exists public_select_visible_employer_profiles on public.employer_profiles;
create policy public_select_visible_employer_profiles
on public.employer_profiles
for select
to anon, authenticated
using (is_public = true and moderation_status = 'approved');

drop policy if exists public_select_open_jobs on public.jobs;
create policy public_select_open_jobs
on public.jobs
for select
to anon, authenticated
using (is_public = true and moderation_status = 'approved' and status = 'open');

drop policy if exists manage_own_jobs on public.jobs;
create policy manage_own_jobs
on public.jobs
for all
to authenticated
using (employer_user_id = (select auth.uid()) or public.is_admin())
with check (employer_user_id = (select auth.uid()) or public.is_admin());

drop policy if exists public_select_roles_for_open_jobs on public.job_roles;
create policy public_select_roles_for_open_jobs
on public.job_roles
for select
to anon, authenticated
using (
  exists (
    select 1 from public.jobs
    where jobs.id = job_roles.job_id
      and jobs.is_public = true
      and jobs.moderation_status = 'approved'
      and jobs.status = 'open'
  )
);

drop policy if exists manage_roles_for_own_jobs on public.job_roles;
create policy manage_roles_for_own_jobs
on public.job_roles
for all
to authenticated
using (
  public.is_admin()
  or exists (
    select 1 from public.jobs
    where jobs.id = job_roles.job_id
      and jobs.employer_user_id = (select auth.uid())
  )
)
with check (
  public.is_admin()
  or exists (
    select 1 from public.jobs
    where jobs.id = job_roles.job_id
      and jobs.employer_user_id = (select auth.uid())
  )
);

drop policy if exists manage_visible_job_applications on public.job_applications;
create policy manage_visible_job_applications
on public.job_applications
for all
to authenticated
using (
  freelancer_user_id = (select auth.uid())
  or public.is_admin()
  or exists (
    select 1 from public.jobs
    where jobs.id = job_applications.job_id
      and jobs.employer_user_id = (select auth.uid())
  )
)
with check (
  freelancer_user_id = (select auth.uid())
  or public.is_admin()
  or exists (
    select 1 from public.jobs
    where jobs.id = job_applications.job_id
      and jobs.employer_user_id = (select auth.uid())
  )
);

drop policy if exists manage_own_saved_profiles on public.saved_profiles;
create policy manage_own_saved_profiles
on public.saved_profiles
for all
to authenticated
using (owner_user_id = (select auth.uid()) or public.is_admin())
with check (owner_user_id = (select auth.uid()) or public.is_admin());

drop policy if exists manage_visible_contact_requests on public.contact_requests;
create policy manage_visible_contact_requests
on public.contact_requests
for all
to authenticated
using (
  requester_user_id = (select auth.uid())
  or target_user_id = (select auth.uid())
  or public.is_admin()
)
with check (
  requester_user_id = (select auth.uid())
  or target_user_id = (select auth.uid())
  or public.is_admin()
);

drop policy if exists manage_own_timesheets on public.timesheets;
create policy manage_own_timesheets
on public.timesheets
for all
to authenticated
using (owner_user_id = (select auth.uid()) or public.is_admin())
with check (owner_user_id = (select auth.uid()) or public.is_admin());

drop policy if exists manage_entries_for_own_timesheets on public.timesheet_entries;
create policy manage_entries_for_own_timesheets
on public.timesheet_entries
for all
to authenticated
using (
  public.is_admin()
  or exists (
    select 1 from public.timesheets
    where timesheets.id = timesheet_entries.timesheet_id
      and timesheets.owner_user_id = (select auth.uid())
  )
)
with check (
  public.is_admin()
  or exists (
    select 1 from public.timesheets
    where timesheets.id = timesheet_entries.timesheet_id
      and timesheets.owner_user_id = (select auth.uid())
  )
);

drop policy if exists insert_moderation_reports on public.moderation_reports;
create policy insert_moderation_reports
on public.moderation_reports
for insert
to authenticated
with check (reporter_user_id = (select auth.uid()));

drop policy if exists admin_manage_moderation_reports on public.moderation_reports;
create policy admin_manage_moderation_reports
on public.moderation_reports
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists manage_own_notifications on public.notifications;
create policy manage_own_notifications
on public.notifications
for all
to authenticated
using (user_id = (select auth.uid()) or public.is_admin())
with check (user_id = (select auth.uid()) or public.is_admin());

commit;
