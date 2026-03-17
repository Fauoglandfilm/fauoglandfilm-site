"use client";

import Image from "next/image";
import Link from "next/link";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { SocialLinksRow } from "@/components/ui/social-links";
import { navItems, siteConfig } from "@/data/site-content";
import { siteVisuals } from "@/data/visual-assets";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

export function Footer() {
  const { language } = useSitePreferences();
  const copy = uiCopy.footer[language];

  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--background)_82%,#050608)]">
      <Image
        src={siteVisuals.studioLightBackdrop.src}
        alt={resolveLocalizedValue(siteVisuals.studioLightBackdrop.alt, language)}
        fill
        sizes="100vw"
        className="object-cover opacity-[0.18]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,173,116,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(71,92,128,0.18),transparent_22%),linear-gradient(180deg,rgba(8,8,9,0.74),rgba(8,8,9,0.42)_18%,rgba(8,8,9,0.88)_100%)]" />
      <div className="grain-overlay absolute inset-0 opacity-44" />
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] px-5 py-5 shadow-[0_26px_90px_rgba(0,0,0,0.2)] sm:px-6 sm:py-6 lg:px-7 lg:py-6">
          <div className="glass-sheen absolute inset-0 opacity-48" />
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <Link href="/" className="flex w-fit items-center gap-2.5 transition hover:opacity-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.1] p-2.5 backdrop-blur-xl">
                  <BrandLogo variant="mark" className="opacity-100" />
                </div>
                <div>
                  <p className="font-display text-[0.98rem] text-white">
                    Fau&amp;Land Film
                  </p>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/50">
                    {copy.productionCompany}
                  </p>
                </div>
              </Link>

              <div className="max-w-xl space-y-2">
                <p className="feature-title max-w-lg text-white">
                  {copy.title}
                </p>
                <p className="body-copy max-w-lg text-white/68">
                  {copy.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <ButtonLink
                  href={siteConfig.bookingHref}
                  variant="secondary"
                  size="compact"
                  className="w-full sm:w-auto"
                >
                  {language === "no" ? "Send en kort brief" : "Send a short brief"}
                </ButtonLink>
              </div>

              <SocialLinksRow
                title={copy.social}
                description={copy.socialDescription}
                compact
                tone="inverse"
                className="pt-0.5"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.35rem] border border-white/9 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-[1.125rem]">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/50">{copy.contact}</p>
                <div className="mt-2.5 space-y-1.5 text-[0.92rem] leading-6 text-white/70 sm:text-[0.96rem]">
                  <p>{siteConfig.locationLabel}</p>
                  <p>Org.nr. {siteConfig.orgId}</p>
                  <a className="block transition hover:text-white" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                  <a className="block transition hover:text-white" href={siteConfig.phonePrimaryHref}>
                    {siteConfig.phonePrimary}
                  </a>
                  <p>{resolveLocalizedValue(siteConfig.responseTime, language)}</p>
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-white/9 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-[1.125rem]">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/50">{copy.navigation}</p>
                <div className="mt-2.5 flex flex-col items-start gap-1.5 text-[0.92rem] text-white/80 sm:text-[0.96rem]">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="transition hover:text-white">
                      {resolveLocalizedValue(item.label, language)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
