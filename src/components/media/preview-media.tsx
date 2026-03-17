"use client";

import { useEffect, useRef, useState } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { EmbeddedVideoPlayer } from "./embedded-video-player";
import { MediaImage } from "./media-image";

const GLOBAL_MEDIA_FALLBACKS = [
  "/assets/visuals/cinematic/cinematic-video-camera-closeup.jpg",
  "/assets/visuals/section-images/section-film-studio-cyclorama.jpg",
] as const;

type PreviewBehavior = "static" | "always" | "hover" | "viewport" | "hover-or-viewport";

type PreviewMediaProps = {
  title: string | LocalizedText;
  video?: VideoAsset;
  externalVideo?: ExternalVideoAsset;
  image?: string;
  imageAlt?: string | LocalizedText;
  mediaFit?: "cover" | "contain";
  previewBehavior?: PreviewBehavior;
  className?: string;
  sizes?: string;
  priority?: boolean;
  posterClassName?: string;
  previewClassName?: string;
  rootMargin?: string;
};

function resolvePosterSrc(
  video: VideoAsset | undefined,
  externalVideo: ExternalVideoAsset | undefined,
  image: string | undefined,
) {
  return image ?? video?.poster ?? externalVideo?.thumbnailSrc;
}

function buildFallbackSources(
  video: VideoAsset | undefined,
  externalVideo: ExternalVideoAsset | undefined,
) {
  const sources: string[] = [];

  if (video?.videoType === "direct" && video.poster) {
    sources.push(video.poster);
  }

  if (externalVideo?.thumbnailSrc) {
    sources.push(externalVideo.thumbnailSrc);
  }

  if (externalVideo?.provider === "youtube" && externalVideo.videoId) {
    sources.push(
      `https://i.ytimg.com/vi/${externalVideo.videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${externalVideo.videoId}/hqdefault.jpg`,
      `https://i.ytimg.com/vi/${externalVideo.videoId}/mqdefault.jpg`,
      `https://i.ytimg.com/vi/${externalVideo.videoId}/default.jpg`,
    );
  }

  sources.push(...GLOBAL_MEDIA_FALLBACKS);

  return sources;
}

function isPlayableDirectPreview(video: VideoAsset | undefined) {
  if (!video || video.videoType !== "direct") {
    return false;
  }

  const sources = [video.src, video.mobileSrc].filter(Boolean) as string[];

  return sources.some((source) => {
    if (source.startsWith("/")) {
      return true;
    }

    return /\.(mp4|webm|mov)(\?|$)/i.test(source);
  });
}

export function PreviewMedia({
  title,
  video,
  externalVideo,
  image,
  imageAlt,
  mediaFit = "cover",
  previewBehavior = "static",
  className,
  sizes = "(min-width: 1024px) 72vw, 100vw",
  priority = false,
  posterClassName,
  previewClassName,
  rootMargin = "0px 0px -12% 0px",
}: PreviewMediaProps) {
  const { language } = useSitePreferences();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (previewBehavior === "static" || previewBehavior === "always") {
      return;
    }

    const node = containerRef.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.42,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [previewBehavior, rootMargin]);

  const resolvedTitle = resolveLocalizedValue(title, language);
  const resolvedAlt = imageAlt ? resolveLocalizedValue(imageAlt, language) : resolvedTitle;
  const posterSrc = resolvePosterSrc(video, externalVideo, image);
  const fallbackSources = buildFallbackSources(video, externalVideo);
  const hasDirectPreview = isPlayableDirectPreview(video);
  const hasExternalPreview = Boolean(externalVideo);
  const hasPlayableMedia = hasDirectPreview || hasExternalPreview;

  const shouldPlay =
    previewBehavior === "always"
      ? true
      : previewBehavior === "hover"
        ? canHover && isHovered
        : previewBehavior === "viewport"
          ? isInView
          : previewBehavior === "hover-or-viewport"
            ? canHover
              ? isHovered
              : isInView
            : false;
  const shouldRenderPreview =
    shouldPlay &&
    (hasDirectPreview || (hasExternalPreview && canHover));
  const mediaObjectClass =
    mediaFit === "contain" ? "object-contain p-5 sm:p-6" : "object-cover";

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={resolvedTitle}
    >
      {posterSrc || fallbackSources.length ? (
        <MediaImage
          src={posterSrc}
          fallbackSrcs={fallbackSources}
          alt={resolvedAlt}
          priority={priority}
          sizes={sizes}
          className={cn(
            mediaObjectClass,
            "transition duration-700",
            shouldRenderPreview
              ? "scale-[1.015] opacity-100"
              : hasPlayableMedia && shouldPlay
                ? "scale-[1.02] opacity-100"
                : "scale-100 opacity-100",
            posterClassName,
          )}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_24%),linear-gradient(135deg,rgba(120,164,255,0.18),rgba(10,12,18,0.94))]" />
      )}

      {shouldRenderPreview ? (
        <EmbeddedVideoPlayer
          title={title}
          video={video}
          externalVideo={externalVideo}
          image={image}
          imageAlt={imageAlt}
          mediaFit={mediaFit}
          autoplay
          previewMode
          className={cn("absolute inset-0 h-full w-full", previewClassName)}
          sizes={sizes}
        />
      ) : null}
    </div>
  );
}
