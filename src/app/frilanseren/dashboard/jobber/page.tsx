import Link from "next/link";

import { AuthCard } from "@/components/frilanseren/auth-card";
import { JobForm } from "@/components/frilanseren/job-form";
import { ProtectedRouteShell } from "@/components/frilanseren/protected-route-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { createServerComponentClient } from "@/lib/supabase/serverClient";
import { requireCurrentUserContext } from "@/lib/frilanseren/queries";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<{ created?: string }>;
};

type JobRow = {
  id: string;
  title: string;
  slug: string;
  status: string;
  is_public: boolean;
  moderation_status: string;
  created_at: string;
  job_roles?: Array<{ role_tag: string }> | null;
};

export const metadata = buildMetadata({
  title: "Mine jobber",
  description: "Legg ut og følg opp jobber i Filmlanseren.",
  path: "/frilanseren/dashboard/jobber",
});

export default async function DashboardJobsPage({ searchParams }: PageProps) {
  const { created } = await searchParams;
  const context = await requireCurrentUserContext();

  if (context.userMeta?.role !== "employer") {
    return (
      <ProtectedRouteShell
        title="Mine jobber"
        description="Denne siden er for arbeidsgivere som legger ut oppdrag."
      >
        <AuthCard
          title="Arbeidsgiverkonto kreves"
          description="Bytt til en arbeidsgiverkonto for å opprette og administrere jobber."
          footer={<ButtonLink href="/frilanseren/dashboard">Til dashboard</ButtonLink>}
        />
      </ProtectedRouteShell>
    );
  }

  const supabase = await createServerComponentClient();
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("id, title, slug, status, is_public, moderation_status, created_at, job_roles(role_tag)")
    .eq("employer_user_id", context.userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (
    <ProtectedRouteShell
      title="Mine jobber"
      description="Legg ut oppdrag, se status og følg opp interesse fra frilansere."
    >
      {created ? (
        <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/55 px-4 py-3 text-sm text-[color:var(--foreground)]">
          Jobben er lagret og ligger klar for moderering.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <AuthCard title="Legg ut jobb" description="Jobber blir synlige etter admin-godkjenning.">
          <JobForm />
        </AuthCard>

        <AuthCard title="Publiserte og utkast">
          {(jobs as JobRow[] | null)?.length ? (
            <div className="space-y-3">
              {(jobs as JobRow[]).map((job) => (
                <article key={job.id} className="rounded-[1rem] border border-[color:var(--line)] p-4">
                  <h2 className="font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
                    <Link href={`/frilanseren/jobber/${job.slug}`}>{job.title}</Link>
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted-2)]">
                    {job.status} · {job.moderation_status} · {job.is_public ? "offentlig" : "utkast"}
                  </p>
                  {job.job_roles?.length ? (
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      Roller: {job.job_roles.map((role) => role.role_tag).join(", ")}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-[var(--muted-2)]">Ingen jobber er opprettet ennå.</p>
          )}
        </AuthCard>
      </div>
    </ProtectedRouteShell>
  );
}
