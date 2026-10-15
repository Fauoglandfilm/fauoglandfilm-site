import type { Metadata } from "next";

import { OdysseusLoginForm } from "@/components/odysseus/login-form";

export const metadata: Metadata = { title: "Odysseus – privat innlogging", robots: { index: false, follow: false } };

export default function OdysseusLoginPage() {
  return (
    <div className="mx-auto max-w-lg py-10">
      <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]">Kun eier</p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.05em]">Logg inn på Odysseus</h1>
        <p className="mb-7 mt-3 leading-7 text-white/60">Sikker fjernstyring av Mac #2, salgssystemet og CRM.</p>
        <OdysseusLoginForm />
      </section>
    </div>
  );
}
