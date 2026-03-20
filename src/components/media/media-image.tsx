"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type MediaImageProps = {
  src?: string | null;
  fallbackSrcs?: Array<string | null | undefined>;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  fallbackContent?: ReactNode;
};

function uniqueSources(values: Array<string | null | undefined>) {
  const seen = new Set<string>();

  return values.filter((value): value is string => {
    if (!value) {
      return false;
    }

    if (seen.has(value)) {
      return false;
    }

    seen.add(value);
    return true;
  });
}

export function MediaImage({
  src,
  fallbackSrcs = [],
  alt,
  className,
  priority = false,
  sizes,
  onLoad,
  fallbackContent,
}: MediaImageProps) {
  const sources = useMemo(() => uniqueSources([src, ...fallbackSrcs]), [fallbackSrcs, src]);
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const activeSrc = sources.find((candidate) => !failedSources.includes(candidate));
  const isLocalAsset = Boolean(activeSrc?.startsWith("/"));

  if (!activeSrc) {
    return fallbackContent ?? null;
  }

  if (isLocalAsset) {
    return (
      <Image
        src={activeSrc}
        alt={alt}
        fill
        quality={100}
        priority={priority}
        sizes={sizes ?? "100vw"}
        placeholder="empty"
        className={cn("absolute inset-0 h-full w-full", className)}
        onLoad={onLoad}
        onError={() => {
          setFailedSources((current) => (current.includes(activeSrc) ? current : [...current, activeSrc]));
        }}
      />
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      className={cn("absolute inset-0 h-full w-full", className)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      sizes={sizes}
      onLoad={onLoad}
      onError={() => {
        setFailedSources((current) => (current.includes(activeSrc) ? current : [...current, activeSrc]));
      }}
    />
  );
}
