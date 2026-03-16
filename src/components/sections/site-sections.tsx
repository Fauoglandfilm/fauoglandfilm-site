"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  useSitePreferences,
} from "@/components/providers/site-preferences";
import { Reveal } from "@/components/motion/reveal";
import type {
  CaseStudy,
  FaqItem,
  PriceGuide,
  ProcessStep,
  ServiceArea,
  TeamMember,
  Testimonial,
} from "@/data/site-content";
import { siteConfig } from "@/data/site-content";
import { pageHeroVisuals, siteVisuals } from "@/data/visual-assets";
import { uiCopy } from "@/data/ui-copy";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";

import { ButtonLink } from "../ui/button-link";
import { MailIcon, PhoneIcon, PinIcon } from "../ui/icons";
import { SectionShell } from "../ui/section-shell";
import { SocialLinksRow } from "../ui/social-links";
import { CaseCard } from "./case-card";
import { ContactForm } from "./contact-form";
import { ServiceCard } from "./service-card";
import { TestimonialCard } from "./testimonial-card";

type MaybeLocalizedText = string | LocalizedText;

export function ServicesSection({
  services,
  title,
  description,
}: {
  services: ServiceArea[];
  title?: MaybeLocalizedText;
  description?: MaybeLocalizedText;
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.servicesEyebrow}
      title={title ? resolveLocalizedValue(title, language) : copy.servicesTitle}
      description={description ? resolveLocalizedValue(description, language) : copy.servicesDescription}
      id="tjenester"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={0.06 * index}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function PriceGuideSection({ items }: { items: PriceGuide[] }) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.priceGuideEyebrow}
      title={copy.priceGuideTitle}
      description={copy.priceGuideDescription}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={`price-guide-${index}`} delay={0.05 * index}>
            <article className="card-surface rounded-[1.7rem] p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                {resolveLocalizedValue(item.range, language)}
              </p>
              <h3 className="card-title mt-3 text-[color:var(--foreground)]">
                {resolveLocalizedValue(item.title, language)}
              </h3>
              <p className="body-copy mt-3 text-[var(--muted-2)]">
                {resolveLocalizedValue(item.detail, language)}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function FeaturedCasesSection({
  cases,
  showVerificationNote = true,
}: {
  cases: CaseStudy[];
  showVerificationNote?: boolean;
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.casesEyebrow}
      title={copy.casesTitle}
      description={copy.casesDescription}
      action={
        <ButtonLink href="/case" variant="ghost" className="w-full sm:w-auto">
          {copy.casesAction}
        </ButtonLink>
      }
    >
      <div className="grid gap-4">
        {cases.map((caseStudy, index) => (
          <Reveal key={caseStudy.slug} delay={0.06 * index}>
            <CaseCard
              caseStudy={caseStudy}
              layout={index === 0 ? "feature" : "stack"}
              showVerificationNote={showVerificationNote}
            />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.processEyebrow}
      title={copy.processTitle}
      description={copy.processDescription}
      align="center"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.step} delay={0.05 * index}>
            <article className="card-surface rounded-[1.7rem] p-5">
              <p className="font-display text-[2rem] leading-none text-[color:var(--foreground)] sm:text-[2.2rem]">{step.step}</p>
              <h3 className="card-title mt-4 text-[color:var(--foreground)]">
                {resolveLocalizedValue(step.title, language)}
              </h3>
              <p className="body-copy mt-3 text-[var(--muted-2)]">
                {resolveLocalizedValue(step.description, language)}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];
  const gridClassName = testimonials.length <= 2 ? "xl:grid-cols-2" : "xl:grid-cols-3";

  return (
    <SectionShell
      eyebrow={copy.testimonialsEyebrow}
      title={copy.testimonialsTitle}
      description={copy.testimonialsDescription}
      align="center"
    >
      <div className={`grid gap-4 ${gridClassName}`}>
        {testimonials.map((testimonial, index) => (
          <Reveal key={`${testimonial.company}-${index}`} delay={0.05 * index}>
            <TestimonialCard
              quote={resolveLocalizedValue(testimonial.quote, language)}
              name={testimonial.name}
              role={testimonial.role ? resolveLocalizedValue(testimonial.role, language) : undefined}
              company={testimonial.company}
              note={testimonial.note ? resolveLocalizedValue(testimonial.note, language) : undefined}
            />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function AboutPreviewSection({
  team,
  bullets,
}: {
  team: TeamMember[];
  bullets: Array<MaybeLocalizedText>;
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.aboutEyebrow}
      title={copy.aboutTitle}
      description={copy.aboutDescription}
      action={
        <ButtonLink href="/om-oss" variant="ghost" className="w-full sm:w-auto">
          {copy.aboutAction}
        </ButtonLink>
      }
    >
      <div className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
        <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {copy.aboutSummary}
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
            {bullets.map((bullet, index) => (
              <li key={`bullet-${index}`} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>{resolveLocalizedValue(bullet, language)}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="grid gap-4 lg:grid-cols-2">
          {team.map((member) => (
            <article key={member.name} className="card-surface rounded-[1.8rem] p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {resolveLocalizedValue(member.role, language)}
              </p>
              <h3 className="card-title mt-3 text-[color:var(--foreground)]">
                {member.name}
              </h3>
              <p className="body-copy mt-3 text-[var(--muted-2)]">
                {resolveLocalizedValue(member.summary, language)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function TeamSection({
  team,
  bullets,
}: {
  team: TeamMember[];
  bullets: Array<MaybeLocalizedText>;
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.teamEyebrow}
      title={copy.teamTitle}
      description={copy.teamDescription}
    >
      <div className="grid gap-4 xl:grid-cols-[0.86fr_1.14fr]">
        <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
          <ul className="space-y-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
            {bullets.map((bullet, index) => (
              <li key={`team-bullet-${index}`} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>{resolveLocalizedValue(bullet, language)}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="grid gap-4 lg:grid-cols-2">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={0.05 * index}>
              <article className="card-surface overflow-hidden rounded-[1.8rem]">
                {member.image ? (
                  <div className="relative aspect-[0.92/1] overflow-hidden border-b border-[color:var(--line)] bg-[color:var(--surface)]">
                    <Image
                      src={member.image}
                      alt={
                        member.imageAlt
                          ? resolveLocalizedValue(member.imageAlt, language)
                          : member.name
                      }
                      fill
                      sizes="(min-width: 1280px) 24vw, (min-width: 768px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <div className="p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {resolveLocalizedValue(member.role, language)}
                  </p>
                  <h3 className="card-title mt-3 text-[color:var(--foreground)]">
                    {member.name}
                  </h3>
                  <p className="body-copy mt-3 text-[var(--muted-2)]">
                    {resolveLocalizedValue(member.summary, language)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function ContactLeadSection({
  faqs = [],
  compact = false,
}: {
  faqs?: FaqItem[];
  compact?: boolean;
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];
  const visibleFaqs = faqs.slice(0, compact ? 2 : faqs.length);

  return (
    <SectionShell
      eyebrow={copy.contactEyebrow}
      title={copy.contactTitle}
      description={copy.contactDescription}
    >
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="card-surface rounded-[1.9rem] p-5 sm:p-6">
          <div className="space-y-3">
            <h3 className="feature-title text-[color:var(--foreground)]">
              {copy.contactHeading}
            </h3>
            <p className="body-copy text-[var(--muted-2)]">
              {copy.contactLead}
            </p>
          </div>

          <div className="mt-6 grid gap-4 border-t border-[color:var(--line)] pt-6">
            <ContactRow icon={<MailIcon className="h-5 w-5" />} label={copy.contactMail} value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactRow icon={<PhoneIcon className="h-5 w-5" />} label={copy.contactPhone} value={siteConfig.phonePrimary} href={siteConfig.phonePrimaryHref} />
            <ContactRow icon={<PinIcon className="h-5 w-5" />} label={copy.contactBase} value={siteConfig.locationLabel} />
          </div>

          <div className="mt-6 border-t border-[color:var(--line)] pt-6">
            <SocialLinksRow
              title={copy.contactSocialTitle}
              description={copy.contactSocialDescription}
              compact
            />
          </div>
        </article>

        <div className="grid gap-4">
          <article className="card-surface overflow-hidden rounded-[1.9rem]">
            <div className="grid gap-px bg-[color:var(--line)] lg:grid-cols-[1.02fr_0.98fr]">
              <div className="relative min-h-[16rem] overflow-hidden bg-[#111111]">
                <Image
                  src={siteVisuals.eventCoverage.src}
                  alt={resolveLocalizedValue(siteVisuals.eventCoverage.alt, language)}
                  fill
                  sizes="(min-width: 1280px) 28vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.12),rgba(7,7,7,0.52)_72%,rgba(7,7,7,0.86))]" />
                <div className="grain-overlay absolute inset-0 opacity-45" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/52">
                    {language === "no" ? "Prosjektbrief" : "Project brief"}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/72 sm:text-base">
                    {language === "no"
                      ? "Send en kort brief, så svarer vi med format, nivå og neste steg."
                      : "Send a short brief and we will respond with format, scope and next steps."}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="feature-title text-[color:var(--foreground)]">
                  {copy.contactBriefTitle}
                </h3>
                <p className="body-copy mt-3 text-[var(--muted-2)]">
                  {copy.contactBriefDescription}
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </article>

          {visibleFaqs.length ? (
            <div className="grid gap-3 md:grid-cols-2">
              {visibleFaqs.map((faq, index) => (
                <details
                  key={`contact-faq-${index}`}
                  className="card-surface rounded-[1.3rem] px-4 py-4"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[color:var(--foreground)] sm:text-base">
                    {resolveLocalizedValue(faq.question, language)}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
                    {resolveLocalizedValue(faq.answer, language)}
                  </p>
                </details>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}

function ContactRow({
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
    <div className="flex items-start gap-4 rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[color:var(--background)]">
        {icon}
      </div>
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
        <p className="mt-1 text-base text-[color:var(--foreground)]">{value}</p>
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} className="transition hover:translate-y-[-1px]">
      {content}
    </a>
  );
}

export function FaqList({
  title,
  description,
  items,
}: {
  title: MaybeLocalizedText;
  description: MaybeLocalizedText;
  items: FaqItem[];
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.faqEyebrow}
      title={resolveLocalizedValue(title, language)}
      description={resolveLocalizedValue(description, language)}
      align="center"
    >
      <div className="mx-auto max-w-4xl space-y-3">
        {items.map((item, index) => (
          <details
            key={`faq-item-${index}`}
            className="card-surface rounded-[1.5rem] px-5 py-4"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-[color:var(--foreground)] sm:text-lg">
              {resolveLocalizedValue(item.question, language)}
            </summary>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
              {resolveLocalizedValue(item.answer, language)}
            </p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

export function CtaBanner({
  title,
  description,
  primaryLabel = siteConfig.bookingLabel,
  primaryHref = siteConfig.bookingHref,
  secondaryLabel = null,
  secondaryHref = siteConfig.bookingHref,
  align = "left",
}: {
  title: MaybeLocalizedText;
  description: MaybeLocalizedText;
  primaryLabel?: MaybeLocalizedText;
  primaryHref?: string;
  secondaryLabel?: MaybeLocalizedText | null;
  secondaryHref?: string;
  align?: "left" | "center";
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <section className="section-space">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.8rem] border border-[color:var(--line)] bg-[#111111] px-4 py-5 text-white shadow-[0_32px_100px_rgba(15,15,15,0.14)] sm:rounded-[2rem] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div
            className={
              align === "center"
                ? "mx-auto max-w-3xl text-center"
                : "grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:items-end"
            }
          >
            <div className="space-y-3">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                {copy.ctaEyebrow}
              </p>
              <h2 className="section-title text-white">
                {resolveLocalizedValue(title, language)}
              </h2>
              <p className="body-lead max-w-2xl text-white/68">
                {resolveLocalizedValue(description, language)}
              </p>
            </div>
            <div
              className={`flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3 ${
                align === "center" ? "justify-center pt-3" : "xl:justify-end"
              }`}
            >
              <ButtonLink href={primaryHref} className="w-full sm:w-auto">
                {resolveLocalizedValue(primaryLabel, language)}
              </ButtonLink>
              {secondaryLabel ? (
                <ButtonLink href={secondaryHref} variant="secondary" className="w-full sm:w-auto">
                  {resolveLocalizedValue(secondaryLabel, language)}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RelatedLinks({
  links,
}: {
  links: Array<{ href: string; label: MaybeLocalizedText }>;
}) {
  const { language } = useSitePreferences();

  return (
    <div className="flex flex-wrap gap-5">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-semibold text-[var(--muted)] transition hover:text-[color:var(--foreground)]"
        >
          {resolveLocalizedValue(link.label, language)}
        </Link>
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  video,
  visualKey,
}: {
  eyebrow: MaybeLocalizedText;
  title: MaybeLocalizedText;
  description: MaybeLocalizedText;
  primaryCta?: { label: MaybeLocalizedText; href: string };
  secondaryCta?: { label: MaybeLocalizedText; href: string };
  video?: CaseStudy["video"];
  visualKey?: keyof typeof pageHeroVisuals;
}) {
  const { language, theme } = useSitePreferences();
  const visuals = visualKey ? pageHeroVisuals[visualKey] : null;

  return (
    <section className="relative isolate overflow-hidden pt-22 sm:pt-28">
      <div className="absolute inset-0">
        {video?.videoType === "direct" ? (
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
            <div className="grain-overlay absolute inset-0 opacity-40" />
          </>
        ) : (
          <>
            <div
              className={
                theme === "dark"
                  ? "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,173,116,0.18),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(57,78,108,0.18),transparent_28%),linear-gradient(180deg,rgba(8,9,12,0.9),rgba(8,9,12,0.97))]"
                  : "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,173,116,0.18),transparent_34%),linear-gradient(180deg,rgba(236,228,216,0.96),rgba(228,218,206,0.98))]"
              }
            />
            <div className="grain-overlay absolute inset-0 opacity-34" />
          </>
        )}
      </div>

      <div className="relative mx-auto flex min-h-[25rem] max-w-7xl items-end px-4 pb-7 sm:min-h-[28rem] sm:px-6 sm:pb-9 lg:min-h-[31rem] lg:px-8 lg:pb-10">
        <div className="grid w-full gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
          <div className={`max-w-4xl ${video ? "text-white" : "text-[color:var(--foreground)]"}`}>
            <span className={video ? "text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/58" : "eyebrow"}>
              {resolveLocalizedValue(eyebrow, language)}
            </span>
            <h1 className="page-title mt-4 max-w-4xl">
              {resolveLocalizedValue(title, language)}
            </h1>
            <p className={`body-lead mt-4 max-w-2xl ${video ? "text-white/74" : "text-[var(--muted-2)]"}`}>
              {resolveLocalizedValue(description, language)}
            </p>
            {primaryCta || secondaryCta ? (
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
                {primaryCta ? (
                  <ButtonLink href={primaryCta.href} className="w-full sm:w-auto">
                    {resolveLocalizedValue(primaryCta.label, language)}
                  </ButtonLink>
                ) : null}
                {secondaryCta ? (
                  <ButtonLink href={secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
                    {resolveLocalizedValue(secondaryCta.label, language)}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>

          {visuals ? (
            <Reveal delay={0.12} className="lg:justify-self-end">
              <div className="grid gap-3 sm:grid-cols-[1.16fr_0.84fr] lg:max-w-[34rem]">
                <div className="card-surface relative overflow-hidden rounded-[1.7rem]">
                  <div className="relative aspect-[1.02/0.94] overflow-hidden bg-[#111111]">
                    <Image
                      src={visuals.primary.src}
                      alt={resolveLocalizedValue(visuals.primary.alt, language)}
                      fill
                      sizes="(min-width: 1024px) 28vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08),rgba(10,10,10,0.62)_100%)]" />
                    <div className="grain-overlay absolute inset-0 opacity-35" />
                  </div>
                </div>

                <div className="grid gap-3">
                  {[visuals.secondary, visuals.tertiary]
                    .filter(Boolean)
                    .map((visual, index) => (
                      <div key={visual!.src} className="card-surface relative overflow-hidden rounded-[1.45rem]">
                        <div className="relative aspect-[1.08/0.74] overflow-hidden bg-[#111111]">
                          <Image
                            src={visual!.src}
                            alt={resolveLocalizedValue(visual!.alt, language)}
                            fill
                            sizes="(min-width: 1024px) 16vw, 50vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.06),rgba(10,10,10,0.44)_100%)]" />
                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/54">
                              {index === 0
                                ? language === "no"
                                  ? "Utvalgt frame"
                                  : "Selected frame"
                                : language === "no"
                                  ? "Arbeid i fokus"
                                  : "Work in focus"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
