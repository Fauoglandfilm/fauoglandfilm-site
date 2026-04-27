import { ButtonLink } from "@/components/ui/button-link";
import { AuthCard } from "@/components/frilanseren/auth-card";
import { PrivacyActions } from "@/components/frilanseren/privacy-actions";
import { ProtectedRouteShell } from "@/components/frilanseren/protected-route-shell";
import { requireCurrentUserContext } from "@/lib/frilanseren/queries";
import { PRIVACY_SECTION_COPY } from "@/lib/frilanseren/gdpr";
import {
  FRILANSEREN_ADMIN_PATH,
  EMPLOYER_ANNUAL_VOLUME_OPTIONS,
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
} from "@/lib/frilanseren/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dashboard",
  description: "Se profilen din og status på Frilanseren-piloten.",
  path: "/frilanseren/dashboard",
});

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}

function formatLabels(values: string[], options: ReadonlyArray<{ value: string; label: string }>) {
  const labelByValue = new Map(options.map((option) => [option.value, option.label]));

  return values.map((value) => labelByValue.get(value) ?? value).join(", ");
}

function formatLabel(value: string | null | undefined, options: ReadonlyArray<{ value: string; label: string }>) {
  if (!value) {
    return "—";
  }

  const labelByValue = new Map(options.map((option) => [option.value, option.label]));
  return labelByValue.get(value) ?? value;
}

type FrilanserenDashboardPageProps = {
  searchParams: Promise<{
    message?: string;
    status?: "success" | "error";
  }>;
};

function FeedbackBanner({ message, status }: { message: string; status: "success" | "error" }) {
  return (
    <div
      className={`rounded-[1.4rem] border px-4 py-3 text-sm leading-6 ${
        status === "error"
          ? "border-[#f1b7ae] bg-[#fff5f3] text-[#7a271a]"
          : "border-[color:var(--line)] bg-[color:var(--surface-muted)]/55 text-[color:var(--foreground)]"
      }`}
    >
      {message}
    </div>
  );
}

