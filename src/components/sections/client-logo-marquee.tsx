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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-[linear-gradient(90deg,#f2eee7_0%,rgba(242,238,231,0.92)_48%,rgba(242,238,231,0)_100%)] sm:w-16 lg:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-[linear-gradient(270deg,#f2eee7_0%,rgba(242,238,231,0.92)_48%,rgba(242,238,231,0)_100%)] sm:w-16 lg:w-24" />
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
                className="flex h-14 w-[8.5rem] shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white/72 px-5 shadow-[0_14px_28px_rgba(15,15,15,0.04)] sm:h-16 sm:w-[9.25rem] lg:h-[4.5rem] lg:w-[10.5rem]"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-6 w-auto max-w-full object-contain opacity-68 grayscale transition duration-300 group-hover:opacity-88 group-hover:grayscale-0 sm:h-7 lg:h-8"
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
