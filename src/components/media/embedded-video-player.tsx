"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";

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
  showControls?: boolean;
};

type ManagedFrameProps = {
  fallbackSrc?: string;
  fallbackSrcs: string[];
  resolvedImageAlt: string;
  mediaObjectClass: string;
  priority: boolean;
  sizes: string;
  iframeTitle: string;
  iframeSrc: string;
  shouldRenderFrame: boolean;
  previewMode: boolean;
};

type ManagedDirectVideoProps = {
  fallbackSrc?: string;
  fallbackSrcs: string[];
  resolvedImageAlt: string;
  mediaObjectClass: string;
  priority: boolean;
  sizes: string;
  video: Extract<VideoAsset, { videoType: "direct" }>;
  image?: string;
  autoplay: boolean;
  previewMode: boolean;
  shouldLoadMedia: boolean;
  shouldActivatePlayback: boolean;
  showControls: boolean;
};

function triggerManagedVideoPlayback(
  node: HTMLVideoElement,
  retryTimeoutRef: MutableRefObject<number | null>,
  retryOnFailure = true,
) {
  node.defaultMuted = true;
  node.muted = true;
  node.playsInline = true;
  node.setAttribute("muted", "");
  node.setAttribute("playsinline", "");

  const playPromise = node.play();

  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      if (!retryOnFailure) {
        return;
      }

      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
      }

      retryTimeoutRef.current = window.setTimeout(() => {
        retryTimeoutRef.current = null;
        node
          .play()
          .then(() => undefined)
          .catch(() => undefined);
      }, 160);
    });
  }
}

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

function useSmartMediaState({
  autoplay,
  previewMode,
  priority,
}: {
  autoplay: boolean;
  previewMode: boolean;
  priority: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(previewMode || priority);
  const [isInViewport, setIsInViewport] = useState(previewMode || priority);

  useEffect(() => {
    if (previewMode || priority) {
      return;
    }

    const node = containerRef.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => {
        setIsNearViewport(true);
        setIsInViewport(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      {
        threshold: 0.01,
        rootMargin: "320px 0px",
      },
    );

    nearObserver.observe(node);

    let playObserver: IntersectionObserver | null = null;

    if (autoplay) {
      playObserver = new IntersectionObserver(
        ([entry]) => {
          setIsInViewport(entry.isIntersecting && entry.intersectionRatio >= 0.35);
        },
        {
          threshold: [0, 0.35, 0.6],
        },
      );

      playObserver.observe(node);
    }

    return () => {
      nearObserver.disconnect();
      playObserver?.disconnect();
    };
  }, [autoplay, previewMode, priority]);

  return {
    containerRef,
    shouldLoadMedia: previewMode || priority || isNearViewport,
    shouldActivatePlayback: previewMode || (autoplay && isInViewport),
  };
}

function ManagedExternalFrame({
  fallbackSrc,
  fallbackSrcs,
  resolvedImageAlt,
  mediaObjectClass,
  priority,
  sizes,
  iframeTitle,
  iframeSrc,
  shouldRenderFrame,
  previewMode,
}: ManagedFrameProps) {
  const [isReady, setIsReady] = useState(false);
  const readyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (readyTimerRef.current) {
        window.clearTimeout(readyTimerRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    if (!previewMode) {
      setIsReady(true);
      return;
    }

    if (readyTimerRef.current) {
      window.clearTimeout(readyTimerRef.current);
    }

    readyTimerRef.current = window.setTimeout(() => {
      setIsReady(true);
      readyTimerRef.current = null;
    }, 900);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#05070b]">
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
            "transition duration-500",
            isReady && shouldRenderFrame ? "opacity-0" : "opacity-100",
          )}
        />
      ) : (
        <FallbackSurface />
      )}

      {shouldRenderFrame ? (
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
          onLoad={handleLoad}
        />
      ) : null}
    </div>
  );
}

