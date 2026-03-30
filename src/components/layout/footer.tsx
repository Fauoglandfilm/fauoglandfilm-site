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
  const railSurface = isDark ? "rgba(11,12,15,0.92)" : "rgba(240,242,246,0.92)";

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
              ? "linear-gradient(180deg, rgba(8,9,11,0.99), rgba(11,12,15,0.99) 58%, rgba(14,18,24,0.995))"
              : "linear-gradient(180deg, rgba(244,245,248,0.95), rgba(236,239,244,0.95))",
            boxShadow: isDark
              ? "0 34px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)"
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

            <div className="relative mt-5 h-[9.6rem] overflow-hidden sm:h-[10.5rem] lg:h-[12rem]">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[1.95rem] h-px"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, rgba(109,160,255,0) 0%, rgba(109,160,255,0.3) 12%, rgba(109,160,255,0.3) 88%, rgba(109,160,255,0) 100%)"
                    : "linear-gradient(90deg, rgba(84,112,158,0) 0%, rgba(84,112,158,0.18) 12%, rgba(84,112,158,0.18) 88%, rgba(84,112,158,0) 100%)",
                }}
              />

              <div
                className="absolute left-0 top-[1.02rem] z-[2] flex items-center gap-3 pr-3 sm:gap-3.5"
                style={{ background: `linear-gradient(90deg, ${railSurface} 0%, ${railSurface} 86%, transparent 100%)` }}
              >
                {siteConfig.socialLinks.map((item) => {
                  const Icon = getSocialIcon(item.name);

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.name}
                      className="inline-flex h-4 w-4 items-center justify-center text-[color:var(--foreground)]/48 transition duration-200 hover:text-[color:var(--foreground)]/78"
                    >
                      <Icon className="h-[0.95rem] w-[0.95rem]" />
                    </a>
                  );
                })}
              </div>

              <div
                className="absolute right-0 top-[0.86rem] z-[2] flex flex-wrap items-center justify-end gap-x-3 gap-y-1 pl-3 text-right text-[0.72rem] text-[color:var(--foreground)]/48 sm:gap-x-4"
                style={{ background: `linear-gradient(270deg, ${railSurface} 0%, ${railSurface} 86%, transparent 100%)` }}
              >
                <p>{siteConfig.locationLabel}</p>
                <p>© {new Date().getFullYear()} {siteConfig.legalName}</p>
                <p>Org.nr. {siteConfig.orgId}</p>
              </div>

              <div
                className="absolute inset-x-0 bottom-0 overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
                }}
              >
                <div className="flex h-[5.1rem] items-end justify-center lg:hidden">
                  <p
                    aria-hidden="true"
                    className="select-none text-center text-[clamp(2.5rem,17vw,4.5rem)] font-semibold uppercase tracking-[0.16em]"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: isDark ? "1px rgba(103,159,255,0.34)" : "1px rgba(84,112,158,0.16)",
                      textShadow: isDark ? "0 0 14px rgba(103,159,255,0.12)" : "none",
                    }}
                  >
                    Fau&amp;Land
                  </p>
                </div>

                <div className="hidden h-[9.6rem] lg:block">
                  <div className="absolute inset-x-[-1%] bottom-[-0.35rem] top-[0.8rem] opacity-[0.72]">
                    <TextHoverEffect
                      text="FAU&LAND"
                      isDark={isDark}
                      variant="footer-outline"
                      duration={0.16}
                      className="h-full w-full scale-[1.14]"
                    />
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-[10%] bottom-0 h-[62%] blur-3xl" style={{
                background: isDark
                  ? "radial-gradient(70% 70% at 50% 100%, rgba(64,120,220,0.12) 0%, rgba(64,120,220,0) 72%)"
                  : "radial-gradient(70% 70% at 50% 100%, rgba(84,112,158,0.08) 0%, rgba(84,112,158,0) 72%)",
              }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
