"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import type { ClientLogo } from "@/data/site-content";
import { cn } from "@/lib/utils";

type ClientLogoMarqueeProps = {
  logos: ClientLogo[];
  durationSeconds?: number;
};

export function ClientLogoMarquee({
  logos,
  durationSeconds = 48,
}: ClientLogoMarqueeProps) {
  const { theme } = useSitePreferences();
  const uniqueLogos = logos.filter(
    (logo, index, list) => list.findIndex((entry) => entry.name === logo.name) === index,
  );
  const marqueeStyle = {
    "--logo-marquee-duration": `${durationSeconds}s`,
  } as CSSProperties;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-[linear-gradient(90deg,var(--surface-muted)_0%,color-mix(in_srgb,var(--surface-muted)_70%,transparent)_58%,transparent_100%)] sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-[linear-gradient(270deg,var(--surface-muted)_0%,color-mix(in_srgb,var(--surface-muted)_70%,transparent)_58%,transparent_100%)] sm:w-16" />
      <div className="logo-marquee-track" style={marqueeStyle}>
        {[0, 1].map((copyIndex) => (
          <ul key={copyIndex} className="logo-marquee-group" aria-hidden={copyIndex === 1}>
            {uniqueLogos.map((logo) => (
              <li
                key={`${copyIndex}-${logo.name}`}
                className="flex h-[4.45rem] min-w-[8.25rem] shrink-0 items-center justify-center px-2 sm:h-[5rem] sm:min-w-[9.75rem] sm:px-2.5 lg:h-[5.6rem] lg:min-w-[11.25rem] lg:px-3"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={cn(
                    "h-10 w-auto max-w-[8.35rem] object-contain opacity-100 transition duration-300 sm:h-[4.45rem] sm:max-w-[9.5rem] lg:h-[4.95rem] lg:max-w-[10.8rem]",
                    theme === "dark" && "brightness-[1.08] contrast-[1.04]",
                    theme === "light" && logo.invertInLight && "invert brightness-[0.14] contrast-[1.14]",
                  )}
                  style={{
                    transform: `scale(${logo.scale ?? 1})`,
                    transformOrigin: "center center",
                  }}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