function ManagedDirectVideo({
  fallbackSrc,
  fallbackSrcs,
  resolvedImageAlt,
  mediaObjectClass,
  priority,
  sizes,
  video,
  image,
  autoplay,
  previewMode,
  shouldLoadMedia,
  shouldActivatePlayback,
  showControls,
}: ManagedDirectVideoProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasLoadedMetadata, setHasLoadedMetadata] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const shouldHoldPosterUntilPlay = showControls;
  const hasConfirmedVideoSurface = hasLoadedMetadata || isReady || hasStartedPlayback;
  const posterVisible = hasFailed
    ? true
    : shouldHoldPosterUntilPlay
      ? !hasStartedPlayback
      : !hasConfirmedVideoSurface;
  const preloadMode = autoplay && !previewMode ? "auto" : "metadata";

  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadMedia || hasFailed) {
      return;
    }

    const node = videoRef.current;

    if (!node || (!autoplay && !previewMode)) {
      return;
    }

    if (shouldActivatePlayback) {
      triggerManagedVideoPlayback(node, retryTimeoutRef);
      return;
    }

    if (retryTimeoutRef.current) {
      window.clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    node.pause();
  }, [autoplay, hasFailed, previewMode, shouldActivatePlayback, shouldLoadMedia]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#05070b]">
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

      {!hasFailed && shouldLoadMedia ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full transition duration-500",
            mediaObjectClass,
            hasConfirmedVideoSurface ? "opacity-100" : "opacity-0",
          )}
          controls={showControls}
          playsInline
          preload={preloadMode}
          autoPlay={autoplay || previewMode}
          muted={autoplay || previewMode}
          loop={previewMode || autoplay}
          poster={video.poster ?? image}
          onLoadedData={() => setIsReady(true)}
          onLoadedMetadata={() => {
            setHasLoadedMetadata(true);
            const node = videoRef.current;

            if (!node) {
              return;
            }

            node.defaultMuted = autoplay || previewMode;
            node.muted = autoplay || previewMode;
            node.playsInline = true;
            node.setAttribute("playsinline", "");

            if (autoplay || previewMode) {
              node.setAttribute("muted", "");
            }

            if ((autoplay || previewMode) && shouldActivatePlayback) {
              triggerManagedVideoPlayback(node, retryTimeoutRef, false);
            }
          }}
          onCanPlay={() => {
            setIsReady(true);

            if ((autoplay || previewMode) && shouldActivatePlayback && videoRef.current) {
              triggerManagedVideoPlayback(videoRef.current, retryTimeoutRef, false);
            }
          }}
          onPlay={() => setHasStartedPlayback(true)}
          onPlaying={() => setHasStartedPlayback(true)}
          onTimeUpdate={() => {
            if (videoRef.current && videoRef.current.currentTime > 0) {
              setHasStartedPlayback(true);
            }
          }}
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
  showControls,
}: EmbeddedVideoPlayerProps) {
  const { language } = useSitePreferences();
  const resolvedTitle = resolveLocalizedValue(title, language);
  const resolvedImageAlt = imageAlt
    ? resolveLocalizedValue(imageAlt, language)
    : resolvedTitle;
  const fallbackSrc = image ?? video?.poster ?? externalVideo?.thumbnailSrc;
  const fallbackSrcs = buildFallbackSources(video, externalVideo, image);
  const mediaObjectClass = mediaFit === "contain" ? "object-contain p-6" : "object-cover";
  const { containerRef, shouldLoadMedia, shouldActivatePlayback } = useSmartMediaState({
    autoplay,
    previewMode,
    priority,
  });
  const resolvedShowControls = showControls ?? (!previewMode && !autoplay);
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
  const wrapperClassName = cn(
    "overflow-hidden",
    !hasExplicitPositionClass(className) && "relative",
    className,
  );

  if (externalVideo) {
    const shouldRenderFrame = previewMode ? true : autoplay ? shouldActivatePlayback : shouldLoadMedia;

    return (
      <div ref={containerRef} className={wrapperClassName} aria-label={resolvedTitle}>
        <ManagedExternalFrame
          key={`${mediaKey}::${shouldRenderFrame ? "active" : "idle"}`}
          fallbackSrc={fallbackSrc}
          fallbackSrcs={fallbackSrcs}
          resolvedImageAlt={resolvedImageAlt}
          mediaObjectClass={mediaObjectClass}
          priority={priority}
          sizes={sizes}
          iframeTitle={resolveLocalizedValue(externalVideo.label, language)}
          iframeSrc={withPlayerParams(
            externalVideo,
            shouldRenderFrame && (autoplay || previewMode),
            previewMode,
          )}
          shouldRenderFrame={shouldRenderFrame}
          previewMode={previewMode}
        />
      </div>
    );
  }

  if (video?.videoType === "direct") {
    if (!isPlayableDirectVideo(video)) {
      if (fallbackSrc || fallbackSrcs.length) {
        return (
          <div className={wrapperClassName} aria-label={resolvedTitle}>
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
        <div className={wrapperClassName} aria-label={resolvedTitle}>
          <FallbackSurface />
        </div>
      );
    }

    return (
      <div ref={containerRef} className={wrapperClassName} aria-label={resolvedTitle}>
        <ManagedDirectVideo
          key={mediaKey}
          fallbackSrc={fallbackSrc}
          fallbackSrcs={fallbackSrcs}
          resolvedImageAlt={resolvedImageAlt}
          mediaObjectClass={mediaObjectClass}
          priority={priority}
          sizes={sizes}
          video={video}
          image={image}
          autoplay={autoplay}
          previewMode={previewMode}
          shouldLoadMedia={shouldLoadMedia}
          shouldActivatePlayback={shouldActivatePlayback}
          showControls={resolvedShowControls}
        />
      </div>
    );
  }

  if (fallbackSrc || fallbackSrcs.length) {
    return (
      <div className={wrapperClassName} aria-label={resolvedTitle}>
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
    <div className={wrapperClassName} aria-label={resolvedTitle}>
      <FallbackSurface />
    </div>
  );
}
