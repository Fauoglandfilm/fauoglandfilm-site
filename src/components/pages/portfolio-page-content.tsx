"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { PreviewMedia } from "@/components/media/preview-media";
import { Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { CtaBanner, PageHero } from "@/components/sections/site-sections";
import {
  segmentedControlOptionClassName,
  segmentedControlShellClassName,
} from "@/components/ui/button-styles";
import {
  portfolioGroups,
  portfolioPageContent,
  portfolioProjects,
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

export function PortfolioPageContent({
  projects = portfolioProjects,
  groups = portfolioGroups,
}: {
  projects?: PortfolioProject[];
  groups?: PortfolioGroup[];
}) {
  const { language } = useSitePreferences();
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);

  const showreelProject =
    projects.find((project) => project.group === "showreel") ?? projects[0];
  const portfolioSections = groups.filter((group) => group.slug !== "showreel");
  const allProjects = projects.filter((project) => project.group !== "showreel");
  const featuredProjects = FEATURED_PROJECT_SLUGS.map((slug) =>
    projects.find((project) => project.slug === slug),
  ).filter((project): project is PortfolioProject => Boolean(project));
  const visibleFeaturedProjects = featuredProjects.length ? featuredProjects : allProjects.slice(0, 4);
  const featuredProjectSlugs = new Set(visibleFeaturedProjects.map((project) => project.slug));
  const filteredProjects =
    activeFilter === ALL_FILTER
      ? allProjects.filter((project) => !featuredProjectSlugs.has(project.slug))
      : allProjects.filter((project) => project.group === activeFilter);
  const activeGroup = portfolioSections.find((group) => group.slug === activeFilter);
  const projectCountLabel =
    language === "no"
      ? `${filteredProjects.length} prosjekter`
      : `${filteredProjects.length} projects`;

  const copy =
    language === "no"
      ? {
          filterAll: "Alle prosjekter",
          featuredEyebrow: "Featured work",
          featuredTitle: "Utvalgte produksjoner",
          catalogEyebrow: "Full portefølje",
          catalogTitle: "Hele porteføljen",
          catalogDescription:
            "Filtrer på kategori og scroll gjennom arbeidet direkte i siden.",
        }
      : {
          filterAll: "All work",
          featuredEyebrow: "Featured work",
          featuredTitle: "Selected productions",
          catalogEyebrow: "Full portfolio",
          catalogTitle: "The full portfolio",
          catalogDescription:
            "Filter by category and scroll through the work directly on the page.",
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
        <div className="site-container">
          <div className="grid gap-4 lg:grid-cols-[1.16fr_0.84fr]">
            <Reveal>
              <article className="card-surface group overflow-hidden rounded-[2rem] shadow-[0_20px_56px_rgba(18,14,10,0.1)]">
                <div className="media-frame relative aspect-video min-h-[13rem] overflow-hidden sm:min-h-[18rem] lg:min-h-[28rem]">
                  {getPortfolioCardHref(showreelProject) ? (
                    <Link
                      href={getPortfolioCardHref(showreelProject)!}
                      target={opensExternally(showreelProject) ? "_blank" : undefined}
                      rel={opensExternally(showreelProject) ? "noreferrer" : undefined}
                      className="card-trigger absolute inset-0 z-[3]"
                      aria-label={resolveLocalizedValue(showreelProject.title, language)}
                    />
                  ) : null}
                  <PortfolioMedia
                    project={showreelProject}
                    priority
                    playMode="featured"
                    inViewThreshold={0.14}
                    rootMargin="300px 0px -4% 0px"
                    sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 60vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(8,8,8,0.02),rgba(8,8,8,0.12)_44%,rgba(8,8,8,0.56)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 z-[2] p-5 text-white sm:p-7 lg:p-8">
                    <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/54">
                      <span>{showreelProject.client}</span>
                      <span className="h-1 w-1 rounded-full bg-white/24" />
                      <span>{resolveLocalizedValue(showreelProject.format, language)}</span>
                    </div>
                    <h2 className="feature-title mt-3 max-w-2xl">
                      {resolveLocalizedValue(showreelProject.title, language)}
                    </h2>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="card-surface relative flex h-full flex-col overflow-hidden rounded-[2rem] p-5 shadow-[0_18px_48px_rgba(18,14,10,0.08)] sm:p-6 lg:p-7">
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
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-1 pt-0 sm:pb-2">
        <div className="site-container">
          <Reveal>
            <div className="max-w-3xl space-y-3">
              <span className="eyebrow">{copy.featuredEyebrow}</span>
              <h2 className="section-title text-[color:var(--foreground)]">{copy.featuredTitle}</h2>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:mt-8">
            {visibleFeaturedProjects[0] ? (
              <Reveal>
                <PortfolioProjectCard
                  project={visibleFeaturedProjects[0]}
                  group={getPortfolioGroup(visibleFeaturedProjects[0].group)}
                  layout="wide"
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
                      layout="default"
                    />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="portfolio-grid" className="section-space pt-0">
        <div className="site-container">
          <Reveal>
            <div className="card-surface relative overflow-hidden rounded-[2rem] p-5 shadow-[0_18px_48px_rgba(18,14,10,0.08)] sm:p-6 lg:p-7">
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
                  layout={index % 6 === 0 ? "wide" : "default"}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={portfolioPageContent.footerTitle}
        description={portfolioPageContent.footerDescription}
        primaryLabel={{
          no: "Send en kort brief",
          en: "Send a short brief",
        }}
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}

function PortfolioProjectCard({
  project,
  group,
  layout,
}: {
  project: PortfolioProject;
  group?: PortfolioGroup;
  layout: "default" | "wide";
}) {
  const { language } = useSitePreferences();
  const isWide = layout === "wide";
  const href = getPortfolioCardHref(project);
  const external = opensExternally(project);

  return (
    <article
      className={cn(
        "card-surface group overflow-hidden rounded-[1.95rem] shadow-[0_28px_90px_rgba(0,0,0,0.18)]",
        isWide && "md:col-span-2",
      )}
    >
      <div
        className={cn(
          "media-frame relative overflow-hidden",
          isWide
            ? "min-h-[20rem] sm:min-h-[23rem] xl:min-h-[27rem]"
            : project.mediaFit === "contain"
              ? "aspect-[1.08/1.02] sm:aspect-[1.1/0.96]"
              : "aspect-[1.08/0.94] sm:aspect-[1.14/0.98]",
        )}
      >
        {href ? (
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="card-trigger absolute inset-0 z-[3]"
            aria-label={resolveLocalizedValue(project.title, language)}
          />
        ) : null}

        <PortfolioMedia
          project={project}
          playMode="viewport"
          inViewThreshold={isWide ? 0.26 : 0.38}
          rootMargin={isWide ? "220px 0px -10% 0px" : "160px 0px -14% 0px"}
          sizes={
            isWide
              ? "(min-width: 1280px) 64vw, (min-width: 768px) 72vw, 100vw"
              : "(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 100vw"
          }
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_32%),linear-gradient(180deg,rgba(8,8,8,0.01),rgba(8,8,8,0.08)_46%,rgba(8,8,8,0.52)_100%)]" />

        {group ? (
          <span className="absolute left-4 top-4 z-[2] rounded-full border border-white/12 bg-black/24 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/78">
            {resolveLocalizedValue(group.title, language)}
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 z-[2] p-4 text-white sm:p-5">
          <div className="flex flex-wrap items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/60">
            <span>{project.client}</span>
            {project.year ? (
              <>
                <span className="h-1 w-1 rounded-full bg-white/24" />
                <span>{project.year}</span>
              </>
            ) : null}
          </div>
          <h3 className="mt-3 max-w-[18ch] text-[1.34rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.56rem]">
            {resolveLocalizedValue(project.title, language)}
          </h3>
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
  rootMargin,
  inViewThreshold,
}: {
  project: PortfolioProject;
  priority?: boolean;
  playMode?: "static" | "viewport" | "featured";
  sizes: string;
  className?: string;
  rootMargin?: string;
  inViewThreshold?: number;
}) {
  const { language } = useSitePreferences();
  const fallbackVisual = getPortfolioFallbackVisual(project.group);
  const altText = project.imageAlt
    ? resolveLocalizedValue(project.imageAlt, language)
    : resolveLocalizedValue(project.title, language);
  const imageClassName = cn(
    "object-cover",
    "transition duration-700",
    playMode !== "static" && "group-hover:scale-[1.03]",
    project.mediaFit === "contain" && "object-contain p-5 sm:p-6",
    className,
  );

  const previewBehavior = playMode === "static" ? "static" : "viewport";

  if (
    ((project.video && project.video.videoType === "direct") || project.externalVideo) &&
    playMode !== "static"
  ) {
    return (
      <PreviewMedia
        title={project.title}
        video={project.video}
        externalVideo={project.externalVideo}
        image={project.image}
        imageAlt={project.imageAlt}
        mediaFit={project.mediaFit}
        previewBehavior={previewBehavior}
        className="absolute inset-0"
        sizes={sizes}
        priority={priority}
        rootMargin={rootMargin}
        inViewThreshold={inViewThreshold}
        posterClassName={imageClassName}
        previewClassName={cn("scale-[1.01]", project.mediaFit === "contain" && "object-contain p-5 sm:p-6")}
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

function getPortfolioCardHref(project: PortfolioProject) {
  return project.detailHref ?? project.externalVideo?.sourceUrl ?? null;
}

function opensExternally(project: PortfolioProject) {
  return !project.detailHref && Boolean(project.externalVideo?.sourceUrl);
}

function getPortfolioGroup(slug: string) {
  return portfolioGroups.find((group) => group.slug === slug);
}
