"use client";

import { useCookieConsent } from "@/components/providers/cookie-consent";
import { useSitePreferences } from "@/components/providers/site-preferences";

const copy = {
  no: {
    title: "Dette innholdet kommer fra en tredjepart.",
    body:
      "For å vise videoen eller embedden her på siden må du samtykke til eksternt innhold i Cookievalg.",
    settings: "Cookievalg",
    openSource: "Åpne hos leverandør",
  },
  en: {
    title: "This content comes from a third party.",
    body:
      "To display the video or embed here on the page, you need to consent to third-party content in Cookie settings.",
    settings: "Cookie settings",
    openSource: "Open with provider",
  },
} as const;

export function ExternalMediaConsentPlaceholder({
  sourceUrl,
}: {
  sourceUrl?: string;
}) {
  const { language } = useSitePreferences();
  const { openPreferences } = useCookieConsent();
  const activeCopy = copy[language];

  return (
    <div className="absolute inset-0 z-[2] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-[26rem] rounded-[1.35rem] border border-white/14 bg-[rgba(8,10,14,0.72)] px-4 py-4 text-center text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-5">
        <p className="text-[1rem] font-semibold tracking-[-0.03em]">
          {activeCopy.title}
        </p>
        <p className="mt-2 text-[0.9rem] leading-6 text-white/72">
          {activeCopy.body}
        </p>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center">
          <button
            type="button"
            onClick={openPreferences}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white px-4 py-2 text-[0.9rem] font-semibold tracking-[-0.02em] text-black transition hover:opacity-90"
          >
            {activeCopy.settings}
          </button>
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-4 py-2 text-[0.9rem] font-semibold tracking-[-0.02em] text-white transition hover:bg-white/10"
            >
              {activeCopy.openSource}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
