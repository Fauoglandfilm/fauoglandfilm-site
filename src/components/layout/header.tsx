"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  useSitePreferences,
} from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { navItems, siteConfig } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SegmentedToggleProps<T extends string> = {
  label: string;
  value: T;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T) => void;
  overlayMode: boolean;
};

function SegmentedToggle<T extends string>({
  label,
  value,
  options,
  onChange,
  overlayMode,
}: SegmentedToggleProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "hidden text-[0.62rem] font-semibold uppercase tracking-[0.2em] xl:inline",
          overlayMode ? "text-white/58" : "text-[var(--muted)]",
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "inline-flex rounded-full border p-1 backdrop-blur-xl",
          overlayMode
            ? "border-white/14 bg-white/8"
            : "border-[color:var(--line)] bg-[color:var(--surface)]",
        )}
        role="group"
        aria-label={label}
      >
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              className={cn(
                "min-h-9 rounded-full px-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] transition sm:px-3.5",
                active
                  ? overlayMode
                    ? "bg-white text-[#111111]"
                    : "bg-[color:var(--foreground)] text-[color:var(--background)]"
                  : overlayMode
                    ? "text-white/68 hover:text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]",
              )}
              onClick={() => onChange(option.value)}
              aria-pressed={active}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const copy = uiCopy.header[language];
  const overlayMode = pathname === "/" && !scrolled && !open;
  const bookingLabel = resolveLocalizedValue(siteConfig.bookingLabel, language);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    if (open) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  return (
    <header
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      className="fixed inset-x-0 top-0 z-50 transition duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mt-3 flex items-center justify-between gap-3 rounded-full px-3.5 py-3 transition duration-300 sm:px-4",
            overlayMode
              ? "border border-[color:var(--header-overlay-border)] bg-[color:var(--header-overlay-surface)] text-white backdrop-blur-xl"
              : "border border-[color:var(--line)] bg-[color:var(--header-surface)] text-[color:var(--foreground)] shadow-[0_12px_40px_rgba(14,14,14,0.08)] backdrop-blur-xl",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Fau&Land Film"
            onClick={() => setOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
              <BrandLogo variant="mark" className="opacity-100" priority />
            </div>
            <div className="hidden sm:block">
              <p
                className={cn(
                  "font-display text-[1rem] tracking-[-0.05em]",
                  overlayMode ? "text-white" : "text-[color:var(--foreground)]",
                )}
              >
                Fau&amp;Land Film
              </p>
              <p
                className={cn(
                  "text-[0.72rem] uppercase tracking-[0.22em]",
                  overlayMode ? "text-white/62" : "text-[var(--muted)]",
                )}
              >
                {copy.productionCompany}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[0.82rem] font-semibold transition",
                    overlayMode
                      ? active
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : active
                        ? "text-[color:var(--foreground)]"
                        : "text-[var(--muted)] hover:text-[color:var(--foreground)]",
                  )}
                >
                  {resolveLocalizedValue(item.label, language)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <SegmentedToggle
              label={copy.languageLabel}
              value={language}
              options={[
                { label: "NO", value: "no" },
                { label: "EN", value: "en" },
              ]}
              onChange={setLanguage}
              overlayMode={overlayMode}
            />
            <SegmentedToggle
              label={copy.themeLabel}
              value={theme}
              options={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
              ]}
              onChange={setTheme}
              overlayMode={overlayMode}
            />
            <ButtonLink
              href={siteConfig.bookingHref}
              className={cn(
                overlayMode && "border-white/20 bg-white text-[#111111] hover:bg-white/92",
              )}
            >
              {bookingLabel}
            </ButtonLink>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden",
              overlayMode
                ? "border border-white/16 bg-white/8 text-white"
                : "border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--foreground)]",
            )}
            aria-label={open ? copy.menuClose : copy.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:hidden">
          <div className="mt-3 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4 shadow-[0_24px_70px_rgba(14,14,14,0.12)] backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <SegmentedToggle
                  label={copy.languageLabel}
                  value={language}
                  options={[
                    { label: "NO", value: "no" },
                    { label: "EN", value: "en" },
                  ]}
                  onChange={setLanguage}
                  overlayMode={false}
                />
                <SegmentedToggle
                  label={copy.themeLabel}
                  value={theme}
                  options={[
                    { label: "Light", value: "light" },
                    { label: "Dark", value: "dark" },
                  ]}
                  onChange={setTheme}
                  overlayMode={false}
                />
              </div>

              <nav
                className="flex max-h-[calc(100svh-13rem)] flex-col gap-1 overflow-y-auto"
                style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
              >
                {navItems.map((item) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-[1.1rem] px-4 py-3.5 text-base font-medium transition",
                        active
                          ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
                          : "text-[color:var(--foreground)]/72 hover:bg-black/[0.04] hover:text-[color:var(--foreground)]",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {resolveLocalizedValue(item.label, language)}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mt-4 border-t border-[color:var(--line)] pt-4">
              <ButtonLink href={siteConfig.bookingHref} fullWidth onClick={() => setOpen(false)}>
                {bookingLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
