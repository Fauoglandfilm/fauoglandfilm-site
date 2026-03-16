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
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", innerClassName)}>
        <div
          className={cn(
            "flex flex-col gap-3 sm:gap-4",
            isCentered
              ? "mx-auto max-w-3xl items-center text-center"
              : "lg:flex-row lg:items-end lg:justify-between",
          )}
        >
          <div className={cn("space-y-2.5 sm:space-y-3", !isCentered && "max-w-3xl")}>
            {eyebrow ? (
              <span className="eyebrow">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="section-title max-w-4xl text-[color:var(--foreground)]">
              {title}
            </h2>
            {description ? (
              <p className="body-lead max-w-2xl text-[var(--muted-2)]">
                {description}
              </p>
            ) : null}
          </div>
          {!isCentered && action ? <div className="shrink-0 pt-1 max-sm:w-full">{action}</div> : null}
          {isCentered && action ? <div className="pt-1 max-sm:w-full">{action}</div> : null}
        </div>
        {children ? <div className="mt-5 sm:mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
