import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/data/site-content";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#040810]">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-8">
        <div className="space-y-4">
          <div className="w-[132px] sm:w-[150px]">
            <BrandLogo variant="full" className="opacity-95" />
          </div>
          <div className="max-w-lg space-y-2">
            <p className="font-display text-[1.5rem] text-white sm:text-[1.95rem]">
              Film og innhold som gjør det lettere å bli valgt.
            </p>
            <p className="text-sm leading-6 text-white/62 sm:text-base">
              Oslo-basert produksjonsselskap for reklamefilm, innhold, event og
              videodrevet markedsføring.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink href={siteConfig.bookingHref} fullWidth className="sm:w-auto">
              {siteConfig.bookingLabel}
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
              Kontakt
            </p>
            <div className="space-y-2 text-white/74">
              <p>{siteConfig.locationLabel}</p>
              <a
                className="block min-h-11 transition hover:text-white"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              <a
                className="block min-h-11 transition hover:text-white"
                href={siteConfig.phonePrimaryHref}
              >
                {siteConfig.phonePrimary}
              </a>
              <p>{siteConfig.responseTime}</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
              Snarveier
            </p>
            <div className="flex flex-col items-start gap-2">
              <ButtonLink href="/" variant="ghost" className="px-0 py-0">
                Forside
              </ButtonLink>
              <ButtonLink href="/tjenester" variant="ghost" className="px-0 py-0">
                Tjenester
              </ButtonLink>
              <ButtonLink href="/case" variant="ghost" className="px-0 py-0">
                Case
              </ButtonLink>
              <ButtonLink href="/om-oss" variant="ghost" className="px-0 py-0">
                Om oss
              </ButtonLink>
              <ButtonLink href="/kontakt" variant="ghost" className="px-0 py-0">
                Kontakt
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
