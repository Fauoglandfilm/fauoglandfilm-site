"use client";

import Image from "next/image";
import Link from "next/link";

import { PreviewMedia } from "@/components/media/preview-media";
import { Reveal } from "@/components/motion/reveal";
import { ProfileImageCard } from "@/components/pages/profile-image-card";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import {
  gardProfilePage,
  getGardProjectPath,
  type GardProject,
  type GardProjectGroup,
} from "@/data/gard-profile";
import { siteConfig } from "@/data/site-content";
import { resolveLocalizedValue } from "@/lib/i18n";

function hasPlayableMedia(project: GardProject) {
  return Boolean(project.video || project.externalVideo);
}

function GardEditorialCase({
  project,
}: {
  project: GardProject;
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(project.title, language);
  const projectHref = getGardProjectPath(project.slug);

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden rounded-[1.7rem] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--line-strong)]">
      <div className="media-frame relative aspect-[16/10] min-h-[10.5rem] overflow-hidden rounded-b-none bg-[#07090d]">
        <Link
          href={projectHref}
          aria-label={language === "no" ? `Åpne ${title}` : `Open ${title}`}
          className="absolute inset-0 z-[3]"
        />

        <PreviewMedia
          title={project.title}
          video={project.video}
          externalVideo={project.externalVideo}
          image={project.image}
          imageAlt={project.imageAlt}
          mediaFit={project.mediaFit}
          previewBehavior={hasPlayableMedia(project) ? "viewport" : "static"}
          className="absolute inset-0"
          sizes="(min-width: 1280px) 23vw, (min-width: 768px) 45vw, 100vw"
          posterClassName="transition duration-700 group-hover:scale-[1.025]"
          previewClassName="transition duration-700"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.02),rgba(6,7,10,0.08)_38%,rgba(6,7,10,0.82)_100%)]" />
        <div className="grain-overlay absolute inset-0 opacity-22" />

        <div className="absolute inset-x-3 bottom-3 z-[4] flex flex-wrap items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/78">
          <span>{project.client}</span>
          {project.year ? (
            <>
              <span className="h-1 w-1 rounded-full bg-white/32" />
              <span>{project.year}</span>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="founder-profile-chip">{resolveLocalizedValue(project.format, language)}</span>
          <span className="founder-profile-chip founder-profile-chip-muted">
            {resolveLocalizedValue(project.role, language)}
          </span>
        </div>

        <h3 className="mt-3 text-[1.18rem] font-semibold leading-[1.05] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[1.28rem]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
          {resolveLocalizedValue(project.summary, language)}
        </p>

        <div className="mt-auto grid gap-2 pt-5">
          <ButtonLink href={projectHref} size="compact" className="w-full">
            {language === "no" ? "Åpne prosjektside" : "Open project page"}
          </ButtonLink>
          <ButtonLink href="/kontakt" variant="ghost" size="compact" className="w-full">
            {language === "no" ? "Snakk med oss om prosjektet" : "Talk to us about the project"}
            <ArrowUpRightIcon className="h-4 w-4" />
          </ButtonLink>
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

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {group.projects.map((project, index) => (
            <Reveal key={project.slug} delay={0.04 * index}>
              <GardEditorialCase project={project} />
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
