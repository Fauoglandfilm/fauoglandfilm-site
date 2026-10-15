import { SalgscoachLoginForm } from "@/components/salgscoach/login-form";
import { safeSalgscoachPath } from "@/lib/salgscoach/access-policy";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function SalgscoachLoginPage({ searchParams }: LoginPageProps) {
  const { error, next } = await searchParams;
  const destination = safeSalgscoachPath(next);

  return (
    <div className="mx-auto max-w-lg py-10">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9aa5ff]">
          Kun godkjente brukere
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.055em]">
          Logg inn
        </h1>
        <p className="mb-7 mt-3 leading-7 text-white/60">
          Se samtaler og coaching på en trygg side. Opptak skjer fortsatt i desktopappen.
        </p>
        {error === "no_access" ? (
          <p className="mb-5 rounded-xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">
            Denne kontoen har ikke tilgang til Salgscoach.
          </p>
        ) : null}
        <SalgscoachLoginForm next={destination} />
      </section>
    </div>
  );
}
