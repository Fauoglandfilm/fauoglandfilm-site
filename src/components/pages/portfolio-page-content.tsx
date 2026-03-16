"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { CtaBanner, PageHero } from "@/components/sections/site-sections";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import {
  portfolioGroups,
  portfolioPageContent,
  portfolioProjects,
  type PortfolioProject,
} from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

export function PortfolioPageContent() {
  const { language } = useSitePreferences();
  const featureProject =
    portfolioProjects.find((project) => project.featured) ?? portfolioProjects[0];
  const groupedProjects = portfolioGroups
    .map((group) => ({
      ...group,
      projects: portfolioProjects.filter((project) => project.group === group.slug),
    }))
    .filter((group) => group.projects.length > 0);

  return (
    <main>
      <PageHero
        eyebrow={{
          no: uiCopy.pages.no.caseHeroEyebrow,
          en: uiCopy.pages.en.caseHeroEyebrow,
        }}
        title={{
          no: uiCopy.pages.no.caseHeroTitle,
          en: uiCopy.pages.en.caseHeroTitle,
        }}
        description={{
          no: uiCopy.pages.no.caseHeroDescription,
          en: uiCopy.pages.en.caseHeroDescription,
        }}
        primaryCta={{
          label: {
            no: uiCopy.pages.no.casePrimaryCta,
            en: uiCopy.pages.en.casePrimaryCta,
          },
          href: "/kontakt",
        }}
        secondaryCta={{
          label: portfolioPageContent.browseCta,
          href: "#portfolio-grid",
        }}
      />

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:gap-5">
            <Reveal>
              <article className="card-surface group overflow-hidden rounded-[1.9rem]">
                <div className="relative aspect-[1.2/0.9] sm:aspect-video">
                  <PortfolioMedia project={featureProject} priority />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.08),rgba(17,17,17,0.24))]" />
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="card-surface flex h-full flex-col rounded-[1.9rem] p-5 sm:p-6 lg:p-7">
                <div className="space-y-3">
                  <span className="eyebrow">
                    {resolveLocalizedValue(portfolioPageContent.showreelEyebrow, language)}
                  </span>
                  <h2 className="section-title text-[color:var(--foreground)]">
                    {resolveLocalizedValue(portfolioPageContent.showreelTitle, language)}
                  </h2>
                  <p className="body-copy max-w-xl text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {resolveLocalizedValue(portfolioPageContent.showreelDescription, language)}
                  </p>
                  <p className="body-copy text-[var(--muted)]">
                    {resolveLocalizedValue(portfolioPageContent.description, language)}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <ButtonLink
                    href={featureProject.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full sm:w-auto"
                  >
                    {resolveLocalizedValue(portfolioPageContent.showreelPrimaryCta, language)}
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href="/kontakt" variant="secondary" className="w-full sm:w-auto">
                    {resolveLocalizedValue(portfolioPageContent.showreelSecondaryCta, language)}
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <div id="portfolio-grid">
        {groupedProjects.map((group, groupIndex) => (
          <section
            key={group.slug}
            className={groupIndex === 0 ? "section-space pt-0" : "section-space"}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl space-y-2.5 sm:space-y-3">
                <span className="eyebrow">
                  {resolveLocalizedValue(portfolioPageContent.eyebrow, language)}
                </span>
                <h2 className="section-title text-[color:var(--foreground)]">
                  {resolveLocalizedValue(group.title, language)}
                </h2>
                <p className="body-copy max-w-2xl text-[var(--muted-2)] sm:text-base sm:leading-7">
                  {resolveLocalizedValue(group.description, language)}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2">
                {group.projects.map((project, index) => (
                  <Reveal key={project.slug} delay={0.04 * index}>
                    <PortfolioProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaBanner
        title={portfolioPageContent.footerTitle}
        description={portfolioPageContent.footerDescription}
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}

function PortfolioProjectCard({ project }: { project: PortfolioProject }) {
  const { language } = useSitePreferences();

  return (
    <article className="card-surface group overflow-hidden rounded-[1.8rem]">
      <div
        className={`relative overflow-hidden ${
          project.mediaFit === "contain"
            ? "aspect-[1.16/0.96] bg-[#1d1718] sm:aspect-[1.25/0.92]"
            : "aspect-[1.18/0.9] sm:aspect-video"
        }`}
      >
        <PortfolioMedia project={project} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04),rgba(17,17,17,0.22))]" />
      </div>

      <div className="flex h-full flex-col p-4.5 sm:p-5 lg:p-6">
        <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          <span>{project.client}</span>
          {project.year ? (
            <>
              <span className="h-1 w-1 rounded-full bg-[var(--line-strong)]" />
              <span>{project.year}</span>
            </>
          ) : null}
        </div>

        <h3 className="card-title mt-3 text-[color:var(--foreground)]">
          {resolveLocalizedValue(project.title, language)}
        </h3>
        <p className="body-copy mt-3 text-[var(--muted-2)] sm:text-base sm:leading-7">
          {resolveLocalizedValue(project.summary, language)}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)]">
            {resolveLocalizedValue(project.format, language)}
          </span>
        </div>

        {project.result ? (
          <p className="mt-4 text-sm leading-6 text-[color:var(--foreground)]/76">
            {resolveLocalizedValue(project.result, language)}
          </p>
        ) : null}

        <div className="mt-auto pt-5">
          <ButtonLink
            href={project.href}
            variant="ghost"
            size="compact"
            className="w-full sm:w-auto"
            target={project.hrefExternal ? "_blank" : undefined}
            rel={project.hrefExternal ? "noreferrer noopener" : undefined}
          >
            {resolveLocalizedValue(project.ctaLabel, language)}
            <ArrowUpRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

function PortfolioMedia({
  project,
  priority = false,
}: {
  project: PortfolioProject;
  priority?: boolean;
}) {
  const { language } = useSitePreferences();

  if (project.video) {
    return (
      <video
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "metadata" : "none"}
        poster={project.video.poster}
      >
        <source src={project.video.src} type="video/mp4" />
      </video>
    );
  }

  if (project.externalVideo) {
    return (
      <Image
        src={project.externalVideo.thumbnailSrc}
        alt={resolveLocalizedValue(project.externalVideo.label, language)}
        fill
        priority={priority}
        sizes={priority ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={
          project.imageAlt
            ? resolveLocalizedValue(project.imageAlt, language)
            : resolveLocalizedValue(project.title, language)
        }
        fill
        priority={priority}
        sizes={priority ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        className={`transition duration-500 group-hover:scale-[1.03] ${
          project.mediaFit === "contain" ? "object-contain p-5 sm:p-6" : "object-cover"
        }`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${
        project.palette ?? "from-[#ece3d8] via-[#d3c4b1] to-[#b89f82]"
      }`}
    />
  );
}
