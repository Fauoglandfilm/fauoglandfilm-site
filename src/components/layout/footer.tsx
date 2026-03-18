"use client";

import Link from "next/link";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icons";
import { navItems, siteConfig } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

const footerNavOrder = ["/tjenester", "/case", "/om-oss", "/faq", "/kontakt"] as const;

function getSocialIcon(name: string) {
  if (name === "Facebook") {
    return FacebookIcon;
  }

  if (name === "LinkedIn") {
    return LinkedInIcon;
  }

  return InstagramIcon;
}

export function Footer() {
  const { language } = useSitePreferences();
  const copy = uiCopy.footer[language];
  const footerNavItems = footerNavOrder
    .map((href) => navItems.find((item) => item.href === href))
    .filter((item): item is (typeof navItems)[number] => Boolean(item));

  return (
    <footer className="bg-[#111111] text-white">
      <div className="site-container py-5 sm:py-8">
        <div className="brand-signature-chip rounded-[1.55rem] px-4 py-4 sm:rounded-[1.95rem] sm:px-6 sm:py-5 lg:px-7 lg:py-6">
          <div className="grid gap-6 sm:gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.84fr)_minmax(0,0.82fr)] lg:items-start">
            <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <Link href="/" aria-label="Fau&Land Film" className="flex flex-col items-center gap-2 lg:items-start">
                <BrandLogo
                  variant="full"
                  className="w-[9.9rem] brightness-[1.26] contrast-[1.08] saturate-[1.08] drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)] sm:w-[11.5rem] lg:w-[12.25rem]"
                />
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]/50">
                  {copy.productionCompany}
                </p>
              </Link>

              <div className="space-y-1.5 text-[0.94rem] leading-6 text-[var(--foreground)]/78 sm:text-[0.98rem]">
                <a className="block transition hover:text-[color:var(--foreground)]" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <a className="block transition hover:text-[color:var(--foreground)]" href={siteConfig.phonePrimaryHref}>
                  {siteConfig.phonePrimary}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/52">
                {copy.social}
              </p>
              <div className="grid w-full gap-2.5 sm:max-w-[16rem]">
                {siteConfig.socialLinks.map((item) => {
                  const Icon = getSocialIcon(item.name);

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-center gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface)]/7 px-3.5 py-3 text-[0.9rem] font-medium text-[color:var(--foreground)]/84 transition duration-200 hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface)]/14 hover:text-[color:var(--foreground)] lg:justify-start"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)]/18 text-[color:var(--foreground)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 text-center lg:items-end lg:text-right">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/52">
                {copy.navigation}
              </p>
              <nav className="flex flex-col items-center gap-2 text-[0.94rem] leading-6 text-[var(--foreground)]/76 lg:items-end" aria-label={copy.navigation}>
                {footerNavItems.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-[color:var(--foreground)]">
                    {resolveLocalizedValue(item.label, language)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-5 border-t border-[color:var(--line)]/90 pt-4">
            <div className="flex flex-col items-center gap-1.5 text-center text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/48 sm:flex-row sm:justify-between sm:text-left">
              <p>{siteConfig.locationLabel}</p>
              <p>Org.nr. {siteConfig.orgId}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
