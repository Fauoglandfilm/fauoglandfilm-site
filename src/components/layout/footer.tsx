"use client";

import type { ReactNode } from "react";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/hover-footer";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/ui/icons";
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

function FooterSectionHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/58">
      {children}
    </p>
  );
}

function FooterContactCard({
  icon,
  label,
  value,
  href,
  isDark,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  isDark: boolean;
}) {
  const content = (
    <div
      className="group flex min-h-[4.35rem] items-start gap-3 rounded-[1.22rem] border px-3.5 py-3 transition duration-200 hover:-translate-y-0.5"
      style={{
        borderColor: isDark
          ? "color-mix(in srgb, var(--line-strong) 58%, rgba(255,255,255,0.08))"
          : "color-mix(in srgb, var(--line-strong) 36%, rgba(255,255,255,0.28))",
        background: isDark
          ? "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 88%), color-mix(in srgb, var(--surface) 30%, transparent)"
          : "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.07) 88%), color-mix(in srgb, var(--surface) 18%, transparent)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 30px rgba(0,0,0,0.22)"
          : "inset 0 1px 0 rgba(255,255,255,0.28), 0 14px 28px rgba(17,17,17,0.08)",
      }}
    >
      <span
        className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border"
        style={{
          borderColor: isDark
            ? "color-mix(in srgb, var(--line-strong) 56%, rgba(255,255,255,0.08))"
            : "color-mix(in srgb, var(--line-strong) 40%, rgba(255,255,255,0.24))",
          background: isDark
            ? "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.04))"
            : "linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0.08))",
          color: "color-mix(in srgb, var(--foreground) 88%, var(--accent) 12%)",
        }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--foreground)]/48">
          {label}
        </p>
        <p className="mt-1 text-[0.95rem] font-semibold leading-[1.38] tracking-[-0.025em] text-[color:var(--foreground)]/94">
          {value}
        </p>
      </div>
      {href ? (
        <ArrowUpRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--foreground)]/34 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--foreground)]/74" />
      ) : null}
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a
      href={href}
      className="block rounded-[1.22rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
    >
      {content}
    </a>
  );
}

function FooterNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-2 py-0.5 text-[0.95rem] font-medium leading-6 text-[color:var(--foreground)]/76 transition duration-200 hover:text-[color:var(--foreground)]"
    >
      <span>{label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </Link>
  );
}

