"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "@/components/ui/icons";
import { navItems } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SegmentedToggleOption<T extends string> = {
  label?: string;
  value: T;
  icon?: ReactNode;
};

type SegmentedToggleProps<T extends string> = {
  ariaLabel: string;
  value: T;
  options: SegmentedToggleOption<T>[];
  onChange: (value: T) => void;
  overlayMode: boolean;
  compact?: boolean;
  iconOnly?: boolean;
};

function SegmentedToggle<T extends string>({
  ariaLabel,
  value,
  options,
  onChange,
  overlayMode,
  compact = false,
  iconOnly = false,
}: SegmentedToggleProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border backdrop-blur-xl",
        overlayMode
          ? "border-white/10 bg-white/[0.06]"
          : "border-black/[0.06] bg-black/[0.03]",
        compact ? "p-0.5" : "p-0.5",
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-full transition",
              compact ? "min-h-7 min-w-7 px-2" : "min-h-8 min-w-8 px-2.5",
              iconOnly ? "gap-0" : "gap-1",
              active
                ? overlayMode
                  ? "bg-white/14 text-white"
                  : "bg-black/[0.08] text-[color:var(--foreground)]"
                : overlayMode
                  ? "text-white/58 hover:text-white/84"
                  : "text-[var(--muted)] hover:text-[color:var(--foreground)]",
            )}
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            aria-label={option.label ?? option.value}
          >
            {option.icon ? <span className="flex h-3.5 w-3.5 items-center justify-center">{option.icon}</span> : null}
            {!iconOnly && option.label ? (
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em]">
                {option.label}
              </span>
            ) : null}
          </button>
        );
      })}
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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
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
            "mt-2.5 flex items-center gap-3 rounded-[1.25rem] px-3 py-2 transition duration-300 sm:px-3.5",
            overlayMode
              ? "border border-white/8 bg-[color:var(--header-overlay-surface)] text-white backdrop-blur-xl"
              : "border border-black/[0.05] bg-[color:var(--header-surface)] text-[color:var(--foreground)] shadow-[0_10px_28px_rgba(14,14,14,0.06)] backdrop-blur-xl",
          )}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Fau&Land Film"
            onClick={() => setOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] p-2 shadow-[0_10px_20px_rgba(0,0,0,0.16)]">
              <BrandLogo variant="mark" className="opacity-100" priority />
            </div>
            <p
              className={cn(
                "font-display text-[0.96rem] tracking-[-0.05em] sm:text-[1rem]",
                overlayMode ? "text-white" : "text-[color:var(--foreground)]",
              )}
            >
              Fau&amp;Land Film
            </p>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-7">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[0.82rem] font-semibold tracking-[0.01em] transition",
                    overlayMode
                      ? active
                        ? "text-white"
                        : "text-white/68 hover:text-white"
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

          <div className="ml-auto hidden items-center gap-1.5 lg:flex">
            <SegmentedToggle
              ariaLabel={copy.languageLabel}
              value={language}
              options={[
                { label: "NO", value: "no" },
                { label: "EN", value: "en" },
              ]}
              onChange={setLanguage}
              overlayMode={overlayMode}
            />
            <SegmentedToggle
              ariaLabel={copy.themeLabel}
              value={theme}
              options={[
                { value: "light", icon: <SunIcon className="h-3.5 w-3.5" />, label: "Light" },
                { value: "dark", icon: <MoonIcon className="h-3.5 w-3.5" />, label: "Dark" },
              ]}
              onChange={setTheme}
              overlayMode={overlayMode}
              iconOnly
            />
          </div>

          <button
            type="button"
            className={cn(
              "ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full transition lg:hidden",
              overlayMode
                ? "border border-white/10 bg-white/[0.08] text-white"
                : "border border-black/[0.06] bg-black/[0.03] text-[color:var(--foreground)]",
            )}
            aria-label={open ? copy.menuClose : copy.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:hidden">
          <div className="mt-2.5 rounded-[1.6rem] border border-black/[0.06] bg-[color:var(--surface-strong)] p-3.5 shadow-[0_20px_60px_rgba(14,14,14,0.1)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-2">
              <SegmentedToggle
                ariaLabel={copy.languageLabel}
                value={language}
                options={[
                  { label: "NO", value: "no" },
                  { label: "EN", value: "en" },
                ]}
                onChange={setLanguage}
                overlayMode={false}
                compact
              />
              <SegmentedToggle
                ariaLabel={copy.themeLabel}
                value={theme}
                options={[
                  { value: "light", icon: <SunIcon className="h-3.5 w-3.5" />, label: "Light" },
                  { value: "dark", icon: <MoonIcon className="h-3.5 w-3.5" />, label: "Dark" },
                ]}
                onChange={setTheme}
                overlayMode={false}
                compact
                iconOnly
              />
            </div>

            <nav
              className="mt-3 flex max-h-[calc(100svh-11rem)] flex-col gap-1 overflow-y-auto"
              style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" }}
            >
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-[0.95rem] px-3.5 py-3 text-[0.98rem] font-medium transition",
                      active
                        ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
                        : "text-[color:var(--foreground)]/76 hover:bg-black/[0.035] hover:text-[color:var(--foreground)]",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {resolveLocalizedValue(item.label, language)}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
