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
import { cn } from "@/lib/utils";

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
  const localizedDeliverables = caseStudy.deliverables.map((item) =>
    resolveLocalizedValue(item, language),
  );
  const localizedTags = caseStudy.tags.map((tag) => resolveLocalizedValue(tag, language));
  const isTreningshuset = caseStudy.slug === "treningshuset";
  const hasMixedVideoVariants = isTreningshuset && caseStudy.videoVariants?.length === 2;

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
          {!isTreningshuset ? (
            <article className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-[2rem] sm:border sm:border-[color:var(--line)] sm:bg-[color:var(--surface)]">
              {caseStudy.video || caseStudy.externalVideo ? (
                <div className="relative aspect-video w-full bg-[#111111]">
                  <EmbeddedVideoPlayer
                    title={caseStudy.title}
                    video={caseStudy.video}
                    externalVideo={caseStudy.externalVideo}
                    image={caseStudy.image}
                    imageAlt={caseStudy.imageAlt}
                    mediaFit={caseStudy.mediaFit}
                    autoplay
                    priority
                    className="relative h-full w-full"
                    sizes="100vw"
                    disableMobileSource={isTreningshuset}
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
                  <div className="max-w-sm rounded-[1.6rem] border border-[color:var(--line-strong)]/70 bg-[color:var(--surface)]/82 p-5 backdrop-blur-md">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {resolveLocalizedValue(caseStudy.category, language)}
                    </p>
                    <h2 className="feature-title mt-3 text-[color:var(--foreground)]">
                      {caseStudy.client}
                    </h2>
                    <p className="body-copy mt-3 text-[var(--muted-2)] sm:text-base sm:leading-7">
                      {resolveLocalizedValue(caseStudy.summary, language)}
                    </p>
                  </div>
                </div>
              )}
            </article>
          ) : null}

          {caseStudy.videoVariants?.length ? (
            <section
              className={cn(
                "grid gap-4",
                hasMixedVideoVariants ? "md:grid-cols-[minmax(0,1.28fr)_minmax(16rem,0.72fr)]" : "md:grid-cols-2",
              )}
            >
              {caseStudy.videoVariants.map((variant) => (
                <article
                  key={variant.slug}
                  className={cn(
                    "card-surface rounded-[1.8rem]",
                    !(
                      variant.frame === "landscape" &&
                      (variant.mediaFit ?? caseStudy.mediaFit) === "contain"
                    ) && "overflow-hidden",
                    variant.frame === "portrait" && hasMixedVideoVariants && "md:justify-self-end md:w-full md:max-w-[22rem]",
                  )}
                >
                  <div
                    className={cn(
                      "relative bg-[#0b0d12]",
                      variant.frame === "portrait"
                        ? "aspect-[9/16]"
                        : variant.frame === "landscape"
                          ? "aspect-video"
                          : "min-h-[14.5rem] sm:min-h-[18rem] md:min-h-[24rem]",
                    )}
                  >
                    <EmbeddedVideoPlayer
                      title={variant.label}
                      video={variant.video}
                      image={variant.image}
                      imageAlt={variant.imageAlt}
                      mediaFit={variant.mediaFit ?? caseStudy.mediaFit}
                      autoplay
                      className="absolute inset-0 h-full w-full"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.03),rgba(17,17,17,0.18)_48%,rgba(17,17,17,0.54)_100%)]" />
                    <div className="absolute left-4 top-4 z-[2] rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)]/84 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)] shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-md">
                      {resolveLocalizedValue(variant.label, language)}
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : null}

          <article className="glass-panel rounded-[2rem] p-5 sm:p-6 lg:p-7">
            <div className="space-y-6 sm:space-y-7">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl space-y-2.5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {copy.caseFacts}
                  </p>
                  <h2 className="feature-title text-[color:var(--foreground)]">
                    {language === "no" ? "Behov, leveranse og effekt" : "Need, delivery and effect"}
                  </h2>
                </div>

                <div className="max-w-md space-y-2 xl:pt-1 xl:text-right">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {language === "no" ? "Neste steg" : "Next step"}
                  </p>
                  <p className="body-copy text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {language === "no"
                      ? "Fortell oss kort om mål, kanal og tidslinje, så foreslår vi riktig oppsett og estimat."
                      : "Share the goal, channel and timeline and we will recommend the right setup and estimate."}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 border-t border-[color:var(--line)]/80 pt-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {copy.caseGoalEyebrow}
                  </p>
                  <p className="text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {resolveLocalizedValue(caseStudy.goal, language)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {copy.caseDeliverables}
                  </p>
                  <p className="text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {localizedDeliverables.join(", ")}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {copy.caseImpact}
                  </p>
                  <p className="text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {resolveLocalizedValue(caseStudy.impact, language)}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 border-t border-[color:var(--line)]/80 pt-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(17rem,0.92fr)]">
                <div className="space-y-3">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {copy.caseSolutionEyebrow}
                  </p>
                  <p className="text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {resolveLocalizedValue(caseStudy.solution, language)}
                  </p>

                  {localizedTags.length ? (
                    <p className="text-sm leading-6 text-[var(--muted)] sm:text-[0.97rem] sm:leading-7">
                      {localizedTags.join(" • ")}
                    </p>
                  ) : null}
                </div>

                {caseStudy.metrics.length ? (
                  <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)]/78 px-4 py-4 sm:px-5 sm:py-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {language === "no" ? "Nøkkeltall" : "Key figures"}
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                      {caseStudy.metrics.map((metric, index) => (
                        <div key={`${metric.value}-${index}`} className="space-y-2">
                          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                            {resolveLocalizedValue(metric.label, language)}
                          </p>
                          <p className="font-display text-[1.7rem] leading-none text-[color:var(--foreground)] sm:text-[2rem]">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div
                className={cn(
                  "flex flex-col gap-4 border-t border-[color:var(--line)]/80 pt-6 text-center xl:flex-row xl:items-end xl:text-left",
                  caseStudy.verificationNote ? "xl:justify-between" : "xl:justify-end",
                )}
              >
                {caseStudy.verificationNote ? (
                  <p className="mx-auto max-w-3xl text-sm leading-6 text-[var(--accent-2)] xl:mx-0">
                    {resolveLocalizedValue(caseStudy.verificationNote, language)}
                  </p>
                ) : null}

                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center xl:justify-end">
                  <ButtonLink
                    href="/kontakt"
                    className="[--button-bg-current:#ffffff] [--button-border-current:rgba(17,17,17,0.12)] [--button-text-current:#111111] hover:[--button-bg-current:#f7f7f8] hover:[--button-text-current:#111111] active:[--button-bg-current:#f0f0f2] active:[--button-text-current:#111111] [html[data-theme='dark']_&]:[--button-bg-current:#111111] [html[data-theme='dark']_&]:[--button-border-current:rgba(255,255,255,0.14)] [html[data-theme='dark']_&]:[--button-text-current:#ffffff] [html[data-theme='dark']_&]:hover:[--button-bg-current:#202022] [html[data-theme='dark']_&]:hover:[--button-text-current:#ffffff] [html[data-theme='dark']_&]:active:[--button-bg-current:#252528] [html[data-theme='dark']_&]:active:[--button-text-current:#ffffff]"
                  >
                    {language === "no" ? "Book møte" : "Book a meeting"}
                  </ButtonLink>
                  <ButtonLink
                    href="/priser"
                    variant="secondary"
                    className="[--button-bg-current:#ffffff] [--button-border-current:rgba(17,17,17,0.12)] [--button-text-current:#111111] hover:[--button-bg-current:#f7f7f8] hover:[--button-text-current:#111111] active:[--button-bg-current:#f0f0f2] active:[--button-text-current:#111111] [html[data-theme='dark']_&]:[--button-bg-current:#111111] [html[data-theme='dark']_&]:[--button-border-current:rgba(255,255,255,0.14)] [html[data-theme='dark']_&]:[--button-text-current:#ffffff] [html[data-theme='dark']_&]:hover:[--button-bg-current:#202022] [html[data-theme='dark']_&]:hover:[--button-text-current:#ffffff] [html[data-theme='dark']_&]:active:[--button-bg-current:#252528] [html[data-theme='dark']_&]:active:[--button-text-current:#ffffff]"
                  >
                    {language === "no" ? "Be om estimat" : "Request an estimate"}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 text-center sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:text-left">
            <div>
              <p className="eyebrow">{copy.caseMoreProjectsEyebrow}</p>
              <h2 className="section-title mt-3 text-[color:var(--foreground)]">
                {copy.caseMoreProjectsTitle}
              </h2>
            </div>
            <ButtonLink href="/case" variant="ghost" className="w-full sm:w-auto">
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
