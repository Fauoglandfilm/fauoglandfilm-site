# Kulturarena workspace — 20 October 2026

The independent website login and Mac command bridge have been retired in favor of the existing private Notion workspace and native Google CRM. GET /kulturarena, /kulturarena/login and /kulturarena/system open the fixed workspace. All former data, login submission, device and health endpoints return 410 without reading request bodies or connecting to Supabase. Credential POSTs are never redirected to Notion.

The Notion page enforces its own workspace membership. Google Sheets enforces separate existing file permissions. No customer records, credentials, tokens or login parameters are in redirects. No changes to other portals, shared authentication, Vercel environment, Supabase accounts or historical database rows. Historical code remains in Git for rollback. The local Kulturarena agent is separately stopped and disabled; local backup/research preparation remains available.

Restore the preceding Git commit to roll back website routing; re-enable a local agent only after reconciling current native CRM authority. Do not revive the legacy SQLite interface as the main CRM.
