"use client";

import Image from "next/image";
import Link from "next/link";

import { EmbeddedVideoPlayer } from "@/components/media/embedded-video-player";
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
      />

      <section className="section-space">
        <div className="site-container space-y-5">
          <article className="card-surface overflow-hidden rounded-[2rem]">
            {caseStudy.video || caseStudy.externalVideo ? (
              <div className="relative aspect-video w-full bg-[#111111]">
                <EmbeddedVideoPlayer
                  title={caseStudy.title}
                  video={caseStudy.video}
                  externalVideo={caseStudy.externalVideo}
                  image={caseStudy.image}
                  imageAlt={caseStudy.imageAlt}
                  mediaFit={caseStudy.mediaFit}
                  className="relative h-full w-full"
                  sizes="100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04),rgba(17,17,17,0.24))]" />
              </div>
            ) : caseStudy.image ? (
              <div className="relative aspect-video w-full">
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
                  <h2 className="feature-title mt-3 text-[#111111]">
                    {caseStudy.client}
                  </h2>
                  <p className="body-copy mt-3 text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {resolveLocalizedValue(caseStudy.summary, language)}
                  </p>
                </div>
              </div>
            )}
          </article>

          {caseStudy.videoVariants?.length ? (
            <section className="grid gap-4 md:grid-cols-2">
              {caseStudy.videoVariants.map((variant) => (
                <article key={variant.slug} className="card-surface overflow-hidden rounded-[1.8rem]">
                  <div className="relative min-h-[20rem] bg-[#0b0d12] sm:min-h-[24rem]">
                    <EmbeddedVideoPlayer
                      title={variant.label}
                      video={variant.video}
                      image={variant.image}
                      imageAlt={variant.imageAlt}
                      mediaFit={variant.mediaFit ?? caseStudy.mediaFit}
                      className="relative h-full w-full"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.03),rgba(17,17,17,0.18)_48%,rgba(17,17,17,0.54)_100%)]" />
                    <div className="absolute left-4 top-4 z-[2] rounded-full border border-white/14 bg-white/88 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#111111] shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-md">
                      {resolveLocalizedValue(variant.label, language)}
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : null}

          <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
            <article className="glass-panel rounded-[2rem] p-5 sm:p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {copy.caseFacts}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: copy.caseImpact, value: resolveLocalizedValue(caseStudy.impact, language) },
                  { label: copy.caseGoalEyebrow, value: resolveLocalizedValue(caseStudy.goal, language) },
                  {
                    label: copy.caseDeliverables,
                    value: caseStudy.deliverables.map((item) => resolveLocalizedValue(item, language)).join(", "),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3.5"
                  >
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card-surface rounded-[2rem] p-5 sm:p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {language === "no" ? "Neste steg" : "Next step"}
                  </p>
                  <h2 className="feature-title text-[color:var(--foreground)]">
                    {language === "no" ? "Vil dere få til noe lignende?" : "Looking to create something similar?"}
                  </h2>
                  <p className="body-copy text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {language === "no"
                      ? "Fortell oss kort om mål, kanal og tidslinje, så foreslår vi riktig oppsett og estimat."
                      : "Share the goal, channel and timeline and we will recommend the right setup and estimate."}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <ButtonLink href="/kontakt">
                    {language === "no" ? "Book møte" : "Book a meeting"}
                  </ButtonLink>
                  <ButtonLink href="/priser" variant="secondary">
                    {language === "no" ? "Be om estimat" : "Request an estimate"}
                  </ButtonLink>
                </div>
              </div>
            </article>
          </div>

          {caseStudy.verificationNote ? (
            <div className="rounded-[1.4rem] border border-dashed border-[var(--accent)]/35 bg-[var(--accent)]/10 p-4 text-sm leading-6 text-[var(--accent-2)]">
              {resolveLocalizedValue(caseStudy.verificationNote, language)}
            </div>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
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

            <article className="card-surface rounded-[2rem] p-5 sm:p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {copy.caseSolutionEyebrow}
              </p>
              <h2 className="feature-title mt-3 text-[color:var(--foreground)]">
                {language === "no" ? "Hvordan vi løste det" : "How we approached it"}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                {resolveLocalizedValue(caseStudy.solution, language)}
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
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{copy.caseMoreProjectsEyebrow}</p>
              <h2 className="section-title mt-3 text-[color:var(--foreground)]">
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
                className="card-surface rounded-[1.65rem] p-4.5 transition duration-200 hover:-translate-y-1 sm:rounded-[1.8rem] sm:p-5"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {entry.client}
                </p>
                <h3 className="card-title mt-3 text-[color:var(--foreground)] sm:text-[1.8rem]">
                  {resolveLocalizedValue(entry.title, language)}
                </h3>
                <p className="body-copy mt-3 text-[var(--muted-2)]">
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
