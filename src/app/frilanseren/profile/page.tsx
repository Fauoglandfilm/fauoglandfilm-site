import { AuthCard } from "@/components/frilanseren/auth-card";
import { ProfileForm } from "@/components/frilanseren/profile-form";
import { ProtectedRouteShell } from "@/components/frilanseren/protected-route-shell";
import { requireCurrentUserContext } from "@/lib/frilanseren/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Profil",
  description: "Oppdater profilen din i Frilanseren-piloten.",
  path: "/frilanseren/profile",
});

export default async function FrilanserenProfilePage() {
  const context = await requireCurrentUserContext();

  if (!context.userMeta) {
    return (
      <ProtectedRouteShell
        title="Rediger profilen din"
        description="Vi finner ikke en full profil på deg ennå. Fyll ut feltene under for å komme i gang."
      >
        <AuthCard>
          <ProfileForm role="freelancer" fullName="" email={context.email} imageUrl={context.profileImageUrl} />
        </AuthCard>
      </ProtectedRouteShell>
    );
  }

  return (
    <ProtectedRouteShell
      title="Rediger profilen din"
      description="Oppdater informasjonen din. Endringene lagres for fremtidige piloter."
    >
      <AuthCard>
        <ProfileForm
          role={context.userMeta.role}
          fullName={context.userMeta.full_name}
          email={context.email}
          imageUrl={context.profileImageUrl}
          employerProfile={context.employerProfile}
          freelancerProfile={context.freelancerProfile}
        />
      </AuthCard>
    </ProtectedRouteShell>
  );
}
