# Filmlanseren Market Timesheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first complete Filmlanseren release: an open film-industry marketplace with public freelancer/employer/job pages, protected applications/contact requests, admin moderation, and a hybrid timesheet tool with PDF export data.

**Architecture:** Extend the existing `/frilanseren` module instead of creating a new app. Add Supabase schema/migrations and focused TypeScript domain modules first, then wire them into Server Actions, public routes, dashboard routes, and admin routes. Keep payment, contracts, legal tariff calculation, AI matching, chat, and social feed outside this release.

**Tech Stack:** Next.js App Router, React 19, Supabase Auth/Postgres/Storage/RLS, Server Components, Server Actions, Zod, Node test runner via `tsx --test`, TypeScript, Tailwind-style utility classes already used by the repo.

---

## Scope Check

The approved design spec covers several subsystems. This plan keeps them in one release plan but breaks execution into independent phases that can be implemented and verified separately:

1. Schema and domain foundation.
2. Public marketplace read models.
3. Expanded profile editing and dashboard shell.
4. Public marketplace pages.
5. Jobs, applications, contact requests, and saved profiles.
6. Admin moderation.
7. Timesheets and PDF export data.
8. Final QA and launch checks.

Do not start contracts, payment, payroll, tariff automation, AI matching, chat, or social feed while executing this plan.

## Existing State To Preserve

- Current registration, login, forgot/reset password, dashboard, profile edit, media upload, admin user overview, cookie behavior, and GDPR actions must keep working.
- `next-env.d.ts` may be dirty from `next dev` changing `.next/types` to `.next/dev/types`; do not commit that generated change unless the user explicitly asks.
- Current verification commands:

```bash
npm test
npm run lint
npm run build
```

Expected before and after the full release: all pass.

## File Map

### Create

- `supabase/migrations/20260515140000_filmlanseren_market_timesheets.sql` - additive schema for public marketplace, jobs, applications, contact requests, moderation, notifications, and timesheets.
- `src/lib/frilanseren/market-constants.ts` - public marketplace option sets and statuses.
- `src/lib/frilanseren/slug.ts` - deterministic slug helpers.
- `src/lib/frilanseren/slug.test.ts` - slug tests.
- `src/lib/frilanseren/market-types.ts` - TypeScript types for public profiles, jobs, applications, contact requests, and timesheets.
- `src/lib/frilanseren/market-validation.ts` - Zod schemas for expanded profiles, jobs, applications, contact requests, and timesheets.
- `src/lib/frilanseren/market-validation.test.ts` - validation tests.
- `src/lib/frilanseren/market-mappers.ts` - pure mappers and filters that can be tested outside Next.js.
- `src/lib/frilanseren/market-queries.ts` - server-only public and protected marketplace queries.
- `src/lib/frilanseren/market-queries.test.ts` - pure mapper/filter tests.
- `src/lib/frilanseren/market-actions.ts` - Server Actions for public profile settings, job creation, applications, contact requests, saved profiles, and moderation.
- `src/lib/frilanseren/timesheet.ts` - pure timesheet calculations and export model.
- `src/lib/frilanseren/timesheet.test.ts` - calculation/export tests.
- `src/components/frilanseren/marketplace-shell.tsx` - layout frame for public marketplace pages.
- `src/components/frilanseren/search-filter-bar.tsx` - reusable search/filter surface.
- `src/components/frilanseren/freelancer-card.tsx` - public freelancer card.
- `src/components/frilanseren/employer-card.tsx` - public employer card.
- `src/components/frilanseren/job-card.tsx` - public job card.
- `src/components/frilanseren/job-application-form.tsx` - client form for interest/application.
- `src/components/frilanseren/contact-request-form.tsx` - client form for contact request.
- `src/components/frilanseren/job-form.tsx` - employer job create/edit form.
- `src/components/frilanseren/timesheet-form.tsx` - timesheet editor.
- `src/app/frilanseren/frilansere/page.tsx` - public freelancer index.
- `src/app/frilanseren/frilansere/[slug]/page.tsx` - public freelancer profile.
- `src/app/frilanseren/arbeidsgivere/page.tsx` - public employer index.
- `src/app/frilanseren/arbeidsgivere/[slug]/page.tsx` - public employer profile.
- `src/app/frilanseren/jobber/page.tsx` - public job index.
- `src/app/frilanseren/jobber/[slug]/page.tsx` - public job detail.
- `src/app/frilanseren/timeliste/page.tsx` - timesheet entry page.
- `src/app/frilanseren/dashboard/jobber/page.tsx` - employer job dashboard.
- `src/app/frilanseren/dashboard/soknader/page.tsx` - freelancer application dashboard.
- `src/app/frilanseren/dashboard/timelister/page.tsx` - timesheet dashboard.
- `src/app/frilanseren/dashboard/profil/page.tsx` - new profile edit route.
- `src/app/frilanseren/profile/page.tsx` can become a redirect or alias during migration.

### Modify

- `supabase/frilanseren_schema.sql` - fold the new additive schema into the canonical setup file after the migration is tested.
- `src/lib/frilanseren/constants.ts` - keep existing options, add compatibility exports if useful.
- `src/lib/frilanseren/types.ts` - either re-export new market types or keep legacy auth/profile types focused.
- `src/lib/frilanseren/validation.ts` - keep legacy auth/profile validation and import/reuse new expanded schemas where needed.
- `src/lib/frilanseren/actions.ts` - keep existing registration/profile actions working; delegate expanded marketplace mutations to `market-actions.ts` when possible.
- `src/lib/frilanseren/queries.ts` - keep auth context and admin overview; delegate marketplace reads to `market-queries.ts`.
- `src/components/frilanseren/profile-form.tsx` - expand profile fields and public visibility settings.
- `src/app/frilanseren/page.tsx` - replace pilot landing with market-first homepage.
- `src/app/frilanseren/dashboard/page.tsx` - add links and status summary for profile, jobs, applications, and timesheets.
- `src/app/frilanseren/admin/page.tsx` - add moderation queues and counts while preserving current user overview.
- `middleware.ts` - add dashboard child routes and protected mutations if necessary. Public pages must not require middleware auth.
- `README.md` - update local test flow and feature description after implementation.

---

## Task 1: Schema And Constants Foundation

**Files:**
- Create: `supabase/migrations/20260515140000_filmlanseren_market_timesheets.sql`
- Modify: `supabase/frilanseren_schema.sql`
- Create: `src/lib/frilanseren/market-constants.ts`
- Create: `src/lib/frilanseren/market-types.ts`

- [ ] **Step 1: Create marketplace constants**

Create `src/lib/frilanseren/market-constants.ts`:

```ts
export const MARKETPLACE_MODERATION_STATUSES = ["pending", "approved", "rejected", "hidden"] as const;
export const PUBLIC_VISIBILITY_STATUSES = ["private", "public"] as const;
export const AVAILABILITY_STATUSES = ["available", "busy", "hidden"] as const;
export const JOB_STATUSES = ["draft", "open", "filled", "closed", "archived"] as const;
export const APPLICATION_STATUSES = ["interested", "contacted", "shortlisted", "declined", "hired"] as const;
export const CONTACT_REQUEST_STATUSES = ["pending", "accepted", "declined"] as const;
export const TIMESHEET_STATUSES = ["draft", "exported", "sent"] as const;
export const RATE_UNITS = ["hour", "day", "project"] as const;

export const DEFAULT_MARKETPLACE_PAGE_SIZE = 24;
export const MAX_MARKETPLACE_PAGE_SIZE = 60;
export const MAX_PORTFOLIO_LINKS = 8;
export const MAX_TIMESHEET_ENTRIES = 120;
```

- [ ] **Step 2: Create market types**

Create `src/lib/frilanseren/market-types.ts`:

```ts
import {
  APPLICATION_STATUSES,
  AVAILABILITY_STATUSES,
  CONTACT_REQUEST_STATUSES,
  JOB_STATUSES,
  MARKETPLACE_MODERATION_STATUSES,
  RATE_UNITS,
  TIMESHEET_STATUSES,
} from "./market-constants";
import type { EmployerProfile, FreelancerProfile, UserRole } from "./types";

export type ModerationStatus = (typeof MARKETPLACE_MODERATION_STATUSES)[number];
export type PublicVisibilityStatus = "private" | "public";
export type AvailabilityStatus = (typeof AVAILABILITY_STATUSES)[number];
export type JobStatus = (typeof JOB_STATUSES)[number];
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type ContactRequestStatus = (typeof CONTACT_REQUEST_STATUSES)[number];
export type TimesheetStatus = (typeof TIMESHEET_STATUSES)[number];
export type RateUnit = (typeof RATE_UNITS)[number];

export type PortfolioLink = {
  label: string;
  url: string;
};

export type PublicFreelancerProfile = Pick<
  FreelancerProfile,
  "user_id" | "roles" | "experience_level" | "profile_image_path"
> & {
  slug: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
  city: string | null;
  region: string | null;
  availability_status: AvailabilityStatus;
  is_public: boolean;
  is_available: boolean;
  portfolio_links: PortfolioLink[];
  showreel_url: string | null;
  license_tags: string[];
  rate_day: number | null;
  rate_hour: number | null;
  approved_at: string | null;
  image_url: string | null;
};

export type PublicEmployerProfile = Pick<
  EmployerProfile,
  "user_id" | "company_name" | "production_types" | "annual_volume" | "logo_path"
> & {
  slug: string;
  full_name: string;
  company_description: string | null;
  website_url: string | null;
  city: string | null;
  region: string | null;
  is_public: boolean;
  verified_status: ModerationStatus;
  approved_at: string | null;
  image_url: string | null;
};

export type PublicJob = {
  id: string;
  employer_user_id: string;
  employer_slug: string | null;
  employer_name: string;
  title: string;
  slug: string;
  production_type: string | null;
  description: string;
  location: string | null;
  region: string | null;
  starts_on: string | null;
  ends_on: string | null;
  application_deadline: string | null;
  compensation_label: string | null;
  rate_amount: number | null;
  rate_unit: RateUnit | null;
  status: JobStatus;
  role_tags: string[];
  created_at: string;
};

export type JobApplication = {
  id: string;
  job_id: string;
  freelancer_user_id: string;
  message: string | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
};

export type ContactRequest = {
  id: string;
  requester_user_id: string;
  target_user_id: string;
  job_id: string | null;
  message: string | null;
  status: ContactRequestStatus;
  created_at: string;
  updated_at: string;
};

export type TimesheetEntryInput = {
  work_date: string;
  hours: number;
  rate: number;
  supplement: number;
  note?: string;
};

export type TimesheetExportModel = {
  title: string;
  freelancerName: string;
  employerName: string;
  projectName: string;
  role: string;
  periodLabel: string;
  entries: Array<TimesheetEntryInput & { lineTotal: number }>;
  totalHours: number;
  totalAmount: number;
  disclaimer: string;
};

export type ProfileOwnerRole = Extract<UserRole, "employer" | "freelancer">;
```

