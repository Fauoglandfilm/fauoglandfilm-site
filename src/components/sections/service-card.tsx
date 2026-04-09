"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

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
    ? "border-white/9 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_20px_44px_rgba(2,6,12,0.3)]"
    : "border-[color:var(--line)]/78 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,250,253,0.76)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.84),0_18px_40px_rgba(122,140,168,0.14)]";
  const shellHoverShadow = isDarkTheme
    ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 24px 52px rgba(2,6,12,0.36), 0 0 0 1px rgba(255,255,255,0.05)"
    : "inset 0 1px 0 rgba(255,255,255,0.88), 0 22px 48px rgba(122,140,168,0.18), 0 0 0 1px rgba(255,255,255,0.58)";
  const overlayClassName = isDarkTheme
    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_28%,rgba(255,255,255,0.015)_100%)]"
    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_26%,rgba(255,255,255,0.06)_100%)]";
  const mediaSurfaceClassName = isDarkTheme
    ? "bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_26px_rgba(0,0,0,0.1)]"
    : "bg-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_12px_24px_rgba(154,173,200,0.1)]";
  const mediaOverlayClassName = isDarkTheme
    ? "bg-[linear-gradient(180deg,rgba(4,7,12,0.08)_0%,rgba(4,7,12,0.02)_24%,rgba(7,10,16,0.18)_100%)]"
    : "bg-[linear-gradient(180deg,rgba(248,251,255,0.1)_0%,rgba(244,248,253,0.02)_26%,rgba(226,234,243,0.28)_100%)]";
  const titleClassName = isDarkTheme ? "text-white" : "text-[color:var(--foreground)]";
  const sublineClassName = isDarkTheme ? "text-white/90" : "text-[color:var(--foreground)]/88";
  const primaryButtonClassName = isDarkTheme
    ? "min-h-[2.85rem] border-[color:var(--accent)]/24 shadow-[0_12px_24px_color-mix(in_srgb,var(--accent)_16%,transparent)] hover:border-[color:var(--accent)]/38 hover:shadow-[0_16px_30px_color-mix(in_srgb,var(--accent)_19%,transparent)] [&_.button-label-base]:gap-1.15 [&_.button-label-dot]:ml-[0.12rem] [&_.button-label-dot]:h-[0.3rem] [&_.button-label-dot]:w-[0.3rem]"
    : "min-h-[2.85rem] border-[color:var(--accent)]/26 shadow-[0_12px_24px_color-mix(in_srgb,var(--accent)_12%,transparent)] hover:border-[color:var(--accent)]/38 hover:shadow-[0_16px_28px_color-mix(in_srgb,var(--accent)_15%,transparent)] [&_.button-label-base]:gap-1.15 [&_.button-label-dot]:ml-[0.12rem] [&_.button-label-dot]:h-[0.3rem] [&_.button-label-dot]:w-[0.3rem]";

  return (
    <motion.article
      className="group relative snap-start"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.72,
        delay: shouldReduceMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className={`relative flex h-full w-[72vw] min-w-[13.6rem] max-w-[15rem] flex-col overflow-hidden rounded-[1.05rem] border backdrop-blur-[14px] will-change-transform sm:w-[14.45rem] sm:min-w-[14.45rem] sm:max-w-[14.45rem] xl:w-[15.35rem] xl:min-w-[15.35rem] xl:max-w-[15.35rem] ${shellClassName}`}
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

        <div className="relative flex h-full flex-col p-2 sm:p-2.15">
          <div className={`relative overflow-hidden rounded-[0.92rem] ${mediaSurfaceClassName}`}>
            <div className="relative aspect-[1.42/1] w-full">
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
                posterClassName={cn(mediaConfig.mediaObjectClassName, "transition duration-400 ease-out")}
                previewClassName="transition duration-400 ease-out"
              />
            </div>
            <div className={`absolute inset-0 ${mediaOverlayClassName}`} />
          </div>

          <div className="relative flex flex-1 flex-col px-0.45 pb-0.15 pt-2.35">
            <div className="space-y-2.1">
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

            <div className="mt-auto pt-4.6">
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
