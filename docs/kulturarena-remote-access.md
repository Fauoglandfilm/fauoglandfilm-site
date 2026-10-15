# Kulturarena web access

Entry point: https://fauoglandfilm.com/kulturarena

Status: prepared, not activated. A source release does not create a database,
an account or a working connection to the master Mac. Production activation
requires the provider approval and acceptance checks below.

The public navigation opens Kulturarena's own login. Email or an assigned
username opens the same simple Kunder, Eventer and Oppgaver interface as the
local system. Contact details, notes, drafts and optional financial fields
open when needed. The active workbook is Kulturarena CRM.xlsx in the owner's
private project folder.

## Separate users and database

Kulturarena uses a dedicated Supabase project. It shares website code with
the other portals, while keeping its database, credentials, users, cookies,
commands and backups separate. There is no fallback to the website's default
Supabase project or the Salgscoach project. Do not repair, replace or restart
another product's backend to activate Kulturarena.

Set these server environment variables only for Kulturarena:

- KULTURARENA_SUPABASE_URL: dedicated project's HTTPS API origin.
- KULTURARENA_SUPABASE_ANON_KEY: that project's publishable/legacy anon key.
- KULTURARENA_SUPABASE_SERVICE_ROLE_KEY: that project's server-only key.
- KULTURARENA_USERS: JSON membership list, at most ten entries.
- KULTURARENA_DEVICE_TOKEN_SHA256: SHA-256 of the dedicated agent token.
- KULTURARENA_DATA_KEY: dedicated 32-byte application-data encryption key.

Membership entries contain only user_id, email, username and role. Each
provider UUID and email must match exactly. User metadata grants no access.
The roles owner and editor both allow normal CRM work; neither grants a
browser-accessible authentication administrator. Removing an entry revokes
portal access on the next request. Duplicate or malformed configuration
denies access. Passwords never belong in membership JSON, source or backups.

The former KULTURARENA_USER_ID and KULTURARENA_LOGIN_EMAIL remain an optional
single-owner compatibility configuration when KULTURARENA_USERS is absent.
Use the membership list for the owner's and colleague's separate accounts.
Do not reset or reuse another portal's account. The configured Odysseus owner
email is explicitly excluded from Kulturarena membership.

Every protected route verifies the current provider user. The ka-auth cookie
is HttpOnly, secure in production and restricted to /kulturarena. The common
Supabase client accepts an explicit connection and cookie scope; its default
behavior for the other products remains unchanged. Marketing providers and
tracking are omitted from all Kulturarena portal pages.

Apply only 20261015170000_kulturarena_portal.sql in the dedicated project.
The kulturarena_portal schema has RLS, with no public/anon/authenticated table
grants. Only authenticated server code uses the service key. All reads and
writes additionally bind Kulturarena's tenant and device. Do not apply other
products' migrations or copy their live data into the new project.

## Connection to the master Mac

The outbound agent uses tenant_id=kulturarena, system_id=kulturarena-sales
and device_id=kulturarena-mac-2. It needs no inbound Mac port or tunnel.
Allowlisted operations update the Kulturarena database, prepare a draft or
read one of six fixed export files. There is no shell, arbitrary file,
message delivery, global pause/resume or sender action.

Contacts, notes, drafts and files travel through an authenticated AES-256-GCM
application channel. The cloud stores encrypted snapshots, command payloads
and results. Tenant, system, device and purpose are bound into encryption.
Telemetry contains bounded counts and send_enabled=false. The encryption key
exists only in server secrets and a private local secret file outside Drive,
Dropbox and the project backup. Authenticated members receive their CRM data
over HTTPS. No public health response contains contacts or credentials.

A save queues an encrypted, idempotent command for the master. A unique lease,
revision checks and local request journaling protect concurrent changes.
Expired leases become needs_review and are never automatically replayed.
Each user can retrieve only their own command receipts. The UI confirms a save
after the master's result and revised state are read back. An offline agent
or unavailable database cannot produce a successful save.

Only the Mac master writes CRM records. Excel synchronization and private
Drive backups remain part of that master; the cloud is not a second writable
CRM. Source fingerprints avoid unchanged snapshot uploads. Mutation and file
sizes are bounded. Local model preparation keeps the Odysseus admission guard,
one heavy model lane and a Kulturarena-only worker lock.

## Activation and verification

1. Obtain approval for the dedicated database provider, owning organization,
   region and verified price. Do not create a paid resource or upgrade a plan.
   If a new integration asks for identity/data sharing or terms acceptance,
   obtain the required action-time approval. A previous rejected resource
   creation must not be retried through another route without approval.
2. Create the dedicated project and apply only the Kulturarena migration.
   Expose kulturarena_portal to its API. Verify table/RPC access for anon and
   ordinary authenticated users is denied, including cross-product attempts.
3. Create separate provider accounts for the owner and colleague. Use their
   actual returned UUIDs in server-owned membership, with no plaintext
   passwords in files or logs. Do not claim account creation before the
   provider confirms it. Password entry/creation through a provider UI requires
   the user handoff required by that UI tool's policy.
4. Generate independent agent and encryption secrets, mode 0600 outside the
   project. Configure only the KULTURARENA_ environment namespace on Vercel.
   Native integrations may populate generic Supabase variables: do not allow
   them to replace another portal's values. Preserve other website settings.
5. Install the reviewed portal_operations.py and kulturarena_portal_agent.mjs
   in Kulturarena's 05_SYSTEM folder. The local configuration contains only
   portal_url, root, token_file and data_key_file. Start one Kulturarena agent.
6. Deploy the tested commit through the existing website workflow. Verify
   /kulturarena/health reports readiness from the actual database and fresh
   agent state. A published login page or configured environment is insufficient.
7. Verify both users' login, read, edit/readback, files, logout and revocation.
   Test denied anonymous/foreign access, cross-user command receipts, expired
   leases, duplicate prevention, private telemetry, independent stopping and
   restore. Do not stop another tenant to test Kulturarena's stop mechanism.
8. Verify access from another device/network and changes reflected in the
   master workbook. Verify the private Drive backup and restore just Kulturarena.
   A same-Mac browser test does not prove another-device access or reboot
   continuity. The current permitted-app backup context needs restarting after
   a Mac reboot; report that limitation until a real reboot test passes.

## Backup and rollback

Back up Kulturarena source, tasks, reports and consistent CRM versions only
to the owner's private Drive. Keep secret files and passwords excluded.
Encrypted cloud views can be regenerated from the restored master.

To roll back, stop only the Kulturarena agent and revoke only Kulturarena's
device token or membership. Preserve database/audit records. Restore just
Kulturarena from a verified version and re-provision its secrets. If a website
rollback is necessary, use the existing reviewed deployment workflow while
preserving other portals' later changes. Repeat hosted isolation and remote
device checks before calling the system active again.
