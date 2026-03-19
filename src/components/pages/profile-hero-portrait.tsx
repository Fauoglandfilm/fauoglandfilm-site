"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type ProfileHeroPortraitProps = {
  src: string;
  alt: string;
  imageClassName: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function ProfileHeroPortrait({
  src,
  alt,
  imageClassName,
  sizes,
  className,
  priority = false,
}: ProfileHeroPortraitProps) {
  return (
    <div className={cn("profile-hero-portrait-frame founder-portrait-panel", className)}>
      <div className="profile-hero-portrait-shell founder-portrait-shell">
        <div className="profile-hero-portrait-backdrop" />
        <div className="profile-hero-portrait-glow" />
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1500}
          priority={priority}
          sizes={sizes}
          className={cn("profile-hero-portrait-image", imageClassName)}
        />
      </div>
    </div>
  );
}
