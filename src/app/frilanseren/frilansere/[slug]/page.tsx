import Link from "next/link";

import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { FREELANCER_EXPERIENCE_OPTIONS, FREELANCER_ROLE_OPTIONS } from "@/lib/frilanseren/constants";
import { getPublicFreelancerBySlug } from "@/lib/frilanseren/market-queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

const roleLabelByValue = new Map(FREELANCER_ROLE_OPTIONS.map((option) => [option.value, option.label]));
const experienceLabelByValue = new Map(FREELANCER_EXPERIENCE_OPTIONS.map((option) => [option.value, option.label]));

function formatRole(value: string) {
  return roleLabelByValue.get(value as (typeof FREELANCER_ROLE_OPTIONS)[number]["value"]) ?? value;
}

function formatRate(value: number | null, unit: string) {
  return value ? `${value.toLocaleString("nb-NO")} kr / ${unit}` : null;
}

export default async function FreelancerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = await getPublicFreelancerBySlug(slug);
  const rates = [formatRate(profile.rate_day, "dag"), formatRate(profile.rate_hour, "time")].filter(Boolean);

  return (
    <MarketplaceShell
      title={profile.full_name}
      description={profile.headline || "Offentlig frilansprofil i Filmlanseren."}
      actions={<ButtonLink href="/frilanseren/frilansere" variant="ghost">Til frilansere</ButtonLink>}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="space-y-6 rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-6">
          <div className="flex flex-wrap gap-5">
            {profile.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.image_url} alt="" className="h-28 w-28 rounded-[1.4rem] object-cover" />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-[1.4rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Bilde
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap gap-2">
                {profile.is_available ? (
                  <span className="rounded-full bg-[#e7f7ee] px-3 py-1 text-xs font-semibold text-[#087443]">
                    Ledig for oppdrag
                  </span>
                ) : null}
                {profile.roles.map((role) => (
                  <span key={role} className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[var(--muted-2)]">
                    {formatRole(role)}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[var(--muted-2)]">
                {[profile.city, profile.region].filter(Boolean).join(", ") || "Norge"}
              </p>
              <p className="text-sm text-[var(--muted-2)]">
                Erfaring: {experienceLabelByValue.get(profile.experience_level) ?? profile.experience_level}
              </p>
            </div>
          </div>

          {profile.bio ? <p className="max-w-3xl text-[1rem] leading-7 text-[var(--muted-2)]">{profile.bio}</p> : null}

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Satser</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">{rates.length ? rates.join(" · ") : "Etter avtale"}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Sertifikater</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">
                {profile.license_tags.length ? profile.license_tags.join(", ") : "Ikke oppgitt"}
              </dd>
            </div>
          </dl>

          {profile.portfolio_links.length || profile.showreel_url ? (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-[-0.035em] text-[color:var(--foreground)]">Portfolio</h2>
              <div className="flex flex-wrap gap-2">
                {profile.showreel_url ? (
                  <Link className="button-base button-size-compact button-ghost" href={profile.showreel_url} target="_blank">
                    <span className="button-label-base">Showreel</span>
                  </Link>
                ) : null}
                {profile.portfolio_links.map((link) => (
                  <Link key={`${link.label}-${link.url}`} className="button-base button-size-compact button-ghost" href={link.url} target="_blank">
                    <span className="button-label-base">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </article>

        <aside className="h-fit rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-5">
          <h2 className="text-xl font-semibold tracking-[-0.035em] text-[color:var(--foreground)]">Kontakt</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-2)]">
            E-post og telefon deles først når kontaktforespørselen er sendt og akseptert.
          </p>
          <ButtonLink className="mt-4" href="/frilanseren/login" variant="ghost">
            Logg inn for kontakt
          </ButtonLink>
        </aside>
      </div>
    </MarketplaceShell>
  );
}
