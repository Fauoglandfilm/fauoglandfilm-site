"use client";

import Image from "next/image";

type ProfileImageCardProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

export function ProfileImageCard({
  src,
  alt,
  sizes,
  priority = false,
}: ProfileImageCardProps) {
  return (
    <div className="mx-auto w-full max-w-[18rem] rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-3 shadow-[0_14px_34px_rgba(12,18,28,0.08)] sm:max-w-[19rem] sm:px-4 sm:py-4">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={1500}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full rounded-[1.15rem] bg-[color:var(--surface-muted)]"
      />
    </div>
  );
}
