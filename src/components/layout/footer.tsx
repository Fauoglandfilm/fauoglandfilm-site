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
    <footer className="border-t border-[color:var(--line)] bg-[#111111] text-white">
      <div className="site-container py-10 sm:py-12">
        <div className="flex flex-col items-center gap-6 text-center lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10 lg:text-left">
          <div className="flex max-w-md flex-col items-center gap-4 lg:items-start">
            <Link href="/" aria-label="Fau&Land Film" className="flex flex-col items-center gap-3 lg:items-start">
              <BrandLogo
                variant="full"
                className="w-[11.5rem] brightness-[1.28] contrast-[1.08] saturate-[1.1] drop-shadow-[0_10px_22px_rgba(0,0,0,0.24)] sm:w-[13rem]"
              />
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/46">
                {copy.productionCompany}
              </p>
            </Link>

            <div className="space-y-1 text-[0.95rem] leading-7 text-white/76 sm:text-base">
              <a className="block transition hover:text-white" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              <a className="block transition hover:text-white" href={siteConfig.phonePrimaryHref}>
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

          <div className="flex w-full max-w-xs flex-col items-center gap-5 text-center lg:items-end lg:text-right">
            <div className="flex flex-col items-center gap-2 text-sm leading-6 text-white/72 lg:items-end">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {resolveLocalizedValue(item.label, language)}
                </Link>
              ))}
            </div>

            <div className="space-y-1 text-[0.78rem] uppercase tracking-[0.18em] text-white/42">
              <p>{siteConfig.locationLabel}</p>
              <p>Org.nr. {siteConfig.orgId}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
