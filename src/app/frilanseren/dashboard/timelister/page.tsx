import Link from "next/link";

import { AuthCard } from "@/components/frilanseren/auth-card";
import { ProtectedRouteShell } from "@/components/frilanseren/protected-route-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { createServerComponentClient } from "@/lib/supabase/serverClient";
import { requireCurrentUserContext } from "@/lib/frilanseren/queries";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<{ saved?: string }>;
};

type TimesheetRow = {
  id: string;
  project_name: string;
  employer_name: string;
  role_label: string;
  period_start: string | null;
  period_end: string | null;
  status: string;
  total_hours: number;
  total_amount: number;
  created_at: string;
};

export const metadata = buildMetadata({
  title: "Timelister",
  description: "Se lagrede timelister i Filmlanseren.",
  path: "/frilanseren/dashboard/timelister",
});

function formatDate(value: string | null) {
  if (!value) {
    return "Ikke satt";
  }

  return new Intl.DateTimeFormat("nb-NO", { dateStyle: "medium" }).format(new Date(`${value}T00:00:00.000Z`));
}

export default async function DashboardTimesheetsPage({ searchParams }: PageProps) {
  const { saved } = await searchParams;
  const context = await requireCurrentUserContext();
  const supabase = await createServerComponentClient();
  const { data: timesheets, error } = await supabase
    .from("timesheets")
    .select("id, project_name, employer_name, role_label, period_start, period_end, status, total_hours, total_amount, created_at")
    .eq("owner_user_id", context.userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (
    <ProtectedRouteShell
      title="Timelister"
      description="Se lagrede timelister og åpne utskriftsgrunnlag."
    >
      {saved ? (
        <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/55 px-4 py-3 text-sm text-[color:var(--foreground)]">
          Timelisten er lagret.
        </div>
      ) : null}

      <AuthCard title="Lag ny timeliste" footer={<ButtonLink href="/frilanseren/timeliste">Åpne timeliste</ButtonLink>}>
        <p className="text-sm leading-6 text-[var(--muted-2)]">
          Timelister er enkle arbeidsunderlag og er ikke full tariff- eller lønnskjøring.
        </p>
      </AuthCard>

      <AuthCard title="Lagrede timelister">
        {(timesheets as TimesheetRow[] | null)?.length ? (
          <div className="space-y-3">
            {(timesheets as TimesheetRow[]).map((timesheet) => (
              <article key={timesheet.id} className="rounded-[1rem] border border-[color:var(--line)] p-4">
                <h2 className="font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
                  {timesheet.project_name}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted-2)]">
                  {timesheet.employer_name} · {timesheet.role_label}
                </p>
                <dl className="mt-3 grid gap-3 text-sm text-[var(--muted-2)] sm:grid-cols-4">
                  <div>
                    <dt className="font-semibold text-[color:var(--foreground)]">Periode</dt>
                    <dd>
                      {formatDate(timesheet.period_start)} - {formatDate(timesheet.period_end)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[color:var(--foreground)]">Timer</dt>
                    <dd>{Number(timesheet.total_hours).toLocaleString("nb-NO")}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[color:var(--foreground)]">Sum</dt>
                    <dd>{Number(timesheet.total_amount).toLocaleString("nb-NO")} kr</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[color:var(--foreground)]">Status</dt>
                    <dd>{timesheet.status}</dd>
                  </div>
                </dl>
                <Link
                  className="button-base button-size-compact button-ghost mt-4"
                  href={`/frilanseren/dashboard/timelister/${timesheet.id}/pdf`}
                  target="_blank"
                >
                  <span className="button-label-base">Åpne utskrift/PDF</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-[var(--muted-2)]">Ingen timelister er lagret ennå.</p>
        )}
      </AuthCard>
    </ProtectedRouteShell>
  );
}
