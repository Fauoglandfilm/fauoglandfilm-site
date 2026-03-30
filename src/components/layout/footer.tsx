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
    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/40">
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
      className="inline-flex w-fit items-center py-1 text-[0.94rem] leading-6 text-[color:var(--foreground)]/75 transition duration-200 hover:text-[color:var(--foreground)]"
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
    <span className="inline-flex min-w-0 items-center gap-2.5 text-[0.94rem] leading-6 text-[color:var(--foreground)]/75 transition duration-200">
      <span className="inline-flex h-[1.125rem] w-[1.125rem] flex-shrink-0 items-center justify-center text-[color:var(--foreground)]/42">
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
  const primaryLinks = footerNavItems.slice(0, 3);
  const secondaryLinks = footerNavItems.slice(3);
  const secondaryHeading = language === "no" ? "Mer" : "More";
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
          className="relative overflow-hidden rounded-[1.95rem] border px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
          style={{
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "color-mix(in srgb, var(--line-strong) 24%, rgba(255,255,255,0.3))",
            background: isDark
              ? "linear-gradient(180deg, rgba(10,11,13,0.985), rgba(13,14,17,0.985))"
              : "linear-gradient(180deg, rgba(244,245,248,0.95), rgba(236,239,244,0.95))",
            boxShadow: isDark
              ? "0 30px 70px rgba(0,0,0,0.46), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 22px 46px rgba(17,17,17,0.08), inset 0 1px 0 rgba(255,255,255,0.26)",
          }}
        >
          <FooterBackgroundGradient isDark={isDark} />

          <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.82fr)_minmax(0,0.82fr)_minmax(0,0.82fr)] lg:items-start lg:gap-6">
            <div className="flex min-h-[6.15rem] items-start pt-0.5 pb-1">
              <Link href="/" aria-label="Fau&Land Film" className="inline-flex w-fit lg:-ml-0.5">
                <BrandLogo
                  variant="full"
                  className={
                    isDark
                      ? "w-[12.8rem] brightness-[1.18] contrast-[1.1] saturate-[1.02] sm:w-[14.8rem] lg:w-[16.8rem] [transform:scaleY(0.93)] [transform-origin:left_top]"
                      : "w-[12.8rem] brightness-[0.14] contrast-[1.36] saturate-[1] sm:w-[14.8rem] lg:w-[16.8rem] [transform:scaleY(0.93)] [transform-origin:left_top]"
                  }
                />
              </Link>
            </div>

            <div className="w-full max-w-[11rem] space-y-3.5 pt-0.5 lg:justify-self-center">
              <FooterHeading>{copy.navigation}</FooterHeading>
              <nav className="grid gap-[0.12rem]" aria-label={copy.navigation}>
                {primaryLinks.map((item) => (
                  <FooterTextLink
                    key={item.href}
                    href={item.href}
                    label={resolveLocalizedValue(item.label, language)}
                  />
                ))}
              </nav>
            </div>

            <div className="w-full max-w-[11rem] space-y-3.5 pt-0.5 lg:justify-self-center">
              <FooterHeading>{secondaryHeading}</FooterHeading>
              <div className="grid gap-[0.12rem]">
                {secondaryLinks.map((item) => (
                  <FooterTextLink
                    key={item.href}
                    href={item.href}
                    label={resolveLocalizedValue(item.label, language)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full max-w-[11rem] space-y-3.5 pt-0.5 lg:justify-self-center">
              <FooterHeading>{copy.contact}</FooterHeading>
              <div className="grid gap-1.5">
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

          <div
            className="relative z-[1] mt-8 border-t pt-4 sm:pt-4"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(25,32,44,0.12)" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-center lg:justify-between lg:text-left">
              <div className="flex max-w-[58rem] flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[0.94rem] leading-6 lg:justify-start">
                <span className="font-semibold tracking-[-0.03em] text-[color:var(--foreground)]/94">
                  {copy.title}
                </span>
                <span className="hidden h-[0.18rem] w-[0.18rem] rounded-full bg-[color:var(--foreground)]/16 sm:inline-flex" />
                <span className="text-[color:var(--foreground)]/46">
                  {copy.description}
                </span>
                <Link
                  href={siteConfig.bookingHref}
                  className="inline-flex items-center font-bold text-[color:var(--foreground)]/92 transition duration-200 hover:text-[color:var(--foreground)]"
                >
                  {copy.conversionCta}
                </Link>
              </div>
            </div>

            <div
              className="relative mt-4 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            >
              <div className="flex h-[3.15rem] items-end justify-center lg:hidden">
                <p
                  aria-hidden="true"
                  className="select-none text-center text-[clamp(1.95rem,14vw,3.4rem)] font-semibold uppercase tracking-[0.16em] blur-[1.2px] opacity-40"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: isDark ? "1px rgba(96,143,221,0.08)" : "1px rgba(84,112,158,0.08)",
                  }}
                >
                  Fau&amp;Land
                </p>
              </div>

              <div className="hidden h-[6.6rem] lg:block">
                <div className="absolute inset-x-[11%] inset-y-0 opacity-[0.12] blur-[2.4px]">
                  <TextHoverEffect
                    text="FAU&LAND"
                    isDark={isDark}
                    variant="footer-outline"
                    duration={0.16}
                    className="h-full w-full scale-[0.78]"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-[1] mt-1.5 flex flex-col gap-2 text-[0.72rem] text-[color:var(--foreground)]/42 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="flex items-baseline gap-2.5">
                {siteConfig.socialLinks.map((item) => {
                  const Icon = getSocialIcon(item.name);

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.name}
                      className="inline-flex h-3.5 w-3.5 items-center justify-center text-[color:var(--foreground)]/36 transition duration-200 hover:text-[color:var(--foreground)]/62"
                    >
                      <Icon className="h-[0.88rem] w-[0.88rem]" />
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-col gap-1 text-left sm:flex-row sm:items-baseline sm:gap-3.5 sm:text-right">
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
