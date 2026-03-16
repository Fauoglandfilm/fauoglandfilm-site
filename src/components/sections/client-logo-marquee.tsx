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
                className="group/logo flex h-16 shrink-0 items-center justify-center px-6 sm:h-[4.5rem] sm:px-8 lg:h-20 lg:px-10"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-8 w-auto max-w-none object-contain opacity-95 brightness-[1.02] saturate-125 drop-shadow-[0_10px_22px_rgba(17,17,17,0.12)] transition duration-300 group-hover/logo:opacity-100 group-hover/logo:saturate-150 sm:h-9 lg:h-10"
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
