import { JobCard } from "@/components/frilanseren/job-card";
import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { SearchFilterBar } from "@/components/frilanseren/search-filter-bar";
import { FREELANCER_ROLE_OPTIONS } from "@/lib/frilanseren/constants";
import { listPublicJobs } from "@/lib/frilanseren/market-queries";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<{ q?: string; role?: string }>;
};

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Jobber",
  description: "Finn åpne filmoppdrag i Filmlanseren.",
  path: "/frilanseren/jobber",
});

export default async function JobsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const jobs = await listPublicJobs({ query: params.q, role: params.role });

  return (
    <MarketplaceShell title="Jobber" description="Se åpne oppdrag fra godkjente arbeidsgivere.">
      <SearchFilterBar
        action="/frilanseren/jobber"
        query={params.q}
        role={params.role}
        placeholder="Søk etter rolle, produksjon eller sted"
        roleOptions={FREELANCER_ROLE_OPTIONS}
      />
      {jobs.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-6 text-[var(--muted-2)]">
          Ingen åpne jobber matcher søket ennå.
        </div>
      )}
    </MarketplaceShell>
  );
}
