"use client";

import Image from "next/image";
import { useState } from "react";

import { ProjectVideoModal } from "@/components/media/project-video-modal";
import { Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { CtaBanner, PageHero } from "@/components/sections/site-sections";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon, PlayIcon } from "@/components/ui/icons";
import {
  portfolioGroups,
  portfolioPageContent,
  portfolioProjects,
  siteConfig,
  type PortfolioProject,
} from "@/data/site-content";
import { getPortfolioFallbackVisual } from "@/data/visual-assets";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

export function PortfolioPageContent() {
  const { language } = useSitePreferences();
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const featureProject =
    portfolioProjects.find((project) => project.featured) ?? portfolioProjects[0];
  const groupedProjects = portfolioGroups
    .map((group) => ({
      ...group,
      projects: portfolioProjects.filter((project) => project.group === group.slug),
    }))
    .filter((group) => group.projects.length > 0);
  const portfolioSections = groupedProjects.filter((group) => group.slug !== "showreel");
  const projectCountLabel =
    language === "no" ? `${portfolioProjects.length} prosjekter` : `${portfolioProjects.length} projects`;
  const modalPrimaryAction = activeProject?.detailHref
    ? {
        href: activeProject.detailHref,
        label: { no: "Se case", en: "View case" },
      }
    : {
        href: "/kontakt",
        label: siteConfig.bookingLabel,
      };
  const modalSecondaryAction = activeProject?.detailHref
    ? {
        href: "/kontakt",
        label: siteConfig.bookingLabel,
      }
    : {
        href: "/case",
        label: { no: "Se flere prosjekter", en: "See more projects" },
      };

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
                  <button
                    type="button"
                    onClick={() => setActiveProject(featureProject)}
                    className="card-trigger absolute inset-0 z-[2]"
                    aria-label={resolveLocalizedValue(featureProject.title, language)}
                  />
                  <PortfolioMedia project={featureProject} priority />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.08),rgba(17,17,17,0.24))]" />
                  <span className="absolute right-4 top-4 z-[3] inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/6 bg-white/88 text-[#111111] shadow-[0_10px_24px_rgba(17,17,17,0.12)] backdrop-blur-sm">
                    <PlayIcon className="h-4 w-4 translate-x-[1px]" />
                  </span>
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
                  <Button className="w-full sm:w-auto" onClick={() => setActiveProject(featureProject)}>
                    {resolveLocalizedValue(portfolioPageContent.showreelPrimaryCta, language)}
                  </Button>
                  <ButtonLink href="/kontakt" variant="secondary" className="w-full sm:w-auto">
                    {resolveLocalizedValue(portfolioPageContent.showreelSecondaryCta, language)}
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="portfolio-grid" className="pb-1 pt-0 sm:pb-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="card-surface rounded-[1.8rem] p-5 sm:p-6 lg:p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-3">
                  <span className="eyebrow">
                    {resolveLocalizedValue(portfolioPageContent.eyebrow, language)}
                  </span>
                  <h2 className="section-title text-[color:var(--foreground)]">
                    {resolveLocalizedValue(portfolioPageContent.title, language)}
                  </h2>
                  <p className="body-copy max-w-2xl text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {resolveLocalizedValue(portfolioPageContent.description, language)}
                  </p>
                </div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {projectCountLabel}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {portfolioSections.map((group) => (
                  <ButtonLink
                    key={group.slug}
                    href={`#group-${group.slug}`}
                    variant="ghost"
                    size="compact"
                    className="w-full justify-center sm:w-auto"
                  >
                    {resolveLocalizedValue(group.title, language)}
                  </ButtonLink>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div>
        {portfolioSections.map((group, groupIndex) => (
          <section
            key={group.slug}
            id={`group-${group.slug}`}
            className={groupIndex === 0 ? "section-space pt-0" : "section-space"}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
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
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {language === "no"
                    ? `${group.projects.length} prosjekter`
                    : `${group.projects.length} projects`}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2 lg:grid-cols-3">
                {group.projects.map((project, index) => (
                  <Reveal key={project.slug} delay={0.04 * index}>
                    <PortfolioProjectCard project={project} onPreview={() => setActiveProject(project)} />
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

      <ProjectVideoModal
        open={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
        client={activeProject?.client}
        title={activeProject?.title ?? { no: "", en: "" }}
        summary={activeProject?.summary}
        format={activeProject?.format}
        year={activeProject?.year}
        video={activeProject?.video}
        externalVideo={activeProject?.externalVideo}
        image={activeProject?.image}
        imageAlt={activeProject?.imageAlt}
        mediaFit={activeProject?.mediaFit}
        primaryAction={modalPrimaryAction}
        secondaryAction={modalSecondaryAction}
      />
    </main>
  );
}

function PortfolioProjectCard({
  project,
  onPreview,
}: {
  project: PortfolioProject;
  onPreview: () => void;
}) {
  const { language } = useSitePreferences();
  const hasPlayableVideo = Boolean(
    project.externalVideo || (project.video && project.video.videoType === "direct"),
  );
  const availabilityNote =
    project.video?.videoType === "request"
      ? resolveLocalizedValue(project.video.availabilityNote, language)
      : null;

  return (
    <article className="card-surface overflow-hidden rounded-[1.8rem]">
      <button
        type="button"
        onClick={onPreview}
        className="card-trigger group flex h-full w-full flex-col text-left"
        aria-label={resolveLocalizedValue(project.title, language)}
      >
        <div
          className={`relative overflow-hidden ${
            project.mediaFit === "contain"
              ? "aspect-[1.16/0.96] bg-[#1d1718] sm:aspect-[1.25/0.92]"
              : "aspect-[1.18/0.9] sm:aspect-video"
          }`}
        >
          <PortfolioMedia project={project} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04),rgba(17,17,17,0.22))]" />
          {hasPlayableVideo ? (
            <span className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/6 bg-white/84 text-[#111111] shadow-[0_10px_24px_rgba(17,17,17,0.12)] backdrop-blur-sm">
              <PlayIcon className="h-4 w-4 translate-x-[1px]" />
            </span>
          ) : null}
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
            <p className="mt-4 border-t border-[color:var(--line)] pt-4 text-sm leading-6 text-[color:var(--foreground)]/76">
              {resolveLocalizedValue(project.result, language)}
            </p>
          ) : null}

          {availabilityNote ? (
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              {availabilityNote}
            </p>
          ) : null}

          <div className="mt-auto pt-5 text-sm font-semibold text-[color:var(--foreground)]">
            {language === "no" ? "Klikk for å se prosjektet" : "Click to open the project"}
          </div>
        </div>
      </button>

      <div className="px-4.5 pb-5 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
        {project.detailHref ? (
          <ButtonLink href={project.detailHref} variant="ghost" size="compact" className="w-full sm:w-auto">
            {language === "no" ? "Se case" : "View case"}
            <ArrowUpRightIcon className="h-4 w-4" />
          </ButtonLink>
        ) : (
          <ButtonLink href="/kontakt" variant="ghost" size="compact" className="w-full sm:w-auto">
            {resolveLocalizedValue(siteConfig.bookingLabel, language)}
            <ArrowUpRightIcon className="h-4 w-4" />
          </ButtonLink>
        )}
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
  const fallbackVisual = getPortfolioFallbackVisual(project.group);

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
        sizes={
          priority
            ? "(min-width: 1280px) 36vw, (min-width: 1024px) 58vw, 100vw"
            : "(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
        }
        className={`transition duration-500 group-hover:scale-[1.03] ${
          project.mediaFit === "contain" ? "object-contain p-5 sm:p-6" : "object-cover"
        }`}
      />
    );
  }

  if (project.externalVideo) {
    return (
      <Image
        src={project.externalVideo.thumbnailSrc}
        alt={resolveLocalizedValue(project.externalVideo.label, language)}
        fill
        priority={priority}
        sizes={
          priority
            ? "(min-width: 1280px) 36vw, (min-width: 1024px) 58vw, 100vw"
            : "(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
        }
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  if (project.video?.poster) {
    return (
      <Image
        src={project.video.poster}
        alt={resolveLocalizedValue(project.video.label, language)}
        fill
        priority={priority}
        sizes={
          priority
            ? "(min-width: 1280px) 36vw, (min-width: 1024px) 58vw, 100vw"
            : "(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
        }
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <Image
      src={fallbackVisual.src}
      alt={resolveLocalizedValue(fallbackVisual.alt, language)}
      fill
      priority={priority}
      sizes={
        priority
          ? "(min-width: 1280px) 36vw, (min-width: 1024px) 58vw, 100vw"
          : "(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
      }
      className="object-cover transition duration-500 group-hover:scale-[1.03]"
    />
  );
}
