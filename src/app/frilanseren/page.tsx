import Link from "next/link";

import { RoleSelector } from "@/components/frilanseren/role-selector";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frilanseren",
  description:
    "Pilotplattform for filmfrilansere og arbeidsgivere med trygg innlogging, profiler og GDPR-flyter.",
  path: "/frilanseren",
});

export default function FrilanserenEntryPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="max-w-4xl space-y-4">
        <span className="eyebrow">Pilotplattform</span>
        <h1 className="font-display text-[clamp(2.4rem,6vw,4.3rem)] leading-[0.94] tracking-[-0.06em] text-[color:var(--foreground)]">
          Plattform for filmfrilansere og arbeidsgivere
        </h1>
        <p className="max-w-3xl text-[1.08rem] leading-8 text-[var(--muted-2)]">
          Vi bygger en norsk plattform som matcher filmfrilansere og arbeidsgivere – med kontrakter,
          lønn og personvern ivaretatt fra dag én.
        </p>
        <p className="text-sm font-medium text-[var(--muted)]">
          Første steg er enkelt: vi inviterer inn et utvalg arbeidsgivere og frilansere til pilot.
        </p>
      </section>

      <RoleSelector />

      <div className="text-center text-sm text-[var(--muted-2)]">
        Allerede bruker?{" "}
        <Link href="/frilanseren/login" className="underline underline-offset-4">
          Logg inn
        </Link>
      </div>
    </div>
  );
}
