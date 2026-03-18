import Image from "next/image";
import type { CSSProperties } from "react";

import type { ClientLogo } from "@/data/site-content";

type ClientLogoMarqueeProps = {
  logos: ClientLogo[];
  durationSeconds?: number;
};

export function ClientLogoMarquee({
  logos,
  durationSeconds = 48,
}: ClientLogoMarqueeProps) {
  const uniqueLogos = logos.filter(
    (logo, index, list) => list.findIndex((entry) => entry.name === logo.name) === index,
  );
  const marqueeStyle = {
    "--logo-marquee-duration": `${durationSeconds}s`,
  } as CSSProperties;

  return (
    <>
      <div className="overflow-x-auto pb-1 sm:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex min-w-max snap-x snap-mandatory items-center gap-3.5 pr-4">
          {uniqueLogos.map((logo) => (
            <li
              key={logo.name}
              className="flex h-[4.9rem] min-w-[10.25rem] snap-start items-center justify-center rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--surface)]/92 px-5 shadow-[0_16px_34px_rgba(18,14,10,0.06)]"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-9 w-auto max-w-[8.4rem] object-contain opacity-100"
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
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_srgb,var(--background)_88%,transparent)_58%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-[linear-gradient(270deg,var(--background)_0%,color-mix(in_srgb,var(--background)_88%,transparent)_58%,transparent_100%)]" />
        <div className="logo-marquee-track" style={marqueeStyle}>
          {[0, 1].map((copyIndex) => (
            <ul key={copyIndex} className="logo-marquee-group" aria-hidden={copyIndex === 1}>
              {uniqueLogos.map((logo) => (
                <li
                  key={`${copyIndex}-${logo.name}`}
                  className="flex h-[5.4rem] min-w-[12rem] shrink-0 items-center justify-center rounded-[1.45rem] border border-[color:var(--line)] bg-[color:var(--surface)]/9 px-6 shadow-[0_16px_34px_rgba(18,14,10,0.06)] backdrop-blur-sm"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="h-10 w-auto max-w-[9.8rem] object-contain opacity-100"
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
