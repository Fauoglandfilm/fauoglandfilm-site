create schema if not exists kulturarena_portal;
revoke all on schema kulturarena_portal from public,anon,authenticated;
grant usage on schema kulturarena_portal to service_role;
-- Additive Kulturarena tenant. No Fau&Land rows, grants or queues are changed.
-- Sensitive CRM snapshots and command bodies are encrypted before storage.
create table if not exists kulturarena_portal.devices (
  id text primary key check (id = 'kulturarena-mac-2'),
  tenant_id text not null default 'kulturarena' check (tenant_id = 'kulturarena'),
  last_seen_at timestamptz not null default now(),
  agent_version text not null,
  revision bigint not null default 0,
  encrypted_state jsonb,
  state_fingerprint text,
  telemetry jsonb not null default '{}'::jsonb
);
create table if not exists kulturarena_portal.commands (
  id uuid primary key,
  tenant_id text not null default 'kulturarena' check (tenant_id = 'kulturarena'),
  device_id text not null references kulturarena_portal.devices(id) check (device_id = 'kulturarena-mac-2'),
  created_by uuid not null references auth.users(id),
  action text not null check (action in ('company-create','company-edit','task-create','task-edit','event-create','task','event','stage','note','draft-create','read-file')),
  expected_revision bigint not null,
  encrypted_payload jsonb not null,
  payload_hash text not null,
  idempotency_key text not null unique,
  status text not null default 'queued' check (status in ('queued','running','completed','failed','needs_review')),
  lease_token uuid,
  lease_expires_at timestamptz,
  encrypted_result jsonb,
  error_code text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create index if not exists kulturarena_portal_queue on kulturarena_portal.commands(tenant_id,device_id,status,created_at);
create table if not exists kulturarena_portal.audit (
  id bigint generated always as identity primary key,
  tenant_id text not null default 'kulturarena' check (tenant_id = 'kulturarena'),
  command_id uuid not null references kulturarena_portal.commands(id),
  event text not null,
  created_at timestamptz not null default now()
);
alter table kulturarena_portal.devices enable row level security;
alter table kulturarena_portal.commands enable row level security;
alter table kulturarena_portal.audit enable row level security;
revoke all on kulturarena_portal.devices,kulturarena_portal.commands,kulturarena_portal.audit from public,anon,authenticated;
grant all on kulturarena_portal.devices,kulturarena_portal.commands,kulturarena_portal.audit to service_role;

create or replace function kulturarena_portal.claim_command()
returns setof kulturarena_portal.commands
language plpgsql security definer set search_path = pg_catalog,public as $$
declare command_uuid uuid;
begin
  -- Never automatically retry a potentially applied local mutation.
  update kulturarena_portal.commands set status='needs_review'
  where tenant_id='kulturarena' and device_id='kulturarena-mac-2'
    and status='running' and lease_expires_at < now();
  select id into command_uuid from kulturarena_portal.commands
  where tenant_id='kulturarena' and device_id='kulturarena-mac-2' and status='queued'
  order by created_at limit 1 for update skip locked;
  if command_uuid is null then return; end if;
  return query update kulturarena_portal.commands
    set status='running',lease_token=gen_random_uuid(),lease_expires_at=now()+interval '90 seconds'
    where id=command_uuid and tenant_id='kulturarena' and device_id='kulturarena-mac-2' and status='queued'
    returning *;
end;
$$;

create or replace function kulturarena_portal.finish_command(
  command_uuid uuid, supplied_lease uuid, outcome text, encrypted_response jsonb,
  new_snapshot jsonb, new_revision bigint, new_fingerprint text
) returns boolean
language plpgsql security definer set search_path = pg_catalog,public as $$
declare changed_uuid uuid;
begin
  if outcome not in ('completed','failed') then return false; end if;
  update kulturarena_portal.commands set status=outcome,encrypted_result=encrypted_response,completed_at=now()
  where id=command_uuid and tenant_id='kulturarena' and device_id='kulturarena-mac-2'
    and status='running' and lease_token=supplied_lease and lease_expires_at >= now()
  returning id into changed_uuid;
  if changed_uuid is null then return false; end if;
  if new_snapshot is not null then
    update kulturarena_portal.devices
      set encrypted_state=new_snapshot,revision=new_revision,state_fingerprint=new_fingerprint,last_seen_at=now()
      where id='kulturarena-mac-2' and tenant_id='kulturarena' and revision <= new_revision;
  end if;
  insert into kulturarena_portal.audit(command_id,event) values(changed_uuid,'command_'||outcome);
  return true;
end;
$$;
revoke all on function kulturarena_portal.claim_command() from public,anon,authenticated;
revoke all on function kulturarena_portal.finish_command(uuid,uuid,text,jsonb,jsonb,bigint,text) from public,anon,authenticated;
grant execute on function kulturarena_portal.claim_command() to service_role;
grant execute on function kulturarena_portal.finish_command(uuid,uuid,text,jsonb,jsonb,bigint,text) to service_role;
