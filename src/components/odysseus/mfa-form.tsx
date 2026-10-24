"use client";

import { useActionState } from "react";
import { cancelOdysseusMfaAction, enrollOdysseusMfaAction, verifyOdysseusMfaAction } from "@/lib/odysseus/mfa-actions";
import { ODYSSEUS_FACTOR_PREFIX, type MfaState, type OwnerFactor } from "@/lib/odysseus/mfa-access";

const initial: MfaState = { status: "idle" };

export function OdysseusMfaForm({ factors }: { factors: OwnerFactor[] }) {
  const [enrollment, enroll, enrolling] = useActionState(enrollOdysseusMfaAction, initial);
  const [verification, verify, verifying] = useActionState(verifyOdysseusMfaAction, initial);
  const [cancellation, cancel, cancelling] = useActionState(cancelOdysseusMfaAction, initial);
  const verified = factors.filter((factor) => factor.status === "verified");
  const pending = factors.filter((factor) => factor.status === "unverified" && factor.name.startsWith(ODYSSEUS_FACTOR_PREFIX));
  const selectedId = enrollment.factorId ?? verified[0]?.id;
  const busy = enrolling || verifying || cancelling;

  return <div className="space-y-5">
    {!verified.length && !enrollment.factorId && !pending.length ? <form action={enroll}>
      <p className="mb-4 text-white/70">Koble til en autentikatorapp. Oppsettet starter bare når du trykker på knappen.</p>
      <button disabled={busy} className="button-base button-primary">{enrolling ? "Starter …" : "Sett opp tofaktor"}</button>
    </form> : null}
    {enrollment.status === "enrolled" && enrollment.qrCode ? <section className="space-y-3">
      <p>Skann QR-koden i autentikatorappen din. Ikke del QR-koden, nøkkelen eller engangskoder.</p>
      {/* Private provider-generated data URI: no external QR/image service. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={enrollment.qrCode} alt="Privat QR-kode for ditt tofaktoroppsett" width={240} height={240} className="rounded-xl bg-white p-3" />
      <details><summary className="cursor-pointer text-sm underline">Kan du ikke skanne? Vis oppsettnøkkel</summary>
        <code className="mt-2 block break-all text-sm">{enrollment.secret}</code>
      </details>
    </section> : null}
    {selectedId ? <form action={verify} className="space-y-4">
      {verified.length > 1 && !enrollment.factorId ? <label className="block space-y-2"><span>Autentikator</span>
        <select name="factor_id" defaultValue={selectedId} className="form-input">
          {verified.map((factor) => <option key={factor.id} value={factor.id}>{factor.name}</option>)}
        </select></label> : <input type="hidden" name="factor_id" value={selectedId} />}
      <label className="block space-y-2"><span>Sekssifret kode fra autentikatorappen</span>
        <input name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6} required className="form-input" />
      </label>
      <button disabled={busy} className="button-base button-primary">{verifying ? "Kontrollerer …" : "Bekreft og åpne kontrollrom"}</button>
    </form> : null}
    {(enrollment.factorId ? [{ id: enrollment.factorId, name: "Dette oppsettet" }] : pending).map((factor) =>
      <form action={cancel} key={factor.id}>
        <input type="hidden" name="factor_id" value={factor.id} />
        <button disabled={busy} className="text-sm underline">Avbryt ufullført oppsett: {factor.name}</button>
      </form>)}
    {[enrollment, verification, cancellation].map((state, index) => state.message ?
      <p key={index} role="alert" className="text-sm text-amber-200">{state.message}</p> : null)}
  </div>;
}
