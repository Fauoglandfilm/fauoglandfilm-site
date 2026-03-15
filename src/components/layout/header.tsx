"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navItems } from "@/data/site-content";
import { cn } from "@/lib/utils";

import { BrandLogo } from "../ui/brand-logo";
import { CloseIcon, MenuIcon } from "../ui/icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition duration-300",
        scrolled || open
          ? "border-b border-white/8 bg-[rgba(5,10,19,0.78)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8 lg:py-3.5">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Fau&Land Film"
          onClick={() => setOpen(false)}
        >
          <div className="w-7 lg:hidden">
            <BrandLogo variant="mark" className="opacity-95" priority />
          </div>
          <div className="hidden w-[104px] lg:block">
            <BrandLogo variant="full" className="opacity-95" priority />
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[0.8rem] font-medium transition",
                  active ? "text-white" : "text-white/66 hover:text-white",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/18 text-white backdrop-blur lg:hidden"
          aria-label={open ? "Lukk meny" : "Åpne meny"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[rgba(5,10,19,0.96)] px-6 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-[1.4rem] px-4 py-3 text-base transition",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/72 hover:bg-white/5 hover:text-white",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
