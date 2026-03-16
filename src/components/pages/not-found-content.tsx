"use client";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { uiCopy } from "@/data/ui-copy";

export function NotFoundContent() {
  const { language } = useSitePreferences();
  const copy = uiCopy.pages[language];

  return (
    <main className="section-space">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">404</p>
        <h1 className="page-title mt-4 text-[color:var(--foreground)]">
          {copy.notFoundTitle}
        </h1>
        <p className="body-lead mt-4 text-[var(--muted-2)]">
          {copy.notFoundDescription}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">
            {copy.notFoundHome}
          </ButtonLink>
          <ButtonLink href="/kontakt" variant="secondary">
            {copy.notFoundContact}
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
