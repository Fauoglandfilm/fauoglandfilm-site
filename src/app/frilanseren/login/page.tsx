import { AuthCard } from "@/components/frilanseren/auth-card";
import { LoginForm } from "@/components/frilanseren/login-form";
import { buildMetadata } from "@/lib/seo";

type LoginPageProps = {
  searchParams: Promise<{
    message?: string;
    next?: string;
  }>;
};

export const metadata = buildMetadata({
  title: "Logg inn",
  description: "Logg inn på Frilanseren for å se profilen din og status på piloten.",
  path: "/frilanseren/login",
});

export default async function FrilanserenLoginPage({ searchParams }: LoginPageProps) {
  const { message, next } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl">
      <AuthCard
        title="Logg inn på plattformen"
        description="Logg inn for å se profilen din og status på piloten."
      >
        {message ? (
          <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/55 px-4 py-3 text-sm leading-6 text-[color:var(--foreground)]">
            {message}
          </div>
        ) : null}
        <LoginForm nextPath={next} />
      </AuthCard>
    </div>
  );
}
