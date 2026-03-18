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
      <div className="site-container py-6 sm:py-10">
        <div className="brand-signature-chip rounded-[1.6rem] px-4 py-4 sm:rounded-[2.1rem] sm:px-6 sm:py-6 lg:px-7 lg:py-7">
          <div className="grid gap-5 text-center sm:gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.82fr)_minmax(0,0.8fr)] lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-3 lg:items-start">
              <Link href="/" aria-label="Fau&Land Film" className="flex flex-col items-center gap-2 lg:items-start">
                <BrandLogo
                  variant="full"
                  className="w-[9.8rem] brightness-[1.26] contrast-[1.08] saturate-[1.1] drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)] sm:w-[12.75rem]"
                />
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/48">
                  {copy.productionCompany}
                </p>
              </Link>

              <div className="space-y-1 text-[0.95rem] leading-6 text-[var(--foreground)]/78 sm:text-base">
                <a className="block transition hover:text-[color:var(--foreground)]" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <a className="block transition hover:text-[color:var(--foreground)]" href={siteConfig.phonePrimaryHref}>
                  {siteConfig.phonePrimary}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 lg:items-start">
              <div className="space-y-1.5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/52">
                  {copy.social}
                </p>
              </div>
              <SocialLinksRow
                title={copy.social}
                compact
                tone="inverse"
                className="w-full"
              />
            </div>

            <div className="flex flex-col items-center gap-3 lg:items-end lg:text-right">
              <div className="space-y-2">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/52">
                  {copy.navigation}
                </p>
                <div className="flex flex-col items-center gap-1.5 text-sm leading-6 text-[var(--foreground)]/74 lg:items-end">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="transition hover:text-[color:var(--foreground)]">
                      {resolveLocalizedValue(item.label, language)}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-1 border-t border-[color:var(--line)] pt-4 text-[0.78rem] uppercase tracking-[0.18em] text-[var(--foreground)]/46">
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
