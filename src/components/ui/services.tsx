"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { PreviewMedia } from "@/components/media/preview-media";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { homeServiceVideoLibrary, serviceAreas, type ServiceArea } from "@/data/site-content";
import { serviceAreaVisuals } from "@/data/visual-assets";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const serviceVideoKeyBySlug = {
  reklamefilm: "01",
  "bedriftsfilm-intervjuer": "02",
  "some-innhold": "03",
  "event-live": "04",
  "marketing-distribusjon": "05",
  "dronefilm-luftfoto": "06",
} as const;

const serviceMediaConfigBySlug = {
  reklamefilm: {
    mediaFit: "contain",
    minHeightClassName: "min-h-[22rem] sm:min-h-[26rem] lg:min-h-[38rem]",
  },
  "marketing-distribusjon": {
    mediaFit: "contain",
    minHeightClassName: "min-h-[22rem] sm:min-h-[26rem] lg:min-h-[38rem]",
  },
  "bedriftsfilm-intervjuer": {
    mediaFit: "contain",
    minHeightClassName: "min-h-[22rem] sm:min-h-[26rem] lg:min-h-[38rem]",
  },
  "some-innhold": {
    mediaFit: "contain",
    minHeightClassName: "min-h-[22rem] sm:min-h-[26rem] lg:min-h-[38rem]",
  },
  "event-live": {
    mediaFit: "contain",
    minHeightClassName: "min-h-[22rem] sm:min-h-[26rem] lg:min-h-[38rem]",
  },
  "dronefilm-luftfoto": {
    mediaFit: "cover",
    minHeightClassName: "min-h-[24rem] sm:min-h-[28rem] lg:min-h-[42rem]",
  },
} as const;

function useSectionParallax() {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const updateOffset = () => {
      const node = ref.current;

      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportHeight / 2;
      const progress = distanceFromCenter / viewportHeight;
      const nextOffset = Math.max(-22, Math.min(22, progress * -18));

      setOffset(nextOffset);
    };

    updateOffset();
    window.addEventListener("scroll", updateOffset, { passive: true });
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, [prefersReducedMotion]);

  return { ref, offset };
}