- [ ] **Step 3: Write additive migration**

Create `supabase/migrations/20260515140000_filmlanseren_market_timesheets.sql` with this full content:

```sql
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
```

- [ ] **Step 4: Copy additive schema into canonical setup file**

After the migration content is created, append the same additive table/column/policy definitions to `supabase/frilanseren_schema.sql` after the existing storage policies. Keep the existing schema idempotent. Do not remove existing tables or policies.

- [ ] **Step 5: Run focused verification**

Run:

```bash
npm test
```

Expected: existing tests pass. No tests use the SQL file directly yet, so this is a regression check.

- [ ] **Step 6: Commit foundation**

```bash
git add supabase/frilanseren_schema.sql supabase/migrations/20260515140000_filmlanseren_market_timesheets.sql src/lib/frilanseren/market-constants.ts src/lib/frilanseren/market-types.ts
git commit -m "feat(frilanseren): add marketplace schema foundation"
```

---

## Task 2: Slug And Validation Domain

**Files:**
- Create: `src/lib/frilanseren/slug.ts`
- Create: `src/lib/frilanseren/slug.test.ts`
- Create: `src/lib/frilanseren/market-validation.ts`
- Create: `src/lib/frilanseren/market-validation.test.ts`

- [ ] **Step 1: Write slug tests**

Create `src/lib/frilanseren/slug.test.ts`:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import { buildUniqueSlug, slugify } from "./slug";

test("slugify normalizes Norwegian names and removes punctuation", () => {
  assert.equal(slugify("Åse Øst Film & Lyd!"), "ase-ost-film-lyd");
});

test("slugify falls back when the source has no usable characters", () => {
  assert.equal(slugify("!!!", "profil"), "profil");
});

test("buildUniqueSlug returns base slug when it is unused", () => {
  assert.equal(buildUniqueSlug("Foto Oslo", new Set(["klipp-oslo"])), "foto-oslo");
});

test("buildUniqueSlug appends suffix when base slug exists", () => {
  assert.equal(buildUniqueSlug("Foto Oslo", new Set(["foto-oslo", "foto-oslo-2"])), "foto-oslo-3");
});
```

- [ ] **Step 2: Run slug tests and verify failure**

Run:

```bash
npm test -- src/lib/frilanseren/slug.test.ts
```

Expected: FAIL because `src/lib/frilanseren/slug.ts` does not exist.

- [ ] **Step 3: Implement slug helpers**

Create `src/lib/frilanseren/slug.ts`:

```ts
const NORWEGIAN_REPLACEMENTS: Record<string, string> = {
  æ: "ae",
  ø: "o",
  å: "a",
  Æ: "ae",
  Ø: "o",
  Å: "a",
};

export function slugify(value: string, fallback = "filmlanseren") {
  const normalized = value
    .replace(/[æøåÆØÅ]/g, (match) => NORWEGIAN_REPLACEMENTS[match] ?? match)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return normalized || fallback;
}

export function buildUniqueSlug(source: string, existingSlugs: ReadonlySet<string>, fallback = "filmlanseren") {
  const base = slugify(source, fallback);

  if (!existingSlugs.has(base)) {
    return base;
  }

  let suffix = 2;
  let candidate = `${base}-${suffix}`;

  while (existingSlugs.has(candidate)) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  return candidate;
}
```

- [ ] **Step 4: Verify slug tests pass**

Run:

```bash
npm test -- src/lib/frilanseren/slug.test.ts
```

Expected: PASS for all slug tests.

- [ ] **Step 5: Write validation tests**

Create `src/lib/frilanseren/market-validation.test.ts`:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import {
  jobApplicationSchema,
  jobFormSchema,
  publicFreelancerProfileSchema,
  timesheetFormSchema,
} from "./market-validation";

test("public freelancer profile requires city when profile is public", () => {
  const result = publicFreelancerProfileSchema.safeParse({
    full_name: "Ada Foto",
    roles: ["foto"],
    experience_level: "3_7",
    headline: "Filmfotograf",
    bio: "Jobber med reklame og dokumentar.",
    city: "",
    region: "Oslo",
    is_public: true,
    is_available: true,
    portfolio_links: [],
    showreel_url: "",
    license_tags: [],
    rate_day: "",
    rate_hour: "",
  });

  assert.equal(result.success, false);
  assert.equal(result.error.issues[0]?.path[0], "city");
});

test("job form requires at least one role and an open-friendly title", () => {
  const result = jobFormSchema.safeParse({
    title: "Opptak",
    production_type: "reklame",
    description: "Kort jobb",
    location: "Oslo",
    region: "Oslo",
    starts_on: "2026-06-01",
    ends_on: "2026-06-03",
    application_deadline: "2026-05-25",
    compensation_label: "Etter avtale",
    rate_amount: "",
    rate_unit: "",
    role_tags: [],
    is_public: true,
  });

  assert.equal(result.success, false);
  assert.equal(result.error.issues[0]?.path[0], "role_tags");
});

test("job application trims optional message", () => {
  const result = jobApplicationSchema.safeParse({
    job_id: "3fba9e25-0b45-46ed-927e-03bfdd9f7f6a",
    message: "  Jeg er ledig disse dagene.  ",
  });

  assert.equal(result.success, true);
  assert.equal(result.data.message, "Jeg er ledig disse dagene.");
});

test("timesheet validates entries and computes compatible numeric input", () => {
  const result = timesheetFormSchema.safeParse({
    project_name: "Kortfilm",
    employer_name: "Fau&Land Film",
    role_label: "Fotograf",
    period_start: "2026-06-01",
    period_end: "2026-06-02",
    default_rate: "650",
    entries: [
      {
        work_date: "2026-06-01",
        hours: "8",
        rate: "650",
        supplement: "0",
        note: "Dagopptak",
      },
    ],
  });

  assert.equal(result.success, true);
  assert.equal(result.data.entries[0]?.hours, 8);
});
```

- [ ] **Step 6: Run validation tests and verify failure**

Run:

```bash
npm test -- src/lib/frilanseren/market-validation.test.ts
```

Expected: FAIL because `market-validation.ts` does not exist.

- [ ] **Step 7: Implement market validation**

Create `src/lib/frilanseren/market-validation.ts`:

