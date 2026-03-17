"use client";

import Image from "next/image";
import { useState } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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

function withPlayerParams(video: ExternalVideoAsset, autoplay: boolean, previewMode: boolean) {
  const url = new URL(video.embedUrl);

  if (video.provider === "youtube") {
    url.hostname = "www.youtube-nocookie.com";
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("playsinline", "1");
    url.searchParams.set("autoplay", autoplay ? "1" : "0");

    if (previewMode) {
      const videoId = url.pathname.split("/").pop();
      url.searchParams.set("mute", "1");
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
    url.searchParams.set("title", "0");
    url.searchParams.set("byline", "0");
    url.searchParams.set("portrait", "0");
    url.searchParams.set("dnt", "1");

    if (previewMode) {
      url.searchParams.set("background", "1");
      url.searchParams.set("muted", "1");
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

function ManagedExternalFrame({
  fallbackSrc,
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
    <div className={cn("relative overflow-hidden bg-[#05070b]", className)}>
      {fallbackSrc ? (
        <Image
          src={fallbackSrc}
          alt={resolvedImageAlt}
          fill
          priority={priority}
          sizes={sizes}
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
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
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

  return (
    <div className={cn("relative overflow-hidden bg-[#05070b]", className)}>
      {fallbackSrc ? (
        <Image
          src={fallbackSrc}
          alt={resolvedImageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            mediaObjectClass,
            "transition duration-500",
            isReady && !hasFailed ? "opacity-0" : "opacity-100",
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
    return (
      <ManagedDirectVideo
        key={mediaKey}
        fallbackSrc={fallbackSrc}
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

  if (fallbackSrc) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={fallbackSrc}
          alt={resolvedImageAlt}
          fill
          priority={priority}
          sizes={sizes}
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
