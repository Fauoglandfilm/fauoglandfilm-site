"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import {
  useSitePreferences,
} from "@/components/providers/site-preferences";
import { Reveal } from "@/components/motion/reveal";
import type {
  CaseStudy,
  FaqItem,
  OfferPackage,
  PriceGuide,
  ProcessStep,
  ServiceArea,
  TeamMember,
  Testimonial,
} from "@/data/site-content";
import { siteConfig } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";

import { ButtonLink } from "../ui/button-link";
import { MailIcon, PhoneIcon, PinIcon } from "../ui/icons";
import { SectionShell } from "../ui/section-shell";
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

export function PackagesSection({ packages }: { packages: OfferPackage[] }) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.packagesEyebrow}
      title={copy.packagesTitle}
      description={copy.packagesDescription}
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {packages.map((pkg, index) => (
          <Reveal key={`${resolveLocalizedValue(pkg.name, language)}-${index}`} delay={0.05 * index}>
            <article
              className={`card-surface rounded-[1.9rem] p-5 sm:p-6 ${
                pkg.featured ? "ring-1 ring-[var(--accent)]/35" : ""
              }`}
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {resolveLocalizedValue(pkg.name, language)}
              </p>
              <h3 className="mt-4 font-display text-[2.2rem] leading-[0.95] text-[color:var(--foreground)]">
                {resolveLocalizedValue(pkg.price, language)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
                {resolveLocalizedValue(pkg.summary, language)}
              </p>
              <p className="mt-4 border-t border-[color:var(--line)] pt-4 text-sm leading-6 text-[var(--muted)]">
                {resolveLocalizedValue(pkg.idealFor, language)}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm leading-6 text-[var(--muted-2)]">
                {pkg.includes.map((item, index) => (
                  <li key={`package-item-${index}`} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{resolveLocalizedValue(item, language)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink href={pkg.ctaHref} variant={pkg.featured ? "primary" : "secondary"} fullWidth>
                  {resolveLocalizedValue(pkg.ctaLabel, language)}
                </ButtonLink>
              </div>
            </article>
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
              <h3 className="mt-3 font-display text-[1.55rem] leading-[1] text-[color:var(--foreground)]">
                {resolveLocalizedValue(item.title, language)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
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
        <ButtonLink href="/case" variant="ghost">
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
              <p className="font-display text-[2.2rem] leading-none text-[color:var(--foreground)]">{step.step}</p>
              <h3 className="mt-4 font-display text-[1.45rem] leading-[0.98] text-[color:var(--foreground)]">
                {resolveLocalizedValue(step.title, language)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
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
        <ButtonLink href="/om-oss" variant="ghost">
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
              <h3 className="mt-3 font-display text-[1.55rem] leading-[0.98] text-[color:var(--foreground)]">
                {member.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
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
              <article className="card-surface rounded-[1.8rem] p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {resolveLocalizedValue(member.role, language)}
                </p>
                <h3 className="mt-3 font-display text-[1.55rem] leading-[0.98] text-[color:var(--foreground)]">
                  {member.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
                  {resolveLocalizedValue(member.summary, language)}
                </p>
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
      <div className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <article className="card-surface rounded-[1.9rem] p-5 sm:p-6">
          <div className="space-y-3">
            <h3 className="font-display text-[2rem] leading-[0.96] text-[color:var(--foreground)]">
              {copy.contactHeading}
            </h3>
            <p className="text-sm leading-6 text-[var(--muted-2)] sm:text-base">
              {copy.contactLead}
            </p>
          </div>

          <div className="mt-6 grid gap-4 border-t border-[color:var(--line)] pt-6">
            <ContactRow icon={<MailIcon className="h-5 w-5" />} label={copy.contactMail} value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactRow icon={<PhoneIcon className="h-5 w-5" />} label={copy.contactPhone} value={siteConfig.phonePrimary} href={siteConfig.phonePrimaryHref} />
            <ContactRow icon={<PinIcon className="h-5 w-5" />} label={copy.contactBase} value={siteConfig.locationLabel} />
          </div>
        </article>

        <article className="card-surface rounded-[1.9rem] p-5 sm:p-6">
          <h3 className="font-display text-[2rem] leading-[0.96] text-[color:var(--foreground)] sm:text-[2.5rem]">
            {copy.contactBriefTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
            {copy.contactBriefDescription}
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>

          {visibleFaqs.length ? (
            <div className="mt-6 grid gap-3 border-t border-[color:var(--line)] pt-6">
              {visibleFaqs.map((faq, index) => (
                <details
                  key={`contact-faq-${index}`}
                  className="rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4"
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
        </article>
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
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[#111111] px-5 py-6 text-white shadow-[0_32px_100px_rgba(15,15,15,0.14)] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
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
              <h2 className="font-display text-[2rem] leading-[0.94] text-white sm:text-[2.8rem]">
                {resolveLocalizedValue(title, language)}
              </h2>
              <p className="max-w-2xl text-[0.96rem] leading-7 text-white/68">
                {resolveLocalizedValue(description, language)}
              </p>
            </div>
            <div
              className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${
                align === "center" ? "justify-center pt-3" : "xl:justify-end"
              }`}
            >
              <ButtonLink href={primaryHref}>
                {resolveLocalizedValue(primaryLabel, language)}
              </ButtonLink>
              {secondaryLabel ? (
                <ButtonLink href={secondaryHref} variant="secondary">
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
}: {
  eyebrow: MaybeLocalizedText;
  title: MaybeLocalizedText;
  description: MaybeLocalizedText;
  primaryCta?: { label: MaybeLocalizedText; href: string };
  secondaryCta?: { label: MaybeLocalizedText; href: string };
  video?: CaseStudy["video"];
}) {
  const { language, theme } = useSitePreferences();

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
          <div
            className={
              theme === "dark"
                ? "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,165,106,0.18),transparent_36%),linear-gradient(180deg,#11141a,#0d0f12)]"
                : "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,192,154,0.4),transparent_36%),linear-gradient(180deg,#f5f1eb,#efe8df)]"
            }
          />
        )}
      </div>

      <div className="relative mx-auto flex min-h-[34rem] max-w-7xl items-end px-5 pb-10 sm:px-6 sm:pb-12 lg:min-h-[38rem] lg:px-8 lg:pb-14">
        <div className={`max-w-4xl ${video ? "text-white" : "text-[color:var(--foreground)]"}`}>
          <span className={video ? "text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/58" : "eyebrow"}>
            {resolveLocalizedValue(eyebrow, language)}
          </span>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-[2.7rem] leading-[0.9] sm:text-[4rem] lg:text-[5rem]">
            {resolveLocalizedValue(title, language)}
          </h1>
          <p className={`mt-4 max-w-2xl text-[0.98rem] leading-7 sm:text-base sm:leading-8 ${video ? "text-white/74" : "text-[var(--muted-2)]"}`}>
            {resolveLocalizedValue(description, language)}
          </p>
          {primaryCta || secondaryCta ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <ButtonLink href={primaryCta.href}>
                  {resolveLocalizedValue(primaryCta.label, language)}
                </ButtonLink>
              ) : null}
              {secondaryCta ? (
                <ButtonLink href={secondaryCta.href} variant="secondary">
                  {resolveLocalizedValue(secondaryCta.label, language)}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