```ts
import { z } from "zod";

import {
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
} from "./constants";
import { MAX_PORTFOLIO_LINKS, MAX_TIMESHEET_ENTRIES, RATE_UNITS } from "./market-constants";

const requiredString = z.string().trim().min(1, "Fyll inn dette feltet.");
const optionalText = z.string().trim().optional().default("");
const optionalDate = z.string().trim().optional().default("");

const freelancerRoleEnum = z.enum(
  FREELANCER_ROLE_OPTIONS.map((option) => option.value) as [
    (typeof FREELANCER_ROLE_OPTIONS)[number]["value"],
    ...(typeof FREELANCER_ROLE_OPTIONS)[number]["value"][],
  ],
);

const freelancerExperienceEnum = z.enum(
  FREELANCER_EXPERIENCE_OPTIONS.map((option) => option.value) as [
    (typeof FREELANCER_EXPERIENCE_OPTIONS)[number]["value"],
    ...(typeof FREELANCER_EXPERIENCE_OPTIONS)[number]["value"][],
  ],
);

const productionTypeEnum = z.enum(
  EMPLOYER_PRODUCTION_TYPES.map((option) => option.value) as [
    (typeof EMPLOYER_PRODUCTION_TYPES)[number]["value"],
    ...(typeof EMPLOYER_PRODUCTION_TYPES)[number]["value"][],
  ],
);

const rateUnitEnum = z.enum(RATE_UNITS);

function optionalInteger(value: unknown) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : Number.NaN;
}

function requiredNumber(value: unknown) {
  const raw = String(value ?? "").trim();
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

const portfolioLinkSchema = z.object({
  label: requiredString.max(40, "Maks 40 tegn."),
  url: requiredString.url("Skriv inn en gyldig URL."),
});

export const publicFreelancerProfileSchema = z
  .object({
    full_name: requiredString,
    roles: z.array(freelancerRoleEnum).min(1, "Velg minst én rolle."),
    experience_level: freelancerExperienceEnum,
    headline: optionalText,
    bio: optionalText,
    city: optionalText,
    region: optionalText,
    is_public: z.boolean(),
    is_available: z.boolean(),
    portfolio_links: z.array(portfolioLinkSchema).max(MAX_PORTFOLIO_LINKS).default([]),
    showreel_url: optionalText,
    license_tags: z.array(z.string().trim().min(1)).default([]),
    rate_day: z.preprocess(optionalInteger, z.number().int().nonnegative().nullable()),
    rate_hour: z.preprocess(optionalInteger, z.number().int().nonnegative().nullable()),
  })
  .superRefine((value, context) => {
    if (value.is_public && !value.city) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["city"],
        message: "By/sted kreves for offentlig profil.",
      });
    }
  });

export const publicEmployerProfileSchema = z.object({
  full_name: requiredString,
  company_name: requiredString,
  production_types: z.array(productionTypeEnum).min(1, "Velg minst én produksjonstype."),
  annual_volume: z.enum(["1_2", "3_10", "10_plus"]),
  company_description: optionalText,
  website_url: optionalText,
  city: optionalText,
  region: optionalText,
  is_public: z.boolean(),
});

export const jobFormSchema = z.object({
  title: requiredString.min(4, "Skriv en tydelig jobbtittel."),
  production_type: productionTypeEnum.optional(),
  description: requiredString.min(20, "Beskriv jobben med minst 20 tegn."),
  location: optionalText,
  region: optionalText,
  starts_on: optionalDate,
  ends_on: optionalDate,
  application_deadline: optionalDate,
  compensation_label: optionalText,
  rate_amount: z.preprocess(optionalInteger, z.number().int().nonnegative().nullable()),
  rate_unit: z.union([rateUnitEnum, z.literal("")]).transform((value) => (value === "" ? null : value)),
  role_tags: z.array(freelancerRoleEnum).min(1, "Velg minst én rolle."),
  is_public: z.boolean(),
});

export const jobApplicationSchema = z.object({
  job_id: requiredString.uuid(),
  message: z
    .string()
    .trim()
    .max(1200, "Maks 1200 tegn.")
    .transform((value) => (value ? value : null)),
});

export const contactRequestSchema = z.object({
  target_user_id: requiredString.uuid(),
  job_id: z.union([requiredString.uuid(), z.literal("")]).transform((value) => (value === "" ? null : value)),
  message: requiredString.max(1200, "Maks 1200 tegn."),
});

export const timesheetEntrySchema = z.object({
  work_date: requiredString,
  hours: z.preprocess(requiredNumber, z.number().min(0).max(24)),
  rate: z.preprocess(requiredNumber, z.number().min(0)),
  supplement: z.preprocess(requiredNumber, z.number().min(0)),
  note: optionalText,
});

export const timesheetFormSchema = z.object({
  project_name: requiredString,
  employer_name: requiredString,
  role_label: requiredString,
  period_start: optionalDate,
  period_end: optionalDate,
  default_rate: z.preprocess(requiredNumber, z.number().min(0)),
  entries: z.array(timesheetEntrySchema).min(1, "Legg inn minst én linje.").max(MAX_TIMESHEET_ENTRIES),
});
```

- [ ] **Step 8: Verify validation tests pass**

Run:

```bash
npm test -- src/lib/frilanseren/market-validation.test.ts
```

Expected: PASS for all validation tests.

- [ ] **Step 9: Run full tests**

Run:

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 10: Commit slug and validation**

```bash
git add src/lib/frilanseren/slug.ts src/lib/frilanseren/slug.test.ts src/lib/frilanseren/market-validation.ts src/lib/frilanseren/market-validation.test.ts
git commit -m "feat(frilanseren): add marketplace validation"
```

---

## Task 3: Public Marketplace Query Layer

**Files:**
- Create: `src/lib/frilanseren/market-mappers.ts`
- Create: `src/lib/frilanseren/market-queries.ts`
- Create: `src/lib/frilanseren/market-queries.test.ts`

- [ ] **Step 1: Write mapper tests**

Create `src/lib/frilanseren/market-queries.test.ts`:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import {
  mapPublicFreelancerRow,
  mapPublicJobRow,
  publicProfileFilter,
} from "./market-mappers";

test("publicProfileFilter only allows public approved rows", () => {
  assert.equal(publicProfileFilter({ is_public: true, moderation_status: "approved" }), true);
  assert.equal(publicProfileFilter({ is_public: false, moderation_status: "approved" }), false);
  assert.equal(publicProfileFilter({ is_public: true, moderation_status: "pending" }), false);
});

test("mapPublicFreelancerRow removes private email-like data", () => {
  const mapped = mapPublicFreelancerRow({
    user_id: "user-1",
    slug: "ada-foto",
    roles: ["foto"],
    experience_level: "3_7",
    profile_image_path: "user-1/profile.webp",
    headline: "Filmfotograf",
    bio: "Dokumentar og reklame.",
    city: "Oslo",
    region: "Oslo",
    availability_status: "available",
    is_public: true,
    is_available: true,
    portfolio_links: [{ label: "Vimeo", url: "https://vimeo.com/example" }],
    showreel_url: "https://vimeo.com/showreel",
    license_tags: ["B"],
    rate_day: 6500,
    rate_hour: 850,
    approved_at: "2026-05-15T10:00:00.000Z",
    users_meta: { full_name: "Ada Foto", email: "ada@example.com" },
  });

  assert.equal(mapped.full_name, "Ada Foto");
  assert.equal("email" in mapped, false);
  assert.equal(mapped.image_url, null);
});

test("mapPublicJobRow flattens role tags", () => {
  const mapped = mapPublicJobRow({
    id: "job-1",
    employer_user_id: "employer-1",
    title: "Fotograf til reklamefilm",
    slug: "fotograf-reklamefilm",
    production_type: "reklame",
    description: "Vi trenger fotograf.",
    location: "Oslo",
    region: "Oslo",
    starts_on: "2026-06-01",
    ends_on: "2026-06-03",
    application_deadline: "2026-05-25",
    compensation_label: "Etter avtale",
    rate_amount: 6500,
    rate_unit: "day",
    status: "open",
    created_at: "2026-05-15T10:00:00.000Z",
    employer_profiles: { slug: "fau-land", company_name: "Fau&Land Film" },
    job_roles: [{ role_tag: "foto" }, { role_tag: "lys" }],
  });

  assert.deepEqual(mapped.role_tags, ["foto", "lys"]);
  assert.equal(mapped.employer_name, "Fau&Land Film");
});
```

- [ ] **Step 2: Run mapper tests and verify failure**

Run:

```bash
npm test -- src/lib/frilanseren/market-queries.test.ts
```

Expected: FAIL because `market-mappers.ts` does not exist.

- [ ] **Step 3: Implement pure query mappers**

Create `src/lib/frilanseren/market-mappers.ts`. This file must not import `server-only`, `next/navigation`, or Supabase helpers because the Node test runner imports it directly.

```ts
import type { PublicEmployerProfile, PublicFreelancerProfile, PublicJob } from "./market-types";

export type PublicStatusRow = {
  is_public: boolean;
  moderation_status: string;
};

export function publicProfileFilter(row: PublicStatusRow) {
  return row.is_public === true && row.moderation_status === "approved";
}

export type FreelancerRow = {
  user_id: string;
  slug: string;
  roles: string[];
  experience_level: "0_2" | "3_7" | "8_plus";
  profile_image_path: string | null;
  headline: string | null;
  bio: string | null;
  city: string | null;
  region: string | null;
  availability_status: "available" | "busy" | "hidden";
  is_public: boolean;
  is_available: boolean;
  portfolio_links: unknown;
  showreel_url: string | null;
  license_tags: string[];
  rate_day: number | null;
  rate_hour: number | null;
  approved_at: string | null;
  users_meta?: {
    full_name?: string | null;
  } | null;
};

export function mapPublicFreelancerRow(row: FreelancerRow): PublicFreelancerProfile {
  return {
    user_id: row.user_id,
    slug: row.slug,
    full_name: row.users_meta?.full_name ?? "Frilanser",
    roles: row.roles ?? [],
    experience_level: row.experience_level,
    profile_image_path: row.profile_image_path,
    headline: row.headline,
    bio: row.bio,
    city: row.city,
    region: row.region,
    availability_status: row.availability_status,
    is_public: row.is_public,
    is_available: row.is_available,
    portfolio_links: Array.isArray(row.portfolio_links) ? (row.portfolio_links as PublicFreelancerProfile["portfolio_links"]) : [],
    showreel_url: row.showreel_url,
    license_tags: row.license_tags ?? [],
    rate_day: row.rate_day,
    rate_hour: row.rate_hour,
    approved_at: row.approved_at,
    image_url: null,
  };
}

export type EmployerRow = {
  user_id: string;
  slug: string;
  company_name: string;
  production_types: string[];
  annual_volume: "1_2" | "3_10" | "10_plus";
  logo_path: string | null;
  company_description: string | null;
  website_url: string | null;
  city: string | null;
  region: string | null;
  is_public: boolean;
  verified_status: "pending" | "approved" | "rejected" | "hidden";
  approved_at: string | null;
  users_meta?: {
    full_name?: string | null;
  } | null;
};

