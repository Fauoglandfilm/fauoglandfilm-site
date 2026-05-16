import Link from "next/link";

import { FREELANCER_ROLE_OPTIONS } from "@/lib/frilanseren/constants";
import type { PublicFreelancerProfile } from "@/lib/frilanseren/market-types";

const roleLabelByValue = new Map(FREELANCER_ROLE_OPTIONS.map((option) => [option.value, option.label]));

function formatRole(value: string) {
  return roleLabelByValue.get(value as (typeof FREELANCER_ROLE_OPTIONS)[number]["value"]) ?? value;
}

export function FreelancerCard({ profile }: { profile: PublicFreelancerProfile }) {
  const roleLabel = profile.roles[0] ? formatRole(profile.roles[0]) : "Filmarbeider";

  return (
    <article className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-4">
      <div className="flex gap-4">
        {profile.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.image_url} alt="" className="h-20 w-20 rounded-[1.2rem] object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.2rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Bilde
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
            <Link href={`/frilanseren/frilansere/${profile.slug}`}>{profile.full_name}</Link>
          </h2>
          <p className="mt-1 text-sm text-[var(--muted-2)]">{profile.headline || roleLabel}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {[profile.city, profile.region].filter(Boolean).join(", ") || "Norge"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.is_available ? (
              <span className="rounded-full bg-[#e7f7ee] px-2.5 py-1 text-xs font-semibold text-[#087443]">
                Ledig for oppdrag
              </span>
            ) : null}
            {profile.roles.slice(0, 3).map((role) => (
              <span
                key={role}
                className="rounded-full border border-[color:var(--line)] px-2.5 py-1 text-xs text-[var(--muted-2)]"
              >
                {formatRole(role)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
