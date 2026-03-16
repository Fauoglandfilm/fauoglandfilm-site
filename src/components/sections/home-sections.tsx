"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import {
  aboutStudioContent,
  caseStudies,
  clientLogos,
  homeHeroContent,
  servicePillars,
  siteConfig,
  type ServicePillar,
  type WorkSample,
  videoLibrary,
} from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

import { FloatingLayer, Reveal } from "../motion/reveal";
import { ButtonLink } from "../ui/button-link";
import { ArrowUpRightIcon, MailIcon, PhoneIcon, PinIcon } from "../ui/icons";
import { ClientLogoMarquee } from "./client-logo-marquee";
import { ContactForm } from "./contact-form";
import { WorkGrid } from "./home-work-grid";

export function HeroSection() {
  const heroVideo = videoLibrary.hero;
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.18),rgba(7,7,7,0.1)_28%,rgba(7,7,7,0.42)_65%,rgba(7,7,7,0.72)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[88svh] max-w-7xl items-end px-5 pb-10 pt-30 sm:px-6 sm:pb-12 lg:min-h-[84vh] lg:px-8 lg:pb-14 lg:pt-32">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-4xl">
            <Reveal className="space-y-5" y={36}>
              <div className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/82 backdrop-blur">
                {copy.heroBadge}
              </div>
              <h1 className="max-w-4xl text-balance font-display text-[3rem] leading-[0.88] text-white sm:text-[4.6rem] lg:text-[5.9rem]">
                {resolveLocalizedValue(homeHeroContent.title, language)}
              </h1>
              <p className="max-w-xl text-[1rem] leading-7 text-white/76 sm:text-[1.08rem]">
                {resolveLocalizedValue(homeHeroContent.description, language)}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={homeHeroContent.ctaHref}
                className="bg-white text-[#111111] hover:bg-white/92"
              >
                {resolveLocalizedValue(homeHeroContent.ctaLabel, language)}
              </ButtonLink>
              <ButtonLink
                href="/kontakt"
                variant="secondary"
                className="border-white/16 bg-white/8 text-white hover:border-white/28 hover:bg-white/14"
              >
                {copy.heroSecondaryCta}
              </ButtonLink>
            </Reveal>
          </div>

          <FloatingLayer className="hidden lg:block">
            <Reveal delay={0.16}>
              <div className="rounded-[2rem] border border-white/12 bg-[rgba(255,255,255,0.08)] p-6 text-white backdrop-blur-xl">
                <div className="space-y-3">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/58">
                    {copy.heroPanelEyebrow}
                  </p>
                  <p className="font-display text-[2rem] leading-[0.96]">
                    {copy.heroPanelTitle}
                  </p>
                  <p className="text-sm leading-6 text-white/68">
                    {copy.heroPanelDescription}
                  </p>
                </div>
              </div>
            </Reveal>
          </FloatingLayer>
        </div>
      </div>
    </section>
  );
}

export function SelectedWorkSection({ items }: { items: WorkSample[] }) {
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  return (
    <section id="selected-work" className="section-space">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="eyebrow">{copy.selectedWorkEyebrow}</span>
            <h2 className="font-display text-[2.2rem] leading-[0.94] text-[color:var(--foreground)] sm:text-[3rem] lg:text-[4rem]">
              {copy.selectedWorkTitle}
            </h2>
            <p className="max-w-2xl text-[0.98rem] leading-7 text-[var(--muted-2)]">
              {copy.selectedWorkDescription}
            </p>
          </div>
          <div className="text-sm text-[var(--muted)]">{copy.selectedWorkHint}</div>
        </div>

        <div className="mt-8">
          <WorkGrid items={items} />
        </div>
      </div>
    </section>
  );
}

