"use client";

/* eslint-disable @next/next/no-img-element */

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
}: MediaImageProps) {
  const sources = useMemo(() => uniqueSources([src, ...fallbackSrcs]), [fallbackSrcs, src]);
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const activeSrc = sources.find((candidate) => !failedSources.includes(candidate));

  if (!activeSrc) {
    return null;
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
