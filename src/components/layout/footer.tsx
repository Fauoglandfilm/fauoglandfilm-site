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
        className="object-cover opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,173,116,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(71,92,128,0.18),transparent_22%),linear-gradient(180deg,rgba(8,8,9,0.74),rgba(8,8,9,0.42)_18%,rgba(8,8,9,0.88)_100%)]" />
      <div className="grain-overlay absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <div className="glass-panel relative overflow-hidden rounded-[1.7rem] px-4 py-4 shadow-[0_18px_56px_rgba(0,0,0,0.14)] sm:px-[1.125rem] sm:py-[1.125rem] lg:px-5 lg:py-[1.125rem]">
          <div className="glass-sheen absolute inset-0 opacity-34" />
          <div className="pointer-events-none absolute -bottom-10 right-[-0.5rem] hidden h-40 w-40 md:block opacity-[0.08]">
            <BrandLogo
              variant="mark"
              className="h-auto w-full brightness-[1.55] saturate-[1.3] drop-shadow-[0_24px_42px_rgba(0,0,0,0.28)]"
            />
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-5">
            <div className="space-y-2 sm:space-y-3">
              <Link href="/" className="brand-signature-chip flex w-fit items-center gap-3 px-2 py-2 transition hover:opacity-100">
                <div className="brand-signature-mark flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full p-[0.72rem]">
                  <BrandLogo
                    variant="mark"
                    className="relative z-[1] h-auto w-full brightness-[1.82] contrast-[1.16] saturate-[1.48] drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
                  />
                </div>
                <div className="space-y-1">
                  <BrandLogo
                    variant="full"
                    className="w-[10.8rem] brightness-[1.2] contrast-[1.06] saturate-[1.16] drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)] sm:w-[12rem]"
                  />
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-white/50">
                    {copy.productionCompany}
                  </p>
                </div>
              </Link>

              <div className="max-w-md space-y-1.5">
                <p className="font-display max-w-sm text-[clamp(1.5rem,4.2vw,2rem)] leading-[0.98] tracking-[-0.05em] text-white">
                  {copy.title}
                </p>
                <p className="body-copy max-w-sm text-white/60">
                  {copy.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <ButtonLink
                  href={siteConfig.bookingHref}
                  variant="secondary"
                  size="compact"
                  className="w-full text-[0.8rem] sm:w-auto"
                >
                  {language === "no" ? "Send en kort brief" : "Send a short brief"}
                </ButtonLink>
              </div>

              <SocialLinksRow
                title={copy.social}
                description={copy.socialDescription}
                compact
                tone="inverse"
                className="pt-0"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-[1.15rem] border border-white/7 bg-white/[0.024] p-3 backdrop-blur-lg sm:p-3.5">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/46">{copy.contact}</p>
                <div className="mt-1.5 space-y-0.5 text-[0.84rem] leading-[1.25rem] text-white/66 sm:text-[0.88rem]">
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

              <div className="rounded-[1.15rem] border border-white/7 bg-white/[0.024] p-3 backdrop-blur-lg sm:p-3.5">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/46">{copy.navigation}</p>
                <div className="mt-1.5 flex flex-col items-start gap-0.5 text-[0.84rem] text-white/76 sm:text-[0.88rem]">
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
