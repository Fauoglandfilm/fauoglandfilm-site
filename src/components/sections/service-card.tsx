"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";

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

const serviceTitleLinesBySlug = {
  "bedriftsfilm-intervjuer": {
    no: ["Bedriftsfilm og", "intervjuer"],
    en: ["Company film and", "interviews"],
  },
  "some-innhold": {
    no: ["Innhold for sosiale", "medier"],
    en: ["Social media", "content"],
  },
} as const;

function renderTitle(title: string, lines?: readonly string[]): ReactNode {
  if (!lines?.length) {
    return title;
  }

  return lines.map((line, index) => (
    <span key={`${line}-${index}`} className="block">
      {line}
    </span>
  ));
}

function getServiceCardCta(service: ServiceArea, language: "no" | "en") {
  const isCaseLink = (href?: string) => Boolean(href && href.startsWith("/case/"));
  const contactHref = "/kontakt";
  const caseHref = isCaseLink(service.exampleHref) ? service.exampleHref : null;

  switch (service.slug) {
    case "reklamefilm":
    case "marketing-distribusjon":
    case "event-live":
    case "dronefilm-luftfoto":
      return {
        href: contactHref,
        label: language === "no" ? "Kontakt oss" : "Contact us",
      };
    case "bedriftsfilm-intervjuer":
      return {
        href: caseHref ?? contactHref,
        label:
          caseHref
            ? language === "no"
              ? "Se case"
              : "View case"
            : language === "no"
              ? "Kontakt oss"
              : "Contact us",
      };
    case "some-innhold":
      return {
        href: caseHref ?? contactHref,
        label:
          caseHref
            ? language === "no"
              ? "Se case"
              : "View case"
            : language === "no"
              ? "Kontakt oss"
              : "Contact us",
      };
    default:
      return {
        href: service.href,
        label: resolveLocalizedValue(service.ctaLabel, language),
      };
  }
}

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
  const cta = getServiceCardCta(service, language);
  const mediaAlt = visual ? resolveLocalizedValue(visual.alt, language) : title;
  const budget = resolveLocalizedValue(service.budget, language);
  const titleLines = serviceTitleLinesBySlug[service.slug as keyof typeof serviceTitleLinesBySlug]?.[language];
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
  const titleClassName = isDarkTheme ? "text-white" : "text-[color:var(--foreground)]";
  const sublineClassName = isDarkTheme ? "text-white/90" : "text-[color:var(--foreground)]/88";
  const primaryButtonClassName = isDarkTheme
    ? "min-h-[2.85rem] border-[color:var(--accent)]/24 shadow-[0_14px_30px_color-mix(in_srgb,var(--accent)_18%,transparent)] hover:border-[color:var(--accent)]/42 hover:shadow-[0_18px_38px_color-mix(in_srgb,var(--accent)_22%,transparent)] [&_.button-label-base]:gap-1.15 [&_.button-label-dot]:ml-[0.12rem] [&_.button-label-dot]:h-[0.3rem] [&_.button-label-dot]:w-[0.3rem]"
    : "min-h-[2.85rem] border-[color:var(--accent)]/26 shadow-[0_14px_28px_color-mix(in_srgb,var(--accent)_14%,transparent)] hover:border-[color:var(--accent)]/42 hover:shadow-[0_18px_34px_color-mix(in_srgb,var(--accent)_18%,transparent)] [&_.button-label-base]:gap-1.15 [&_.button-label-dot]:ml-[0.12rem] [&_.button-label-dot]:h-[0.3rem] [&_.button-label-dot]:w-[0.3rem]";

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
        className={`relative flex h-full w-[72vw] min-w-[13.6rem] max-w-[15rem] flex-col overflow-hidden rounded-[1.05rem] border backdrop-blur-[30px] will-change-transform sm:w-[14.45rem] sm:min-w-[14.45rem] sm:max-w-[14.45rem] xl:w-[15.35rem] xl:min-w-[15.35rem] xl:max-w-[15.35rem] ${shellClassName}`}
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

        <div className="relative flex h-full flex-col p-2.15 sm:p-2.35">
          <div className={`relative overflow-hidden rounded-[0.92rem] ${mediaSurfaceClassName}`}>
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
                sizes="(min-width: 1536px) 15.35rem, (min-width: 640px) 14.45rem, 72vw"
                rootMargin="120px 20px -12% 20px"
                inViewThreshold={0.22}
                priority={false}
                posterClassName={cn(mediaConfig.mediaObjectClassName, "transition duration-500 ease-out")}
                previewClassName="transition duration-500 ease-out"
              />
            </motion.div>
            <div className={`absolute inset-0 ${mediaOverlayClassName}`} />
          </div>

          <div className="relative flex flex-1 flex-col px-0.55 pb-0.2 pt-2.7">
            <div className="space-y-2.35">
              <h3
                className={`max-w-[12.5ch] text-balance text-[1.3rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-[1.42rem] ${titleClassName}`}
              >
                {renderTitle(title, titleLines)}
              </h3>
              <p
                className={`max-w-[22ch] text-[0.88rem] font-semibold leading-[1.45] sm:text-[0.93rem] ${sublineClassName} line-clamp-2`}
              >
                {subline}
              </p>
              <p className={`text-[0.92rem] font-semibold leading-none sm:text-[0.98rem] ${titleClassName}`}>
                {budget}
              </p>
            </div>

            <div className="mt-auto pt-5.25">
              <ButtonLink
                href={cta.href}
                size="compact"
                fullWidth
                className={`transition duration-200 ${primaryButtonClassName}`}
              >
                {cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
