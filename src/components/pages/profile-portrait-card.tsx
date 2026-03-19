"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type ProfilePortraitCardProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function ProfilePortraitCard({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority = false,
}: ProfilePortraitCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[18rem] overflow-hidden rounded-[1.6rem] border border-[color:var(--line)]/70 bg-[color:var(--surface)]/92 p-3 shadow-[0_18px_40px_rgba(5,10,20,0.12)] sm:max-w-[20rem] sm:rounded-[1.9rem] sm:p-4",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={1500}
        priority={priority}
        sizes={sizes}
        className={cn(
          "block h-auto w-full rounded-[1.2rem] bg-[color:var(--surface-muted)]",
          imageClassName,
        )}
      />
    </div>
  );
}
