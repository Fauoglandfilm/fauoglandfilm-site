"use client";

import Image from "next/image";
import Link from "next/link";
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

const portfolioModalCopyOverrides = {
  "ville-gleder-villmarksforedrag": {
    no: {
      summary:
        "Promofilmen løfter fram Mattis Thørud og Jan Monsen i naturen, og gjør villmarksforedraget lettere å forstå, huske og booke.",
      result:
        "Bygget for å skape nysgjerrighet rundt foredraget og gi arrangører en tydelig følelse av stemning, innhold og målgruppe.",
    },
    en: {
      summary:
        "This promo film places Mattis Thørud and Jan Monsen in the outdoors and makes the wilderness talk easier to understand, remember and book.",
      result:
        "Built to spark curiosity around the talk and give organisers a clear sense of the tone, content and audience fit.",
    },
  },
  "ville-gleder-vat-kald-sulten": {
    no: {
      summary:
        "Filmen setter foredraget \"Våt, kald og sulten\" opp mot en vanlig arbeidshverdag, og gjør konseptet tydeligere og mer salgbart.",
      result:
        "Bygget for å gjøre innholdet lettere å formidle raskt, og for å hjelpe Ville Gleder med flere relevante bookinger.",
    },
    en: {
      summary:
        "This film contrasts the talk “Wet, cold and hungry” with everyday working life, making the concept clearer and easier to sell.",
      result:
        "Built to communicate the idea faster and help Ville Gleder convert more relevant bookings.",
    },
  },
} as const;

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

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
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
          project={activeProject}
          group={getPortfolioGroup(activeProject.group)}
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
        {canOpen ? (
          <button
            type="button"
            onClick={() => onOpen(project)}
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

function PortfolioVideoModal({
  project,
  group,
  onClose,
}: {
  project: PortfolioProject;
  group?: PortfolioGroup;
  onClose: () => void;
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(project.title, language);
  const format = resolveLocalizedValue(project.format, language);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const copyOverride =
    project.slug in portfolioModalCopyOverrides
      ? portfolioModalCopyOverrides[project.slug as keyof typeof portfolioModalCopyOverrides][language]
      : null;
  const summary = copyOverride?.summary ?? resolveLocalizedValue(project.summary, language);
  const result = copyOverride?.result ?? (project.result ? resolveLocalizedValue(project.result, language) : null);
  const modalLabel = language === "no" ? "Lukk video" : "Close video";
  const modalMedia = resolvePortfolioModalMedia(project);
  const isDirectVideo = modalMedia?.kind === "direct";
  const modalActionClassName =
    "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition [html[data-theme='light']_&]:border-black/12 [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:text-black [html[data-theme='light']_&]:hover:bg-[#f7f7f8] [html[data-theme='light']_&]:hover:text-black [html[data-theme='dark']_&]:border-white/14 [html[data-theme='dark']_&]:bg-black [html[data-theme='dark']_&]:text-white [html[data-theme='dark']_&]:hover:bg-[#202022] [html[data-theme='dark']_&]:hover:text-white";

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
      className="fixed inset-0 z-[80] flex items-start justify-center bg-[#040507]/72 p-0 backdrop-blur-md sm:p-5 lg:items-center lg:p-8"
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
        className="card-surface relative flex h-[100svh] max-h-[100svh] w-full max-w-6xl flex-col overflow-hidden rounded-none border-0 bg-[color:var(--surface-strong)] shadow-[0_32px_120px_rgba(0,0,0,0.34)] sm:h-auto sm:max-h-[calc(100svh-2.5rem)] sm:rounded-[2rem] sm:border sm:border-[color:var(--line-strong)]"
        onClick={(event) => event.stopPropagation()}
      >
        <OverlayCloseButton
          onClick={onClose}
          label={modalLabel}
        />

        <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1.06fr)_minmax(19rem,0.94fr)]">
          <div className="relative flex min-h-[15rem] flex-none items-center justify-center bg-[#05070b] px-3 pb-4 pt-16 sm:min-h-[20rem] sm:px-5 sm:pb-5 sm:pt-16 lg:min-h-[36rem] lg:px-8 lg:py-8">
            {modalMedia?.kind === "direct" ? (
              <video
                ref={videoRef}
                className="block max-h-[46svh] w-auto max-w-full rounded-[1.3rem] bg-[#05070b] object-contain sm:max-h-[52svh] lg:max-h-[72svh]"
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
              <div className="relative w-full max-w-[min(100%,48rem)] overflow-hidden rounded-[1.3rem] aspect-video max-h-[46svh] sm:max-h-[52svh] lg:max-h-none">
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
                  "relative w-full max-w-[min(100%,42rem)] overflow-hidden rounded-[1.3rem] max-h-[46svh] sm:max-h-[52svh] lg:max-h-none",
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

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto border-t border-[color:var(--line)]/75 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                {group ? <span>{resolveLocalizedValue(group.title, language)}</span> : null}
                {group ? <span className="h-1 w-1 rounded-full bg-[color:var(--muted)]/50" /> : null}
                <span>{project.client}</span>
                {project.year ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-[color:var(--muted)]/50" />
                    <span>{project.year}</span>
                  </>
                ) : null}
              </div>

              <div>
                <h2 className="section-title text-[color:var(--foreground)]">{title}</h2>
                <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {format}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-2)] sm:text-[0.98rem]">
                  {summary}
                </p>
                {result ? (
                  <p className="mt-4 text-sm leading-7 text-[color:var(--foreground)]/88 sm:text-[0.98rem]">
                    {result}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row sm:flex-wrap">
              {project.detailHref ? (
                <Link
                  href={project.detailHref}
                  className={modalActionClassName}
                >
                  <span>{language === "no" ? "Se case" : "View case"}</span>
                </Link>
              ) : null}

              {project.externalVideo?.sourceUrl ? (
                <a
                  href={project.externalVideo.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={modalActionClassName}
                >
                  <span>{language === "no" ? "Åpne kilde" : "Open source"}</span>
                </a>
              ) : null}
            </div>
          </div>
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
