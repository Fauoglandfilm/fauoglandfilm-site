"use client";

import { PreviewMedia } from "@/components/media/preview-media";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import type { CaseStudy } from "@/data/site-content";
import { getPortfolioFallbackVisual, siteVisuals } from "@/data/visual-assets";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

import { ArrowUpRightIcon } from "../ui/icons";

type CaseCardProps = {
  caseStudy: CaseStudy;
  layout?: "stack" | "feature";
  showVerificationNote?: boolean;
  previewBehavior?: "static" | "always" | "hover" | "viewport" | "hover-or-viewport";
  previewRootMargin?: string;
  previewInViewThreshold?: number;
};

export function CaseCard({
  caseStudy,
  layout = "stack",
  showVerificationNote = true,
  previewBehavior = "hover-or-viewport",
  previewRootMargin,
  previewInViewThreshold,
}: CaseCardProps) {
  const video = caseStudy.video;
  const externalVideo = caseStudy.externalVideo;
  const isFeature = layout === "feature";
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];
  const fallbackVisual =
    caseStudy.slug === "ville-gleder"
      ? getPortfolioFallbackVisual("commercial")
      : caseStudy.slug === "foreningen-norden"
        ? getPortfolioFallbackVisual("campaign")
        : getPortfolioFallbackVisual("documentary");
  const image =
    caseStudy.image ??
    caseStudy.video?.poster ??
    caseStudy.externalVideo?.thumbnailSrc ??
    fallbackVisual.src ??
    siteVisuals.folkPoster.src;
  const imageAlt = caseStudy.imageAlt ?? caseStudy.title ?? fallbackVisual.alt ?? siteVisuals.folkPoster.alt;

  return (
    <article
      className={`card-surface group overflow-hidden rounded-[1.65rem] shadow-[0_28px_90px_rgba(0,0,0,0.18)] sm:rounded-[1.95rem] ${
        isFeature ? "lg:grid lg:grid-cols-[1.02fr_0.98fr]" : "md:grid md:grid-cols-[0.95fr_1.05fr]"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          isFeature ? "min-h-[13.1rem] sm:min-h-[16rem] lg:min-h-[19rem]" : "aspect-[1.25/0.8] min-h-[12rem] md:min-h-[14.5rem]"
        }`}
      >
        <PreviewMedia
          title={caseStudy.title}
          video={video}
          externalVideo={externalVideo}
          image={image}
          imageAlt={imageAlt}
          previewBehavior={video || externalVideo ? previewBehavior : "static"}
          className="absolute inset-0"
          sizes={isFeature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1280px) 33vw, 100vw"}
          rootMargin={previewRootMargin}
          inViewThreshold={previewInViewThreshold}
          posterClassName="group-hover:scale-[1.035]"
          previewClassName="scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),linear-gradient(180deg,rgba(17,17,17,0.05),rgba(17,17,17,0.22)_34%,rgba(17,17,17,0.82)_100%)]" />
        <div className="grain-overlay absolute inset-0 opacity-45" />
      </div>

      <div className="relative flex flex-1 flex-col gap-3.5 bg-[color:var(--surface)] p-3.5 sm:p-5 lg:p-6">
        <div className="space-y-1.5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {caseStudy.client}
          </p>
          <h3 className="card-title max-w-xl text-[color:var(--foreground)] sm:text-[2rem]">
            {resolveLocalizedValue(caseStudy.title, language)}
          </h3>
          <p className="body-copy max-w-2xl text-[var(--muted-2)] sm:text-base sm:leading-7">
            {resolveLocalizedValue(caseStudy.summary, language)}
          </p>
        </div>

        <div className="hidden gap-3 md:grid md:grid-cols-3">
          {[
            { label: copy.relatedCaseGoal, value: resolveLocalizedValue(caseStudy.goal, language) },
            {
              label: copy.relatedCaseDeliverables,
              value: caseStudy.deliverables.slice(0, 2).map((item) => resolveLocalizedValue(item, language)).join(", "),
            },
            { label: copy.relatedCaseImpact, value: resolveLocalizedValue(caseStudy.impact, language) },
          ].map((item) => (
            <div key={item.label} className="border-t border-[color:var(--line)] pt-3">
              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-2)]">{item.value}</p>
            </div>
          ))}
        </div>

        {caseStudy.metrics.length ? (
          <p className="hidden text-sm font-medium text-[color:var(--foreground)]/76 md:block">
            {caseStudy.metrics
              .slice(0, 2)
              .map((metric) => `${metric.value} ${resolveLocalizedValue(metric.label, language)}`)
              .join(" · ")}
          </p>
        ) : null}

        {showVerificationNote && caseStudy.verificationNote ? (
          <div className="hidden rounded-[1rem] border border-dashed border-[var(--accent)]/28 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent-2)] md:block">
            {resolveLocalizedValue(caseStudy.verificationNote, language)}
          </div>
        ) : null}

        <div className="mt-auto pt-1">
          <ButtonLink href={`/case/${caseStudy.slug}`} variant="ghost" size="compact" className="w-full sm:w-auto">
            {copy.viewCase}
            <ArrowUpRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
