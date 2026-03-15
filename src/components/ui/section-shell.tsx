import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  innerClassName,
  children,
}: SectionShellProps) {
  const isCentered = align === "center";

  return (
    <section id={id} className={cn("section-space", className)}>
      <div className={cn("mx-auto max-w-7xl px-6 lg:px-8", innerClassName)}>
        <div
          className={cn(
            "flex flex-col gap-3",
            isCentered
              ? "mx-auto max-w-3xl items-center text-center"
              : "gap-5 lg:flex-row lg:items-end lg:justify-between",
          )}
        >
          <div className={cn("space-y-2.5", !isCentered && "max-w-3xl")}>
            {eyebrow ? (
              <span className="inline-flex text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/48">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="max-w-4xl text-balance font-display text-[2.1rem] leading-[0.98] text-white sm:text-[2.7rem] lg:text-[3.05rem]">
              {title}
            </h2>
            {description ? (
              <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
                {description}
              </p>
            ) : null}
          </div>
          {!isCentered && action ? <div className="shrink-0 pt-1">{action}</div> : null}
          {isCentered && action ? <div className="pt-1">{action}</div> : null}
        </div>
        {children ? <div className="mt-8 sm:mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
