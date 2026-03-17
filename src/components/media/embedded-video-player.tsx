"use client";

import { useState } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { MediaImage } from "./media-image";

const GLOBAL_MEDIA_FALLBACKS = [
  "/assets/visuals/cinematic/cinematic-video-camera-closeup.jpg",
  "/assets/visuals/section-images/section-film-studio-cyclorama.jpg",
] as const;

type EmbeddedVideoPlayerProps = {
  title: string | LocalizedText;
  video?: VideoAsset;
  externalVideo?: ExternalVideoAsset;
  image?: string;
  imageAlt?: string | LocalizedText;
  mediaFit?: "cover" | "contain";
  autoplay?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  previewMode?: boolean;
};

type ManagedFrameProps = {
  fallbackSrc?: string;
  fallbackSrcs: string[];
  resolvedImageAlt: string;
  mediaObjectClass: string;
  className?: string;
  priority: boolean;
  sizes: string;
  iframeTitle: string;
  iframeSrc: string;
  previewMode: boolean;
};

type ManagedDirectVideoProps = {
  fallbackSrc?: string;
  fallbackSrcs: string[];
  resolvedImageAlt: string;
  mediaObjectClass: string;
  className?: string;
  priority: boolean;
  sizes: string;
  video: Extract<VideoAsset, { videoType: "direct" }>;
  image?: string;
  autoplay: boolean;
  previewMode: boolean;
};

function hasExplicitPositionClass(value?: string) {
  return Boolean(value && /\b(relative|absolute|fixed|sticky)\b/.test(value));
}

function withPlayerParams(video: ExternalVideoAsset, autoplay: boolean, previewMode: boolean) {
  const url = new URL(video.embedUrl);

  if (video.provider === "youtube") {
    url.hostname = "www.youtube-nocookie.com";
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("playsinline", "1");
    url.searchParams.set("autoplay", autoplay ? "1" : "0");
    url.searchParams.set("mute", autoplay || previewMode ? "1" : "0");

    if (previewMode) {
      const videoId = url.pathname.split("/").pop();
      url.searchParams.set("controls", "0");
      url.searchParams.set("fs", "0");
      url.searchParams.set("loop", "1");
      url.searchParams.set("disablekb", "1");
      url.searchParams.set("iv_load_policy", "3");

      if (videoId) {
        url.searchParams.set("playlist", videoId);
      }
    }
  }

  if (video.provider === "vimeo") {
    url.searchParams.set("autoplay", autoplay ? "1" : "0");
    url.searchParams.set("muted", autoplay || previewMode ? "1" : "0");
    url.searchParams.set("title", "0");
    url.searchParams.set("byline", "0");
    url.searchParams.set("portrait", "0");
    url.searchParams.set("dnt", "1");

    if (previewMode) {
      url.searchParams.set("background", "1");
      url.searchParams.set("loop", "1");
      url.searchParams.set("autopause", "0");
    }
  }

  return url.toString();
}

function FallbackSurface() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_24%),linear-gradient(135deg,rgba(120,164,255,0.18),rgba(10,12,18,0.94))]" />
  );
}

function buildFallbackSources(video?: VideoAsset, externalVideo?: ExternalVideoAsset, image?: string) {
  const sources: string[] = [];

  if (image) {
    sources.push(image);
  }

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

  return Array.from(new Set(sources));
}

function isPlayableDirectVideo(video: Extract<VideoAsset, { videoType: "direct" }>) {
  const sources = [video.src, video.mobileSrc].filter(Boolean) as string[];

  return sources.some((source) => {
    if (source.startsWith("/")) {
      return true;
    }

    return /\.(mp4|webm|mov)(\?|$)/i.test(source);
  });
}

