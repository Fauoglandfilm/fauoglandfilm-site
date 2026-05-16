import Link from "next/link";

import type { PublicEmployerProfile } from "@/lib/frilanseren/market-types";

export function EmployerCard({ profile }: { profile: PublicEmployerProfile }) {
  return (
    <article className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-4">
      <div className="flex gap-4">
        {profile.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.image_url} alt="" className="h-20 w-20 rounded-[1.2rem] object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.2rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Logo
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
            <Link href={`/frilanseren/arbeidsgivere/${profile.slug}`}>{profile.company_name}</Link>
          </h2>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--muted-2)]">
            {profile.company_description || "Produksjonsselskap i Filmlanseren."}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {[profile.city, profile.region].filter(Boolean).join(", ") || "Norge"}
          </p>
        </div>
      </div>
    </article>
  );
}
