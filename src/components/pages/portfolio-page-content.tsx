"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { PreviewMedia } from "@/components/media/preview-media";
import { Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { CtaBanner, PageHero, ServicesSection } from "@/components/sections/site-sections";
import {
  segmentedControlOptionClassName,
  segmentedControlShellClassName,
} from "@/components/ui/button-styles";
import { OverlayCloseButton } from "@/components/ui/overlay-close-button";
import {
  portfolioGroups,
  portfolioPageContent,
  portfolioProjects,
  serviceAreas,
  type ExternalVideoAsset,
  type PortfolioGroup,
  type PortfolioProject,
  type VideoAsset,
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

type PortfolioModalMedia =
  | {
      kind: "direct";
      src: string;
      poster?: string;
    }
  | {
      kind: "external";
      provider: "youtube" | "vimeo";
      iframeSrc: string;
    };

function getPortfolioDirectVideo(project: PortfolioProject): Extract<VideoAsset, { videoType: "direct" }> | null {
  if (project.video?.videoType === "direct") {
    return project.video;
  }

  if (project.slug === "liten-bedrift") {
    return {
      videoType: "direct",
      src: "/assets/services/videos/bedriftfilm.mp4",
      poster: project.image,
      label: project.video?.label ?? project.title,
      hasEmbeddedText: false,
    };
  }

  return null;
}

function buildPortfolioModalIframeSrc(video: ExternalVideoAsset) {
  const url = new URL(video.embedUrl);

  if (video.provider === "youtube") {
    url.hostname = "www.youtube-nocookie.com";
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("playsinline", "1");
    url.searchParams.set("autoplay", "0");
    url.searchParams.set("mute", "0");
    url.searchParams.set("controls", "1");
    url.searchParams.set("fs", "1");
  }

  if (video.provider === "vimeo") {
    url.searchParams.set("autoplay", "0");
    url.searchParams.set("muted", "0");
    url.searchParams.set("title", "0");
    url.searchParams.set("byline", "0");
    url.searchParams.set("portrait", "0");
    url.searchParams.set("dnt", "1");
    url.searchParams.delete("background");
  }

  return url.toString();
}

function resolvePortfolioModalMedia(project: PortfolioProject): PortfolioModalMedia | null {
  const directVideo = getPortfolioDirectVideo(project);

  if (directVideo) {
    return {
      kind: "direct",
      src: directVideo.fullSrc ?? directVideo.src,
      poster: directVideo.poster ?? project.image,
    };
  }

  if (project.externalVideo) {
    return {
      kind: "external",
      provider: project.externalVideo.provider,
      iframeSrc: buildPortfolioModalIframeSrc(project.externalVideo),
    };
  }

  return null;
}

function getPortfolioProjectInfoPoints(
  project: PortfolioProject,
  group: PortfolioGroup | undefined,
  language: "no" | "en",
) {
  const points = [
    ...(project.deliverables?.map((item) => resolveLocalizedValue(item, language)) ?? []),
    ...(project.awards?.map((item) => resolveLocalizedValue(item, language)) ?? []),
    ...(project.festivals?.map((item) => resolveLocalizedValue(item, language)) ?? []),
    resolveLocalizedValue(project.format, language),
    project.year,
    group ? resolveLocalizedValue(group.title, language) : null,
  ].filter((value, index, array): value is string => Boolean(value) && array.indexOf(value) === index);

  return points.slice(0, 2);
}

function getPortfolioProjectDetailPoints(
  project: PortfolioProject,
  group: PortfolioGroup | undefined,
  language: "no" | "en",
) {
  return [
    ...(project.deliverables?.map((item) => resolveLocalizedValue(item, language)) ?? []),
    ...(project.awards?.map((item) => resolveLocalizedValue(item, language)) ?? []),
    ...(project.festivals?.map((item) => resolveLocalizedValue(item, language)) ?? []),
    resolveLocalizedValue(project.format, language),
    project.year,
    group ? resolveLocalizedValue(group.title, language) : null,
  ].filter((value, index, array): value is string => Boolean(value) && array.indexOf(value) === index);
}

function getPortfolioShortDescription(project: PortfolioProject, language: "no" | "en") {
  return resolveLocalizedValue(project.shortDescription ?? project.summary, language);
}

function getPortfolioExtendedDescription(project: PortfolioProject, language: "no" | "en") {
  return resolveLocalizedValue(project.extendedDescription ?? project.result ?? project.summary, language);
}

function shortenPortfolioText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  const shortened = value.slice(0, maxLength).trimEnd();
  const boundary = Math.max(shortened.lastIndexOf(" "), maxLength * 0.6);

  return `${shortened.slice(0, boundary).trimEnd()}...`;
}

function getPortfolioTeaserLine(project: PortfolioProject, language: "no" | "en") {
  return shortenPortfolioText(getPortfolioShortDescription(project, language), 68);
}

function getPortfolioCardAspectClass(index: number) {
  const compactAspectCycle = [
    "aspect-[1.24/0.86]",
    "aspect-[1.06/0.98]",
    "aspect-[1.18/0.9]",
    "aspect-[1.08/1]",
  ] as const;

  return compactAspectCycle[index % compactAspectCycle.length];
}

export function PortfolioPageContent({
  projects = portfolioProjects,
  groups = portfolioGroups,
}: {
  projects?: PortfolioProject[];
  groups?: PortfolioGroup[];
}) {
  const { language } = useSitePreferences();
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

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

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

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
          <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <article className="card-surface group overflow-hidden rounded-[1.6rem] shadow-[0_16px_40px_rgba(18,14,10,0.08)]">
                <div className="media-frame relative aspect-[1.3/0.92] min-h-[11rem] overflow-hidden sm:min-h-[13rem] lg:min-h-[15.5rem]">
                  {getPortfolioCardHref(showreelProject) ? (
                    <button
                      type="button"
                      onClick={() => setActiveProject(showreelProject)}
                      className="card-trigger absolute inset-0 z-[3]"
                      aria-label={resolveLocalizedValue(showreelProject.title, language)}
                    />
                  ) : null}
                  <PortfolioMedia
                    project={showreelProject}
                    priority
                    playMode="featured"
                    cropToFrame
                    inViewThreshold={0.14}
                    rootMargin="300px 0px -4% 0px"
                    sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 60vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(8,8,8,0.02),rgba(8,8,8,0.12)_44%,rgba(8,8,8,0.56)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 z-[2] p-4 text-white sm:p-5 lg:p-5.5">
                    <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/54">
                      <span>{showreelProject.client}</span>
                      <span className="h-1 w-1 rounded-full bg-white/24" />
                      <span>{resolveLocalizedValue(showreelProject.format, language)}</span>
                    </div>
                    <h2 className="mt-2 max-w-[12ch] text-[1.7rem] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[2rem]">
                      {resolveLocalizedValue(showreelProject.title, language)}
                    </h2>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="card-surface relative flex h-full flex-col overflow-hidden rounded-[1.6rem] p-4 shadow-[0_16px_40px_rgba(18,14,10,0.07)] sm:p-5 lg:p-5.5">
                <div className="space-y-2">
                  <span className="eyebrow">
                    {resolveLocalizedValue(portfolioPageContent.showreelEyebrow, language)}
                  </span>
                  <h2 className="text-[1.6rem] font-semibold leading-[0.94] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2rem]">
                    {resolveLocalizedValue(portfolioPageContent.showreelTitle, language)}
                  </h2>
                  <p className="max-w-xl text-[0.92rem] leading-6 text-[var(--muted-2)] sm:text-[0.96rem]">
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
            <div className="max-w-3xl space-y-2">
              <span className="eyebrow">{copy.featuredEyebrow}</span>
              <h2 className="section-title text-[color:var(--foreground)]">{copy.featuredTitle}</h2>
            </div>
          </Reveal>

          <div className="mt-4 columns-1 gap-4 xl:columns-2 xl:gap-4 [column-fill:_balance]">
            {visibleFeaturedProjects.map((project, index) => (
              <div key={project.slug} className="mb-4 break-inside-avoid">
                <Reveal delay={0.04 * index}>
                  <PortfolioProjectCard
                    project={project}
                    group={getPortfolioGroup(project.group)}
                    index={index}
                    onOpen={setActiveProject}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio-grid" className="section-space pt-0">
        <div className="site-container">
          <Reveal>
            <div className="card-surface relative overflow-hidden rounded-[1.6rem] p-4 shadow-[0_16px_40px_rgba(18,14,10,0.07)] sm:p-5 lg:p-5.5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-2">
                  <span className="eyebrow">{copy.catalogEyebrow}</span>
                  <h2 className="section-title text-[color:var(--foreground)]">
                    {activeGroup
                      ? resolveLocalizedValue(activeGroup.title, language)
                      : copy.catalogTitle}
                  </h2>
                  <p className="max-w-2xl text-[0.92rem] leading-6 text-[var(--muted-2)] sm:text-[0.96rem]">
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

              <div className="mt-4">
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

          <div className="mt-4 columns-1 gap-4 xl:columns-2 xl:gap-4 [column-fill:_balance]">
            {filteredProjects.map((project, index) => (
              <div key={project.slug} className="mb-4 break-inside-avoid">
                <Reveal delay={0.02 * index}>
                  <PortfolioProjectCard
                    project={project}
                    group={getPortfolioGroup(project.group)}
                    index={index}
                    onOpen={setActiveProject}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection
        services={serviceAreas}
        title={{
          no: uiCopy.pages.no.servicesSectionTitle,
          en: uiCopy.pages.en.servicesSectionTitle,
        }}
        description={{
          no: uiCopy.pages.no.servicesSectionDescription,
          en: uiCopy.pages.en.servicesSectionDescription,
        }}
      />

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

      {activeProject ? (
        <PortfolioVideoModal
          key={activeProject.slug}
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      ) : null}
    </main>
  );
}

function PortfolioProjectCard({
  project,
  group,
  index,
  onOpen,
}: {
  project: PortfolioProject;
  group?: PortfolioGroup;
  index: number;
  onOpen: (project: PortfolioProject) => void;
}) {
  const { language } = useSitePreferences();
  const canOpen = Boolean(project.video || project.externalVideo || project.image);
  const title = resolveLocalizedValue(project.title, language);
  const summary = getPortfolioTeaserLine(project, language);
  const infoPoints = getPortfolioProjectInfoPoints(project, group, language);
  const formatLabel = resolveLocalizedValue(project.format, language);
  const groupTitle = group ? resolveLocalizedValue(group.title, language) : null;
  const detailLabel = language === "no" ? "Åpne prosjekt" : "Open project";
  const detailHint =
    language === "no" ? "Se video, beskrivelser og leveranser" : "View video, description and deliverables";
  const visibleInfoPoints = infoPoints.slice(0, 1);
  const hoverInfoPoints = infoPoints.slice(1, 3);
  const mediaAspectClass = getPortfolioCardAspectClass(index);

  return (
    <article
      className="group relative overflow-hidden rounded-[1.45rem] border border-[color:var(--line)]/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] shadow-[0_12px_30px_rgba(18,14,10,0.06)] backdrop-blur-[18px]"
    >
      {canOpen ? (
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="card-trigger absolute inset-0 z-[5]"
          aria-label={title}
        />
      ) : null}

      <div className="flex min-h-0 flex-col">
        <div className={cn("relative overflow-hidden bg-[#0a0d12]", mediaAspectClass)}>
          <PortfolioMedia
            project={project}
            playMode="viewport"
            cropToFrame
            inViewThreshold={0.22}
            rootMargin="180px 0px -10% 0px"
            sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 50vw, 100vw"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(8,8,8,0.02),rgba(8,8,8,0.1)_40%,rgba(8,8,8,0.3)_100%)]" />

          {groupTitle ? (
            <span className="absolute left-3 top-3 z-[2] rounded-full border border-white/12 bg-black/16 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/76">
              {groupTitle}
            </span>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-4 p-3.5 text-white sm:p-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-white/58">
                <span>{project.client}</span>
                {project.year ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/24" />
                    <span>{project.year}</span>
                  </>
                ) : null}
              </div>
            </div>
            {canOpen ? (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.08)] shadow-[0_10px_22px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            ) : null}
          </div>

          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-[3] hidden translate-y-2 rounded-[1rem] border border-white/12 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.22))] px-3 py-2.5 text-white opacity-0 shadow-[0_16px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 lg:block">
            <p className="text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-white/54">
              {detailLabel}
            </p>
            <p className="mt-1 text-[0.74rem] leading-5 text-white/82">
              {detailHint}
            </p>
            {hoverInfoPoints.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {hoverInfoPoints.map((point) => (
                  <span
                    key={`${project.slug}-hover-${point}`}
                    className="rounded-full border border-white/10 bg-white/8 px-2 py-0.75 text-[0.54rem] font-semibold uppercase tracking-[0.12em] text-white/74"
                  >
                    {point}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-col gap-3 px-3.5 py-3.5 sm:px-4 sm:py-4">
          <div className="flex flex-wrap items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {formatLabel ? (
              <span>{formatLabel}</span>
            ) : null}
            {formatLabel && groupTitle ? (
              <>
                <span className="h-1 w-1 rounded-full bg-[color:var(--line-strong)]" />
                <span>{groupTitle}</span>
              </>
            ) : null}
            {project.year ? (
              <>
                {(formatLabel || groupTitle) ? <span className="h-1 w-1 rounded-full bg-[color:var(--line-strong)]" /> : null}
                <span>{project.year}</span>
              </>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <h3 className="max-w-[12ch] text-[1.3rem] font-semibold leading-[0.94] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[1.45rem]">
              {title}
            </h3>
            <p className="max-w-[34rem] text-[0.84rem] leading-5 text-[var(--muted-2)]">
              {summary}
            </p>
          </div>

          {visibleInfoPoints.length ? (
            <div className="flex flex-wrap gap-1.5">
              {visibleInfoPoints.map((point) => (
                <span
                  key={`${project.slug}-${point}`}
                  className="rounded-full border border-[color:var(--line)]/80 bg-white/[0.04] px-2.25 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted-2)]"
                >
                  {point}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function PortfolioVideoModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(project.title, language);
  const summary = getPortfolioShortDescription(project, language);
  const extendedDescription = getPortfolioExtendedDescription(project, language);
  const result = project.result ? resolveLocalizedValue(project.result, language) : null;
  const deliverables = project.deliverables?.map((item) => resolveLocalizedValue(item, language)) ?? [];
  const awards = project.awards?.map((item) => resolveLocalizedValue(item, language)) ?? [];
  const festivals = project.festivals?.map((item) => resolveLocalizedValue(item, language)) ?? [];
  const credits = project.credits ?? [];
  const quoteText = project.quote ? resolveLocalizedValue(project.quote.text, language) : null;
  const quoteAttribution = project.quote?.attribution
    ? resolveLocalizedValue(project.quote.attribution, language)
    : null;
  const modalGroup = getPortfolioGroup(project.group);
  const modalInfoPoints = getPortfolioProjectDetailPoints(project, modalGroup, language);
  const productionContext = [
    { label: language === "no" ? "Kunde" : "Client", value: project.client },
    { label: language === "no" ? "Format" : "Format", value: resolveLocalizedValue(project.format, language) },
    {
      label: language === "no" ? "Kategori" : "Category",
      value: modalGroup ? resolveLocalizedValue(modalGroup.title, language) : null,
    },
    { label: language === "no" ? "Ar" : "Year", value: project.year ?? null },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const modalLabel = language === "no" ? "Lukk video" : "Close video";
  const modalMedia = resolvePortfolioModalMedia(project);
  const isDirectVideo = modalMedia?.kind === "direct";
  const infoButtonLabel = language === "no" ? "Prosjektinfo" : "Project info";
  const infoButtonHint = isInfoOpen
    ? language === "no"
      ? "Skjul detaljer"
      : "Hide details"
    : language === "no"
      ? "Se festivaler, crew og leveranse"
      : "See festivals, crew and deliverables";


  useEffect(() => {
    const node = videoRef.current;

    if (!node || !isDirectVideo) {
      return;
    }

    node.currentTime = 0;
    node.defaultMuted = false;
    node.muted = false;
    void node.play().catch(() => undefined);
  }, [isDirectVideo, project.slug]);

  return (
    <div
      className="fixed inset-0 z-[80] flex h-[100dvh] max-h-[100dvh] items-start justify-center overflow-hidden overscroll-none bg-[#040507]/72 p-0 backdrop-blur-md sm:p-5 lg:items-center lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        className="relative flex h-full max-h-full w-full items-center justify-center bg-transparent"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsInfoOpen((current) => !current);
          }}
          className="absolute left-[max(env(safe-area-inset-left),0.85rem)] top-[max(env(safe-area-inset-top),0.85rem)] z-[3] inline-flex min-w-[12.25rem] items-center gap-3 rounded-[1.2rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))] px-3.5 py-3 text-left text-white shadow-[0_18px_42px_rgba(0,0,0,0.2)] backdrop-blur-xl transition duration-300 hover:border-white/22 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.1))] sm:left-[max(env(safe-area-inset-left),1rem)] sm:top-[max(env(safe-area-inset-top),1rem)] sm:min-w-[13.5rem]"
          aria-expanded={isInfoOpen}
          aria-label={language === "no" ? "Vis prosjektinfo" : "Show project info"}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/22">
            <Info className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/54">
              {infoButtonLabel}
            </span>
            <span className="mt-1 block text-[0.8rem] font-semibold tracking-[-0.02em] text-white">
              {infoButtonHint}
            </span>
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8">
            {isInfoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        </button>

        <OverlayCloseButton
          onClick={onClose}
          label={modalLabel}
          side="right"
          className="top-[max(env(safe-area-inset-top),0.85rem)] right-[max(env(safe-area-inset-right),0.85rem)] h-12 w-12 sm:top-[max(env(safe-area-inset-top),1rem)] sm:right-[max(env(safe-area-inset-right),1rem)] sm:h-11 sm:w-11"
        />

        <div
          className={cn(
            "pointer-events-none absolute inset-x-3 bottom-[max(env(safe-area-inset-bottom),0.85rem)] z-[2] flex h-[min(34rem,calc(100dvh-7rem))] min-h-0 max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-[1.45rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] text-white shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 sm:inset-x-auto sm:bottom-auto sm:left-[max(env(safe-area-inset-left),1rem)] sm:top-[calc(max(env(safe-area-inset-top),1rem)+4.75rem)] sm:h-[min(42rem,calc(100dvh-7.25rem))] sm:w-[27rem] sm:max-h-[calc(100dvh-7.25rem)]",
            isInfoOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 sm:-translate-x-3 sm:translate-y-0",
            isInfoOpen && "pointer-events-auto",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className="portfolio-modal-scroll h-full min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 pr-3.5 touch-pan-y sm:px-4 sm:py-4 sm:pr-3"
            style={{
              WebkitOverflowScrolling: "touch",
              paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
            }}
          >
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/54">{project.client}</p>
            <h2 className="mt-2 text-[1.2rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.34rem]">{title}</h2>
            <p className="mt-3 text-[0.98rem] leading-6 text-white/82">{summary}</p>
            <p className="mt-3 text-[0.92rem] leading-6 text-white/74">{extendedDescription}</p>
            {productionContext.length ? (
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-black/18 px-3.5 py-3">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/54">
                  {language === "no" ? "Produksjon" : "Production"}
                </p>
                <div className="mt-3 space-y-2.5">
                  {productionContext.map((item) => (
                    <div
                      key={`${project.slug}-context-${item.label}`}
                      className="flex items-start justify-between gap-4 text-[0.78rem] leading-5"
                    >
                      <span className="text-white/52">{item.label}</span>
                      <span className="text-right text-white/82">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {modalInfoPoints.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {modalInfoPoints.map((point) => (
                  <span
                    key={`${project.slug}-modal-${point}`}
                    className="rounded-full border border-white/12 bg-black/20 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/74"
                  >
                    {point}
                  </span>
                ))}
              </div>
            ) : null}
            {deliverables.length ? (
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-black/18 px-3.5 py-3">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/54">
                  {language === "no" ? "Leveranse" : "Deliverables"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {deliverables.map((item) => (
                    <span
                      key={`${project.slug}-deliverable-${item}`}
                      className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[0.72rem] font-medium text-white/78"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {result ? (
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-black/18 px-3.5 py-3">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/54">
                  {language === "no" ? "Resultat" : "Result"}
                </p>
                <p className="mt-2 text-[0.88rem] leading-6 text-white/74">{result}</p>
              </div>
            ) : null}
            {awards.length ? (
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-black/18 px-3.5 py-3">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/54">
                  {language === "no" ? "Priser" : "Awards"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {awards.map((item) => (
                    <span
                      key={`${project.slug}-award-${item}`}
                      className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[0.72rem] font-medium text-white/78"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {festivals.length ? (
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-black/18 px-3.5 py-3">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/54">
                  {language === "no" ? "Festivaler" : "Festivals"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {festivals.map((item) => (
                    <span
                      key={`${project.slug}-festival-${item}`}
                      className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[0.72rem] font-medium text-white/78"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {credits.length ? (
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-black/18 px-3.5 py-3">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/54">
                  {language === "no" ? "Credits" : "Credits"}
                </p>
                <div className="mt-2 space-y-2">
                  {credits.map((credit) => (
                    <div key={`${project.slug}-credit-${credit.role}-${credit.name}`} className="flex items-start justify-between gap-4 text-[0.8rem] leading-5">
                      <span className="text-white/52">{credit.role}</span>
                      <span className="text-right text-white/82">{credit.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {quoteText ? (
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-3.5 py-3">
                <p className="text-[0.9rem] leading-6 text-white/78">&ldquo;{quoteText}&rdquo;</p>
                {quoteAttribution ? (
                  <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                    {quoteAttribution}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative flex h-full w-full items-center justify-center px-0 pt-16 sm:px-6 sm:pt-16 lg:px-10 lg:pt-10">
          {modalMedia?.kind === "direct" ? (
            <video
              ref={videoRef}
              className="block max-h-[calc(100svh-4.75rem)] w-auto max-w-full bg-[#05070b] object-contain sm:max-h-[calc(100svh-6rem)] sm:rounded-[1.4rem] lg:max-h-[88svh]"
              src={modalMedia.src}
              poster={modalMedia.poster}
              controls
              playsInline
              preload="metadata"
              autoPlay
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              disableRemotePlayback
            />
          ) : modalMedia?.kind === "external" ? (
            <div className="relative aspect-video h-auto w-full max-w-[min(100%,78rem)] overflow-hidden bg-[#05070b] sm:max-h-[calc(100svh-6rem)] sm:rounded-[1.4rem]">
              <iframe
                src={modalMedia.iframeSrc}
                title={title}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : project.image ? (
            <div
              className={cn(
                "relative w-full max-w-[min(100%,42rem)] overflow-hidden bg-[#05070b] sm:rounded-[1.4rem]",
                project.mediaFit === "contain" ? "aspect-[4/5]" : "aspect-video",
              )}
            >
              <Image
                src={project.image}
                alt={project.imageAlt ? resolveLocalizedValue(project.imageAlt, language) : title}
                fill
                priority
                sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 58vw, 100vw"
                className={cn(
                  "object-cover",
                  project.mediaFit === "contain" && "object-contain p-4 sm:p-6",
                )}
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_24%),linear-gradient(135deg,rgba(120,164,255,0.18),rgba(10,12,18,0.94))]" />
          )}
        </div>
      </div>
    </div>
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
  cropToFrame = false,
}: {
  project: PortfolioProject;
  priority?: boolean;
  playMode?: "static" | "viewport" | "featured";
  sizes: string;
  className?: string;
  rootMargin?: string;
  inViewThreshold?: number;
  cropToFrame?: boolean;
}) {
  const { language } = useSitePreferences();
  const fallbackVisual = getPortfolioFallbackVisual(project.group);
  const altText = project.imageAlt
    ? resolveLocalizedValue(project.imageAlt, language)
    : resolveLocalizedValue(project.title, language);
  const resolvedMediaFit = cropToFrame ? "cover" : project.mediaFit;
  const imageClassName = cn(
    "object-cover",
    "transition duration-700",
    playMode !== "static" && "group-hover:scale-[1.03]",
    resolvedMediaFit === "contain" && "object-contain p-5 sm:p-6",
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
        mediaFit={resolvedMediaFit}
        previewBehavior={previewBehavior}
        className="absolute inset-0"
        sizes={sizes}
        priority={priority}
        rootMargin={rootMargin}
        inViewThreshold={inViewThreshold}
        posterClassName={imageClassName}
        previewClassName={cn("scale-[1.01]", resolvedMediaFit === "contain" && "object-contain p-5 sm:p-6")}
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

function getPortfolioGroup(slug: string) {
  return portfolioGroups.find((group) => group.slug === slug);
}
