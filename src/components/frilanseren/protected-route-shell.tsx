import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ProtectedRouteShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function ProtectedRouteShell({
  title,
  description,
  children,
  className,
}: ProtectedRouteShellProps) {
  return (
    <div className={cn("mx-auto max-w-5xl space-y-6", className)}>
      <header className="space-y-3">
        <span className="eyebrow">Frilanseren</span>
        <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[0.96] tracking-[-0.055em] text-[color:var(--foreground)]">
          {title}
        </h1>
        <p className="max-w-3xl text-[1.02rem] leading-7 text-[var(--muted-2)]">{description}</p>
      </header>
      {children}
    </div>
  );
}
