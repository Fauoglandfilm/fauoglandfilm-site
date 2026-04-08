"use client";

import type { ReactNode } from "react";

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
    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--foreground)]/42">
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
      className="inline-flex w-fit items-center justify-center py-[0.18rem] text-[0.98rem] leading-7 text-[color:var(--foreground)]/78 transition duration-200 hover:text-[color:var(--foreground)]"
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
    <span className="inline-flex min-w-0 items-center justify-center gap-2.5 text-[0.98rem] leading-7 text-[color:var(--foreground)]/78 transition duration-200">
      <span className="inline-flex h-[1.05rem] w-[1.05rem] flex-shrink-0 items-center justify-center text-[color:var(--foreground)]/42">
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
      className="inline-flex w-fit justify-center transition duration-200 hover:text-[color:var(--foreground)]"
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
  const railSurface = isDark ? "rgba(11,12,15,0.94)" : "rgba(243,245,249,0.94)";
  const shellBorder = isDark
    ? "rgba(255,255,255,0.08)"
    : "color-mix(in srgb, var(--line-strong) 54%, rgba(255,255,255,0.72))";
  const shellBackground = isDark
    ? "linear-gradient(180deg, rgba(7,8,10,0.996), rgba(10,11,14,0.996) 54%, rgba(11,15,22,0.998))"
    : "linear-gradient(180deg, rgba(245,246,249,0.985), rgba(234,238,244,0.975) 52%, rgba(228,233,240,0.97))";
  const shellShadow = isDark
    ? "0 36px 92px rgba(0,0,0,0.56), inset 0 1px 0 rgba(255,255,255,0.04)"
    : "0 22px 50px rgba(17,17,17,0.08), inset 0 1px 0 rgba(255,255,255,0.54)";
  const bodyCopy = isDark ? "text-[color:var(--foreground)]/48" : "text-[color:var(--foreground)]/64";
  const strongCopy = isDark ? "text-[color:var(--foreground)]/94" : "text-[color:var(--foreground)]/96";
  const linkCopy = isDark ? "text-[color:var(--foreground)]/92" : "text-[color:var(--foreground)]";

  if (hidesGlobalChrome) {
    return null;
  }

  return (
    <footer id="site-footer" className="relative overflow-hidden text-[color:var(--foreground)]">
      <div className="site-container py-5 sm:py-7 lg:py-9">
        <div
          className="relative overflow-hidden rounded-[1.95rem] border px-5 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-9"
          style={{
            borderColor: shellBorder,
            background: shellBackground,
            boxShadow: shellShadow,
            transition: "border-color 400ms ease, background 400ms ease, box-shadow 400ms ease",
          }}
        >
          <FooterBackgroundGradient isDark={isDark} />

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

            <div className="flex justify-center text-center">
              <div className="flex max-w-[52rem] flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[0.96rem] leading-6 sm:text-[1rem]">
                <span className={`font-semibold tracking-[-0.03em] ${strongCopy}`}>
                  {copy.title}
                </span>
                <span className="inline-flex h-[0.18rem] w-[0.18rem] rounded-full bg-[color:var(--foreground)]/18" />
                <span className={bodyCopy}>
                  {copy.description}
                </span>
                <Link
                  href={siteConfig.bookingHref}
                  className={`inline-flex items-center font-bold tracking-[-0.02em] ${linkCopy} transition duration-200 hover:text-[color:var(--foreground)]`}
                >
                  {copy.conversionCta}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-[1] mt-8 sm:mt-9 lg:mt-10">
            <div className="relative h-[10.8rem] sm:h-[12rem] lg:h-[16.4rem]">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[1.6rem] h-px"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, rgba(110,170,255,0) 0%, rgba(110,170,255,0.32) 10%, rgba(110,170,255,0.32) 90%, rgba(110,170,255,0) 100%)"
                    : "linear-gradient(90deg, rgba(89,124,190,0) 0%, rgba(89,124,190,0.3) 10%, rgba(89,124,190,0.3) 90%, rgba(89,124,190,0) 100%)",
                  transition: "background 400ms ease",
                }}
              />

              <div className="absolute inset-x-0 top-[0.85rem] z-[2] flex items-center justify-between gap-4">
                <div
                  className="flex items-center gap-3 pr-4 sm:gap-3.5"
                  style={{
                    background: `linear-gradient(90deg, ${railSurface} 0%, ${railSurface} 84%, transparent 100%)`,
                  }}
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
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition duration-200 hover:scale-[1.05] hover:bg-[#6aaeff1a] hover:shadow-[0_0_0_1px_rgba(106,174,255,0.22),0_0_18px_rgba(106,174,255,0.18)] ${
                          isDark
                            ? "text-[rgba(255,255,255,0.82)] hover:text-white"
                            : "text-[rgba(17,17,17,0.86)] hover:text-[#3f77d6]"
                        }`}
                        style={{
                          background: isDark ? "rgba(255,255,255,0.045)" : "rgba(17,17,17,0.07)",
                          boxShadow: isDark
                            ? "inset 0 0 0 1px rgba(255,255,255,0.06)"
                            : "inset 0 0 0 1px rgba(17,17,17,0.1)",
                        }}
                      >
                        <Icon className="h-[1.02rem] w-[1.02rem]" />
                      </a>
                    );
                  })}
                </div>

                <div
                  className={`flex flex-wrap items-center justify-end gap-x-3 gap-y-1 pl-4 text-right text-[0.72rem] sm:gap-x-4 ${bodyCopy}`}
                  style={{
                    background: `linear-gradient(270deg, ${railSurface} 0%, ${railSurface} 84%, transparent 100%)`,
                  }}
                >
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
                    automatic
                    isDark={isDark}
                    paths={FAU_LAND_LOGO_PATHS}
                    viewBox={FAU_LAND_LOGO_VIEW_BOX}
                    strokeWidth={1.42}
                    className="h-full w-full"
                  />
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-x-[12%] bottom-[-8%] h-[64%] blur-3xl"
                style={{
                  background: isDark
                    ? "radial-gradient(70% 70% at 50% 100%, rgba(76,134,235,0.16) 0%, rgba(76,134,235,0) 72%)"
                    : "radial-gradient(70% 70% at 50% 100%, rgba(84,112,158,0.035) 0%, rgba(84,112,158,0) 68%)",
                  transition: "background 400ms ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
