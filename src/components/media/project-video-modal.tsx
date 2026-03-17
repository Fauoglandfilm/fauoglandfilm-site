"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { CloseIcon } from "@/components/ui/icons";
import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";

import { useSitePreferences } from "../providers/site-preferences";
import { EmbeddedVideoPlayer } from "./embedded-video-player";

type ProjectVideoModalProps = {
  open: boolean;
  onClose: () => void;
  client?: string;
  title: LocalizedText;
  summary?: LocalizedText;
  format?: LocalizedText;
  year?: string;
  video?: VideoAsset;
  externalVideo?: ExternalVideoAsset;
  image?: string;
  imageAlt?: LocalizedText;
  mediaFit?: "cover" | "contain";
  primaryAction?: { href: string; label: LocalizedText };
  secondaryAction?: { href: string; label: LocalizedText };
};

export function ProjectVideoModal({
  open,
  onClose,
  client,
  title,
  summary,
  format,
  year,
  video,
  externalVideo,
  image,
  imageAlt,
  mediaFit,
  primaryAction,
  secondaryAction,
}: ProjectVideoModalProps) {
  const { language } = useSitePreferences();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const availabilityNote =
    video?.videoType === "request"
      ? resolveLocalizedValue(video.availabilityNote, language)
      : null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(117,161,255,0.12),transparent_24%),rgba(4,6,10,0.82)] px-4 py-5 backdrop-blur-2xl sm:px-6">
      <button
        type="button"
        aria-label={language === "no" ? "Lukk forhåndsvisning" : "Close preview"}
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="glass-panel relative z-[1] flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2.2rem] text-white shadow-[0_40px_140px_rgba(0,0,0,0.42)]">
        <div className="glass-sheen absolute inset-0 opacity-55" />
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0 space-y-2">
            {client ? (
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/48">
                {client}
              </p>
            ) : null}
            <h3 className="card-title text-white">
              {resolveLocalizedValue(title, language)}
            </h3>
            {summary ? (
              <p className="body-copy max-w-3xl text-white/72">
                {resolveLocalizedValue(summary, language)}
              </p>
            ) : null}
          </div>

          <Button
            variant="icon"
            size="icon"
            className="shrink-0"
            aria-label={language === "no" ? "Lukk" : "Close"}
            onClick={onClose}
          >
            <CloseIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="media-frame overflow-hidden rounded-[1.6rem]">
            <EmbeddedVideoPlayer
              title={title}
              video={video}
              externalVideo={externalVideo}
              image={image}
              imageAlt={imageAlt}
              mediaFit={mediaFit}
              autoplay={video?.videoType === "direct"}
              className="relative aspect-[1/1.08] sm:aspect-video"
              sizes="(min-width: 1024px) 72vw, 100vw"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {format ? (
              <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/86">
                {resolveLocalizedValue(format, language)}
              </span>
            ) : null}
            {year ? (
              <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/86">
                {year}
              </span>
            ) : null}
          </div>

          {availabilityNote ? (
            <div className="mt-4 rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/74">
              {availabilityNote}
            </div>
          ) : null}

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            {primaryAction ? (
              <ButtonLink href={primaryAction.href} className="w-full sm:w-auto">
                {resolveLocalizedValue(primaryAction.label, language)}
              </ButtonLink>
            ) : null}
            {secondaryAction ? (
              <ButtonLink href={secondaryAction.href} variant="secondary" className="w-full sm:w-auto">
                {resolveLocalizedValue(secondaryAction.label, language)}
              </ButtonLink>
            ) : null}
            <Button variant="ghost" className="w-full sm:w-auto" onClick={onClose}>
              {language === "no" ? "Lukk" : "Close"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
