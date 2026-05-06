"use client";

import Link from "next/link";

import { EmbeddedVideoPlayer } from "@/components/media/embedded-video-player";
import { Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import {
  getGardProjectPath,
  type GardProjectDetail,
} from "@/data/gard-profile";
import { resolveLocalizedValue } from "@/lib/i18n";

function getProjectAction(project: GardProjectDetail, language: "no" | "en") {
  const href =
    project.externalVideo?.sourceUrl ??
    (project.video?.videoType === "direct"
      ? project.video.fullSrc ?? project.video.src
      : undefined) ??
    project.image;

  if (!href) {
    return null;
  }

  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    /\.(mp4|webm|mov|avif|webp|jpe?g|png|gif)(\?|$)/i.test(href);
  const label =
    project.externalVideo || project.video?.videoType === "direct"
      ? language === "no"
        ? "Åpne film"
        : "Open film"
      : language === "no"
        ? "Åpne plakat"
        : "Open poster";

  return { href, isExternal, label };
}

export function GardProjectPageContent({
  project,
  relatedProjects,
}: {
  project: GardProjectDetail;
  relatedProjects: GardProjectDetail[];
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(project.title, language);
  const groupTitle = resolveLocalizedValue(project.group.title, language);
  const parentTitle = project.parentTitle
    ? resolveLocalizedValue(project.parentTitle, language)
    : null;
  const availabilityNote =
    project.video?.videoType === "request"
      ? resolveLocalizedValue(project.video.availabilityNote, language)
      : null;
  const action = getProjectAction(project, language);

  return (
    <main>
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_24%),linear-gradient(180deg,#0b1220_0%,#0d1422_52%,#101723_100%)] pt-[6.35rem] sm:pt-28">
        <div className="site-container py-8 sm:py-10 lg:py-14">
          <Reveal className="max-w-4xl" y={18}>
            <ButtonLink
              href="/team/gard-ruben-fauske"
              variant="ghost"
              size="compact"
              className="w-fit border-white/14 text-white/84 hover:border-white/26 hover:text-white"
            >
              {language === "no" ? "Tilbake til Gard" : "Back to Gard"}
            </ButtonLink>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-white/72">
              <span className="hero-badge text-white/72">{groupTitle}</span>
              {project.year ? (
                <span className="hero-badge text-white/62">{project.year}</span>
              ) : null}
            </div>

            <h1 className="page-title mt-4 max-w-[13ch] text-white">{title}</h1>
            <p className="mt-4 max-w-[42rem] text-[1rem] leading-7 text-white/84 sm:text-[1.08rem] sm:leading-8">
              {resolveLocalizedValue(project.summary, language)}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="founder-profile-chip border-white/16 bg-white/8 text-white/86">
                {project.client}
              </span>
              <span className="founder-profile-chip border-white/16 bg-white/8 text-white/78">
                {resolveLocalizedValue(project.format, language)}
              </span>
              <span className="founder-profile-chip border-white/16 bg-white/8 text-white/72">
                {resolveLocalizedValue(project.role, language)}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal>
            <article className="card-surface overflow-hidden rounded-[2rem]">
              <div className="relative aspect-video w-full bg-[#05070b]">
                <EmbeddedVideoPlayer
                  title={project.title}
                  video={project.video}
                  externalVideo={project.externalVideo}
                  image={project.image}
                  imageAlt={project.imageAlt}
                  mediaFit={project.mediaFit}
                  priority
                  showControls
                  className="relative h-full w-full"
                  sizes="100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.02),rgba(5,7,11,0.14))]" />
              </div>

              <div className="grid gap-6 px-5 py-5 sm:px-7 sm:py-7 lg:grid-cols-[minmax(0,0.96fr)_minmax(18rem,1.04fr)] lg:items-end">
                <div className="space-y-3">
                  <span className="eyebrow">{project.client}</span>
                  <h2 className="section-title text-[color:var(--foreground)]">
                    {language === "no" ? "Prosjektet" : "The project"}
                  </h2>
                  <p className="body-lead text-[var(--muted-2)]">
                    {resolveLocalizedValue(project.summary, language)}
                  </p>
                  {parentTitle ? (
                    <p className="body-copy text-[var(--muted)]">
                      {language === "no"
                        ? `Dette er en egen prosjektside fra samme spor som ${parentTitle}.`
                        : `This is a dedicated project page from the same body of work as ${parentTitle}.`}
                    </p>
                  ) : null}
                  {availabilityNote ? (
                    <p className="body-copy text-[var(--muted)]">{availabilityNote}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:justify-end">
                  {action ? (
                    <ButtonLink
                      href={action.href}
                      className="w-full sm:w-auto"
                      target={action.isExternal ? "_blank" : undefined}
                      rel={action.isExternal ? "noreferrer noopener" : undefined}
                    >
                      {action.label}
                    </ButtonLink>
                  ) : null}
                  <ButtonLink href="/kontakt" variant="ghost" className="w-full sm:w-auto">
                    {language === "no" ? "Snakk med oss om lignende prosjekt" : "Talk to us about a similar project"}
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>
            </article>
          </Reveal>

          {relatedProjects.length ? (
            <Reveal className="mt-8" delay={0.05}>
              <div className="card-surface rounded-[2rem] px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="eyebrow">{groupTitle}</span>
                    <h2 className="feature-title mt-2 text-[color:var(--foreground)]">
                      {language === "no" ? "Flere egne prosjektsider" : "More dedicated project pages"}
                    </h2>
                  </div>
                  <ButtonLink href="/team/gard-ruben-fauske" variant="ghost" size="compact">
                    {language === "no" ? "Hele Gard-oversikten" : "Full Gard overview"}
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </ButtonLink>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedProjects.map((relatedProject) => (
                    <Link
                      key={relatedProject.slug}
                      href={getGardProjectPath(relatedProject.slug)}
                      className="group rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--surface)]/72 p-4 transition duration-300 hover:border-[color:var(--accent)]/38 hover:bg-[color:var(--surface-2)]"
                    >
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                        {relatedProject.client}
                      </p>
                      <h3 className="mt-2 text-base font-semibold leading-snug text-[color:var(--foreground)]">
                        {resolveLocalizedValue(relatedProject.title, language)}
                      </h3>
                      <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--foreground)]/72 group-hover:text-[color:var(--foreground)]">
                        {language === "no" ? "Åpne side" : "Open page"}
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>
    </main>
  );
}
