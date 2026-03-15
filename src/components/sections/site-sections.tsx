import Link from "next/link";

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
  VideoAsset,
} from "@/data/site-content";
import {
  clientLogos,
  homeHeroContent,
  homeIntroContent,
  siteConfig,
  videoLibrary,
} from "@/data/site-content";

import { ButtonLink } from "../ui/button-link";
import { MailIcon, PhoneIcon, PinIcon } from "../ui/icons";
import { SectionShell } from "../ui/section-shell";
import { CaseCard } from "./case-card";
import { ClientLogoMarquee } from "./client-logo-marquee";
import { ContactForm } from "./contact-form";
import { ServiceCard } from "./service-card";
import { TestimonialCard } from "./testimonial-card";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  video?: VideoAsset;
};

export function SalesHero() {
  const heroVideo = videoLibrary.hero;
  const minimalOverlay = heroVideo.hasEmbeddedText;

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroVideo.poster}
        >
          <source src={heroVideo.mobileSrc ?? heroVideo.src} type="video/mp4" />
        </video>
        <div
          className={`absolute inset-0 ${
            minimalOverlay
              ? "bg-[linear-gradient(180deg,rgba(5,10,19,0.22),rgba(5,10,19,0.08)_34%,rgba(5,10,19,0.42)_78%,rgba(5,10,19,0.72))]"
              : "bg-[linear-gradient(180deg,rgba(5,10,19,0.14),rgba(5,10,19,0.22)_42%,rgba(5,10,19,0.62))]"
          }`}
        />
      </div>

      <div
        className={`relative mx-auto flex min-h-screen max-w-7xl px-6 pt-24 lg:px-8 lg:pt-28 ${
          minimalOverlay
            ? "items-end justify-center pb-6 sm:pb-7 lg:justify-start lg:pb-8"
            : "items-end justify-start pb-14 sm:pb-16"
        }`}
      >
        {minimalOverlay ? (
          <div className="flex w-full justify-center lg:justify-start">
            <div className="rounded-full border border-white/12 bg-[rgba(5,10,19,0.22)] p-1 backdrop-blur-md">
              <ButtonLink href={homeHeroContent.ctaHref}>
                {homeHeroContent.ctaLabel}
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="max-w-[34rem] space-y-4">
            <h1 className="text-balance font-display text-4xl leading-[0.92] text-white sm:text-5xl lg:text-[4.2rem]">
              {homeHeroContent.title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-white/76 sm:text-base sm:leading-7">
              {homeHeroContent.description}
            </p>
            <div className="flex pt-1">
              <ButtonLink href={homeHeroContent.ctaHref}>
                {homeHeroContent.ctaLabel}
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function HomeIntroSection() {
  return (
    <section className="border-b border-white/6 bg-[#050a13]">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:px-8 lg:py-9">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/42">
          {homeIntroContent.eyebrow}
        </p>
        <div className="space-y-2.5">
          <h2 className="max-w-4xl text-balance font-display text-[2rem] leading-[1] text-white sm:text-[2.5rem] lg:text-[2.9rem]">
            {homeIntroContent.title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-white/68 sm:text-base sm:leading-7">
            {homeIntroContent.description}
          </p>
        </div>
      </div>
    </section>
  );
}

export function SocialProofSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/6 bg-[#050a13]">
      <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8 lg:py-8">
        <p className="text-center text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-white/48">
          Utvalgte kunder og samarbeid
        </p>
        <div className="mt-5 sm:mt-6">
          <ClientLogoMarquee logos={clientLogos} />
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  video,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
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
              <source src={video.src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,19,0.36),rgba(5,10,19,0.74)_52%,rgba(5,10,19,0.9))]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#09111d,#050a13)]" />
        )}
      </div>

      <div className="relative mx-auto flex min-h-[34svh] max-w-7xl items-end px-6 pb-9 pt-24 lg:px-8 lg:pb-10 lg:pt-24">
        <div className="max-w-3xl space-y-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/48">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-balance font-display text-[2.3rem] leading-[0.98] text-white sm:text-[3rem] lg:text-[3.5rem]">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
            {description}
          </p>
          {primaryCta || secondaryCta ? (
            <div className="flex flex-wrap gap-2.5 pt-1">
              {primaryCta ? (
                <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
              ) : null}
              {secondaryCta ? (
                <ButtonLink href={secondaryCta.href} variant="secondary">
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

export function ServicesSection({
  services,
  title = "Fire tydelige tjenesteområder",
  description = "Kort forklart. Lett å forstå. Lett å kjøpe.",
}: {
  services: ServiceArea[];
  title?: string;
  description?: string;
}) {
  const gridClassName =
    services.length <= 4 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <SectionShell eyebrow="Tjenester" title={title} description={description} id="tjenester">
      <div className={`grid gap-5 ${gridClassName}`}>
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={0.08 * index}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function PackagesSection({ packages }: { packages: OfferPackage[] }) {
  return (
    <SectionShell
      eyebrow="Pakker"
      title="Tre tydelige nivåer"
      description="Lett å lese. Lett å diskutere. Lett å komme i gang med."
      id="pakker"
    >
      <div className="grid gap-5 xl:grid-cols-3">
        {packages.map((pkg, index) => (
          <Reveal key={pkg.name} delay={0.08 * index}>
            <article
              className={`rounded-[1.9rem] border p-5 sm:p-6 ${
                pkg.featured
                  ? "border-[var(--accent)]/36 bg-[linear-gradient(180deg,rgba(226,194,122,0.12),rgba(7,12,20,0.9))]"
                  : "border-white/10 bg-[rgba(8,13,22,0.9)]"
              }`}
            >
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
                {pkg.name}
              </p>
              <h3 className="mt-3 font-display text-[2.3rem] text-white">{pkg.price}</h3>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-base">{pkg.summary}</p>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-white/54">
                {pkg.idealFor}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm leading-6 text-white/74">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink
                  href={pkg.ctaHref}
                  variant={pkg.featured ? "primary" : "secondary"}
                  fullWidth
                >
                  {pkg.ctaLabel}
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
  return (
    <SectionShell
      eyebrow="Prisnivå"
      title="Veiledende prisrammer"
      description="Prisene er her for å gjøre dialogen enklere, ikke for å lage mer friksjon."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={0.06 * index}>
            <article className="border-t border-white/10 pt-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
                {item.range}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-white/58">{item.detail}</p>
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
  return (
    <SectionShell
      eyebrow="Case"
      title="Utvalgte case"
      description="Kunde, behov, leveranse og effekt. Kort og tydelig."
      action={
        <ButtonLink href="/case" variant="ghost" className="px-0 py-0">
          Se alle case
        </ButtonLink>
      }
      id="case"
    >
      <div className="grid gap-6">
        {cases.map((caseStudy, index) => (
          <Reveal key={caseStudy.slug} delay={0.08 * index}>
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
  return (
    <SectionShell
      eyebrow="Prosess"
      title="Slik jobber vi"
      description="Fire steg. Lite friksjon. Tydelig vei fra idé til ferdig leveranse."
      align="center"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.step} delay={0.06 * index}>
            <article className="border-t border-white/10 pt-4">
              <p className="font-display text-4xl leading-none text-[var(--accent)]/88 sm:text-5xl">
                {step.step}
              </p>
              <h3 className="mt-3 font-display text-[1.55rem] text-white sm:text-[1.75rem]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{step.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const gridClassName = testimonials.length <= 2 ? "xl:grid-cols-2" : "xl:grid-cols-3";

  return (
    <SectionShell
      eyebrow="Kundestemmer"
      title="Hva kundene sier"
      description="Korte tilbakemeldinger fra kunder og samarbeidspartnere."
      align="center"
    >
      <div className={`grid gap-3.5 ${gridClassName}`}>
        {testimonials.map((testimonial, index) => (
          <Reveal key={`${testimonial.company}-${index}`} delay={0.08 * index}>
            <TestimonialCard {...testimonial} />
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
  bullets: string[];
}) {
  return (
    <SectionShell
      eyebrow="Om Fau&Land"
      title="Et lite team med tydelig ansvar"
      description="Fau&Land Film drives av Gard Ruben Fauske og Tommy R.A. Garland."
      action={
        <ButtonLink href="/om-oss" variant="ghost" className="px-0 py-0">
          Se mer om oss
        </ButtonLink>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
        <article className="rounded-[1.6rem] border border-white/8 bg-white/[0.015] p-5 sm:p-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/44">
            Hvem vi er
          </p>
          <h3 className="mt-2 font-display text-[1.8rem] text-white">
            Gard og Tommy driver hvert prosjekt tett.
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-base sm:leading-7">
            Et lite seniorledet team med tydelig ansvar fra strategi og regi til produksjon og leveranse.
          </p>
        </article>

        <div className="grid gap-5">
          <article className="border-t border-white/10 pt-4">
            <ul className="space-y-3 text-sm leading-6 text-white/70 sm:text-base">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            {team.map((member) => (
              <article
                key={member.name}
                className="border-t border-white/10 pt-4"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/46">
                  {member.role}
                </p>
                <h3 className="mt-2 font-display text-[1.7rem] text-white">{member.name}</h3>
                <p className="mt-2.5 text-sm leading-6 text-white/60">{member.summary}</p>
              </article>
            ))}
          </div>
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
  bullets: string[];
}) {
  return (
    <SectionShell
      eyebrow="Om oss"
      title="Tommy og Gard leder hvert prosjekt tett"
      description="Gard leder den kreative visjonen og regien. Tommy jobber med strategi, produksjon og gjennomføring."
    >
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
        <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.015] p-5 sm:p-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/44">
            Fau&Land Film
          </p>
          <p className="mt-3 text-sm leading-6 text-white/68 sm:text-base sm:leading-7">
            Vi jobber tett med hver produksjon og utvider ved behov med faste frilansere innen foto, lyd, animasjon og produksjon.
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-white/70 sm:text-base">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={0.08 * index}>
              <article className="rounded-[1.6rem] border border-white/8 bg-white/[0.015] p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/46">
                  {member.role}
                </p>
                <h3 className="mt-2 font-display text-[1.7rem] text-white">{member.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/64 sm:text-base">{member.summary}</p>
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
  const visibleFaqs = faqs.slice(0, compact ? 2 : faqs.length);

  return (
    <SectionShell
      eyebrow="Kontakt"
      title="Lav terskel for å ta kontakt"
      description="Send en kort melding, så følger vi opp raskt med forslag til neste steg."
      id="kontakt"
    >
      <div className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        <article className="rounded-[1.7rem] border border-white/8 bg-white/[0.015] p-5 sm:p-6">
          <div className="space-y-4">
            <h3 className="font-display text-[2rem] text-white">Kontakt Fau&Land Film</h3>
            <p className="text-sm leading-6 text-white/64 sm:text-base">
              Vi holder til i Oslo og svarer som regel innen 24 timer.
            </p>
          </div>

          <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
            <a
              className="flex items-start gap-4 text-white/76 transition hover:text-white"
              href={`mailto:${siteConfig.email}`}
            >
              <MailIcon className="mt-1 h-5 w-5 text-[var(--accent-2)]" />
              <span>
                <span className="block text-xs uppercase tracking-[0.22em] text-[var(--accent-2)]">
                  E-post
                </span>
                <span className="mt-1.5 block text-base sm:text-lg">{siteConfig.email}</span>
              </span>
            </a>

            <a
              className="flex items-start gap-4 text-white/76 transition hover:text-white"
              href={siteConfig.phonePrimaryHref}
            >
              <PhoneIcon className="mt-1 h-5 w-5 text-[var(--accent-2)]" />
              <span>
                <span className="block text-xs uppercase tracking-[0.22em] text-[var(--accent-2)]">
                  Telefon
                </span>
                <span className="mt-1.5 block text-base sm:text-lg">{siteConfig.phonePrimary}</span>
              </span>
            </a>

            <div className="flex items-start gap-4 text-white/76">
              <PinIcon className="mt-1 h-5 w-5 text-[var(--accent-2)]" />
              <span>
                <span className="block text-xs uppercase tracking-[0.22em] text-[var(--accent-2)]">
                  Base
                </span>
                <span className="mt-1.5 block text-base sm:text-lg">{siteConfig.locationLabel}</span>
                <span className="mt-1 block text-sm text-white/50">{siteConfig.responseTime}</span>
              </span>
            </div>
          </div>

          <div className="mt-6">
            <ButtonLink href={siteConfig.bookingHref} fullWidth>
              {siteConfig.bookingLabel}
            </ButtonLink>
          </div>
        </article>

        <article className="rounded-[1.7rem] border border-white/8 bg-white/[0.02] p-5 sm:p-6">
          <h3 className="font-display text-[2rem] text-white sm:text-[2.2rem]">
            Fortell kort hva dere trenger
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/64 sm:text-base">
            En enkel brief er nok. Vi følger opp med forslag til format, omfang og neste steg.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>

          {visibleFaqs.length ? (
            <div className="mt-6 grid gap-3 border-t border-white/10 pt-5">
              {visibleFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-5 py-4"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-white">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-white/58">{faq.answer}</p>
                </details>
              ))}
            </div>
          ) : null}
        </article>
      </div>
    </SectionShell>
  );
}

export function FaqList({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: FaqItem[];
}) {
  return (
    <SectionShell eyebrow="FAQ" title={title} description={description} align="center">
      <div className="mx-auto max-w-4xl space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-[1.2rem] border border-white/8 bg-white/[0.015] px-5 py-4"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-white sm:text-lg">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-white/62 sm:text-base sm:leading-7">{item.answer}</p>
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
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string | null;
  secondaryHref?: string;
  align?: "left" | "center";
}) {
  return (
    <section className="section-space">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] p-5 sm:p-6 lg:p-7">
          <div
            className={
              align === "center"
                ? "mx-auto max-w-3xl text-center"
                : "grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-end"
            }
          >
            <div className="space-y-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/44">
                Klar for neste steg
              </p>
              <h2 className="max-w-3xl font-display text-[2rem] leading-[0.98] text-white sm:text-[2.5rem]">
                {title}
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-white/68 sm:text-base sm:leading-7">{description}</p>
            </div>
            <div
              className={`flex flex-wrap gap-3 ${
                align === "center" ? "justify-center pt-2" : "xl:justify-end"
              }`}
            >
              <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
              {secondaryLabel ? (
                <ButtonLink href={secondaryHref} variant="secondary">
                  {secondaryLabel}
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
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-semibold text-white/62 transition hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
