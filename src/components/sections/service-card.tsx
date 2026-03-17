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
  const metaItems = [
    {
      label: language === "no" ? "Budsjett" : "Budget",
      value: resolveLocalizedValue(service.budget, language),
    },
    {
      label: language === "no" ? "Tidslinje" : "Timeline",
      value: resolveLocalizedValue(service.timeline, language),
    },
  ];

  return (
    <article className="card-surface group overflow-hidden rounded-[1.75rem] shadow-[0_26px_80px_rgba(0,0,0,0.16)] sm:rounded-[1.9rem]">
      {visual ? (
        <div className="grid gap-px bg-[color:var(--line)] lg:grid-cols-[0.94fr_1.06fr]">
          <div className="media-frame relative aspect-[1.08/0.86] overflow-hidden lg:min-h-[19rem] lg:aspect-auto">
            <Image
              src={visual.src}
              alt={resolveLocalizedValue(visual.alt, language)}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%),linear-gradient(180deg,rgba(9,9,9,0.02),rgba(9,9,9,0.2)_36%,rgba(9,9,9,0.74)_100%)]" />
            <div className="grain-overlay absolute inset-0 opacity-40" />
          </div>

          <div className="relative flex flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-4.5 sm:p-6">
            <div className="flex flex-col gap-3">
              <div className="space-y-1.5">
                <h3 className="card-title text-[color:var(--foreground)]">
                  {resolveLocalizedValue(service.title, language)}
                </h3>
              </div>

              <p className="body-copy text-[color:var(--foreground)]/84">
                {resolveLocalizedValue(service.value, language)}
              </p>
            </div>

            <p className="body-copy mt-3 text-[var(--muted-2)]">
              {resolveLocalizedValue(service.summary, language)}
            </p>

            <div className="mt-4 grid gap-3 border-t border-[color:var(--line)] pt-4 sm:grid-cols-2">
              {metaItems.map((item) => (
                <div key={item.label}>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]/78">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-[color:var(--line)] pt-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {language === "no" ? "Typiske leveranser" : "Typical deliverables"}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
                {service.deliverables
                  .map((item) => resolveLocalizedValue(item, language))
                  .join(", ")}
              </p>
            </div>

            <div className="mt-auto border-t border-[color:var(--line)] pt-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink href={service.href} variant="ghost" fullWidth className="sm:w-auto">
                  {resolveLocalizedValue(service.ctaLabel, language)}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
