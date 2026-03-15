# Fau&Land Film - ny salgsnettside

Premium B2B-nettside bygget i Next.js, TypeScript og Tailwind for Fau&Land Film. Løsningen er laget som en salgsnettside først - med tydelige CTA-er, synlig prislogikk, case-struktur og enkel videreutvikling.

## Start nettsiden

Start nettsiden slik:

```bash
npm run site
```

Hvis det ikke virker:

```bash
npm install
npm run dev
```

Åpne deretter adressen som vises i terminalen.

Du kan også starte direkte med:

```bash
./start-fauland.sh
```

For å gjøre oppstart global på Mac, slik at du kan skrive `faulandsite` fra hvilken som helst mappe:

Intel / vanlig `/usr/local/bin`:

```bash
ln -sf "/Users/tommygarland/Documents/github/fauoglandfilm-site/run-fauland-global.sh" /usr/local/bin/faulandsite
```

Apple Silicon:

```bash
mkdir -p /opt/homebrew/bin
ln -sf "/Users/tommygarland/Documents/github/fauoglandfilm-site/run-fauland-global.sh" /opt/homebrew/bin/faulandsite
```

Deretter kan du starte siden med:

```bash
faulandsite
```

Ekstra testscript:

```bash
npm run testsite
```

Skriptet finner prosjektmappen automatisk, installerer dependencies ved behov, starter Next.js, venter til siden faktisk svarer og åpner riktig localhost-adresse i nettleseren.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Semantisk HTML og metadata per side

## Produksjonsbuild

```bash
npm run build
```

## Viktige filer

- `src/data/site-content.ts`
  Her ligger tjenester, pakker, case, kontaktinfo, FAQ og øvrig innhold.
- `src/components/sections/site-sections.tsx`
  Gjenbrukbare seksjonsblokker for forside og undersider.
- `src/components/layout/`
  Header, footer og sticky mobil-CTA.
- `src/app/`
  Sidene: forside, tjenester, case, om oss, priser, kontakt og landingsside-mal.

## Innhold som enkelt kan byttes

- Kontaktinfo og bookinglenke: `src/data/site-content.ts`
- Pakker og prisnivåer: `src/data/site-content.ts`
- Casekort og case-detaljer: `src/data/site-content.ts`
- Hero-visual og bookingpanel:
  Se kommentarer i `src/components/sections/site-sections.tsx`

## Publiserte sider

- `/`
- `/tjenester`
- `/case`
- `/case/[slug]`
- `/om-oss`
- `/priser`
- `/kontakt`
- `/landingsside-mal`

## Neste anbefalte steg

1. Bytt demo-visual i hero med ekte showreel-still eller video-thumbnail.
2. Legg inn verifiserte tall og sitater på case med placeholder-merknad.
3. Koble bookingdelen til faktisk Calendly-embed eller valgt bookingsystem.
4. Legg inn ekte logo-SVG-er og bilder i stedet for tekstbasert sosial proof.
