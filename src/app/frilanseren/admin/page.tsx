import type { Metadata } from "next";

import { AuthCard } from "@/components/frilanseren/auth-card";
import { ProtectedRouteShell } from "@/components/frilanseren/protected-route-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { hasSupabaseAdminConfig } from "@/lib/env";
import {
  approveEmployerProfileAction,
  approveFreelancerProfileAction,
  approveJobAction,
  hideEmployerProfileAction,
  hideFreelancerProfileAction,
  hideJobAction,
} from "@/lib/frilanseren/market-actions";
import {
  EMPLOYER_ANNUAL_VOLUME_OPTIONS,
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
} from "@/lib/frilanseren/constants";
import {
  listModerationReportsForAdmin,
  listPendingEmployerProfilesForAdmin,
  listPendingFreelancerProfilesForAdmin,
  listPendingJobsForAdmin,
} from "@/lib/frilanseren/market-queries";
import { listRegisteredUsersForAdmin, requireAdminUser } from "@/lib/frilanseren/queries";
import { buildMetadata } from "@/lib/seo";

type ModerationAction = (formData: FormData) => Promise<void> | void;

type PendingFreelancerProfile = {
  user_id: string;
  headline: string | null;
  city: string | null;
  region: string | null;
  roles: string[];
  users_meta?: { full_name?: string | null } | null;
};

type PendingEmployerProfile = {
  user_id: string;
  company_name: string;
  company_description: string | null;
  city: string | null;
  region: string | null;
  production_types: string[];
  users_meta?: { full_name?: string | null } | null;
};

type PendingJob = {
  id: string;
  title: string;
  employer_name: string;
  location: string | null;
  description: string;
  role_tags: string[];
};

type ModerationReport = {
  id: string;
  subject_type: string;
  subject_id: string;
  reason: string;
  status: string;
  created_at: string;
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Registrerte brukere",
    description: "Intern oversikt over registrerte brukere i Frilanseren.",
    path: "/frilanseren/admin",
  }),
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatLabels(values: string[], options: ReadonlyArray<{ value: string; label: string }>) {
  const labelByValue = new Map(options.map((option) => [option.value, option.label]));
  return values.map((value) => labelByValue.get(value) ?? value).join(", ");
}

function formatRole(role: string | null) {
  if (role === "employer") {
    return "Arbeidsgiver";
  }

  if (role === "freelancer") {
    return "Frilanser";
  }

  return "Mangler profil";
}

function formatEmployerVolume(value: string | null) {
  const labelByValue = new Map<string, string>(EMPLOYER_ANNUAL_VOLUME_OPTIONS.map((option) => [option.value, option.label]));
  return value ? (labelByValue.get(value) ?? value) : "—";
}

function formatFreelancerExperience(value: string | null) {
  const labelByValue = new Map<string, string>(FREELANCER_EXPERIENCE_OPTIONS.map((option) => [option.value, option.label]));
  return value ? (labelByValue.get(value) ?? value) : "—";
}

function ModerationButtons({
  idName,
  id,
  approveAction,
  hideAction,
}: {
  idName: string;
  id: string;
  approveAction: ModerationAction;
  hideAction: ModerationAction;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <form action={approveAction}>
        <input type="hidden" name={idName} value={id} />
        <button type="submit" className="button-base button-size-compact button-primary">
          <span className="button-label-base">Godkjenn</span>
        </button>
      </form>
      <form action={hideAction}>
        <input type="hidden" name={idName} value={id} />
        <button type="submit" className="button-base button-size-compact button-ghost">
          <span className="button-label-base">Skjul</span>
        </button>
      </form>
    </div>
  );
}

