import Image from "next/image";

import type { ClientLogo } from "@/data/site-content";

type ClientLogoMarqueeProps = {
  logos: ClientLogo[];
  durationSeconds?: number;
};

export function ClientLogoMarquee({
  logos,
}: ClientLogoMarqueeProps) {
  return (
    <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex min-w-max items-center gap-3 pr-4 sm:flex-wrap sm:justify-between sm:gap-4 sm:pr-0">
        {logos.map((logo) => (
          <li
            key={logo.name}
            className="flex h-[4.2rem] min-w-[9rem] items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-5 shadow-[0_12px_32px_rgba(18,14,10,0.06)] sm:min-w-0 sm:flex-1 sm:rounded-[1.25rem] sm:px-6"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="h-8 w-auto max-w-none object-contain opacity-90 sm:h-9"
              style={{
                transform: `scale(${logo.scale ?? 1})`,
                transformOrigin: "center center",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
