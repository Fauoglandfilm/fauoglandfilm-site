import { EmployerCard } from "@/components/frilanseren/employer-card";
import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { SearchFilterBar } from "@/components/frilanseren/search-filter-bar";
import { listPublicEmployers } from "@/lib/frilanseren/market-queries";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Arbeidsgivere",
  description: "Finn produksjonsselskaper og arbeidsgivere i Filmlanseren.",
  path: "/frilanseren/arbeidsgivere",
});

export default async function EmployersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const employers = await listPublicEmployers({ query: params.q });

  return (
    <MarketplaceShell title="Arbeidsgivere" description="Søk i godkjente, åpne arbeidsgiverprofiler.">
      <SearchFilterBar
        action="/frilanseren/arbeidsgivere"
        query={params.q}
        placeholder="Søk etter selskap, sted eller region"
      />
      {employers.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {employers.map((profile) => (
            <EmployerCard key={profile.user_id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-6 text-[var(--muted-2)]">
          Ingen åpne arbeidsgivere matcher søket ennå.
        </div>
      )}
    </MarketplaceShell>
  );
}
