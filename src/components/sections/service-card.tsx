"use client";

import { PreviewMedia } from "@/components/media/preview-media";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { homeServiceVideoLibrary, type ServiceArea } from "@/data/site-content";
import { serviceAreaVisuals } from "@/data/visual-assets";
import { resolveLocalizedValue } from "@/lib/i18n";

type ServiceCardProps = {
  service: ServiceArea;
};

const serviceVideoKeyBySlug = {
  reklamefilm: "01",
  "bedriftsfilm-intervjuer": "02",
  "some-innhold": "03",
  "event-live": "04",
} as const;

export function ServiceCard({ service }: ServiceCardProps) {
  const { language } = useSitePreferences();
  const visual = serviceAreaVisuals[service.slug];
  const videoKey = serviceVideoKeyBySlug[service.slug as keyof typeof serviceVideoKeyBySlug];
  const video = videoKey ? homeServiceVideoLibrary[videoKey] : undefined;
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
  const deliverablesSummary = service.deliverables
    .map((item) => resolveLocalizedValue(item, language))
    .join(" · ");
  const mediaAlt = visual ? resolveLocalizedValue(visual.alt, language) : resolveLocalizedValue(service.title, language);

  return (
    <article className="group grid gap-3.5 lg:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] lg:items-start lg:gap-6">
      <div className="media-frame relative overflow-hidden rounded-[1.45rem]">
        <div className="relative aspect-[1.18/0.72] overflow-hidden bg-[#0b0d12] lg:min-h-[14rem] lg:aspect-auto">
          <PreviewMedia
            title={service.title}
            video={video}
            image={video?.poster ?? visual?.src}
            imageAlt={mediaAlt}
            previewBehavior={video ? "viewport" : "static"}
            className="absolute inset-0"
            sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 36vw, 100vw"
            rootMargin="180px 0px -8% 0px"
            inViewThreshold={0.16}
            posterClassName="transition duration-700 group-hover:scale-[1.035]"
            previewClassName="scale-[1.02]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%),linear-gradient(180deg,rgba(9,9,9,0.02),rgba(9,9,9,0.16)_36%,rgba(9,9,9,0.58)_100%)]" />
          <div className="grain-overlay absolute inset-0 opacity-36" />
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-3.5">
        <div className="space-y-3.5">
          <div className="space-y-2">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              {resolveLocalizedValue(service.eyebrow, language)}
            </p>
            <h3 className="card-title text-[color:var(--foreground)]">
              {resolveLocalizedValue(service.title, language)}
            </h3>
            <p className="text-[0.98rem] font-medium leading-6 text-[color:var(--foreground)]/82 sm:text-[1.02rem]">
              {resolveLocalizedValue(service.value, language)}
            </p>
            <p className="text-sm leading-6 text-[var(--muted-2)] sm:text-[0.98rem] sm:leading-7">
              {resolveLocalizedValue(service.summary, language)}
            </p>
          </div>

          <div className="hidden gap-3 border-t border-[color:var(--line)]/80 pt-4 md:grid md:grid-cols-2">
            {metaItems.map((item) => (
              <div key={item.label}>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-[color:var(--foreground)]/78">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="hidden border-t border-[color:var(--line)]/80 pt-4 md:block">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {language === "no" ? "Typiske leveranser" : "Typical deliverables"}
            </p>
            <p className="mt-2.5 text-sm leading-6 text-[var(--muted-2)]">
              {deliverablesSummary}
            </p>
          </div>
        </div>

        <div className="pt-0.5">
          <ButtonLink href={service.href} variant="ghost" size="compact" fullWidth className="sm:w-auto">
            {resolveLocalizedValue(service.ctaLabel, language)}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
