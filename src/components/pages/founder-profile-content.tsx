"use client";

import Image from "next/image";

import { FloatingLayer, Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { CtaBanner } from "@/components/sections/site-sections";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { FounderProfile } from "@/data/founder-profiles";
import { resolveLocalizedValue } from "@/lib/i18n";

export function FounderProfileContent({ profile }: { profile: FounderProfile }) {
  const { language } = useSitePreferences();
  const backLabel = language === "no" ? "Tilbake til Om oss" : "Back to About";
  const introLabel = language === "no" ? "Kort profil" : "Profile";
  const strengthsLabel = language === "no" ? "Styrker" : "Strengths";

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(90deg,rgba(5,7,11,0.82),rgba(5,7,11,0.44)_34%,rgba(5,7,11,0.48)_58%,rgba(5,7,11,0.84)_100%),linear-gradient(180deg,rgba(6,6,9,0.1),rgba(6,6,9,0.24)_28%,rgba(6,6,9,0.76)_100%)]" />
          <div className="grain-overlay absolute inset-0 opacity-38" />
        </div>

        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-end px-4 pb-8 sm:min-h-[66svh] sm:px-6 sm:pb-10 lg:min-h-[72svh] lg:px-8 lg:pb-12">
          <div className="grid w-full gap-5 lg:grid-cols-[0.9fr_0.72fr] lg:items-end">
            <Reveal className="max-w-3xl" delay={0.04} y={18}>
              <div className="px-1 py-2 text-white sm:px-0 sm:py-4">
                <ButtonLink href="/om-oss" variant="ghost" size="compact" className="w-fit border-white/16 text-white/86 hover:border-white/26 hover:text-white">
                  {backLabel}
                </ButtonLink>

                <span className="hero-badge mt-5 text-white/72">
                  {resolveLocalizedValue(profile.role, language)}
                </span>
                <h1 className="page-title mt-4 max-w-[12ch] text-white">{profile.name}</h1>
                <p className="body-lead mt-4 max-w-2xl text-[1rem] leading-7 text-white/86 sm:text-[1.05rem] sm:leading-8">
                  {resolveLocalizedValue(profile.tagline, language)}
                </p>
                <p className="body-copy mt-4 max-w-[40rem] text-white/74 sm:text-base sm:leading-7">
                  {resolveLocalizedValue(profile.summary, language)}
                </p>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                  <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                    {resolveLocalizedValue(profile.ctaLabel, language)}
                  </ButtonLink>
                  <ButtonLink href="/case" variant="secondary" className="w-full sm:w-auto">
                    {language === "no" ? "Se porteføljen" : "View portfolio"}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <FloatingLayer className="lg:justify-self-end">
              <div className="founder-portrait-panel">
                <div className="founder-portrait-shell relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(180deg,rgba(19,24,36,0.62),rgba(19,24,36,0.2)_38%,rgba(19,24,36,0.52)_100%)]" />
                  <Image
                    src={profile.portrait}
                    alt={resolveLocalizedValue(profile.portraitAlt, language)}
                    fill
                    sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 34vw, 100vw"
                    className="object-contain object-bottom p-4 sm:p-5"
                  />
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
                      {resolveLocalizedValue(profile.introEyebrow, language)}
                    </p>
                    <h2 className="feature-title mt-3 max-w-lg text-white">
                      {resolveLocalizedValue(profile.introTitle, language)}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
                      {resolveLocalizedValue(profile.introBody, language)}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {profile.strengths.map((strength, index) => (
                <Reveal key={resolveLocalizedValue(strength.title, language)} delay={0.05 * index}>
                  <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {strengthsLabel}
                    </p>
                    <h3 className="card-title mt-3 text-[color:var(--foreground)]">
                      {resolveLocalizedValue(strength.title, language)}
                    </h3>
                    <p className="body-copy mt-3 text-[var(--muted-2)]">
                      {resolveLocalizedValue(strength.description, language)}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="eyebrow">{resolveLocalizedValue(profile.highlightsEyebrow, language)}</span>
            <h2 className="section-title text-[color:var(--foreground)]">
              {resolveLocalizedValue(profile.highlightsTitle, language)}
            </h2>
            <p className="body-lead text-[var(--muted-2)]">
              {resolveLocalizedValue(profile.highlightsDescription, language)}
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {profile.highlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={0.05 * index}>
                <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {resolveLocalizedValue(highlight.eyebrow, language)}
                  </p>
                  <h3 className="card-title mt-3 text-[color:var(--foreground)]">{highlight.title}</h3>
                  <p className="body-copy mt-3 text-[var(--muted-2)]">
                    {resolveLocalizedValue(highlight.description, language)}
                  </p>
                  {highlight.href ? (
                    <div className="mt-5">
                      <ButtonLink href={highlight.href} variant="ghost" size="compact" className="w-full sm:w-auto">
                        {resolveLocalizedValue(
                          highlight.ctaLabel ?? { no: "Se prosjekt", en: "View project" },
                          language,
                        )}
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </ButtonLink>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="eyebrow">{resolveLocalizedValue(profile.backgroundEyebrow, language)}</span>
            <h2 className="section-title text-[color:var(--foreground)]">
              {resolveLocalizedValue(profile.backgroundTitle, language)}
            </h2>
            <p className="body-lead text-[var(--muted-2)]">
              {resolveLocalizedValue(profile.backgroundDescription, language)}
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {profile.backgroundGroups.map((group, index) => (
              <Reveal key={resolveLocalizedValue(group.title, language)} delay={0.05 * index}>
                <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {introLabel}
                  </p>
                  <h3 className="card-title mt-3 text-[color:var(--foreground)]">
                    {resolveLocalizedValue(group.title, language)}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <div key={resolveLocalizedValue(item, language)} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <p className="body-copy text-[var(--muted-2)]">{resolveLocalizedValue(item, language)}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={profile.ctaTitle}
        description={profile.ctaDescription}
        primaryLabel={profile.ctaLabel}
        primaryHref="/kontakt"
        secondaryLabel={{ no: "Tilbake til Om oss", en: "Back to About" }}
        secondaryHref="/om-oss"
        align="center"
      />
    </main>
  );
}
