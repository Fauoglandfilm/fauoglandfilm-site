"use client";

import Image from "next/image";

import { useSitePreferences } from "@/components/providers/site-preferences";
import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";

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
};

function withPlayerParams(video: ExternalVideoAsset, autoplay: boolean) {
  const url = new URL(video.embedUrl);

  if (video.provider === "youtube") {
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("playsinline", "1");
    url.searchParams.set("autoplay", autoplay ? "1" : "0");
  }

  if (video.provider === "vimeo") {
    url.searchParams.set("autoplay", autoplay ? "1" : "0");
    url.searchParams.set("title", "0");
    url.searchParams.set("byline", "0");
    url.searchParams.set("portrait", "0");
    url.searchParams.set("dnt", "1");
  }

  return url.toString();
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
}: EmbeddedVideoPlayerProps) {
  const { language } = useSitePreferences();
  const resolvedTitle = resolveLocalizedValue(title, language);
  const resolvedImageAlt = imageAlt
    ? resolveLocalizedValue(imageAlt, language)
    : resolvedTitle;

  if (externalVideo) {
    return (
      <div className={className}>
        <iframe
          src={withPlayerParams(externalVideo, autoplay)}
          title={resolveLocalizedValue(externalVideo.label, language)}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (video?.videoType === "direct") {
    return (
      <div className={className}>
        <video
          className="h-full w-full"
          controls
          playsInline
          preload="metadata"
          autoPlay={autoplay}
          muted={autoplay}
          poster={video.poster ?? image}
        >
          {video.mobileSrc ? (
            <source media="(max-width: 767px)" src={video.mobileSrc} type="video/mp4" />
          ) : null}
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (image || video?.poster) {
    return (
      <div className={className}>
        <Image
          src={image ?? video?.poster ?? ""}
          alt={resolvedImageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className={mediaFit === "contain" ? "object-contain p-6" : "object-cover"}
        />
      </div>
    );
  }

  return (
    <div
      className={`${className ?? ""} bg-gradient-to-br from-[#ece3d8] via-[#d3c4b1] to-[#b89f82]`}
      aria-label={resolvedTitle}
    />
  );
}
