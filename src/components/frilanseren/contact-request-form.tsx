"use client";

import { useActionState } from "react";

import { initialActionState } from "@/lib/frilanseren/action-state";
import { requestContactAction } from "@/lib/frilanseren/market-actions";
import type { FrilanserenActionState } from "@/lib/frilanseren/types";

import { SubmitButton } from "./submit-button";

type ContactRequestFormProps = {
  targetUserId: string;
  jobId?: string | null;
};

export function ContactRequestForm({ targetUserId, jobId }: ContactRequestFormProps) {
  const [state, formAction] = useActionState<FrilanserenActionState, FormData>(
    requestContactAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <input type="hidden" name="target_user_id" value={targetUserId} />
      <input type="hidden" name="job_id" value={jobId ?? ""} />
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Melding</span>
        <textarea
          name="message"
          rows={5}
          className="form-input min-h-32"
          placeholder="Fortell kort hva du ønsker å kontakte profilen om."
        />
        {state.fieldErrors?.message ? <p className="text-sm text-[#b42318]">{state.fieldErrors.message}</p> : null}
      </label>

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton label="Send forespørsel" pendingLabel="Sender ..." />
    </form>
  );
}
