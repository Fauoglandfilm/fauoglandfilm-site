"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

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
  const { language, theme } = useSitePreferences();
  const copy = uiCopy.siteSections[language];
  const shouldReduceMotion = useReducedMotion();
  const isDarkTheme = theme === "dark";
  const carouselServices = [0, 1, 2].flatMap((copyIndex) =>
    services.map((service) => ({
      service,
      copyIndex,
    })),
  );
  const trackRef = useRef<HTMLDivElement | null>(null);
  const segmentWidthRef = useRef(0);
  const wrapLockRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const userResumeAtRef = useRef(0);
  const interactionStateRef = useRef({
    hovering: false,
    focused: false,
    pointerActive: false,
  });
  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const resolvedTitle = title ? resolveLocalizedValue(title, language) : copy.servicesTitle;
  const resolvedDescription = description ? resolveLocalizedValue(description, language) : copy.servicesDescription;
  const surfaceClassName = isDarkTheme
    ? "bg-[radial-gradient(circle_at_top,rgba(11,23,42,0.92),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(210,173,116,0.14),transparent_24%),linear-gradient(180deg,#030407_0%,#070b12_42%,#081320_100%)]"
    : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.86),transparent_34%),radial-gradient(circle_at_84%_10%,rgba(115,164,255,0.18),transparent_24%),linear-gradient(180deg,rgba(244,247,252,0.98)_0%,rgba(229,236,246,0.94)_48%,rgba(221,231,244,0.98)_100%)]";
  const topBorderClassName = isDarkTheme ? "bg-white/8" : "bg-black/7";
  const eyebrowClassName = isDarkTheme ? "text-[color:var(--accent)]/88" : "text-[color:var(--accent)]/92";
  const titleClassName = isDarkTheme ? "text-white" : "text-[color:var(--foreground)]";
  const descriptionClassName = isDarkTheme ? "text-white/62" : "text-[var(--muted-2)]";
  const leftFadeClassName = isDarkTheme
    ? "bg-[linear-gradient(90deg,#030407_0%,rgba(3,4,7,0.82)_52%,transparent)]"
    : "bg-[linear-gradient(90deg,rgba(244,247,252,0.98)_0%,rgba(244,247,252,0.82)_52%,transparent)]";
  const rightFadeClassName = isDarkTheme
    ? "bg-[linear-gradient(270deg,#081320_0%,rgba(8,19,32,0.82)_52%,transparent)]"
    : "bg-[linear-gradient(270deg,rgba(221,231,244,0.98)_0%,rgba(221,231,244,0.82)_52%,transparent)]";

  const scheduleResume = (delay = 900) => {
    userResumeAtRef.current = performance.now() + delay;
  };

  const measureTrack = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const nextSegmentWidth = track.scrollWidth / 3;

    if (!Number.isFinite(nextSegmentWidth) || nextSegmentWidth <= 0) {
      return;
    }

    segmentWidthRef.current = nextSegmentWidth;

    if (track.scrollLeft === 0) {
      track.scrollLeft = nextSegmentWidth;
    }
  };

  const normalizeTrackPosition = () => {
    const track = trackRef.current;
    const segmentWidth = segmentWidthRef.current;

    if (!track || !segmentWidth || wrapLockRef.current) {
      return;
    }

    if (track.scrollLeft <= segmentWidth * 0.5) {
      wrapLockRef.current = true;
      track.scrollLeft += segmentWidth;
      requestAnimationFrame(() => {
        wrapLockRef.current = false;
      });
      return;
    }

    if (track.scrollLeft >= segmentWidth * 1.5) {
      wrapLockRef.current = true;
      track.scrollLeft -= segmentWidth;
      requestAnimationFrame(() => {
        wrapLockRef.current = false;
      });
    }
  };

  useEffect(() => {
    measureTrack();

    const handleResize = () => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const previousSegmentWidth = segmentWidthRef.current || track.scrollWidth / 3 || 1;
      const relativeOffset = (track.scrollLeft - previousSegmentWidth) / previousSegmentWidth;

      measureTrack();

      if (segmentWidthRef.current > 0) {
        track.scrollLeft = segmentWidthRef.current + relativeOffset * segmentWidthRef.current;
        normalizeTrackPosition();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [services.length]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track || shouldReduceMotion) {
      return;
    }

    let previousTimestamp = performance.now();

    const tick = (timestamp: number) => {
      const currentTrack = trackRef.current;

      if (!currentTrack) {
        return;
      }

      const delta = timestamp - previousTimestamp;
      previousTimestamp = timestamp;

      const hasUserIntent =
        interactionStateRef.current.hovering ||
        interactionStateRef.current.focused ||
        interactionStateRef.current.pointerActive ||
        timestamp < userResumeAtRef.current;

      if (!hasUserIntent && segmentWidthRef.current > 0) {
        currentTrack.scrollLeft += delta * 0.02;
        normalizeTrackPosition();
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldReduceMotion, services.length]);

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (maxScrollLeft <= 0) {
      return;
    }

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    if (delta === 0) {
      return;
    }

    scheduleResume(1400);
    event.preventDefault();
    track.scrollLeft = Math.max(0, Math.min(maxScrollLeft, track.scrollLeft + delta));
    normalizeTrackPosition();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    interactionStateRef.current.pointerActive = true;

    if (!track || event.pointerType === "touch") {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    };

    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const dragState = dragStateRef.current;

    if (!track || dragState.pointerId !== event.pointerId) {
      return;
    }

    const delta = event.clientX - dragState.startX;

    if (Math.abs(delta) > 2) {
      dragState.moved = true;
    }

    track.scrollLeft = dragState.startScrollLeft - delta;
    normalizeTrackPosition();
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const dragState = dragStateRef.current;
    interactionStateRef.current.pointerActive = false;
    scheduleResume(event.pointerType === "touch" ? 1700 : 1200);

    if (!track || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    dragState.pointerId = null;
  };

  const handleClickCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragStateRef.current.moved = false;
    }
  };

  const handleTrackScroll = () => {
    normalizeTrackPosition();
  };

  const handleMouseEnter = () => {
    interactionStateRef.current.hovering = true;
  };

  const handleMouseLeave = () => {
    interactionStateRef.current.hovering = false;
    scheduleResume(850);
  };

  const handleFocusCapture = () => {
    interactionStateRef.current.focused = true;
  };

  const handleBlurCapture = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      interactionStateRef.current.focused = false;
      scheduleResume(850);
    }
  };

  return (
    <section id="tjenester" className="section-space pt-[clamp(0.25rem,0.9vw,0.75rem)] pb-[clamp(0.05rem,0.2vw,0.18rem)]">
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className={`absolute inset-0 ${surfaceClassName}`}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
        />
        <div className="grain-overlay absolute inset-0 opacity-24" />
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-px ${topBorderClassName}`} />

        <div className="relative mx-auto max-w-[1320px] px-4 py-[clamp(1.2rem,2.2vw,1.8rem)] sm:px-6 lg:px-8 xl:px-10">
          <motion.div
            className="mx-auto max-w-[38rem] text-center"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26, filter: "blur(14px)" }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.26em] ${eyebrowClassName}`}>
              {copy.servicesEyebrow}
            </p>
            <h2
              className={`mt-2 text-balance text-[clamp(1.72rem,3.7vw,2.85rem)] font-semibold leading-[0.88] tracking-[-0.06em] ${titleClassName}`}
            >
              {resolvedTitle}
            </h2>
            <p
              className={`mx-auto mt-1.25 max-w-[28rem] text-balance text-[0.86rem] leading-5.25 sm:text-[0.92rem] sm:leading-5.5 ${descriptionClassName}`}
            >
              {resolvedDescription}
            </p>
          </motion.div>

          <div className="relative mt-2.5 sm:mt-3 lg:mt-3.5">
            <div className={`pointer-events-none absolute inset-y-0 left-0 z-[2] hidden w-16 ${leftFadeClassName} lg:block`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 z-[2] hidden w-16 ${rightFadeClassName} lg:block`} />

            <div
              ref={trackRef}
              className="portfolio-service-track -mx-4 flex gap-3.5 overflow-x-auto overflow-y-visible px-4 pb-0.5 pr-[16vw] touch-pan-x sm:gap-4 sm:pr-8 lg:mx-0 lg:gap-4.5 lg:px-0 lg:pr-6"
              style={{ WebkitOverflowScrolling: "touch" }}
              aria-label={language === "no" ? "Tjenestekarusell" : "Service carousel"}
              tabIndex={0}
              onScroll={handleTrackScroll}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onClickCapture={handleClickCapture}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocusCapture={handleFocusCapture}
              onBlurCapture={handleBlurCapture}
            >
              {carouselServices.map(({ service, copyIndex }, index) => (
                <ServiceCard key={`${service.slug}-${copyIndex}-${index}`} service={service} index={index % services.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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
                className="grid gap-2.5 px-3.5 py-3.5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(13rem,0.42fr)_minmax(0,1fr)] lg:items-start"
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
      className="pt-0 pb-[clamp(0.6rem,1vw,1rem)]"
    >
      <Reveal>
        <article className="glass-panel overflow-hidden rounded-[1.9rem]">
          <div className="grid gap-px bg-[color:var(--line)]/80 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.step}
                className="bg-[color:var(--surface)] px-4 py-3 text-left sm:px-5 sm:py-4.5"
              >
                <span className="font-display text-[1.35rem] leading-none text-[var(--accent)]">
                  {step.step}
                </span>
                <h3 className="mt-2.5 text-[1rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                  {resolveLocalizedValue(step.title, language)}
                </h3>
                <p className="mt-1.5 text-[0.92rem] leading-5.5 text-[var(--muted-2)]">
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
  compact = false,
}: {
  team: TeamMember[];
  bullets: Array<MaybeLocalizedText>;
  compact?: boolean;
}) {
  const { language } = useSitePreferences();
  const copy = uiCopy.siteSections[language];

  return (
    <SectionShell
      eyebrow={copy.teamEyebrow}
      title={copy.teamTitle}
      description={copy.teamDescription}
      className={compact ? "pt-0 pb-8 lg:pb-10" : undefined}
    >
      <div className="team-editorial-grid">
        <FloatingLayer className="team-editorial-rail">
          <article className={cn("glass-panel h-full rounded-[2rem]", compact ? "p-4 sm:p-5 lg:p-5.5" : "p-5 sm:p-6 lg:p-7")}>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              {language === "no" ? "To ulike styrker" : "Two complementary strengths"}
            </p>
            <h3 className={cn("mt-3 max-w-2xl text-[color:var(--foreground)]", compact ? "font-display text-[1.65rem] leading-[1.02] tracking-[-0.055em] sm:text-[2rem]" : "feature-title")}>
              {language === "no"
                ? "Tommy holder produsentsporet tett, mens Gard leder regi, fortelling og klipp."
                : "Tommy keeps the producing track tight, while Gard leads direction, story and edit."}
            </h3>

            <ul className={cn("grid text-sm leading-6 text-[var(--muted-2)]", compact ? "mt-4 gap-2 sm:text-[0.95rem]" : "mt-6 gap-3 sm:text-base")}>
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
                  compact && "team-portrait-card-compact",
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
                  <div className={cn("team-portrait-scene", compact && "team-portrait-scene-compact")}>
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
                          compact && "team-portrait-image-compact",
                        )}
                      />
                    ) : null}
                  </div>

                  <div className={cn("team-portrait-copy", compact && "team-portrait-copy-compact")}>
                    <span className="founder-profile-chip">
                      {resolveLocalizedValue(member.role, language)}
                    </span>
                    <div>
                      <h3 className="card-title text-[color:var(--foreground)]">{member.name}</h3>
                      <p className={cn("mt-3 text-[var(--muted-2)]", compact ? "text-sm leading-6" : "body-copy")}>
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
        <article className="order-2 card-surface relative overflow-hidden rounded-[1.9rem] p-5 sm:p-6 xl:order-1">
          <div className="pointer-events-none absolute -bottom-8 right-[-0.5rem] hidden h-28 w-28 md:block opacity-[0.06]">
            <BrandLogo
              variant="mark"
              className="h-auto w-full brightness-[1.4] saturate-[1.15] drop-shadow-[0_18px_32px_rgba(0,0,0,0.16)]"
            />
          </div>
          <div className="space-y-4">
            <Link href="/" className="brand-signature-chip flex w-fit items-center gap-3 px-2.5 py-2">
              <div className="brand-signature-mark flex h-12 w-12 items-center justify-center rounded-full p-[0.72rem]">
                <BrandLogo
                  variant="mark"
                  className="relative z-[1] h-auto w-full brightness-[2.02] contrast-[1.24] saturate-[1.82]"
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

        <div className="order-1 grid gap-4 xl:order-2">
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
      <article className="card-surface overflow-hidden rounded-[1.8rem] shadow-[0_18px_48px_rgba(18,14,10,0.08)]">
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
    <section className="pt-[clamp(0.5rem,1vw,0.9rem)] pb-[clamp(1rem,1.6vw,1.6rem)]">
      <div className="site-container">
        <div className="overflow-hidden rounded-[1.45rem] border border-black/8 bg-[#111111] px-4 py-4 text-white shadow-[0_18px_44px_rgba(15,15,15,0.1)] sm:rounded-[1.6rem] sm:px-5 sm:py-5 lg:px-6 lg:py-5.5">
          <div
            className={
              align === "center"
                ? "mx-auto max-w-2xl text-center"
                : "grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:items-end"
            }
          >
            <div className="space-y-2">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                {copy.ctaEyebrow}
              </p>
              <h2 className="text-balance font-sans text-[clamp(1.55rem,3.4vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-white">
                {resolveLocalizedValue(title, language)}
              </h2>
              <p className="mx-auto max-w-[34rem] text-[0.92rem] leading-5.5 text-white/68 sm:text-[0.96rem] sm:leading-6">
                {resolveLocalizedValue(description, language)}
              </p>
            </div>
            <div
              className={`flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-2.5 ${
                align === "center" ? "justify-center pt-2.5" : "xl:justify-end"
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

export function PageHero(props: {
  eyebrow: MaybeLocalizedText;
  title: MaybeLocalizedText;
  description: MaybeLocalizedText;
  primaryCta?: { label: MaybeLocalizedText; href: string };
  secondaryCta?: { label: MaybeLocalizedText; href: string };
  video?: CaseStudy["video"];
  visualKey?: string;
  compact?: boolean;
}) {
  const {
    eyebrow,
    title,
    description,
    primaryCta,
    secondaryCta,
    compact = false,
  } = props;
  const { language } = useSitePreferences();
  const resolvedEyebrow = resolveLocalizedValue(eyebrow, language);
  const resolvedTitle = resolveLocalizedValue(title, language);
  const resolvedDescription = resolveLocalizedValue(description, language);
  const compactTitleLines = compact
    ? resolvedTitle.split("\n").map((line) => line.trim()).filter(Boolean)
    : [resolvedTitle];

  return (
    <section className={cn("bg-[#111111] text-white", compact ? "pt-15 sm:pt-18" : "pt-20 sm:pt-28")}>
      <div className="site-container">
        <Reveal className={cn("w-full", compact ? "py-5.5 sm:py-6.5 lg:py-6.5" : "py-10 sm:py-14 lg:py-16")} delay={0.04} y={18}>
          <div className={cn(compact ? "max-w-[34rem]" : "max-w-[44rem]")}>
            <span className="hero-badge text-white/62">{resolvedEyebrow}</span>
            <h1 className={cn("text-white", compact ? "mt-2.5 max-w-[12.2ch] font-display text-[2.05rem] leading-[0.9] tracking-[-0.066em] sm:text-[2.65rem] lg:text-[3.2rem]" : "mt-3 page-title max-w-[13ch]")}>
              {compact && compactTitleLines.length > 1 ? (
                compactTitleLines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))
              ) : (
                resolvedTitle
              )}
            </h1>
            <p className={cn("text-white/76", compact ? "mt-2 max-w-[30rem] text-[0.92rem] leading-5.5 sm:text-[0.96rem] sm:leading-6" : "mt-3.5 body-copy max-w-2xl sm:mt-4 sm:text-base sm:leading-7")}>
              {resolvedDescription}
            </p>
            {primaryCta || secondaryCta ? (
              <div className={cn("flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3", compact ? "mt-3 sm:mt-3.5" : "mt-5 sm:mt-6")}>
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
        </Reveal>
      </div>
    </section>
  );
}
