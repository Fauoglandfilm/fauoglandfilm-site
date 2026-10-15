import { hasKulturarenaAuthConfig } from "@/lib/kulturarena/server";

export const dynamic = "force-dynamic";

export default async function KulturarenaLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const ready = hasKulturarenaAuthConfig();
  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", background: "#f4f2ec", color: "#192a38", padding: "32px 20px" }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", color: "#a74332", textTransform: "uppercase", marginBottom: 22 }}>Kulturarena / salgssystem</p>
        <h1 style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 14 }}>Kulturarena</h1>
        <p style={{ color: "#63717b", lineHeight: 1.7, marginBottom: 28 }}>Kunder, eventer og oppgaver. Ett sted.</p>
        <form method="post" action="/kulturarena/login/session" style={{ background: "white", border: "1px solid #dddeda", borderRadius: 12, padding: 28, display: "grid", gap: 18 }}>
          <label style={{ display: "grid", gap: 7, fontSize: 13 }}>E-post eller brukernavn<input name="username" autoComplete="username" required maxLength={254} style={{ padding: "12px 14px", border: "1px solid #ccd1d1", borderRadius: 6, fontSize: 16 }} /></label>
          <label style={{ display: "grid", gap: 7, fontSize: 13 }}>Passord<input name="password" type="password" autoComplete="current-password" required maxLength={512} style={{ padding: "12px 14px", border: "1px solid #ccd1d1", borderRadius: 6, fontSize: 16 }} /></label>
          {error ? <p role="alert" style={{ color: "#9e2f27", fontSize: 13 }}>{error === "busy" ? "Innlogging er midlertidig utilgjengelig. Prøv igjen senere." : "Kunne ikke logge inn. Kontroller brukernavn og passord."}</p> : null}
          {!ready ? <p role="status" style={{ color: "#63717b", fontSize: 13 }}>Nettilgangen er ikke aktivert ennå. Kontakt Tommy for tilgang.</p> : null}
          <button disabled={!ready} type="submit" style={{ background: "#192a38", color: "white", border: 0, borderRadius: 6, padding: "13px 18px", fontWeight: 600, opacity: ready ? 1 : 0.5 }}>Logg inn</button>
        </form>
        <p style={{ fontSize: 12, lineHeight: 1.7, color: "#63717b", marginTop: 20 }}>Kulturarena har egen tilgang og egne data. Endringer lagres i det samme salgssystemet fra alle enheter.</p>
      </div>
    </main>
  );
}
