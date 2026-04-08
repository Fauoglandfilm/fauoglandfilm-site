"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
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
const SERVICE_CAROUSEL_COPY_COUNT = 3;
const SERVICE_CAROUSEL_CENTER_INDEX = Math.floor(SERVICE_CAROUSEL_COPY_COUNT / 2);

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
  const carouselServices = Array.from({ length: SERVICE_CAROUSEL_COPY_COUNT }, (_, copyIndex) =>
    services.map((service) => ({
      service,
      copyIndex,
    })),
  ).flat();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const segmentWidthRef = useRef(0);
  const wrapLockRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const userResumeAtRef = useRef(0);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
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
    ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_82%_8%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_24%),linear-gradient(180deg,color-mix(in_srgb,var(--background)_94%,#030407)_0%,color-mix(in_srgb,var(--background)_82%,#08111b)_100%)]"
    : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.82),transparent_32%),radial-gradient(circle_at_84%_10%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_24%),linear-gradient(180deg,color-mix(in_srgb,var(--surface)_94%,white)_0%,color-mix(in_srgb,var(--surface)_98%,#eef3f9)_100%)]";
  const topBorderClassName = isDarkTheme ? "bg-white/8" : "bg-[color:var(--line)]/80";
  const eyebrowClassName = isDarkTheme ? "text-[color:var(--accent)]/88" : "text-[color:var(--accent)]/92";
  const titleClassName = isDarkTheme ? "text-white" : "text-[color:var(--foreground)]";
  const descriptionClassName = isDarkTheme ? "text-white/62" : "text-[var(--muted-2)]";
  const leftFadeClassName = isDarkTheme
    ? "bg-[linear-gradient(90deg,color-mix(in_srgb,var(--background)_96%,#030407)_0%,rgba(3,4,7,0.84)_52%,transparent)]"
    : "bg-[linear-gradient(90deg,color-mix(in_srgb,var(--surface)_98%,white)_0%,rgba(244,247,252,0.84)_52%,transparent)]";
  const rightFadeClassName = isDarkTheme
    ? "bg-[linear-gradient(270deg,color-mix(in_srgb,var(--background)_88%,#081320)_0%,rgba(8,19,32,0.84)_52%,transparent)]"
    : "bg-[linear-gradient(270deg,color-mix(in_srgb,var(--surface)_98%,#e4edf8)_0%,rgba(221,231,244,0.84)_52%,transparent)]";

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    const segmentWidth = segmentWidthRef.current;

    if (!track || !segmentWidth) {
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = "scaleX(0.16)";
      }
      return;
    }

    const normalizedOffset =
      (((track.scrollLeft - segmentWidth * SERVICE_CAROUSEL_CENTER_INDEX) / segmentWidth) % 1 + 1) % 1;

    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${0.16 + normalizedOffset * 0.84})`;
    }
  }, []);

  const scheduleResume = (delay = 900) => {
    userResumeAtRef.current = performance.now() + delay;
  };

  const measureTrack = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const nextSegmentWidth = track.scrollWidth / SERVICE_CAROUSEL_COPY_COUNT;

    if (!Number.isFinite(nextSegmentWidth) || nextSegmentWidth <= 0) {
      return;
    }

    segmentWidthRef.current = nextSegmentWidth;

    if (track.scrollLeft === 0) {
      track.scrollLeft = nextSegmentWidth * SERVICE_CAROUSEL_CENTER_INDEX;
    }

    updateProgress();
  }, [updateProgress]);

  const normalizeTrackPosition = useCallback(() => {
    const track = trackRef.current;
    const segmentWidth = segmentWidthRef.current;

    if (!track || !segmentWidth || wrapLockRef.current) {
      return;
    }

    if (track.scrollLeft <= segmentWidth * (SERVICE_CAROUSEL_CENTER_INDEX - 0.5)) {
      wrapLockRef.current = true;
      track.scrollLeft += segmentWidth;
      requestAnimationFrame(() => {
        wrapLockRef.current = false;
        updateProgress();
      });
      return;
    }

    if (track.scrollLeft >= segmentWidth * (SERVICE_CAROUSEL_CENTER_INDEX + 0.5)) {
      wrapLockRef.current = true;
      track.scrollLeft -= segmentWidth;
      requestAnimationFrame(() => {
        wrapLockRef.current = false;
        updateProgress();
      });
    }
  }, [updateProgress]);

  useEffect(() => {
    measureTrack();

    const handleResize = () => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const previousSegmentWidth = segmentWidthRef.current || track.scrollWidth / SERVICE_CAROUSEL_COPY_COUNT || 1;
      const relativeOffset =
        (track.scrollLeft - previousSegmentWidth * SERVICE_CAROUSEL_CENTER_INDEX) / previousSegmentWidth;

      measureTrack();

      if (segmentWidthRef.current > 0) {
        track.scrollLeft =
          segmentWidthRef.current * SERVICE_CAROUSEL_CENTER_INDEX + relativeOffset * segmentWidthRef.current;
        normalizeTrackPosition();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [measureTrack, normalizeTrackPosition, services.length]);

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
        currentTrack.scrollLeft += delta * 0.016;
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
  }, [normalizeTrackPosition, shouldReduceMotion, services.length]);

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    if (track.scrollWidth <= track.clientWidth) {
      return;
    }

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    if (delta === 0) {
      return;
    }

    scheduleResume(1400);
    event.preventDefault();
    track.scrollLeft += delta;
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
    updateProgress();
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
    <section id="tjenester" className="section-space py-[clamp(2.8rem,6vw,5.4rem)]">
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

        <div className="relative mx-auto max-w-[1320px] px-4 py-[clamp(1.3rem,2vw,1.8rem)] sm:px-6 lg:px-8 xl:px-10">
          <motion.div
            className="mx-auto max-w-[36rem] text-center"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26, filter: "blur(14px)" }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={`text-[0.5rem] font-semibold uppercase tracking-[0.28em] ${eyebrowClassName}`}>
              {copy.servicesEyebrow}
            </p>
            <h2
              className={`mt-3 text-balance text-[clamp(1.42rem,2.8vw,2.12rem)] font-semibold leading-[0.9] tracking-[-0.05em] ${titleClassName}`}
            >
              {resolvedTitle}
            </h2>
            <p
              className={`mx-auto mt-2 max-w-[30rem] text-balance text-[0.77rem] leading-4.8 sm:text-[0.83rem] sm:leading-5 ${descriptionClassName}`}
            >
              {resolvedDescription}
            </p>
          </motion.div>
        </div>

        <div className="relative mt-3 sm:mt-3.5 lg:mt-4">
          <div className={`pointer-events-none absolute inset-y-0 left-0 z-[2] w-10 sm:w-12 lg:w-16 ${leftFadeClassName}`} />
          <div className={`pointer-events-none absolute inset-y-0 right-0 z-[2] w-10 sm:w-12 lg:w-16 ${rightFadeClassName}`} />

          <div className="relative left-1/2 w-screen -translate-x-1/2">
            <div
              ref={trackRef}
              className="portfolio-service-track flex w-screen gap-2.25 overflow-x-auto overflow-y-hidden overscroll-x-contain overscroll-y-none px-4 pb-1 pr-4 touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2.5 sm:px-6 sm:pr-6 lg:gap-3 lg:px-8 lg:pr-8 xl:px-10 xl:pr-10"
              style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "none" }}
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

          <div className="pointer-events-none mt-4 flex justify-center px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="relative h-[2px] w-[7.5rem] overflow-hidden rounded-full bg-[color:var(--foreground)]/10">
              <div
                ref={progressFillRef}
                className="absolute inset-0 origin-left rounded-full bg-[color:var(--accent)]/78 transition-transform duration-200 ease-out"
                style={{ transform: "scaleX(0.16)" }}
              />
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
      className="-mt-[clamp(2.4rem,5vw,4rem)] pt-0 pb-[clamp(0.35rem,0.7vw,0.65rem)]"
      headerClassName="gap-1.5 sm:gap-2"
      childrenClassName="mt-[clamp(0.65rem,1.2vw,1rem)]"
    >
      <Reveal>
        <article className="glass-panel overflow-hidden rounded-[1.55rem]">
          <div className="grid gap-px bg-[color:var(--line)]/80 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.step}
                className="bg-[color:var(--surface)] px-3.5 py-2.75 text-left sm:px-4 sm:py-3.25"
              >
                <span className="font-display text-[1.12rem] leading-none text-[var(--accent)]">
                  {step.step}
                </span>
                <h3 className="mt-1.75 text-[0.92rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                  {resolveLocalizedValue(step.title, language)}
                </h3>
                <p className="mt-1 text-[0.82rem] leading-5 text-[var(--muted-2)]">
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
                      <ArrowUpRightIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-px" />
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
      <div className="grid gap-3.5 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="order-2 card-surface relative overflow-hidden rounded-[1.9rem] p-4.5 sm:p-5.5 xl:order-1">
          <div className="pointer-events-none absolute -bottom-6 right-[-0.2rem] hidden h-26 w-26 md:block opacity-[0.11]">
            <BrandLogo
              variant="mark"
              className="h-auto w-full brightness-[1.18] contrast-[1.42] saturate-[1.52] drop-shadow-[0_16px_26px_rgba(186,151,88,0.14)]"
            />
          </div>
          <div className="space-y-3.25">
            <Link href="/" className="brand-signature-chip flex w-fit items-center gap-2.5 px-2.15 py-1.7">
              <div className="brand-signature-mark flex h-11 w-11 items-center justify-center rounded-full bg-white/92 p-[0.6rem] shadow-[0_12px_24px_rgba(17,17,17,0.08),inset_0_1px_0_rgba(255,255,255,0.44)] ring-1 ring-[color:var(--accent)]/12">
                <BrandLogo
                  variant="mark"
                  className="relative z-[1] h-auto w-full scale-[1.04] brightness-[1.72] contrast-[1.52] saturate-[2.22] drop-shadow-[0_2px_6px_rgba(186,151,88,0.14)]"
                />
              </div>
              <div>
                <p className="font-display text-[0.94rem] text-[color:var(--foreground)]">Fau&amp;Land Film</p>
                <p className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Oslo / Production
                </p>
              </div>
            </Link>
            <p className="body-copy max-w-[26rem] text-[var(--muted-2)]">
              {copy.contactLead}
            </p>
          </div>

          <div className="mt-4.5 grid gap-3 border-t border-[color:var(--line)]/86 pt-4.5">
            <ContactRow icon={<MailIcon className="h-5 w-5" />} label={copy.contactMail} value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactRow icon={<PhoneIcon className="h-5 w-5" />} label={copy.contactPhone} value={siteConfig.phonePrimary} href={siteConfig.phonePrimaryHref} />
            <ContactRow icon={<PinIcon className="h-5 w-5" />} label={copy.contactBase} value={siteConfig.locationLabel} />
          </div>
        </article>

        <div className="order-1 grid gap-3.5 xl:order-2">
          <article className="card-surface overflow-hidden rounded-[1.9rem]">
            <div className="p-4.5 sm:p-5.5">
              <div className="max-w-2xl">
                <p className="body-copy text-[var(--muted-2)]">
                  {copy.contactBriefDescription}
                </p>
              </div>
              <div className="mt-5">
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
    <div className="flex items-center gap-3.25 rounded-[1.22rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-3.5 py-3.25">
      <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[color:var(--foreground)] text-[color:var(--background)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[0.64rem] font-medium uppercase tracking-[0.16em] text-[var(--muted)]/82">{label}</p>
        <p className={cn("mt-0.55 truncate text-[1.02rem] leading-[1.2] text-[color:var(--foreground)]", href ? "font-semibold" : "font-medium")}>{value}</p>
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} className="transition">
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
  const { language, theme } = useSitePreferences();
  const copy = uiCopy.siteSections[language];
  const isDarkTheme = theme === "dark";
  const bannerSurfaceClassName = isDarkTheme
    ? "border-white/10 bg-[#111111] text-white shadow-[0_16px_36px_rgba(15,15,15,0.1)]"
    : "border-[color:var(--line)]/80 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_96%,white),color-mix(in_srgb,var(--surface-muted)_92%,white))] text-[color:var(--foreground)] shadow-[0_16px_36px_rgba(18,14,10,0.08)]";
  const bannerEyebrowClassName = isDarkTheme ? "text-white/44" : "text-[var(--muted)]";
  const bannerTitleClassName = isDarkTheme ? "text-white" : "text-[color:var(--foreground)]";
  const bannerDescriptionClassName = isDarkTheme ? "text-white/68" : "text-[var(--muted-2)]";

  return (
    <section className="pt-[clamp(0.2rem,0.5vw,0.45rem)] pb-[clamp(0.55rem,1vw,0.9rem)]">
      <div className="site-container">
        <div
          className={cn(
            "overflow-hidden rounded-[1.2rem] border px-3.5 py-3.5 sm:rounded-[1.35rem] sm:px-4 sm:py-4 lg:px-5 lg:py-4.5",
            bannerSurfaceClassName,
          )}
        >
          <div
            className={
              align === "center"
                ? "mx-auto max-w-2xl text-center"
                : "grid gap-3 xl:grid-cols-[1.1fr_0.9fr] xl:items-end"
            }
          >
            <div className="space-y-1.5">
              <p className={cn("text-[0.64rem] font-semibold uppercase tracking-[0.22em]", bannerEyebrowClassName)}>
                {copy.ctaEyebrow}
              </p>
              <h2
                className={cn(
                  "text-balance font-sans text-[clamp(1.35rem,2.8vw,2.15rem)] font-semibold leading-[1.01] tracking-[-0.055em]",
                  bannerTitleClassName,
                )}
              >
                {resolveLocalizedValue(title, language)}
              </h2>
              <p
                className={cn(
                  "mx-auto max-w-[31rem] text-[0.82rem] leading-5 sm:text-[0.88rem] sm:leading-5.4",
                  bannerDescriptionClassName,
                )}
              >
                {resolveLocalizedValue(description, language)}
              </p>
            </div>
            <div
              className={`flex flex-col gap-1.75 sm:flex-row sm:flex-wrap sm:gap-2 ${
                align === "center" ? "justify-center pt-1.75" : "xl:justify-end"
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
  const { language, theme } = useSitePreferences();
  const resolvedEyebrow = resolveLocalizedValue(eyebrow, language);
  const resolvedTitle = resolveLocalizedValue(title, language);
  const resolvedDescription = resolveLocalizedValue(description, language);
  const isDarkTheme = theme === "dark";
  const compactTitleLines = compact
    ? resolvedTitle.split("\n").map((line) => line.trim()).filter(Boolean)
    : [resolvedTitle];
  const heroSurfaceClassName = isDarkTheme
    ? "bg-[#111111] text-white"
    : "border-b border-[color:var(--line)]/70 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_97%,white)_0%,color-mix(in_srgb,var(--surface-muted)_92%,white)_100%)] text-[color:var(--foreground)]";
  const heroEyebrowClassName = isDarkTheme ? "text-white/62" : "text-[var(--muted)]";
  const heroTitleClassName = isDarkTheme ? "text-white" : "text-[color:var(--foreground)]";
  const heroDescriptionClassName = isDarkTheme ? "text-white/76" : "text-[var(--muted-2)]";

  return (
    <section
      className={cn(
        heroSurfaceClassName,
        compact
          ? "pt-[max(6.6rem,calc(env(safe-area-inset-top,0px)+5.9rem))] sm:pt-[max(7.25rem,calc(env(safe-area-inset-top,0px)+6.4rem))]"
          : "pt-20 sm:pt-28",
      )}
    >
      <div className="site-container">
        <Reveal className={cn("w-full", compact ? "pb-4.5 sm:pb-5.5 lg:pb-5.5" : "py-10 sm:py-14 lg:py-16")} delay={0.04} y={18}>
          <div className={cn(compact ? "max-w-[29rem]" : "max-w-[44rem]")}>
            <span className={cn("hero-badge", heroEyebrowClassName)}>{resolvedEyebrow}</span>
            <h1
              className={cn(
                heroTitleClassName,
                compact
                  ? "mt-1.75 max-w-[11.5ch] font-display text-[1.82rem] leading-[0.88] tracking-[-0.068em] sm:text-[2.2rem] lg:text-[2.7rem]"
                  : "mt-3 page-title max-w-[13ch]",
              )}
            >
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
            <p
              className={cn(
                heroDescriptionClassName,
                compact
                  ? "mt-1.5 max-w-[25rem] text-[0.84rem] leading-5 sm:text-[0.9rem] sm:leading-5.5"
                  : "mt-3.5 body-copy max-w-2xl sm:mt-4 sm:text-base sm:leading-7",
              )}
            >
              {resolvedDescription}
            </p>
            {primaryCta || secondaryCta ? (
              <div className={cn("flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-2.5", compact ? "mt-2.5 sm:mt-3" : "mt-5 sm:mt-6")}>
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
