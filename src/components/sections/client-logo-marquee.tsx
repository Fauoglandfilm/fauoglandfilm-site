import Image from "next/image";
import type { CSSProperties } from "react";

import type { ClientLogo } from "@/data/site-content";

type ClientLogoMarqueeProps = {
  logos: ClientLogo[];
  durationSeconds?: number;
};

export function ClientLogoMarquee({
  logos,
  durationSeconds = 42,
}: ClientLogoMarqueeProps) {
  const marqueeStyle = {
    "--logo-marquee-duration": `${durationSeconds}s`,
  } as CSSProperties;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-[linear-gradient(90deg,var(--logo-strip-bg)_0%,color-mix(in_srgb,var(--logo-strip-bg)_94%,transparent)_58%,transparent_100%)] sm:w-20 lg:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-[linear-gradient(270deg,var(--logo-strip-bg)_0%,color-mix(in_srgb,var(--logo-strip-bg)_94%,transparent)_58%,transparent_100%)] sm:w-20 lg:w-28" />

      <div className="logo-marquee-track" style={marqueeStyle}>
        {[0, 1].map((copyIndex) => (
          <ul
            key={copyIndex}
            className="logo-marquee-group"
            aria-hidden={copyIndex === 1}
          >
            {logos.map((logo) => (
              <li
                key={`${copyIndex}-${logo.name}`}
                className="group/logo flex h-[4.25rem] shrink-0 items-center justify-center px-7 sm:h-[4.85rem] sm:px-10 lg:h-[5.4rem] lg:px-12"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-10 w-auto max-w-none object-contain opacity-100 brightness-100 saturate-[1.08] transition duration-300 group-hover/logo:saturate-[1.18] sm:h-11 lg:h-12"
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
