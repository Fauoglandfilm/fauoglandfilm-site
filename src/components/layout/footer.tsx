"use client";

import Link from "next/link";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import { SocialLinksRow } from "@/components/ui/social-links";
import { navItems, siteConfig } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

export function Footer() {
  const { language } = useSitePreferences();
  const copy = uiCopy.footer[language];

  return (
    <footer className="bg-[#111111] text-white">
      <div className="site-container py-7 sm:py-10">
        <div className="brand-signature-chip rounded-[1.9rem] px-5 py-5 sm:rounded-[2.1rem] sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        <div className="flex flex-col items-center gap-4 text-center lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-8 lg:text-left">
          <div className="flex max-w-md flex-col items-center gap-3 lg:items-start">
            <Link href="/" aria-label="Fau&Land Film" className="flex flex-col items-center gap-2.5 lg:items-start">
              <BrandLogo
                variant="full"
                className="w-[10.5rem] brightness-[1.26] contrast-[1.08] saturate-[1.1] drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)] sm:w-[12.5rem]"
              />
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/46">
                {copy.productionCompany}
              </p>
            </Link>

            <div className="space-y-0.5 text-[0.92rem] leading-6 text-[var(--foreground)]/76 sm:text-base">
              <a className="block transition hover:text-[color:var(--foreground)]" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              <a className="block transition hover:text-[color:var(--foreground)]" href={siteConfig.phonePrimaryHref}>
                {siteConfig.phonePrimary}
              </a>
            </div>

            <SocialLinksRow
              title={copy.social}
              compact
              tone="inverse"
              className="w-full"
            />
          </div>

          <div className="flex w-full max-w-xs flex-col items-center gap-4 text-center lg:items-end lg:text-right">
            <div className="flex flex-col items-center gap-1.5 text-sm leading-6 text-[var(--foreground)]/72 lg:items-end">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-[color:var(--foreground)]">
                  {resolveLocalizedValue(item.label, language)}
                </Link>
              ))}
            </div>

            <div className="space-y-1 text-[0.78rem] uppercase tracking-[0.18em] text-[var(--foreground)]/42">
              <p>{siteConfig.locationLabel}</p>
              <p>Org.nr. {siteConfig.orgId}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
