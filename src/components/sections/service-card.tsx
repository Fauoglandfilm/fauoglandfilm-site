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
  "marketing-distribusjon": "05",
  "bedriftsfilm-intervjuer": "02",
  "some-innhold": "03",
  "event-live": "04",
} as const;

const serviceMediaConfigBySlug = {
  reklamefilm: {
    mediaFit: "contain",
    frameClassName: "aspect-square",
  },
  "marketing-distribusjon": {
    mediaFit: "contain",
    frameClassName: "aspect-square",
  },
  "bedriftsfilm-intervjuer": {
    mediaFit: "contain",
    frameClassName: "aspect-square",
  },
  "some-innhold": {
    mediaFit: "contain",
    frameClassName: "aspect-square",
  },
  "event-live": {
    mediaFit: "contain",
    frameClassName: "aspect-square",
  },
} as const;

export function ServiceCard({ service }: ServiceCardProps) {
  const { language } = useSitePreferences();
  const visual = serviceAreaVisuals[service.slug];
  const videoKey = serviceVideoKeyBySlug[service.slug as keyof typeof serviceVideoKeyBySlug];
  const video = videoKey ? homeServiceVideoLibrary[videoKey] : undefined;
  const mediaConfig = serviceMediaConfigBySlug[service.slug as keyof typeof serviceMediaConfigBySlug] ?? {
    mediaFit: "contain" as const,
    frameClassName: "aspect-square",
  };
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
  const deliverables = service.deliverables.map((item) => resolveLocalizedValue(item, language));
  const exampleLabel = service.exampleLabel ? resolveLocalizedValue(service.exampleLabel, language) : null;
  const mediaAlt = visual ? resolveLocalizedValue(visual.alt, language) : resolveLocalizedValue(service.title, language);

  return (
    <article className="group grid gap-3.5 lg:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] lg:items-start lg:gap-6">
      <div className="media-frame relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_40%)] opacity-70" />
        <div className="relative rounded-[1.15rem] border border-white/8 bg-[#0b0d12]/90 p-2 shadow-[0_18px_42px_rgba(0,0,0,0.22)] sm:p-3">
          <div className={`relative ${mediaConfig.frameClassName} overflow-hidden rounded-[0.95rem] bg-[#05070b]`}>
            <PreviewMedia
              title={service.title}
              video={video}
              image={video?.poster ?? visual?.src}
              imageAlt={mediaAlt}
              mediaFit={mediaConfig.mediaFit}
              previewBehavior={video ? "viewport" : "static"}
              className="absolute inset-0"
              sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 36vw, 100vw"
              rootMargin="180px 0px -8% 0px"
              inViewThreshold={0.16}
              posterClassName="transition duration-700 group-hover:scale-[1.01]"
              previewClassName="transition duration-700"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%),linear-gradient(180deg,rgba(9,9,9,0.02),rgba(9,9,9,0.16)_36%,rgba(9,9,9,0.5)_100%)]" />
            <div className="grain-overlay absolute inset-0 opacity-36" />
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              {resolveLocalizedValue(service.eyebrow, language)}
            </p>
            <h3 className="card-title text-[color:var(--foreground)]">
              {resolveLocalizedValue(service.title, language)}
            </h3>
            <p className="rounded-[1rem] border border-[color:var(--line)]/70 bg-white/[0.04] px-3.5 py-3 text-[0.96rem] font-semibold leading-6 text-[color:var(--foreground)]/84 sm:text-[1rem]">
              {resolveLocalizedValue(service.value, language)}
            </p>
            <p className="max-w-[58ch] text-sm leading-6 text-[var(--muted-2)] sm:text-[0.96rem] sm:leading-7">
              {resolveLocalizedValue(service.summary, language)}
            </p>
          </div>

          <div className="grid gap-2.5 border-t border-[color:var(--line)]/80 pt-4 sm:grid-cols-2">
            {metaItems.map((item) => (
              <div
                key={item.label}
                className="rounded-[1rem] border border-[color:var(--line)]/70 bg-white/[0.035] px-3.5 py-3"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-[color:var(--foreground)]/78">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-[color:var(--line)]/80 pt-4">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {language === "no" ? "Typiske leveranser" : "Typical deliverables"}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {deliverables.map((item) => (
                <span
                  key={`${service.slug}-${item}`}
                  className="rounded-full border border-[color:var(--line)]/80 bg-white/[0.04] px-3 py-1.5 text-[0.72rem] font-medium text-[color:var(--foreground)]/76"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-0.5 sm:flex-row sm:flex-wrap">
          <ButtonLink href={service.href} size="compact" fullWidth className="sm:w-auto">
            {resolveLocalizedValue(service.ctaLabel, language)}
          </ButtonLink>
          {service.exampleHref && exampleLabel ? (
            <ButtonLink href={service.exampleHref} variant="secondary" size="compact" fullWidth className="sm:w-auto">
              {exampleLabel}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
