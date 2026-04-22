"use client";

import type { CSSProperties, ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSitePreferences } from "@/components/providers/site-preferences";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/icons";
import {
  FAU_LAND_LOGO_PATHS,
  FAU_LAND_LOGO_VIEW_BOX,
} from "@/components/ui/fau-land-logo-paths";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";
import { navItems, siteConfig } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

const footerNavOrder = ["/tjenester", "/case", "/om-oss", "/faq", "/kontakt"] as const;
type FooterThemeVarMap = Record<`--${string}`, string>;

const FOOTER_THEME_VARS: Record<"light" | "dark", FooterThemeVarMap> = {
  light: {
    "--footer-shell-border":
      "color-mix(in srgb, var(--line-strong) 54%, rgba(255,255,255,0.78))",
    "--footer-shell-background":
      "linear-gradient(180deg, rgba(248,249,251,0.988), rgba(240,244,248,0.986) 48%, rgba(234,239,246,0.984))",
    "--footer-shell-shadow":
      "0 28px 60px rgba(17,17,17,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
    "--footer-rail-surface": "rgba(246,248,251,0.986)",
    "--footer-rule-gradient":
      "linear-gradient(90deg, rgba(114,140,188,0) 0%, rgba(57,74,101,0.34) 10%, rgba(57,74,101,0.34) 90%, rgba(114,140,188,0) 100%)",
    "--footer-body-copy": "var(--footer-text-body)",
    "--footer-strong-copy": "var(--footer-text-strong)",
    "--footer-link-copy": "var(--footer-text-accent-link)",
    "--footer-heading-copy": "var(--footer-text-heading)",
    "--footer-text-link": "var(--footer-text-link)",
    "--footer-text-link-hover": "var(--footer-text-link-hover)",
    "--footer-contact-icon": "var(--footer-text-icon)",
    "--footer-social-chip-bg":
      "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(248,251,255,0.72) 100%)",
    "--footer-social-chip-border": "rgba(31,41,55,0.2)",
    "--footer-social-chip-color": "var(--footer-text-strong)",
    "--footer-social-chip-hover-bg": "rgba(106,174,255,0.12)",
    "--footer-social-chip-hover-color": "var(--footer-text-link-hover)",
    "--footer-social-chip-shadow": "inset 0 0 0 1px rgba(255,255,255,0.78), 0 10px 22px rgba(17,17,17,0.06)",
    "--footer-social-chip-hover-shadow":
      "0 0 0 1px rgba(106,174,255,0.18), 0 0 18px rgba(106,174,255,0.14)",
    "--footer-bottom-glow":
      "radial-gradient(70% 70% at 50% 100%, rgba(92,124,182,0.04) 0%, rgba(92,124,182,0) 72%)",
  },
  dark: {
    "--footer-shell-border": "rgba(255,255,255,0.08)",
    "--footer-shell-background":
      "linear-gradient(180deg, rgba(7,8,10,0.996), rgba(10,11,14,0.996) 54%, rgba(11,15,22,0.998))",
    "--footer-shell-shadow":
      "0 36px 92px rgba(0,0,0,0.56), inset 0 1px 0 rgba(255,255,255,0.04)",
    "--footer-rail-surface": "rgba(11,12,15,0.94)",
    "--footer-rule-gradient":
      "linear-gradient(90deg, rgba(110,170,255,0) 0%, rgba(110,170,255,0.32) 10%, rgba(110,170,255,0.32) 90%, rgba(110,170,255,0) 100%)",
    "--footer-body-copy": "var(--footer-text-body)",
    "--footer-strong-copy": "var(--footer-text-strong)",
    "--footer-link-copy": "var(--footer-text-accent-link)",
    "--footer-heading-copy": "var(--footer-text-heading)",
    "--footer-text-link": "var(--footer-text-link)",
    "--footer-text-link-hover": "var(--footer-text-link-hover)",
    "--footer-contact-icon": "var(--footer-text-icon)",
    "--footer-social-chip-bg": "rgba(255,255,255,0.045)",
    "--footer-social-chip-border": "rgba(255,255,255,0.06)",
    "--footer-social-chip-color": "var(--footer-text-link)",
    "--footer-social-chip-hover-bg": "rgba(106,174,255,0.1)",
    "--footer-social-chip-hover-color": "var(--footer-text-link-hover)",
    "--footer-social-chip-shadow": "inset 0 0 0 1px rgba(255,255,255,0.06)",
    "--footer-social-chip-hover-shadow":
      "0 0 0 1px rgba(106,174,255,0.22), 0 0 18px rgba(106,174,255,0.18)",
    "--footer-bottom-glow":
      "radial-gradient(70% 70% at 50% 100%, rgba(76,134,235,0.16) 0%, rgba(76,134,235,0) 72%)",
  },
};

