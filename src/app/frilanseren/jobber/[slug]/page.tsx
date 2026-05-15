import Link from "next/link";

import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { FREELANCER_ROLE_OPTIONS } from "@/lib/frilanseren/constants";
import { getPublicJobBySlug } from "@/lib/frilanseren/market-queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

const roleLabelByValue = new Map(FREELANCER_ROLE_OPTIONS.map((option) => [option.value, option.label]));

function formatDate(value: string | null) {
  if (!value) {
    return "Ikke satt";
  }

  return new Intl.DateTimeFormat("nb-NO", { dateStyle: "medium" }).format(new Date(`${value}T00:00:00.000Z`));
}

function formatRole(value: string) {
  return roleLabelByValue.get(value as (typeof FREELANCER_ROLE_OPTIONS)[number]["value"]) ?? value;
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);

  return (
    <MarketplaceShell
      title={job.title}
      description={`${job.employer_name} søker filmarbeidere${job.location ? ` i ${job.location}` : ""}.`}
      actions={<ButtonLink href="/frilanseren/jobber" variant="ghost">Til jobber</ButtonLink>}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="space-y-6 rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-6">
          <div className="flex flex-wrap gap-2">
            {job.role_tags.map((role) => (
              <span key={role} className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[var(--muted-2)]">
                {formatRole(role)}
              </span>
            ))}
          </div>

          <p className="whitespace-pre-line text-[1rem] leading-7 text-[var(--muted-2)]">{job.description}</p>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Arbeidsgiver</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">
                {job.employer_slug ? (
                  <Link href={`/frilanseren/arbeidsgivere/${job.employer_slug}`} className="underline underline-offset-4">
                    {job.employer_name}
                  </Link>
                ) : (
                  job.employer_name
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Sted</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">{[job.location, job.region].filter(Boolean).join(", ") || "Ikke satt"}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Periode</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">
                {formatDate(job.starts_on)} - {formatDate(job.ends_on)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Søknadsfrist</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">{formatDate(job.application_deadline)}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Honorar</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">{job.compensation_label || "Etter avtale"}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[color:var(--foreground)]">Sats</dt>
              <dd className="mt-1 text-sm text-[var(--muted-2)]">
                {job.rate_amount && job.rate_unit ? `${job.rate_amount.toLocaleString("nb-NO")} kr / ${job.rate_unit}` : "Ikke satt"}
              </dd>
            </div>
          </dl>
        </article>

        <aside className="h-fit rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-5">
          <h2 className="text-xl font-semibold tracking-[-0.035em] text-[color:var(--foreground)]">Meld interesse</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-2)]">
            Frilansere kan melde interesse etter innlogging. Arbeidsgiver får ikke e-post eller telefon før kontakt er akseptert.
          </p>
          <ButtonLink className="mt-4" href="/frilanseren/login" variant="ghost">
            Logg inn for å melde interesse
          </ButtonLink>
        </aside>
      </div>
    </MarketplaceShell>
  );
}
