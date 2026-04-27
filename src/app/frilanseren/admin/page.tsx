import type { Metadata } from "next";

import { AuthCard } from "@/components/frilanseren/auth-card";
import { ProtectedRouteShell } from "@/components/frilanseren/protected-route-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { hasSupabaseAdminConfig } from "@/lib/env";
import {
  EMPLOYER_ANNUAL_VOLUME_OPTIONS,
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
} from "@/lib/frilanseren/constants";
import { listRegisteredUsersForAdmin, requireAdminUser } from "@/lib/frilanseren/queries";
import { buildMetadata } from "@/lib/seo";

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

export default async function FrilanserenAdminPage() {
  await requireAdminUser();

  const users = hasSupabaseAdminConfig() ? await listRegisteredUsersForAdmin() : [];
  const confirmedCount = users.filter((user) => user.emailConfirmedAt).length;
  const missingProfileCount = users.filter((user) => !user.hasProfileRecord).length;

  return (
    <ProtectedRouteShell
      title="Registrerte brukere"
      description="Intern oversikt over alle som har opprettet konto i Frilanseren, med rolle, bekreftelsesstatus og profilgrunnlag."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <AuthCard title="Totalt registrerte">
          <p className="font-display text-4xl tracking-[-0.06em] text-[color:var(--foreground)]">{users.length}</p>
        </AuthCard>
        <AuthCard title="Bekreftede e-poster">
          <p className="font-display text-4xl tracking-[-0.06em] text-[color:var(--foreground)]">{confirmedCount}</p>
        </AuthCard>
        <AuthCard title="Profiler som mangler data">
          <p className="font-display text-4xl tracking-[-0.06em] text-[color:var(--foreground)]">{missingProfileCount}</p>
        </AuthCard>
      </div>

      {!hasSupabaseAdminConfig() ? (
        <AuthCard
          title="Adminoppsett mangler"
          description="Sett `SUPABASE_SERVICE_ROLE_KEY` og eventuelt `FRILANSEREN_ADMIN_EMAILS` i miljøvariablene for å hente registrerte brukere og vise privat bildedata."
          footer={<ButtonLink href="/frilanseren/dashboard">Tilbake til dashboard</ButtonLink>}
        />
      ) : null}

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
