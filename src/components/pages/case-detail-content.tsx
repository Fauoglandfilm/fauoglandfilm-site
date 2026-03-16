"use client";

import Image from "next/image";
import Link from "next/link";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { CtaBanner, PageHero } from "@/components/sections/site-sections";
import { ButtonLink } from "@/components/ui/button-link";
import type { CaseStudy } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

type CaseDetailContentProps = {
  caseStudy: CaseStudy;
  relatedCases: CaseStudy[];
};

export function CaseDetailContent({
  caseStudy,
  relatedCases,
}: CaseDetailContentProps) {
  const { language } = useSitePreferences();
  const copy = uiCopy.pages[language];

  return (
    <main>
      <PageHero
        eyebrow={caseStudy.client}
        title={caseStudy.title}
        description={caseStudy.summary}
        primaryCta={{
          label: { no: uiCopy.pages.no.caseDetailPrimary, en: uiCopy.pages.en.caseDetailPrimary },
          href: "/kontakt",
        }}
        secondaryCta={{
          label: { no: uiCopy.pages.no.caseDetailSecondary, en: uiCopy.pages.en.caseDetailSecondary },
          href: "/case",
        }}
        video={caseStudy.video}
      />

      <section className="section-space">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8">
          <div className="space-y-5">
            <article className="card-surface overflow-hidden rounded-[2rem]">
              {caseStudy.video ? (
                <div className="relative aspect-[4/5] w-full">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={caseStudy.video.poster}
                  >
                    <source src={caseStudy.video.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04),rgba(17,17,17,0.24))]" />
                </div>
              ) : caseStudy.image ? (
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.imageAlt ? resolveLocalizedValue(caseStudy.imageAlt, language) : `${caseStudy.client} case`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div
                  className={`flex aspect-[4/5] items-end bg-gradient-to-br ${
                    caseStudy.palette ?? "from-[#efe9df] via-[#d4c8b5] to-[#bba68a]"
                  } p-6 sm:p-8`}
                >
                  <div className="max-w-sm rounded-[1.6rem] border border-white/28 bg-white/62 p-5 backdrop-blur">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {resolveLocalizedValue(caseStudy.category, language)}
                    </p>
                    <h2 className="mt-3 font-display text-[2rem] leading-[0.95] text-[#111111] sm:text-[2.5rem]">
                      {caseStudy.client}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                      {resolveLocalizedValue(caseStudy.summary, language)}
                    </p>
                  </div>
                </div>
              )}
            </article>

            <article className="card-surface rounded-[2rem] p-5 sm:p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {copy.caseFacts}
              </p>
              <dl className="mt-5 grid gap-3">
                {[
                  [copy.caseCategory, resolveLocalizedValue(caseStudy.category, language)],
                  [copy.caseIndustry, resolveLocalizedValue(caseStudy.industry, language)],
                  [copy.caseDeliverables, caseStudy.deliverables.map((item) => resolveLocalizedValue(item, language)).join(", ")],
                  [copy.caseImpact, resolveLocalizedValue(caseStudy.impact, language)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3.5"
                  >
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>

            {caseStudy.verificationNote ? (
              <div className="rounded-[1.4rem] border border-dashed border-[var(--accent)]/35 bg-[var(--accent)]/10 p-4 text-sm leading-6 text-[var(--accent-2)]">
                {resolveLocalizedValue(caseStudy.verificationNote, language)}
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {caseStudy.metrics.map((metric, index) => (
                <div key={`${metric.value}-${index}`} className="card-surface rounded-[1.6rem] p-4 sm:p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {resolveLocalizedValue(metric.label, language)}
                  </p>
                  <p className="mt-3 font-display text-[1.7rem] leading-none text-[color:var(--foreground)] sm:text-[2rem]">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              <article className="card-surface rounded-[2rem] p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {copy.caseGoalEyebrow}
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[0.95] text-[color:var(--foreground)] sm:text-[2.6rem]">
                  {copy.caseGoalTitle}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                  {resolveLocalizedValue(caseStudy.goal, language)}
                </p>
              </article>

              <article className="card-surface rounded-[2rem] p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {copy.caseSolutionEyebrow}
                </p>
                <p className="mt-4 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                  {resolveLocalizedValue(caseStudy.solution, language)}
                </p>

                <div className="mt-5 rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">{copy.caseDelivered}</p>
                  <ul className="mt-3 space-y-2.5 text-sm leading-6 text-[var(--muted-2)]">
                    {caseStudy.deliverables.map((item, index) => (
                      <li key={`deliverable-${index}`} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{resolveLocalizedValue(item, language)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="card-surface rounded-[2rem] p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {copy.caseImpactEyebrow}
                </p>
                <p className="mt-4 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                  {resolveLocalizedValue(caseStudy.impact, language)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {caseStudy.tags.map((tag, index) => (
                    <span
                      key={`tag-${index}`}
                      className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3.5 py-1.5 text-sm text-[color:var(--foreground)]"
                    >
                      {resolveLocalizedValue(tag, language)}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{copy.caseMoreProjectsEyebrow}</p>
              <h2 className="mt-3 font-display text-[2rem] leading-[0.94] text-[color:var(--foreground)] sm:text-[2.8rem]">
                {copy.caseMoreProjectsTitle}
              </h2>
            </div>
            <ButtonLink href="/case" variant="ghost">
              {copy.caseBackToOverview}
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {relatedCases.map((entry) => (
              <Link
                key={entry.slug}
                href={`/case/${entry.slug}`}
                className="card-surface rounded-[1.8rem] p-5 transition duration-200 hover:-translate-y-1"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {entry.client}
                </p>
                <h3 className="mt-3 font-display text-[1.8rem] leading-[0.98] text-[color:var(--foreground)]">
                  {resolveLocalizedValue(entry.title, language)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
                  {resolveLocalizedValue(entry.summary, language)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={{ no: uiCopy.pages.no.caseRelatedCtaTitle, en: uiCopy.pages.en.caseRelatedCtaTitle }}
        description={{
          no: uiCopy.pages.no.caseRelatedCtaDescription,
          en: uiCopy.pages.en.caseRelatedCtaDescription,
        }}
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
