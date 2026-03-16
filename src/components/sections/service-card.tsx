"use client";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import type { ServiceArea } from "@/data/site-content";
import { resolveLocalizedValue } from "@/lib/i18n";

type ServiceCardProps = {
  service: ServiceArea;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const { language } = useSitePreferences();

  return (
    <article className="card-surface group rounded-[1.65rem] p-4.5 sm:rounded-[1.8rem] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
        <div className="space-y-1.5">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {resolveLocalizedValue(service.eyebrow, language)}
          </p>
          <h3 className="card-title text-[color:var(--foreground)]">
            {resolveLocalizedValue(service.title, language)}
          </h3>
        </div>

        <div className="shrink-0">
          <ButtonLink href={service.href} variant="ghost" fullWidth className="sm:w-auto">
            {resolveLocalizedValue(service.ctaLabel, language)}
          </ButtonLink>
        </div>
      </div>

      <div className="mt-4 border-t border-[color:var(--line)] pt-4">
        <p className="body-copy max-w-2xl text-[var(--muted-2)]">
          {resolveLocalizedValue(service.summary, language)}
        </p>
        <p className="body-copy mt-3 text-[var(--muted)]">
          {resolveLocalizedValue(service.value, language)}
        </p>
      </div>
    </article>
  );
}
