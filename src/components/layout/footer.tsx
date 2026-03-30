"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/icons";
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/hover-footer";
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

function FooterHeading({ children }: { children: string }) {
  return (
    <p className="text-[0.63rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/48">
      {children}
    </p>
  );
}

function FooterTextLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "inline-flex w-fit items-center py-1 text-[0.94rem] leading-6 text-[color:var(--foreground)]/76 transition duration-200 hover:text-[color:var(--foreground)]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
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
    <span className="inline-flex min-w-0 items-center gap-2.5 text-[0.94rem] leading-6 text-[color:var(--foreground)]/76 transition duration-200">
      <span className="inline-flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center text-[color:var(--foreground)]/42">
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
      className="inline-flex w-fit transition duration-200 hover:text-[color:var(--foreground)]"
    >
      {content}
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();
  const { language, theme } = useSitePreferences();
  const copy = uiCopy.footer[language];
  const isDark = theme === "dark";
  const hidesGlobalChrome = pathname?.startsWith("/pitch");
  const footerNavItems = footerNavOrder
    .map((href) => navItems.find((item) => item.href === href))
    .filter((item): item is (typeof navItems)[number] => Boolean(item));
  const secondaryLinksHeading = language === "no" ? "Mer" : "More";
  const firstLinkColumn = footerNavItems.slice(0, 3);
  const secondLinkColumn = footerNavItems.slice(3);
  const contactItems = [
    {
      label: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: <MailIcon className="h-[0.95rem] w-[0.95rem]" />,
    },
    {
      label: siteConfig.phonePrimary,
      href: siteConfig.phonePrimaryHref,
      icon: <PhoneIcon className="h-[0.95rem] w-[0.95rem]" />,
    },
    {
      label: siteConfig.locationLabel,
      icon: <PinIcon className="h-[0.95rem] w-[0.95rem]" />,
    },
  ];

  if (hidesGlobalChrome) {
    return null;
  }

  return (
    <footer id="site-footer" className="relative overflow-hidden text-[color:var(--foreground)]">
      <div className="site-container py-5 sm:py-7 lg:py-9">
        <div
          className="relative overflow-hidden rounded-[1.9rem] border px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
          style={{
            borderColor: isDark
              ? "rgba(255,255,255,0.09)"
              : "color-mix(in srgb, var(--line-strong) 26%, rgba(255,255,255,0.28))",
            background: isDark
              ? "linear-gradient(180deg, rgba(9,10,12,0.98), rgba(12,13,16,0.98))"
              : "linear-gradient(180deg, rgba(244,245,247,0.94), rgba(236,239,243,0.94))",
            boxShadow: isDark
              ? "0 28px 64px rgba(0,0,0,0.44), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 24px 48px rgba(17,17,17,0.08), inset 0 1px 0 rgba(255,255,255,0.28)",
          }}
        >
          <FooterBackgroundGradient isDark={isDark} />

          <div className="relative z-[1] grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.72fr)_minmax(0,0.72fr)_minmax(0,0.95fr)] lg:gap-8">
            <div className="max-w-[21rem] space-y-4">
              <Link href="/" aria-label="Fau&Land Film" className="inline-flex w-fit">
                <BrandLogo
                  variant="full"
                  className={
                    isDark
                      ? "w-[10.2rem] brightness-[1.18] contrast-[1.06] saturate-[1.01] sm:w-[11.8rem] lg:w-[12.4rem]"
                      : "w-[10.2rem] brightness-[0.14] contrast-[1.32] saturate-[1] sm:w-[11.8rem] lg:w-[12.4rem]"
                  }
                />
              </Link>
              <div className="space-y-2.5">
                <p className="text-[clamp(1.35rem,1.45vw+1.03rem,2.15rem)] font-semibold leading-[1.02] tracking-[-0.048em] text-[color:var(--foreground)]/96">
                  {copy.title}
                </p>
                <p className="max-w-[19rem] text-[0.92rem] leading-6 text-[color:var(--foreground)]/60">
                  {copy.description}
                </p>
              </div>
              <Link
                href={siteConfig.bookingHref}
                className="inline-flex min-h-[2.7rem] items-center rounded-full border px-3.6 text-[0.86rem] font-semibold transition duration-200 hover:-translate-y-0.5"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.14)"
                    : "color-mix(in srgb, var(--foreground) 18%, rgba(255,255,255,0.14))",
                  background: isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(20,24,30,0.04)",
                  color: "color-mix(in srgb, var(--foreground) 92%, white 8%)",
                }}
              >
                {copy.conversionCta}
              </Link>
            </div>

            <div className="space-y-3">
              <FooterHeading>{copy.navigation}</FooterHeading>
              <nav className="grid gap-0.5" aria-label={copy.navigation}>
                {firstLinkColumn.map((item) => (
                  <FooterTextLink
                    key={item.href}
                    href={item.href}
                    label={resolveLocalizedValue(item.label, language)}
                  />
                ))}
              </nav>
            </div>

            <div className="space-y-3">
              <FooterHeading>{secondaryLinksHeading}</FooterHeading>
              <div className="grid gap-0.5">
                {secondLinkColumn.map((item) => (
                  <FooterTextLink
                    key={item.href}
                    href={item.href}
                    label={resolveLocalizedValue(item.label, language)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <FooterHeading>{copy.contact}</FooterHeading>
              <div className="grid gap-2.5">
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

          <div className="relative z-[1] mt-9 border-t pt-4 sm:pt-5" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(25,32,44,0.1)" }}>
            <div
              className="relative overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            >
              <div className="flex h-[3.35rem] items-end justify-center lg:hidden">
                <p
                  aria-hidden="true"
                  className="select-none text-center text-[clamp(2.3rem,16vw,4.2rem)] font-semibold uppercase tracking-[0.16em]"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: isDark ? "1px rgba(96,143,221,0.18)" : "1px rgba(84,112,158,0.18)",
                  }}
                >
                  Fau&amp;Land
                </p>
              </div>

              <div className="hidden h-[8.1rem] lg:block">
                <div className="absolute inset-x-[-8%] inset-y-0">
                  <TextHoverEffect
                    text="FAU&LAND"
                    isDark={isDark}
                    variant="footer-outline"
                    duration={0.16}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>

            <div
              className="relative z-[1] mt-2.5 flex flex-col gap-3 text-[0.72rem] text-[color:var(--foreground)]/52 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3.5">
                {siteConfig.socialLinks.map((item) => {
                  const Icon = getSocialIcon(item.name);

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.name}
                      className="inline-flex h-4.5 w-4.5 items-center justify-center text-[color:var(--foreground)]/42 transition duration-200 hover:text-[color:var(--foreground)]/78"
                    >
                      <Icon className="h-[0.95rem] w-[0.95rem]" />
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-col gap-1.5 text-left sm:flex-row sm:items-center sm:gap-5 sm:text-right">
                <p>{siteConfig.locationLabel}</p>
                <p>© {new Date().getFullYear()} {siteConfig.legalName}</p>
                <p>Org.nr. {siteConfig.orgId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
