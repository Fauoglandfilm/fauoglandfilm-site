create extension if not exists pgcrypto;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.users_meta (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('employer', 'freelancer')),
  full_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.employer_profiles (
  user_id uuid primary key references public.users_meta(id) on delete cascade,
  company_name text not null,
  production_types text[] not null default '{}',
  annual_volume text not null check (annual_volume in ('1_2', '3_10', '10_plus')),
  logo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.employer_profiles add column if not exists logo_path text;
create index if not exists employer_profiles_user_id_idx on public.employer_profiles (user_id);

create table if not exists public.freelancer_profiles (
  user_id uuid primary key references public.users_meta(id) on delete cascade,
  roles text[] not null default '{}',
  experience_level text not null check (experience_level in ('0_2', '3_7', '8_plus')),
  profile_image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.freelancer_profiles add column if not exists profile_image_path text;
create index if not exists freelancer_profiles_user_id_idx on public.freelancer_profiles (user_id);

create table if not exists public.consent_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users_meta(id) on delete cascade,
  consent_type text not null,
  consent_text_version text not null,
  ip_address text,
  user_agent text,
  consented_at timestamptz not null default now()
);
create index if not exists consent_logs_user_id_idx on public.consent_logs (user_id);

create table if not exists public.data_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users_meta(id) on delete cascade,
  request_type text not null check (request_type in ('access', 'delete')),
  status text not null check (status in ('open', 'processing', 'completed')) default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
create index if not exists data_requests_user_id_status_idx on public.data_requests (user_id, status);

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid,
  action text not null,
  target_user_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);
create index if not exists admin_audit_logs_created_at_idx on public.admin_audit_logs (created_at);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'frilanseren-media',
  'frilanseren-media',
  false,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop trigger if exists users_meta_set_updated_at on public.users_meta;
create trigger users_meta_set_updated_at
before update on public.users_meta
for each row execute function public.set_updated_at();

drop trigger if exists employer_profiles_set_updated_at on public.employer_profiles;
create trigger employer_profiles_set_updated_at
before update on public.employer_profiles
for each row execute function public.set_updated_at();

drop trigger if exists freelancer_profiles_set_updated_at on public.freelancer_profiles;
create trigger freelancer_profiles_set_updated_at
before update on public.freelancer_profiles
for each row execute function public.set_updated_at();

alter table public.users_meta enable row level security;
alter table public.employer_profiles enable row level security;
alter table public.freelancer_profiles enable row level security;
alter table public.consent_logs enable row level security;
alter table public.data_requests enable row level security;
alter table public.admin_audit_logs enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update on public.users_meta to authenticated;
grant select, insert, update on public.employer_profiles to authenticated;
grant select, insert, update on public.freelancer_profiles to authenticated;
grant select, insert on public.consent_logs to authenticated;
grant select, insert on public.data_requests to authenticated;

drop policy if exists select_own_meta on public.users_meta;
create policy select_own_meta
on public.users_meta
for select
to authenticated
using (id = auth.uid());

drop policy if exists insert_own_meta on public.users_meta;
create policy insert_own_meta
on public.users_meta
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists update_own_meta on public.users_meta;
create policy update_own_meta
on public.users_meta
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists admin_manage_users_meta on public.users_meta;
create policy admin_manage_users_meta
on public.users_meta
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists select_own_employer_profile on public.employer_profiles;
create policy select_own_employer_profile
on public.employer_profiles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists insert_own_employer_profile on public.employer_profiles;
create policy insert_own_employer_profile
on public.employer_profiles
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists update_own_employer_profile on public.employer_profiles;
create policy update_own_employer_profile
on public.employer_profiles
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists admin_manage_employer_profiles on public.employer_profiles;
create policy admin_manage_employer_profiles
on public.employer_profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists select_own_freelancer_profile on public.freelancer_profiles;
create policy select_own_freelancer_profile
on public.freelancer_profiles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists insert_own_freelancer_profile on public.freelancer_profiles;
create policy insert_own_freelancer_profile
on public.freelancer_profiles
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists update_own_freelancer_profile on public.freelancer_profiles;
create policy update_own_freelancer_profile
on public.freelancer_profiles
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists admin_manage_freelancer_profiles on public.freelancer_profiles;
create policy admin_manage_freelancer_profiles
on public.freelancer_profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists select_own_consent_logs on public.consent_logs;
create policy select_own_consent_logs
on public.consent_logs
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists insert_own_consent_logs on public.consent_logs;
create policy insert_own_consent_logs
on public.consent_logs
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists admin_manage_consent_logs on public.consent_logs;
create policy admin_manage_consent_logs
on public.consent_logs
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists select_own_data_requests on public.data_requests;
create policy select_own_data_requests
on public.data_requests
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists insert_own_data_requests on public.data_requests;
create policy insert_own_data_requests
on public.data_requests
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists admin_manage_data_requests on public.data_requests;
create policy admin_manage_data_requests
on public.data_requests
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists admin_select_audit_logs on public.admin_audit_logs;
create policy admin_select_audit_logs
on public.admin_audit_logs
for select
to authenticated
using (public.is_admin());

drop policy if exists admin_insert_audit_logs on public.admin_audit_logs;
create policy admin_insert_audit_logs
on public.admin_audit_logs
for insert
to authenticated
with check (public.is_admin());

drop policy if exists frilanseren_media_select on storage.objects;
create policy frilanseren_media_select
on storage.objects
for select
to authenticated
using (
  bucket_id = 'frilanseren-media'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or public.is_admin()
  )
);

drop policy if exists frilanseren_media_insert on storage.objects;
create policy frilanseren_media_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'frilanseren-media'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or public.is_admin()
  )
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
);

drop policy if exists frilanseren_media_update on storage.objects;
create policy frilanseren_media_update
on storage.objects
for update
to authenticated
using (
  bucket_id = 'frilanseren-media'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or public.is_admin()
  )
)
with check (
  bucket_id = 'frilanseren-media'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or public.is_admin()
  )
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
);

drop policy if exists frilanseren_media_delete on storage.objects;
create policy frilanseren_media_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'frilanseren-media'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or public.is_admin()
  )
);
