"use client";

import Link from "next/link";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { uiCopy } from "@/data/ui-copy";

export function NotFoundContent() {
  const { language } = useSitePreferences();
  const copy = uiCopy.pages[language];

  return (
    <main className="section-space">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">404</p>
        <h1 className="mt-4 font-display text-5xl text-[color:var(--foreground)]">
          {copy.notFoundTitle}
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--muted-2)]">
          {copy.notFoundDescription}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--background)]"
          >
            {copy.notFoundHome}
          </Link>
          <Link
            href="/kontakt"
            className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)]"
          >
            {copy.notFoundContact}
          </Link>
        </div>
      </div>
    </main>
  );
}
