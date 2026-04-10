"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { InstagramEmbed } from "./instagram-embed";
import { MediaImage } from "./media-image";

const GLOBAL_MEDIA_FALLBACKS = [
  "/assets/visuals/cinematic/cinematic-video-camera-closeup.webp",
  "/assets/visuals/section-images/section-film-studio-cyclorama.webp",
] as const;

type EmbeddedVideoPlayerProps = {
  title: string | LocalizedText;
  video?: VideoAsset;
  externalVideo?: ExternalVideoAsset;
  image?: string;
  imageAlt?: string | LocalizedText;
  mediaFit?: "cover" | "contain";
  mediaObjectClassName?: string;
  autoplay?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  previewMode?: boolean;
  showControls?: boolean;
  disableMobileSource?: boolean;
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
  showControls: boolean;
  disableMobileSource: boolean;
};

function hasExplicitPositionClass(value?: string) {
  return Boolean(value && /\b(relative|absolute|fixed|sticky)\b/.test(value));
}

function withPlayerParams(video: ExternalVideoAsset, autoplay: boolean, previewMode: boolean) {
  const url = new URL(video.embedUrl);
  const shouldAutoplay = autoplay || previewMode;

  if (video.provider === "youtube") {
    url.hostname = "www.youtube-nocookie.com";
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("playsinline", "1");
    url.searchParams.set("autoplay", shouldAutoplay ? "1" : "0");
    url.searchParams.set("mute", shouldAutoplay ? "1" : "0");

    if (shouldAutoplay) {
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
    url.searchParams.set("autoplay", shouldAutoplay ? "1" : "0");
    url.searchParams.set("muted", shouldAutoplay ? "1" : "0");
    url.searchParams.set("title", "0");
    url.searchParams.set("byline", "0");
    url.searchParams.set("portrait", "0");
    url.searchParams.set("dnt", "1");

    if (shouldAutoplay) {
      url.searchParams.set("background", "1");
      url.searchParams.set("loop", "1");
      url.searchParams.set("autopause", "0");
    }
  }

  if (video.provider === "tiktok") {
    url.searchParams.set("controls", "1");
    url.searchParams.set("description", "0");
    if (!shouldAutoplay) {
      url.searchParams.set("autoplay", "0");
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

function prepareInlineMutedVideo(node: HTMLVideoElement, prioritizeFetch = false) {
  node.defaultMuted = true;
  node.muted = true;
  node.playsInline = true;
  node.autoplay = true;
  node.loop = true;
  node.setAttribute("muted", "");
  node.setAttribute("playsinline", "");
  node.setAttribute("webkit-playsinline", "");

  if (prioritizeFetch) {
    node.removeAttribute("fetchpriority");
  }
}

function attemptInlineAutoplay(node: HTMLVideoElement) {
  prepareInlineMutedVideo(node, true);

  void node.play().catch(() => undefined);
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
            "z-[1] transition duration-500",
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
            "absolute inset-0 z-0 h-full w-full transition duration-500",
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
  showControls,
  disableMobileSource,
}: ManagedDirectVideoProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const retryTimeoutsRef = useRef<number[]>([]);
  const shouldAutoplay = autoplay || previewMode;
  const controlsEnabled = !shouldAutoplay && showControls;
  const posterVisible = hasFailed || !hasStartedPlayback;
  const primeAutoplay = useCallback(
    () => {
      const node = videoRef.current;

      if (!node || !shouldAutoplay || hasFailed || hasStartedPlayback) {
        return;
      }

      attemptInlineAutoplay(node);
    },
    [hasFailed, hasStartedPlayback, shouldAutoplay],
  );

  useEffect(() => {
    return () => {
      retryTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      retryTimeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!shouldAutoplay || hasFailed || hasStartedPlayback) {
      return;
    }

    primeAutoplay();

    const animationFrameId = window.requestAnimationFrame(() => {
      primeAutoplay();
    });

    const retryDelays = previewMode ? [100, 260, 520, 960] : [160, 420];

    retryTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    retryTimeoutsRef.current = retryDelays.map((delay) =>
      window.setTimeout(() => {
        primeAutoplay();
      }, delay),
    );

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      retryTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      retryTimeoutsRef.current = [];
    };
  }, [hasFailed, hasStartedPlayback, previewMode, primeAutoplay, shouldAutoplay]);

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
            "pointer-events-none z-[1] transition duration-500",
            posterVisible ? "opacity-100" : "opacity-0",
          )}
        />
      ) : (
        <FallbackSurface />
      )}

      {!hasFailed ? (
        <video
          ref={videoRef}
          className={cn(
            "video-preview-surface absolute inset-0 z-0 h-full w-full transition duration-500",
            mediaObjectClass,
            hasFailed ? "opacity-0" : "opacity-100",
          )}
          controls={controlsEnabled}
          controlsList="nodownload noplaybackrate nofullscreen"
          playsInline
          preload={priority && !previewMode ? "metadata" : "none"}
          autoPlay={shouldAutoplay}
          muted
          loop
          poster={video.poster ?? image}
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={(event) => {
            const node = event.currentTarget;

            prepareInlineMutedVideo(node, shouldAutoplay);
            primeAutoplay();
          }}
          onLoadedData={() => {
            primeAutoplay();
          }}
          onCanPlay={(event) => {
            if (shouldAutoplay) {
              prepareInlineMutedVideo(event.currentTarget, true);
              primeAutoplay();
            }
          }}
          onPlay={() => setHasStartedPlayback(true)}
          onPlaying={() => setHasStartedPlayback(true)}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime > 0) {
              setHasStartedPlayback(true);
            }
          }}
          onSuspend={() => {
            if (shouldAutoplay) {
              primeAutoplay();
            }
          }}
          onStalled={() => {
            if (shouldAutoplay) {
              primeAutoplay();
            }
          }}
          onError={() => setHasFailed(true)}
        >
          {video.mobileSrc && !disableMobileSource ? (
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
  mediaObjectClassName,
  autoplay = false,
  className,
  sizes = "(min-width: 1024px) 72vw, 100vw",
  priority = false,
  previewMode = false,
  showControls,
  disableMobileSource = false,
}: EmbeddedVideoPlayerProps) {
  const { language } = useSitePreferences();
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const resolvedTitle = resolveLocalizedValue(title, language);
  const resolvedImageAlt = imageAlt
    ? resolveLocalizedValue(imageAlt, language)
    : resolvedTitle;
  const fallbackSrc = image ?? video?.poster ?? externalVideo?.thumbnailSrc;
  const fallbackSrcs = buildFallbackSources(video, externalVideo, image);
  const mediaObjectClass = cn(mediaFit === "contain" ? "object-contain p-6" : "object-cover", mediaObjectClassName);
  const resolvedShowControls = showControls ?? false;
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
    disableMobileSource ? "primary-only" : "responsive",
  ].join("::");
  const wrapperClassName = cn(
    "overflow-hidden",
    !hasExplicitPositionClass(className) && "relative",
    className,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewport);
      return () => mediaQuery.removeEventListener("change", updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  if (previewMode && isMobileViewport) {
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

  if (externalVideo) {
    if (previewMode) {
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

    if (externalVideo.provider === "instagram") {
      return (
        <div className={wrapperClassName} aria-label={resolvedTitle}>
          <div className="flex h-full w-full items-center justify-center bg-[#05070b] p-3 sm:p-4">
            <InstagramEmbed permalink={externalVideo.sourceUrl} className="max-h-full" />
          </div>
        </div>
      );
    }

    const shouldRenderFrame = true;

    return (
      <div className={wrapperClassName} aria-label={resolvedTitle}>
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
            autoplay || previewMode,
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
      <div className={wrapperClassName} aria-label={resolvedTitle}>
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
          showControls={resolvedShowControls}
          disableMobileSource={disableMobileSource}
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
