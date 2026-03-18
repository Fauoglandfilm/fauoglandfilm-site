"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const copy = uiCopy.header[language];
  const overlayMode = pathname === "/" && !scrolled && !open;
  const menuLabel = language === "no" ? "Meny" : "Menu";
  const menuFooterCopy =
    language === "no"
      ? "Oslo / Reklamefilm / Produksjon"
      : "Oslo / Commercial film / Production";

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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        className="fixed inset-x-0 top-0 z-50 transition duration-300"
      >
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "relative mt-1.5 flex items-center gap-2 overflow-hidden rounded-[1.2rem] px-2.5 py-2 transition duration-300 sm:mt-2.5 sm:gap-3 sm:px-4 sm:py-3 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-7 lg:rounded-[1.5rem] lg:px-5 lg:py-3",
              overlayMode
                ? "border border-[color:var(--header-overlay-border)] bg-[color:var(--header-overlay-surface)] text-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-[26px]"
                : "border border-[color:var(--line)] bg-[color:var(--header-surface)] text-[color:var(--foreground)] shadow-[0_26px_82px_rgba(18,14,10,0.12)] backdrop-blur-[30px]",
            )}
          >
            <Link
              href="/"
              className={cn(
                "relative z-[1] flex shrink-0 items-center gap-2.5 rounded-[1rem] border px-1 py-1 transition duration-300 sm:gap-3.5 lg:gap-4.5",
                overlayMode
                  ? "border-white/10 bg-white/[0.03] shadow-[0_14px_36px_rgba(0,0,0,0.14)]"
                  : "border-[color:var(--line)]/55 bg-white shadow-[0_10px_26px_rgba(18,14,10,0.06)]",
              )}
              aria-label="Fau&Land Film"
              onClick={() => setOpen(false)}
            >
              <div
                className={cn(
                  "header-brand-shell flex h-[3.05rem] w-[3.05rem] items-center justify-center rounded-full p-[0.7rem] sm:h-[3.35rem] sm:w-[3.35rem] sm:p-[0.78rem] lg:h-[4.15rem] lg:w-[4.15rem] lg:p-[0.98rem]",
                  overlayMode ? "shadow-[0_18px_40px_rgba(0,0,0,0.18)]" : "shadow-[0_12px_28px_rgba(18,14,10,0.08)]",
                )}
              >
                <BrandLogo
                  variant="mark"
                  className={cn(
                    "relative z-[1] h-auto w-full opacity-100 saturate-[1.95]",
                    overlayMode ? "brightness-[2.42] contrast-[1.38]" : "brightness-[1.92] contrast-[1.26]",
                  )}
                  priority
                />
              </div>
              <div className="min-w-0">
                <p
                  className={cn(
                    "font-display text-[1rem] font-semibold tracking-[-0.05em] sm:text-[1.2rem] lg:text-[1.46rem]",
                    overlayMode ? "text-white drop-shadow-[0_12px_24px_rgba(0,0,0,0.26)]" : "text-[color:var(--foreground)]",
                  )}
                >
                  Fau&amp;Land Film
                </p>
                <p
                  className={cn(
                    "mt-0.5 hidden text-[0.66rem] font-semibold uppercase tracking-[0.22em] lg:block",
                    overlayMode ? "text-white/92" : "text-[color:var(--foreground)]/74",
                  )}
                >
                  Oslo / Production
                </p>
              </div>
            </Link>

            <nav className="relative z-[1] hidden lg:flex lg:min-w-0 lg:items-center lg:justify-center lg:gap-1.5" aria-label={menuLabel}>
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex items-center rounded-full border border-transparent px-3 py-[0.5rem] text-[0.95rem] font-medium tracking-[-0.02em] transition duration-300",
                        overlayMode
                          ? "text-white/88 hover:bg-[color:var(--header-nav-hover-bg)] hover:text-white"
                          : "text-[color:var(--foreground)]/72 hover:bg-[color:var(--header-nav-hover-bg)] hover:text-[color:var(--foreground)]",
                      active &&
                        (overlayMode
                          ? "bg-[color:var(--header-nav-active-bg)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                          : "bg-[color:var(--header-nav-active-bg)] text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(18,14,10,0.08)]"),
                    )}
                  >
                    {resolveLocalizedValue(item.label, language)}
                  </Link>
                );
              })}
            </nav>

            <div className="relative z-[1] ml-auto flex items-center gap-2.5 lg:ml-0">
              <div className="hidden items-center gap-2 lg:flex">
                <div className="scale-[0.95] origin-right">
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
                </div>
                <div className="scale-[0.95] origin-right">
                  <SegmentedToggle
                    ariaLabel={copy.themeLabel}
                    value={theme}
                    options={[
                      { value: "light", label: language === "no" ? "Dag" : "Day", icon: <SunIcon /> },
                      { value: "dark", label: language === "no" ? "Natt" : "Night", icon: <MoonIcon /> },
                    ]}
                    onChange={setTheme}
                    compact
                  />
                </div>
              </div>

              <div className="flex items-center lg:hidden">
                <Button
                  variant="icon"
                  size="icon"
                  className="relative z-[1] h-11 w-11 shrink-0 rounded-full border border-white/10 bg-white/6 text-white shadow-none"
                  aria-label={open ? copy.menuClose : copy.menuOpen}
                  aria-controls="site-menu"
                  aria-expanded={open}
                  onClick={() => setOpen((value) => !value)}
                >
                  <span className="relative h-4 w-4">
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center"
                      initial={false}
                      animate={
                        shouldReduceMotion
                          ? { opacity: open ? 0 : 1 }
                          : { opacity: open ? 0 : 1, rotate: open ? -24 : 0, scale: open ? 0.78 : 1 }
                      }
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <MenuIcon className="h-4 w-4" />
                    </motion.span>
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center"
                      initial={false}
                      animate={
                        shouldReduceMotion
                          ? { opacity: open ? 1 : 0 }
                          : { opacity: open ? 1 : 0, rotate: open ? 0 : 24, scale: open ? 1 : 0.78 }
                      }
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <CloseIcon className="h-4 w-4" />
                    </motion.span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-[#111111] text-white lg:hidden"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label={menuLabel}
              className="mobile-menu-surface absolute inset-0"
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative flex h-full flex-col overflow-y-auto px-5 pb-6 pt-[calc(env(safe-area-inset-top,0px)+1rem)] sm:px-6"
                style={{ paddingBottom: "max(1.5rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)))" }}
              >
                <div className="flex items-start justify-between gap-4 pb-5">
                  <Link
                    href="/"
                    className="flex items-center gap-3"
                    aria-label="Fau&Land Film"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/8 p-2.5">
                      <BrandLogo
                        variant="mark"
                        className="brightness-[2.26] contrast-[1.34] saturate-[1.8]"
                        priority
                      />
                    </div>
                    <div>
                      <p className="font-display text-[1.15rem] tracking-[-0.05em] text-white">
                        Fau&amp;Land Film
                      </p>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/56">
                        {menuFooterCopy}
                      </p>
                    </div>
                  </Link>

                  <Button
                    variant="icon"
                    size="icon"
                    className="h-11 w-11 rounded-full border border-white/12 bg-white/8 text-white shadow-none"
                    aria-label={copy.menuClose}
                    onClick={() => setOpen(false)}
                  >
                    <CloseIcon className="h-4 w-4" />
                  </Button>
                </div>

                <nav className="flex flex-1 flex-col justify-center" aria-label={menuLabel}>
                  <div className="flex flex-col">
                    {navItems.map((item) => {
                      const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group border-b border-white/10 py-4 text-white/84 transition duration-300 hover:text-white",
                            active && "text-white",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <span className="font-display text-[1.8rem] leading-none tracking-[-0.05em] sm:text-[2.05rem]">
                            {resolveLocalizedValue(item.label, language)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                <div className="mt-8 border-t border-white/12 pt-5">
                  <div className="flex flex-wrap items-center gap-3">
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
                        { value: "light", label: language === "no" ? "Dag" : "Day", icon: <SunIcon /> },
                        { value: "dark", label: language === "no" ? "Natt" : "Night", icon: <MoonIcon /> },
                      ]}
                      onChange={setTheme}
                      compact
                    />
                  </div>
                  <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                    {menuFooterCopy}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
