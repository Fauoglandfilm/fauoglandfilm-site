"use client";

import { useActionState } from "react";

import {
  requestOdysseusPasswordResetAction,
} from "@/lib/odysseus/actions";

export function OdysseusPasswordResetForm() {
  const [state, action, pending] = useActionState(
    requestOdysseusPasswordResetAction,
    { status: "idle" as const },
  );
  return (
    <form action={action} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium">Brukernavn</span>
        <input name="username" autoComplete="username" className="form-input" required />
      </label>
      {state.message ? <p className="text-sm leading-6 text-[var(--muted-2)]">{state.message}</p> : null}
      <button className="button-base button-primary" type="submit" disabled={pending}>
        <span className="button-label-base">{pending ? "Sender …" : "Send sikker passordlenke"}</span>
      </button>
    </form>
  );
}
