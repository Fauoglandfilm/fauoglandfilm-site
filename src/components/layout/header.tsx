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
  const menuDescription =
    language === "no"
      ? "Utforsk arbeid, tjenester og neste steg."
      : "Explore work, services and next steps.";
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

            <Button
              variant="icon"
              size="icon"
              className="relative z-[1] ml-auto shrink-0"
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
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              type="button"
              aria-label={copy.menuClose}
              className="absolute inset-0 h-full w-full bg-[rgba(4,7,12,0.58)] backdrop-blur-[18px]"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label={menuLabel}
              className="absolute inset-x-4 bottom-4 top-[calc(env(safe-area-inset-top,0px)+4.9rem)] overflow-hidden rounded-[2.1rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05)),radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_86%_20%,rgba(120,164,255,0.16),transparent_24%),rgba(10,15,24,0.76)] shadow-[0_42px_140px_rgba(0,0,0,0.42)] backdrop-blur-[40px] sm:inset-x-6 sm:bottom-6 sm:top-[calc(env(safe-area-inset-top,0px)+5.25rem)] lg:inset-x-8 lg:bottom-8 lg:top-[calc(env(safe-area-inset-top,0px)+5.75rem)]"
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, x: 48, scale: 0.985, filter: "blur(12px)" }
              }
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: 32, scale: 0.99, filter: "blur(8px)" }
              }
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-sheen absolute inset-0" />
              <div className="pointer-events-none absolute inset-y-[12%] right-[-8%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_70%)] blur-3xl opacity-80" />
              <div className="pointer-events-none absolute left-[-6%] top-[10%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(118,161,255,0.26),transparent_68%)] blur-3xl opacity-72" />
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.78),transparent)] opacity-70" />

              <div
                className="relative flex h-full flex-col overflow-y-auto p-5 sm:p-7 lg:p-9"
                style={{ paddingBottom: "max(1.5rem, calc(1rem + env(safe-area-inset-bottom, 0px)))" }}
              >
                <div className="max-w-lg">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/56">
                    {menuLabel}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/66 sm:text-base sm:leading-7">
                    {menuDescription}
                  </p>
                </div>

                <nav className="mt-8 flex flex-1 flex-col justify-center">
                  <div className="flex flex-col">
                    {navItems.map((item, index) => {
                      const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group flex items-center justify-between gap-5 border-b border-white/10 py-4 text-white/84 transition duration-300 hover:text-white sm:py-5",
                            active && "text-white",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <span className="font-display text-[2rem] leading-none tracking-[-0.06em] sm:text-[2.5rem] lg:text-[3.4rem]">
                            {resolveLocalizedValue(item.label, language)}
                          </span>
                          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/38 transition duration-300 group-hover:translate-x-1 group-hover:text-white/66">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                <div className="mt-8 flex flex-col gap-4 border-t border-white/12 pt-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
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
                        { value: "light", icon: <SunIcon className="h-3.5 w-3.5" />, label: "Light" },
                        { value: "dark", icon: <MoonIcon className="h-3.5 w-3.5" />, label: "Dark" },
                      ]}
                      onChange={setTheme}
                      compact
                      iconOnly
                    />
                  </div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/42">
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
