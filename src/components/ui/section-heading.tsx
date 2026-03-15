import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "mx-auto max-w-3xl items-center text-center",
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#c9b071]">
          <span className="h-px w-8 bg-[#c9b071]/70" />
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-3">
        <h2 className="max-w-4xl text-balance font-display text-4xl leading-none text-white sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-base leading-7 text-[#c7cedc] sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
