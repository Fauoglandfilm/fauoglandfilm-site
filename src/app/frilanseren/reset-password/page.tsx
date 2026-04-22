import { AuthCard } from "@/components/frilanseren/auth-card";
import { ResetPasswordForm } from "@/components/frilanseren/reset-password-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nytt passord",
  description: "Lag et nytt passord for Frilanseren-kontoen din.",
  path: "/frilanseren/reset-password",
});

export default function FrilanserenResetPasswordPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <AuthCard
        title="Lag nytt passord"
        description="Velg et nytt passord for kontoen din."
      >
        <ResetPasswordForm />
      </AuthCard>
    </div>
  );
}
