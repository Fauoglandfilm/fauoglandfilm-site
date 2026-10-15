begin;

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

update public.calls
set analysis_mode = coalesce(analysis_mode, 'fallback_rules')
where analysis_mode is null;

update public.call_reports
set analysis_mode = coalesce(analysis_mode, 'fallback_rules')
where analysis_mode is null;

commit;
