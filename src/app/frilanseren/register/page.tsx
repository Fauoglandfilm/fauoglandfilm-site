import { AuthCard } from "@/components/frilanseren/auth-card";
import { EmployerRegistrationForm } from "@/components/frilanseren/employer-registration-form";
import { FreelancerRegistrationForm } from "@/components/frilanseren/freelancer-registration-form";
import { RoleSelector } from "@/components/frilanseren/role-selector";
import { buildMetadata } from "@/lib/seo";

type RegisterPageProps = {
  searchParams: Promise<{
    role?: string;
  }>;
};

export const metadata = buildMetadata({
  title: "Opprett konto",
  description: "Registrer arbeidsgiverkonto eller frilanskonto i Frilanseren-piloten.",
  path: "/frilanseren/register",
});

export default async function FrilanserenRegisterPage({ searchParams }: RegisterPageProps) {
  const { role } = await searchParams;

  if (role === "employer") {
    return (
      <div className="mx-auto max-w-3xl">
        <AuthCard
          title="Opprett arbeidsgiverkonto"
          description="Fortell oss kort hvem dere er og hva dere produserer, så kobler vi dere på piloten."
        >
          <EmployerRegistrationForm />
        </AuthCard>
      </div>
    );
  }

  if (role === "freelancer") {
    return (
      <div className="mx-auto max-w-3xl">
        <AuthCard
          title="Opprett frilanskonto"
          description="Vi starter i filmbransjen. Registrer deg, så matcher vi deg mot de første pilotoppdragene når vi åpner."
        >
          <FreelancerRegistrationForm />
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <AuthCard
        title="Velg hvilken konto du vil opprette"
        description="Vi inviterer inn arbeidsgivere først, og åpner samtidig for de første frilanserne i piloten."
      />
      <RoleSelector />
    </div>
  );
}
