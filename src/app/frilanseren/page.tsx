import { EmployerCard } from "@/components/frilanseren/employer-card";
import { FreelancerCard } from "@/components/frilanseren/freelancer-card";
import { JobCard } from "@/components/frilanseren/job-card";
import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { SearchFilterBar } from "@/components/frilanseren/search-filter-bar";
import { ButtonLink } from "@/components/ui/button-link";
import { FREELANCER_ROLE_OPTIONS } from "@/lib/frilanseren/constants";
import { listPublicEmployers, listPublicFreelancers, listPublicJobs } from "@/lib/frilanseren/market-queries";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Filmlanseren",
  description: "Finn filmarbeidere, jobber og produksjonsselskaper i norsk filmbransje.",
  path: "/frilanseren",
});

function EmptyPreview({ children }: { children: string }) {
  return (
    <div className="rounded-[1.4rem] border border-dashed border-[color:var(--line)] bg-[color:var(--surface)]/58 p-6 text-sm text-[var(--muted-2)]">
      {children}
    </div>
  );
}

export default async function FrilanserenEntryPage() {
  const [freelancers, jobs, employers] = await Promise.all([
    listPublicFreelancers({ limit: 6 }),
    listPublicJobs({ limit: 4 }),
    listPublicEmployers({ limit: 4 }),
  ]);

  return (
    <MarketplaceShell
      title="Finn filmfolk, jobber og produksjonsselskaper"
      description="Filmlanseren samler norsk filmbransje i en åpen markedsplass for frilansere, arbeidsgivere og oppdrag."
      actions={
        <>
          <ButtonLink href="/frilanseren/register?role=freelancer">Opprett frilansprofil</ButtonLink>
          <ButtonLink href="/frilanseren/register?role=employer" variant="ghost">
            Legg ut jobb
          </ButtonLink>
        </>
      }
    >
      <SearchFilterBar
        action="/frilanseren/frilansere"
        placeholder="Søk etter fotograf, klipper, produsent..."
        roleOptions={FREELANCER_ROLE_OPTIONS}
      />

      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">Frilansere</h2>
            <p className="text-sm text-[var(--muted-2)]">Profiler som er åpne og godkjent.</p>
          </div>
          <ButtonLink href="/frilanseren/frilansere" variant="ghost" size="compact">
            Se alle
          </ButtonLink>
        </div>
        {freelancers.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {freelancers.map((profile) => (
              <FreelancerCard key={profile.user_id} profile={profile} />
            ))}
          </div>
        ) : (
          <EmptyPreview>Ingen godkjente frilansprofiler er publisert ennå.</EmptyPreview>
        )}
      </section>

      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">Åpne jobber</h2>
            <p className="text-sm text-[var(--muted-2)]">Søk/interesse krever innlogging.</p>
          </div>
          <ButtonLink href="/frilanseren/jobber" variant="ghost" size="compact">
            Se jobber
          </ButtonLink>
        </div>
        {jobs.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyPreview>Ingen åpne jobber er publisert ennå.</EmptyPreview>
        )}
      </section>

      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">Arbeidsgivere</h2>
            <p className="text-sm text-[var(--muted-2)]">Selskaper som er åpne og godkjent.</p>
          </div>
          <ButtonLink href="/frilanseren/arbeidsgivere" variant="ghost" size="compact">
            Se arbeidsgivere
          </ButtonLink>
        </div>
        {employers.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {employers.map((profile) => (
              <EmployerCard key={profile.user_id} profile={profile} />
            ))}
          </div>
        ) : (
          <EmptyPreview>Ingen godkjente arbeidsgivere er publisert ennå.</EmptyPreview>
        )}
      </section>
    </MarketplaceShell>
  );
}
