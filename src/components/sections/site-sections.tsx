import Link from "next/link";
import type { ReactNode } from "react";

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

import { ButtonLink } from "../ui/button-link";
import { MailIcon, PhoneIcon, PinIcon } from "../ui/icons";
import { SectionShell } from "../ui/section-shell";
import { CaseCard } from "./case-card";
import { ContactForm } from "./contact-form";
import { PageHero } from "./home-sections";
import { ServiceCard } from "./service-card";
import { TestimonialCard } from "./testimonial-card";

export { PageHero };

export function ServicesSection({
  services,
  title = "Tjenester for bedrifter og organisasjoner",
  description = "Kort forklart, premium presentert og satt opp for en rask vei til neste steg.",
}: {
  services: ServiceArea[];
  title?: string;
  description?: string;
}) {
  return (
    <SectionShell eyebrow="Tjenester" title={title} description={description} id="tjenester">
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
  return (
    <SectionShell
      eyebrow="Pakker"
      title="Tre tydelige samarbeidsnivåer"
      description="Behold enkelheten i første samtale, men presenter nivåene med mer premium ro og tydelighet."
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {packages.map((pkg, index) => (
          <Reveal key={pkg.name} delay={0.05 * index}>
            <article
              className={`card-surface rounded-[1.9rem] p-5 sm:p-6 ${
                pkg.featured ? "ring-1 ring-[var(--accent)]/35" : ""
              }`}
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {pkg.name}
              </p>
              <h3 className="mt-4 font-display text-[2.2rem] leading-[0.95] text-[#111111]">
                {pkg.price}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
                {pkg.summary}
              </p>
              <p className="mt-4 border-t border-black/8 pt-4 text-sm leading-6 text-[var(--muted)]">
                {pkg.idealFor}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm leading-6 text-[var(--muted-2)]">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink href={pkg.ctaHref} variant={pkg.featured ? "primary" : "secondary"} fullWidth>
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
      description="Prisene er ment for å gjøre neste samtale enklere og mer presis."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={0.05 * index}>
            <article className="card-surface rounded-[1.7rem] p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                {item.range}
              </p>
              <h3 className="mt-3 font-display text-[1.55rem] leading-[1] text-[#111111]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">{item.detail}</p>
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
      description="Kortere, mer visuelle case-presentasjoner med tydelig klient, effekt og vei videre."
      action={<ButtonLink href="/case" variant="ghost">Se alle case</ButtonLink>}
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
  return (
    <SectionShell
      eyebrow="Prosess"
      title="Slik jobber vi"
      description="En enklere, mer senior-led prosess med mindre friksjon og tydeligere beslutningspunkter."
      align="center"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.step} delay={0.05 * index}>
            <article className="card-surface rounded-[1.7rem] p-5">
              <p className="font-display text-[2.2rem] leading-none text-[#111111]">{step.step}</p>
              <h3 className="mt-4 font-display text-[1.45rem] leading-[0.98] text-[#111111]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">{step.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const gridClassName = testimonials.length <= 2 ? "xl:grid-cols-2" : "xl:grid-cols-3";

  return (
    <SectionShell
      eyebrow="Kundestemmer"
      title="Hva kundene sier"
      description="Mer editorial presentasjon av sitater og proof."
      align="center"
    >
      <div className={`grid gap-4 ${gridClassName}`}>
        {testimonials.map((testimonial, index) => (
          <Reveal key={`${testimonial.company}-${index}`} delay={0.05 * index}>
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
      description="Senior-led prosjektgjennomforing med tydelig visuell retning og kommersiell forstaelse."
      action={<ButtonLink href="/om-oss" variant="ghost">Se mer om oss</ButtonLink>}
    >
      <div className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
        <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Studio summary
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="grid gap-4 lg:grid-cols-2">
          {team.map((member) => (
            <article key={member.name} className="card-surface rounded-[1.8rem] p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {member.role}
              </p>
              <h3 className="mt-3 font-display text-[1.55rem] leading-[0.98] text-[#111111]">
                {member.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">{member.summary}</p>
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
  bullets: string[];
}) {
  return (
    <SectionShell
      eyebrow="Team"
      title="Tommy og Gard leder hvert prosjekt tett"
      description="Et seniorledet oppsett med faerre ledd, mer kvalitetssikring og et tydelig visuelt ansvar."
    >
      <div className="grid gap-4 xl:grid-cols-[0.86fr_1.14fr]">
        <article className="card-surface rounded-[1.8rem] p-5 sm:p-6">
          <ul className="space-y-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="grid gap-4 lg:grid-cols-2">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={0.05 * index}>
              <article className="card-surface rounded-[1.8rem] p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {member.role}
                </p>
                <h3 className="mt-3 font-display text-[1.55rem] leading-[0.98] text-[#111111]">
                  {member.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">{member.summary}</p>
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
      title="En lavterskel inngang til neste produksjon"
      description="Hold kontaktseksjonen lettere, tydeligere og mer premium enn en tradisjonell skjema-blokk."
    >
      <div className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <article className="card-surface rounded-[1.9rem] p-5 sm:p-6">
          <div className="space-y-3">
            <h3 className="font-display text-[2rem] leading-[0.96] text-[#111111]">
              Kontakt Fau&Land Film
            </h3>
            <p className="text-sm leading-6 text-[var(--muted-2)] sm:text-base">
              Oslo-basert produksjonspartner med rask respons og tydelig oppfolging.
            </p>
          </div>

          <div className="mt-6 grid gap-4 border-t border-black/8 pt-6">
            <ContactRow icon={<MailIcon className="h-5 w-5" />} label="E-post" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactRow icon={<PhoneIcon className="h-5 w-5" />} label="Telefon" value={siteConfig.phonePrimary} href={siteConfig.phonePrimaryHref} />
            <ContactRow icon={<PinIcon className="h-5 w-5" />} label="Base" value={siteConfig.locationLabel} />
          </div>
        </article>

        <article className="card-surface rounded-[1.9rem] p-5 sm:p-6">
          <h3 className="font-display text-[2rem] leading-[0.96] text-[#111111] sm:text-[2.5rem]">
            Fortell kort hva dere trenger
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base">
            En enkel brief er nok. Vi kommer tilbake med anbefalt format, omfang og neste steg.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>

          {visibleFaqs.length ? (
            <div className="mt-6 grid gap-3 border-t border-black/8 pt-6">
              {visibleFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-[1.3rem] border border-black/8 bg-white/70 px-4 py-4"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[#111111] sm:text-base">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">{faq.answer}</p>
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
    <div className="flex items-start gap-4 rounded-[1.35rem] border border-black/8 bg-white/72 px-4 py-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white">
        {icon}
      </div>
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
        <p className="mt-1 text-base text-[#111111]">{value}</p>
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
            className="card-surface rounded-[1.5rem] px-5 py-4"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-[#111111] sm:text-lg">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
              {item.answer}
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
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-black/8 bg-[#111111] px-5 py-6 text-white shadow-[0_32px_100px_rgba(15,15,15,0.14)] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div
            className={
              align === "center"
                ? "mx-auto max-w-3xl text-center"
                : "grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:items-end"
            }
          >
            <div className="space-y-3">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                Klar for neste steg
              </p>
              <h2 className="font-display text-[2rem] leading-[0.94] text-white sm:text-[2.8rem]">
                {title}
              </h2>
              <p className="max-w-2xl text-[0.96rem] leading-7 text-white/68">{description}</p>
            </div>
            <div
              className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${
                align === "center" ? "justify-center pt-3" : "xl:justify-end"
              }`}
            >
              <ButtonLink href={primaryHref} className="bg-white text-[#111111] hover:bg-white/92">
                {primaryLabel}
              </ButtonLink>
              {secondaryLabel ? (
                <ButtonLink
                  href={secondaryHref}
                  variant="secondary"
                  className="border-white/16 bg-white/8 text-white hover:border-white/28 hover:bg-white/14"
                >
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
    <div className="flex flex-wrap gap-5">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-semibold text-[#111111]/62 transition hover:text-[#111111]"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
