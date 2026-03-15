"use client";

import Link from "next/link";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { navItems, siteConfig } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

export function Footer() {
  const { language } = useSitePreferences();
  const copy = uiCopy.footer[language];

  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--background)_88%,var(--surface-strong))]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] p-3">
                <BrandLogo variant="mark" className="opacity-100" />
              </div>
              <div>
                <p className="font-display text-[1.05rem] text-[color:var(--foreground)]">
                  Fau&amp;Land Film
                </p>
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {copy.productionCompany}
                </p>
              </div>
            </div>

            <div className="max-w-2xl space-y-3">
              <p className="font-display text-[2rem] leading-[0.95] text-[color:var(--foreground)] sm:text-[2.8rem]">
                {copy.title}
              </p>
              <p className="max-w-xl text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                {copy.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.bookingHref}>
                {resolveLocalizedValue(siteConfig.bookingLabel, language)}
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="eyebrow">{copy.contact}</p>
              <div className="space-y-2 text-sm text-[var(--muted-2)] sm:text-base">
                <p>{siteConfig.locationLabel}</p>
                <a className="block transition hover:text-[color:var(--foreground)]" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <a className="block transition hover:text-[color:var(--foreground)]" href={siteConfig.phonePrimaryHref}>
                  {siteConfig.phonePrimary}
                </a>
                <p>{resolveLocalizedValue(siteConfig.responseTime, language)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="eyebrow">{copy.navigation}</p>
              <div className="flex flex-col items-start gap-2 text-sm text-[var(--muted-2)] sm:text-base">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-[color:var(--foreground)]">
                    {resolveLocalizedValue(item.label, language)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
