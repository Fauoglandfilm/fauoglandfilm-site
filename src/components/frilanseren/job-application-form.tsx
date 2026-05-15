"use client";

import { useActionState } from "react";

import { initialActionState } from "@/lib/frilanseren/action-state";
import { applyToJobAction } from "@/lib/frilanseren/market-actions";
import type { FrilanserenActionState } from "@/lib/frilanseren/types";

import { SubmitButton } from "./submit-button";

export function JobApplicationForm({ jobId }: { jobId: string }) {
  const [state, formAction] = useActionState<FrilanserenActionState, FormData>(
    applyToJobAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <input type="hidden" name="job_id" value={jobId} />
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Kort melding</span>
        <textarea
          name="message"
          rows={5}
          className="form-input min-h-32"
          placeholder="Skriv kort hvorfor du passer til oppdraget."
        />
        {state.fieldErrors?.message ? <p className="text-sm text-[#b42318]">{state.fieldErrors.message}</p> : null}
      </label>

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton label="Meld interesse" pendingLabel="Sender ..." />
    </form>
  );
}
