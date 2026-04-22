import { AuthCard } from "@/components/frilanseren/auth-card";
import { ForgotPasswordForm } from "@/components/frilanseren/forgot-password-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tilbakestill passord",
  description: "Be om lenke for å lage nytt passord til Frilanseren.",
  path: "/frilanseren/forgot-password",
});

export default function FrilanserenForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <AuthCard
        title="Tilbakestill passord"
        description="Skriv inn e-postadressen din, så sender vi en lenke for å lage nytt passord."
      >
        <ForgotPasswordForm />
      </AuthCard>
    </div>
  );
}
