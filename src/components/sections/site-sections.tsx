"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  useSitePreferences,
} from "@/components/providers/site-preferences";
import { FloatingLayer, Reveal } from "@/components/motion/reveal";
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
import { pageHeroVisuals } from "@/data/visual-assets";
import { uiCopy } from "@/data/ui-copy";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { ButtonLink } from "../ui/button-link";
import { BrandLogo } from "../ui/brand-logo";
import { ArrowUpRightIcon, MailIcon, PhoneIcon, PinIcon } from "../ui/icons";
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
      className="pt-[clamp(2.5rem,5vw,4.5rem)] pb-[clamp(2.75rem,5vw,4.75rem)]"
    >
      <Reveal>
        <article className="glass-panel overflow-hidden rounded-[1.9rem] sm:rounded-[2rem]">
          <div className="divide-y divide-[color:var(--line)]/80">
            {services.map((service) => (
              <div
                key={service.slug}
                className="px-4 py-4 sm:px-6 sm:py-6 lg:px-7 lg:py-7"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </article>
      </Reveal>
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
      <Reveal>
        <article className="glass-panel overflow-hidden rounded-[1.9rem]">
          <div className="divide-y divide-[color:var(--line)]/80">
            {items.map((item, index) => (
              <div
                key={`price-guide-${index}`}
                className="grid gap-3 px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(13rem,0.42fr)_minmax(0,1fr)] lg:items-start"
              >
                <div className="space-y-2">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    {resolveLocalizedValue(item.range, language)}
                  </p>
                  <h3 className="card-title text-[color:var(--foreground)]">
                    {resolveLocalizedValue(item.title, language)}
                  </h3>
                </div>
                <p className="body-copy text-[var(--muted-2)]">
                  {resolveLocalizedValue(item.detail, language)}
                </p>
              </div>
            ))}
          </div>
        </article>
      </Reveal>
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
      className="pt-0"
    >
      <Reveal>
        <article className="glass-panel overflow-hidden rounded-[1.9rem]">
          <div className="grid gap-px bg-[color:var(--line)]/80 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.step}
                className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] px-5 py-5 text-left sm:px-6 sm:py-6"
              >
                <span className="font-display text-[1.35rem] leading-none text-[var(--accent)]">
                  {step.step}
                </span>
                <h3 className="mt-3 text-[1.08rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                  {resolveLocalizedValue(step.title, language)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-2)]">
                  {resolveLocalizedValue(step.description, language)}
                </p>
              </div>
            ))}
          </div>
        </article>
      </Reveal>
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

        <div className="adaptive-grid-compact">
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
      <div className="team-editorial-grid">
        <FloatingLayer className="team-editorial-rail">
          <article className="glass-panel h-full rounded-[2rem] p-5 sm:p-6 lg:p-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              {language === "no" ? "To ulike styrker" : "Two complementary strengths"}
            </p>
            <h3 className="feature-title mt-3 max-w-2xl text-[color:var(--foreground)]">
              {language === "no"
                ? "Tommy holder produsentsporet tett, mens Gard leder regi, fortelling og klipp."
                : "Tommy keeps the producing track tight, while Gard leads direction, story and edit."}
            </h3>

            <ul className="mt-6 grid gap-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
              {bullets.map((bullet, index) => (
                <li
                  key={`team-bullet-${index}`}
                  className="team-editorial-bullet"
                >
                  {resolveLocalizedValue(bullet, language)}
                </li>
              ))}
            </ul>
          </article>
        </FloatingLayer>

        <div className="team-portrait-stage">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={0.05 * index}>
              <article
                className={cn(
                  "team-portrait-card group",
                  index === 0 ? "team-portrait-card-primary" : "team-portrait-card-secondary",
                )}
              >
                <Link
                  href={member.href ?? "/om-oss"}
                  className="team-portrait-link block"
                  aria-label={
                    language === "no"
                      ? `Se mer om ${member.name}`
                      : `View more about ${member.name}`
                  }
                >
                  <div className="team-portrait-scene">
                    <div className="team-portrait-surface" />
                    <div className="team-portrait-glow" />
                    <div className="team-portrait-shadow" />
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={
                          member.imageAlt
                            ? resolveLocalizedValue(member.imageAlt, language)
                            : member.name
                        }
                        width={1200}
                        height={1500}
                        sizes="(min-width: 1280px) 26vw, (min-width: 768px) 42vw, 100vw"
                        className={cn(
                          "team-portrait-image",
                          index === 0 ? "team-portrait-image-left" : "team-portrait-image-right",
                        )}
                      />
                    ) : null}
                  </div>

                  <div
                    className={cn(
                      "team-portrait-copy",
                      index === 0 ? "team-portrait-copy-left" : "team-portrait-copy-right",
                    )}
                  >
                    <span className="founder-profile-chip">
                      {resolveLocalizedValue(member.role, language)}
                    </span>
                    <div>
                      <h3 className="card-title text-[color:var(--foreground)]">{member.name}</h3>
                      <p className="body-copy mt-3 text-[var(--muted-2)]">
                        {resolveLocalizedValue(member.summary, language)}
                      </p>
                    </div>
                    <ButtonLink href={member.href ?? "/om-oss"} variant="ghost" size="compact" className="w-full sm:w-auto">
                      {language === "no" ? "Se profil" : "View profile"}
                      <ArrowUpRightIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </ButtonLink>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function ContactLeadSection({
}: {
  faqs?: FaqItem[];
  compact?: boolean;
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.contactEyebrow}
      title={copy.contactTitle}
      description={copy.contactDescription}
    >
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="card-surface relative overflow-hidden rounded-[1.9rem] p-5 sm:p-6">
          <div className="pointer-events-none absolute -bottom-8 right-[-0.5rem] hidden h-28 w-28 md:block opacity-[0.06]">
            <BrandLogo
              variant="mark"
              className="h-auto w-full brightness-[1.4] saturate-[1.15] drop-shadow-[0_18px_32px_rgba(0,0,0,0.16)]"
            />
          </div>
          <div className="space-y-4">
            <Link href="/" className="brand-signature-chip flex w-fit items-center gap-3 px-2.5 py-2">
              <div className="brand-signature-mark flex h-11 w-11 items-center justify-center rounded-full p-[0.62rem]">
                <BrandLogo
                  variant="mark"
                  className="relative z-[1] h-auto w-full brightness-[1.74] contrast-[1.12] saturate-[1.34]"
                />
              </div>
              <div>
                <p className="font-display text-[1rem] text-[color:var(--foreground)]">Fau&amp;Land Film</p>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Oslo / Production
                </p>
              </div>
            </Link>
            <p className="body-copy text-[var(--muted-2)]">
              {copy.contactLead}
            </p>
          </div>

          <div className="mt-6 grid gap-4 border-t border-[color:var(--line)] pt-6">
            <ContactRow icon={<MailIcon className="h-5 w-5" />} label={copy.contactMail} value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactRow icon={<PhoneIcon className="h-5 w-5" />} label={copy.contactPhone} value={siteConfig.phonePrimary} href={siteConfig.phonePrimaryHref} />
            <ContactRow icon={<PinIcon className="h-5 w-5" />} label={copy.contactBase} value={siteConfig.locationLabel} />
          </div>
        </article>

        <div className="grid gap-4">
          <article className="card-surface overflow-hidden rounded-[1.9rem]">
            <div className="p-5 sm:p-6">
              <div className="max-w-2xl">
                <p className="body-copy text-[var(--muted-2)]">
                  {copy.contactBriefDescription}
                </p>
              </div>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </article>
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
  hideHeader = false,
}: {
  title: MaybeLocalizedText;
  description: MaybeLocalizedText;
  items: FaqItem[];
  hideHeader?: boolean;
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  const content = (
    <div className="mx-auto max-w-4xl">
      <article className="glass-panel overflow-hidden rounded-[1.8rem] shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
        <div className="divide-y divide-[color:var(--line)]/80">
          {items.map((item, index) => (
            <details
              key={`faq-item-${index}`}
              className="px-5 py-4 sm:px-6 sm:py-5"
              open={index === 0}
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
        <div className="border-t border-[color:var(--line)]/80 px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-[var(--muted-2)] sm:text-base">
              {language === "no"
                ? "Finner dere ikke svaret her, sender dere bare en kort brief."
                : "If you do not find the answer here, just send a short brief."}
            </p>
            <ButtonLink href="/kontakt" variant="ghost" className="w-full sm:w-auto">
              {language === "no" ? "Send en kort brief" : "Send a short brief"}
            </ButtonLink>
          </div>
        </div>
      </article>
    </div>
  );

  if (hideHeader) {
    return (
      <section className="section-space pt-0">
        <div className="site-container">{content}</div>
      </section>
    );
  }

  return (
    <SectionShell
      eyebrow={copy.faqEyebrow}
      title={resolveLocalizedValue(title, language)}
      description={resolveLocalizedValue(description, language)}
      align="center"
    >
      {content}
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
      <div className="site-container">
        <div className="relative overflow-hidden rounded-[1.8rem] border border-[color:var(--line)] bg-[#111111] px-4 py-5 text-white shadow-[0_32px_100px_rgba(15,15,15,0.14)] sm:rounded-[2rem] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute -bottom-8 right-[-0.5rem] hidden h-36 w-36 md:block opacity-[0.08]">
            <BrandLogo
              variant="mark"
              className="h-auto w-full brightness-[1.5] saturate-[1.18] drop-shadow-[0_24px_40px_rgba(0,0,0,0.26)]"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,239,211,0.68),transparent)] opacity-72" />
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
  const backgroundVisual = visuals?.primary;
  const hasMediaBackground = Boolean(video?.videoType === "direct" || backgroundVisual);

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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.06),transparent_24%),linear-gradient(90deg,rgba(5,6,10,0.84),rgba(5,6,10,0.48)_34%,rgba(5,6,10,0.56)_58%,rgba(5,6,10,0.82)_100%),linear-gradient(180deg,rgba(6,6,9,0.14),rgba(6,6,9,0.28)_28%,rgba(6,6,9,0.72)_100%)]" />
            <div className="grain-overlay absolute inset-0 opacity-34" />
          </>
        ) : backgroundVisual ? (
          <>
            <Image
              src={backgroundVisual.src}
              alt={resolveLocalizedValue(backgroundVisual.alt, language)}
              fill
              priority
              sizes="100vw"
              className="object-cover image-slow-zoom"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.07),transparent_24%),linear-gradient(90deg,rgba(6,7,11,0.82),rgba(6,7,11,0.44)_34%,rgba(6,7,11,0.5)_58%,rgba(6,7,11,0.84)_100%),linear-gradient(180deg,rgba(6,6,9,0.1),rgba(6,6,9,0.24)_28%,rgba(6,6,9,0.74)_100%)]" />
            <div className="grain-overlay absolute inset-0 opacity-34" />
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

      <div className="site-container relative flex min-h-[clamp(22rem,42svh,33rem)] items-end pb-[clamp(1.5rem,4vw,2.5rem)]">
        <Reveal className="w-full max-w-[46rem]" delay={0.04} y={18}>
          <div
            className={`subpage-hero-panel relative overflow-hidden px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7 ${
              hasMediaBackground ? "text-white" : "text-[color:var(--foreground)]"
            }`}
          >
            <div className="glass-sheen absolute inset-0" />
            <div className="pointer-events-none absolute -left-8 bottom-[-3rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent_72%)] blur-2xl opacity-70" />
            <div className="pointer-events-none absolute right-[-2.5rem] top-[-2.5rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(122,168,255,0.28),transparent_70%)] blur-2xl opacity-78" />

            <div className="relative z-[1]">
              <span className={hasMediaBackground ? "hero-badge text-white/74" : "eyebrow"}>
                {resolveLocalizedValue(eyebrow, language)}
              </span>
              <h1 className={`page-title mt-4 max-w-[13ch] ${hasMediaBackground ? "text-white" : ""}`}>
                {resolveLocalizedValue(title, language)}
              </h1>
              <p
                className={`body-lead mt-4 max-w-2xl text-[0.98rem] leading-7 sm:text-[1.03rem] sm:leading-8 ${
                  hasMediaBackground ? "text-white/82" : "text-[var(--muted-2)]"
                }`}
              >
                {resolveLocalizedValue(description, language)}
              </p>
              {primaryCta || secondaryCta ? (
                <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
