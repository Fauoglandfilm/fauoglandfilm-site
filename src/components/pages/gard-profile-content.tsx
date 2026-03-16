"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { EmbeddedVideoPlayer } from "@/components/media/embedded-video-player";
import { ProjectVideoModal } from "@/components/media/project-video-modal";
import { FloatingLayer, Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon, PlayIcon } from "@/components/ui/icons";
import { gardProfilePage, type GardProject, type GardProjectGroup } from "@/data/gard-profile";
import { siteConfig } from "@/data/site-content";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function getProjectPoster(project: GardProject) {
  return project.image ?? project.video?.poster ?? project.externalVideo?.thumbnailSrc;
}

function GardProjectCard({
  project,
  onPreview,
}: {
  project: GardProject;
  onPreview: (project: GardProject) => void;
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(project.title, language);
  const imageAlt = project.imageAlt
    ? resolveLocalizedValue(project.imageAlt, language)
    : title;
  const availabilityNote =
    project.video?.videoType === "request"
      ? resolveLocalizedValue(project.video.availabilityNote, language)
      : null;
  const hasVideo = Boolean(project.video || project.externalVideo);
  const canPreviewMotion = Boolean(project.preview && (project.video || project.externalVideo));
  const poster = getProjectPoster(project);

  return (
    <article className="card-surface group overflow-hidden rounded-[1.9rem]">
      <div className="grid gap-px bg-[color:var(--line)] xl:grid-cols-[1.04fr_0.96fr]">
        <div className="relative min-h-[15rem] overflow-hidden bg-[#090909] sm:min-h-[17rem]">
          <div className="media-frame absolute inset-0 overflow-hidden rounded-none border-0 shadow-none">
            {canPreviewMotion ? (
              <EmbeddedVideoPlayer
                title={project.title}
                video={project.video}
                externalVideo={project.externalVideo}
                image={project.image}
                imageAlt={project.imageAlt}
                mediaFit={project.mediaFit}
                previewMode
                autoplay
                className="absolute inset-0"
                sizes="(min-width: 1280px) 34vw, (min-width: 768px) 50vw, 100vw"
              />
            ) : poster ? (
              <Image
                src={poster}
                alt={imageAlt}
                fill
                sizes="(min-width: 1280px) 34vw, (min-width: 768px) 50vw, 100vw"
                className={cn(
                  "object-cover transition duration-700 group-hover:scale-[1.03]",
                  project.mediaFit === "contain" && "object-contain p-6",
                )}
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,rgba(120,164,255,0.22),rgba(9,12,20,0.92))]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.04),rgba(8,8,10,0.18)_44%,rgba(8,8,10,0.84)_100%)]" />
            <div className="grain-overlay absolute inset-0 opacity-34" />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-[2] p-4 text-white sm:p-5">
            <div className="flex flex-wrap items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/56">
              <span>{project.client}</span>
              {project.year ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/26" />
                  <span>{project.year}</span>
                </>
              ) : null}
            </div>
            <h3 className="mt-3 text-[1.28rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.45rem]">
              {title}
            </h3>
          </div>

          {hasVideo ? (
            <button
              type="button"
              onClick={() => onPreview(project)}
              aria-label={language === "no" ? `Åpne ${title}` : `Open ${title}`}
              className="absolute right-4 top-4 z-[3] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/90 text-[#111111] shadow-[0_16px_36px_rgba(0,0,0,0.22)] backdrop-blur-sm transition duration-300 hover:scale-[1.03]"
            >
              <PlayIcon className="h-4 w-4 translate-x-[1px]" />
            </button>
          ) : null}
        </div>

        <div className="relative flex h-full flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] p-5 sm:p-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="founder-profile-chip">{resolveLocalizedValue(project.format, language)}</span>
              {availabilityNote ? (
                <span className="founder-profile-chip founder-profile-chip-muted">
                  {language === "no" ? "Tilgjengelig ved forespørsel" : "Available on request"}
                </span>
              ) : null}
            </div>

            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {resolveLocalizedValue(project.role, language)}
            </p>
            <p className="body-copy text-[var(--muted-2)]">
              {resolveLocalizedValue(project.summary, language)}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-2.5 pt-5 sm:flex-row sm:flex-wrap">
            {hasVideo ? (
              <Button className="w-full sm:w-auto" onClick={() => onPreview(project)}>
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
  onPreview,
}: {
  group: GardProjectGroup;
  onPreview: (project: GardProject) => void;
}) {
  const { language } = useSitePreferences();

  return (
    <section className="section-space pt-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="eyebrow">{resolveLocalizedValue(group.title, language)}</span>
          <p className="body-lead text-[var(--muted-2)]">
            {resolveLocalizedValue(group.description, language)}
          </p>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {group.projects.map((project, index) => (
            <Reveal key={project.slug} delay={0.04 * index}>
              <GardProjectCard project={project} onPreview={onPreview} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GardProfileContent() {
  const { language } = useSitePreferences();
  const [activeProject, setActiveProject] = useState<GardProject | null>(null);
  const profile = gardProfilePage.baseProfile;
  const socialLinks = useMemo(() => gardProfilePage.socialLinks, []);
  const internalLinks = useMemo(() => gardProfilePage.internalLinks, []);

  return (
    <main>
      <section className="relative isolate overflow-hidden pt-22 sm:pt-28">
        <div className="absolute inset-0">
          <Image
            src={profile.heroBackground}
            alt={resolveLocalizedValue(profile.heroBackgroundAlt, language)}
            fill
            priority
            sizes="100vw"
            className="object-cover image-slow-zoom"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(90deg,rgba(5,7,11,0.84),rgba(5,7,11,0.48)_34%,rgba(5,7,11,0.44)_58%,rgba(5,7,11,0.86)_100%),linear-gradient(180deg,rgba(6,6,9,0.14),rgba(6,6,9,0.24)_32%,rgba(6,6,9,0.8)_100%)]" />
          <div className="grain-overlay absolute inset-0 opacity-38" />
        </div>

        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-end px-4 pb-8 sm:min-h-[66svh] sm:px-6 sm:pb-10 lg:min-h-[72svh] lg:px-8 lg:pb-12">
          <div className="grid w-full gap-5 lg:grid-cols-[0.9fr_0.72fr] lg:items-end">
            <Reveal className="max-w-3xl" delay={0.04} y={18}>
              <div className="subpage-hero-panel relative overflow-hidden px-5 py-5 text-white sm:px-7 sm:py-6 lg:px-8 lg:py-7">
                <div className="glass-sheen absolute inset-0" />
                <div className="pointer-events-none absolute -left-8 bottom-[-3rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent_72%)] blur-2xl opacity-70" />
                <div className="pointer-events-none absolute right-[-2.5rem] top-[-2.5rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(122,168,255,0.28),transparent_70%)] blur-2xl opacity-78" />

                <div className="relative z-[1]">
                  <ButtonLink
                    href="/om-oss"
                    variant="ghost"
                    size="compact"
                    className="w-fit border-white/16 text-white/86 hover:border-white/26 hover:text-white"
                  >
                    {language === "no" ? "Tilbake til Om oss" : "Back to About"}
                  </ButtonLink>

                  <span className="hero-badge mt-5 text-white/72">
                    {resolveLocalizedValue(profile.role, language)}
                  </span>
                  <h1 className="page-title mt-4 max-w-[12ch] text-white">{profile.name}</h1>
                  <p className="mt-4 max-w-2xl text-[1.02rem] font-medium leading-7 text-white/88 sm:text-[1.08rem] sm:leading-8">
                    {resolveLocalizedValue(gardProfilePage.heroTitle, language)}
                  </p>
                  <p className="body-copy mt-4 max-w-[42rem] text-white/78 sm:text-base sm:leading-7">
                    {resolveLocalizedValue(gardProfilePage.heroIntro, language)}
                  </p>
                  <p className="body-copy mt-4 max-w-[40rem] text-white/68 sm:text-base sm:leading-7">
                    {resolveLocalizedValue(gardProfilePage.heroSummary, language)}
                  </p>

                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                    <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                      {resolveLocalizedValue(gardProfilePage.ctaPrimaryLabel, language)}
                    </ButtonLink>
                    <ButtonLink href="/case" variant="secondary" className="w-full sm:w-auto">
                      {resolveLocalizedValue(gardProfilePage.ctaSecondaryLabel, language)}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Reveal>

            <FloatingLayer className="lg:justify-self-end">
              <div className="founder-portrait-panel">
                <div className="founder-portrait-shell relative aspect-[0.88/1.06] overflow-hidden">
                  <Image
                    src={profile.portrait}
                    alt={resolveLocalizedValue(profile.portraitAlt, language)}
                    fill
                    sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 34vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.02),rgba(10,10,12,0.14)_46%,rgba(10,10,12,0.76)_100%)]" />
                  <div className="grain-overlay absolute inset-0 opacity-32" />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="founder-profile-chip">{resolveLocalizedValue(profile.role, language)}</span>
                  <span className="founder-profile-chip founder-profile-chip-muted">
                    {language === "no" ? "Skjult profil" : "Private profile"}
                  </span>
                </div>
              </div>
            </FloatingLayer>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
            <Reveal>
              <article className="glass-panel overflow-hidden rounded-[2rem]">
                <div className="media-frame relative aspect-[1.06/1] min-h-[20rem] overflow-hidden">
                  <Image
                    src={profile.supportingVisual}
                    alt={resolveLocalizedValue(profile.supportingVisualAlt, language)}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.04),rgba(8,8,10,0.18)_48%,rgba(8,8,10,0.78)_100%)]" />
                  <div className="grain-overlay absolute inset-0 opacity-38" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/54">
                      {resolveLocalizedValue(gardProfilePage.environmentsEyebrow, language)}
                    </p>
                    <h2 className="feature-title mt-3 max-w-xl text-white">
                      {resolveLocalizedValue(gardProfilePage.environmentsTitle, language)}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
                      {resolveLocalizedValue(gardProfilePage.environmentsDescription, language)}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-4">
              <Reveal delay={0.05}>
                <article className="glass-panel rounded-[1.9rem] p-5 sm:p-6">
                  <div className="max-w-3xl space-y-3">
                    <span className="eyebrow">{resolveLocalizedValue(gardProfilePage.focusEyebrow, language)}</span>
                    <h2 className="section-title text-[color:var(--foreground)]">
                      {resolveLocalizedValue(gardProfilePage.focusTitle, language)}
                    </h2>
                    <p className="body-lead text-[var(--muted-2)]">
                      {resolveLocalizedValue(gardProfilePage.focusDescription, language)}
                    </p>
                  </div>
                </article>
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {gardProfilePage.focusAreas.map((area, index) => (
                  <Reveal key={resolveLocalizedValue(area.title, language)} delay={0.05 * (index + 1)}>
                    <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        {resolveLocalizedValue(gardProfilePage.focusEyebrow, language)}
                      </p>
                      <h3 className="card-title mt-3 text-[color:var(--foreground)]">
                        {resolveLocalizedValue(area.title, language)}
                      </h3>
                      <p className="body-copy mt-3 text-[var(--muted-2)]">
                        {resolveLocalizedValue(area.description, language)}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <Reveal delay={0.16}>
            <article className="glass-panel mt-4 rounded-[1.9rem] p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl space-y-3">
                  <span className="eyebrow">{resolveLocalizedValue(gardProfilePage.environmentsEyebrow, language)}</span>
                  <h3 className="section-title text-[color:var(--foreground)]">
                    {resolveLocalizedValue(gardProfilePage.environmentsTitle, language)}
                  </h3>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {gardProfilePage.environments.map((environment) => (
                  <span key={environment} className="founder-profile-chip">
                    {environment}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="eyebrow">{resolveLocalizedValue(gardProfilePage.projectEyebrow, language)}</span>
            <h2 className="section-title text-[color:var(--foreground)]">
              {resolveLocalizedValue(gardProfilePage.projectTitle, language)}
            </h2>
            <p className="body-lead text-[var(--muted-2)]">
              {resolveLocalizedValue(gardProfilePage.projectDescription, language)}
            </p>
          </div>
        </div>
      </section>

      {gardProfilePage.projectGroups.map((group) => (
        <ProjectGroupSection key={group.slug} group={group} onPreview={setActiveProject} />
      ))}

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="eyebrow">{resolveLocalizedValue(gardProfilePage.backgroundEyebrow, language)}</span>
            <h2 className="section-title text-[color:var(--foreground)]">
              {resolveLocalizedValue(gardProfilePage.backgroundTitle, language)}
            </h2>
            <p className="body-lead text-[var(--muted-2)]">
              {resolveLocalizedValue(gardProfilePage.backgroundDescription, language)}
            </p>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            {gardProfilePage.backgroundGroups.map((group, index) => (
              <Reveal key={resolveLocalizedValue(group.title, language)} delay={0.05 * index}>
                <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {resolveLocalizedValue(gardProfilePage.backgroundEyebrow, language)}
                  </p>
                  <h3 className="card-title mt-3 text-[color:var(--foreground)]">
                    {resolveLocalizedValue(group.title, language)}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <div key={resolveLocalizedValue(item, language)} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <p className="body-copy text-[var(--muted-2)]">
                          {resolveLocalizedValue(item, language)}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <article className="glass-panel rounded-[2rem] p-5 sm:p-6 lg:p-7">
              <div className="grid gap-5 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div className="space-y-3">
                  <span className="eyebrow">{resolveLocalizedValue(gardProfilePage.fauLandEyebrow, language)}</span>
                  <h2 className="section-title text-[color:var(--foreground)]">
                    {resolveLocalizedValue(gardProfilePage.fauLandTitle, language)}
                  </h2>
                  <p className="body-lead text-[var(--muted-2)]">
                    {resolveLocalizedValue(gardProfilePage.fauLandDescription, language)}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="card-surface rounded-[1.6rem] p-4 sm:p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {language === "no" ? "Fau&Land Film" : "Fau&Land Film"}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {internalLinks.map((link) => (
                        <ButtonLink key={link.href} href={link.href} variant="ghost" size="compact" className="w-full sm:w-auto">
                          {resolveLocalizedValue(link.label, language)}
                          <ArrowUpRightIcon className="h-4 w-4" />
                        </ButtonLink>
                      ))}
                    </div>
                  </div>

                  <div className="card-surface rounded-[1.6rem] p-4 sm:p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {language === "no" ? "Sosiale flater" : "Social channels"}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {socialLinks.map((link) => (
                        <ButtonLink
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          variant="ghost"
                          size="compact"
                          className="w-full sm:w-auto"
                        >
                          {resolveLocalizedValue(link.label, language)}
                          <ArrowUpRightIcon className="h-4 w-4" />
                        </ButtonLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <article className="glass-panel overflow-hidden rounded-[2.2rem] p-5 text-center sm:p-7 lg:p-8">
              <div className="glass-sheen absolute inset-0 opacity-50" />
              <div className="relative z-[1] mx-auto max-w-3xl">
                <span className="eyebrow">{profile.name}</span>
                <h2 className="section-title mt-3 text-[color:var(--foreground)]">
                  {resolveLocalizedValue(gardProfilePage.ctaTitle, language)}
                </h2>
                <p className="body-lead mt-3 text-[var(--muted-2)]">
                  {resolveLocalizedValue(gardProfilePage.ctaDescription, language)}
                </p>
                <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row sm:flex-wrap">
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
                <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                  {siteConfig.email} · {siteConfig.locationLabel}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

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
        primaryAction={
          activeProject
            ? {
                href: "/kontakt",
                label: {
                  no: "Snakk med oss om lignende arbeid",
                  en: "Talk to us about similar work",
                },
              }
            : undefined
        }
        secondaryAction={
          activeProject
            ? {
                href: "/case",
                label: {
                  no: "Se Fau&Land sitt arbeid",
                  en: "See Fau&Land's work",
                },
              }
            : undefined
        }
      />
    </main>
  );
}