export default async function FrilanserenAdminPage() {
  await requireAdminUser();

  const [users, pendingFreelancers, pendingEmployers, pendingJobs, moderationReports] = hasSupabaseAdminConfig()
    ? await Promise.all([
        listRegisteredUsersForAdmin(),
        listPendingFreelancerProfilesForAdmin(),
        listPendingEmployerProfilesForAdmin(),
        listPendingJobsForAdmin(),
        listModerationReportsForAdmin(),
      ])
    : [[], [], [], [], []];
  const confirmedCount = users.filter((user) => user.emailConfirmedAt).length;
  const missingProfileCount = users.filter((user) => !user.hasProfileRecord).length;
  const pendingModerationCount = pendingFreelancers.length + pendingEmployers.length + pendingJobs.length;

  return (
    <ProtectedRouteShell
      title="Registrerte brukere"
      description="Intern oversikt over alle som har opprettet konto i Frilanseren, med rolle, bekreftelsesstatus og profilgrunnlag."
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AuthCard title="Totalt registrerte">
          <p className="font-display text-4xl tracking-[-0.06em] text-[color:var(--foreground)]">{users.length}</p>
        </AuthCard>
        <AuthCard title="Bekreftede e-poster">
          <p className="font-display text-4xl tracking-[-0.06em] text-[color:var(--foreground)]">{confirmedCount}</p>
        </AuthCard>
        <AuthCard title="Profiler som mangler data">
          <p className="font-display text-4xl tracking-[-0.06em] text-[color:var(--foreground)]">{missingProfileCount}</p>
        </AuthCard>
        <AuthCard title="Til godkjenning">
          <p className="font-display text-4xl tracking-[-0.06em] text-[color:var(--foreground)]">
            {pendingModerationCount}
          </p>
        </AuthCard>
      </div>

      {!hasSupabaseAdminConfig() ? (
        <AuthCard
          title="Adminoppsett mangler"
          description="Sett `SUPABASE_SERVICE_ROLE_KEY` og eventuelt `FRILANSEREN_ADMIN_EMAILS` i miljøvariablene for å hente registrerte brukere og vise privat bildedata."
          footer={<ButtonLink href="/frilanseren/dashboard">Tilbake til dashboard</ButtonLink>}
        />
      ) : null}

      <AuthCard title="Profiler og jobber til godkjenning">
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Frilansere</h2>
            {(pendingFreelancers as PendingFreelancerProfile[]).length ? (
              (pendingFreelancers as PendingFreelancerProfile[]).map((profile) => (
                <article key={profile.user_id} className="rounded-[1rem] border border-[color:var(--line)] p-4">
                  <h3 className="font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
                    {profile.users_meta?.full_name ?? "Frilanser"}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted-2)]">
                    {profile.headline || profile.roles.join(", ") || "Profil uten overskrift"}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {[profile.city, profile.region].filter(Boolean).join(", ") || "Sted ikke satt"}
                  </p>
                  <ModerationButtons
                    idName="user_id"
                    id={profile.user_id}
                    approveAction={approveFreelancerProfileAction}
                    hideAction={hideFreelancerProfileAction}
                  />
                </article>
              ))
            ) : (
              <p className="text-sm text-[var(--muted-2)]">Ingen frilansprofiler venter.</p>
            )}
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Arbeidsgivere</h2>
            {(pendingEmployers as PendingEmployerProfile[]).length ? (
              (pendingEmployers as PendingEmployerProfile[]).map((profile) => (
                <article key={profile.user_id} className="rounded-[1rem] border border-[color:var(--line)] p-4">
                  <h3 className="font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
                    {profile.company_name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted-2)]">
                    {profile.company_description || profile.production_types.join(", ") || "Arbeidsgiver uten beskrivelse"}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {[profile.city, profile.region].filter(Boolean).join(", ") || "Sted ikke satt"}
                  </p>
                  <ModerationButtons
                    idName="user_id"
                    id={profile.user_id}
                    approveAction={approveEmployerProfileAction}
                    hideAction={hideEmployerProfileAction}
                  />
                </article>
              ))
            ) : (
              <p className="text-sm text-[var(--muted-2)]">Ingen arbeidsgivere venter.</p>
            )}
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Jobber</h2>
            {(pendingJobs as PendingJob[]).length ? (
              (pendingJobs as PendingJob[]).map((job) => (
                <article key={job.id} className="rounded-[1rem] border border-[color:var(--line)] p-4">
                  <h3 className="font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">{job.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted-2)]">{job.employer_name}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--muted-2)]">{job.description}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {[job.location, job.role_tags.join(", ")].filter(Boolean).join(" · ") || "Detaljer ikke satt"}
                  </p>
                  <ModerationButtons
                    idName="job_id"
                    id={job.id}
                    approveAction={approveJobAction}
                    hideAction={hideJobAction}
                  />
                </article>
              ))
            ) : (
              <p className="text-sm text-[var(--muted-2)]">Ingen jobber venter.</p>
            )}
          </section>
        </div>
      </AuthCard>

      <AuthCard title="Moderation reports">
        {(moderationReports as ModerationReport[]).length ? (
          <div className="grid gap-3">
            {(moderationReports as ModerationReport[]).map((report) => (
              <article key={report.id} className="rounded-[1rem] border border-[color:var(--line)] p-4">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  {report.subject_type} · {report.status}
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted-2)]">{report.reason}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {report.subject_id} · {formatDate(report.created_at)}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--muted-2)]">Ingen åpne rapporter.</p>
        )}
      </AuthCard>

      <div className="grid gap-5">
        {users.map((user) => (
          <AuthCard
            key={user.id}
            title={user.fullName ?? user.email ?? "Registrert bruker"}
            description={`${formatRole(user.role)} · Opprettet ${formatDate(user.createdAt)}`}
          >
            <div className="grid gap-5 lg:grid-cols-[8rem_1fr]">
              {user.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  alt={user.imageLabel ?? "Profilbilde"}
                  className="h-28 w-28 rounded-[1.4rem] border border-[color:var(--line)] object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-[1.4rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Ingen fil
                </div>
              )}

              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-[var(--muted)]">E-post</dt>
                  <dd className="mt-1 text-[color:var(--foreground)]">{user.email ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[var(--muted)]">Bekreftet</dt>
                  <dd className="mt-1 text-[color:var(--foreground)]">
                    {user.emailConfirmedAt ? formatDate(user.emailConfirmedAt) : "Ikke bekreftet ennå"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[var(--muted)]">Siste innlogging</dt>
                  <dd className="mt-1 text-[color:var(--foreground)]">{formatDate(user.lastSignInAt)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[var(--muted)]">Profilstatus</dt>
                  <dd className="mt-1 text-[color:var(--foreground)]">
                    {user.hasProfileRecord ? "Profil lagret" : "Auth-bruker uten profilrad"}
                  </dd>
                </div>
                {user.role === "employer" ? (
                  <>
                    <div>
                      <dt className="text-sm font-medium text-[var(--muted)]">Firma</dt>
                      <dd className="mt-1 text-[color:var(--foreground)]">{user.companyName ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[var(--muted)]">Volum</dt>
                      <dd className="mt-1 text-[color:var(--foreground)]">{formatEmployerVolume(user.annualVolume)}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-[var(--muted)]">Produksjonstyper</dt>
                      <dd className="mt-1 text-[color:var(--foreground)]">
                        {user.productionTypes.length
                          ? formatLabels(user.productionTypes, EMPLOYER_PRODUCTION_TYPES)
                          : "—"}
                      </dd>
                    </div>
                  </>
                ) : null}
                {user.role === "freelancer" ? (
                  <>
                    <div>
                      <dt className="text-sm font-medium text-[var(--muted)]">Erfaring</dt>
                      <dd className="mt-1 text-[color:var(--foreground)]">
                        {formatFreelancerExperience(user.experienceLevel)}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-[var(--muted)]">Roller</dt>
                      <dd className="mt-1 text-[color:var(--foreground)]">
                        {user.freelancerRoles.length
                          ? formatLabels(user.freelancerRoles, FREELANCER_ROLE_OPTIONS)
                          : "—"}
                      </dd>
                    </div>
                  </>
                ) : null}
                {user.deletedAt ? (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-[var(--muted)]">Slettemarkering</dt>
                    <dd className="mt-1 text-[#b42318]">{formatDate(user.deletedAt)}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </AuthCard>
        ))}
      </div>
    </ProtectedRouteShell>
  );
}
