"use client";

import { type ReactNode, useId } from "react";

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
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";
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
    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/42">
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
      className="inline-flex w-fit items-center py-1 text-[0.95rem] leading-6 text-[color:var(--foreground)]/78 transition duration-200 hover:text-[color:var(--foreground)]"
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
    <span className="inline-flex min-w-0 items-center gap-2.5 text-[0.95rem] leading-6 text-[color:var(--foreground)]/78 transition duration-200">
      <span className="inline-flex h-[1.125rem] w-[1.125rem] flex-shrink-0 items-center justify-center text-[color:var(--foreground)]/44">
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

function FooterNeonBrandWordmark({ isDark }: { isDark: boolean }) {
  const filterId = useId();

  return (
    <svg
      viewBox="0 0 5000 1225"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-8%" y="-24%" width="116%" height="150%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="2.2" result="dilated" />
          <feComposite in="dilated" in2="SourceAlpha" operator="xor" result="outline" />
          <feFlood floodColor={isDark ? "#77b0ff" : "#5f7faa"} floodOpacity={isDark ? "0.96" : "0.48"} result="outlineColor" />
          <feComposite in="outlineColor" in2="outline" operator="in" result="outlineStroke" />
          <feGaussianBlur in="outlineStroke" stdDeviation="3.4" result="glowBlur" />
          <feFlood floodColor={isDark ? "#8ec2ff" : "#6d8fc0"} floodOpacity={isDark ? "0.36" : "0.18"} result="glowColor" />
          <feComposite in="glowColor" in2="glowBlur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="outlineStroke" />
          </feMerge>
        </filter>
      </defs>
      <image
        href="/media/logos/brand/brand-logo-full.webp"
        x="0"
        y="0"
        width="5000"
        height="1225"
        preserveAspectRatio="xMidYMid meet"
        filter={`url(#${filterId})`}
      />
    </svg>
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
  const railSurface = isDark ? "rgba(11,12,15,0.94)" : "rgba(240,242,246,0.94)";

  if (hidesGlobalChrome) {
    return null;
  }

  return (
    <footer id="site-footer" className="relative overflow-hidden text-[color:var(--foreground)]">
      <div className="site-container py-5 sm:py-7 lg:py-9">
        <div
          className="relative overflow-hidden rounded-[1.95rem] border px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8"
          style={{
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "color-mix(in srgb, var(--line-strong) 24%, rgba(255,255,255,0.3))",
            background: isDark
              ? "linear-gradient(180deg, rgba(8,9,11,0.995), rgba(11,12,15,0.995) 54%, rgba(13,18,25,0.998))"
              : "linear-gradient(180deg, rgba(244,245,248,0.95), rgba(236,239,244,0.95))",
            boxShadow: isDark
              ? "0 36px 86px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 22px 46px rgba(17,17,17,0.08), inset 0 1px 0 rgba(255,255,255,0.26)",
          }}
        >
          <FooterBackgroundGradient isDark={isDark} />

          <div className="relative z-[1] mx-auto grid max-w-[57rem] gap-8 lg:grid-cols-3 lg:items-start lg:gap-16">
            <div className="w-full max-w-[11rem] space-y-3.5 lg:justify-self-center">
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

            <div className="w-full max-w-[11rem] space-y-3.5 lg:justify-self-center">
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

            <div className="w-full max-w-[12.5rem] space-y-3.5 lg:justify-self-center">
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
            className="relative z-[1] mt-9 border-t pt-4"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(25,32,44,0.12)" }}
          >
            <div className="flex justify-center text-center lg:text-left">
              <div className="flex max-w-[57rem] flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[0.95rem] leading-6">
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

            <div className="relative mt-5 h-[10.25rem] overflow-hidden sm:h-[11rem] lg:h-[13.2rem]">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[1.9rem] h-px"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, rgba(109,160,255,0) 0%, rgba(109,160,255,0.28) 12%, rgba(109,160,255,0.28) 88%, rgba(109,160,255,0) 100%)"
                    : "linear-gradient(90deg, rgba(84,112,158,0) 0%, rgba(84,112,158,0.18) 12%, rgba(84,112,158,0.18) 88%, rgba(84,112,158,0) 100%)",
                }}
              />

              <div
                className="absolute left-0 top-[1rem] z-[2] flex items-center gap-3 pr-3 sm:gap-3.5"
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
                className="absolute right-0 top-[0.84rem] z-[2] flex flex-wrap items-center justify-end gap-x-3 gap-y-1 pl-3 text-right text-[0.72rem] text-[color:var(--foreground)]/48 sm:gap-x-4"
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
                    "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)",
                }}
              >
                <div className="flex h-[5.4rem] items-end justify-center lg:hidden">
                  <div className="w-[88vw] max-w-[33rem]">
                    <FooterNeonBrandWordmark isDark={isDark} />
                  </div>
                </div>

                <div className="hidden h-[10.6rem] lg:block">
                  <div className="absolute inset-x-[6%] bottom-[-0.45rem] top-[0.55rem] opacity-[0.88]">
                    <FooterNeonBrandWordmark isDark={isDark} />
                  </div>
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-x-[10%] bottom-[-8%] h-[68%] blur-3xl"
                style={{
                  background: isDark
                    ? "radial-gradient(70% 70% at 50% 100%, rgba(76,134,235,0.18) 0%, rgba(76,134,235,0) 72%)"
                    : "radial-gradient(70% 70% at 50% 100%, rgba(84,112,158,0.08) 0%, rgba(84,112,158,0) 72%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
