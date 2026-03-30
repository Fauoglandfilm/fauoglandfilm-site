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
    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/54">
      {children}
    </p>
  );
}

function FooterActionRow({
  label,
  href,
  icon,
  isDark,
  external = false,
}: {
  label: string;
  href?: string;
  icon?: ReactNode;
  isDark: boolean;
  external?: boolean;
}) {
  const content = (
    <div
      className="group flex min-h-[2.95rem] items-center gap-2.5 rounded-[1rem] border px-3.5 py-2.5 text-[0.9rem] font-medium leading-none text-[color:var(--foreground)]/78 transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--foreground)]"
      style={{
        borderColor: isDark
          ? "color-mix(in srgb, var(--line-strong) 44%, rgba(255,255,255,0.08))"
          : "color-mix(in srgb, var(--line-strong) 28%, rgba(255,255,255,0.26))",
        background: isDark
          ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 88%), color-mix(in srgb, var(--surface) 24%, transparent)"
          : "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06) 88%), color-mix(in srgb, var(--surface) 14%, transparent)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 22px rgba(0,0,0,0.16)"
          : "inset 0 1px 0 rgba(255,255,255,0.24), 0 10px 20px rgba(17,17,17,0.06)",
      }}
    >
      {icon ? (
        <span className="inline-flex h-4 w-4 flex-shrink-0 items-center justify-center text-[color:var(--foreground)]/52 transition duration-200 group-hover:text-[color:var(--foreground)]/72">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {href ? (
        <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-[color:var(--foreground)]/28 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--foreground)]/64" />
      ) : null}
    </div>
  );

  if (!href) {
    return content;
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="block rounded-[1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
      >
        {content}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="block rounded-[1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
    >
      {content}
    </a>
  );
}

function FooterNavLink({
  href,
  label,
  isDark,
}: {
  href: string;
  label: string;
  isDark: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[2.95rem] items-center justify-between gap-3 rounded-[1rem] border px-3.5 py-2.5 text-[0.9rem] font-medium leading-none text-[color:var(--foreground)]/78 transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
      style={{
        borderColor: isDark
          ? "color-mix(in srgb, var(--line-strong) 44%, rgba(255,255,255,0.08))"
          : "color-mix(in srgb, var(--line-strong) 28%, rgba(255,255,255,0.26))",
        background: isDark
          ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 88%), color-mix(in srgb, var(--surface) 24%, transparent)"
          : "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06) 88%), color-mix(in srgb, var(--surface) 14%, transparent)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 22px rgba(0,0,0,0.16)"
          : "inset 0 1px 0 rgba(255,255,255,0.24), 0 10px 20px rgba(17,17,17,0.06)",
      }}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-[color:var(--foreground)]/28 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--foreground)]/64" />
    </Link>
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
  const contactItems = [
    {
      label: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: <Mail className="h-[0.95rem] w-[0.95rem]" />,
    },
    {
      label: siteConfig.phonePrimary,
      href: siteConfig.phonePrimaryHref,
      icon: <Phone className="h-[0.95rem] w-[0.95rem]" />,
    },
    {
      label: siteConfig.locationLabel,
      icon: <MapPin className="h-[0.95rem] w-[0.95rem]" />,
    },
  ];

  if (hidesGlobalChrome) {
    return null;
  }

  return (
    <footer id="site-footer" className="relative overflow-hidden text-[color:var(--foreground)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[7%] top-8 h-28 w-28 rounded-full blur-3xl sm:h-40 sm:w-40"
          style={{ background: "color-mix(in srgb, var(--accent) 14%, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-[9%] h-36 w-36 rounded-full blur-3xl sm:h-48 sm:w-48"
          style={{ background: "color-mix(in srgb, var(--foreground) 7%, transparent)" }}
        />
      </div>

      <div className="site-container py-5 sm:py-7 lg:py-9">
        <div className="footer-glass-panel px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <FooterBackgroundGradient isDark={isDark} />

          <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)_minmax(0,0.82fr)] lg:gap-8">
            <div className="flex max-w-[30rem] flex-col gap-4">
              <Link href="/" aria-label="Fau&Land Film" className="inline-flex w-fit">
                <BrandLogo
                  variant="full"
                  className={
                    isDark
                      ? "w-[10.4rem] brightness-[1.16] contrast-[1.05] saturate-[1.03] drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] sm:w-[12rem] lg:w-[12.7rem]"
                      : "w-[10.4rem] brightness-[0.18] contrast-[1.28] saturate-[1.02] sm:w-[12rem] lg:w-[12.7rem]"
                  }
                />
              </Link>
              <div className="space-y-2.5">
                <p className="text-[clamp(1.45rem,1.7vw+1.05rem,2.4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-[color:var(--foreground)]/96">
                  {copy.title}
                </p>
                <p className="max-w-[24rem] text-[0.94rem] leading-6 text-[color:var(--foreground)]/66">
                  {copy.description}
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <FooterSectionHeading>{copy.contact}</FooterSectionHeading>
                <div className="grid gap-2.5">
                  {contactItems.map((item) => (
                    <FooterActionRow
                      key={item.label}
                      label={item.label}
                      href={item.href}
                      icon={item.icon}
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
                      <FooterActionRow
                        key={item.name}
                        label={item.name}
                        href={item.href}
                        icon={<Icon className="h-[0.95rem] w-[0.95rem]" />}
                        isDark={isDark}
                        external
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <FooterSectionHeading>{copy.navigation}</FooterSectionHeading>
              <div className="grid gap-2.5">
                {footerNavItems.map((item) => (
                  <FooterNavLink
                    key={item.href}
                    href={item.href}
                    label={resolveLocalizedValue(item.label, language)}
                    isDark={isDark}
                  />
                ))}
                <Link
                  href={siteConfig.bookingHref}
                  className="group inline-flex min-h-[2.95rem] items-center justify-center gap-2 rounded-[1rem] border px-3.5 py-2.5 text-[0.88rem] font-semibold text-[rgba(255,248,234,0.96)] transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
                  style={{
                    borderColor: isDark
                      ? "rgba(255,255,255,0.14)"
                      : "color-mix(in srgb, var(--accent) 22%, rgba(17,17,17,0.1))",
                    background: "linear-gradient(180deg, rgba(45,44,42,0.98), rgba(22,21,20,0.98))",
                    boxShadow: isDark
                      ? "0 16px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)"
                      : "0 16px 30px rgba(17,17,17,0.14), inset 0 1px 0 rgba(255,255,255,0.08)",
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
            </div>
          </div>

          <div className="relative z-[1] mt-7 border-t border-[color:var(--line)]/22 pt-4 sm:pt-5">
            <div
              className="relative overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            >
              <div className="flex h-[3.2rem] items-end justify-center lg:hidden">
                <p
                  aria-hidden="true"
                  className="select-none text-center text-[clamp(2.05rem,15vw,4rem)] font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)]/10"
                >
                  Fau&amp;Land
                </p>
              </div>
              <div className="hidden h-[7.2rem] lg:block">
                <div className="absolute inset-x-[-8%] inset-y-0">
                  <TextHoverEffect
                    text="FAU&LAND"
                    isDark={isDark}
                    duration={0.18}
                    className="h-full w-full opacity-[0.88]"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-[1] mt-2.5 border-t border-[color:var(--line)]/24 pt-3 sm:pt-3.5">
              <div className="grid gap-1.5 text-center text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/48 sm:grid-cols-3 sm:text-left">
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
