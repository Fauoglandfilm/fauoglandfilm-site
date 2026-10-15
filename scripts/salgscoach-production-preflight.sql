-- Run read-only on the existing dedicated Salgscoach project before migrations.
-- This inventories schema and access rules; it does not export private call data.
select 'table' as category, c.relname as name,
  jsonb_build_object('owner', pg_get_userbyid(c.relowner),
    'rls', c.relrowsecurity, 'force_rls', c.relforcerowsecurity,
    'estimated_rows', c.reltuples::bigint) as details
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind in ('r', 'p')
union all
select 'column', table_name || '.' || column_name,
  jsonb_build_object('type', data_type, 'nullable', is_nullable, 'default', column_default)
from information_schema.columns where table_schema = 'public'
union all
select 'constraint', c.relname || '.' || con.conname,
  jsonb_build_object('definition', pg_get_constraintdef(con.oid), 'validated', con.convalidated)
from pg_constraint con join pg_class c on c.oid = con.conrelid
join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public'
union all
select 'policy', tablename || '.' || policyname,
  jsonb_build_object('roles', roles, 'command', cmd, 'permissive', permissive,
    'using', qual, 'with_check', with_check)
from pg_policies where schemaname = 'public'
union all
select 'index', tablename || '.' || indexname, jsonb_build_object('definition', indexdef)
from pg_indexes where schemaname = 'public'
union all
select 'membership_function', p.proname,
  jsonb_build_object('owner', pg_get_userbyid(p.proowner),
    'security_definer', p.prosecdef, 'acl', p.proacl,
    'arguments', pg_get_function_identity_arguments(p.oid))
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname = 'is_salgscoach_member'
union all
select 'auth', 'user_count', jsonb_build_object('count', count(*)) from auth.users
order by category, name;
