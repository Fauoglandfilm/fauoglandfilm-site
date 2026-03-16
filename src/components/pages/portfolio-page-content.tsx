"use client";

import Image from "next/image";
import { useState } from "react";

import { ProjectVideoModal } from "@/components/media/project-video-modal";
import { EmbeddedVideoPlayer } from "@/components/media/embedded-video-player";
import { Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { CtaBanner, PageHero } from "@/components/sections/site-sections";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  segmentedControlOptionClassName,
  segmentedControlShellClassName,
} from "@/components/ui/button-styles";
import { ArrowUpRightIcon, PlayIcon } from "@/components/ui/icons";
import {
  portfolioGroups,
  portfolioPageContent,
  portfolioProjects,
  siteConfig,
  type PortfolioGroup,
  type PortfolioProject,
} from "@/data/site-content";
import { getPortfolioFallbackVisual } from "@/data/visual-assets";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ALL_FILTER = "all";
const FEATURED_PROJECT_SLUGS = [
  "nei-til-atomvapen",
  "foreningen-norden-nettsideinnhold",
  "a-message-from-martha",
  "ville-gleder-villmarksforedrag",
] as const;

export function PortfolioPageContent() {
  const { language } = useSitePreferences();
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);

  const showreelProject =
    portfolioProjects.find((project) => project.group === "showreel") ?? portfolioProjects[0];
  const portfolioSections = portfolioGroups.filter((group) => group.slug !== "showreel");
  const allProjects = portfolioProjects.filter((project) => project.group !== "showreel");
  const featuredProjects = FEATURED_PROJECT_SLUGS.map((slug) =>
    portfolioProjects.find((project) => project.slug === slug),
  ).filter((project): project is PortfolioProject => Boolean(project));
  const visibleFeaturedProjects = featuredProjects.length ? featuredProjects : allProjects.slice(0, 4);
  const filteredProjects =
    activeFilter === ALL_FILTER
      ? allProjects
      : allProjects.filter((project) => project.group === activeFilter);
  const activeGroup = portfolioSections.find((group) => group.slug === activeFilter);
  const projectCountLabel =
    language === "no"
      ? `${filteredProjects.length} prosjekter`
      : `${filteredProjects.length} projects`;
  const directPreviewCount = allProjects.filter((project) => project.video?.videoType === "direct").length;
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
  const copy =
    language === "no"
      ? {
          filterAll: "Alle prosjekter",
          featuredEyebrow: "Featured work",
          featuredTitle: "Utvalgte produksjoner med mer format, mer tyngde og tydeligere filmfølelse.",
          featuredDescription:
            "Et håndplukket utvalg på tvers av kampanje, organisasjon, narrativt arbeid og promofilm. Mindre katalog, mer work-page.",
          catalogEyebrow: "Full portefølje",
          catalogTitle: "En premium filmkatalog bygget for raske valg og dypere inntrykk.",
          catalogDescription:
            "Filtrer på kategori, åpne prosjekter direkte og få levende forhåndsvisning på arbeid der vi har direkte videomateriale.",
          catalogHint: "Direkte videoprosjekter får levende preview på desktop.",
          openProject: "Åpne prosjekt",
          openPreview: "Se preview",
          showreelStats: [
            { label: "Kategorier", value: String(portfolioSections.length) },
            { label: "Utvalgte filmer", value: String(allProjects.length) },
            { label: "Levende previews", value: String(directPreviewCount) },
          ],
        }
      : {
          filterAll: "All work",
          featuredEyebrow: "Featured work",
          featuredTitle: "Selected productions with more scale, more texture and a stronger cinematic feel.",
          featuredDescription:
            "A hand-picked selection across campaigns, organisation work, narrative projects and promo films. Less catalog, more work page.",
          catalogEyebrow: "Full portfolio",
          catalogTitle: "A premium film catalog built for quick scanning and deeper project discovery.",
          catalogDescription:
            "Filter by category, open projects directly and get motion previews where direct video material is available.",
          catalogHint: "Direct video projects reveal motion previews on desktop.",
          openProject: "Open project",
          openPreview: "Open preview",
          showreelStats: [
            { label: "Categories", value: String(portfolioSections.length) },
            { label: "Selected films", value: String(allProjects.length) },
            { label: "Motion previews", value: String(directPreviewCount) },
          ],
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
        visualKey="portfolio"
      />

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.16fr_0.84fr]">
            <Reveal>
              <article className="cinematic-panel group overflow-hidden rounded-[2rem] shadow-[0_34px_110px_rgba(0,0,0,0.24)]">
                <div className="media-frame relative aspect-[1.16/0.96] min-h-[18rem] overflow-hidden sm:aspect-[1.3/0.94] lg:min-h-[28rem]">
                  <button
                    type="button"
                    onClick={() => setActiveProject(showreelProject)}
                    className="card-trigger absolute inset-0 z-[3]"
                    aria-label={resolveLocalizedValue(showreelProject.title, language)}
                  />
                  <PortfolioMedia
                    project={showreelProject}
                    priority
                    playMode="always"
                    sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 60vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(8,8,8,0.04),rgba(8,8,8,0.26)_42%,rgba(8,8,8,0.9)_100%)]" />
                  <div className="grain-overlay absolute inset-0 opacity-45" />
                  <div className="absolute inset-x-0 bottom-0 z-[2] p-5 text-white sm:p-7 lg:p-8">
                    <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/54">
                      <span>{showreelProject.client}</span>
                      <span className="h-1 w-1 rounded-full bg-white/24" />
                      <span>{resolveLocalizedValue(showreelProject.format, language)}</span>
                    </div>
                    <h2 className="feature-title mt-3 max-w-2xl">
                      {resolveLocalizedValue(showreelProject.title, language)}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
                      {resolveLocalizedValue(showreelProject.summary, language)}
                    </p>
                  </div>
                  <span className="absolute right-4 top-4 z-[3] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/90 text-[#111111] shadow-[0_16px_40px_rgba(0,0,0,0.24)] backdrop-blur-sm">
                    <PlayIcon className="h-4 w-4 translate-x-[1px]" />
                  </span>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="glass-panel relative flex h-full flex-col overflow-hidden rounded-[2rem] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.2)] sm:p-6 lg:p-7">
                <div className="glass-sheen absolute inset-0 opacity-50" />
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

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {copy.showreelStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4"
                    >
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                        {item.label}
                      </p>
                      <p className="mt-2 font-display text-[1.45rem] text-[color:var(--foreground)]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row sm:flex-wrap">
                  <Button className="w-full sm:w-auto" onClick={() => setActiveProject(showreelProject)}>
                    {resolveLocalizedValue(portfolioPageContent.showreelPrimaryCta, language)}
                  </Button>
                  <ButtonLink href="#portfolio-grid" variant="secondary" className="w-full sm:w-auto">
                    {resolveLocalizedValue(portfolioPageContent.browseCta, language)}
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-1 pt-0 sm:pb-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-3">
                <span className="eyebrow">{copy.featuredEyebrow}</span>
                <h2 className="section-title text-[color:var(--foreground)]">{copy.featuredTitle}</h2>
                <p className="body-lead max-w-2xl text-[var(--muted-2)]">{copy.featuredDescription}</p>
              </div>
              <ButtonLink href="/kontakt" variant="ghost" className="w-full sm:w-auto">
                {resolveLocalizedValue(siteConfig.bookingLabel, language)}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:mt-8">
            {visibleFeaturedProjects[0] ? (
              <Reveal>
                <PortfolioProjectCard
                  project={visibleFeaturedProjects[0]}
                  group={getPortfolioGroup(visibleFeaturedProjects[0].group)}
                  onPreview={() => setActiveProject(visibleFeaturedProjects[0])}
                  layout="wide"
                  previewLabel={copy.openPreview}
                />
              </Reveal>
            ) : null}

            {visibleFeaturedProjects.length > 1 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleFeaturedProjects.slice(1).map((project, index) => (
                  <Reveal key={project.slug} delay={0.05 * (index + 1)}>
                    <PortfolioProjectCard
                      project={project}
                      group={getPortfolioGroup(project.group)}
                      onPreview={() => setActiveProject(project)}
                      layout="default"
                      previewLabel={copy.openPreview}
                    />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="portfolio-grid" className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.18)] sm:p-6 lg:p-7">
              <div className="glass-sheen absolute inset-0 opacity-45" />
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-3">
                  <span className="eyebrow">{copy.catalogEyebrow}</span>
                  <h2 className="section-title text-[color:var(--foreground)]">
                    {activeGroup
                      ? resolveLocalizedValue(activeGroup.title, language)
                      : copy.catalogTitle}
                  </h2>
                  <p className="body-copy max-w-2xl text-[var(--muted-2)] sm:text-base sm:leading-7">
                    {activeGroup
                      ? resolveLocalizedValue(activeGroup.description, language)
                      : copy.catalogDescription}
                  </p>
                </div>
                <div className="space-y-2 lg:text-right">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {projectCountLabel}
                  </p>
                  <p className="text-sm leading-6 text-[var(--muted)]">{copy.catalogHint}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className={segmentedControlShellClassName({ className: "flex flex-wrap gap-2 p-1.5" })}>
                  <button
                    type="button"
                    onClick={() => setActiveFilter(ALL_FILTER)}
                    className={segmentedControlOptionClassName({ active: activeFilter === ALL_FILTER, compact: true })}
                  >
                    <span>{copy.filterAll}</span>
                  </button>
                  {portfolioSections.map((group) => (
                    <button
                      key={group.slug}
                      type="button"
                      onClick={() => setActiveFilter(group.slug)}
                      className={segmentedControlOptionClassName({
                        active: activeFilter === group.slug,
                        compact: true,
                      })}
                    >
                      <span>{resolveLocalizedValue(group.title, language)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={0.03 * index}>
                <PortfolioProjectCard
                  project={project}
                  group={getPortfolioGroup(project.group)}
                  onPreview={() => setActiveProject(project)}
                  layout={index % 5 === 0 ? "wide" : "default"}
                  previewLabel={copy.openProject}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
  group,
  onPreview,
  layout,
  previewLabel,
}: {
  project: PortfolioProject;
  group?: PortfolioGroup;
  onPreview: () => void;
  layout: "default" | "wide";
  previewLabel: string;
}) {
  const { language } = useSitePreferences();
  const hasPlayableVideo = Boolean(
    project.externalVideo || (project.video && project.video.videoType === "direct"),
  );
  const availabilityNote =
    project.video?.videoType === "request"
      ? resolveLocalizedValue(project.video.availabilityNote, language)
      : null;
  const isWide = layout === "wide";

  return (
    <article className={cn("card-surface group overflow-hidden rounded-[1.95rem] shadow-[0_28px_90px_rgba(0,0,0,0.18)]", isWide && "md:col-span-2")}>
      <div className={cn("grid gap-px bg-[color:var(--line)]", isWide && "xl:grid-cols-[1.08fr_0.92fr]")}>
        <div
          className={cn(
            "media-frame relative overflow-hidden",
            isWide
              ? "min-h-[18rem] sm:min-h-[20rem] xl:min-h-[24rem]"
              : project.mediaFit === "contain"
                ? "aspect-[1.06/1] sm:aspect-[1.08/0.94]"
                : "aspect-[1.06/0.92] sm:aspect-[1.12/0.94]",
          )}
        >
          <button
            type="button"
            onClick={onPreview}
            className="card-trigger absolute inset-0 z-[3]"
            aria-label={resolveLocalizedValue(project.title, language)}
          />
          <PortfolioMedia
            project={project}
            playMode={isWide ? "always" : "hover"}
            sizes={
              isWide
                ? "(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
                : "(min-width: 1280px) 26vw, (min-width: 768px) 44vw, 100vw"
            }
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(8,8,8,0.04),rgba(8,8,8,0.24)_44%,rgba(8,8,8,0.88)_100%)]" />
          <div className="grain-overlay absolute inset-0 opacity-45" />
          {group ? (
            <span className="absolute left-4 top-4 z-[3] rounded-full border border-white/14 bg-black/26 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/78 backdrop-blur-xl">
              {resolveLocalizedValue(group.title, language)}
            </span>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 z-[2] p-4 text-white sm:p-5">
            <div className="flex flex-wrap items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/56">
              <span>{project.client}</span>
              {project.year ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/24" />
                  <span>{project.year}</span>
                </>
              ) : null}
            </div>
            <h3 className="mt-3 text-[1.3rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.5rem]">
              {resolveLocalizedValue(project.title, language)}
            </h3>
          </div>
          {hasPlayableVideo ? (
            <span className="absolute right-4 top-4 z-[3] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/90 text-[#111111] shadow-[0_16px_36px_rgba(0,0,0,0.22)] backdrop-blur-sm">
              <PlayIcon className="h-4 w-4 translate-x-[1px]" />
            </span>
          ) : null}
        </div>

        <div className="relative flex h-full flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-5 sm:p-6 lg:p-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[color:var(--line)] bg-white/[0.04] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)] backdrop-blur-xl">
                {resolveLocalizedValue(project.format, language)}
              </span>
              {project.video?.videoType === "direct" ? (
                <span className="rounded-full border border-white/8 bg-white/6 px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {language === "no" ? "Levende preview" : "Motion preview"}
                </span>
              ) : null}
            </div>
            <p className={cn("body-copy text-[var(--muted-2)]", !isWide && "line-clamp-4 sm:line-clamp-3")}>
              {resolveLocalizedValue(project.summary, language)}
            </p>
            {project.result ? (
              <p className="text-sm leading-6 text-[color:var(--foreground)]/72">
                {resolveLocalizedValue(project.result, language)}
              </p>
            ) : null}
            {availabilityNote ? (
              <p className="text-sm leading-6 text-[var(--muted)]">{availabilityNote}</p>
            ) : null}
          </div>

          <div className="mt-auto flex flex-col gap-2.5 pt-5 sm:flex-row sm:flex-wrap">
            <Button className="w-full sm:w-auto" onClick={onPreview}>
              {previewLabel}
            </Button>
            {project.detailHref ? (
              <ButtonLink href={project.detailHref} variant="ghost" className="w-full sm:w-auto">
                {language === "no" ? "Se case" : "View case"}
                <ArrowUpRightIcon className="h-4 w-4" />
              </ButtonLink>
            ) : (
              <ButtonLink href="/kontakt" variant="ghost" className="w-full sm:w-auto">
                {resolveLocalizedValue(siteConfig.bookingLabel, language)}
                <ArrowUpRightIcon className="h-4 w-4" />
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function PortfolioMedia({
  project,
  priority = false,
  playMode = "static",
  sizes,
  className,
}: {
  project: PortfolioProject;
  priority?: boolean;
  playMode?: "static" | "hover" | "always";
  sizes: string;
  className?: string;
}) {
  const { language } = useSitePreferences();
  const fallbackVisual = getPortfolioFallbackVisual(project.group);
  const altText = project.imageAlt
    ? resolveLocalizedValue(project.imageAlt, language)
    : resolveLocalizedValue(project.title, language);
  const imageClassName = cn(
    "object-cover",
    playMode === "hover" && "transition duration-700 md:group-hover:scale-[1.03] md:group-hover:opacity-0",
    playMode === "always" && "transition duration-700 group-hover:scale-[1.03]",
    project.mediaFit === "contain" && "object-contain p-5 sm:p-6",
    className,
  );

  if (project.video?.videoType === "direct" && playMode !== "static") {
    return (
      <>
        {project.image || project.video.poster ? (
          <Image
            src={project.image ?? project.video.poster!}
            alt={altText}
            fill
            priority={priority}
            sizes={sizes}
            className={imageClassName}
          />
        ) : null}

        <video
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            playMode === "hover" ? "hidden opacity-0 transition duration-500 md:block md:group-hover:opacity-100" : "block",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.video.poster}
        >
          <source src={project.video.src} type="video/mp4" />
        </video>
      </>
    );
  }

  if (project.externalVideo && playMode === "always") {
    return (
      <EmbeddedVideoPlayer
        title={project.title}
        externalVideo={project.externalVideo}
        autoplay
        previewMode
        className="absolute inset-0 h-full w-full"
        sizes={sizes}
      />
    );
  }

  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={altText}
        fill
        priority={priority}
        sizes={sizes}
        className={imageClassName}
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
        sizes={sizes}
        className={cn("object-cover transition duration-700 group-hover:scale-[1.03]", className)}
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
        sizes={sizes}
        className={imageClassName}
      />
    );
  }

  return (
    <Image
      src={fallbackVisual.src}
      alt={resolveLocalizedValue(fallbackVisual.alt, language)}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover transition duration-700 group-hover:scale-[1.03]", className)}
    />
  );
}

function getPortfolioGroup(slug: string) {
  return portfolioGroups.find((group) => group.slug === slug);
}
