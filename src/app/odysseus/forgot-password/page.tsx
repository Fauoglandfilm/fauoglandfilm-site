import Link from "next/link";

import { OdysseusPasswordResetForm } from "@/components/odysseus/password-reset-form";

export default function OdysseusForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-lg py-10">
      <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
        <h1 className="font-display text-4xl tracking-[-0.05em]">Nytt passord</h1>
        <p className="mb-7 mt-3 leading-7 text-white/60">Lenken sendes bare til den registrerte eieradressen.</p>
        <OdysseusPasswordResetForm />
        <Link href="/odysseus/login" className="mt-6 inline-block text-sm underline underline-offset-4">Tilbake til innlogging</Link>
      </section>
    </div>
  );
}
