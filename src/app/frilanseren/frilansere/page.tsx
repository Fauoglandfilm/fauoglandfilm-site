import { FreelancerCard } from "@/components/frilanseren/freelancer-card";
import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { SearchFilterBar } from "@/components/frilanseren/search-filter-bar";
import { FREELANCER_ROLE_OPTIONS } from "@/lib/frilanseren/constants";
import { listPublicFreelancers } from "@/lib/frilanseren/market-queries";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<{ q?: string; role?: string }>;
};

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Frilansere",
  description: "Finn filmfrilansere etter rolle, sted og tilgjengelighet.",
  path: "/frilanseren/frilansere",
});

export default async function FreelancersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const freelancers = await listPublicFreelancers({ query: params.q, role: params.role });

  return (
    <MarketplaceShell title="Frilansere" description="Søk i godkjente, åpne profiler fra norsk filmbransje.">
      <SearchFilterBar
        action="/frilanseren/frilansere"
        query={params.q}
        role={params.role}
        placeholder="Søk etter navn, rolle eller sted"
        roleOptions={FREELANCER_ROLE_OPTIONS}
      />
      {freelancers.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {freelancers.map((profile) => (
            <FreelancerCard key={profile.user_id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-6 text-[var(--muted-2)]">
          Ingen åpne profiler matcher søket ennå.
        </div>
      )}
    </MarketplaceShell>
  );
}
