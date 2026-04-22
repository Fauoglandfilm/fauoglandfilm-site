import type { ReactNode } from "react";
import Link from "next/link";

import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { signOutAction } from "@/lib/supabase/actions";
import { createServerComponentClient } from "@/lib/supabase/serverClient";

async function getOptionalUser() {
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export default async function FrilanserenLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getOptionalUser();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_97%,white),color-mix(in_srgb,var(--surface-muted)_92%,white))] text-[color:var(--foreground)]">
      <header className="border-b border-[color:var(--line)]/80 bg-[color:var(--surface)]/88 backdrop-blur-md">
        <div className="site-container flex min-h-[5rem] items-center justify-between gap-4 py-4">
          <Link href="/frilanseren" className="flex min-w-0 items-center gap-3">
            <div className="w-[8.5rem] shrink-0 sm:w-[9.75rem]">
              <BrandLogo priority className="brightness-[0.18] contrast-[1.22]" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Produktområde
              </p>
              <p className="text-[0.98rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                Frilanseren
              </p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-2">
            <ButtonLink href="/frilanseren" variant="ghost" size="compact">
              Oversikt
            </ButtonLink>
            {user ? (
              <>
                <ButtonLink href="/frilanseren/dashboard" variant="ghost" size="compact">
                  Dashboard
                </ButtonLink>
                <ButtonLink href="/frilanseren/profile" variant="ghost" size="compact">
                  Profil
                </ButtonLink>
                <form action={signOutAction}>
                  <button type="submit" className="button-base button-size-compact button-ghost">
                    <span className="button-label-base">Logg ut</span>
                  </button>
                </form>
              </>
            ) : (
              <>
                <ButtonLink href="/frilanseren/login" variant="ghost" size="compact">
                  Logg inn
                </ButtonLink>
                <ButtonLink href="/frilanseren/register" size="compact">
                  Opprett konto
                </ButtonLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="site-container py-10 sm:py-12 lg:py-16">{children}</main>
    </div>
  );
}
