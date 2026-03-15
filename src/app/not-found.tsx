import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-space">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">404</p>
        <h1 className="mt-4 font-display text-5xl text-[#111111]">Siden ble ikke funnet</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--muted-2)]">
          Innholdet kan ha blitt flyttet eller er ikke laget ennå. Gå tilbake til forsiden eller rett
          til kontaktsiden for å komme videre.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white"
          >
            Til forsiden
          </Link>
          <Link
            href="/kontakt"
            className="rounded-full border border-black/12 bg-white/72 px-5 py-3 text-sm font-semibold text-[#111111]"
          >
            Kontakt oss
          </Link>
        </div>
      </div>
    </main>
  );
}
