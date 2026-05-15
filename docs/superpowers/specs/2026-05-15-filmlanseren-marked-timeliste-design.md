# Filmlanseren Marked Og Timeliste Design

Dato: 2026-05-15

## Bakgrunn

Frilanseren finnes i dag som en pilotmodul i Fau&Land Film-siden. Den har rollevalg, registrering, innlogging, profiler, bilde-/logoopplasting, adminoversikt og GDPR-handlinger. Brukerens nye mål er å bygge hele produktet ferdig i retning av "Facebook for filmarbeidere", men valgt første ferdige versjon er ikke sosial feed først. Valgt retning er en åpen filmbransje-markedsplass med timelisteverktøy.

Produktgrunnlaget kommer fra:

- Gjennomgang av eksisterende repo.
- `Filmlanserenno.pdf`.
- Eksportert tekst fra `Filmlanseren businessplan tekst .pages`.
- Brukerens valg i brainstorming: marked først, deretter marked + timeliste, åpen markedsplass, kontaktinfo skjult bak kontaktknapp.

## Produktmål

Første store release skal gjøre Filmlanseren til et nyttig verktøy for norsk filmbransje:

- Frilansere skal bli funnet.
- Arbeidsgivere skal finne folk og legge ut jobber.
- Jobber skal kunne søkes/interessemarkeres uten Facebook-grupper.
- Kontaktinformasjon skal beskyttes.
- Admin skal kunne godkjenne og moderere innhold.
- Frilansere skal kunne lage en enkel, strukturert timeliste og eksportere den som PDF.

Dette skal legge grunnlaget for senere releases med prosjekter, kontaktlister, automatisk CV, ratings, kontrakter, lønn, betaling, tariffkoder, AI-matching, meldinger og sosial feed.

## Første Release Scope

Første release inneholder:

- Offentlig markedsplass-hjem for Filmlanseren.
- Offentlig frilanserdatabase.
- Offentlige frilanserprofiler.
- Offentlig arbeidsgiver-/selskapsdatabase.
- Offentlige arbeidsgiver-/selskapsprofiler.
- Offentlig jobbliste.
- Offentlige jobbdetaljsider.
- Innlogget søknad/interessemarkering med valgfri kommentar.
- Kontaktforespørsler bak innlogging.
- Skjult e-post/telefon på offentlige sider.
- Frilanser-dashboard for profil, synlighet, søknader og timelister.
- Arbeidsgiver-dashboard for selskapsprofil, egne jobber og interesserte kandidater.
- Admin-dashboard for godkjenning, moderering, rapporter og oversikt.
- Timelisteverktøy med prosjektinfo, arbeidsgiver, rolle, dato, timer, sats, tillegg, notat, summer og PDF-eksport.

Første release inneholder ikke:

- Faktisk lønnsutbetaling.
- Betalingsformidling.
- Digital kontraktssignering.
- Juridisk full tariff-/lønnsmotor.
- Full AI-matching.
- Direktemeldinger/chat.
- Sosial feed med poster, kommentarer og reaksjoner.
- Mobilapp.

## Plattformprinsipper

Filmlanseren skal være åpen nok til at den kan erstatte Facebook-grupper som synlig markedsplass, men ikke så åpen at persondata eksponeres ukontrollert.

- Jobber kan vises offentlig.
- Frilanserprofiler kan vises offentlig når brukeren velger synlighet og admin har godkjent profilen.
- Arbeidsgiverprofiler kan vises offentlig når admin har godkjent dem.
- E-post og telefon vises ikke offentlig.
- Kontakt krever innlogging og går gjennom en kontaktforespørsel.
- Søknad/interesse krever innlogging.
- Admin kan skjule, avvise eller deaktivere innhold.
- Brukere skal kunne be om innsyn og sletting, som dagens pilot allerede støtter.

## Arkitektur

Eksisterende stack videreføres:

- Next.js App Router.
- Supabase Auth.
- Supabase Postgres med Row Level Security.
- Supabase Storage for bilder og senere showreel thumbnails.
- Server Components for offentlige lister og detaljer.
- Server Actions for mutasjoner.
- Admin-ruter under `/frilanseren/admin`.
- Eksisterende cookie-/tracking-regler videreføres: global analytics og tredjepartstracking skal ikke lastes på `/frilanseren`.

