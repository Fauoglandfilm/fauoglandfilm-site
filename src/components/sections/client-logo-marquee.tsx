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
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-[linear-gradient(90deg,#050a13_0%,rgba(5,10,19,0.96)_45%,rgba(5,10,19,0)_100%)] sm:w-14 lg:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[linear-gradient(270deg,#050a13_0%,rgba(5,10,19,0.96)_45%,rgba(5,10,19,0)_100%)] sm:w-14 lg:w-20" />
      <div
        className="logo-marquee-track group-hover:[animation-play-state:paused]"
        style={marqueeStyle}
      >
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            className="logo-marquee-group"
            aria-hidden={copyIndex === 1}
          >
            {logos.map((logo) => (
              <div
                key={`${copyIndex}-${logo.name}`}
                className="flex h-12 w-[7.5rem] shrink-0 items-center justify-center sm:h-14 sm:w-[8.75rem] lg:h-[4.1rem] lg:w-[10.2rem]"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-6 w-auto max-w-full object-contain opacity-78 transition-opacity duration-300 group-hover:opacity-88 sm:h-7 lg:h-8"
                  style={{
                    transform: `scale(${logo.scale ?? 1})`,
                    transformOrigin: "center center",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
