import { ButtonLink } from "@/components/ui/button-link";
import { ROLE_OPTIONS } from "@/lib/frilanseren/constants";

import { AuthCard } from "./auth-card";

export function RoleSelector() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {ROLE_OPTIONS.map((option) => (
        <AuthCard key={option.value} title={option.label} description={option.description}>
          <ButtonLink href={`/frilanseren/register?role=${option.value}`} className="w-full justify-center">
            {option.value === "employer" ? "Opprett arbeidsgiverkonto" : "Opprett frilanskonto"}
          </ButtonLink>
        </AuthCard>
      ))}
    </div>
  );
}