Implementasjonen skal bygge videre på dagens Frilanseren-modul i stedet for å lage et separat prosjekt.

## URL-Struktur

Planlagt struktur:

- `/frilanseren`: markedsplass-hjem.
- `/frilanseren/frilansere`: offentlig frilanserdatabase.
- `/frilanseren/frilansere/[slug]`: offentlig frilanserprofil.
- `/frilanseren/arbeidsgivere`: offentlig arbeidsgiverdatabase.
- `/frilanseren/arbeidsgivere/[slug]`: offentlig arbeidsgiverprofil.
- `/frilanseren/jobber`: offentlig jobbliste.
- `/frilanseren/jobber/[slug]`: offentlig jobbdetalj.
- `/frilanseren/timeliste`: inngang til timelisteverktøy. Innlogging kreves for lagring.
- `/frilanseren/dashboard`: innlogget oversikt.
- `/frilanseren/dashboard/profil`: profilredigering.
- `/frilanseren/dashboard/jobber`: arbeidsgivers egne jobber og kandidater.
- `/frilanseren/dashboard/soknader`: frilanserens søknader/interesser.
- `/frilanseren/dashboard/timelister`: frilanserens timelister.
- `/frilanseren/admin`: intern adminoversikt.

Eksisterende `/frilanseren/profile` kan enten beholdes som redirect til `/frilanseren/dashboard/profil` eller videreføres som intern alias i første implementering.

## Datamodell

Eksisterende tabeller videreføres og utvides.

### `users_meta`

Beholder dagens rolle og navn, og bør utvides med:

- `slug`
- `onboarding_status`
- `public_status`
- `moderation_status`
- `last_seen_at`

### `freelancer_profiles`

Utvides med:

- `slug`
- `headline`
- `bio`
- `city`
- `region`
- `availability_status`
- `is_public`
- `is_available`
- `portfolio_links` som `jsonb`
- `showreel_url`
- `license_tags` som `text[]`
- `rate_day`
- `rate_hour`
- `public_contact_mode`
- `moderation_status`
- `approved_at`

### `employer_profiles`

Utvides med:

- `slug`
- `company_description`
- `website_url`
- `city`
- `region`
- `is_public`
- `verified_status`
- `moderation_status`
- `approved_at`

### Nye tabeller

`jobs`:

- Jobbutlysninger med tittel, slug, arbeidsgiver, produksjonstype, lokasjon, periode, honorar/sats, beskrivelse, status, synlighet og modereringsstatus.

`job_roles`:

- Roller en jobb trenger. Brukes til filter og senere varsler/matching.

`job_applications`:

- Frilanserens interesse/søknad på en jobb, med valgfri kommentar og status.

`saved_profiles`:

- Arbeidsgiver kan lagre frilansere i en privat liste.

`contact_requests`:

- Kontaktforespørsler fra arbeidsgiver til frilanser uten offentlig kontaktinfo.

`timesheets`:

- Timelistehode: eier, prosjekt, arbeidsgiver, rolle, periode, status og totalsummer.

`timesheet_entries`:

- Linjer med dato, timer, sats, tillegg, notat og beregnet linjesum.

`moderation_reports`:

- Rapportering av profiler, jobber eller annet innhold.

`notifications`:

- Varsler om relevante jobber, søknader, kontaktforespørsler og statusendringer.

## Datatilgang Og RLS

Offentlig lesing skal bare tillates for innhold som er eksplisitt offentlig og godkjent.

RLS-prinsipper:

- Alle kan lese offentlige, godkjente frilanserprofiler uten privat kontaktinfo.
- Alle kan lese offentlige, godkjente arbeidsgiverprofiler.
- Alle kan lese åpne, godkjente jobber.
- Brukere kan lese og oppdatere egen private profil.
- Arbeidsgivere kan lese søknader på egne jobber.
- Frilansere kan lese egne søknader og kontaktforespørsler.
- Admin kan lese og administrere alt gjennom service-role på server eller admin-policyer.
- Kontaktinfo lagres ikke i offentlige view/responser.

