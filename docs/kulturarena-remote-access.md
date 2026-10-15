# Kulturarena: own tenant in the shared portal

Intended entry point: https://fauoglandfilm.com/kulturarena
Dedicated username: tommy.kulturarena

Status: prepared, not activated. This source does not create an account, apply
SQL, configure production credentials or start the agent. Fau&Land portal
readiness must be proven with a real database and command round trip first.

## Shared implementation and tenant isolation

The module reuses the existing Next.js/Supabase portal and server client. It
adds an optional cookie scope to that common client; default behavior for
Frilanseren and Odysseus is unchanged. Kulturarena uses a distinct provider
user UUID, distinct login email/owner-controlled alias, and the ka-auth
HttpOnly cookie restricted to /kulturarena. Its login email must differ from
the configured Odysseus owner. Every protected route checks the current
provider user and the exact authorized UUID/email.

The application uses the separate kulturarena_portal PostgreSQL schema,
with RLS and no grants to public/anon/authenticated. Only authenticated
server-side code uses its service role, and every read/write also includes
Kulturarena tenant/device scope. Do not reuse Fau&Land tables or live rows.
The additive migration changes no Fau&Land table, credential or queue.

The outbound-only agent has tenant_id=kulturarena,
system_id=kulturarena-sales and device_id=kulturarena-mac-2. No inbound Mac
port, tunnel or new listener is needed. Its actions can only update the
Kulturarena local master database, prepare a local draft, or read one of six
fixed export files. There is no shell, arbitrary file, delivery, global
pause/resume, sender or send-limit action.

## Private application data versus telemetry

The shared PORTAL_TENANT_CONTRACT.md allows only bounded operational telemetry.
This module keeps that telemetry to counts and send_enabled=false. Contacts,
notes, drafts and files use a separate authenticated, AES-256-GCM encrypted
application-data channel; they never appear as plaintext telemetry, queue
bodies or database snapshots. Tenant, system, device and purpose are bound
into authenticated encryption. The key is unique to Kulturarena and exists
only in Vercel server secrets and the local private secret file. It is not
included in source, browsers, command arguments, logs or Drive backups.
Plaintext is returned only to the dedicated authenticated owner over HTTPS.
Review this data-channel extension with the shared contract before activation.

## Commands and honest save feedback

A save creates an encrypted, idempotent command for the selected master Mac.
The agent claims one canonical UUID with a unique lease, executes an
allowlisted operation, and posts an encrypted result. Local revision checks
reject stale concurrent edits. Creation operations have local request-ID
journaling. Expired leases become needs_review and are never automatically
replayed. A result cannot complete another tenant/device/lease.

The UI says it is waiting while a command is queued. It reports a save only
after the master result and the new revision have been read back. An offline
agent, an ambiguous result or an unavailable cloud database cannot yield a
successful save. A cached snapshot is explicitly identified as offline.

## Activation checklist

1. Complete Fau&Land's actual Supabase, owner-login, heartbeat and pause/resume
   acceptance first. A published login shell or readiness flag is insufficient.
2. Apply only 20261015170000_kulturarena_portal.sql to the verified portal
   project. Add kulturarena_portal to the API-exposed schemas, preserving all
   existing schemas, grants and services. Verify anon/authenticated cannot
   select or modify its tables.
3. Create a dedicated Supabase Auth account for the owner using a separate
   owner-controlled email/alias. Do not reset or repurpose the Fau&Land account.
   The owner sets the password privately. Configure KULTURARENA_USER_ID and
   KULTURARENA_LOGIN_EMAIL on Vercel; username is tommy.kulturarena.
4. Generate two independent 32-byte random secrets: an agent token and an
   application-data key. Keep their local files mode 0600 outside the project,
   Drive and Dropbox. Set KULTURARENA_DEVICE_TOKEN_SHA256 and
   KULTURARENA_DATA_KEY on Vercel. Never put secret values in this repository.
5. Install portal_operations.py and kulturarena_portal_agent.mjs in the
   private Kulturarena 05_SYSTEM folder. Its config contains portal_url,
   root, token_file and data_key_file. Use the already-permitted Mac app context
   for Drive/master checks. Do not change or restart Fau&Land services.
6. Deploy the reviewed commit to the existing site, start one Kulturarena
   agent, and verify its encrypted heartbeat and read/write round trip.
7. Test all seven tenant-isolation cases from PORTAL_TENANT_CONTRACT.md against
   the actual database and endpoints. Local unit tests are not proof of hosted
   RLS, a real account or an external-network session.
8. Verify login, edit/readback, logout and file access from another device and
   network. Verify the consistent backup in tommygarland93@gmail.com's private
   Drive and recovery of just Kulturarena. Test restart/reboot behavior. The
   current permitted-app backup context must be restarted after a Mac reboot.

## Runtime limits and backup

The agent publishes an encrypted snapshot only after its source fingerprint
changes; heartbeat stays small. Mutations are at most 30 KB. Snapshot and file
sizes are bounded; a larger corpus requires pagination rather than silently
truncating data. Local model jobs retain the shared Odysseus admission guard
and one exclusive model lane, plus a Kulturarena-only worker lock.

Only one CRM master writes data. The cloud holds encrypted views and commands;
it does not become a second writable CRM database. Existing local/Drive
versioned backup remains authoritative for restore. Plaintext passwords and
secret key files are deliberately excluded; credentials can be re-provisioned
and encrypted cloud views regenerated from the restored local CRM.
