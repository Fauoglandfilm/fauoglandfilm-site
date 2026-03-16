"use client";

import Image from "next/image";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import type { CaseStudy } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

import { ArrowUpRightIcon } from "../ui/icons";

type CaseCardProps = {
  caseStudy: CaseStudy;
  layout?: "stack" | "feature";
  showVerificationNote?: boolean;
};

export function CaseCard({
  caseStudy,
  layout = "stack",
  showVerificationNote = true,
}: CaseCardProps) {
  const image = caseStudy.image;
  const video = caseStudy.video;
  const isFeature = layout === "feature";
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <article
      className={`group overflow-hidden rounded-[1.9rem] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_24px_70px_rgba(18,18,18,0.06)] ${
        isFeature ? "lg:grid lg:grid-cols-[1.02fr_0.98fr]" : "md:grid md:grid-cols-[0.95fr_1.05fr]"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          isFeature ? "min-h-[14.5rem] sm:min-h-[16rem] lg:min-h-[19rem]" : "aspect-[1.25/0.82] min-h-[13rem] md:min-h-[14.5rem]"
        }`}
      >
        {video ? (
          <video
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            autoPlay
            muted
            loop
            playsInline
            preload={isFeature ? "metadata" : "none"}
            poster={video.poster}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        ) : image ? (
          <Image
            src={image}
            alt={caseStudy.imageAlt ? resolveLocalizedValue(caseStudy.imageAlt, language) : caseStudy.client}
            fill
            sizes={isFeature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1280px) 33vw, 100vw"}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              caseStudy.palette ?? "from-[#e6dfd4] via-[#cbbda8] to-[#b9a182]"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.02),rgba(17,17,17,0.06)_36%,rgba(17,17,17,0.24))]" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5 lg:p-6">
        <div className="space-y-2">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {caseStudy.client}
          </p>
          <h3 className="max-w-xl font-display text-[1.75rem] leading-[0.98] text-[color:var(--foreground)] sm:text-[2.2rem]">
            {resolveLocalizedValue(caseStudy.title, language)}
          </h3>
          <p className="max-w-2xl text-[0.95rem] leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
            {resolveLocalizedValue(caseStudy.summary, language)}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
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
          <p className="text-sm font-medium text-[color:var(--foreground)]/76">
            {caseStudy.metrics
              .slice(0, 2)
              .map((metric) => `${metric.value} ${resolveLocalizedValue(metric.label, language)}`)
              .join(" · ")}
          </p>
        ) : null}

        {showVerificationNote && caseStudy.verificationNote ? (
          <div className="rounded-[1rem] border border-dashed border-[var(--accent)]/28 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent-2)]">
            {resolveLocalizedValue(caseStudy.verificationNote, language)}
          </div>
        ) : null}

        <div className="mt-auto pt-1">
          <ButtonLink
            href={`/case/${caseStudy.slug}`}
            variant="ghost"
            size="compact"
          >
            {copy.viewCase}
            <ArrowUpRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
