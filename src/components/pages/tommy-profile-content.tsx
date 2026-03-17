"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import {
  tommyProfilePage,
  type TommyFeaturedProject,
  type TommySecondaryProjectGroup,
} from "@/data/tommy-profile";
import { siteConfig } from "@/data/site-content";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function TommyFeaturedProjectCard({
  project,
  index,
}: {
  project: TommyFeaturedProject;
  index: number;
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(project.title, language);
  const role = resolveLocalizedValue(project.role, language);

  return (
    <Reveal delay={0.04 * index}>
      <article className="card-surface overflow-hidden rounded-[1.85rem] shadow-[0_24px_72px_rgba(0,0,0,0.14)]">
        <div className="media-frame relative aspect-[0.92/1] overflow-hidden bg-[#0a0c11]">
          <Image
            src={project.image}
            alt={resolveLocalizedValue(project.imageAlt, language)}
            fill
            sizes="(min-width: 1440px) 24vw, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
            className={cn(
              "transition duration-700",
              project.mediaFit === "contain" ? "object-contain p-5 sm:p-6" : "object-cover",
            )}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,12,0.03),rgba(8,9,12,0.18)_52%,rgba(8,9,12,0.76)_100%)]" />
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-wrap items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            <span>{role}</span>
            {project.year ? (
              <>
                <span className="h-1 w-1 rounded-full bg-[color:var(--muted)]/40" />
                <span>{project.year}</span>
              </>
            ) : null}
          </div>

          <h3 className="mt-3 text-[1.34rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-[1.48rem]">
            {title}
          </h3>

          <div className="mt-4 space-y-2.5">
            {project.credibility.map((line) => (
              <p
                key={resolveLocalizedValue(line, language)}
                className="text-sm leading-6 text-[var(--muted-2)] sm:text-[0.95rem] sm:leading-6"
              >
                {resolveLocalizedValue(line, language)}
              </p>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function TommySecondaryGroupCard({
  group,
  index,
}: {
  group: TommySecondaryProjectGroup;
  index: number;
}) {
  const { language } = useSitePreferences();

  return (
    <Reveal delay={0.05 * index}>
      <article className="glass-panel rounded-[1.85rem] px-5 py-5 sm:px-6 sm:py-6">
        <h3 className="text-[1.12rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)] sm:text-[1.2rem]">
          {resolveLocalizedValue(group.title, language)}
        </h3>

        <div className="mt-4 divide-y divide-[color:var(--line)]/70">
          {group.items.map((item) => (
            <div key={resolveLocalizedValue(item.title, language)} className="py-3 first:pt-0 last:pb-0">
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                {resolveLocalizedValue(item.title, language)}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-[var(--muted-2)]">
                {resolveLocalizedValue(item.description, language)}
              </p>
            </div>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export function TommyProfileContent() {
  const { language } = useSitePreferences();
  const profile = tommyProfilePage.baseProfile;
  const backgroundUsesPortrait = profile.heroBackground === profile.portrait;

  return (
    <main>
      <section className="relative isolate overflow-hidden pt-22 sm:pt-28">
        <div className="absolute inset-0">
          {backgroundUsesPortrait ? (
            <>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,14,0.98),rgba(7,9,14,0.92)_34%,rgba(7,9,14,0.98)_100%)]" />
              <div className="profile-hero-portrait-wrap">
                <div className="profile-hero-portrait-frame founder-portrait-panel">
                  <div className="profile-hero-portrait-shell founder-portrait-shell">
                    <div className="profile-hero-portrait-backdrop" />
                    <div className="profile-hero-portrait-glow" />
                    <Image
                      src={profile.heroBackground}
                      alt={resolveLocalizedValue(profile.heroBackgroundAlt, language)}
                      width={1200}
                      height={1500}
                      priority
                      sizes="(min-width: 1280px) 34vw, (min-width: 768px) 42vw, 78vw"
                      className="profile-hero-portrait-image profile-hero-portrait-image-tommy"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Image
              src={profile.heroBackground}
              alt={resolveLocalizedValue(profile.heroBackgroundAlt, language)}
              fill
              priority
              sizes="100vw"
              className="image-slow-zoom object-cover"
            />
          )}
          <div
            className={cn(
              "absolute inset-0",
              backgroundUsesPortrait
                ? "bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.1),transparent_22%),linear-gradient(92deg,rgba(5,7,11,0.96),rgba(5,7,11,0.9)_22%,rgba(5,7,11,0.56)_44%,rgba(5,7,11,0.18)_68%,rgba(5,7,11,0.62)_100%),linear-gradient(180deg,rgba(6,6,9,0.12),rgba(6,6,9,0.12)_28%,rgba(6,6,9,0.84)_100%)]"
                : "bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(96deg,rgba(5,7,11,0.9),rgba(5,7,11,0.62)_34%,rgba(5,7,11,0.34)_62%,rgba(5,7,11,0.84)_100%),linear-gradient(180deg,rgba(6,6,9,0.12),rgba(6,6,9,0.18)_28%,rgba(6,6,9,0.84)_100%)]",
            )}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(116,150,255,0.16),transparent_22%)]" />
          <div className="grain-overlay absolute inset-0 opacity-38" />
        </div>

        <div className="site-container relative flex min-h-[68svh] items-end py-8 sm:min-h-[72svh] sm:py-10 lg:min-h-[76svh] lg:py-12">
          <Reveal className="max-w-3xl" delay={0.04} y={18}>
            <div className="subpage-hero-panel relative max-w-[36rem] overflow-hidden px-5 py-5 text-white sm:px-7 sm:py-6 lg:px-8 lg:py-7">
              <div className="glass-sheen absolute inset-0 opacity-75" />
              <div className="pointer-events-none absolute -left-10 bottom-[-3rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_72%)] blur-2xl opacity-70" />
              <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(122,168,255,0.24),transparent_68%)] blur-2xl opacity-78" />

              <div className="relative z-[1]">
                <ButtonLink
                  href="/om-oss"
                  variant="ghost"
                  size="compact"
                  className="w-fit border-white/14 text-white/84 hover:border-white/26 hover:text-white"
                >
                  {language === "no" ? "Tilbake til Om oss" : "Back to About"}
                </ButtonLink>

                <span className="hero-badge mt-5 text-white/72">
                  {resolveLocalizedValue(tommyProfilePage.heroTitle, language)}
                </span>
                <h1 className="page-title mt-4 max-w-[10ch] text-white">{profile.name}</h1>
                <p className="mt-4 max-w-[30rem] text-[1rem] leading-7 text-white/84 sm:text-[1.04rem] sm:leading-8">
                  {resolveLocalizedValue(tommyProfilePage.heroIntro, language)}
                </p>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                    {resolveLocalizedValue(tommyProfilePage.heroCtaPrimary, language)}
                  </ButtonLink>
                  <ButtonLink href="/case" variant="secondary" className="w-full sm:w-auto">
                    {resolveLocalizedValue(tommyProfilePage.heroCtaSecondary, language)}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal className="max-w-3xl">
            <div className="space-y-3">
              <span className="eyebrow">{resolveLocalizedValue(tommyProfilePage.keyRolesEyebrow, language)}</span>
              <h2 className="section-title text-[color:var(--foreground)]">
                {resolveLocalizedValue(tommyProfilePage.keyRolesTitle, language)}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 max-w-4xl overflow-hidden rounded-[1.85rem] border border-[color:var(--line)] bg-[color:var(--surface)]/76 backdrop-blur-[20px]">
              {tommyProfilePage.keyRoles.map((line, index) => (
                <div
                  key={resolveLocalizedValue(line, language)}
                  className={cn(
                    "flex items-start gap-3 px-5 py-4 sm:px-6",
                    index !== tommyProfilePage.keyRoles.length - 1 && "border-b border-[color:var(--line)]/70",
                  )}
                >
                  <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]/58" />
                  <p className="text-[0.98rem] leading-7 text-[var(--foreground)]/92 sm:text-[1.02rem]">
                    {resolveLocalizedValue(line, language)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal className="max-w-3xl">
            <div className="space-y-3">
              <span className="eyebrow">{resolveLocalizedValue(tommyProfilePage.featuredEyebrow, language)}</span>
              <h2 className="section-title text-[color:var(--foreground)]">
                {resolveLocalizedValue(tommyProfilePage.featuredTitle, language)}
              </h2>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tommyProfilePage.featuredProjects.map((project, index) => (
              <TommyFeaturedProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal className="max-w-3xl">
            <div className="space-y-3">
              <span className="eyebrow">{resolveLocalizedValue(tommyProfilePage.secondaryEyebrow, language)}</span>
              <h2 className="section-title text-[color:var(--foreground)]">
                {resolveLocalizedValue(tommyProfilePage.secondaryTitle, language)}
              </h2>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-4 xl:grid-cols-3">
            {tommyProfilePage.secondaryGroups.map((group, index) => (
              <TommySecondaryGroupCard key={group.slug} group={group} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal className="max-w-3xl">
            <div className="space-y-3">
              <span className="eyebrow">{resolveLocalizedValue(tommyProfilePage.managementEyebrow, language)}</span>
              <h2 className="section-title text-[color:var(--foreground)]">
                {resolveLocalizedValue(tommyProfilePage.managementTitle, language)}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <article className="glass-panel mt-6 rounded-[1.9rem] px-5 py-5 sm:px-6 sm:py-6">
              <div className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {tommyProfilePage.managementProjects.map((item, index) => (
                  <div
                    key={resolveLocalizedValue(item, language)}
                    className={cn(
                      "border-b border-[color:var(--line)]/70 py-3 text-[1rem] font-medium text-[color:var(--foreground)]",
                      index === tommyProfilePage.managementProjects.length - 1 && "border-b-0",
                      tommyProfilePage.managementProjects.length % 2 === 0 &&
                        index === tommyProfilePage.managementProjects.length - 2 &&
                        "sm:border-b-0",
                    )}
                  >
                    {resolveLocalizedValue(item, language)}
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal>
            <article className="glass-panel overflow-hidden rounded-[2rem] px-5 py-6 sm:px-6 sm:py-6 lg:px-7">
              <div className="glass-sheen absolute inset-0 opacity-40" />
              <div className="relative z-[1] max-w-3xl space-y-3">
                <span className="eyebrow">{profile.name}</span>
                <h2 className="section-title text-[color:var(--foreground)]">
                  {resolveLocalizedValue(tommyProfilePage.ctaTitle, language)}
                </h2>
                <p className="body-lead max-w-2xl text-[var(--muted-2)]">
                  {resolveLocalizedValue(tommyProfilePage.ctaDescription, language)}
                </p>
              </div>

              <div className="relative z-[1] mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                  {resolveLocalizedValue(tommyProfilePage.ctaPrimaryLabel, language)}
                </ButtonLink>
                <ButtonLink href="/kontakt" variant="ghost" className="w-full sm:w-auto">
                  {resolveLocalizedValue(tommyProfilePage.ctaSecondaryLabel, language)}
                  <ArrowUpRightIcon className="h-4 w-4" />
                </ButtonLink>
              </div>

              <p className="relative z-[1] mt-4 text-sm leading-6 text-[var(--muted)]">
                {tommyProfilePage.contactEmail} · {tommyProfilePage.contactPhone} · {siteConfig.locationLabel}
              </p>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
