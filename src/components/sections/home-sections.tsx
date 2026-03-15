import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  aboutStudioContent,
  caseStudies,
  clientLogos,
  homeHeroContent,
  servicePillars,
  siteConfig,
  type CaseStudy,
  type ServicePillar,
  type WorkSample,
  videoLibrary,
} from "@/data/site-content";

import { Reveal } from "../motion/reveal";
import { ButtonLink } from "../ui/button-link";
import { ArrowUpRightIcon, MailIcon, PhoneIcon, PinIcon } from "../ui/icons";
import { ClientLogoMarquee } from "./client-logo-marquee";
import { ContactForm } from "./contact-form";
import { WorkGrid } from "./home-work-grid";

export function HeroSection() {
  const heroVideo = videoLibrary.hero;

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
            <Reveal className="space-y-5">
              <div className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/82 backdrop-blur">
                Oslo / International clients / High-end production
              </div>
              <h1 className="max-w-4xl text-balance font-display text-[3rem] leading-[0.88] text-white sm:text-[4.6rem] lg:text-[5.9rem]">
                {homeHeroContent.title}
              </h1>
              <p className="max-w-xl text-[1rem] leading-7 text-white/76 sm:text-[1.08rem]">
                {homeHeroContent.description}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={homeHeroContent.ctaHref}
                className="bg-white text-[#111111] hover:bg-white/92"
              >
                {homeHeroContent.ctaLabel}
              </ButtonLink>
              <ButtonLink
                href="/kontakt"
                variant="secondary"
                className="border-white/16 bg-white/8 text-white hover:border-white/28 hover:bg-white/14"
              >
                Contact us
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="hidden lg:block">
            <div className="rounded-[2rem] border border-white/12 bg-[rgba(255,255,255,0.08)] p-6 text-white backdrop-blur-xl">
              <div className="space-y-3">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/58">
                  Film-first studio
                </p>
                <p className="font-display text-[2rem] leading-[0.96]">
                  Large visual surfaces, lighter editorial framing and a more international posture.
                </p>
                <p className="text-sm leading-6 text-white/68">
                  Built for decision-makers who want the work to feel premium before a single call is booked.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function SelectedWorkSection({ items }: { items: WorkSample[] }) {
  return (
    <section id="selected-work" className="section-space">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="eyebrow">Selected work</span>
            <h2 className="font-display text-[2.2rem] leading-[0.94] text-[#111111] sm:text-[3rem] lg:text-[4rem]">
              A tighter, more cinematic front page built around motion first.
            </h2>
            <p className="max-w-2xl text-[0.98rem] leading-7 text-[var(--muted-2)]">
              Six films, a lighter editorial UI and a modal viewing flow that keeps the work central on both desktop and mobile.
            </p>
          </div>
          <div className="text-sm text-[var(--muted)]">Tap or hover to open the film player.</div>
        </div>

        <div className="mt-8">
          <WorkGrid items={items} />
        </div>
      </div>
    </section>
  );
}

export function ClientSlider() {
  return (
    <section className="border-y border-black/8 bg-[#f2eee7] py-5 sm:py-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">Clients</p>
          <p className="text-sm text-[var(--muted)]">Selected brands, organizations and collaborators</p>
        </div>
        <div className="mt-5">
          <ClientLogoMarquee logos={clientLogos} durationSeconds={34} />
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section-space">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="eyebrow">What we do</span>
          <h2 className="font-display text-[2.2rem] leading-[0.94] text-[#111111] sm:text-[3rem] lg:text-[4rem]">
            Three clear production lanes, framed to be understood fast.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {servicePillars.map((pillar, index) => (
            <ServicePillarCard key={pillar.title} pillar={pillar} delay={0.05 * index} />
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
  return (
    <Reveal delay={delay}>
      <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#111111] text-sm font-semibold text-white">
          {pillar.eyebrow}
        </div>
        <h3 className="mt-5 font-display text-[1.6rem] leading-[0.98] text-[#111111]">
          {pillar.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
          {pillar.summary}
        </p>
      </article>
    </Reveal>
  );
}

export function FeaturedCase() {
  const featuredCase =
    caseStudies.find((entry) => entry.slug === "nei-til-atomvapen") ?? caseStudies[0];

  return (
    <section className="section-space pt-0">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-black/8 bg-[#111111] text-white shadow-[0_40px_120px_rgba(15,15,15,0.14)]">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div
              className="relative min-h-[21rem] overflow-hidden p-6 sm:p-8 lg:min-h-[30rem] lg:p-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(214,193,154,0.3), rgba(97,84,64,0.08) 42%, rgba(8,8,8,0.82) 100%)",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(181,154,103,0.24),transparent_28%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/58">
                    Featured case
                  </span>
                  <h2 className="max-w-md font-display text-[2.2rem] leading-[0.92] sm:text-[3rem]">
                    {featuredCase.client}
                  </h2>
                  <p className="max-w-md text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
                    {featuredCase.summary}
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-3">
                  {featuredCase.metrics.slice(0, 3).map((metric) => (
                    <div key={metric.label} className="rounded-[1.2rem] border border-white/10 bg-white/8 p-4 backdrop-blur">
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/48">
                        {metric.label}
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
                    Why it stands out
                  </p>
                  <h3 className="mt-3 font-display text-[2rem] leading-[0.96] sm:text-[2.6rem]">
                    {featuredCase.title}
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Goal", value: featuredCase.goal },
                    { label: "Solution", value: featuredCase.solution },
                    { label: "Impact", value: featuredCase.impact },
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
                  {featuredCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <ButtonLink
                  href={`/case/${featuredCase.slug}`}
                  className="bg-white text-[#111111] hover:bg-white/92"
                  icon={<ArrowUpRightIcon className="h-4 w-4" />}
                >
                  View case
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="section-space">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-white/70 shadow-[0_32px_100px_rgba(18,18,18,0.08)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_34%,rgba(17,17,17,0.36)_100%)]" />
            <Image
              src={aboutStudioContent.image}
              alt={aboutStudioContent.imageAlt}
              width={6000}
              height={3375}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </div>

          <div className="max-w-2xl space-y-5">
            <span className="eyebrow">{aboutStudioContent.eyebrow}</span>
            <h2 className="font-display text-[2.2rem] leading-[0.94] text-[#111111] sm:text-[3rem] lg:text-[4rem]">
              {aboutStudioContent.title}
            </h2>
            <p className="text-[0.98rem] leading-7 text-[var(--muted-2)] sm:text-base sm:leading-8">
              {aboutStudioContent.description}
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {aboutStudioContent.stats.map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-black/8 bg-white/70 p-4 shadow-[0_18px_44px_rgba(18,18,18,0.05)]">
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-[1.55rem] text-[#111111]">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/om-oss" icon={<ArrowUpRightIcon className="h-4 w-4" />}>
                Meet the team
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section-space pt-0" id="kontakt">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <article className="card-surface rounded-[2rem] p-5 sm:p-6 lg:p-7">
            <span className="eyebrow">Contact</span>
            <h2 className="mt-4 font-display text-[2.1rem] leading-[0.94] text-[#111111] sm:text-[2.8rem]">
              Minimal contact flow. Fast response.
            </h2>
            <p className="mt-4 max-w-lg text-[0.96rem] leading-7 text-[var(--muted-2)]">
              Keep the page short, keep the ask simple and make it easy to book the next conversation.
            </p>

            <div className="mt-8 grid gap-5">
              <InfoRow
                icon={<MailIcon className="h-5 w-5" />}
                label="Mail"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <InfoRow
                icon={<PhoneIcon className="h-5 w-5" />}
                label="Phone"
                value={siteConfig.phonePrimary}
                href={siteConfig.phonePrimaryHref}
              />
              <InfoRow
                icon={<PinIcon className="h-5 w-5" />}
                label="Location"
                value={siteConfig.locationLabel}
              />
            </div>
          </article>

          <article className="card-surface rounded-[2rem] p-5 sm:p-6 lg:p-7">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Project brief
              </p>
              <h3 className="mt-3 font-display text-[2rem] leading-[0.96] text-[#111111] sm:text-[2.6rem]">
                Tell us what needs to be produced.
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
    <div className="flex items-start gap-4 rounded-[1.4rem] border border-black/8 bg-white/64 px-4 py-4">
      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white">
        {icon}
      </div>
      <div>
        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
        <p className="mt-1 text-base text-[#111111] sm:text-lg">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="transition hover:translate-y-[-1px]">
        {content}
      </a>
    );
  }

  return content;
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  video,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  video?: CaseStudy["video"];
}) {
  return (
    <section className="relative isolate overflow-hidden pt-24 sm:pt-28">
      <div className="absolute inset-0">
        {video ? (
          <>
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={video.poster}
            >
              {video.mobileSrc ? (
                <source media="(max-width: 767px)" src={video.mobileSrc} type="video/mp4" />
              ) : null}
              <source src={video.src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.28),rgba(7,7,7,0.12)_34%,rgba(7,7,7,0.58)_100%)]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,192,154,0.4),transparent_36%),linear-gradient(180deg,#f5f1eb,#efe8df)]" />
        )}
      </div>

      <div className="relative mx-auto flex min-h-[34rem] max-w-7xl items-end px-5 pb-10 sm:px-6 sm:pb-12 lg:min-h-[38rem] lg:px-8 lg:pb-14">
        <div className={`max-w-4xl ${video ? "text-white" : "text-[#111111]"}`}>
          <span className={video ? "text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/58" : "eyebrow"}>
            {eyebrow}
          </span>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-[2.7rem] leading-[0.9] sm:text-[4rem] lg:text-[5rem]">
            {title}
          </h1>
          <p className={`mt-4 max-w-2xl text-[0.98rem] leading-7 sm:text-base sm:leading-8 ${video ? "text-white/74" : "text-[var(--muted-2)]"}`}>
            {description}
          </p>
          {primaryCta || secondaryCta ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <ButtonLink
                  href={primaryCta.href}
                  className={video ? "bg-white text-[#111111] hover:bg-white/92" : undefined}
                >
                  {primaryCta.label}
                </ButtonLink>
              ) : null}
              {secondaryCta ? (
                <ButtonLink
                  href={secondaryCta.href}
                  variant="secondary"
                  className={video ? "border-white/16 bg-white/8 text-white hover:border-white/28 hover:bg-white/14" : undefined}
                >
                  {secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function HomeCaseLink({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/case/${caseStudy.slug}`}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-[#111111] transition hover:text-[var(--accent-2)]"
    >
      Se hele caset
      <ArrowUpRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
