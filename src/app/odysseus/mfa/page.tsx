import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OdysseusMfaForm } from "@/components/odysseus/mfa-form";
import { signOutOdysseusAction } from "@/lib/odysseus/actions";
import { getOdysseusOwnerAccess } from "@/lib/odysseus/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata: Metadata = { title: "Odysseus – tofaktor", robots: { index: false, follow: false } };

export default async function OdysseusMfaPage() {
  const access = await getOdysseusOwnerAccess();
  if (access.state === "unauthenticated") redirect("/odysseus/login");
  if (access.state === "ready") redirect("/odysseus");
  return <section className="mx-auto max-w-lg space-y-6 rounded-3xl border border-white/10 p-7">
    <h1 className="text-3xl font-semibold">Sikker eierinnlogging</h1>
    {access.state === "unavailable" ? <div role="alert" className="space-y-3">
      <p>Innloggingen kunne ikke kontrolleres nå. Kontrollrommet og kommandoene forblir låst.</p>
      <a href="/odysseus/mfa" className="underline">Prøv kontrollen igjen</a>
    </div> : <OdysseusMfaForm factors={access.factors} />}
    <form action={signOutOdysseusAction}><button className="text-sm underline">Logg ut</button></form>
  </section>;
}
