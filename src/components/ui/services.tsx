"use client";

import Link from "next/link";
import type { PointerEvent as ReactPointerEvent } from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Clapperboard,
  Megaphone,
  Radar,
  Send,
  Sparkles,
} from "lucide-react";

import { PreviewMedia } from "@/components/media/preview-media";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { homeServiceVideoLibrary, serviceAreas, type ServiceArea } from "@/data/site-content";
import { serviceAreaVisuals } from "@/data/visual-assets";
import { resolveLocalizedValue } from "@/lib/i18n";

const serviceVideoKeyBySlug = {
  reklamefilm: "01",
  "bedriftsfilm-intervjuer": "02",
  "some-innhold": "03",
  "event-live": "04",
  "marketing-distribusjon": "05",
  "dronefilm-luftfoto": "06",
} as const;

const serviceMediaConfigBySlug = {
  reklamefilm: {
    mediaFit: "contain",
  },
  "marketing-distribusjon": {
    mediaFit: "contain",
  },
  "bedriftsfilm-intervjuer": {
    mediaFit: "contain",
  },
  "some-innhold": {
    mediaFit: "contain",
  },
  "event-live": {
    mediaFit: "contain",
  },
  "dronefilm-luftfoto": {
    mediaFit: "cover",
  },
} as const;

const servicePurposeChipBySlug = {
  reklamefilm: {
    no: "Flere henvendelser",
    en: "More leads",
  },
  "marketing-distribusjon": {
    no: "Sett, brukt, målt",
    en: "Seen, used, measured",
  },
  "bedriftsfilm-intervjuer": {
    no: "Bygg tillit",
    en: "Build trust",
  },
  "some-innhold": {
    no: "Hold dere synlige",
    en: "Stay visible",
  },
  "event-live": {
    no: "Forleng effekten",
    en: "Extend the impact",
  },
  "dronefilm-luftfoto": {
    no: "Oversikt og tyngde",
    en: "Scale and overview",
  },
} as const;

const serviceBudgetChipBySlug = {
  reklamefilm: {
    no: "40–180k+",
    en: "40–180k+",
  },
  "marketing-distribusjon": {
    no: "15–60k",
    en: "15–60k",
  },
  "bedriftsfilm-intervjuer": {
    no: "35–120k",
    en: "35–120k",
  },
  "some-innhold": {
    no: "20–80k",
    en: "20–80k",
  },
  "event-live": {
    no: "30–120k+",
    en: "30–120k+",
  },
  "dronefilm-luftfoto": {
    no: "10–40k",
    en: "10–40k",
  },
} as const;

const serviceTimelineChipBySlug = {
  reklamefilm: {
    no: "2–5 uker",
    en: "2–5 weeks",
  },
  "marketing-distribusjon": {
    no: "3–10 dager",
    en: "3–10 days",
  },
  "bedriftsfilm-intervjuer": {
    no: "1–3 uker",
    en: "1–3 weeks",
  },
  "some-innhold": {
    no: "3–10 dager",
    en: "3–10 days",
  },
  "event-live": {
    no: "Samme dag–2 uker",
    en: "Same day–2 weeks",
  },
  "dronefilm-luftfoto": {
    no: "1–7 dager",
    en: "1–7 days",
  },
} as const;

const serviceIconBySlug = {
  reklamefilm: Megaphone,
  "marketing-distribusjon": Send,
  "bedriftsfilm-intervjuer": BriefcaseBusiness,
  "some-innhold": Sparkles,
  "event-live": Clapperboard,
  "dronefilm-luftfoto": Radar,
} as const;

