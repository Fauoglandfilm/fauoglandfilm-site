import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthCardProps = {
  title?: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export function AuthCard({
  title,
  description,
  footer,
  className,
  children,
}: AuthCardProps) {
  return (
    <article
      className={cn(
        "card-surface rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--surface)]/94 p-5 shadow-[0_22px_60px_rgba(18,14,10,0.08)] sm:p-6",
        className,
      )}
    >
      {title || description ? (
        <header className="mb-5 space-y-2">
          {title ? (
            <h2 className="font-display text-[1.5rem] leading-[1.02] tracking-[-0.04em] text-[color:var(--foreground)] sm:text-[1.72rem]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-2xl text-[0.98rem] leading-7 text-[var(--muted-2)]">
              {description}
            </p>
          ) : null}
        </header>
      ) : null}
      <div className="space-y-5">{children}</div>
      {footer ? <div className="mt-5 border-t border-[color:var(--line)] pt-4">{footer}</div> : null}
    </article>
  );
}
