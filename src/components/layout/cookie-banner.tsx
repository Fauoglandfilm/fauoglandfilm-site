"use client";

import Link from "next/link";

import { useCookieConsent } from "@/components/providers/cookie-consent";
import { useSitePreferences } from "@/components/providers/site-preferences";

const copy = {
  no: {
    manage: "Cookievalg",
    title: "Vi bruker cookies og lignende lagring for drift, analyse og innhold fra tredjeparter.",
    body:
      "Nødvendige cookies og lagring for innlogging, sikkerhet og valgene dine er alltid på. Analyse, markedsføring og eksternt innhold aktiveres først hvis du samtykker.",
    policy: "Les cookie-erklæringen",
    later: "Du kan endre valget når som helst via Cookievalg.",
    accept: "Aksepter alle",
    reject: "Avvis",
    customize: "Tilpass",
    modalTitle: "Velg hvilke cookies du vil tillate",
    modalBody:
      "Vi skiller mellom nødvendige cookies, analyse, eksternt innhold og markedsføring. Du kan når som helst endre valget ditt.",
    necessary: "Nødvendige",
    necessaryBody:
      "Påkrevd for sikkerhet, innlogging, skjemaflyt og for å huske cookievalget ditt.",
    analytics: "Analyse",
    analyticsBody:
      "Hjelper oss å forstå bruk av nettstedet med Google Analytics 4. Disse settes først etter samtykke.",
    externalMedia: "Eksternt innhold",
    externalMediaBody:
      "Brukes når vi viser innhold fra tredjeparter som YouTube, Vimeo, TikTok eller Instagram direkte på siden. Disse kan sette egne cookies eller hente informasjon fra enheten din.",
    marketing: "Markedsføring",
    marketingBody:
      "Brukes til markedsføring og måling via Meta Pixel og LinkedIn Insight Tag. Disse settes først etter samtykke.",
    alwaysOn: "Alltid på",
    save: "Lagre valg",
    close: "Lukk",
  },
  en: {
    manage: "Cookie settings",
    title: "We use cookies and similar storage for operations, analytics and third-party content.",
    body:
      "Necessary cookies and storage for sign-in, security and your choices are always on. Analytics, marketing and third-party content are enabled only after you consent.",
    policy: "Read the cookie notice",
    later: "You can change your choice at any time via Cookie settings.",
    accept: "Accept all",
    reject: "Reject",
    customize: "Customize",
    modalTitle: "Choose which cookies you want to allow",
    modalBody:
      "We separate necessary cookies, analytics, third-party content and marketing. You can change your choice at any time.",
    necessary: "Necessary",
    necessaryBody:
      "Required for security, sign-in, forms and for remembering your cookie choice.",
    analytics: "Analytics",
    analyticsBody:
      "Helps us understand how the site is used with Google Analytics 4. These are set only after consent.",
    externalMedia: "Third-party content",
    externalMediaBody:
      "Used when we display content from third parties such as YouTube, Vimeo, TikTok or Instagram directly on the page. Those providers may set their own cookies or access information on your device.",
    marketing: "Marketing",
    marketingBody:
      "Used for marketing and measurement via Meta Pixel and LinkedIn Insight Tag. These are set only after consent.",
    alwaysOn: "Always on",
    save: "Save choices",
    close: "Close",
  },
} as const;

function PreferenceCard({
  badgeLabel,
  checked,
  description,
  disabled = false,
  label,
  onChange,
}: {
  badgeLabel?: string;
  checked: boolean;
  description: string;
  disabled?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-4 rounded-[1.4rem] border border-[color:var(--line)]/80 bg-[color:var(--surface)]/72 px-4 py-4">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
          className="h-4.5 w-4.5 rounded border border-[color:var(--line-strong)] text-[color:var(--foreground)] accent-[color:var(--foreground)] disabled:cursor-not-allowed disabled:opacity-70"
        />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2 text-[0.98rem] font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
          {label}
          {disabled && badgeLabel ? (
            <span className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)]/62">
              {badgeLabel}
            </span>
          ) : null}
        </span>
        <span className="mt-1 block text-[0.92rem] leading-6 text-[color:var(--foreground)]/74">
          {description}
        </span>
      </span>
    </label>
  );
}

