# Salgscoach web portal

`/salgscoach` is a private, read-only overview of call summaries created by the
desktop app. Recording, Wispr capture, local Whisper and recovery stay in the
desktop app.

## Access model

The portal uses the existing dedicated `Salgcoatch app` Supabase project
(`lqmiyehmhbuflkacahdg`), not the separate `fauogland-frilanser` project.
Set server-only `SALGSCOACH_SUPABASE_URL` and `SALGSCOACH_SUPABASE_ANON_KEY`.
There is deliberately no fallback to `NEXT_PUBLIC_SUPABASE_*`. Its HTTP-only
session cookie is named `salgscoach-session` and scoped to `/salgscoach`.

Access is deliberately checked twice:

1. `SALGSCOACH_ALLOWED_EMAILS` must contain the signed-in email in Vercel.
2. The same Supabase auth user must have an active row in
   `public.salgscoach_members`.

The database membership is the security boundary. A Frilanseren account or a
valid Supabase session alone cannot read or write Salgscoach data. Only a
database administrator or service-role process may add a membership.

After the approved auth account exists, provision it in the Supabase SQL editor
using its verified UUID (never guess the UUID):

```sql
insert into public.salgscoach_members (user_id, active)
values ('VERIFIED-AUTH-USER-UUID', true)
on conflict (user_id) do update set active = excluded.active;
```

Revoke access by setting `active = false`; do not delete historical calls merely
to remove login access.

## Safe deployment order

1. Confirm the dedicated Salgscoach Supabase project is reachable and take a database
   backup. Stop if the health endpoint is not green.
2. Run a read-only catalog preflight for existing `calls`, child tables,
   primary keys, unique indexes, RLS policies and the owner/ACL of
   `public.is_salgscoach_member()`. Resolve incompatible objects explicitly;
   never let a migration guess how legacy data should be rewritten.
   `scripts/salgscoach-production-preflight.sql` provides the read-only catalog
   query. Export its results and a separate actual data backup before writes.
3. Review and apply the pending migrations in timestamp order. They include the
   complete desktop schema, the closed `source` allowlist with `wispr_flow`, RLS,
   minimum grants and the Salgscoach membership gate.
4. Create or verify the intended Supabase auth account, copy its UUID from the
   authenticated user record, then provision `salgscoach_members` as above.
5. Set `SALGSCOACH_ALLOWED_EMAILS` in Vercel and deploy the website. This repo's
   GitHub integration can deploy on a branch push, so pause or verify the Vercel
   integration before pushing if even a preview deployment is not intended.
6. Verify that an approved account can open `/salgscoach`, that a normal
   Frilanseren account receives no data through the Supabase API, and that an
   offline desktop call remains local when cloud sync is unavailable.
7. Enable desktop cloud sync only after a test call has completed every related
   table write successfully.

Do not apply these migrations or enable sync while the dedicated Salgscoach
project is paused or unreachable. The separate `/api/frilanseren/health` endpoint
reports marketplace status; changing its project configuration is outside this
portal deployment.
