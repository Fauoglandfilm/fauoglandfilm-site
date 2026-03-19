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
                className="flex h-[3rem] min-w-[7.75rem] shrink-0 items-center justify-center sm:h-[3.4rem] sm:min-w-[9rem] lg:h-[3.8rem] lg:min-w-[10.5rem]"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={cn(
                    "h-7 w-auto max-w-[6.75rem] object-contain opacity-100 transition duration-300 sm:h-8 sm:max-w-[7.8rem] lg:h-9 lg:max-w-[9.4rem]",
                    theme === "dark" && "brightness-[1.08] contrast-[1.04]",
                    theme === "light" && logo.invertInLight && "invert brightness-[0.18] contrast-[1.12]",
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
