import Link from "next/link";

import { FREELANCER_ROLE_OPTIONS } from "@/lib/frilanseren/constants";
import type { PublicJob } from "@/lib/frilanseren/market-types";

const roleLabelByValue = new Map(FREELANCER_ROLE_OPTIONS.map((option) => [option.value, option.label]));

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("nb-NO", { dateStyle: "medium" }).format(new Date(`${value}T00:00:00.000Z`));
}

function formatRole(value: string) {
  return roleLabelByValue.get(value as (typeof FREELANCER_ROLE_OPTIONS)[number]["value"]) ?? value;
}

export function JobCard({ job }: { job: PublicJob }) {
  const period = [formatDate(job.starts_on), formatDate(job.ends_on)].filter(Boolean).join(" - ");

  return (
    <article className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-5">
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">{job.employer_name}</p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.035em] text-[color:var(--foreground)]">
            <Link href={`/frilanseren/jobber/${job.slug}`}>{job.title}</Link>
          </h2>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-[var(--muted-2)]">{job.description}</p>
        <dl className="grid gap-2 text-sm text-[var(--muted-2)] sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-[color:var(--foreground)]">Sted</dt>
            <dd>{job.location || "Ikke satt"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[color:var(--foreground)]">Periode</dt>
            <dd>{period || "Ikke satt"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[color:var(--foreground)]">Honorar</dt>
            <dd>{job.compensation_label || "Etter avtale"}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2">
          {job.role_tags.map((role) => (
            <span
              key={role}
              className="rounded-full border border-[color:var(--line)] px-2.5 py-1 text-xs text-[var(--muted-2)]"
            >
              {formatRole(role)}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
