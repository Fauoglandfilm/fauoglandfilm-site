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
                className="flex h-[6rem] min-w-[13.35rem] shrink-0 items-center justify-center px-2.5 sm:h-[6.9rem] sm:min-w-[15.3rem] sm:px-3 lg:h-[7.65rem] lg:min-w-[16.9rem] lg:px-3.5"
              >
                <Image
                  src={theme === "dark" ? logo.darkSrc ?? logo.src : logo.lightSrc ?? logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="block h-[3.9rem] w-full max-w-[12.6rem] object-contain sm:h-[4.5rem] sm:max-w-[14.1rem] lg:h-[5.05rem] lg:max-w-[15.6rem]"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