export function mapPublicEmployerRow(row: EmployerRow): PublicEmployerProfile {
  return {
    user_id: row.user_id,
    slug: row.slug,
    full_name: row.users_meta?.full_name ?? row.company_name,
    company_name: row.company_name,
    production_types: row.production_types ?? [],
    annual_volume: row.annual_volume,
    logo_path: row.logo_path,
    company_description: row.company_description,
    website_url: row.website_url,
    city: row.city,
    region: row.region,
    is_public: row.is_public,
    verified_status: row.verified_status,
    approved_at: row.approved_at,
    image_url: null,
  };
}

export type JobRow = {
  id: string;
  employer_user_id: string;
  title: string;
  slug: string;
  production_type: string | null;
  description: string;
  location: string | null;
  region: string | null;
  starts_on: string | null;
  ends_on: string | null;
  application_deadline: string | null;
  compensation_label: string | null;
  rate_amount: number | null;
  rate_unit: "hour" | "day" | "project" | null;
  status: "draft" | "open" | "filled" | "closed" | "archived";
  created_at: string;
  employer_profiles?: {
    slug?: string | null;
    company_name?: string | null;
  } | null;
  job_roles?: Array<{
    role_tag: string;
  }> | null;
};

export function mapPublicJobRow(row: JobRow): PublicJob {
  return {
    id: row.id,
    employer_user_id: row.employer_user_id,
    employer_slug: row.employer_profiles?.slug ?? null,
    employer_name: row.employer_profiles?.company_name ?? "Arbeidsgiver",
    title: row.title,
    slug: row.slug,
    production_type: row.production_type,
    description: row.description,
    location: row.location,
    region: row.region,
    starts_on: row.starts_on,
    ends_on: row.ends_on,
    application_deadline: row.application_deadline,
    compensation_label: row.compensation_label,
    rate_amount: row.rate_amount,
    rate_unit: row.rate_unit,
    status: row.status,
    role_tags: row.job_roles?.map((role) => role.role_tag) ?? [],
    created_at: row.created_at,
  };
}
```

- [ ] **Step 4: Implement server queries**

Create `src/lib/frilanseren/market-queries.ts`:

```ts
import "server-only";

import { notFound } from "next/navigation";

import { hasSupabaseAdminConfig } from "@/lib/env";
import { createAdminClient, createServerComponentClient } from "@/lib/supabase/serverClient";

import { FRILANSEREN_MEDIA_BUCKET } from "./constants";
import { DEFAULT_MARKETPLACE_PAGE_SIZE, MAX_MARKETPLACE_PAGE_SIZE } from "./market-constants";
import {
  mapPublicEmployerRow,
  mapPublicFreelancerRow,
  mapPublicJobRow,
  type EmployerRow,
  type FreelancerRow,
  type JobRow,
} from "./market-mappers";

async function createSignedImageUrl(path: string | null | undefined) {
  if (!path || !hasSupabaseAdminConfig()) {
    return null;
  }

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from(FRILANSEREN_MEDIA_BUCKET)
    .createSignedUrl(path, 60 * 60);

  if (error) {
    console.error("[frilanseren/market-signed-image-url-failed]", {
      path,
      message: error.message,
    });
    return null;
  }

  return data.signedUrl;
}

function clampLimit(limit?: number) {
  if (!limit) return DEFAULT_MARKETPLACE_PAGE_SIZE;
  return Math.min(Math.max(1, limit), MAX_MARKETPLACE_PAGE_SIZE);
}

