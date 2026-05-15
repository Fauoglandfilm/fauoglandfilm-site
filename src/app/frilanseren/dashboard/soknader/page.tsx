import Link from "next/link";

import { AuthCard } from "@/components/frilanseren/auth-card";
import { ProtectedRouteShell } from "@/components/frilanseren/protected-route-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { createServerComponentClient } from "@/lib/supabase/serverClient";
import { requireCurrentUserContext } from "@/lib/frilanseren/queries";
import { buildMetadata } from "@/lib/seo";

type ApplicationRow = {
  id: string;
  message: string | null;
  status: string;
  created_at: string;
  jobs?: {
    title?: string | null;
    slug?: string | null;
  } | null;
};

export const metadata = buildMetadata({
  title: "Mine søknader",
  description: "Se jobber du har meldt interesse for i Filmlanseren.",
  path: "/frilanseren/dashboard/soknader",
});

export default async function DashboardApplicationsPage() {
  const context = await requireCurrentUserContext();

  if (context.userMeta?.role !== "freelancer") {
    return (
      <ProtectedRouteShell
        title="Mine søknader"
        description="Denne siden er for frilansere som melder interesse for jobber."
      >
        <AuthCard
          title="Frilanskonto kreves"
          description="Bytt til en frilanskonto for å se søknader og interessemarkeringer."
          footer={<ButtonLink href="/frilanseren/dashboard">Til dashboard</ButtonLink>}
        />
      </ProtectedRouteShell>
    );
  }

  const supabase = await createServerComponentClient();
  const { data: applications, error } = await supabase
    .from("job_applications")
    .select("id, message, status, created_at, jobs(title, slug)")
    .eq("freelancer_user_id", context.userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (
    <ProtectedRouteShell
      title="Mine søknader"
      description="Her ser du jobber du har meldt interesse for."
    >
      <AuthCard title="Interessemarkeringer">
        {(applications as ApplicationRow[] | null)?.length ? (
          <div className="space-y-3">
            {(applications as ApplicationRow[]).map((application) => (
              <article key={application.id} className="rounded-[1rem] border border-[color:var(--line)] p-4">
                <h2 className="font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
                  {application.jobs?.slug ? (
                    <Link href={`/frilanseren/jobber/${application.jobs.slug}`}>
                      {application.jobs.title ?? "Jobb"}
                    </Link>
                  ) : (
                    application.jobs?.title ?? "Jobb"
                  )}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted-2)]">Status: {application.status}</p>
                {application.message ? (
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">{application.message}</p>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-[var(--muted-2)]">
            Du har ikke meldt interesse for noen jobber ennå.
          </p>
        )}
      </AuthCard>
    </ProtectedRouteShell>
  );
}
