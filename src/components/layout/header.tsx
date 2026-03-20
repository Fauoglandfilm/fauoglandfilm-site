"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import {
  segmentedControlOptionClassName,
  segmentedControlShellClassName,
} from "@/components/ui/button-styles";
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "@/components/ui/icons";
import { caseStudies, navItems, serviceAreas, teamMembers } from "@/data/site-content";
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
  shellClassName?: string;
};

type SearchEntry = {
  href: string;
  title: string;
  category: string;
  description: string;
  keywords: string[];
};

function SegmentedToggle<T extends string>({
  ariaLabel,
  value,
  options,
  onChange,
  compact = false,
  iconOnly = false,
  shellClassName,
}: SegmentedToggleProps<T>) {
  return (
    <div className={segmentedControlShellClassName({ className: cn(compact ? "text-[0.76rem]" : undefined, shellClassName) })} role="group" aria-label={ariaLabel}>
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

function HeaderBrandLockup({
  overlayMode,
  subtitle,
  mobile = false,
}: {
  overlayMode: boolean;
  subtitle: string;
  mobile?: boolean;
}) {
  const logoClassName = cn(
    mobile ? "relative top-px w-full" : "relative top-[2px] w-full",
    overlayMode
      ? "brightness-[1.9] contrast-[1.14] saturate-[1.12] drop-shadow-[0_10px_18px_rgba(0,0,0,0.2)]"
      : "brightness-[0.16] contrast-[1.28]",
  );

  if (mobile) {
    return (
      <div className="flex w-[9.15rem] max-w-full shrink-0 items-center justify-start">
        <BrandLogo
          variant="full"
          className={logoClassName}
          priority
        />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col items-center justify-center">
      <div className="flex w-[10.1rem] max-w-full shrink-0 justify-center lg:w-[11.45rem]">
        <BrandLogo
          variant="full"
          className={logoClassName}
          priority
        />
      </div>
      <p
        className={cn(
          "mt-[0.32rem] hidden w-full text-center text-[0.56rem] font-semibold uppercase leading-none tracking-[0.2em] md:block lg:text-[0.62rem]",
          overlayMode ? "text-white/76" : "text-[color:var(--foreground)]/58",
        )}
      >
        {subtitle}
      </p>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const copy = uiCopy.header[language];
  const overlayMode = pathname === "/" && !scrolled && !open;
  const darkOverlayMode = overlayMode && theme === "dark";
  const menuLabel = language === "no" ? "Meny" : "Menu";
  const menuFooterCopy =
    language === "no"
      ? "Oslo / Reklamefilm / Produksjon"
      : "Oslo / Commercial film / Production";
  const searchEntries = useMemo<SearchEntry[]>(
    () => [
      ...serviceAreas.map((service) => ({
        href: service.exampleHref ?? service.href,
        title: resolveLocalizedValue(service.title, language),
        category: language === "no" ? "Tjeneste" : "Service",
        description: resolveLocalizedValue(service.summary, language),
        keywords: [
          service.slug,
          resolveLocalizedValue(service.eyebrow, language),
          resolveLocalizedValue(service.value, language),
        ],
      })),
      ...caseStudies.map((entry) => ({
        href: `/case/${entry.slug}`,
        title: resolveLocalizedValue(entry.title, language),
        category: language === "no" ? "Case" : "Case study",
        description: resolveLocalizedValue(entry.summary, language),
        keywords: [
          entry.client,
          entry.slug,
          resolveLocalizedValue(entry.category, language),
          resolveLocalizedValue(entry.industry, language),
          ...entry.tags.map((tag) => resolveLocalizedValue(tag, language)),
        ],
      })),
      ...teamMembers
        .filter((member) => member.href)
        .map((member) => ({
          href: member.href!,
          title: member.name,
          category: language === "no" ? "Profil" : "Profile",
          description: resolveLocalizedValue(member.summary, language),
          keywords: [
            member.name,
            resolveLocalizedValue(member.role, language),
          ],
        })),
    ],
    [language],
  );
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase(language === "no" ? "nb-NO" : "en-US");
  const searchResults = useMemo(() => {
    if (!normalizedSearchQuery) {
      return searchEntries.slice(0, 8);
    }

    return searchEntries
      .map((entry) => {
        const haystack = [entry.title, entry.category, entry.description, ...entry.keywords]
          .join(" ")
          .toLocaleLowerCase(language === "no" ? "nb-NO" : "en-US");

        const score =
          (entry.title.toLocaleLowerCase(language === "no" ? "nb-NO" : "en-US").includes(normalizedSearchQuery) ? 4 : 0) +
          (entry.category.toLocaleLowerCase(language === "no" ? "nb-NO" : "en-US").includes(normalizedSearchQuery) ? 2 : 0) +
          (entry.description.toLocaleLowerCase(language === "no" ? "nb-NO" : "en-US").includes(normalizedSearchQuery) ? 1 : 0) +
          (entry.keywords.some((keyword) =>
            keyword.toLocaleLowerCase(language === "no" ? "nb-NO" : "en-US").includes(normalizedSearchQuery),
          )
            ? 3
            : 0) +
          (haystack.includes(normalizedSearchQuery) ? 1 : 0);

        return { entry, score };
      })
      .filter(({ score }) => score > 0)
      .sort((left, right) => right.score - left.score || left.entry.title.localeCompare(right.entry.title))
      .slice(0, 8)
      .map(({ entry }) => entry);
  }, [language, normalizedSearchQuery, searchEntries]);

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
  }, [open, searchOpen]);

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

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    }, 30);

    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchQuery("");
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  const openSearch = () => {
    setOpen(false);
    setSearchQuery("");
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchQuery("");
    setSearchOpen(false);
  };

  return (
    <>
      <header
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        className="fixed inset-x-0 top-0 z-50 transition duration-300"
      >
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "relative mt-2 flex items-center justify-between gap-2.5 overflow-hidden rounded-[1.45rem] px-3 py-2 transition duration-300 sm:mt-3 sm:gap-4 sm:px-4 sm:py-3 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-5 lg:rounded-[1.9rem] lg:px-5 lg:py-3.5",
              darkOverlayMode
                ? "border border-white/12 bg-[rgba(14,14,15,0.42)] text-white shadow-[0_24px_64px_rgba(0,0,0,0.26)] backdrop-blur-[18px]"
                : overlayMode
                ? "border border-white/18 bg-white/10 text-white shadow-[0_24px_64px_rgba(0,0,0,0.12)] backdrop-blur-[18px]"
                : "border border-[color:var(--line)]/80 bg-[color:var(--header-surface)]/82 text-[color:var(--foreground)] shadow-[0_22px_56px_rgba(18,14,10,0.08)] backdrop-blur-[20px]",
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0",
                darkOverlayMode
                  ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
                  : "bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.06))]",
              )}
            />
            <Link
              href="/"
              className={cn(
                "relative z-[1] flex min-w-0 shrink-0 items-center rounded-[1.3rem] px-1 py-0.5 transition duration-300 lg:max-w-none",
                overlayMode
                  ? "text-white"
                  : "text-[color:var(--foreground)]",
              )}
              aria-label="Fau&Land Film"
              onClick={() => setOpen(false)}
            >
              <div className="sm:hidden">
                <HeaderBrandLockup overlayMode={overlayMode} subtitle={menuFooterCopy} mobile />
              </div>

              <div className="hidden min-w-0 sm:block">
                <HeaderBrandLockup overlayMode={overlayMode} subtitle={menuFooterCopy} />
              </div>
            </Link>

            <nav
              className="relative z-[1] hidden lg:flex lg:min-w-0 lg:items-center lg:justify-center"
              aria-label={menuLabel}
            >
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex items-center rounded-full border border-transparent px-3.5 py-[0.65rem] text-[0.92rem] font-medium tracking-[-0.02em] transition duration-300",
                        overlayMode
                          ? "text-white/84 hover:bg-white/10 hover:text-white"
                          : "text-[color:var(--foreground)]/72 hover:bg-[color:var(--header-nav-hover-bg)] hover:text-[color:var(--foreground)]",
                      active &&
                        (overlayMode
                          ? "border-white/12 bg-white/14 text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                          : "bg-[color:var(--header-nav-active-bg)] text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(18,14,10,0.06)]"),
                    )}
                  >
                    {resolveLocalizedValue(item.label, language)}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={openSearch}
                className={cn(
                  "ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border transition duration-300",
                  darkOverlayMode
                    ? "border-white/14 bg-black/76 text-white hover:bg-black"
                    : overlayMode
                    ? "border-white/16 bg-black/72 text-white hover:bg-black/88"
                    : "border-[color:var(--line)] bg-black text-white hover:bg-black/88",
                )}
                aria-label={copy.searchOpen}
              >
                <SearchIcon className="h-4.5 w-4.5" />
              </button>
            </nav>

            <div className="relative z-[1] ml-auto flex items-center gap-2 lg:ml-0">
              <div className="hidden items-center gap-2 lg:flex">
                <div className="origin-right scale-[0.98]">
                  <SegmentedToggle
                    ariaLabel={copy.languageLabel}
                    value={language}
                    options={[
                      { label: "NO", value: "no" },
                      { label: "EN", value: "en" },
                    ]}
                    onChange={setLanguage}
                    compact
                    shellClassName="header-segmented-shell"
                  />
                </div>
                <div className="origin-right scale-[0.98]">
                  <SegmentedToggle
                    ariaLabel={copy.themeLabel}
                    value={theme}
                    options={[
                      { value: "light", label: language === "no" ? "Dag" : "Day", icon: <SunIcon /> },
                        { value: "dark", label: language === "no" ? "Natt" : "Night", icon: <MoonIcon /> },
                    ]}
                    onChange={setTheme}
                    compact
                    shellClassName="header-segmented-shell"
                  />
                </div>
              </div>

              <div className="flex items-center lg:hidden">
                <Button
                  variant="icon"
                  size="icon"
                  className={cn(
                    "relative z-[1] mr-2 h-11 w-11 shrink-0 rounded-full shadow-none",
                    darkOverlayMode
                      ? "border border-white/12 bg-black/76 text-white"
                      : overlayMode
                      ? "border border-white/14 bg-black/76 text-white"
                      : "border border-[color:var(--line)] bg-black text-white",
                  )}
                  aria-label={copy.searchOpen}
                  onClick={openSearch}
                >
                  <SearchIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="icon"
                  size="icon"
                  className={cn(
                    "relative z-[1] h-11 w-11 shrink-0 rounded-full shadow-none",
                    darkOverlayMode
                      ? "border border-white/12 bg-black/20 text-white"
                      : overlayMode
                      ? "border border-white/14 bg-white/10 text-white"
                      : "border border-[color:var(--line)] bg-[color:var(--surface)]/88 text-[color:var(--foreground)]",
                  )}
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
        {searchOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] bg-[rgba(6,7,10,0.36)] backdrop-blur-md"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeSearch}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={copy.searchLabel}
              className="site-container flex min-h-screen items-start justify-center px-4 pt-[max(6.5rem,calc(env(safe-area-inset-top,0px)+5.25rem))] sm:px-6 lg:pt-[8.5rem]"
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 16, scale: 0.985 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 10, scale: 0.99 }
              }
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative w-full max-w-[56rem] overflow-hidden rounded-[2rem] border border-white/14 bg-[rgba(16,18,22,0.76)] text-white shadow-[0_34px_80px_rgba(0,0,0,0.34)] backdrop-blur-[26px]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))]" />
                <div className="relative border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/72 text-white">
                      <SearchIcon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <input
                        ref={searchInputRef}
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder={copy.searchPlaceholder}
                        className="w-full bg-transparent text-[1.02rem] font-medium tracking-[-0.02em] text-white outline-none placeholder:text-white/42 sm:text-[1.08rem]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={closeSearch}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-white/12"
                      aria-label={copy.searchClose}
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative px-3 py-3 sm:px-4 sm:py-4">
                  {searchResults.length ? (
                    <div className="grid gap-2">
                      {searchResults.map((result) => (
                        <Link
                          key={`${result.category}-${result.href}-${result.title}`}
                          href={result.href}
                          className="group rounded-[1.35rem] border border-white/8 bg-white/[0.035] px-4 py-3.5 transition duration-300 hover:border-white/14 hover:bg-white/[0.07]"
                          onClick={closeSearch}
                        >
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                            <div className="min-w-0">
                              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/52">
                                {result.category}
                              </p>
                              <h3 className="mt-1 text-[1.05rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.12rem]">
                                {result.title}
                              </h3>
                              <p className="mt-1.5 max-w-[44rem] text-[0.9rem] leading-6 text-white/68 sm:text-[0.94rem]">
                                {result.description}
                              </p>
                            </div>
                            <span className="mt-1 inline-flex text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/42 transition group-hover:text-white/62 sm:mt-0">
                              {language === "no" ? "Åpne" : "Open"}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.035] px-5 py-7 text-sm leading-6 text-white/62">
                      {copy.searchEmpty}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(10,10,10,0.44)] text-[color:var(--foreground)] backdrop-blur-sm lg:hidden"
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
                className="relative ml-auto flex h-full w-full max-w-[26rem] flex-col overflow-y-auto border-l border-[color:var(--line)]/80 px-5 pb-6 pt-[calc(env(safe-area-inset-top,0px)+1rem)] shadow-[0_30px_80px_rgba(0,0,0,0.18)] sm:px-6"
                style={{ paddingBottom: "max(1.5rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)))" }}
              >
                <div className="flex items-start justify-between gap-4 pb-6">
                  <Link
                    href="/"
                    className="flex max-w-[calc(100vw-8rem)] shrink-0 items-center"
                    aria-label="Fau&Land Film"
                    onClick={() => setOpen(false)}
                  >
                    <div className="min-w-0">
                      <BrandLogo
                        variant="full"
                        className="w-[9.6rem] max-w-full brightness-[1.75] contrast-[1.16] saturate-[1.1] sm:w-[10rem]"
                        priority
                      />
                      <p className="mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--foreground)]/56">
                        {menuFooterCopy}
                      </p>
                    </div>
                  </Link>

                  <Button
                    variant="icon"
                    size="icon"
                    className="h-11 w-11 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)]/82 text-[color:var(--foreground)] shadow-none"
                    aria-label={copy.menuClose}
                    onClick={() => setOpen(false)}
                  >
                    <CloseIcon className="h-4 w-4" />
                  </Button>
                </div>

                <nav className="flex flex-1 flex-col justify-center" aria-label={menuLabel}>
                  <div className="flex flex-col rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)]/42 px-1">
                    {navItems.map((item) => {
                      const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group border-b border-[color:var(--line)] px-3 py-4 text-[color:var(--foreground)]/84 transition duration-300 hover:text-[color:var(--foreground)] last:border-b-0",
                            active && "rounded-[1rem] bg-[color:var(--surface)]/72 text-[color:var(--foreground)]",
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

                <div className="mt-8 border-t border-[color:var(--line)] pt-5">
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
                  <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)]/42">
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
