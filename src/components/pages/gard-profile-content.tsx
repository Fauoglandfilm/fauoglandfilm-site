"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { PreviewMedia } from "@/components/media/preview-media";
import { Reveal } from "@/components/motion/reveal";
import { ProfileImageCard } from "@/components/pages/profile-image-card";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon, PlayIcon } from "@/components/ui/icons";
import {
  gardProfilePage,
  type GardProject,
  type GardProjectCompanion,
  type GardProjectGroup,
} from "@/data/gard-profile";
import { siteConfig } from "@/data/site-content";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function hasPlayableMedia(project: GardProject | GardProjectCompanion) {
  return Boolean(project.video || project.externalVideo);
}

function toPreviewProject(project: GardProject, companion?: GardProjectCompanion): GardProject {
  if (!companion) {
    return project;
  }

  return {
    ...project,
    slug: `${project.slug}-${companion.slug}`,
    title: companion.title,
    summary: companion.summary ?? project.summary,
    format: companion.format ?? project.format,
    year: companion.year ?? project.year,
    image: companion.image ?? project.image,
    imageAlt: companion.imageAlt ?? project.imageAlt,
    video: companion.video,
    externalVideo: companion.externalVideo,
    mediaFit: companion.mediaFit ?? project.mediaFit,
  };
}

