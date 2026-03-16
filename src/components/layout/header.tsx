"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import {
  segmentedControlOptionClassName,
  segmentedControlShellClassName,
} from "@/components/ui/button-styles";
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
  compact?: boolean;
  iconOnly?: boolean;
};

function SegmentedToggle<T extends string>({
  ariaLabel,
  value,
  options,
  onChange,
  compact = false,
  iconOnly = false,
}: SegmentedToggleProps<T>) {
  return (
    <div className={segmentedControlShellClassName({ className: compact ? "text-[0.76rem]" : undefined })} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            className={segmentedControlOptionClassName({ active, compact, iconOnly })}
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
            "relative mt-2 flex items-center gap-2.5 overflow-hidden rounded-[1.55rem] px-3 py-2.5 transition duration-300 sm:mt-2.5 sm:gap-3 sm:px-4 sm:py-3",
            overlayMode
              ? "border border-white/18 bg-[color:var(--header-overlay-surface)] text-white shadow-[0_30px_92px_rgba(0,0,0,0.24)] backdrop-blur-[32px]"
              : "border border-[color:var(--line)] bg-[color:var(--header-surface)] text-[color:var(--foreground)] shadow-[0_32px_96px_rgba(7,10,18,0.16)] backdrop-blur-[32px]",
          )}
        >
          <div className="glass-sheen absolute inset-0" />
          <div className="pointer-events-none absolute inset-y-0 right-[12%] w-[26%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_72%)] blur-2xl opacity-80" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.78),transparent)] opacity-60" />

          <Link
            href="/"
            className="relative z-[1] flex shrink-0 items-center gap-2.5"
            aria-label="Fau&Land Film"
            onClick={() => setOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/18 bg-white/[0.14] p-2 shadow-[0_18px_34px_rgba(0,0,0,0.16)] backdrop-blur-2xl sm:h-9 sm:w-9">
              <BrandLogo variant="mark" className="opacity-100" priority />
            </div>
            <p
              className={cn(
                "font-display text-[0.92rem] tracking-[-0.05em] sm:text-[0.98rem]",
                overlayMode ? "text-white" : "text-[color:var(--foreground)]",
              )}
            >
              Fau&amp;Land Film
            </p>
          </Link>

          <nav className="relative z-[1] hidden flex-1 items-center justify-center gap-1.5 lg:flex xl:gap-2">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-[0.82rem] font-semibold tracking-[0.01em] transition backdrop-blur-xl",
                    overlayMode
                      ? active
                        ? "border border-white/16 bg-white/[0.16] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                        : "border border-transparent text-white/76 hover:border-white/10 hover:bg-white/[0.08] hover:text-white"
                      : active
                        ? "border border-[color:var(--line)] bg-white/[0.18] text-[color:var(--foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]"
                        : "border border-transparent text-[var(--muted)] hover:border-[color:var(--line)] hover:bg-white/[0.12] hover:text-[color:var(--foreground)]",
                  )}
                >
                  {resolveLocalizedValue(item.label, language)}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-[1] ml-auto hidden items-center gap-1.5 lg:flex">
            <SegmentedToggle
              ariaLabel={copy.languageLabel}
              value={language}
              options={[
                { label: "NO", value: "no" },
                { label: "EN", value: "en" },
              ]}
              onChange={setLanguage}
            />
            <SegmentedToggle
              ariaLabel={copy.themeLabel}
              value={theme}
              options={[
                { value: "light", icon: <SunIcon className="h-3.5 w-3.5" />, label: "Light" },
                { value: "dark", icon: <MoonIcon className="h-3.5 w-3.5" />, label: "Dark" },
              ]}
              onChange={setTheme}
              iconOnly
            />
          </div>

          <Button
            variant="icon"
            size="icon"
            className="relative z-[1] ml-auto lg:hidden"
            aria-label={open ? copy.menuClose : copy.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:hidden">
          <div className="glass-panel relative mt-2 overflow-hidden rounded-[1.7rem] p-3 shadow-[0_34px_100px_rgba(0,0,0,0.24)]">
            <div className="glass-sheen absolute inset-0" />
            <div className="flex items-center justify-between gap-2">
              <SegmentedToggle
                ariaLabel={copy.languageLabel}
                value={language}
                options={[
                  { label: "NO", value: "no" },
                  { label: "EN", value: "en" },
                ]}
                onChange={setLanguage}
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
                compact
                iconOnly
              />
            </div>

            <nav
              className="relative z-[1] mt-3 flex max-h-[calc(100svh-10rem)] flex-col gap-1.5 overflow-y-auto"
              style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" }}
            >
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-[1rem] border px-3.5 py-3 text-[0.96rem] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                      active
                        ? "border-white/12 bg-white/[0.14] text-[color:var(--foreground)] shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
                        : "border-transparent bg-transparent text-[color:var(--foreground)] hover:border-[color:var(--line)] hover:bg-white/[0.06] hover:text-[color:var(--foreground)]",
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
