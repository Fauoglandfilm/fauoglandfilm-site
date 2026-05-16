# Fau&Land Film

Nettsiden til Fau&Land Film er bygget med Next.js App Router og inkluderer en egen innlogget modul på `/frilanseren` for pilotplattformen for filmfrilansere og arbeidsgivere.

## Start lokalt

```bash
cd /Users/tommygarland/GitHub/fauoglandfilm-site
npm install
npm run dev
```

Åpne deretter `http://localhost:3000`.

## Frilanseren-modul

Modulen på `/frilanseren` dekker første markedsplassversjon:

- offentlig frilanserdatabase med rolle, sted, tilgjengelighet, showreel og satser
- offentlig arbeidsgiverdatabase med selskapsprofil og produksjonstyper
- offentlig jobbtavle med rollefilter, sted, periode og honorarinformasjon
- innlogging, registrering, glemt passord og dashboard
- søknad/interesse på jobber for frilansere
- kontaktforespørsler der e-post og telefon ikke vises offentlig
- profilbilde for frilanser og firmalogo for arbeidsgiver
- enkel timeliste med lagring og printbar utskrift/PDF-rute
- intern adminoversikt og modereringskø for profiler, jobber og rapporter
- GDPR-handlinger for innsyn og sletting

Det brukes kun nødvendige auth/session-cookies i dette produktområdet. Global analytics og tredjeparts tracking er slått av for `/frilanseren`.

## User Flow

- `/frilanseren` → åpne frilansere, jobber og arbeidsgivere
- `/frilanseren/frilansere` → offentlig profil → kontaktforespørsel etter innlogging
- `/frilanseren/jobber` → jobbdetalj → meld interesse etter innlogging
- `/frilanseren/arbeidsgivere` → offentlig arbeidsgiverprofil
- `/frilanseren/timeliste` → lagre timeliste etter innlogging
- `/frilanseren/register` → rollevalg → registrering → dashboard
- `/frilanseren/login` → dashboard
- `/frilanseren/dashboard` → `/frilanseren/dashboard/profil`
- `/frilanseren/dashboard/jobber` for arbeidsgivere
- `/frilanseren/dashboard/soknader` for frilansere
- `/frilanseren/dashboard/timelister` for lagrede timelister
- dashboard → `Be om innsyn i mine data` eller `Slett min konto og mine data`
- adminbrukere kan gå til `/frilanseren/admin` for å se registrerte brukere og godkjenne/skjule profiler og jobber

## Supabase-oppsett

1. Opprett et Supabase-prosjekt.
2. Kjør SQL-filen [supabase/frilanseren_schema.sql](/Users/tommygarland/GitHub/fauoglandfilm-site/supabase/frilanseren_schema.sql) i SQL Editor.
3. Sørg for at redirect-URLer i Supabase Auth inkluderer:
   - `http://localhost:3000/auth/confirm`
   - produksjonsdomenet ditt på Vercel, for eksempel `https://fauoglandfilm.com/auth/confirm`
4. Oppdater e-postmalen for bekreftelse og recovery slik at den peker til `/auth/confirm` med `token_hash` og `type`, i tråd med Supabase sin SSR-flyt.
5. Slå på `Confirm email` i Supabase Auth. Dette må være aktivt for at nye brukere skal få bekreftelsesmail og måtte aktivere kontoen før innlogging.
6. Sett opp egen SMTP-leverandør i Supabase for produksjon. Standard e-posttjeneste er kun best effort og har lave grenser.
7. SQL-skriptet oppretter også en privat Storage-bucket kalt `frilanseren-media` for profilbilder og firmalogoer.
8. Nye markedsplassfunksjoner krever tabellene `jobs`, `job_roles`, `job_applications`, `contact_requests`, `timesheets`, `timesheet_entries`, `moderation_reports` og `notifications`.

For production kan den additive markedsplassmigrasjonen også kjøres fra terminal når du har database-URI-en fra Supabase:

```bash
SUPABASE_DB_URL="postgresql://..." npm run db:migrate:frilanseren
```

Bruk Supabase sin production database connection string med passord og SSL. Scriptet skjuler brukernavn/passord i output og verifiserer at de nye tabellene finnes etterpå.

## Miljøvariabler

Legg inn verdiene fra `.env.example` i `.env.local` lokalt og i Vercel for deploy.

Viktig for `/frilanseren`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `FRILANSEREN_ADMIN_EMAILS` for kommaseparert liste med interne e-postadresser som skal kunne se `/frilanseren/admin`

## Testing lokalt

Kjør disse kommandoene før deploy:

```bash
npm test
npm run lint
npm run build
```

For å teste auth-flyten lokalt:

1. Sett Supabase-nøklene i `.env.local`.
2. Start appen med `npm run dev`.
3. Gå til `/frilanseren`.
4. Registrer en arbeidsgiver eller frilanser.
5. Last eventuelt opp profilbilde eller firmalogo i registrering eller på profilsiden.
6. Bekreft at registreringen viser melding om bekreftelsesmail, og at et nytt forsøk med samme e-post gir beskjed om at adressen allerede er registrert.
7. Verifiser at dashboard og profil er beskyttet, og at GDPR-knappene oppretter forespørsler i `data_requests`.
8. Gjør en profil offentlig, logg inn som adminbruker, og godkjenn profilen i `/frilanseren/admin`.
9. Kontroller at godkjente frilanser- og arbeidsgiverprofiler vises på `/frilanseren/frilansere` og `/frilanseren/arbeidsgivere`.
10. Opprett en jobb fra `/frilanseren/dashboard/jobber`, godkjenn den som admin, og meld interesse fra en frilanskonto.
11. Send en kontaktforespørsel fra en innlogget bruker og kontroller at kontaktinfo ikke vises offentlig.
12. Opprett en timeliste på `/frilanseren/timeliste`, se den på `/frilanseren/dashboard/timelister`, og åpne utskrift/PDF-lenken.

## Deploy

Vercel deployer automatisk når nye commits pushes til GitHub-repoet.
