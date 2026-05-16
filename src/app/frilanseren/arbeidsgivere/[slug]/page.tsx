import Link from "next/link";

import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { EMPLOYER_ANNUAL_VOLUME_OPTIONS, EMPLOYER_PRODUCTION_TYPES } from "@/lib/frilanseren/constants";
import { getPublicEmployerBySlug } from "@/lib/frilanseren/market-queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

const productionTypeLabelByValue = new Map(EMPLOYER_PRODUCTION_TYPES.map((option) => [option.value, option.label]));
const annualVolumeLabelByValue = new Map(EMPLOYER_ANNUAL_VOLUME_OPTIONS.map((option) => [option.value, option.label]));

function formatProductionType(value: string) {
  return productionTypeLabelByValue.get(value as (typeof EMPLOYER_PRODUCTION_TYPES)[number]["value"]) ?? value;
}

export default async function EmployerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = await getPublicEmployerBySlug(slug);

  return (
    <MarketplaceShell
      title={profile.company_name}
      description={profile.company_description || "Offentlig arbeidsgiverprofil i Filmlanseren."}
      actions={<ButtonLink href="/frilanseren/arbeidsgivere" variant="ghost">Til arbeidsgivere</ButtonLink>}
    >
      <article className="grid gap-6 rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-6 lg:grid-cols-[9rem_minmax(0,1fr)]">
        {profile.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.image_url} alt="" className="h-28 w-28 rounded-[1.4rem] object-cover" />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-[1.4rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Logo
          </div>
        )}

        <div className="space-y-6">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Kontaktperson</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">{profile.full_name}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Sted</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">
                {[profile.city, profile.region].filter(Boolean).join(", ") || "Norge"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Produksjonstyper</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">
                {profile.production_types.length ? profile.production_types.map(formatProductionType).join(", ") : "Ikke oppgitt"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Årlig volum</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">
                {annualVolumeLabelByValue.get(profile.annual_volume) ?? profile.annual_volume}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2">
            {profile.website_url ? (
              <Link href={profile.website_url} target="_blank" className="button-base button-size-compact button-ghost">
                <span className="button-label-base">Nettside</span>
              </Link>
            ) : null}
            <ButtonLink href={`/frilanseren/jobber?q=${encodeURIComponent(profile.company_name)}`} variant="ghost" size="compact">
              Se åpne jobber
            </ButtonLink>
          </div>
        </div>
      </article>
    </MarketplaceShell>
  );
}