function getSocialIcon(name: string) {
  if (name === "Facebook") {
    return FacebookIcon;
  }

  if (name === "LinkedIn") {
    return LinkedInIcon;
  }

  return InstagramIcon;
}

function FooterHeading({ children }: { children: string }) {
  return (
    <p className="site-footer-heading text-[0.62rem] font-semibold uppercase tracking-[0.25em]">
      {children}
    </p>
  );
}

function FooterTextLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="site-footer-text-link inline-flex w-fit items-center justify-center py-[0.18rem] text-[0.98rem] leading-7 transition duration-200"
    >
      {label}
    </Link>
  );
}

function FooterContactRow({
  icon,
  label,
  href,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
}) {
  const content = (
    <span className="site-footer-text-link inline-flex min-w-0 items-center justify-center gap-2.5 text-[0.98rem] leading-7 transition duration-200">
      <span className="site-footer-contact-icon inline-flex h-[1.05rem] w-[1.05rem] flex-shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="min-w-0 truncate">{label}</span>
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <a
      href={href}
      className="site-footer-contact-link inline-flex w-fit justify-center transition duration-200"
    >
      {content}
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();
  const { language, theme } = useSitePreferences();
  const copy = uiCopy.footer[language];
  const hidesGlobalChrome =
    pathname?.startsWith("/pitch") ||
    pathname?.startsWith("/some-plan/view") ||
    pathname?.startsWith("/frilanseren");
  const footerThemeStyle = FOOTER_THEME_VARS[theme] as CSSProperties;
  const footerNavItems = footerNavOrder
    .map((href) => navItems.find((item) => item.href === href))
    .filter((item): item is (typeof navItems)[number] => Boolean(item));
  const primaryLinks = footerNavItems.slice(0, 3);
  const secondaryLinks = footerNavItems.slice(3);
  const secondaryHeading = language === "no" ? "Mer" : "More";
  const contactItems = [
    {
      label: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: <MailIcon className="h-[0.92rem] w-[0.92rem]" />,
    },
    {
      label: siteConfig.phonePrimary,
      href: siteConfig.phonePrimaryHref,
      icon: <PhoneIcon className="h-[0.92rem] w-[0.92rem]" />,
    },
    {
      label: siteConfig.locationLabel,
      icon: <PinIcon className="h-[0.92rem] w-[0.92rem]" />,
    },
  ];
  if (hidesGlobalChrome) {
    return null;
  }

  return (
    <footer id="site-footer" className="relative overflow-hidden text-[var(--footer-strong-copy)]">
      <div className="site-container py-5 sm:py-7 lg:py-9">
        <div
          className="site-footer-shell relative overflow-hidden rounded-[1.95rem] border px-5 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-9"
          data-footer-theme={theme}
          style={footerThemeStyle}
        >
          <FooterBackgroundGradient mode={theme} />

          <div className="relative z-[1] mx-auto flex max-w-[56rem] flex-col items-center gap-8 lg:gap-9">
            <div className="grid w-full gap-8 text-center sm:grid-cols-3 sm:gap-10 lg:gap-16">
              <div className="space-y-4">
                <FooterHeading>{copy.navigation}</FooterHeading>
                <nav className="grid justify-items-center gap-[0.08rem]" aria-label={copy.navigation}>
                  {primaryLinks.map((item) => (
                    <FooterTextLink
                      key={item.href}
                      href={item.href}
                      label={resolveLocalizedValue(item.label, language)}
                    />
                  ))}
                </nav>
              </div>

              <div className="space-y-4">
                <FooterHeading>{secondaryHeading}</FooterHeading>
                <div className="grid justify-items-center gap-[0.08rem]">
                  {secondaryLinks.map((item) => (
                    <FooterTextLink
                      key={item.href}
                      href={item.href}
                      label={resolveLocalizedValue(item.label, language)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <FooterHeading>{copy.contact}</FooterHeading>
                <div className="grid justify-items-center gap-[0.26rem]">
                  {contactItems.map((item) => (
                    <FooterContactRow
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      href={item.href}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center text-center">
              <div className="site-footer-conversion-row flex max-w-[52rem] flex-wrap items-center justify-center gap-x-2 gap-y-1.5 px-4 py-3 text-[0.96rem] leading-6 sm:text-[1rem]">
                <span className="site-footer-strong-copy font-semibold tracking-[-0.03em]">
                  {copy.title}
                </span>
                <span className="inline-flex h-[0.18rem] w-[0.18rem] rounded-full bg-[var(--footer-heading-copy)]" />
                <span className="site-footer-body-copy">
                  {copy.description}
                </span>
                <Link
                  href={siteConfig.bookingHref}
                  className="site-footer-link-copy inline-flex items-center font-bold tracking-[-0.02em] transition duration-200"
                >
                  {copy.conversionCta}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-[1] mt-8 sm:mt-9 lg:mt-10">
            <div className="site-footer-wordmark-stage relative h-[10.8rem] sm:h-[12rem] lg:h-[16.4rem]">
              <div
                aria-hidden="true"
                className="site-footer-rule absolute inset-x-0 top-[1.6rem] h-px"
              />

              <div className="absolute inset-x-0 top-[0.85rem] z-[2] flex items-center justify-between gap-4">
                <div className="site-footer-rail site-footer-rail--left flex items-center gap-3 pr-4 sm:gap-3.5">
                  {siteConfig.socialLinks.map((item) => {
                    const Icon = getSocialIcon(item.name);

                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={item.name}
                        className="site-footer-social-chip inline-flex h-8 w-8 items-center justify-center rounded-full transition duration-200"
                      >
                        <Icon className="h-[1.02rem] w-[1.02rem]" />
                      </a>
                    );
                  })}
                </div>

                <div className="site-footer-rail site-footer-rail--right site-footer-body-copy flex flex-wrap items-center justify-end gap-x-3 gap-y-1 pl-4 text-right text-[0.72rem] sm:gap-x-4">
                  <p>{siteConfig.locationLabel}</p>
                  <p>© {new Date().getFullYear()} {siteConfig.legalName}</p>
                  <p>Org.nr. {siteConfig.orgId}</p>
                </div>
              </div>

              <div
                className="absolute inset-x-0 bottom-[-0.5rem] top-[2.25rem] overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
                }}
              >
                <div className="mx-auto h-full w-[96%] max-w-[84rem]">
                  <TextHoverEffect
                    duration={0.35}
                    automatic={theme === "dark"}
                    mode={theme}
                    paths={FAU_LAND_LOGO_PATHS}
                    viewBox={FAU_LAND_LOGO_VIEW_BOX}
                    strokeWidth={1.42}
                    className="h-full w-full"
                  />
                </div>
              </div>

              <div
                className="site-footer-bottom-glow pointer-events-none absolute inset-x-[12%] bottom-[-8%] h-[64%] blur-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