function PortfolioServiceSection({ service, index }: { service: ServiceArea; index: number }) {
  const { language } = useSitePreferences();
  const { ref, offset } = useSectionParallax();
  const isReversed = index % 2 === 1;
  const visual = serviceAreaVisuals[service.slug];
  const videoKey = serviceVideoKeyBySlug[service.slug as keyof typeof serviceVideoKeyBySlug];
  const video = videoKey ? homeServiceVideoLibrary[videoKey] : undefined;
  const mediaConfig = serviceMediaConfigBySlug[service.slug as keyof typeof serviceMediaConfigBySlug] ?? {
    mediaFit: "cover" as const,
    minHeightClassName: "min-h-[22rem] sm:min-h-[26rem] lg:min-h-[38rem]",
  };
  const title = resolveLocalizedValue(service.title, language);
  const summary = resolveLocalizedValue(service.summary, language);
  const ingress = resolveLocalizedValue(service.value, language);
  const eyebrow = resolveLocalizedValue(service.eyebrow, language);
  const deliverables = service.deliverables.map((item) => resolveLocalizedValue(item, language));
  const exampleLabel = service.exampleLabel ? resolveLocalizedValue(service.exampleLabel, language) : null;
  const mediaAlt = visual ? resolveLocalizedValue(visual.alt, language) : title;

  return (
    <article
      ref={ref}
      className="group relative overflow-hidden rounded-[2rem] bg-[#07090d] shadow-[0_18px_60px_rgba(8,10,16,0.12)] sm:rounded-[2.3rem] lg:rounded-[2.6rem]"
    >
      <div
        className={cn(
          "grid",
          isReversed ? "lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]" : "lg:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)]",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            mediaConfig.minHeightClassName,
            isReversed ? "lg:order-2" : "lg:order-1",
          )}
        >
          <div
            className="absolute inset-0 scale-[1.045] transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.045)` }}
          >
            <PreviewMedia
              title={service.title}
              video={video}
              image={video?.poster ?? visual?.src}
              imageAlt={mediaAlt}
              mediaFit={mediaConfig.mediaFit}
              previewBehavior={video ? "viewport" : "static"}
              className="absolute inset-0"
              sizes="(min-width: 1024px) 64vw, 100vw"
              rootMargin="220px 0px -6% 0px"
              inViewThreshold={0.12}
              posterClassName="transition duration-700 ease-out group-hover:scale-[1.03]"
              previewClassName="transition duration-700 ease-out"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0.08),rgba(4,6,10,0.28)_42%,rgba(4,6,10,0.62)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,6,10,0.1),rgba(4,6,10,0.22)_36%,rgba(4,6,10,0.58)_100%)]" />
          <div className="grain-overlay absolute inset-0 opacity-30" />
        </div>

        <div
          className={cn(
            "relative z-10 px-4 pb-4 sm:px-6 sm:pb-6 lg:flex lg:items-center lg:px-0 lg:py-10",
            isReversed ? "lg:order-1 lg:-mr-20 lg:pl-8 xl:-mr-24 xl:pl-12" : "lg:order-2 lg:-ml-20 lg:pr-8 xl:-ml-24 xl:pr-12",
          )}
        >
          <div className="glass-panel w-full rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.07))] p-5 shadow-[0_12px_32px_rgba(6,8,14,0.14)] backdrop-blur-xl transition duration-500 group-hover:-translate-y-0.5 group-hover:border-white/18 sm:p-6 lg:p-8">
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {eyebrow}
                </p>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[11ch] text-3xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.4rem] lg:text-[2.9rem]">
                    {title}
                  </h3>
                  <ArrowUpRight className="mt-1 hidden h-5 w-5 text-[color:var(--foreground)]/38 transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:block" />
                </div>
                <p className="max-w-[36ch] text-lg font-medium leading-7 text-[color:var(--foreground)]/86 sm:text-[1.08rem]">
                  {ingress}
                </p>
                <p className="max-w-[56ch] text-sm leading-6 text-[var(--muted-2)] sm:text-[0.98rem] sm:leading-7">
                  {summary}
                </p>
              </div>

              <div className="grid gap-2.5 border-t border-[color:var(--line)]/80 pt-4 sm:grid-cols-2">
                <div className="rounded-[1rem] border border-[color:var(--line)]/70 bg-white/[0.04] px-3.5 py-3">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {language === "no" ? "Budsjett" : "Budget"}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[color:var(--foreground)]/82">
                    {resolveLocalizedValue(service.budget, language)}
                  </p>
                </div>
                <div className="rounded-[1rem] border border-[color:var(--line)]/70 bg-white/[0.04] px-3.5 py-3">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {language === "no" ? "Tidslinje" : "Timeline"}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[color:var(--foreground)]/82">
                    {resolveLocalizedValue(service.timeline, language)}
                  </p>
                </div>
              </div>

              <div className="border-t border-[color:var(--line)]/80 pt-4">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {language === "no" ? "Typiske leveranser" : "Typical deliverables"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {deliverables.map((item) => (
                    <span
                      key={`${service.slug}-${item}`}
                      className="rounded-full border border-[color:var(--line)]/75 bg-white/[0.045] px-3 py-1.5 text-[0.72rem] font-medium text-[color:var(--foreground)]/76"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap">
                <ButtonLink href={service.href} size="compact" fullWidth className="sm:w-auto">
                  {resolveLocalizedValue(service.ctaLabel, language)}
                </ButtonLink>
                {service.exampleHref && exampleLabel ? (
                  <ButtonLink
                    href={service.exampleHref}
                    variant="secondary"
                    size="compact"
                    fullWidth
                    className="sm:w-auto"
                  >
                    {exampleLabel}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const { language } = useSitePreferences();

  return (
    <section className="section-space pt-0">
      <div className="site-container space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {language === "no" ? "Tjenester" : "Services"}
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
            {language === "no"
              ? "Velg tjenesten som matcher målet dere faktisk har."
              : "Choose the service that matches the outcome you actually need."}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[var(--muted-2)] sm:text-lg">
            {language === "no"
              ? "Hver tjeneste viser hva den er best til, typisk budsjett, leveringstid og hva dere sitter igjen med."
              : "Each service shows what it is best for, the typical budget, the timeline and what you walk away with."}
          </p>
        </div>

        {serviceAreas.map((service, index) => (
          <PortfolioServiceSection key={service.slug} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
