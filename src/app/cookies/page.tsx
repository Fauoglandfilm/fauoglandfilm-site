"use client";

import { useCookieConsent } from "@/components/providers/cookie-consent";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { siteConfig } from "@/data/site-content";

const copy = {
  no: {
    eyebrow: "Cookie-erklæring",
    title: "Hvordan Fau&Land Film bruker cookies og lignende lagring",
    intro:
      "Vi bruker nødvendige cookies og lokal lagring for at nettstedet skal fungere trygt. Analyse, eksternt innhold og markedsføring aktiveres bare hvis du samtykker.",
    manage: "Endre cookievalg",
    contactLabel: "Kontakt for personvernspørsmål",
    sections: [
      {
        title: "1. Nødvendige cookies og lagring",
        body:
          "Disse brukes for sikkerhet, innlogging, skjemaflyt, hastighetsbeskyttelse og for å huske valgene dine. De er nødvendige for at nettstedet og Frilanseren-modulen skal fungere.",
        bullets: [
          "Cookie som lagrer samtykkevalget ditt i inntil seks måneder.",
          "Sesjonscookies og sikkerhetsmekanismer knyttet til innlogging i Frilanseren.",
          "Lokal lagring for språk- og temavalg når du selv ber nettstedet huske innstillingen din.",
        ],
      },
      {
        title: "2. Analyse",
        body:
          "Hvis du samtykker, bruker vi Google Analytics 4 for å forstå hvilke sider som brukes og hvordan nettstedet kan forbedres.",
        bullets: [
          "Formål: måle trafikk, innhold og brukerflyt.",
          "Leverandør: Google Analytics 4.",
          "Status: av som standard, på først etter aktivt samtykke.",
        ],
      },
      {
        title: "3. Markedsføring",
        body:
          "Hvis du samtykker, kan vi bruke Meta Pixel og LinkedIn Insight Tag til måling av kampanjer og markedsføring.",
        bullets: [
          "Formål: kampanjemåling, remarketing og annonseringsinnsikt.",
          "Leverandører: Meta og LinkedIn.",
          "Status: av som standard, på først etter aktivt samtykke.",
        ],
      },
      {
        title: "4. Eksternt innhold",
        body:
          "Noen sider viser video og innhold fra tredjepartsleverandører. Slike embeds kan sette egne cookies eller hente informasjon fra enheten din.",
        bullets: [
          "Gjelder blant annet YouTube, Vimeo, TikTok og Instagram når innhold vises direkte på siden.",
          "Status: av som standard, på først etter aktivt samtykke.",
          "Hvis du ikke samtykker, viser vi en lokal forhåndsvisning i stedet for å laste tredjepartsinnholdet.",
        ],
      },
      {
        title: "5. Trekke tilbake samtykke",
        body:
          "Du kan når som helst endre eller trekke tilbake samtykket ditt. Bruk knappen Cookievalg nederst på siden.",
        bullets: [
          "Når du avviser valgfrie cookies, stopper vi lasting av analyse- og markedsføringsscripts.",
          "Vi forsøker også å slette valgfrie førstepartscookies som allerede er satt på domenet vårt.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Cookie notice",
    title: "How Fau&Land Film uses cookies and similar storage",
    intro:
      "We use necessary cookies and local storage to keep the site secure and functional. Analytics, third-party content and marketing are enabled only if you consent.",
    manage: "Change cookie settings",
    contactLabel: "Privacy contact",
    sections: [
      {
        title: "1. Necessary cookies and storage",
        body:
          "These are used for security, sign-in, forms, rate protection and to remember your choices. They are required for the site and the Frilanseren module to work.",
        bullets: [
          "A cookie that stores your consent choice for up to six months.",
          "Session cookies and security mechanisms connected to sign-in in Frilanseren.",
          "Local storage for language and theme when you explicitly ask the site to remember that choice.",
        ],
      },
      {
        title: "2. Analytics",
        body:
          "If you consent, we use Google Analytics 4 to understand which pages are used and how the site can be improved.",
        bullets: [
          "Purpose: traffic, content and flow measurement.",
          "Vendor: Google Analytics 4.",
          "Status: off by default, enabled only after active consent.",
        ],
      },
      {
        title: "3. Marketing",
        body:
          "If you consent, we may use Meta Pixel and the LinkedIn Insight Tag for campaign measurement and marketing.",
        bullets: [
          "Purpose: campaign measurement, remarketing and ad insights.",
          "Vendors: Meta and LinkedIn.",
          "Status: off by default, enabled only after active consent.",
        ],
      },
      {
        title: "4. Third-party content",
        body:
          "Some pages display video and content from third-party providers. Those embeds may set their own cookies or access information on your device.",
        bullets: [
          "This includes providers such as YouTube, Vimeo, TikTok and Instagram when content is shown directly on the page.",
          "Status: off by default, enabled only after active consent.",
          "If you do not consent, we show a local preview instead of loading the third-party content.",
        ],
      },
      {
        title: "5. Withdraw consent",
        body:
          "You can change or withdraw your consent at any time. Use the Cookie settings button at the bottom of the page.",
        bullets: [
          "When you reject optional cookies, we stop loading analytics and marketing scripts.",
          "We also attempt to delete optional first-party cookies that were already set on our domain.",
        ],
      },
    ],
  },
} as const;

export default function CookiesPage() {
  const { language } = useSitePreferences();
  const { openPreferences } = useCookieConsent();
  const activeCopy = copy[language];

  return (
    <main className="pb-20 pt-32 sm:pt-36">
      <div className="site-container">
        <div className="mx-auto max-w-[56rem]">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/52">
            {activeCopy.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[44rem] text-balance text-[2.4rem] font-semibold tracking-[-0.06em] text-[color:var(--foreground)] sm:text-[3.4rem]">
            {activeCopy.title}
          </h1>
          <p className="mt-5 max-w-[46rem] text-[1.02rem] leading-8 text-[color:var(--foreground)]/74">
            {activeCopy.intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openPreferences}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--foreground)] bg-[color:var(--foreground)] px-5 py-3 text-[0.95rem] font-semibold tracking-[-0.02em] text-[color:var(--background)] transition hover:opacity-90"
            >
              {activeCopy.manage}
            </button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-5 py-3 text-[0.95rem] font-semibold tracking-[-0.02em] text-[color:var(--foreground)] transition hover:bg-[color:var(--surface)]"
            >
              {activeCopy.contactLabel}
            </a>
          </div>

          <div className="mt-10 grid gap-4">
            {activeCopy.sections.map((section) => (
              <section
                key={section.title}
                className="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--surface)]/74 p-5 sm:p-6"
              >
                <h2 className="text-[1.12rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                  {section.title}
                </h2>
                <p className="mt-2 text-[0.96rem] leading-7 text-[color:var(--foreground)]/74">
                  {section.body}
                </p>
                <ul className="mt-4 space-y-2 text-[0.94rem] leading-7 text-[color:var(--foreground)]/72">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-[0.72rem] h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]/42" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-8 text-[0.9rem] leading-7 text-[color:var(--foreground)]/62">
            {siteConfig.legalName} · Org.nr. {siteConfig.orgId} ·{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-[color:var(--foreground)] underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
