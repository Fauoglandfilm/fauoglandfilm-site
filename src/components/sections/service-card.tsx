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
import { ArrowUpRight } from "lucide-react";

import { PreviewMedia } from "@/components/media/preview-media";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { homeServiceVideoLibrary, type ServiceArea } from "@/data/site-content";
import { serviceAreaVisuals } from "@/data/visual-assets";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: ServiceArea;
  index?: number;
};

const serviceVideoKeyBySlug = {
  reklamefilm: "01",
  "marketing-distribusjon": "05",
  "bedriftsfilm-intervjuer": "02",
  "some-innhold": "03",
  "event-live": "04",
  "dronefilm-luftfoto": "06",
} as const;

const serviceMediaConfigBySlug = {
  reklamefilm: {
    mediaFit: "cover",
    mediaObjectClassName: "object-[52%_50%]",
  },
  "marketing-distribusjon": {
    mediaFit: "cover",
    mediaObjectClassName: "object-center",
  },
  "bedriftsfilm-intervjuer": {
    mediaFit: "cover",
    mediaObjectClassName: "object-[50%_42%]",
  },
  "some-innhold": {
    mediaFit: "cover",
    mediaObjectClassName: "object-[50%_28%]",
  },
  "event-live": {
    mediaFit: "cover",
    mediaObjectClassName: "object-[50%_38%]",
  },
  "dronefilm-luftfoto": {
    mediaFit: "cover",
    mediaObjectClassName: "object-center",
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

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const { language, theme } = useSitePreferences();
  const shouldReduceMotion = useReducedMotion();
  const isDarkTheme = theme === "dark";
  const visual = serviceAreaVisuals[service.slug];
  const videoKey = serviceVideoKeyBySlug[service.slug as keyof typeof serviceVideoKeyBySlug];
  const video = videoKey ? homeServiceVideoLibrary[videoKey] : undefined;
  const mediaConfig = serviceMediaConfigBySlug[service.slug as keyof typeof serviceMediaConfigBySlug] ?? {
    mediaFit: "cover" as const,
    mediaObjectClassName: "object-center",
  };
  const title = resolveLocalizedValue(service.title, language);
  const subline = resolveLocalizedValue(service.value, language);
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
  const timelineChip = resolveLocalizedValue(
    serviceTimelineChipBySlug[service.slug as keyof typeof serviceTimelineChipBySlug],
    language,
  );
  const keyChips = [purposeChip, timelineChip];
  const shellClassName = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03)_48%,rgba(255,255,255,0.045)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_52px_rgba(2,6,12,0.34)]"
    : "border-[color:var(--line)]/78 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(246,249,253,0.76)_50%,rgba(239,245,252,0.7)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_22px_48px_rgba(122,140,168,0.18)]";
  const shellHoverShadow = isDarkTheme
    ? "inset 0 1px 0 rgba(255,255,255,0.16), 0 30px 68px rgba(2,6,12,0.42), 0 0 0 1px rgba(255,255,255,0.07)"
    : "inset 0 1px 0 rgba(255,255,255,0.94), 0 28px 60px rgba(122,140,168,0.22), 0 0 0 1px rgba(255,255,255,0.64)";
  const overlayClassName = isDarkTheme
    ? "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),linear-gradient(160deg,rgba(255,255,255,0.05),transparent_42%,rgba(255,255,255,0.03)_100%)]"
    : "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.44),transparent_24%),linear-gradient(160deg,rgba(255,255,255,0.14),transparent_40%,rgba(255,255,255,0.05)_100%)]";
  const glowClassName = isDarkTheme ? "bg-[color:var(--accent)]/18" : "bg-[color:var(--accent)]/15";
  const sheenClassName = isDarkTheme
    ? "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] opacity-[0.16]"
    : "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.54),transparent)] opacity-[0.24]";
  const mediaSurfaceClassName = isDarkTheme
    ? "bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_28px_rgba(0,0,0,0.12)]"
    : "bg-white/56 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_28px_rgba(154,173,200,0.12)]";
  const mediaOverlayClassName = isDarkTheme
    ? "bg-[linear-gradient(180deg,rgba(4,7,12,0.18)_0%,rgba(4,7,12,0.04)_22%,rgba(7,10,16,0.22)_58%,rgba(7,10,16,0.66)_100%)]"
    : "bg-[linear-gradient(180deg,rgba(248,251,255,0.16)_0%,rgba(244,248,253,0.04)_24%,rgba(214,224,236,0.16)_58%,rgba(226,234,243,0.62)_100%)]";
  const contentSurfaceClassName = isDarkTheme
    ? "border-white/12 bg-[linear-gradient(180deg,rgba(10,14,21,0.98),rgba(10,14,21,0.92)_54%,rgba(10,14,21,0.86)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_32px_rgba(0,0,0,0.18)]"
    : "border-[color:var(--line)]/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,253,0.97)_46%,rgba(241,245,250,0.95)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_32px_rgba(154,173,200,0.16)]";
  const titleClassName = isDarkTheme ? "text-white" : "text-[color:var(--foreground)]";
  const sublineClassName = isDarkTheme ? "text-white/90" : "text-[color:var(--foreground)]/88";
  const chipClassName = isDarkTheme
    ? "border-white/16 bg-white/[0.09] text-white shadow-[0_8px_18px_rgba(0,0,0,0.16)]"
    : "border-[color:var(--line)]/72 bg-white/94 text-[color:var(--foreground)] shadow-[0_8px_18px_rgba(154,173,200,0.12)]";
  const secondaryLinkClassName = isDarkTheme
    ? "border-white/12 bg-white/[0.05] text-white/88 hover:border-white/18 hover:bg-white/[0.08] hover:text-white focus-visible:ring-offset-[#070b12]"
    : "border-[color:var(--line)]/72 bg-white/78 text-[color:var(--foreground)] hover:border-[color:var(--line)] hover:bg-white hover:text-[color:var(--foreground)] focus-visible:ring-offset-[#eef3f9]";
  const primaryButtonClassName = isDarkTheme
    ? "border-[color:var(--accent)]/24 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_28%,rgba(255,255,255,0.12)),rgba(255,255,255,0.05)_58%,rgba(255,255,255,0.03)_100%)] text-white shadow-[0_12px_30px_color-mix(in_srgb,var(--accent)_18%,transparent)] hover:border-[color:var(--accent)]/42 hover:shadow-[0_16px_38px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
    : "border-[color:var(--accent)]/26 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_22%,white),rgba(255,255,255,0.94)_58%,rgba(255,255,255,0.86)_100%)] text-[color:var(--foreground)] shadow-[0_12px_28px_color-mix(in_srgb,var(--accent)_14%,transparent)] hover:border-[color:var(--accent)]/42 hover:shadow-[0_16px_34px_color-mix(in_srgb,var(--accent)_18%,transparent)]";

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 180,
    damping: 20,
    mass: 0.75,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 180,
    damping: 20,
    mass: 0.75,
  });
  const mediaX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 160,
    damping: 22,
  });
  const mediaY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-7, 7]), {
    stiffness: 160,
    damping: 22,
  });

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
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
        className={`relative flex h-full w-[78vw] min-w-[14.75rem] max-w-[16.25rem] flex-col overflow-hidden rounded-[1.05rem] border backdrop-blur-[30px] will-change-transform sm:w-[15.5rem] sm:min-w-[15.5rem] sm:max-w-[15.5rem] xl:w-[16.75rem] xl:min-w-[16.75rem] xl:max-w-[16.75rem] ${shellClassName}`}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                boxShadow: shellHoverShadow,
              }
        }
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`absolute inset-0 ${overlayClassName}`} />
        <div className="grain-overlay absolute inset-0 opacity-20" />
        <motion.div
          aria-hidden="true"
          className={`pointer-events-none absolute -bottom-8 left-1/2 h-20 w-[74%] -translate-x-1/2 rounded-full blur-3xl ${glowClassName}`}
          animate={shouldReduceMotion ? undefined : { opacity: [0.16, 0.24, 0.16], scale: [0.98, 1.04, 0.98] }}
          transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-[-15%] left-[-45%] w-[48%] rotate-[14deg] blur-xl ${sheenClassName}`}
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

        <div className="relative flex h-full flex-col p-2.4 sm:p-2.7">
          <div className={`relative overflow-hidden rounded-[0.86rem] ${mediaSurfaceClassName}`}>
            <motion.div
              className="relative aspect-[1.42/1] w-full"
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
                mediaObjectClassName={mediaConfig.mediaObjectClassName}
                previewBehavior={video ? "hover-or-viewport" : "static"}
                className="absolute inset-0"
                sizes="(min-width: 1536px) 16.75rem, (min-width: 640px) 15.5rem, 78vw"
                rootMargin="120px 20px -12% 20px"
                inViewThreshold={0.22}
                priority={false}
                posterClassName={cn(mediaConfig.mediaObjectClassName, "transition duration-500 ease-out group-hover:scale-[1.02]")}
                previewClassName="transition duration-500 ease-out"
              />
            </motion.div>
            <div className={`absolute inset-0 ${mediaOverlayClassName}`} />
          </div>

          <div className="relative mt-2.6 flex flex-1 flex-col">
            <div
              className={`pointer-events-none absolute inset-x-[-0.2rem] inset-y-[-0.15rem] rounded-[1.02rem] border ${contentSurfaceClassName}`}
            />
            <div className="relative z-[1] space-y-2.65 px-0.55 pt-0.75">
              <div className="flex items-start justify-between gap-3">
                <h3
                  className={`max-w-[10.5ch] text-[1.34rem] font-black leading-[0.9] tracking-[-0.058em] sm:text-[1.48rem] ${titleClassName}`}
                >
                  {title}
                </h3>
              </div>
              <p className={`max-w-[21ch] text-[0.94rem] font-semibold leading-6 sm:text-[0.99rem] ${sublineClassName} line-clamp-2`}>
                {subline}
              </p>

              <div className="flex flex-wrap gap-1.25">
                {keyChips.map((chip) => (
                  <span
                    key={`${service.slug}-${chip}`}
                    className={`rounded-full border px-2.25 py-1.1 text-[0.66rem] font-semibold tracking-[0.01em] backdrop-blur-xl ${chipClassName}`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-[1] mt-auto flex flex-col gap-2 px-0.55 pt-5">
              <ButtonLink
                href={service.href}
                size="compact"
                className={`w-full transition duration-200 ${primaryButtonClassName}`}
              >
                {primaryLabel}
              </ButtonLink>
              <Link
                href={secondaryHref}
                className={`inline-flex min-h-9 items-center justify-between rounded-[0.9rem] border px-3.3 py-2.15 text-[0.82rem] font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/62 focus-visible:ring-offset-2 ${secondaryLinkClassName}`}
              >
                <span>{secondaryLabel}</span>
                <ArrowUpRight className="h-3.25 w-3.25" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