export function CookieBanner() {
  const { language } = useSitePreferences();
  const {
    acceptAll,
    closePreferences,
    draftPreferences,
    hasMadeChoice,
    isPreferencesOpen,
    openPreferences,
    rejectAll,
    savePreferences,
    setDraftPreferences,
  } = useCookieConsent();
  const activeCopy = copy[language];
  const handleOpenPreferences = () => {
    openPreferences();
  };

  const showBanner = !hasMadeChoice;

  return (
    <>
      {showBanner ? (
        <section
          aria-label={activeCopy.title}
          className="fixed inset-x-0 bottom-0 z-[90] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-3 sm:px-5"
        >
          <div className="mx-auto max-w-[70rem] rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--surface)]/96 p-5 shadow-[0_22px_60px_rgba(12,14,18,0.18)] backdrop-blur-xl sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-6">
              <div>
                <p className="text-[1.08rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                  {activeCopy.title}
                </p>
                <p className="mt-2 max-w-[54rem] text-[0.96rem] leading-7 text-[color:var(--foreground)]/76">
                  {activeCopy.body}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.88rem] text-[color:var(--foreground)]/66">
                  <Link
                    href="/cookies"
                    className="font-semibold text-[color:var(--foreground)] underline underline-offset-4"
                  >
                    {activeCopy.policy}
                  </Link>
                  <span>{activeCopy.later}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-end">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-5 py-3 text-[0.95rem] font-semibold tracking-[-0.02em] text-[color:var(--foreground)] transition hover:bg-[color:var(--surface)]"
                >
                  {activeCopy.reject}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--foreground)] bg-[color:var(--foreground)] px-5 py-3 text-[0.95rem] font-semibold tracking-[-0.02em] text-[color:var(--background)] transition hover:opacity-90"
                >
                  {activeCopy.accept}
                </button>
                <button
                  type="button"
                  onClick={handleOpenPreferences}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-transparent px-4 py-3 text-[0.92rem] font-semibold tracking-[-0.02em] text-[color:var(--foreground)]/72 transition hover:text-[color:var(--foreground)]"
                >
                  {activeCopy.customize}
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={handleOpenPreferences}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-4 z-[80] inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)]/94 px-4 py-2 text-[0.88rem] font-semibold tracking-[-0.02em] text-[color:var(--foreground)] shadow-[0_16px_40px_rgba(12,14,18,0.12)] backdrop-blur-xl transition hover:bg-[color:var(--surface)] sm:left-5"
        >
          {activeCopy.manage}
        </button>
      )}

      {isPreferencesOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[rgba(10,12,16,0.48)] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-6 backdrop-blur-sm sm:items-center sm:px-5"
          onClick={closePreferences}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeCopy.modalTitle}
            className="w-full max-w-[42rem] rounded-[1.9rem] border border-[color:var(--line)] bg-[color:var(--background)] p-5 shadow-[0_28px_80px_rgba(12,14,18,0.24)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                  {activeCopy.modalTitle}
                </p>
                <p className="mt-2 max-w-[34rem] text-[0.95rem] leading-7 text-[color:var(--foreground)]/74">
                  {activeCopy.modalBody}
                </p>
              </div>
              <button
                type="button"
                onClick={closePreferences}
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-[color:var(--line)] px-3 py-2 text-[0.82rem] font-semibold text-[color:var(--foreground)]/76 transition hover:text-[color:var(--foreground)]"
              >
                {activeCopy.close}
              </button>
            </div>

            <div className="mt-6 grid gap-3.5">
              <PreferenceCard
                checked
                disabled
                badgeLabel={activeCopy.alwaysOn}
                label={activeCopy.necessary}
                description={activeCopy.necessaryBody}
              />
              <PreferenceCard
                checked={draftPreferences.analytics}
                label={activeCopy.analytics}
                description={activeCopy.analyticsBody}
                onChange={(checked) =>
                  setDraftPreferences({
                    ...draftPreferences,
                    analytics: checked,
                  })
                }
              />
              <PreferenceCard
                checked={draftPreferences.externalMedia}
                label={activeCopy.externalMedia}
                description={activeCopy.externalMediaBody}
                onChange={(checked) =>
                  setDraftPreferences({
                    ...draftPreferences,
                    externalMedia: checked,
                  })
                }
              />
              <PreferenceCard
                checked={draftPreferences.marketing}
                label={activeCopy.marketing}
                description={activeCopy.marketingBody}
                onChange={(checked) =>
                  setDraftPreferences({
                    ...draftPreferences,
                    marketing: checked,
                  })
                }
              />
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-5 py-3 text-[0.95rem] font-semibold tracking-[-0.02em] text-[color:var(--foreground)] transition hover:bg-[color:var(--surface)]"
              >
                {activeCopy.reject}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--foreground)] px-5 py-3 text-[0.95rem] font-semibold tracking-[-0.02em] text-[color:var(--foreground)] transition hover:bg-[color:var(--surface)]"
              >
                {activeCopy.accept}
              </button>
              <button
                type="button"
                onClick={() => savePreferences(draftPreferences)}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--foreground)] bg-[color:var(--foreground)] px-5 py-3 text-[0.95rem] font-semibold tracking-[-0.02em] text-[color:var(--background)] transition hover:opacity-90"
              >
                {activeCopy.save}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
