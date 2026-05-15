import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { signOutAction } from "@/lib/supabase/actions";
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
      <header className="space-y-4">
        <span className="eyebrow">Frilanseren</span>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[0.96] tracking-[-0.055em] text-[color:var(--foreground)]">
              {title}
            </h1>
            <p className="max-w-3xl text-[1.02rem] leading-7 text-[var(--muted-2)]">{description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <ButtonLink href="/frilanseren/dashboard" variant="ghost" size="compact">
              Dashboard
            </ButtonLink>
            <ButtonLink href="/frilanseren/dashboard/profil" variant="ghost" size="compact">
              Profil
            </ButtonLink>
            <form action={signOutAction}>
              <button type="submit" className="button-base button-size-compact button-ghost">
                <span className="button-label-base">Logg ut</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
