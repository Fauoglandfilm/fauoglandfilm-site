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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-[linear-gradient(90deg,#050a13_0%,rgba(5,10,19,0.96)_45%,rgba(5,10,19,0)_100%)] sm:w-16 lg:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-[linear-gradient(270deg,#050a13_0%,rgba(5,10,19,0.96)_45%,rgba(5,10,19,0)_100%)] sm:w-16 lg:w-24" />
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
                className="flex h-14 w-[8.25rem] shrink-0 items-center justify-center sm:h-16 sm:w-[9.5rem] lg:h-[4.5rem] lg:w-[11rem]"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-7 w-auto max-w-full object-contain opacity-78 transition-opacity duration-300 group-hover:opacity-88 sm:h-8 lg:h-9"
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