function ServiceMenuCard({ service, index }: { service: ServiceArea; index: number }) {
  const { language } = useSitePreferences();
  const shouldReduceMotion = useReducedMotion();
  const visual = serviceAreaVisuals[service.slug];
  const videoKey = serviceVideoKeyBySlug[service.slug as keyof typeof serviceVideoKeyBySlug];
  const video = videoKey ? homeServiceVideoLibrary[videoKey] : undefined;
  const usesDronePreview = service.slug === "dronefilm-luftfoto";
  const mediaConfig = serviceMediaConfigBySlug[service.slug as keyof typeof serviceMediaConfigBySlug] ?? {
    mediaFit: "cover" as const,
  };
  const title = resolveLocalizedValue(service.title, language);
  const eyebrow = resolveLocalizedValue(service.eyebrow, language);
  const subline = resolveLocalizedValue(service.value, language);
  const deliverables = service.deliverables.slice(0, 3).map((item) => resolveLocalizedValue(item, language));
  const primaryLabel = resolveLocalizedValue(service.ctaLabel, language);
  const secondaryHref = service.exampleHref ?? "/case";
  const secondaryLabel = service.exampleLabel
    ? resolveLocalizedValue(service.exampleLabel, language)
    : language === "no"
      ? "Se eksempel"
      : "See example";
  const mediaAlt = visual ? resolveLocalizedValue(visual.alt, language) : title;
  const purposeChip = resolveLocalizedValue(
    servicePurposeChipBySlug[service.slug as keyof typeof servicePurposeChipBySlug],
    language,
  );
  const budgetChip = resolveLocalizedValue(
    serviceBudgetChipBySlug[service.slug as keyof typeof serviceBudgetChipBySlug],
    language,
  );
  const timelineChip = resolveLocalizedValue(
    serviceTimelineChipBySlug[service.slug as keyof typeof serviceTimelineChipBySlug],
    language,
  );
  const Icon = serviceIconBySlug[service.slug as keyof typeof serviceIconBySlug] ?? Sparkles;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), {
    stiffness: 180,
    damping: 18,
    mass: 0.7,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 180,
    damping: 18,
    mass: 0.7,
  });
  const mediaX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 160,
    damping: 22,
  });
  const mediaY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-8, 8]), {
    stiffness: 160,
    damping: 22,
  });

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = (event.clientX - rect.left) / rect.width - 0.5;
    const nextY = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(nextX);
    pointerY.set(nextY);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const cardStyle: MotionStyle | undefined = shouldReduceMotion
    ? undefined
    : {
        rotateX,
        rotateY,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      };

  return (
    <motion.article
      className="group relative snap-start"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40, filter: "blur(18px)" }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      whileHover={shouldReduceMotion ? undefined : { y: -8 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: shouldReduceMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={cardStyle}
    >
      <motion.div
        className="relative flex h-full w-[85vw] min-w-[19rem] max-w-[23rem] flex-col overflow-hidden rounded-[1.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.035)_48%,rgba(255,255,255,0.05)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_56px_rgba(2,6,12,0.3)] backdrop-blur-[30px] will-change-transform sm:w-[23rem] sm:min-w-[23rem] sm:max-w-[23rem] xl:w-[28rem] xl:min-w-[28rem] xl:max-w-[28rem]"
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.16), 0 36px 80px rgba(2,6,12,0.42), 0 0 0 1px rgba(255,255,255,0.08)",
              }
        }
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),linear-gradient(160deg,rgba(255,255,255,0.05),transparent_42%,rgba(255,255,255,0.03)_100%)]" />
        <div className="grain-overlay absolute inset-0 opacity-20" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 left-1/2 h-20 w-[74%] -translate-x-1/2 rounded-full bg-[color:var(--accent)]/18 blur-3xl"
          animate={shouldReduceMotion ? undefined : { opacity: [0.16, 0.24, 0.16], scale: [0.98, 1.04, 0.98] }}
          transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[-15%] left-[-45%] w-[48%] rotate-[14deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] opacity-[0.16] blur-xl"
          animate={shouldReduceMotion ? undefined : { x: ["-10%", "320%"] }}
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 4.2,
                  ease: [0.4, 0, 0.2, 1],
                  repeat: Infinity,
                  repeatDelay: 14,
                }
          }
        />
        <div className="relative flex h-full flex-col p-3 sm:p-3.5">
          <div className="relative overflow-hidden rounded-[1rem] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_36px_rgba(0,0,0,0.12)]">
            <div className="pointer-events-none absolute left-2.5 top-2.5 z-[3] inline-flex items-center gap-1.75 rounded-full border border-white/12 bg-black/14 px-2.5 py-1.1 backdrop-blur-2xl">
              <Icon className="h-3.5 w-3.5 text-[color:var(--accent)]" />
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/66">
                {eyebrow}
              </span>
            </div>
            <motion.div
              className="relative aspect-[1.28/1] w-full"
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: mediaX,
                      y: mediaY,
                    }
              }
            >
              <PreviewMedia
                title={service.title}
                video={video}
                image={video?.poster ?? visual?.src}
                imageAlt={mediaAlt}
                mediaFit={mediaConfig.mediaFit}
                previewBehavior={usesDronePreview ? "always" : video ? "hover-or-viewport" : "static"}
                className="absolute inset-0"
                sizes="(min-width: 1536px) 28rem, (min-width: 640px) 23rem, 85vw"
                rootMargin="180px 0px -12% 0px"
                inViewThreshold={0.22}
                priority={usesDronePreview}
                posterClassName="transition duration-500 ease-out group-hover:scale-[1.02]"
                previewClassName="transition duration-500 ease-out"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(4,6,10,0.03)_30%,rgba(4,6,10,0.16)_100%)]" />
          </div>

          <div className="relative mt-2.75 flex flex-1 flex-col">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="max-w-[10ch] text-[1.28rem] font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-[1.42rem]">
                  {title}
                </h3>
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-white/34 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]" />
              </div>
              <p className="max-w-[24ch] text-[0.84rem] leading-5.25 text-white/78">
                {subline}
              </p>
            </div>

            <div className="mt-2.75 flex flex-wrap gap-1.25">
              {[purposeChip, budgetChip, timelineChip].map((chip) => (
                <span
                  key={`${service.slug}-${chip}`}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-2.25 py-1 text-[0.58rem] font-medium tracking-[0.01em] text-white/74 backdrop-blur-xl"
                >
                  {chip}
                </span>
              ))}
            </div>

            <ul className="mt-3 space-y-1.25 text-[0.84rem] leading-5 text-white/70">
              {deliverables.map((item) => (
                <li key={`${service.slug}-${item}`} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.25 w-1.25 rounded-full bg-[color:var(--accent)]/86" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-1.75 pt-3.5">
              <ButtonLink
                href={service.href}
                size="compact"
                className="w-full border-[color:var(--accent)]/24 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_28%,rgba(255,255,255,0.12)),rgba(255,255,255,0.05)_58%,rgba(255,255,255,0.03)_100%)] text-white shadow-[0_12px_30px_color-mix(in_srgb,var(--accent)_18%,transparent)] transition duration-200 hover:border-[color:var(--accent)]/42 hover:shadow-[0_16px_38px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
              >
                {primaryLabel}
              </ButtonLink>
              <Link
                href={secondaryHref}
                className="inline-flex min-h-10 items-center justify-between rounded-[0.95rem] border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[0.84rem] font-medium text-white/72 transition duration-200 hover:border-white/16 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/62 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b12]"
              >
                <span>{secondaryLabel}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function ServicesSection() {
  const { language } = useSitePreferences();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-space pt-0">
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,21,42,0.86),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(210,173,116,0.12),transparent_24%),linear-gradient(180deg,#05070b_0%,#08101a_42%,#06070a_100%)]"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <div className="grain-overlay absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/8" />

        <div className="relative mx-auto max-w-[1320px] px-4 py-[clamp(3.2rem,6.2vw,5rem)] sm:px-6 lg:px-8 xl:px-10">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(14px)" }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]/88">
              {language === "no" ? "Tjenester" : "Services"}
            </p>
            <h2 className="mt-2.5 text-balance text-[clamp(2rem,4.8vw,3.7rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
              {language === "no"
                ? "Velg tjenesten som matcher målet dere faktisk har"
                : "Choose the service that matches the outcome you actually need."}
            </h2>
            <p className="mx-auto mt-2.5 max-w-[35rem] text-balance text-[0.92rem] leading-6 text-white/62 sm:text-[0.98rem]">
              {language === "no"
                ? "Hver tjeneste viser hva den er best til, typisk budsjett, leveringstid og hva dere sitter igjen med."
                : "A premium service menu with clear purpose, typical budget, timeline and what you walk away with."}
            </p>
          </motion.div>

          <div className="relative mt-5 sm:mt-6 lg:mt-7">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] hidden w-16 bg-[linear-gradient(90deg,#05070b_0%,rgba(5,7,11,0.78)_55%,transparent)] lg:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] hidden w-16 bg-[linear-gradient(270deg,#05070b_0%,rgba(5,7,11,0.78)_55%,transparent)] lg:block" />

            <div
              className="portfolio-service-track -mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto overflow-y-visible px-4 pb-2 pr-[14vw] touch-pan-x sm:gap-4 sm:pr-8 lg:mx-0 lg:gap-5 lg:px-0 lg:pr-6"
              style={{ WebkitOverflowScrolling: "touch" }}
              aria-label={language === "no" ? "Tjenestemeny" : "Service menu"}
              tabIndex={0}
            >
              {serviceAreas.map((service, index) => (
                <ServiceMenuCard key={service.slug} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
