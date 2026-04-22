"use client";

import { useActionState, useState } from "react";

import { initialActionState } from "@/lib/frilanseren/action-state";
import { requestAccessDataAction, requestAccountDeletionAction } from "@/lib/frilanseren/actions";

import { SubmitButton } from "./submit-button";

export function PrivacyActions() {
  const [accessState, accessAction] = useActionState(requestAccessDataAction, initialActionState);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="space-y-4">
      <form action={accessAction} className="space-y-3">
        <SubmitButton label="Be om innsyn i mine data" pendingLabel="Sender …" className="w-full sm:w-auto" />
        {accessState.message ? (
          <p className={`text-sm ${accessState.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
            {accessState.message}
          </p>
        ) : null}
      </form>

      {!confirmDelete ? (
        <button
          type="button"
          className="button-base button-size-default button-ghost"
          onClick={() => setConfirmDelete(true)}
        >
          <span className="button-label-base">Slett min konto og mine data</span>
        </button>
      ) : (
        <div className="rounded-[1.4rem] border border-[#f1b7ae] bg-[#fff5f3] p-4 text-[#7a271a]">
          <h3 className="text-base font-semibold">Slette konto?</h3>
          <p className="mt-2 text-sm leading-6">
            Hvis du fortsetter, vil vi markere kontoen din for sletting og fjerne tilgangen din til piloten.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <form action={requestAccountDeletionAction}>
              <SubmitButton label="Ja, slett kontoen min" pendingLabel="Sletter …" />
            </form>
            <button
              type="button"
              className="button-base button-size-default button-ghost"
              onClick={() => setConfirmDelete(false)}
            >
              <span className="button-label-base">Avbryt</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
