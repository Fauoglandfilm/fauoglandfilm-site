begin;

alter table public.employer_profiles
  add column if not exists logo_path text;

alter table public.freelancer_profiles
  add column if not exists profile_image_path text;

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

commit;
