"use client";

import { useActionState } from "react";

import { initialActionState } from "@/lib/frilanseren/action-state";
import { requestPasswordResetAction } from "@/lib/supabase/actions";

import { SubmitButton } from "./submit-button";

export function ForgotPasswordForm() {
  const [state, action] = useActionState(requestPasswordResetAction, initialActionState);

  return (
    <form action={action} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">E-post</span>
        <input name="email" type="email" className="form-input" placeholder="din@epost.no" />
        {state.fieldErrors?.email ? <p className="text-sm text-[#b42318]">{state.fieldErrors.email}</p> : null}
      </label>

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton label="Send lenke" pendingLabel="Sender …" />
    </form>
  );
}
