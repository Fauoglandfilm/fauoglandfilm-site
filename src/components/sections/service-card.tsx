"use client";

import Image from "next/image";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import type { ServiceArea } from "@/data/site-content";
import { serviceAreaVisuals } from "@/data/visual-assets";
import { resolveLocalizedValue } from "@/lib/i18n";

type ServiceCardProps = {
  service: ServiceArea;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const { language } = useSitePreferences();
  const visual = serviceAreaVisuals[service.slug];

  return (
    <article className="card-surface group overflow-hidden rounded-[1.7rem] sm:rounded-[1.9rem]">
      {visual ? (
        <div className="grid gap-px bg-[color:var(--line)] lg:grid-cols-[0.94fr_1.06fr]">
          <div className="relative aspect-[1.08/0.86] overflow-hidden bg-[#111111] lg:min-h-[19rem] lg:aspect-auto">
            <Image
              src={visual.src}
              alt={resolveLocalizedValue(visual.alt, language)}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.02),rgba(9,9,9,0.22)_36%,rgba(9,9,9,0.66)_100%)]" />
            <div className="grain-overlay absolute inset-0 opacity-40" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white/52">
                {resolveLocalizedValue(service.eyebrow, language)}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/74">
                {resolveLocalizedValue(service.summary, language)}
              </p>
            </div>
          </div>

          <div className="p-4.5 sm:p-6">
            <div className="flex flex-col gap-3">
              <div className="space-y-1.5">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {resolveLocalizedValue(service.eyebrow, language)}
                </p>
                <h3 className="card-title text-[color:var(--foreground)]">
                  {resolveLocalizedValue(service.title, language)}
                </h3>
              </div>

              <p className="body-copy text-[var(--muted-2)]">
                {resolveLocalizedValue(service.value, language)}
              </p>
            </div>

            <div className="mt-5 border-t border-[color:var(--line)] pt-5">
              <ButtonLink href={service.href} variant="ghost" fullWidth className="sm:w-auto">
                {resolveLocalizedValue(service.ctaLabel, language)}
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
