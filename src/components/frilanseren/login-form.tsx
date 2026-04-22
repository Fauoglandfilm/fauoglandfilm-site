"use client";

import { useActionState } from "react";
import Link from "next/link";

import { initialActionState } from "@/lib/frilanseren/action-state";
import { signInWithPasswordAction } from "@/lib/supabase/actions";

import { SubmitButton } from "./submit-button";

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, action] = useActionState(signInWithPasswordAction, initialActionState);

  return (
    <form action={action} className="space-y-4">
      {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">E-post</span>
        <input name="email" type="email" className="form-input" placeholder="din@epost.no" />
        {state.fieldErrors?.email ? <p className="text-sm text-[#b42318]">{state.fieldErrors.email}</p> : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Passord</span>
        <input name="password" type="password" className="form-input" placeholder="••••••••" />
        {state.fieldErrors?.password ? (
          <p className="text-sm text-[#b42318]">{state.fieldErrors.password}</p>
        ) : null}
      </label>

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Logg inn" pendingLabel="Logger inn …" />
        <div className="flex flex-col gap-2 text-sm text-[var(--muted-2)] sm:items-end">
          <Link href="/frilanseren/forgot-password" className="underline decoration-[color:var(--line-strong)] underline-offset-4">
            Glemt passord?
          </Link>
          <Link href="/frilanseren/register" className="underline decoration-[color:var(--line-strong)] underline-offset-4">
            Opprett ny konto
          </Link>
        </div>
      </div>
    </form>
  );
}
