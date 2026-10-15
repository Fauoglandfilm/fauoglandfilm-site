"use client";

import { useActionState } from "react";
import Link from "next/link";

import {
  signInOdysseusAction,
} from "@/lib/odysseus/actions";

export function OdysseusLoginForm() {
  const [state, action, pending] = useActionState(signInOdysseusAction, { status: "idle" as const });
  return (
    <form action={action} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium">Brukernavn</span>
        <input name="username" autoComplete="username" className="form-input" required />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Passord</span>
        <input name="password" type="password" autoComplete="current-password" className="form-input" required minLength={10} />
      </label>
      {state.message ? <p className="text-sm text-[#b42318]">{state.message}</p> : null}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button className="button-base button-primary" type="submit" disabled={pending}>
          <span className="button-label-base">{pending ? "Logger inn …" : "Logg inn"}</span>
        </button>
        <Link className="text-sm underline underline-offset-4" href="/odysseus/forgot-password">
          Glemt passord?
        </Link>
      </div>
    </form>
  );
}
