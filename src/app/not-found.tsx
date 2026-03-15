import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-space">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#c9b071]">404</p>
        <h1 className="mt-4 font-display text-5xl text-white">Siden ble ikke funnet</h1>
        <p className="mt-4 text-lg leading-8 text-[#c7cedc]">
          Innholdet kan ha blitt flyttet eller er ikke laget ennå. Gå tilbake til forsiden eller rett
          til kontaktsiden for å komme videre.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-[#e2c27a] px-5 py-3 text-sm font-semibold text-[#07101f]"
          >
            Til forsiden
          </Link>
          <Link
            href="/kontakt"
            className="rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white"
          >
            Kontakt oss
          </Link>
        </div>
      </div>
    </main>
  );
}
