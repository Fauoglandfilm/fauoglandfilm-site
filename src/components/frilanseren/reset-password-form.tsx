"use client";

import { useActionState } from "react";

import { initialActionState } from "@/lib/frilanseren/action-state";
import { resetPasswordAction } from "@/lib/supabase/actions";

import { SubmitButton } from "./submit-button";

export function ResetPasswordForm() {
  const [state, action] = useActionState(resetPasswordAction, initialActionState);

  return (
    <form action={action} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Nytt passord</span>
        <input name="password" type="password" className="form-input" placeholder="••••••••" />
        {state.fieldErrors?.password ? <p className="text-sm text-[#b42318]">{state.fieldErrors.password}</p> : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Bekreft passord</span>
        <input name="confirm_password" type="password" className="form-input" placeholder="••••••••" />
        {state.fieldErrors?.confirm_password ? (
          <p className="text-sm text-[#b42318]">{state.fieldErrors.confirm_password}</p>
        ) : null}
      </label>

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton label="Lagre nytt passord" pendingLabel="Lagrer …" />
    </form>
  );
}
