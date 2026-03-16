"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import {
  aboutStudioContent,
  caseStudies,
  clientLogos,
  homeHeroContent,
  homeIntroContent,
  servicePillars,
  siteConfig,
  teamMembers,
  type CaseStudy,
  type ServicePillar,
  videoLibrary,
} from "@/data/site-content";
import { homeShowcaseVisuals, servicePillarVisuals, siteVisuals } from "@/data/visual-assets";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

import { FloatingLayer, Reveal } from "../motion/reveal";
import { ButtonLink } from "../ui/button-link";
import { ArrowUpRightIcon, MailIcon, PhoneIcon, PinIcon } from "../ui/icons";
import { SocialLinksRow } from "../ui/social-links";
import { CaseCard } from "./case-card";
import { ClientLogoMarquee } from "./client-logo-marquee";
import { ContactForm } from "./contact-form";

export function HeroSection() {
  const heroVideo = videoLibrary.hero;
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  return (
    <section className="section-vignette hero-section relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <div className="ambient-drift pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(210,173,116,0.28),transparent_72%)] blur-3xl" />
        <div className="ambient-drift pointer-events-none absolute right-[-5rem] top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(93,126,175,0.22),transparent_72%)] blur-3xl" />
        <video
          className="relative z-[1] h-full w-full scale-[1.03] object-cover opacity-[0.96] brightness-[0.78] saturate-[0.98] contrast-[1.08]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroVideo.poster}
        >
          {heroVideo.mobileSrc ? (
            <source media="(max-width: 767px)" src={heroVideo.mobileSrc} type="video/mp4" />
          ) : null}
          <source src={heroVideo.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.5)_0%,rgba(5,7,12,0.34)_22%,rgba(5,7,12,0.46)_56%,rgba(5,7,12,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,12,0.8)_0%,rgba(5,7,12,0.64)_18%,rgba(5,7,12,0.28)_46%,rgba(5,7,12,0.12)_70%,rgba(5,7,12,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,177,117,0.16),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(98,141,255,0.16),transparent_22%),radial-gradient(circle_at_center,transparent_28%,rgba(3,4,6,0.22)_100%)]" />
        <div className="grain-overlay absolute inset-0 opacity-54" />
      </div>

      <div className="relative mx-auto flex min-h-[80svh] max-w-7xl items-center px-4 pb-10 pt-[6.5rem] sm:min-h-[85svh] sm:px-6 sm:pb-12 sm:pt-[7.5rem] lg:min-h-[86vh] lg:px-8 lg:pb-14 lg:pt-32">
        <div className="hero-copy w-full max-w-[46rem]">
          <Reveal y={18}>
            <div className="hero-glass-panel max-w-[42rem]">
              <div className="glass-sheen absolute inset-0 opacity-75" />
              <div className="hero-panel-orb" />
              <div className="hero-panel-orb hero-panel-orb-secondary" />

              <div className="hero-panel-content space-y-4 p-5 sm:space-y-5 sm:p-7 lg:p-8">
                <p className="hero-badge max-w-full">
                  {copy.heroBadge}
                </p>
                <h1 className="hero-title max-w-[11ch] text-white">
                  {resolveLocalizedValue(homeHeroContent.title, language)}
                </h1>
                <p className="hero-body body-lead max-w-[38rem] sm:max-w-[34rem]">
                  {resolveLocalizedValue(homeHeroContent.description, language)}
                </p>

                <div className="hero-cta-row mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
                  <ButtonLink href={homeHeroContent.ctaHref} className="hero-cta-primary w-full sm:w-auto">
                    {resolveLocalizedValue(homeHeroContent.ctaLabel, language)}
                  </ButtonLink>
                  <ButtonLink
                    href="#selected-work"
                    variant="secondary"
                    className="hero-cta-secondary w-full sm:w-auto"
                  >
                    {copy.heroSecondaryCta}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function SelectedWorkSection({ items }: { items: CaseStudy[] }) {
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  return (
    <section id="selected-work" className="section-space">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-2.5 sm:space-y-3">
            <span className="eyebrow">{copy.selectedWorkEyebrow}</span>
            <h2 className="section-title text-[color:var(--foreground)]">
              {copy.selectedWorkTitle}
            </h2>
            <p className="body-lead max-w-2xl text-[var(--muted-2)]">
              {copy.selectedWorkDescription}
            </p>
          </div>
          <div className="body-copy text-[var(--muted)] lg:max-w-xs lg:text-right">{copy.selectedWorkHint}</div>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8">
          {items.map((caseStudy, index) => (
            <Reveal key={caseStudy.slug} delay={0.05 * index}>
              <CaseCard
                caseStudy={caseStudy}
                layout={index === 0 ? "feature" : "stack"}
                showVerificationNote={false}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IntroSection() {
  const { language } = useSitePreferences();
  const servicePreview =
    caseStudies.find((entry) => entry.slug === "ville-gleder") ?? caseStudies[0];

  return (
    <section className="py-4 sm:py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="glass-panel rounded-[1.8rem] px-5 py-5 shadow-[0_28px_90px_rgba(0,0,0,0.18)] sm:rounded-[1.95rem] sm:px-6 sm:py-6">
              <div className="max-w-4xl space-y-3">
                <span className="eyebrow">{resolveLocalizedValue(homeIntroContent.eyebrow, language)}</span>
                <h2 className="section-title text-[color:var(--foreground)]">
                  {resolveLocalizedValue(homeIntroContent.title, language)}
                </h2>
                <p className="body-copy max-w-3xl text-[var(--muted-2)] sm:text-base sm:leading-7">
                  {resolveLocalizedValue(homeIntroContent.description, language)}
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/[0.04] p-4 backdrop-blur-xl">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {language === "no" ? "Arbeidsform" : "Working model"}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
                    {language === "no"
                      ? "Små team, raske beslutninger og tydelig regi gjennom hele produksjonen."
                      : "Small teams, fast decisions and clear direction throughout production."}
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/[0.04] p-4 backdrop-blur-xl">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {language === "no" ? "Leveranser" : "Deliverables"}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
                    {language === "no"
                      ? "Showreel, kampanje, nettsidefilm, sosialt innhold og etterbruk fra samme opptak."
                      : "Showreels, campaigns, website films, social content and cutdowns from the same production."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-3 sm:grid-cols-[1.16fr_0.84fr]">
              <div className="media-frame relative overflow-hidden rounded-[1.8rem]">
                <div className="relative aspect-[1.18/0.92] min-h-[16rem]">
                  {servicePreview.video?.videoType === "direct" ? (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={servicePreview.video.poster}
                    >
                      <source src={servicePreview.video.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={siteVisuals.introShowcase.src}
                      alt={resolveLocalizedValue(siteVisuals.introShowcase.alt, language)}
                      fill
                      sizes="(min-width: 1024px) 36vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.06),rgba(7,7,7,0.46)_68%,rgba(7,7,7,0.9))]" />
                  <div className="grain-overlay absolute inset-0 opacity-45" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/58">
                      {language === "no" ? "Utvalgt prosjekt" : "Selected project"}
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/78 sm:text-base">
                      {resolveLocalizedValue(servicePreview.summary, language)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {[homeShowcaseVisuals.secondary, homeShowcaseVisuals.tertiary]
                  .filter(Boolean)
                  .map((visual, index) => (
                    <div key={visual!.src} className="media-frame relative overflow-hidden rounded-[1.45rem]">
                      <div className="relative aspect-[1.08/0.74]">
                        <Image
                          src={visual!.src}
                          alt={resolveLocalizedValue(visual!.alt, language)}
                          fill
                          sizes="(min-width: 1024px) 15vw, 50vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.04),rgba(7,7,7,0.62)_100%)]" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/54">
                            {index === 0
                              ? language === "no"
                                ? "Kampanje"
                                : "Campaign"
                              : language === "no"
                                ? "Narrativt"
                                : "Narrative"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ClientSlider() {
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  return (
    <section className="py-4 sm:py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">{copy.clientsEyebrow}</p>
          <p className="body-copy text-[var(--muted)]">{copy.clientsDescription}</p>
        </div>
        <div className="relative mt-5">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_62%)] opacity-70 blur-2xl" />
          <div className="pointer-events-none absolute inset-x-[12%] top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)]" />
          <ClientLogoMarquee logos={clientLogos} durationSeconds={34} />
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  return (
    <section className="section-space">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-2.5 sm:space-y-3">
          <span className="eyebrow">{copy.servicesEyebrow}</span>
          <h2 className="section-title text-[color:var(--foreground)]">
            {copy.servicesTitle}
          </h2>
        </div>

        <div className="mt-6 grid gap-3.5 sm:mt-8 sm:gap-4 md:grid-cols-2">
          {servicePillars.map((pillar, index) => (
            <ServicePillarCard key={pillar.eyebrow} pillar={pillar} delay={0.05 * index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicePillarCard({
  pillar,
  delay,
}: {
  pillar: ServicePillar;
  delay: number;
}) {
  const { language } = useSitePreferences();
  const visual = servicePillarVisuals[pillar.eyebrow];

  return (
    <Reveal delay={delay}>
      <article className="card-surface group overflow-hidden rounded-[1.6rem] sm:rounded-[1.8rem]">
        <div className="relative aspect-[1.08/0.82] overflow-hidden">
          <Image
            src={visual.src}
            alt={resolveLocalizedValue(visual.alt, language)}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.04),rgba(8,8,8,0.52)_100%)]" />
          <div className="grain-overlay absolute inset-0 opacity-35" />
          <div className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-[1.05rem] border border-white/12 bg-black/28 text-sm font-semibold text-white backdrop-blur sm:h-11 sm:w-11 sm:rounded-2xl">
            {pillar.eyebrow}
          </div>
        </div>

        <div className="p-4.5 sm:p-6">
          <h3 className="card-title text-[color:var(--foreground)]">
            {resolveLocalizedValue(pillar.title, language)}
          </h3>
          <p className="body-copy mt-2.5 text-[var(--muted-2)] sm:mt-3">
            {resolveLocalizedValue(pillar.summary, language)}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

export function FeaturedCase() {
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];
  const featuredCase =
    caseStudies.find((entry) => entry.slug === "nei-til-atomvapen") ?? caseStudies[0];

  return (
    <section className="section-space pt-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FloatingLayer>
          <div className="overflow-hidden rounded-[1.8rem] border border-[color:var(--line)] bg-[#111111] text-white shadow-[0_40px_120px_rgba(15,15,15,0.14)] sm:rounded-[2rem]">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div
                className="relative min-h-[18rem] overflow-hidden p-5 sm:min-h-[21rem] sm:p-8 lg:min-h-[30rem] lg:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(214,193,154,0.3), rgba(97,84,64,0.08) 42%, rgba(8,8,8,0.82) 100%)",
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(181,154,103,0.24),transparent_28%)] transition duration-700 motion-safe:group-hover:scale-[1.02]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="space-y-2.5 sm:space-y-3">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/58">
                      {copy.featuredCaseEyebrow}
                    </span>
                    <h2 className="feature-title max-w-md">
                      {featuredCase.client}
                    </h2>
                    <p className="body-copy max-w-md text-white/74">
                      {resolveLocalizedValue(featuredCase.summary, language)}
                    </p>
                  </div>

                  <div className="mt-7 grid gap-3 sm:mt-10 sm:grid-cols-3">
                    {featuredCase.metrics.slice(0, 3).map((metric, index) => (
                      <div key={`${metric.value}-${index}`} className="rounded-[1.2rem] border border-white/10 bg-white/8 p-4 backdrop-blur">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/48">
                          {resolveLocalizedValue(metric.label, language)}
                        </p>
                        <p className="mt-2 font-display text-[1.35rem]">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#161616] p-5 sm:p-8 lg:p-10">
                <div className="max-w-xl space-y-4 sm:space-y-5">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                      {copy.featuredCaseWhy}
                    </p>
                    <h3 className="feature-title mt-3">
                      {resolveLocalizedValue(featuredCase.title, language)}
                    </h3>
                  </div>

                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
                    {[
                      { label: copy.featuredCaseGoal, value: resolveLocalizedValue(featuredCase.goal, language) },
                      { label: copy.featuredCaseSolution, value: resolveLocalizedValue(featuredCase.solution, language) },
                      { label: copy.featuredCaseImpact, value: resolveLocalizedValue(featuredCase.impact, language) },
                    ].map((item) => (
                      <div key={item.label} className="border-t border-white/10 pt-4">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/42">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/68">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {featuredCase.tags.map((tag, index) => (
                      <span
                        key={`${featuredCase.slug}-tag-${index}`}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-white/60"
                      >
                        {resolveLocalizedValue(tag, language)}
                      </span>
                    ))}
                  </div>

                  <ButtonLink href={`/case/${featuredCase.slug}`} icon={<ArrowUpRightIcon className="h-4 w-4" />} className="w-full sm:w-auto">
                    {copy.featuredCaseCta}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </FloatingLayer>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  return (
    <section className="section-space">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <FloatingLayer className="glass-panel relative overflow-hidden rounded-[1.9rem] shadow-[0_34px_110px_rgba(0,0,0,0.2)] sm:rounded-[2rem]">
            <div className="glass-sheen absolute inset-0 opacity-50" />
            <div className="grid gap-px bg-[color:var(--line)] lg:grid-cols-[1.1fr_0.9fr]">
              <div className="media-frame relative min-h-[18rem] overflow-hidden sm:min-h-[21rem] lg:min-h-[27rem]">
                <Image
                  src={siteVisuals.filmCrewOutdoors.src}
                  alt={resolveLocalizedValue(siteVisuals.filmCrewOutdoors.alt, language)}
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.08),rgba(7,7,7,0.52)_68%,rgba(7,7,7,0.84)_100%)]" />
                <div className="grain-overlay absolute inset-0 opacity-40" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/56">
                    {language === "no" ? "Produksjonsselskap" : "Production company"}
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/74 sm:text-base">
                    {language === "no"
                      ? "Seniorledet produksjon med tett oppfølging, filmatisk presisjon og korte beslutningslinjer."
                      : "Senior-led production with close follow-up, cinematic precision and a short path to decision-making."}
                  </p>
                </div>
              </div>

              <div className="grid gap-px bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { name: teamMembers[0]?.name, role: teamMembers[0]?.role, image: siteVisuals.teamTommy },
                  { name: teamMembers[1]?.name, role: teamMembers[1]?.role, image: siteVisuals.teamGard },
                ].map((member) => (
                  <div key={member.name} className="group relative aspect-[0.9/1.05] overflow-hidden bg-[color:var(--surface-strong)]">
                    <Image
                      src={member.image.src}
                      alt={resolveLocalizedValue(member.image.alt, language)}
                      fill
                      sizes="(min-width: 1024px) 18vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.02),rgba(17,17,17,0.18)_48%,rgba(17,17,17,0.7)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/62">
                        {resolveLocalizedValue(member.role!, language)}
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
                        {member.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FloatingLayer>

          <div className="max-w-2xl space-y-4 sm:space-y-5">
            <span className="eyebrow">{resolveLocalizedValue(aboutStudioContent.eyebrow, language)}</span>
            <h2 className="section-title text-[color:var(--foreground)]">
              {resolveLocalizedValue(aboutStudioContent.title, language)}
            </h2>
            <p className="body-lead text-[var(--muted-2)]">
              {resolveLocalizedValue(aboutStudioContent.description, language)}
            </p>

            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {aboutStudioContent.stats.map((stat, index) => (
                <div key={`${stat.value}-${index}`} className="rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-[0_18px_44px_rgba(18,18,18,0.05)] sm:rounded-[1.5rem]">
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {resolveLocalizedValue(stat.label, language)}
                  </p>
                  <p className="card-title mt-2 text-[color:var(--foreground)]">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/om-oss" icon={<ArrowUpRightIcon className="h-4 w-4" />} className="w-full sm:w-auto">
                {copy.aboutCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  return (
    <section className="section-space pt-0" id="kontakt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3.5 sm:gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-panel relative overflow-hidden rounded-[1.8rem] p-4.5 shadow-[0_28px_90px_rgba(0,0,0,0.18)] sm:rounded-[2rem] sm:p-6 lg:p-7">
            <div className="glass-sheen absolute inset-0 opacity-50" />
            <span className="eyebrow">{copy.contactEyebrow}</span>
            <h2 className="section-title mt-3 text-[color:var(--foreground)] sm:mt-4">
              {copy.contactTitle}
            </h2>
            <p className="body-lead mt-3 max-w-lg text-[var(--muted-2)] sm:mt-4">
              {copy.contactDescription}
            </p>

            <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5">
              <InfoRow
                icon={<MailIcon className="h-5 w-5" />}
                label={copy.contactMail}
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <InfoRow
                icon={<PhoneIcon className="h-5 w-5" />}
                label={copy.contactPhone}
                value={siteConfig.phonePrimary}
                href={siteConfig.phonePrimaryHref}
              />
              <InfoRow
                icon={<PinIcon className="h-5 w-5" />}
                label={copy.contactLocation}
                value={siteConfig.locationLabel}
              />
            </div>

            <div className="mt-6 border-t border-[color:var(--line)] pt-6">
              <SocialLinksRow
                title={copy.contactSocialTitle}
                description={copy.contactSocialDescription}
                compact
              />
            </div>
          </article>

          <article className="glass-panel overflow-hidden rounded-[1.8rem] shadow-[0_28px_90px_rgba(0,0,0,0.18)] sm:rounded-[2rem]">
            <div className="grid gap-px bg-[color:var(--line)] lg:grid-cols-[0.96fr_1.04fr]">
              <div className="media-frame relative min-h-[15rem] overflow-hidden">
                <Image
                  src={siteVisuals.filmStudioCyclorama.src}
                  alt={resolveLocalizedValue(siteVisuals.filmStudioCyclorama.alt, language)}
                  fill
                  sizes="(min-width: 1024px) 24vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.08),rgba(7,7,7,0.56)_72%,rgba(7,7,7,0.88))]" />
                <div className="grain-overlay absolute inset-0 opacity-40" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/54">
                    {language === "no" ? "Klar for opptak" : "Ready to shoot"}
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/74">
                    {language === "no"
                      ? "Vi svarer raskt med forslag til format, crew og neste steg."
                      : "We reply quickly with the right format, crew and next steps."}
                  </p>
                </div>
              </div>

              <div className="p-4.5 sm:p-6 lg:p-7">
                <div className="max-w-2xl">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    {copy.contactProjectBrief}
                  </p>
                  <h3 className="feature-title mt-3 text-[color:var(--foreground)]">
                    {copy.contactProjectTitle}
                  </h3>
                </div>
                <div className="mt-5 sm:mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3.5 rounded-[1.25rem] border border-[color:var(--line)] bg-white/[0.04] px-4 py-3.5 shadow-[0_18px_48px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 sm:gap-4 sm:rounded-[1.4rem] sm:py-4">
      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[color:var(--background)]">
        {icon}
      </div>
      <div>
        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
        <p className="mt-1 text-[0.98rem] text-[color:var(--foreground)] sm:text-lg">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="transition">
        {content}
      </a>
    );
  }

  return content;
}
