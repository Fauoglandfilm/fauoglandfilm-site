"use client";

import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";
import { parseExternalVideoUrl } from "@/lib/video";

import { EmbeddedVideoPlayer } from "@/components/media/embedded-video-player";

type VideoEmbedProps = {
  title: string | LocalizedText;
  url?: string | null;
  thumbnailSrc?: string | null;
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

export function VideoEmbed({
  url,
  thumbnailSrc,
  externalVideo,
  title,
  autoplay = true,
  ...props
}: VideoEmbedProps) {
  const resolvedExternalVideo =
    externalVideo ??
    parseExternalVideoUrl({
      url,
      label: typeof title === "string" ? { no: title, en: title } : title,
      thumbnailSrc,
    }) ??
    undefined;

  return <EmbeddedVideoPlayer title={title} externalVideo={resolvedExternalVideo} autoplay={autoplay} {...props} />;
}
