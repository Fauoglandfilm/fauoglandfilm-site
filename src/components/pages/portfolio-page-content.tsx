"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { PreviewMedia } from "@/components/media/preview-media";
import { Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { CtaBanner, PageHero } from "@/components/sections/site-sections";
import {
  segmentedControlOptionClassName,
  segmentedControlShellClassName,
} from "@/components/ui/button-styles";
import { OverlayCloseButton } from "@/components/ui/overlay-close-button";
import PortfolioServicesSection from "@/components/ui/services";
import {
  portfolioGroups,
  portfolioPageContent,
  portfolioProjects,
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
          <div className="grid gap-4 lg:grid-cols-[1.16fr_0.84fr]">
            <Reveal>
              <article className="card-surface group overflow-hidden rounded-[2rem] shadow-[0_20px_56px_rgba(18,14,10,0.1)]">
                <div className="media-frame relative aspect-video min-h-[13rem] overflow-hidden sm:min-h-[18rem] lg:min-h-[28rem]">
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
                  onOpen={setActiveProject}
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
                      onOpen={setActiveProject}
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
                  onOpen={setActiveProject}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PortfolioServicesSection />

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
  layout,
  onOpen,
}: {
  project: PortfolioProject;
  group?: PortfolioGroup;
  layout: "default" | "wide";
  onOpen: (project: PortfolioProject) => void;
}) {
  const { language } = useSitePreferences();
  const isWide = layout === "wide";
  const canOpen = Boolean(project.video || project.externalVideo || project.image);
  const title = resolveLocalizedValue(project.title, language);
  const summary = getPortfolioShortDescription(project, language);
  const infoPoints = getPortfolioProjectInfoPoints(project, group, language);
  const [prefersTapReveal, setPrefersTapReveal] = useState(false);
  const [isTapInfoVisible, setIsTapInfoVisible] = useState(false);
  const overlayInstruction = prefersTapReveal
    ? language === "no"
      ? "Trykk igjen for å åpne"
      : "Tap again to open"
    : language === "no"
      ? "Hold over for info"
      : "Hover for info";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const syncPreference = () => setPrefersTapReveal(mediaQuery.matches);

    syncPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncPreference);
      return () => mediaQuery.removeEventListener("change", syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);


  const handleCardOpen = () => {
    if (!canOpen) {
      return;
    }

    if (prefersTapReveal && !isTapInfoVisible) {
      setIsTapInfoVisible(true);
      return;
    }

    setIsTapInfoVisible(false);
    onOpen(project);
  };

  return (
    <article
      className={cn(
        "card-surface group overflow-hidden rounded-[1.95rem] shadow-[0_28px_90px_rgba(0,0,0,0.18)]",
        isWide && "md:col-span-2",
      )}
      onMouseLeave={prefersTapReveal ? undefined : () => setIsTapInfoVisible(false)}
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
        {canOpen ? (
          <button
            type="button"
            onClick={handleCardOpen}
            className="card-trigger absolute inset-0 z-[5]"
            aria-label={title}
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
          <span
            className={cn(
              "absolute left-4 top-4 z-[2] rounded-full border border-white/12 bg-black/24 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/78 transition-opacity duration-300",
              prefersTapReveal
                ? isTapInfoVisible
                  ? "opacity-0"
                  : "opacity-100"
                : "opacity-100 group-hover:opacity-0 group-focus-within:opacity-0",
            )}
          >
            {resolveLocalizedValue(group.title, language)}
          </span>
        ) : null}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-[4] flex items-end p-3 sm:p-4",
            prefersTapReveal
              ? isTapInfoVisible
                ? "opacity-100"
                : "opacity-0"
              : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
          )}
        >
          <div className="absolute inset-0 rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(6,7,10,0.04),rgba(6,7,10,0.28)_46%,rgba(6,7,10,0.72)_100%)]" />
          <div className="relative w-full rounded-[1.35rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] p-4 text-white shadow-[0_18px_42px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5">
            <h3 className="text-[1.08rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[1.16rem]">
              {title}
            </h3>
            <p className="mt-2 line-clamp-2 text-[0.94rem] leading-6 text-white/82 sm:text-[0.98rem]">
              {summary}
            </p>
            {infoPoints.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {infoPoints.map((point) => (
                  <span
                    key={`${project.slug}-${point}`}
                    className="rounded-full border border-white/12 bg-black/20 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-white/76"
                  >
                    {point}
                  </span>
                ))}
              </div>
            ) : null}
            <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/52">
              {overlayInstruction}
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[2] p-4 text-white sm:p-5">
          <div
            className={cn(
              "transition-opacity duration-300",
              prefersTapReveal
                ? isTapInfoVisible
                  ? "opacity-0"
                  : "opacity-100"
                : "opacity-100 group-hover:opacity-0 group-focus-within:opacity-0",
            )}
          >
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
              {title}
            </h3>
          </div>
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
              preload="auto"
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

function getPortfolioGroup(slug: string) {
  return portfolioGroups.find((group) => group.slug === slug);
}
