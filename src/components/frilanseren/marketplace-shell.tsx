import type { ReactNode } from "react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

type MarketplaceShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function MarketplaceShell({
  eyebrow = "Filmlanseren",
  title,
  description,
  actions,
  children,
  className,
}: MarketplaceShellProps) {
  return (
    <div className={cn("mx-auto max-w-7xl space-y-8", className)}>
      <header className="space-y-5">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted-2)]">
          <Link href="/frilanseren" className="font-semibold text-[color:var(--foreground)]">
            Oversikt
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/frilanseren/frilansere">Frilansere</Link>
          <span aria-hidden="true">/</span>
          <Link href="/frilanseren/jobber">Jobber</Link>
          <span aria-hidden="true">/</span>
          <Link href="/frilanseren/arbeidsgivere">Arbeidsgivere</Link>
          <span aria-hidden="true">/</span>
          <Link href="/frilanseren/timeliste">Timeliste</Link>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="space-y-3">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.96] tracking-[-0.055em] text-[color:var(--foreground)]">
              {title}
            </h1>
            <p className="max-w-3xl text-[1.02rem] leading-7 text-[var(--muted-2)]">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {actions ?? (
              <>
                <ButtonLink href="/frilanseren/register?role=freelancer">Opprett frilansprofil</ButtonLink>
                <ButtonLink href="/frilanseren/register?role=employer" variant="ghost">
                  Legg ut jobb
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
