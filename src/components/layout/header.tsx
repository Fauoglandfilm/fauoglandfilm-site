"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navItems, siteConfig } from "@/data/site-content";
import { cn } from "@/lib/utils";

import { BrandLogo } from "../ui/brand-logo";
import { ButtonLink } from "../ui/button-link";
import { CloseIcon, MenuIcon } from "../ui/icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayMode = pathname === "/" && !scrolled && !open;

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
      className={cn("fixed inset-x-0 top-0 z-50 transition duration-300")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mt-3 flex items-center justify-between rounded-full px-3.5 py-3 transition duration-300 sm:px-4",
            overlayMode
              ? "border border-white/14 bg-[rgba(12,12,12,0.18)] text-white backdrop-blur-xl"
              : "border border-black/8 bg-[rgba(255,255,255,0.78)] text-[#111111] shadow-[0_12px_40px_rgba(14,14,14,0.08)] backdrop-blur-xl",
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
              <p className={cn("font-display text-[1rem] tracking-[-0.05em]", overlayMode ? "text-white" : "text-[#111111]")}>
                Fau&amp;Land Film
              </p>
              <p className={cn("text-[0.72rem] uppercase tracking-[0.22em]", overlayMode ? "text-white/62" : "text-[#111111]/45")}>
                Production company
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
                        ? "text-[#111111]"
                        : "text-[#111111]/58 hover:text-[#111111]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <ButtonLink
              href={siteConfig.bookingHref}
              className={cn(
                overlayMode && "border-white/20 bg-white text-[#111111] hover:bg-white/92",
              )}
            >
              Kontakt
            </ButtonLink>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden",
              overlayMode
                ? "border border-white/16 bg-white/8 text-white"
                : "border border-black/8 bg-white/70 text-[#111111]",
            )}
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:hidden">
          <div className="mt-3 rounded-[2rem] border border-black/8 bg-[rgba(255,255,255,0.94)] p-4 shadow-[0_24px_70px_rgba(14,14,14,0.12)] backdrop-blur-xl">
            <nav
              className="flex max-h-[calc(100svh-8rem)] flex-col gap-1 overflow-y-auto"
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
                        ? "bg-[#111111] text-white"
                        : "text-[#111111]/72 hover:bg-black/[0.04] hover:text-[#111111]",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 border-t border-black/8 pt-4">
              <ButtonLink href={siteConfig.bookingHref} fullWidth>
                {siteConfig.bookingLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
