import type { ExternalVideoAsset } from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";

function sanitizeVideoId(value: string) {
  return value.trim().replace(/^\/+|\/+$/g, "");
}

export function buildYoutubeEmbedUrl(videoId: string) {
  const id = sanitizeVideoId(videoId);
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
}

export function buildYoutubeThumbnail(videoId: string) {
  return `https://i.ytimg.com/vi/${sanitizeVideoId(videoId)}/maxresdefault.jpg`;
}

export function buildYoutubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${sanitizeVideoId(videoId)}`;
}

export function buildVimeoEmbedUrl(videoId: string, hash?: string) {
  const id = sanitizeVideoId(videoId);
  return `https://player.vimeo.com/video/${id}${hash ? `?h=${hash}` : ""}`;
}

export function buildVimeoWatchUrl(videoId: string, hash?: string) {
  const id = sanitizeVideoId(videoId);
  return `https://vimeo.com/${id}${hash ? `/${hash}` : ""}`;
}

export function youtubeAsset(
  videoId: string,
  label: LocalizedText,
  thumbnailSrc?: string,
): ExternalVideoAsset {
  const id = sanitizeVideoId(videoId);

  return {
    provider: "youtube",
    videoType: "youtube",
    videoId: id,
    embedUrl: buildYoutubeEmbedUrl(id),
    thumbnailSrc: thumbnailSrc ?? buildYoutubeThumbnail(id),
    label,
    sourceUrl: buildYoutubeWatchUrl(id),
  };
}

export function vimeoAsset(
  videoId: string,
  label: LocalizedText,
  thumbnailSrc: string,
  hash?: string,
): ExternalVideoAsset {
  const id = sanitizeVideoId(videoId);

  return {
    provider: "vimeo",
    videoType: "vimeo",
    videoId: id,
    embedUrl: buildVimeoEmbedUrl(id, hash),
    thumbnailSrc,
    label,
    sourceUrl: buildVimeoWatchUrl(id, hash),
  };
}

type ParseInput = {
  url?: string | null;
  label: LocalizedText;
  thumbnailSrc?: string | null;
};

export function parseExternalVideoUrl({
  url,
  label,
  thumbnailSrc,
}: ParseInput): ExternalVideoAsset | null {
  if (!url) {
    return null;
  }

  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const hostname = parsed.hostname.replace(/^www\./, "");

  if (
    hostname === "youtube.com" ||
    hostname === "m.youtube.com" ||
    hostname === "youtu.be"
  ) {
    const pathSegments = parsed.pathname.split("/").filter(Boolean);
    const videoId =
      hostname === "youtu.be"
        ? pathSegments[0]
        : parsed.searchParams.get("v") ??
          (pathSegments[0] === "shorts" ? pathSegments[1] : null) ??
          (pathSegments[0] === "embed" ? pathSegments[1] : null);

    if (!videoId) {
      return null;
    }

    return youtubeAsset(videoId, label, thumbnailSrc ?? undefined);
  }

  if (hostname === "vimeo.com" || hostname === "player.vimeo.com") {
    const pathSegments = parsed.pathname.split("/").filter(Boolean);
    const videoId =
      hostname === "player.vimeo.com"
        ? pathSegments[pathSegments.indexOf("video") + 1]
        : pathSegments[0];
    const hash =
      parsed.searchParams.get("h") ??
      (hostname === "vimeo.com" && pathSegments.length > 1 ? pathSegments[1] : undefined);

    if (!videoId) {
      return null;
    }

    return vimeoAsset(
      videoId,
      label,
      thumbnailSrc ??
        "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/6b6e38f0-753f-4fb0-85dc-6ef2fd7974cf/fauoglandfilm-vimeo-fallback.jpg",
      hash ?? undefined,
    );
  }

  return null;
}
