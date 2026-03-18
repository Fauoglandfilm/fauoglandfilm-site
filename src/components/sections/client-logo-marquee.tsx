import Image from "next/image";
import type { CSSProperties } from "react";

import type { ClientLogo } from "@/data/site-content";

type ClientLogoMarqueeProps = {
  logos: ClientLogo[];
  durationSeconds?: number;
};

export function ClientLogoMarquee({
  logos,
  durationSeconds = 34,
}: ClientLogoMarqueeProps) {
  const marqueeStyle = {
    "--logo-marquee-duration": `${durationSeconds}s`,
  } as CSSProperties;

  return (
    <>
      <div className="overflow-x-auto pb-1 sm:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex min-w-max items-center gap-3 pr-4">
          {logos.map((logo) => (
            <li
              key={logo.name}
              className="flex h-[4rem] min-w-[8.75rem] items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-5 shadow-[0_12px_32px_rgba(18,14,10,0.06)]"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto max-w-none object-contain opacity-90"
                style={{
                  transform: `scale(${logo.scale ?? 1})`,
                  transformOrigin: "center center",
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="relative hidden overflow-hidden sm:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_srgb,var(--background)_86%,transparent)_56%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,var(--background)_0%,color-mix(in_srgb,var(--background)_86%,transparent)_56%,transparent_100%)]" />
        <div className="logo-marquee-track" style={marqueeStyle}>
          {[0, 1].map((copyIndex) => (
            <ul key={copyIndex} className="logo-marquee-group" aria-hidden={copyIndex === 1}>
              {logos.map((logo) => (
                <li
                  key={`${copyIndex}-${logo.name}`}
                  className="flex h-[4.2rem] shrink-0 items-center justify-center px-6"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="h-8 w-auto max-w-none object-contain opacity-90"
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
    </>
  );
}