export async function listPublicFreelancers(options?: { role?: string; query?: string; limit?: number }) {
  const supabase = await createServerComponentClient();
  let query = supabase
    .from("freelancer_profiles")
    .select("*, users_meta(full_name)")
    .eq("is_public", true)
    .eq("moderation_status", "approved")
    .order("approved_at", { ascending: false })
    .limit(clampLimit(options?.limit));

  if (options?.role) {
    query = query.contains("roles", [options.role]);
  }

  if (options?.query) {
    query = query.or(`headline.ilike.%${options.query}%,city.ilike.%${options.query}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return Promise.all(
    (data ?? []).map(async (row) => ({
      ...mapPublicFreelancerRow(row as FreelancerRow),
      image_url: await createSignedImageUrl((row as FreelancerRow).profile_image_path),
    })),
  );
}

export async function getPublicFreelancerBySlug(slug: string) {
  const supabase = await createServerComponentClient();
  const { data, error } = await supabase
    .from("freelancer_profiles")
    .select("*, users_meta(full_name)")
    .eq("slug", slug)
    .eq("is_public", true)
    .eq("moderation_status", "approved")
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  return {
    ...mapPublicFreelancerRow(data as FreelancerRow),
    image_url: await createSignedImageUrl((data as FreelancerRow).profile_image_path),
  };
}

export async function listPublicEmployers(options?: { query?: string; limit?: number }) {
  const supabase = await createServerComponentClient();
  let query = supabase
    .from("employer_profiles")
    .select("*, users_meta(full_name)")
    .eq("is_public", true)
    .eq("moderation_status", "approved")
    .order("approved_at", { ascending: false })
    .limit(clampLimit(options?.limit));

  if (options?.query) {
    query = query.or(`company_name.ilike.%${options.query}%,city.ilike.%${options.query}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return Promise.all(
    (data ?? []).map(async (row) => ({
      ...mapPublicEmployerRow(row as EmployerRow),
      image_url: await createSignedImageUrl((row as EmployerRow).logo_path),
    })),
  );
}

export async function getPublicEmployerBySlug(slug: string) {
  const supabase = await createServerComponentClient();
  const { data, error } = await supabase
    .from("employer_profiles")
    .select("*, users_meta(full_name)")
    .eq("slug", slug)
    .eq("is_public", true)
    .eq("moderation_status", "approved")
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  return {
    ...mapPublicEmployerRow(data as EmployerRow),
    image_url: await createSignedImageUrl((data as EmployerRow).logo_path),
  };
}

export async function listPublicJobs(options?: { role?: string; query?: string; limit?: number }) {
  const supabase = await createServerComponentClient();
  let query = supabase
    .from("jobs")
    .select("*, employer_profiles(slug, company_name), job_roles(role_tag)")
    .eq("is_public", true)
    .eq("moderation_status", "approved")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(clampLimit(options?.limit));

  if (options?.query) {
    query = query.or(`title.ilike.%${options.query}%,description.ilike.%${options.query}%,location.ilike.%${options.query}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  const jobs = (data ?? []).map((row) => mapPublicJobRow(row as JobRow));

  if (!options?.role) {
    return jobs;
  }

  return jobs.filter((job) => job.role_tags.includes(options.role as string));
}

export async function getPublicJobBySlug(slug: string) {
  const supabase = await createServerComponentClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*, employer_profiles(slug, company_name), job_roles(role_tag)")
    .eq("slug", slug)
    .eq("is_public", true)
    .eq("moderation_status", "approved")
    .eq("status", "open")
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  return mapPublicJobRow(data as JobRow);
}
```

- [ ] **Step 5: Verify mapper tests pass**

Run:

```bash
npm test -- src/lib/frilanseren/market-queries.test.ts
```

Expected: PASS for mapper tests.

- [ ] **Step 6: Run full tests**

Run:

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 7: Commit query layer**

```bash
git add src/lib/frilanseren/market-mappers.ts src/lib/frilanseren/market-queries.ts src/lib/frilanseren/market-queries.test.ts
git commit -m "feat(frilanseren): add marketplace query layer"
```

---

## Task 4: Timesheet Domain

**Files:**
- Create: `src/lib/frilanseren/timesheet.ts`
- Create: `src/lib/frilanseren/timesheet.test.ts`

- [ ] **Step 1: Write timesheet tests**

Create `src/lib/frilanseren/timesheet.test.ts`:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildTimesheetExportModel,
  calculateTimesheetEntry,
  calculateTimesheetTotals,
  formatPeriodLabel,
} from "./timesheet";

test("calculateTimesheetEntry multiplies hours and rate then adds supplement", () => {
  assert.equal(
    calculateTimesheetEntry({
      work_date: "2026-06-01",
      hours: 8,
      rate: 650,
      supplement: 250,
      note: "",
    }).lineTotal,
    5450,
  );
});

test("calculateTimesheetTotals sums hours and amounts", () => {
  const totals = calculateTimesheetTotals([
    { work_date: "2026-06-01", hours: 8, rate: 650, supplement: 0, note: "" },
    { work_date: "2026-06-02", hours: 6.5, rate: 650, supplement: 500, note: "" },
  ]);

  assert.equal(totals.totalHours, 14.5);
  assert.equal(totals.totalAmount, 9725);
});

test("formatPeriodLabel handles missing dates", () => {
  assert.equal(formatPeriodLabel(null, null), "Ikke satt");
  assert.equal(formatPeriodLabel("2026-06-01", "2026-06-03"), "01.06.2026 - 03.06.2026");
});

test("buildTimesheetExportModel includes disclaimer", () => {
  const model = buildTimesheetExportModel({
    freelancerName: "Ada Foto",
    employerName: "Fau&Land Film",
    projectName: "Kortfilm",
    role: "Fotograf",
    periodStart: "2026-06-01",
    periodEnd: "2026-06-01",
    entries: [{ work_date: "2026-06-01", hours: 8, rate: 650, supplement: 0, note: "Dag" }],
  });

  assert.equal(model.totalAmount, 5200);
  assert.match(model.disclaimer, /ikke en automatisk juridisk lønnsgaranti/i);
});
```

- [ ] **Step 2: Run timesheet tests and verify failure**

Run:

```bash
npm test -- src/lib/frilanseren/timesheet.test.ts
```

Expected: FAIL because `timesheet.ts` does not exist.

- [ ] **Step 3: Implement timesheet domain**

Create `src/lib/frilanseren/timesheet.ts`:

```ts
import type { TimesheetEntryInput, TimesheetExportModel } from "./market-types";

export const TIMESHEET_DISCLAIMER =
  "Denne PDF-en er en timeliste og et arbeidsunderlag. Den er ikke en automatisk juridisk lønnsgaranti eller full tariffberegning.";

function roundMoney(value: number) {
  return Math.round(value);
}

function formatNorwegianDate(value: string) {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

export function calculateTimesheetEntry(entry: TimesheetEntryInput) {
  const lineTotal = roundMoney(entry.hours * entry.rate + entry.supplement);

  return {
    ...entry,
    lineTotal,
  };
}

export function calculateTimesheetTotals(entries: TimesheetEntryInput[]) {
  const calculated = entries.map(calculateTimesheetEntry);

  return {
    entries: calculated,
    totalHours: Number(calculated.reduce((sum, entry) => sum + entry.hours, 0).toFixed(2)),
    totalAmount: calculated.reduce((sum, entry) => sum + entry.lineTotal, 0),
  };
}

export function formatPeriodLabel(periodStart: string | null | undefined, periodEnd: string | null | undefined) {
  if (!periodStart && !periodEnd) {
    return "Ikke satt";
  }

  if (periodStart && periodEnd) {
    return `${formatNorwegianDate(periodStart)} - ${formatNorwegianDate(periodEnd)}`;
  }

  return formatNorwegianDate(periodStart ?? periodEnd ?? "");
}

export function buildTimesheetExportModel(input: {
  freelancerName: string;
  employerName: string;
  projectName: string;
  role: string;
  periodStart?: string | null;
  periodEnd?: string | null;
  entries: TimesheetEntryInput[];
}): TimesheetExportModel {
  const totals = calculateTimesheetTotals(input.entries);

  return {
    title: `Timeliste - ${input.projectName}`,
    freelancerName: input.freelancerName,
    employerName: input.employerName,
    projectName: input.projectName,
    role: input.role,
    periodLabel: formatPeriodLabel(input.periodStart, input.periodEnd),
    entries: totals.entries,
    totalHours: totals.totalHours,
    totalAmount: totals.totalAmount,
    disclaimer: TIMESHEET_DISCLAIMER,
  };
}
```

- [ ] **Step 4: Verify timesheet tests pass**

Run:

```bash
npm test -- src/lib/frilanseren/timesheet.test.ts
```

Expected: PASS for all timesheet tests.

- [ ] **Step 5: Run full tests and commit**

```bash
npm test
git add src/lib/frilanseren/timesheet.ts src/lib/frilanseren/timesheet.test.ts
git commit -m "feat(frilanseren): add timesheet calculations"
```

Expected: all tests pass before commit.

---

## Task 5: Public Marketplace Components

**Files:**
- Create: `src/components/frilanseren/marketplace-shell.tsx`
- Create: `src/components/frilanseren/search-filter-bar.tsx`
- Create: `src/components/frilanseren/freelancer-card.tsx`
- Create: `src/components/frilanseren/employer-card.tsx`
- Create: `src/components/frilanseren/job-card.tsx`

- [ ] **Step 1: Create marketplace shell**

Create `src/components/frilanseren/marketplace-shell.tsx`:

```tsx
import type { ReactNode } from "react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

type MarketplaceShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function MarketplaceShell({
  eyebrow = "Filmlanseren",
  title,
  description,
  actions,
  children,
  className,
}: MarketplaceShellProps) {
  return (
    <div className={cn("mx-auto max-w-7xl space-y-8", className)}>
      <header className="space-y-5">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted-2)]">
          <Link href="/frilanseren" className="font-semibold text-[color:var(--foreground)]">
            Oversikt
          </Link>
          <Link href="/frilanseren/frilansere">Frilansere</Link>
          <Link href="/frilanseren/jobber">Jobber</Link>
          <Link href="/frilanseren/arbeidsgivere">Arbeidsgivere</Link>
          <Link href="/frilanseren/timeliste">Timeliste</Link>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="space-y-3">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.96] tracking-[-0.055em] text-[color:var(--foreground)]">
              {title}
            </h1>
            <p className="max-w-3xl text-[1.02rem] leading-7 text-[var(--muted-2)]">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {actions ?? (
              <>
                <ButtonLink href="/frilanseren/register?role=freelancer">Opprett frilansprofil</ButtonLink>
                <ButtonLink href="/frilanseren/register?role=employer" variant="ghost">
                  Legg ut jobb
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create search filter bar**

Create `src/components/frilanseren/search-filter-bar.tsx`:

```tsx
type SearchFilterBarProps = {
  query?: string;
  role?: string;
  placeholder: string;
  action: string;
  roleOptions?: ReadonlyArray<{ value: string; label: string }>;
};

export function SearchFilterBar({ query, role, placeholder, action, roleOptions = [] }: SearchFilterBarProps) {
  return (
    <form
      action={action}
      className="grid gap-3 rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-4 shadow-[0_18px_50px_rgba(12,14,18,0.08)] md:grid-cols-[minmax(0,1fr)_14rem_auto]"
    >
      <input
        name="q"
        defaultValue={query}
        placeholder={placeholder}
        className="form-input"
      />
      <select name="role" defaultValue={role ?? ""} className="form-input">
        <option value="">Alle roller</option>
        {roleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button type="submit" className="button-base button-size-default button-primary">
        <span className="button-label-base">Søk</span>
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Create cards**

Create `src/components/frilanseren/freelancer-card.tsx`:

```tsx
import Link from "next/link";

import type { PublicFreelancerProfile } from "@/lib/frilanseren/market-types";

export function FreelancerCard({ profile }: { profile: PublicFreelancerProfile }) {
  const roleLabel = profile.roles[0] ?? "Filmarbeider";

  return (
    <article className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-4">
      <div className="flex gap-4">
        {profile.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.image_url} alt="" className="h-20 w-20 rounded-[1.2rem] object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.2rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Bilde
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
            <Link href={`/frilanseren/frilansere/${profile.slug}`}>{profile.full_name}</Link>
          </h2>
          <p className="mt-1 text-sm text-[var(--muted-2)]">{profile.headline || roleLabel}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {[profile.city, profile.region].filter(Boolean).join(", ") || "Norge"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.is_available ? (
              <span className="rounded-full bg-[#e7f7ee] px-2.5 py-1 text-xs font-semibold text-[#087443]">
                Ledig for oppdrag
              </span>
            ) : null}
            {profile.roles.slice(0, 3).map((role) => (
              <span key={role} className="rounded-full border border-[color:var(--line)] px-2.5 py-1 text-xs text-[var(--muted-2)]">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
```

Create `src/components/frilanseren/employer-card.tsx`:

```tsx
import Link from "next/link";

import type { PublicEmployerProfile } from "@/lib/frilanseren/market-types";

export function EmployerCard({ profile }: { profile: PublicEmployerProfile }) {
  return (
    <article className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-4">
      <div className="flex gap-4">
        {profile.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.image_url} alt="" className="h-20 w-20 rounded-[1.2rem] object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.2rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Logo
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
            <Link href={`/frilanseren/arbeidsgivere/${profile.slug}`}>{profile.company_name}</Link>
          </h2>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--muted-2)]">
            {profile.company_description || "Produksjonsselskap i Filmlanseren."}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {[profile.city, profile.region].filter(Boolean).join(", ") || "Norge"}
          </p>
        </div>
      </div>
    </article>
  );
}
```

Create `src/components/frilanseren/job-card.tsx`:

```tsx
import Link from "next/link";

import type { PublicJob } from "@/lib/frilanseren/market-types";

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("nb-NO", { dateStyle: "medium" }).format(new Date(`${value}T00:00:00.000Z`));
}

export function JobCard({ job }: { job: PublicJob }) {
  const period = [formatDate(job.starts_on), formatDate(job.ends_on)].filter(Boolean).join(" - ");

  return (
    <article className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-5">
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">{job.employer_name}</p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.035em] text-[color:var(--foreground)]">
            <Link href={`/frilanseren/jobber/${job.slug}`}>{job.title}</Link>
          </h2>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-[var(--muted-2)]">{job.description}</p>
        <dl className="grid gap-2 text-sm text-[var(--muted-2)] sm:grid-cols-3">
          <div><dt className="font-semibold text-[color:var(--foreground)]">Sted</dt><dd>{job.location || "Ikke satt"}</dd></div>
          <div><dt className="font-semibold text-[color:var(--foreground)]">Periode</dt><dd>{period || "Ikke satt"}</dd></div>
          <div><dt className="font-semibold text-[color:var(--foreground)]">Honorar</dt><dd>{job.compensation_label || "Etter avtale"}</dd></div>
        </dl>
        <div className="flex flex-wrap gap-2">
          {job.role_tags.map((role) => (
            <span key={role} className="rounded-full border border-[color:var(--line)] px-2.5 py-1 text-xs text-[var(--muted-2)]">
              {role}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS. If `line-clamp-2` is not supported by local CSS/Tailwind setup, replace it with existing text truncation styles or remove the class.

- [ ] **Step 5: Commit components**

```bash
git add src/components/frilanseren/marketplace-shell.tsx src/components/frilanseren/search-filter-bar.tsx src/components/frilanseren/freelancer-card.tsx src/components/frilanseren/employer-card.tsx src/components/frilanseren/job-card.tsx
git commit -m "feat(frilanseren): add marketplace display components"
```

---

## Task 6: Public Marketplace Pages

**Files:**
- Modify: `src/app/frilanseren/page.tsx`
- Create: `src/app/frilanseren/frilansere/page.tsx`
- Create: `src/app/frilanseren/frilansere/[slug]/page.tsx`
- Create: `src/app/frilanseren/arbeidsgivere/page.tsx`
- Create: `src/app/frilanseren/arbeidsgivere/[slug]/page.tsx`
- Create: `src/app/frilanseren/jobber/page.tsx`
- Create: `src/app/frilanseren/jobber/[slug]/page.tsx`

- [ ] **Step 1: Replace marketplace homepage**

Modify `src/app/frilanseren/page.tsx` to fetch public lists and render market-first content:

```tsx
import { EmployerCard } from "@/components/frilanseren/employer-card";
import { FreelancerCard } from "@/components/frilanseren/freelancer-card";
import { JobCard } from "@/components/frilanseren/job-card";
import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { SearchFilterBar } from "@/components/frilanseren/search-filter-bar";
import { ButtonLink } from "@/components/ui/button-link";
import { FREELANCER_ROLE_OPTIONS } from "@/lib/frilanseren/constants";
import { listPublicEmployers, listPublicFreelancers, listPublicJobs } from "@/lib/frilanseren/market-queries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Filmlanseren",
  description: "Finn filmarbeidere, jobber og produksjonsselskaper i norsk filmbransje.",
  path: "/frilanseren",
});

export default async function FrilanserenEntryPage() {
  const [freelancers, jobs, employers] = await Promise.all([
    listPublicFreelancers({ limit: 6 }),
    listPublicJobs({ limit: 4 }),
    listPublicEmployers({ limit: 4 }),
  ]);

  return (
    <MarketplaceShell
      title="Finn filmfolk, jobber og produksjonsselskaper"
      description="Filmlanseren samler norsk filmbransje i en åpen markedsplass for frilansere, arbeidsgivere og oppdrag."
      actions={
        <>
          <ButtonLink href="/frilanseren/register?role=freelancer">Opprett frilansprofil</ButtonLink>
          <ButtonLink href="/frilanseren/register?role=employer" variant="ghost">
            Legg ut jobb
          </ButtonLink>
        </>
      }
    >
      <SearchFilterBar
        action="/frilanseren/frilansere"
        placeholder="Søk etter fotograf, klipper, produsent..."
        roleOptions={FREELANCER_ROLE_OPTIONS}
      />

      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">Frilansere</h2>
            <p className="text-sm text-[var(--muted-2)]">Profiler som er åpne og godkjent.</p>
          </div>
          <ButtonLink href="/frilanseren/frilansere" variant="ghost" size="compact">Se alle</ButtonLink>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {freelancers.map((profile) => <FreelancerCard key={profile.user_id} profile={profile} />)}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">Åpne jobber</h2>
            <p className="text-sm text-[var(--muted-2)]">Søk/interesse krever innlogging.</p>
          </div>
          <ButtonLink href="/frilanseren/jobber" variant="ghost" size="compact">Se jobber</ButtonLink>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">Arbeidsgivere</h2>
            <p className="text-sm text-[var(--muted-2)]">Selskaper som er åpne og godkjent.</p>
          </div>
          <ButtonLink href="/frilanseren/arbeidsgivere" variant="ghost" size="compact">Se arbeidsgivere</ButtonLink>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {employers.map((profile) => <EmployerCard key={profile.user_id} profile={profile} />)}
        </div>
      </section>
    </MarketplaceShell>
  );
}
```

- [ ] **Step 2: Create freelancer index page**

Create `src/app/frilanseren/frilansere/page.tsx` with the same `MarketplaceShell`, `SearchFilterBar`, and `FreelancerCard`. Read `searchParams` as a Promise, pass `q` and `role` to `listPublicFreelancers`, and render an empty state:

```tsx
import { FreelancerCard } from "@/components/frilanseren/freelancer-card";
import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { SearchFilterBar } from "@/components/frilanseren/search-filter-bar";
import { FREELANCER_ROLE_OPTIONS } from "@/lib/frilanseren/constants";
import { listPublicFreelancers } from "@/lib/frilanseren/market-queries";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<{ q?: string; role?: string }>;
};

export const metadata = buildMetadata({
  title: "Frilansere",
  description: "Finn filmfrilansere etter rolle, sted og tilgjengelighet.",
  path: "/frilanseren/frilansere",
});

export default async function FreelancersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const freelancers = await listPublicFreelancers({ query: params.q, role: params.role });

  return (
    <MarketplaceShell title="Frilansere" description="Søk i godkjente, åpne profiler fra norsk filmbransje.">
      <SearchFilterBar
        action="/frilanseren/frilansere"
        query={params.q}
        role={params.role}
        placeholder="Søk etter navn, rolle eller sted"
        roleOptions={FREELANCER_ROLE_OPTIONS}
      />
      {freelancers.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {freelancers.map((profile) => <FreelancerCard key={profile.user_id} profile={profile} />)}
        </div>
      ) : (
        <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-6 text-[var(--muted-2)]">
          Ingen åpne profiler matcher søket ennå.
        </div>
      )}
    </MarketplaceShell>
  );
}
```

- [ ] **Step 3: Create remaining public pages**

Create these pages with explicit data loaders and empty states:

- `src/app/frilanseren/arbeidsgivere/page.tsx` parses `q`, calls `listPublicEmployers({ query: q })`, renders `SearchFilterBar`, renders `EmployerCard` grid, and shows "Ingen åpne arbeidsgivere matcher søket ennå." when empty.
- `src/app/frilanseren/arbeidsgivere/[slug]/page.tsx` calls `getPublicEmployerBySlug(params.slug)`, renders company details, production types, city/region, website link, and a link to that employer's open jobs once job filtering exists.
- `src/app/frilanseren/jobber/page.tsx` parses `q` and `role`, calls `listPublicJobs({ query: q, role })`, renders `SearchFilterBar`, renders `JobCard` grid, and shows "Ingen åpne jobber matcher søket ennå." when empty.
- `src/app/frilanseren/jobber/[slug]/page.tsx` calls `getPublicJobBySlug(params.slug)`, renders description, dates, location, compensation, role tags, employer link, and reserves a section for `JobApplicationForm` in Task 7.
- `src/app/frilanseren/frilansere/[slug]/page.tsx` calls `getPublicFreelancerBySlug(params.slug)`, renders headline, bio, roles, experience, availability, public portfolio links, showreel link, rates, and reserves a section for `ContactRequestForm` in Task 7.

For detail pages, include:

```tsx
export const dynamic = "force-dynamic";
```

because signed image URLs are time-limited when images exist.

- [ ] **Step 4: Build to catch route/type issues**

Run:

```bash
npm run build
```

Expected: build passes. If it fails due to missing Supabase envs during prerender, mark public pages that call Supabase as dynamic with `export const dynamic = "force-dynamic";` and retry.

- [ ] **Step 5: Commit public pages**

```bash
git add src/app/frilanseren/page.tsx src/app/frilanseren/frilansere src/app/frilanseren/arbeidsgivere src/app/frilanseren/jobber
git commit -m "feat(frilanseren): add public marketplace pages"
```

---

## Task 7: Marketplace Actions For Jobs, Applications, And Contact

**Files:**
- Create: `src/lib/frilanseren/market-actions.ts`
- Create/Modify: `src/components/frilanseren/job-application-form.tsx`
- Create/Modify: `src/components/frilanseren/contact-request-form.tsx`
- Create/Modify: `src/components/frilanseren/job-form.tsx`
- Modify: `src/app/frilanseren/jobber/[slug]/page.tsx`
- Create: `src/app/frilanseren/dashboard/jobber/page.tsx`
- Create: `src/app/frilanseren/dashboard/soknader/page.tsx`

- [ ] **Step 1: Implement server actions**

Create `src/lib/frilanseren/market-actions.ts`:

```ts
"use server";

import { redirect } from "next/navigation";

import { createServerComponentClient } from "@/lib/supabase/serverClient";

import { initialActionState } from "./action-state";
import { jobApplicationSchema, jobFormSchema, contactRequestSchema } from "./market-validation";
import { requireCurrentUserContext } from "./queries";
import { buildUniqueSlug } from "./slug";
import type { FrilanserenActionState } from "./types";

function fieldErrorsFromIssues(issues: Array<{ path: PropertyKey[]; message: string }>) {
  return Object.fromEntries(issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]));
}

function formArray(formData: FormData, key: string) {
  return formData.getAll(key).map((value) => String(value).trim()).filter(Boolean);
}

export async function createJobAction(
  _previousState: FrilanserenActionState = initialActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();

  if (context.userMeta?.role !== "employer") {
    return { status: "error", message: "Du må ha arbeidsgiverkonto for å legge ut jobb." };
  }

  const payload = jobFormSchema.safeParse({
    title: formData.get("title"),
    production_type: formData.get("production_type") || undefined,
    description: formData.get("description"),
    location: formData.get("location"),
    region: formData.get("region"),
    starts_on: formData.get("starts_on"),
    ends_on: formData.get("ends_on"),
    application_deadline: formData.get("application_deadline"),
    compensation_label: formData.get("compensation_label"),
    rate_amount: formData.get("rate_amount"),
    rate_unit: formData.get("rate_unit"),
    role_tags: formArray(formData, "role_tags"),
    is_public: formData.get("is_public") === "on",
  });

  if (!payload.success) {
    return { status: "error", fieldErrors: fieldErrorsFromIssues(payload.error.issues) };
  }

  const supabase = await createServerComponentClient();
  const { data: existingJobs } = await supabase.from("jobs").select("slug");
  const slug = buildUniqueSlug(payload.data.title, new Set((existingJobs ?? []).map((job) => job.slug)));

  const { data: job, error } = await supabase
    .from("jobs")
    .insert({
      employer_user_id: context.userId,
      title: payload.data.title,
      slug,
      production_type: payload.data.production_type ?? null,
      description: payload.data.description,
      location: payload.data.location || null,
      region: payload.data.region || null,
      starts_on: payload.data.starts_on || null,
      ends_on: payload.data.ends_on || null,
      application_deadline: payload.data.application_deadline || null,
      compensation_label: payload.data.compensation_label || null,
      rate_amount: payload.data.rate_amount,
      rate_unit: payload.data.rate_unit,
      is_public: payload.data.is_public,
      status: payload.data.is_public ? "open" : "draft",
      moderation_status: "pending",
    })
    .select("id")
    .single();

  if (error || !job) {
    return { status: "error", message: "Vi kunne ikke lagre jobben akkurat nå." };
  }

  const { error: roleError } = await supabase.from("job_roles").insert(
    payload.data.role_tags.map((role_tag) => ({
      job_id: job.id,
      role_tag,
    })),
  );

  if (roleError) {
    return { status: "error", message: "Jobben ble lagret, men rollene kunne ikke lagres." };
  }

  redirect(`/frilanseren/dashboard/jobber?created=${job.id}`);
}

export async function applyToJobAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();

  if (context.userMeta?.role !== "freelancer") {
    return { status: "error", message: "Du må ha frilanskonto for å melde interesse." };
  }

  const payload = jobApplicationSchema.safeParse({
    job_id: formData.get("job_id"),
    message: formData.get("message") ?? "",
  });

  if (!payload.success) {
    return { status: "error", fieldErrors: fieldErrorsFromIssues(payload.error.issues) };
  }

  const supabase = await createServerComponentClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("id, status")
    .eq("id", payload.data.job_id)
    .eq("is_public", true)
    .eq("moderation_status", "approved")
    .maybeSingle();

  if (!job || job.status !== "open") {
    return { status: "error", message: "Denne jobben er ikke åpen for interesse akkurat nå." };
  }

  const { error } = await supabase.from("job_applications").insert({
    job_id: payload.data.job_id,
    freelancer_user_id: context.userId,
    message: payload.data.message,
  });

  if (error) {
    if (error.code === "23505") {
      return { status: "error", message: "Du har allerede meldt interesse for denne jobben." };
    }

    return { status: "error", message: "Vi kunne ikke registrere interessen akkurat nå." };
  }

  return { status: "success", message: "Interessen er registrert." };
}

export async function requestContactAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();
  const payload = contactRequestSchema.safeParse({
    target_user_id: formData.get("target_user_id"),
    job_id: formData.get("job_id") ?? "",
    message: formData.get("message"),
  });

  if (!payload.success) {
    return { status: "error", fieldErrors: fieldErrorsFromIssues(payload.error.issues) };
  }

  const supabase = await createServerComponentClient();
  const { error } = await supabase.from("contact_requests").insert({
    requester_user_id: context.userId,
    target_user_id: payload.data.target_user_id,
    job_id: payload.data.job_id,
    message: payload.data.message,
  });

  if (error) {
    return { status: "error", message: "Vi kunne ikke sende kontaktforespørselen akkurat nå." };
  }

  return { status: "success", message: "Kontaktforespørselen er sendt." };
}
```

- [ ] **Step 2: Add application and contact client forms**

Create `src/components/frilanseren/job-application-form.tsx` and `src/components/frilanseren/contact-request-form.tsx` using `useActionState` with `applyToJobAction` and `requestContactAction`. Follow the existing `LoginForm` and registration form feedback style.

- [ ] **Step 3: Add job form**

Create `src/components/frilanseren/job-form.tsx` with fields matching `jobFormSchema`, using `FREELANCER_ROLE_OPTIONS` and `EMPLOYER_PRODUCTION_TYPES`.

- [ ] **Step 4: Wire job detail page**

Modify `src/app/frilanseren/jobber/[slug]/page.tsx` to include `<JobApplicationForm jobId={job.id} />` below the job description. If user is not logged in, the action will redirect through `requireCurrentUserContext`.

- [ ] **Step 5: Add dashboard job/application pages**

Create:

- `src/app/frilanseren/dashboard/jobber/page.tsx`: employer-only page with job form and list of own jobs.
- `src/app/frilanseren/dashboard/soknader/page.tsx`: freelancer-only page listing own applications.

Use `ProtectedRouteShell`, `AuthCard`, `requireCurrentUserContext`, and `createServerComponentClient`.

- [ ] **Step 6: Verify**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all pass.

- [ ] **Step 7: Commit actions and dashboards**

```bash
git add src/lib/frilanseren/market-actions.ts src/components/frilanseren/job-application-form.tsx src/components/frilanseren/contact-request-form.tsx src/components/frilanseren/job-form.tsx src/app/frilanseren/jobber/[slug]/page.tsx src/app/frilanseren/dashboard/jobber src/app/frilanseren/dashboard/soknader
git commit -m "feat(frilanseren): add job applications and contact requests"
```

---

## Task 8: Expanded Profile Editing

**Files:**
- Modify: `src/components/frilanseren/profile-form.tsx`
- Modify: `src/lib/frilanseren/actions.ts`
- Create: `src/app/frilanseren/dashboard/profil/page.tsx`
- Modify: `src/app/frilanseren/profile/page.tsx`
- Modify: `src/app/frilanseren/dashboard/page.tsx`

- [ ] **Step 1: Expand profile form fields**

Modify `ProfileForm` to show:

- Headline.
- Bio.
- City.
- Region.
- Public profile toggle.
- Available for work toggle.
- Showreel URL.
- Day rate and hourly rate for freelancers.
- Website URL and company description for employers.

Keep existing image/logo upload and current role-specific checkbox/radio fields.

- [ ] **Step 2: Expand server profile actions**

Modify `updateEmployerProfileAction` and `updateFreelancerProfileAction` to parse the new fields using `publicEmployerProfileSchema` and `publicFreelancerProfileSchema`. Generate missing slugs with `buildUniqueSlug`. Set `moderation_status` to `pending` when a user opts into public visibility or changes public-facing copy.

- [ ] **Step 3: Add dashboard profile route**

Create `src/app/frilanseren/dashboard/profil/page.tsx` that reuses the existing profile page content. Then modify `src/app/frilanseren/profile/page.tsx` to redirect:

```tsx
import { redirect } from "next/navigation";

export default function LegacyProfilePage() {
  redirect("/frilanseren/dashboard/profil");
}
```

- [ ] **Step 4: Update dashboard links**

Modify `src/app/frilanseren/dashboard/page.tsx` and `ProtectedRouteShell` profile links to point at `/frilanseren/dashboard/profil`.

- [ ] **Step 5: Verify**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all pass.

- [ ] **Step 6: Commit profile expansion**

```bash
git add src/components/frilanseren/profile-form.tsx src/lib/frilanseren/actions.ts src/app/frilanseren/dashboard/profil src/app/frilanseren/profile/page.tsx src/app/frilanseren/dashboard/page.tsx src/components/frilanseren/protected-route-shell.tsx
git commit -m "feat(frilanseren): expand marketplace profiles"
```

---

## Task 9: Admin Moderation

**Files:**
- Modify: `src/app/frilanseren/admin/page.tsx`
- Modify/Create: `src/lib/frilanseren/market-actions.ts`
- Modify/Create: `src/lib/frilanseren/market-queries.ts`

- [ ] **Step 1: Add admin moderation queries**

Add functions in `market-queries.ts`:

- `listPendingFreelancerProfilesForAdmin`
- `listPendingEmployerProfilesForAdmin`
- `listPendingJobsForAdmin`
- `listModerationReportsForAdmin`

Each function must guard `hasSupabaseAdminConfig()`, use `createAdminClient()`, and return empty arrays if admin config is missing.

- [ ] **Step 2: Add moderation actions**

Add server actions in `market-actions.ts`:

- `approveFreelancerProfileAction`
- `hideFreelancerProfileAction`
- `approveEmployerProfileAction`
- `hideEmployerProfileAction`
- `approveJobAction`
- `hideJobAction`

Each action must call `requireAdminUser()` before updating rows. Each approve action sets `moderation_status = 'approved'`, `is_public = true`, and `approved_at = new Date().toISOString()` where relevant. Each hide action sets `moderation_status = 'hidden'`.

- [ ] **Step 3: Update admin page**

Modify `src/app/frilanseren/admin/page.tsx` to keep the current registered user overview and add sections:

- Pending freelancer profiles.
- Pending employer profiles.
- Pending jobs.
- Open moderation reports.

Each row should show key public-facing fields and approve/hide forms.

- [ ] **Step 4: Verify**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all pass.

- [ ] **Step 5: Commit moderation**

```bash
git add src/app/frilanseren/admin/page.tsx src/lib/frilanseren/market-actions.ts src/lib/frilanseren/market-queries.ts
git commit -m "feat(frilanseren): add admin moderation queues"
```

---

## Task 10: Timesheet UI And Persistence

**Files:**
- Create: `src/components/frilanseren/timesheet-form.tsx`
- Modify/Create: `src/lib/frilanseren/market-actions.ts`
- Create: `src/app/frilanseren/timeliste/page.tsx`
- Create: `src/app/frilanseren/dashboard/timelister/page.tsx`

- [ ] **Step 1: Add timesheet save action**

In `market-actions.ts`, add `saveTimesheetAction`. It should:

- Require current user.
- Parse `timesheetFormSchema`.
- Build totals with `calculateTimesheetTotals`.
- Insert one row into `timesheets`.
- Insert rows into `timesheet_entries`.
- Return success or redirect to `/frilanseren/dashboard/timelister`.

- [ ] **Step 2: Create timesheet form**

Create `src/components/frilanseren/timesheet-form.tsx` with:

- Project name.
- Employer name.
- Role label.
- Period start/end.
- Default rate.
- A first version with 7 entry rows rendered server-side.
- Each row: work date, hours, rate, supplement, note.
- Submit button.
- Disclaimer text from `TIMESHEET_DISCLAIMER`.

Use repeated field names: `work_date`, `hours`, `rate`, `supplement`, and `note`. In `saveTimesheetAction`, read each with `formData.getAll(...)`, zip by index, drop rows without a date or hours, then pass the normalized array into `timesheetFormSchema`.

- [ ] **Step 3: Create public timesheet entry page**

Create `src/app/frilanseren/timeliste/page.tsx`:

- If logged out, explain that timelisten can be reviewed but must be saved after login.
- Show `TimesheetForm`.
- Use `MarketplaceShell` with title "Timeliste".

- [ ] **Step 4: Create dashboard timesheet page**

Create `src/app/frilanseren/dashboard/timelister/page.tsx`:

- Require login.
- List the user's saved timesheets.
- Link to create a new timesheet.
- Show status, period, total hours, total amount.

- [ ] **Step 5: Verify**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all pass.

- [ ] **Step 6: Commit timesheet UI**

```bash
git add src/components/frilanseren/timesheet-form.tsx src/lib/frilanseren/market-actions.ts src/app/frilanseren/timeliste src/app/frilanseren/dashboard/timelister
git commit -m "feat(frilanseren): add timesheet workflow"
```

---

## Task 11: PDF Export Data And Route

**Files:**
- Create: `src/app/frilanseren/dashboard/timelister/[id]/pdf/route.ts`
- Modify: `src/app/frilanseren/dashboard/timelister/page.tsx`

- [ ] **Step 1: Create PDF route as HTML fallback first**

Because the repo does not currently include a PDF generation dependency, first create a route that returns printable HTML. This satisfies exportability without adding new packages prematurely.

Create `src/app/frilanseren/dashboard/timelister/[id]/pdf/route.ts`:

```ts
import { NextResponse, type NextRequest } from "next/server";

import { createServerComponentClient } from "@/lib/supabase/serverClient";
import { buildTimesheetExportModel } from "@/lib/frilanseren/timesheet";
import { requireCurrentUserContext } from "@/lib/frilanseren/queries";

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const context = await requireCurrentUserContext();
  const { id } = await params;
  const supabase = await createServerComponentClient();

  const { data: timesheet, error } = await supabase
    .from("timesheets")
    .select("*, timesheet_entries(*)")
    .eq("id", id)
    .eq("owner_user_id", context.userId)
    .maybeSingle();

  if (error || !timesheet) {
    return new NextResponse("Timeliste ikke funnet.", { status: 404 });
  }

  const model = buildTimesheetExportModel({
    freelancerName: context.userMeta?.full_name ?? context.email,
    employerName: timesheet.employer_name,
    projectName: timesheet.project_name,
    role: timesheet.role_label,
    periodStart: timesheet.period_start,
    periodEnd: timesheet.period_end,
    entries: (timesheet.timesheet_entries ?? []).map((entry: {
      work_date: string;
      hours: number;
      rate: number;
      supplement: number;
      note: string | null;
    }) => ({
      work_date: entry.work_date,
      hours: Number(entry.hours),
      rate: Number(entry.rate),
      supplement: Number(entry.supplement),
      note: entry.note ?? "",
    })),
  });

  const rows = model.entries
    .map(
      (entry) => `
        <tr>
          <td>${escapeHtml(entry.work_date)}</td>
          <td>${escapeHtml(entry.hours)}</td>
          <td>${escapeHtml(entry.rate)}</td>
          <td>${escapeHtml(entry.supplement)}</td>
          <td>${escapeHtml(entry.lineTotal)}</td>
          <td>${escapeHtml(entry.note)}</td>
        </tr>
      `,
    )
    .join("");

  const html = `<!doctype html>
    <html lang="nb">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(model.title)}</title>
        <style>
          body { font-family: system-ui, sans-serif; margin: 40px; color: #111; }
          h1 { margin-bottom: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; }
          th, td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; }
          .total { margin-top: 24px; font-weight: 700; }
          .disclaimer { margin-top: 32px; color: #555; font-size: 13px; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(model.title)}</h1>
        <p>${escapeHtml(model.freelancerName)} · ${escapeHtml(model.employerName)} · ${escapeHtml(model.periodLabel)}</p>
        <table>
          <thead><tr><th>Dato</th><th>Timer</th><th>Sats</th><th>Tillegg</th><th>Sum</th><th>Notat</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <p class="total">Totalt: ${escapeHtml(model.totalHours)} timer · ${escapeHtml(model.totalAmount)} kr</p>
        <p class="disclaimer">${escapeHtml(model.disclaimer)}</p>
      </body>
    </html>`;

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
```

- [ ] **Step 2: Add export links**

Modify `src/app/frilanseren/dashboard/timelister/page.tsx` to link each timesheet to `/frilanseren/dashboard/timelister/${timesheet.id}/pdf` with `target="_blank"` and label "Åpne utskrift/PDF".

- [ ] **Step 3: Verify**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 4: Commit export route**

```bash
git add src/app/frilanseren/dashboard/timelister/[id]/pdf/route.ts src/app/frilanseren/dashboard/timelister/page.tsx
git commit -m "feat(frilanseren): add printable timesheet export"
```

---

## Task 12: Documentation And Final Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-05-15-filmlanseren-marked-timeliste-design.md` only if implementation decisions changed in a way the spec must record.

- [ ] **Step 1: Update README feature list**

Modify the Frilanseren section in `README.md` so it mentions:

- Public freelancer database.
- Public employer database.
- Public jobs.
- Applications/interests.
- Contact requests.
- Timesheets.
- Admin moderation.

- [ ] **Step 2: Add manual QA checklist to README**

Under local testing, add:

```md
9. Kontroller at offentlige frilanserprofiler ikke viser e-post eller telefon.
10. Kontroller at en offentlig jobb kan ses uten innlogging, men interesse krever innlogging.
11. Kontroller at arbeidsgiver kan opprette jobb og se interesserte kandidater.
12. Kontroller at admin kan godkjenne/skjule profiler og jobber.
13. Kontroller at timeliste kan lagres og åpnes som utskriftsvennlig eksport.
```

- [ ] **Step 3: Run full verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected:

- `npm test`: all tests pass.
- `npm run lint`: no ESLint errors.
- `npm run build`: Next build completes and hero pipeline verification passes.

- [ ] **Step 4: Optional browser QA**

If the dev server is running, open:

- `http://localhost:3000/frilanseren`
- `http://localhost:3000/frilanseren/frilansere`
- `http://localhost:3000/frilanseren/jobber`
- `http://localhost:3000/frilanseren/arbeidsgivere`
- `http://localhost:3000/frilanseren/timeliste`

Expected:

- Pages render without console errors.
- Empty states are polished when there is no Supabase data.
- Layout works on desktop and mobile widths.
- Protected actions redirect or show login requirement instead of leaking errors.

- [ ] **Step 5: Commit docs and final verification**

```bash
git add README.md docs/superpowers/specs/2026-05-15-filmlanseren-marked-timeliste-design.md
git commit -m "docs: update filmlanseren launch checklist"
```

Skip this commit if no docs changed.

---

## Self-Review Checklist

- Spec coverage:
  - Open marketplace: Tasks 5 and 6.
  - Public freelancer/employer/job pages: Tasks 3, 5, 6.
  - Contact info hidden behind contact request: Tasks 3, 7.
  - Applications/interests: Task 7.
  - Dashboard routes: Tasks 7, 8, 10.
  - Admin moderation: Task 9.
  - Hybrid timesheet and export: Tasks 4, 10, 11.
  - Contracts, payment, AI, chat, social feed excluded: Scope Check.
- Temporary-copy scan:
  - Do not leave release-critical pages with copy that says functionality will arrive in the future.
  - Do not add unused database columns without types or query handling.
  - Do not expose e-mail or phone in public cards/detail pages.
- Type consistency:
  - `JobStatus`, `ApplicationStatus`, and SQL check constraints must use the same literal strings.
  - Timesheet statuses must match `TIMESHEET_STATUSES`.
  - Role tags should reuse `FREELANCER_ROLE_OPTIONS` values.

## Execution Notes

- Prefer one commit per task.
- If a task reveals a schema/type mismatch, fix the mismatch within that task before proceeding.
- Keep `next-env.d.ts` out of commits unless intentionally updating generated Next route types.
- If Supabase envs are missing locally, `npm run build` should still pass; manual auth flows require configured `.env.local`.