Der det er mulig, bør offentlige spørringer bruke dedikerte select-funksjoner eller views som bare returnerer offentlig feltsnitt.

## Brukerflyter

### Frilanser

1. Besøker `/frilanseren`.
2. Oppretter frilanskonto.
3. Fyller ut profil med bilde, rolle/tags, by, bio, erfaring, portfolio/showreel, satser og synlighet.
4. Velger om profilen skal være offentlig og om personen er ledig for oppdrag.
5. Blir synlig etter admin-godkjenning.
6. Ser jobber på `/frilanseren/jobber`.
7. Trykker "Interessert" på jobb og sender valgfri kommentar.
8. Ser søknadsstatus i dashboard.
9. Lager timeliste og eksporterer PDF.

### Arbeidsgiver

1. Oppretter arbeidsgiverkonto.
2. Fyller ut selskapsprofil med logo, beskrivelse, nettside, produksjonstyper og lokasjon.
3. Poster jobb med roller, lokasjon, periode, honorar/sats og beskrivelse.
4. Ser interesserte frilansere i dashboard.
5. Åpner profiler, lagrer kandidater og sender kontaktforespørsel.
6. Lukker jobb når rollen er fylt.

### Offentlig besøkende

1. Kan se frilanserdatabase, arbeidsgiverdatabase og jobber.
2. Kan filtrere på rolle, sted, tilgjengelighet og erfaring.
3. Må logge inn for å kontakte, søke, lagre eller se sensitiv informasjon.

### Admin

1. Ser brukere, profiler, selskaper, jobber og søknader.
2. Godkjenner offentlig synlighet.
3. Skjuler eller avviser innhold ved behov.
4. Ser rapporter og dataforespørsler.
5. Kan manuelt hjelpe matching i startfasen.

## Timeliste

Første timelisteversjon er en hybrid:

- Den er enkel nok til å leveres raskt.
- Den har struktur som senere kan få tariffkoder, overtid, natt, helg, hviletid og godkjenning.
- Den skal ikke markedsføres som juridisk full Filmforbundet-beregning før reglene er implementert og kvalitetssikret.

Felter:

- Prosjektnavn.
- Arbeidsgiver/selskap.
- Rolle.
- Periode.
- Dato per linje.
- Timer per linje.
- Sats per linje eller standard sats fra timelisten.
- Tillegg.
- Notat.
- Linjesum.
- Totalsum.
- Status: `draft`, `exported`, `sent`.

PDF-eksport:

- Skal ha Fau&Land/Filmlanseren-branding.
- Skal vise frilanser, arbeidsgiver, prosjekt, periode, linjer og summer.
- Skal inneholde tydelig merknad om at dette er en timeliste/underlag, ikke en automatisk juridisk lønnsgaranti.

## UI-Struktur

Filmlanseren skal føles som et eget arbeidsprodukt. Det skal være mer LinkedIn/Finn/Notion enn klassisk Facebook i første release.

Hovednavigasjon:

- Frilansere.
- Jobber.
- Arbeidsgivere.
- Timeliste.
- Dashboard.
- Logg inn / Opprett konto.

Forsiden skal prioritere bruk:

- Søkefelt for roller og navn.
- Raske filtre.
- Fremhevede frilansere.
- Nyeste jobber.
- Fremhevede selskaper.
- CTA-er for frilanserprofil og jobbutlysning.

Frilanserkort skal vise:

- Bilde.
- Navn.
- Hovedrolle.
- By/region.
- Erfaring.
- Tilgjengelighet.
- Tags.
- Knapp til profil.
- Kontaktknapp som krever innlogging.

Jobbkort skal vise:

- Tittel.
- Arbeidsgiver.
- Roller.
- Sted.
- Periode.
- Honorarestimat/sats hvis oppgitt.
- Søknadsfrist.
- Status.

Timeliste skal være en verktøyflate med tette kontroller, tydelige totalsummer og minst mulig markedsføringspreg.

