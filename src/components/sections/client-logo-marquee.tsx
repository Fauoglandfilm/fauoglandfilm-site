"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import type { ClientLogo } from "@/data/site-content";

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
      <div className="logo-marquee-track" style={marqueeStyle}>
        {[0, 1].map((copyIndex) => (
          <ul key={copyIndex} className="logo-marquee-group" aria-hidden={copyIndex === 1}>
            {uniqueLogos.map((logo) => (
              <li
                key={`${copyIndex}-${logo.name}`}
                className="flex h-[4rem] min-w-[8.9rem] shrink-0 items-center justify-center px-2.5 sm:h-[4.6rem] sm:min-w-[10.2rem] sm:px-3 lg:h-[5.1rem] lg:min-w-[11.25rem] lg:px-3.5"
              >
                <Image
                  src={theme === "dark" ? logo.darkSrc ?? logo.src : logo.lightSrc ?? logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="block h-[2.6rem] w-auto max-w-[8.4rem] object-contain sm:h-[3rem] sm:max-w-[9.4rem] lg:h-[3.35rem] lg:max-w-[10.4rem]"
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