function GardEditorialCase({
  project,
  index,
}: {
  project: GardProject;
  index: number;
}) {
  const { language } = useSitePreferences();
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState<GardProject>(project);
  const title = resolveLocalizedValue(activeProject.title, language);
  const mediaFirst = index % 2 === 0;
  const availabilityNote =
    activeProject.video?.videoType === "request"
      ? resolveLocalizedValue(activeProject.video.availabilityNote, language)
      : null;

  const focusInlineProject = (nextProject: GardProject) => {
    setActiveProject(nextProject);
    mediaRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <article className="grid gap-5 lg:grid-cols-[minmax(0,1.14fr)_minmax(20rem,0.86fr)] lg:gap-7 lg:items-stretch">
      <div className={cn("order-1", !mediaFirst && "lg:order-2")}>
        <div
          ref={mediaRef}
          className="media-frame group relative min-h-[18rem] overflow-hidden rounded-[2rem] bg-[#07090d] sm:min-h-[24rem] lg:min-h-[32rem]"
        >
          {hasPlayableMedia(activeProject) ? (
            <button
              type="button"
              onClick={() => focusInlineProject(activeProject)}
              aria-label={language === "no" ? `Fokuser ${title}` : `Focus ${title}`}
              className="absolute inset-0 z-[3]"
            />
          ) : null}

          <PreviewMedia
            title={activeProject.title}
            video={activeProject.video}
            externalVideo={activeProject.externalVideo}
            image={activeProject.image}
            imageAlt={activeProject.imageAlt}
            mediaFit={activeProject.mediaFit}
            previewBehavior={hasPlayableMedia(activeProject) ? "viewport" : "static"}
            className="absolute inset-0"
            sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 100vw"
            posterClassName="transition duration-700 group-hover:scale-[1.02]"
            previewClassName="transition duration-700"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.04),rgba(6,7,10,0.14)_42%,rgba(6,7,10,0.84)_100%)]" />
          <div className="grain-overlay absolute inset-0 opacity-28" />

          <div className="absolute left-4 top-4 z-[4] flex flex-wrap items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white/74 sm:left-5 sm:top-5">
            <span>{activeProject.client}</span>
            {activeProject.year ? (
              <>
                <span className="h-1 w-1 rounded-full bg-white/32" />
                <span>{activeProject.year}</span>
              </>
            ) : null}
          </div>

          {hasPlayableMedia(activeProject) ? (
            <span className="absolute right-4 top-4 z-[4] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/90 text-[#111111] shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-md transition duration-300 group-hover:scale-[1.03] sm:right-5 sm:top-5">
              <PlayIcon className="h-4 w-4 translate-x-[1px]" />
            </span>
          ) : null}
        </div>
      </div>

      <div className={cn("order-2 flex", !mediaFirst && "lg:order-1")}>
        <div className="glass-panel flex w-full flex-col rounded-[2rem] px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="founder-profile-chip">{resolveLocalizedValue(activeProject.format, language)}</span>
              <span className="founder-profile-chip founder-profile-chip-muted">
                {resolveLocalizedValue(activeProject.role, language)}
              </span>
            </div>

            <h3 className="section-title text-[color:var(--foreground)] lg:text-[clamp(1.95rem,3.1vw,3.1rem)]">
              {title}
            </h3>
            <p className="body-lead max-w-[34rem] text-[var(--muted-2)]">
              {resolveLocalizedValue(activeProject.summary, language)}
            </p>
            {availabilityNote ? <p className="body-copy text-[var(--muted)]">{availabilityNote}</p> : null}
          </div>

          {project.companions?.length ? (
            <div className="mt-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                {language === "no" ? "Flere klipp fra samme spor" : "More from the same body of work"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {project.companions.map((companion) => (
                  <button
                    key={companion.slug}
                    type="button"
                    onClick={() => focusInlineProject(toPreviewProject(project, companion))}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)]/78 px-3.5 py-2 text-left text-sm font-medium text-[color:var(--foreground)] transition duration-300 hover:border-[color:var(--accent)]/38 hover:bg-[color:var(--surface-2)]"
                  >
                    <span>{resolveLocalizedValue(companion.title, language)}</span>
                    {hasPlayableMedia(companion) ? <PlayIcon className="h-3.5 w-3.5" /> : null}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row sm:flex-wrap">
            {(hasPlayableMedia(activeProject) || activeProject.image) ? (
              <Button className="w-full sm:w-auto" onClick={() => focusInlineProject(activeProject)}>
                {language === "no" ? "Se prosjekt" : "View project"}
              </Button>
            ) : null}
            <ButtonLink href="/kontakt" variant="ghost" className="w-full sm:w-auto">
              {language === "no" ? "Snakk med oss om prosjektet" : "Talk to us about the project"}
              <ArrowUpRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectGroupSection({
  group,
}: {
  group: GardProjectGroup;
}) {
  const { language } = useSitePreferences();

  return (
    <section className="section-space pt-0">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <div className="space-y-3">
            <span className="eyebrow">{resolveLocalizedValue(group.title, language)}</span>
            <p className="body-lead text-[var(--muted-2)]">
              {resolveLocalizedValue(group.description, language)}
            </p>
          </div>
        </Reveal>

        <div className="mt-7 space-y-8 sm:space-y-10 lg:space-y-12">
          {group.projects.map((project, index) => (
            <Reveal key={project.slug} delay={0.04 * index}>
              <GardEditorialCase project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GardProfileContent() {
  const { language } = useSitePreferences();
  const profile = gardProfilePage.baseProfile;

  return (
    <main>
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_24%),linear-gradient(180deg,#0b1220_0%,#0d1422_52%,#101723_100%)] pt-[6.35rem] sm:pt-28">
        <div className="site-container py-8 sm:py-10 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] md:items-end lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:gap-12">
            <Reveal className="max-w-3xl" delay={0.04} y={18}>
              <div className="max-w-[42rem] text-white">
                <ButtonLink
                  href="/om-oss"
                  variant="ghost"
                  size="compact"
                  className="w-fit border-white/14 text-white/84 hover:border-white/26 hover:text-white"
                >
                  {language === "no" ? "Tilbake til Om oss" : "Back to About"}
                </ButtonLink>

                <span className="hero-badge mt-5 text-white/72">
                  {resolveLocalizedValue(gardProfilePage.heroTitle, language)}
                </span>
                <h1 className="page-title mt-4 max-w-[10ch] text-white">{profile.name}</h1>
                <p className="mt-4 max-w-[34rem] text-[1rem] leading-7 text-white/84 sm:text-[1.08rem] sm:leading-8">
                  {resolveLocalizedValue(gardProfilePage.heroIntro, language)}
                </p>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                    {resolveLocalizedValue(gardProfilePage.heroCtaPrimary, language)}
                  </ButtonLink>
                  <ButtonLink href="/case" variant="secondary" className="w-full sm:w-auto">
                    {resolveLocalizedValue(gardProfilePage.heroCtaSecondary, language)}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} y={18} className="w-full md:flex md:justify-end">
              <ProfileImageCard
                src={profile.portrait}
                alt={resolveLocalizedValue(profile.portraitAlt, language)}
                priority
                sizes="(min-width: 1024px) 22rem, (min-width: 768px) 20rem, 72vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-container">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(18rem,0.98fr)] lg:items-center">
            <Reveal>
              <div className="media-frame relative min-h-[18rem] overflow-hidden rounded-[2rem] bg-[#090b10] sm:min-h-[23rem] lg:min-h-[30rem]">
                <Image
                  src={profile.supportingVisual}
                  alt={resolveLocalizedValue(profile.supportingVisualAlt, language)}
                  fill
                  sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.02),rgba(6,7,10,0.14)_46%,rgba(6,7,10,0.74)_100%)]" />
                <div className="grain-overlay absolute inset-0 opacity-28" />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="card-surface rounded-[2rem] px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
                <span className="eyebrow">{resolveLocalizedValue(gardProfilePage.introEyebrow, language)}</span>
                <h2 className="section-title mt-3 text-[color:var(--foreground)]">
                  {resolveLocalizedValue(gardProfilePage.introTitle, language)}
                </h2>
                <p className="body-lead mt-4 text-[var(--muted-2)]">
                  {resolveLocalizedValue(gardProfilePage.introBody, language)}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {gardProfilePage.introFacts.map((fact) => (
                    <span key={fact} className="founder-profile-chip founder-profile-chip-muted">
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {gardProfilePage.projectGroups.map((group) => (
        <ProjectGroupSection key={group.slug} group={group} />
      ))}

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal>
            <article className="card-surface overflow-hidden rounded-[2rem] px-5 py-6 sm:px-7 sm:py-7">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(18rem,1.08fr)] lg:items-end">
                <div className="space-y-3">
                  <span className="eyebrow">{profile.name}</span>
                  <h2 className="section-title text-[color:var(--foreground)]">
                    {resolveLocalizedValue(gardProfilePage.ctaTitle, language)}
                  </h2>
                  <p className="body-lead text-[var(--muted-2)]">
                    {resolveLocalizedValue(gardProfilePage.ctaDescription, language)}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                      {resolveLocalizedValue(gardProfilePage.ctaPrimaryLabel, language)}
                    </ButtonLink>
                    <ButtonLink href="/case" variant="secondary" className="w-full sm:w-auto">
                      {resolveLocalizedValue(gardProfilePage.ctaSecondaryLabel, language)}
                    </ButtonLink>
                    <ButtonLink href={siteConfig.phonePrimaryHref} variant="ghost" className="w-full sm:w-auto">
                      {siteConfig.phonePrimary}
                    </ButtonLink>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {gardProfilePage.internalLinks.map((link) => (
                      <ButtonLink key={link.href} href={link.href} variant="ghost" size="compact" className="w-full sm:w-auto">
                        {resolveLocalizedValue(link.label, language)}
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </ButtonLink>
                    ))}
                  </div>

                  <p className="text-sm leading-6 text-[var(--muted)]">
                    {gardProfilePage.contactEmail} · {gardProfilePage.contactPhone} · {siteConfig.locationLabel}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