function FooterSocialCard({
  href,
  label,
  icon,
  isDark,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  isDark: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex min-h-[3.05rem] items-center gap-3 rounded-[1.1rem] border px-3 py-2.5 text-[0.9rem] font-semibold leading-none text-[color:var(--foreground)]/84 transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
      style={{
        borderColor: isDark
          ? "color-mix(in srgb, var(--line-strong) 56%, rgba(255,255,255,0.08))"
          : "color-mix(in srgb, var(--line-strong) 34%, rgba(255,255,255,0.28))",
        background: isDark
          ? "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 88%), color-mix(in srgb, var(--surface) 28%, transparent)"
          : "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08) 88%), color-mix(in srgb, var(--surface) 16%, transparent)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 26px rgba(0,0,0,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.24), 0 12px 24px rgba(17,17,17,0.08)",
      }}
    >
      <span
        className="inline-flex h-[2.125rem] w-[2.125rem] flex-shrink-0 items-center justify-center rounded-full border transition duration-200 group-hover:text-[color:var(--foreground)]"
        style={{
          borderColor: isDark
            ? "color-mix(in srgb, var(--line-strong) 52%, rgba(255,255,255,0.08))"
            : "color-mix(in srgb, var(--line-strong) 38%, rgba(255,255,255,0.24))",
          background: isDark
            ? "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))"
            : "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08))",
          color: "color-mix(in srgb, var(--foreground) 76%, var(--muted) 24%)",
        }}
      >
        {icon}
      </span>
      <span>{label}</span>
      <ArrowUpRight className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-[color:var(--foreground)]/30 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--foreground)]/72" />
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();
  const { language, theme } = useSitePreferences();
  const copy = uiCopy.footer[language];
  const sectionCopy = uiCopy.siteSections[language];
  const isDark = theme === "dark";
  const hidesGlobalChrome = pathname?.startsWith("/pitch");
  const footerNavItems = footerNavOrder
    .map((href) => navItems.find((item) => item.href === href))
    .filter((item): item is (typeof navItems)[number] => Boolean(item));
  const contactItems = [
    {
      label: sectionCopy.contactMail,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: <Mail className="h-[1rem] w-[1rem]" />,
    },
    {
      label: sectionCopy.contactPhone,
      value: siteConfig.phonePrimary,
      href: siteConfig.phonePrimaryHref,
      icon: <Phone className="h-[1rem] w-[1rem]" />,
    },
    {
      label: sectionCopy.contactBase,
      value: siteConfig.locationLabel,
      icon: <MapPin className="h-[1rem] w-[1rem]" />,
    },
  ];

  if (hidesGlobalChrome) {
    return null;
  }

  return (
    <footer id="site-footer" className="relative overflow-hidden text-[color:var(--foreground)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[6%] top-8 h-28 w-28 rounded-full blur-3xl sm:h-40 sm:w-40"
          style={{ background: "color-mix(in srgb, var(--accent) 16%, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-[8%] h-36 w-36 rounded-full blur-3xl sm:h-48 sm:w-48"
          style={{ background: "color-mix(in srgb, var(--foreground) 8%, transparent)" }}
        />
      </div>

      <div className="site-container py-5 sm:py-7 lg:py-10">
        <div className="footer-glass-panel px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <FooterBackgroundGradient isDark={isDark} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]"
            style={{
              background: isDark
                ? "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,248,234,0.04) 56%, rgba(255,248,234,0.1) 100%)"
                : "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(239,225,198,0.16) 56%, rgba(239,225,198,0.24) 100%)",
            }}
          />

          <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.88fr)_minmax(0,0.82fr)_minmax(0,0.78fr)] lg:gap-6 xl:gap-8">
            <div className="flex flex-col gap-5 lg:pr-4">
              <div className="flex flex-col gap-2.5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/54">
                  {siteConfig.location.toUpperCase()} / {copy.productionCompany}
                </p>
                <Link href="/" aria-label="Fau&Land Film" className="inline-flex w-fit flex-col gap-2">
                  <BrandLogo
                    variant="full"
                    className={
                      isDark
                        ? "w-[10.4rem] brightness-[1.18] contrast-[1.06] saturate-[1.03] drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] sm:w-[12.2rem] lg:w-[13rem]"
                        : "w-[10.4rem] brightness-[0.18] contrast-[1.3] saturate-[1.02] sm:w-[12.2rem] lg:w-[13rem]"
                    }
                  />
                </Link>
              </div>

              <div className="max-w-[32rem] space-y-3">
                <p className="text-[clamp(1.55rem,2vw+1.08rem,2.7rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[color:var(--foreground)]/96">
                  {copy.title}
                </p>
                <p className="max-w-[29rem] text-[0.95rem] leading-6 text-[color:var(--foreground)]/70 sm:text-[0.98rem]">
                  {copy.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <FooterSectionHeading>{copy.contact}</FooterSectionHeading>
              <div className="grid gap-2.5">
                {contactItems.map((item) => (
                  <FooterContactCard
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    href={item.href}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <FooterSectionHeading>{copy.social}</FooterSectionHeading>
              <div className="grid gap-2.5">
                {siteConfig.socialLinks.map((item) => {
                  const Icon = getSocialIcon(item.name);

                  return (
                    <FooterSocialCard
                      key={item.name}
                      href={item.href}
                      label={item.name}
                      icon={<Icon className="h-[0.98rem] w-[0.98rem]" />}
                      isDark={isDark}
                    />
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <FooterSectionHeading>{copy.navigation}</FooterSectionHeading>
              <nav className="grid gap-1.5" aria-label={copy.navigation}>
                {footerNavItems.map((item) => (
                  <FooterNavLink
                    key={item.href}
                    href={item.href}
                    label={resolveLocalizedValue(item.label, language)}
                  />
                ))}
              </nav>
            </div>
          </div>

          <div className="relative z-[1] mt-8 border-t border-[color:var(--line)]/24 pt-5 sm:pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[37rem] text-[0.98rem] font-semibold leading-6 tracking-[-0.028em] text-[color:var(--foreground)]/92">
                {copy.conversionTitle}
              </p>
              <Link
                href={siteConfig.bookingHref}
                className="group inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border px-4 text-[0.88rem] font-semibold text-[rgba(255,248,234,0.96)] transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.14)"
                    : "color-mix(in srgb, var(--accent) 22%, rgba(17,17,17,0.1))",
                  background: "linear-gradient(180deg, rgba(45,44,42,0.98), rgba(22,21,20,0.98))",
                  boxShadow: isDark
                    ? "0 18px 34px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.12)"
                    : "0 18px 34px rgba(17,17,17,0.16), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] transition duration-200 group-hover:scale-110"
                />
                <span>{copy.conversionCta}</span>
                <ArrowUpRight className="h-4 w-4 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div
              className="relative mt-4 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="flex h-[3.75rem] items-end justify-center lg:hidden">
                <p className="select-none text-center text-[clamp(2.2rem,15vw,4.2rem)] font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)]/10">
                  Fau&amp;Land
                </p>
              </div>
              <div className="hidden h-[8.8rem] lg:block">
                <div className="absolute inset-x-[-8%] inset-y-0">
                  <TextHoverEffect
                    text="FAU&LAND"
                    isDark={isDark}
                    duration={0.18}
                    className="h-full w-full opacity-[0.92]"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-[1] mt-3 border-t border-[color:var(--line)]/28 pt-3 sm:pt-3.5">
              <div className="grid gap-1.5 text-center text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/50 sm:grid-cols-3 sm:text-left">
                <p>{siteConfig.locationLabel}</p>
                <p className="sm:text-center">© {new Date().getFullYear()} {siteConfig.legalName}</p>
                <p className="sm:text-right">Org.nr. {siteConfig.orgId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
