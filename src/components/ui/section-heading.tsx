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
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
          <span className="h-px w-8 bg-[var(--accent)]/70" />
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-3">
        <h2 className="section-title max-w-4xl text-[color:var(--foreground)]">
          {title}
        </h2>
        {description ? (
          <p className="body-lead max-w-3xl text-[var(--muted-2)]">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