export default async function FrilanserenDashboardPage({ searchParams }: FrilanserenDashboardPageProps) {
  const { message, status } = await searchParams;
  const context = await requireCurrentUserContext();

  if (!context.userMeta) {
    return (
      <ProtectedRouteShell
        title="Du er med i piloten"
        description="Vi finner ikke en full profil på deg ennå. Fyll ut feltene under for å komme i gang."
      >
        {message ? <FeedbackBanner message={message} status={status === "error" ? "error" : "success"} /> : null}
        <AuthCard>
          <ButtonLink href="/frilanseren/profile">Fullfør profilen</ButtonLink>
        </AuthCard>
      </ProtectedRouteShell>
    );
  }

  const firstName = getFirstName(context.userMeta.full_name);

  if (context.userMeta.role === "employer") {
    return (
      <ProtectedRouteShell
        title={`Hei, ${firstName}. Du er med i piloten.`}
        description="Vi bygger nå første versjon av plattformen. Vi bruker informasjonen du har lagt inn til å forstå behovene i bransjen, og kontakter deg når vi er klare til å teste jobbmatching i praksis."
      >
        {message ? <FeedbackBanner message={message} status={status === "error" ? "error" : "success"} /> : null}
        {context.isAdmin ? (
          <AuthCard
            title="Intern oversikt"
            description="Du har admin-tilgang til å se registrerte brukere, status på kontoer og hvilke profiler som mangler data."
            footer={<ButtonLink href={FRILANSEREN_ADMIN_PATH}>Se registrerte brukere</ButtonLink>}
          />
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <AuthCard
            title="Din profil"
            footer={<ButtonLink href="/frilanseren/profile">Rediger profil</ButtonLink>}
          >
            <div className="grid gap-5 md:grid-cols-[8rem_1fr]">
              {context.profileImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={context.profileImageUrl}
                  alt="Firmalogo"
                  className="h-28 w-28 rounded-[1.4rem] border border-[color:var(--line)] object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-[1.4rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Ingen logo
                </div>
              )}

              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-[var(--muted)]">Navn</dt>
                  <dd className="mt-1 text-[color:var(--foreground)]">{context.userMeta.full_name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[var(--muted)]">Firma</dt>
                  <dd className="mt-1 text-[color:var(--foreground)]">{context.employerProfile?.company_name ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[var(--muted)]">Produksjonstyper</dt>
                  <dd className="mt-1 text-[color:var(--foreground)]">
                    {context.employerProfile?.production_types?.length
                      ? formatLabels(context.employerProfile.production_types, EMPLOYER_PRODUCTION_TYPES)
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-[var(--muted)]">Volum</dt>
                  <dd className="mt-1 text-[color:var(--foreground)]">
                    {formatLabel(context.employerProfile?.annual_volume, EMPLOYER_ANNUAL_VOLUME_OPTIONS)}
                  </dd>
                </div>
              </dl>
            </div>
          </AuthCard>

          <AuthCard title="Hva du kan forvente nå">
            <ol className="grid gap-3 text-[0.98rem] leading-7 text-[var(--muted-2)]">
              <li>1. Vi samler et utvalg arbeidsgivere og frilansere i norsk filmbransje.</li>
              <li>2. Vi tester AI-matching internt før vi åpner for faktiske oppdrag.</li>
              <li>3. Når vi er klare med pilotoppdrag, tar vi direkte kontakt med deg.</li>
            </ol>
          </AuthCard>
        </div>

        <AuthCard title="Personvern" description={PRIVACY_SECTION_COPY}>
          <PrivacyActions />
        </AuthCard>
      </ProtectedRouteShell>
    );
  }

  return (
    <ProtectedRouteShell
      title={`Hei, ${firstName}. Du er med i frilanspiloten.`}
      description="Vi bygger en norsk plattform for filmfrilansere. I denne fasen bruker vi profilen din til å forstå hvilke type oppdrag vi bør hente inn først."
    >
      {message ? <FeedbackBanner message={message} status={status === "error" ? "error" : "success"} /> : null}
      {context.isAdmin ? (
        <AuthCard
          title="Intern oversikt"
          description="Du har admin-tilgang til å se registrerte brukere, status på kontoer og hvilke profiler som mangler data."
          footer={<ButtonLink href={FRILANSEREN_ADMIN_PATH}>Se registrerte brukere</ButtonLink>}
        />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <AuthCard
          title="Din profil"
          footer={<ButtonLink href="/frilanseren/profile">Rediger profil</ButtonLink>}
        >
          <div className="grid gap-5 md:grid-cols-[8rem_1fr]">
            {context.profileImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={context.profileImageUrl}
                alt="Profilbilde"
                className="h-28 w-28 rounded-[1.4rem] border border-[color:var(--line)] object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-[1.4rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Ingen bilde
              </div>
            )}

            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-[var(--muted)]">Navn</dt>
                <dd className="mt-1 text-[color:var(--foreground)]">{context.userMeta.full_name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[var(--muted)]">E-post</dt>
                <dd className="mt-1 text-[color:var(--foreground)]">{context.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[var(--muted)]">Roller</dt>
                <dd className="mt-1 text-[color:var(--foreground)]">
                  {context.freelancerProfile?.roles?.length
                    ? formatLabels(context.freelancerProfile.roles, FREELANCER_ROLE_OPTIONS)
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[var(--muted)]">Erfaring</dt>
                <dd className="mt-1 text-[color:var(--foreground)]">
                  {formatLabel(context.freelancerProfile?.experience_level, FREELANCER_EXPERIENCE_OPTIONS)}
                </dd>
              </div>
            </dl>
          </div>
        </AuthCard>

        <AuthCard title="Hva skjer videre?">
          <ol className="grid gap-3 text-[0.98rem] leading-7 text-[var(--muted-2)]">
            <li>1. Vi bygger første versjon av plattformen bak kulissene.</li>
            <li>2. Vi bruker infoen din til å prioritere hvilke oppdragsgivere vi inviterer inn først.</li>
            <li>3. Når pilotoppdragene er klare, får du beskjed på e-post og inne på plattformen.</li>
          </ol>
        </AuthCard>
      </div>

      <AuthCard title="Personvern" description={PRIVACY_SECTION_COPY}>
        <PrivacyActions />
      </AuthCard>
    </ProtectedRouteShell>
  );
}
