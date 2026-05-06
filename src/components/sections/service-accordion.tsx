"use client";

import { useState } from "react";

import { PreviewMedia } from "@/components/media/preview-media";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import {
  homeServiceVideoLibrary,
  type ServiceArea,
} from "@/data/site-content";
import { serviceAreaVisuals } from "@/data/visual-assets";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type MaybeLocalizedText = string | LocalizedText;

const serviceVideoKeyBySlug = {
  reklamefilm: "01",
  "marketing-distribusjon": "05",
  "bedriftsfilm-intervjuer": "02",
  "some-innhold": "03",
  "event-live": "04",
  "dronefilm-luftfoto": "06",
} as const;

const serviceMediaConfigBySlug: Record<string, { objectClassName: string }> = {
  reklamefilm: { objectClassName: "object-[52%_50%]" },
  "marketing-distribusjon": { objectClassName: "object-center" },
  "bedriftsfilm-intervjuer": { objectClassName: "object-[50%_42%]" },
  "some-innhold": { objectClassName: "object-[50%_28%]" },
  "event-live": { objectClassName: "object-[50%_38%]" },
  "dronefilm-luftfoto": { objectClassName: "object-center" },
};

function ServiceAccordionRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: ServiceArea;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { language, theme } = useSitePreferences();
  const isDarkTheme = theme === "dark";

  const title = resolveLocalizedValue(service.title, language);
  const eyebrow = resolveLocalizedValue(service.eyebrow, language);
  const value = resolveLocalizedValue(service.value, language);
  const summary = resolveLocalizedValue(service.summary, language);
  const budget = resolveLocalizedValue(service.budget, language);

  const videoKey =
    serviceVideoKeyBySlug[service.slug as keyof typeof serviceVideoKeyBySlug];
  const video = videoKey ? homeServiceVideoLibrary[videoKey] : undefined;
  const visual = serviceAreaVisuals[service.slug];
  const mediaConfig = serviceMediaConfigBySlug[service.slug] ?? {
    objectClassName: "object-center",
  };

  const ctaHref =
    service.exampleHref?.startsWith("/case/")
      ? service.exampleHref
      : "/kontakt";
  const ctaLabel =
    service.exampleHref?.startsWith("/case/")
      ? language === "no"
        ? "Se case"
        : "View case"
      : language === "no"
        ? "Kontakt oss"
        : "Contact us";

  const rowBg = isDarkTheme
    ? isOpen
      ? "bg-white/[0.042]"
      : "bg-transparent hover:bg-white/[0.024]"
    : isOpen
      ? "bg-black/[0.028]"
      : "bg-transparent hover:bg-black/[0.016]";

  const borderColor = isDarkTheme ? "border-white/10" : "border-black/8";
  const numberColor = isDarkTheme ? "text-white/28" : "text-black/22";
  const eyebrowColor = isDarkTheme
    ? "text-[color:var(--accent)]/72"
    : "text-[color:var(--accent)]/80";
  const titleColor = isDarkTheme ? "text-white" : "text-[color:var(--foreground)]";
  const budgetColor = isDarkTheme ? "text-white/52" : "text-black/44";
  const bodyColor = isDarkTheme ? "text-white/62" : "text-[color:var(--muted-2)]";
  const dividerColor = isDarkTheme ? "bg-white/8" : "bg-black/8";
  const metaLabelColor = isDarkTheme ? "text-white/38" : "text-black/36";
  const metaValueColor = isDarkTheme
    ? "text-white/80"
    : "text-[color:var(--foreground)]/82";
  const actionPillClassName = isDarkTheme
    ? "border-white/12 bg-white/[0.045] text-white/66 group-hover:border-[color:var(--accent)]/28 group-hover:bg-[color:var(--accent)]/10 group-hover:text-white"
    : "border-black/10 bg-white/72 text-black/54 shadow-[0_8px_18px_rgba(84,101,125,0.08)] group-hover:border-[color:var(--accent)]/32 group-hover:bg-[color:var(--accent)]/12 group-hover:text-[color:var(--foreground)]";
  const arrowOrbClassName = isDarkTheme
    ? "border-white/10 bg-white/[0.055] text-white/72 group-hover:border-[color:var(--accent)]/34 group-hover:bg-[color:var(--accent)]/12 group-hover:text-white"
    : "border-black/10 bg-white/86 text-black/62 shadow-[0_10px_22px_rgba(84,101,125,0.1)] group-hover:border-[color:var(--accent)]/34 group-hover:bg-[color:var(--accent)]/14 group-hover:text-[color:var(--foreground)]";

  return (
    <div className={cn("border-b transition-colors duration-200", borderColor)}>
      {/* Collapsed row — always visible */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "group flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left transition-colors duration-150 sm:gap-6 sm:px-6 sm:py-5 lg:px-8 lg:py-5",
          rowBg,
        )}
      >
        <span
          className={cn(
            "hidden shrink-0 text-[0.62rem] font-semibold tabular-nums tracking-[0.18em] sm:inline-block",
            numberColor,
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={cn(
            "flex-1 text-[1.08rem] font-black leading-[1.1] tracking-[-0.04em] sm:text-[1.22rem] lg:text-[1.32rem]",
            titleColor,
          )}
        >
          {title}
        </span>

        <span
          className={cn(
            "hidden shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.16em] sm:block lg:min-w-[11rem]",
            eyebrowColor,
          )}
        >
          {eyebrow}
        </span>

        <span
          className={cn(
            "hidden shrink-0 text-[0.82rem] font-semibold tabular-nums lg:block lg:min-w-[9rem] lg:text-right",
            budgetColor,
          )}
        >
          {budget}
        </span>

        <span
          className={cn(
            "hidden shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition duration-200 ease-out sm:inline-flex",
            actionPillClassName,
          )}
        >
          {isOpen
            ? language === "no"
              ? "Åpen"
              : "Open"
            : language === "no"
              ? "Trykk"
              : "Tap"}
          <ArrowUpRightIcon
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200 ease-out",
              isOpen ? "rotate-90" : "rotate-0 group-hover:translate-x-0.5",
            )}
          />
        </span>

        <span
          className={cn(
            "ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-200 ease-out sm:hidden",
            isOpen ? "rotate-90" : "rotate-0",
            arrowOrbClassName,
          )}
          aria-hidden="true"
        >
          <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-px" />
        </span>
      </button>

      {/* Expanded panel */}
      <div
        aria-hidden={!isOpen}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out",
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        {isOpen ? (
          <div className="min-h-0 overflow-hidden">
            <div className="grid gap-6 px-5 pb-7 pt-3 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-8 lg:pb-9 lg:pt-4">
              {/* Media */}
              <div
                className="relative overflow-hidden rounded-[1.1rem] bg-[#0b0d12]"
                style={{ aspectRatio: "16/9" }}
              >
                <PreviewMedia
                  title={service.title}
                  video={video}
                  image={video?.poster ?? visual?.src}
                  imageAlt={title}
                  mediaFit="cover"
                  mediaObjectClassName={mediaConfig.objectClassName}
                  previewBehavior={video ? "hover-or-viewport" : "static"}
                  className="absolute inset-0"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  rootMargin="80px 0px"
                  inViewThreshold={0.1}
                  posterClassName={cn(
                    mediaConfig.objectClassName,
                    "transition duration-500 ease-out group-hover:scale-[1.015]",
                  )}
                  previewClassName="transition duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.04),rgba(8,8,8,0.22)_100%)]" />
                <div className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-2 rounded-full border border-white/14 bg-black/34 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/72 backdrop-blur-[14px] sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_color-mix(in_srgb,var(--accent)_80%,transparent)]" />
                  {language === "no" ? "Bevegelig preview" : "Motion preview"}
                </div>
              </div>

              {/* Content */}
              <div
                className="flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <p
                    className={cn(
                      "text-[1.18rem] font-bold leading-[1.25] tracking-[-0.035em] sm:text-[1.3rem]",
                      titleColor,
                    )}
                  >
                    {value}
                  </p>
                  <p className={cn("text-[0.94rem] leading-[1.65]", bodyColor)}>
                    {summary}
                  </p>
                </div>

                <div className={cn("h-px w-full", dividerColor)} />

                <div className="grid gap-4 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
                  <div>
                    <p
                      className={cn(
                        "mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
                        metaLabelColor,
                      )}
                    >
                      {language === "no" ? "Budsjett" : "Budget"}
                    </p>
                    <p className={cn("text-[0.9rem] font-semibold", metaValueColor)}>
                      {budget}
                    </p>
                  </div>

                  <ButtonLink
                    href={ctaHref}
                    variant="primary"
                    size="default"
                    className="w-full sm:w-auto"
                  >
                    {ctaLabel}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function ServiceAccordionSection({
  services,
  title,
  description,
}: {
  services: ServiceArea[];
  title?: MaybeLocalizedText;
  description?: MaybeLocalizedText;
}) {
  const { language, theme } = useSitePreferences();
  const isDarkTheme = theme === "dark";
  const [openIndex, setOpenIndex] = useState<number>(0);

  const sectionBg = isDarkTheme
    ? "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_97%,#05070a)_0%,color-mix(in_srgb,var(--background)_92%,#071018)_100%)]"
    : "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_98%,white)_0%,color-mix(in_srgb,var(--surface)_99%,#edf2f7)_100%)]";

  const eyebrowColor = isDarkTheme
    ? "text-[color:var(--accent)]/88"
    : "text-[color:var(--accent)]/92";
  const titleColor = isDarkTheme ? "text-white" : "text-[color:var(--foreground)]";
  const descColor = isDarkTheme ? "text-white/60" : "text-[color:var(--muted-2)]";
  const borderTop = isDarkTheme ? "bg-white/8" : "bg-[color:var(--line)]/80";

  const resolvedTitle = title
    ? resolveLocalizedValue(title, language)
    : language === "no"
      ? "Hva vi lager"
      : "What we make";
  const resolvedDescription = description
    ? resolveLocalizedValue(description, language)
    : language === "no"
      ? "Seks tjenester. Én partner. Velg formatet som passer kampanjen."
      : "Six services. One partner. Choose the format that fits your campaign.";

  return (
    <section className={cn("section-space", sectionBg)}>
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div
          className="mb-8 flex flex-col gap-3 sm:mb-10 sm:gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[38rem]">
            <p
              className={cn(
                "text-[0.56rem] font-semibold uppercase tracking-[0.26em]",
                eyebrowColor,
              )}
            >
              {language === "no" ? "Tjenester" : "Services"}
            </p>
            <h2
              className={cn(
                "mt-3 text-balance text-[clamp(1.55rem,3.2vw,2.4rem)] font-semibold leading-[0.92] tracking-[-0.052em]",
                titleColor,
              )}
            >
              {resolvedTitle}
            </h2>
            <p
              className={cn(
                "mt-3 max-w-[30rem] text-[0.9rem] leading-[1.7]",
                descColor,
              )}
            >
              {resolvedDescription}
            </p>
          </div>
          <ButtonLink href="/kontakt" variant="ghost" className="w-full sm:w-auto">
            {language === "no" ? "Book møte" : "Book a meeting"}
          </ButtonLink>
        </div>

        {/* Accordion */}
        <div
          className={cn(
            "overflow-hidden rounded-[1.4rem] border",
            isDarkTheme
              ? "border-white/9 bg-white/[0.028]"
              : "border-black/8 bg-black/[0.018]",
          )}
        >
          <div className={cn("h-px w-full", borderTop)} />

          {services.map((service, index) => (
            <ServiceAccordionRow
              key={service.slug}
              service={service}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((prev) => (prev === index ? -1 : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