function ManagedExternalFrame({
  fallbackSrc,
  fallbackSrcs,
  resolvedImageAlt,
  mediaObjectClass,
  className,
  priority,
  sizes,
  iframeTitle,
  iframeSrc,
  previewMode,
}: ManagedFrameProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <div
      className={cn(
        "overflow-hidden bg-[#05070b]",
        !hasExplicitPositionClass(className) && "relative",
        className,
      )}
    >
      {fallbackSrc || fallbackSrcs.length ? (
        <MediaImage
          src={fallbackSrc}
          fallbackSrcs={fallbackSrcs}
          alt={resolvedImageAlt}
          priority={priority}
          sizes={sizes}
          fallbackContent={<FallbackSurface />}
          className={cn(mediaObjectClass, "transition duration-500", isReady ? "opacity-0" : "opacity-100")}
        />
      ) : (
        <FallbackSurface />
      )}

      <iframe
        src={iframeSrc}
        title={iframeTitle}
        className={cn(
          "absolute inset-0 h-full w-full transition duration-500",
          isReady ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading={previewMode ? "lazy" : undefined}
        tabIndex={previewMode ? -1 : undefined}
        onLoad={() => setIsReady(true)}
      />
    </div>
  );
}

function ManagedDirectVideo({
  fallbackSrc,
  fallbackSrcs,
  resolvedImageAlt,
  mediaObjectClass,
  className,
  priority,
  sizes,
  video,
  image,
  autoplay,
  previewMode,
}: ManagedDirectVideoProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);
  const shouldHoldPosterUntilPlay = !previewMode && !autoplay;
  const posterVisible = hasFailed
    ? true
    : shouldHoldPosterUntilPlay
      ? !hasStartedPlayback
      : !isReady;

  return (
    <div
      className={cn(
        "overflow-hidden bg-[#05070b]",
        !hasExplicitPositionClass(className) && "relative",
        className,
      )}
    >
      {fallbackSrc || fallbackSrcs.length ? (
        <MediaImage
          src={fallbackSrc}
          fallbackSrcs={fallbackSrcs}
          alt={resolvedImageAlt}
          priority={priority}
          sizes={sizes}
          fallbackContent={<FallbackSurface />}
          className={cn(
            mediaObjectClass,
            "pointer-events-none transition duration-500",
            posterVisible ? "opacity-100" : "opacity-0",
          )}
        />
      ) : (
        <FallbackSurface />
      )}

      {!hasFailed ? (
        <video
          className={cn(
            "absolute inset-0 h-full w-full transition duration-500",
            mediaObjectClass,
            isReady ? "opacity-100" : "opacity-0",
          )}
          controls={!previewMode}
          playsInline
          preload="metadata"
          autoPlay={autoplay || previewMode}
          muted={autoplay || previewMode}
          loop={previewMode}
          poster={video.poster ?? image}
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
          onPlay={() => setHasStartedPlayback(true)}
          onError={() => setHasFailed(true)}
        >
          {video.mobileSrc ? (
            <source media="(max-width: 767px)" src={video.mobileSrc} type="video/mp4" />
          ) : null}
          <source src={video.src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

export function EmbeddedVideoPlayer({
  title,
  video,
  externalVideo,
  image,
  imageAlt,
  mediaFit = "cover",
  autoplay = false,
  className,
  sizes = "(min-width: 1024px) 72vw, 100vw",
  priority = false,
  previewMode = false,
}: EmbeddedVideoPlayerProps) {
  const { language } = useSitePreferences();
  const resolvedTitle = resolveLocalizedValue(title, language);
  const resolvedImageAlt = imageAlt
    ? resolveLocalizedValue(imageAlt, language)
    : resolvedTitle;
  const fallbackSrc = image ?? video?.poster ?? externalVideo?.thumbnailSrc;
  const fallbackSrcs = buildFallbackSources(video, externalVideo, image);
  const mediaObjectClass = mediaFit === "contain" ? "object-contain p-6" : "object-cover";
  const mediaKey = [
    video?.videoType,
    video?.videoType === "direct" ? video.src : "",
    video?.videoType === "direct" ? video.mobileSrc ?? "" : "",
    externalVideo?.provider ?? "",
    externalVideo?.videoId ?? "",
    externalVideo?.embedUrl ?? "",
    fallbackSrc ?? "",
    previewMode ? "preview" : "full",
    autoplay ? "autoplay" : "manual",
  ].join("::");

  if (externalVideo) {
    return (
      <ManagedExternalFrame
        key={mediaKey}
        fallbackSrc={fallbackSrc}
        fallbackSrcs={fallbackSrcs}
        resolvedImageAlt={resolvedImageAlt}
        mediaObjectClass={mediaObjectClass}
        className={className}
        priority={priority}
        sizes={sizes}
        iframeTitle={resolveLocalizedValue(externalVideo.label, language)}
        iframeSrc={withPlayerParams(externalVideo, autoplay, previewMode)}
        previewMode={previewMode}
      />
    );
  }

  if (video?.videoType === "direct") {
    if (!isPlayableDirectVideo(video)) {
      if (fallbackSrc || fallbackSrcs.length) {
        return (
          <div className={cn("overflow-hidden", !hasExplicitPositionClass(className) && "relative", className)}>
            <MediaImage
              src={fallbackSrc}
              fallbackSrcs={fallbackSrcs}
              alt={resolvedImageAlt}
              priority={priority}
              sizes={sizes}
              fallbackContent={<FallbackSurface />}
              className={mediaObjectClass}
            />
          </div>
        );
      }

      return (
        <div
          className={cn("overflow-hidden", !hasExplicitPositionClass(className) && "relative", className)}
          aria-label={resolvedTitle}
        >
          <FallbackSurface />
        </div>
      );
    }

    return (
      <ManagedDirectVideo
        key={mediaKey}
        fallbackSrc={fallbackSrc}
        fallbackSrcs={fallbackSrcs}
        resolvedImageAlt={resolvedImageAlt}
        mediaObjectClass={mediaObjectClass}
        className={className}
        priority={priority}
        sizes={sizes}
        video={video}
        image={image}
        autoplay={autoplay}
        previewMode={previewMode}
      />
    );
  }

  if (fallbackSrc || fallbackSrcs.length) {
    return (
      <div className={cn("overflow-hidden", !hasExplicitPositionClass(className) && "relative", className)}>
        <MediaImage
          src={fallbackSrc}
          fallbackSrcs={fallbackSrcs}
          alt={resolvedImageAlt}
          priority={priority}
          sizes={sizes}
          fallbackContent={<FallbackSurface />}
          className={mediaObjectClass}
        />
      </div>
    );
  }

  return (
    <div className={cn(className, "relative overflow-hidden")} aria-label={resolvedTitle}>
      <FallbackSurface />
    </div>
  );
}
