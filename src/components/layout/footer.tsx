import Link from "next/link";

import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { navItems, siteConfig } from "@/data/site-content";

export function Footer() {
  return (
    <footer className="border-t border-black/8 bg-[#ece6dd]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] p-3">
                <BrandLogo variant="mark" className="opacity-100" />
              </div>
              <div>
                <p className="font-display text-[1.05rem] text-[#111111]">Fau&amp;Land Film</p>
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#111111]/44">
                  Production company
                </p>
              </div>
            </div>

            <div className="max-w-2xl space-y-3">
              <p className="font-display text-[2rem] leading-[0.95] text-[#111111] sm:text-[2.8rem]">
                Film-led production for brands that need the work to feel bigger than the budget.
              </p>
              <p className="max-w-xl text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                Oslo-based, senior-led and built for commercial film, branded storytelling and premium content systems.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.bookingHref}>{siteConfig.bookingLabel}</ButtonLink>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="eyebrow">Contact</p>
              <div className="space-y-2 text-sm text-[var(--muted-2)] sm:text-base">
                <p>{siteConfig.locationLabel}</p>
                <a className="block transition hover:text-[#111111]" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <a className="block transition hover:text-[#111111]" href={siteConfig.phonePrimaryHref}>
                  {siteConfig.phonePrimary}
                </a>
                <p>{siteConfig.responseTime}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="eyebrow">Navigation</p>
              <div className="flex flex-col items-start gap-2 text-sm text-[var(--muted-2)] sm:text-base">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-[#111111]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