export function ClientSlider() {
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  return (
    <section className="bg-[color:var(--background)] py-5 sm:py-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">{copy.clientsEyebrow}</p>
          <p className="text-sm text-[var(--muted)]">{copy.clientsDescription}</p>
        </div>
        <div className="mt-5">
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
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="eyebrow">{copy.servicesEyebrow}</span>
          <h2 className="font-display text-[2.2rem] leading-[0.94] text-[color:var(--foreground)] sm:text-[3rem] lg:text-[4rem]">
            {copy.servicesTitle}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
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

  return (
    <Reveal delay={delay}>
      <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--foreground)] text-sm font-semibold text-[color:var(--background)]">
          {pillar.eyebrow}
        </div>
        <h3 className="mt-5 font-display text-[1.6rem] leading-[0.98] text-[color:var(--foreground)]">
          {resolveLocalizedValue(pillar.title, language)}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
          {resolveLocalizedValue(pillar.summary, language)}
        </p>
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
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <FloatingLayer>
          <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[#111111] text-white shadow-[0_40px_120px_rgba(15,15,15,0.14)]">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div
                className="relative min-h-[21rem] overflow-hidden p-6 sm:p-8 lg:min-h-[30rem] lg:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(214,193,154,0.3), rgba(97,84,64,0.08) 42%, rgba(8,8,8,0.82) 100%)",
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(181,154,103,0.24),transparent_28%)] transition duration-700 motion-safe:group-hover:scale-[1.02]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/58">
                      {copy.featuredCaseEyebrow}
                    </span>
                    <h2 className="max-w-md font-display text-[2.2rem] leading-[0.92] sm:text-[3rem]">
                      {featuredCase.client}
                    </h2>
                    <p className="max-w-md text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
                      {resolveLocalizedValue(featuredCase.summary, language)}
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-3">
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

              <div className="bg-[#161616] p-6 sm:p-8 lg:p-10">
                <div className="max-w-xl space-y-5">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                      {copy.featuredCaseWhy}
                    </p>
                    <h3 className="mt-3 font-display text-[2rem] leading-[0.96] sm:text-[2.6rem]">
                      {resolveLocalizedValue(featuredCase.title, language)}
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
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

                  <ButtonLink
                    href={`/case/${featuredCase.slug}`}
                    className="bg-white text-[#111111] hover:bg-white/92"
                    icon={<ArrowUpRightIcon className="h-4 w-4" />}
                  >
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
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <FloatingLayer className="relative overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_32px_100px_rgba(18,18,18,0.08)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_34%,rgba(17,17,17,0.36)_100%)]" />
            <Image
              src={aboutStudioContent.image}
              alt={resolveLocalizedValue(aboutStudioContent.imageAlt, language)}
              width={6000}
              height={3375}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </FloatingLayer>

          <div className="max-w-2xl space-y-5">
            <span className="eyebrow">{resolveLocalizedValue(aboutStudioContent.eyebrow, language)}</span>
            <h2 className="font-display text-[2.2rem] leading-[0.94] text-[color:var(--foreground)] sm:text-[3rem] lg:text-[4rem]">
              {resolveLocalizedValue(aboutStudioContent.title, language)}
            </h2>
            <p className="text-[0.98rem] leading-7 text-[var(--muted-2)] sm:text-base sm:leading-8">
              {resolveLocalizedValue(aboutStudioContent.description, language)}
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {aboutStudioContent.stats.map((stat, index) => (
                <div key={`${stat.value}-${index}`} className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-[0_18px_44px_rgba(18,18,18,0.05)]">
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {resolveLocalizedValue(stat.label, language)}
                  </p>
                  <p className="mt-2 font-display text-[1.55rem] text-[color:var(--foreground)]">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/om-oss" icon={<ArrowUpRightIcon className="h-4 w-4" />}>
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
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <article className="card-surface rounded-[2rem] p-5 sm:p-6 lg:p-7">
            <span className="eyebrow">{copy.contactEyebrow}</span>
            <h2 className="mt-4 font-display text-[2.1rem] leading-[0.94] text-[color:var(--foreground)] sm:text-[2.8rem]">
              {copy.contactTitle}
            </h2>
            <p className="mt-4 max-w-lg text-[0.96rem] leading-7 text-[var(--muted-2)]">
              {copy.contactDescription}
            </p>

            <div className="mt-8 grid gap-5">
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
          </article>

          <article className="card-surface rounded-[2rem] p-5 sm:p-6 lg:p-7">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                {copy.contactProjectBrief}
              </p>
              <h3 className="mt-3 font-display text-[2rem] leading-[0.96] text-[color:var(--foreground)] sm:text-[2.6rem]">
                {copy.contactProjectTitle}
              </h3>
            </div>
            <div className="mt-6">
              <ContactForm />
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
    <div className="flex items-start gap-4 rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4 transition duration-300 hover:-translate-y-0.5">
      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[color:var(--background)]">
        {icon}
      </div>
      <div>
        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
        <p className="mt-1 text-base text-[color:var(--foreground)] sm:text-lg">{value}</p>
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
