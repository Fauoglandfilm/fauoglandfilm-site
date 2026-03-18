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
  const { language, theme } = useSitePreferences();
  const copy = uiCopy.footer[language];
  const footerNavItems = footerNavOrder
    .map((href) => navItems.find((item) => item.href === href))
    .filter((item): item is (typeof navItems)[number] => Boolean(item));

  return (
    <footer id="site-footer" className="relative overflow-hidden text-[color:var(--foreground)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[6%] top-8 h-28 w-28 rounded-full blur-3xl sm:h-36 sm:w-36"
          style={{ background: "color-mix(in srgb, var(--accent) 18%, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-[8%] h-32 w-32 rounded-full blur-3xl sm:h-44 sm:w-44"
          style={{ background: "color-mix(in srgb, var(--foreground) 9%, transparent)" }}
        />
      </div>

      <div className="site-container py-4 sm:py-7">
        <div className="footer-glass-panel px-4 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-5.5">
          <div className="relative z-[1] grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.84fr)_minmax(0,0.82fr)] lg:items-start">
            <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
              <Link href="/" aria-label="Fau&Land Film" className="flex flex-col items-center gap-1 lg:items-start">
                <BrandLogo
                  variant="full"
                  className={
                    theme === "dark"
                      ? "w-[10rem] brightness-[1.22] contrast-[1.06] saturate-[1.04] drop-shadow-[0_10px_22px_rgba(0,0,0,0.22)] sm:w-[11.4rem] lg:w-[12rem]"
                      : "w-[10rem] brightness-[0.18] contrast-[1.28] saturate-[1.02] sm:w-[11.4rem] lg:w-[12rem]"
                  }
                />
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--foreground)]/68">
                  {copy.productionCompany}
                </p>
              </Link>

              <div className="space-y-0.5 text-[0.95rem] leading-6 sm:text-[0.98rem]">
                <a className="block font-semibold text-[color:var(--foreground)]/96 transition hover:text-[color:var(--foreground)]" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <a className="block font-semibold text-[color:var(--foreground)]/92 transition hover:text-[color:var(--foreground)]" href={siteConfig.phonePrimaryHref}>
                  {siteConfig.phonePrimary}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--foreground)]/72">
                {copy.social}
              </p>
              <div className="grid w-full gap-1.5 sm:max-w-[15.5rem]">
                {siteConfig.socialLinks.map((item) => {
                  const Icon = getSocialIcon(item.name);

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="footer-social-link justify-center lg:justify-start"
                    >
                      <span className="footer-social-link__icon">
                        <Icon className="h-[1.02rem] w-[1.02rem]" />
                      </span>
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center lg:items-end lg:text-right">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--foreground)]/72">
                {copy.navigation}
              </p>
              <nav className="flex flex-col items-center gap-1 text-[0.94rem] leading-6 text-[color:var(--foreground)]/88 lg:items-end" aria-label={copy.navigation}>
                {footerNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition duration-200 hover:text-[color:var(--foreground)]"
                  >
                    {resolveLocalizedValue(item.label, language)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="relative z-[1] mt-3.5 border-t border-[color:var(--line)]/38 pt-2.5">
            <div className="flex flex-col items-center gap-1 text-center text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)]/68 sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <p>{siteConfig.locationLabel}</p>
              <p>Org.nr. {siteConfig.orgId}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
