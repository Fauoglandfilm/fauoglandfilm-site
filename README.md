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

Modulen på `/frilanseren` dekker v1 av pilotflyten:

- landing med rollevalg
- registrering for arbeidsgiver og frilanser
- innlogging og glemt passord
- dashboard og profilredigering
- GDPR-handlinger for innsyn og sletting

Det brukes kun nødvendige auth/session-cookies i dette produktområdet. Global analytics og tredjeparts tracking er slått av for `/frilanseren`.

## User Flow

- `/frilanseren` → rollevalg → registrering → dashboard
- `/frilanseren/login` → dashboard
- `/frilanseren/dashboard` → `/frilanseren/profile`
- dashboard → `Be om innsyn i mine data` eller `Slett min konto og mine data`

## Supabase-oppsett

1. Opprett et Supabase-prosjekt.
2. Kjør SQL-filen [supabase/frilanseren_schema.sql](/Users/tommygarland/GitHub/fauoglandfilm-site/supabase/frilanseren_schema.sql) i SQL Editor.
3. Sørg for at redirect-URLer i Supabase Auth inkluderer:
   - `http://localhost:3000/auth/confirm`
   - produksjonsdomenet ditt på Vercel, for eksempel `https://fauoglandfilm.com/auth/confirm`
4. Hvis du vil kreve e-postverifisering i piloten, slå det på i Supabase Auth.

## Miljøvariabler

Legg inn verdiene fra `.env.example` i `.env.local` lokalt og i Vercel for deploy.

Viktig for `/frilanseren`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- `NEXT_PUBLIC_SITE_URL`

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
5. Verifiser at dashboard og profil er beskyttet, og at GDPR-knappene oppretter forespørsler i `data_requests`.

## Deploy

Vercel deployer automatisk når nye commits pushes til GitHub-repoet.