## Error Handling

Produktet må håndtere disse feilene ryddig:

- Manglende Supabase-konfigurasjon viser trygg utilgjengelig-melding, slik dagens auth gjør.
- Ikke-innlogget bruker som forsøker å kontakte eller søke sendes til login med `next`.
- Duplikat-søknad på samme jobb gir beskjed om at interesse allerede er registrert.
- Lukket jobb kan ikke søkes på.
- Ikke-godkjent profil kan redigeres, men ikke vises offentlig.
- Manglende eller ugyldig slug gir 404.
- PDF-eksportfeil viser tydelig retry-melding uten å miste timelistedata.
- Adminhandlinger logges så langt det er praktisk.

## Testing Og Verifisering

Automatiserte tester bør dekke:

- Validering av nye profiler.
- Slug-generering og duplikathåndtering.
- Public/private dataseleksjon.
- Jobbvalidering.
- Søknad/interesse, inkludert duplikater og lukket jobb.
- Kontaktforespørsler uten offentlig kontaktinfo.
- Timelisteberegninger.
- PDF-datagenerering.

Manuell QA bør dekke:

- Offentlig frilanserliste.
- Offentlig frilanserprofil.
- Offentlig jobbliste og jobbdetalj.
- Registrering og login.
- Søknad/interesse som frilanser.
- Jobbopprettelse som arbeidsgiver.
- Kontaktforespørsel.
- Admin-godkjenning/skjuling.
- Timeliste med PDF-eksport.
- Mobilvisning.

Før deploy skal disse kommandoene passere:

```bash
npm test
npm run lint
npm run build
```

## Lanseringskrav

Før produksjonslansering må følgende være klart:

- Supabase-schema og migrations kjørt i produksjon.
- RLS manuelt kontrollert for offentlige og private data.
- Supabase Auth redirect URL-er satt.
- E-postbekreftelse aktivert.
- SMTP konfigurert for Supabase Auth.
- Vercel miljøvariabler satt.
- Adminbrukere lagt inn i `FRILANSEREN_ADMIN_EMAILS` eller Supabase app metadata.
- Cookie/tracking-regler kontrollert for `/frilanseren`.
- Sentry eller annen feillogging aktivert.
- Personverntekst oppdatert for offentlig profil, kontaktforespørsler, søknader og timelister.
- Terms/brukervilkår skrevet før kontaktforespørsler og jobber åpnes bredt.

## Senere Releases

Release 2:

- Prosjekter.
- Crew-lister.
- Kontaktliste.
- Automatisk CV-oppdatering etter fullført prosjekt.
- Ratings og kommentarer som mottaker kan godkjenne for visning.
- Varsler basert på roller og lokasjon.

Release 3:

- Kontraktflyt.
- Digital signering.
- Timelistegodkjenning.
- Tariffkoder og Filmforbundet-regler etter juridisk kontroll.
- Lønn/betaling/fakturagrunnlag.
- Forsikring/arbeidsrettslige sjekkpunkter.

Release 4:

- AI-matching.
- Kandidatscore med forklarbarhet.
- Premium/showreel/statistikk.
- Direktemeldinger.
- Sosial feed/community.
- Mobilapp.

## Åpne Beslutninger

Disse beslutningene kan tas i implementeringsplanen eller like før bygging:

- Endelig navn i UI: Frilanseren eller Filmlanseren.
- Om `/frilanseren/profile` skal beholdes eller redirectes.
- Om arbeidsgivere kan publisere jobb direkte, eller om første jobb alltid krever admin-godkjenning.
- Om offentlig frilanserprofil er opt-in ved første release eller automatisk foreslått etter onboarding.
- Hvilken PDF-generator som skal brukes for timeliste i produksjon.

## Godkjenningskriterier

Designet regnes som godkjent når brukeren bekrefter:

- Første release er åpen markedsplass + timeliste.
- Kontaktinfo skal skjules bak kontaktknapp.
- Timelisten er enkel/hybrid og ikke full juridisk lønnsmotor.
- Kontrakt, betaling, AI og sosial feed kommer senere.
