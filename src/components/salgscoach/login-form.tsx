"use client";

import { useActionState } from "react";

import {
  signInSalgscoachAction,
  type SalgscoachAuthState,
} from "@/lib/salgscoach/actions";

const initialState: SalgscoachAuthState = { status: "idle" };

export function SalgscoachLoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(
    signInSalgscoachAction,
    initialState,
  );

  return (
    <form action={action} className="space-y-4">
      <input name="next" type="hidden" value={next} />
      <label className="block space-y-2">
        <span className="text-sm font-medium text-white/75">E-post</span>
        <input
          className="form-input"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-white/75">Passord</span>
        <input
          className="form-input"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={1}
          required
        />
      </label>
      {state.message ? (
        <p className="text-sm text-[#fda4af]" role="alert">
          {state.message}
        </p>
      ) : null}
      <button
        className="w-full rounded-2xl bg-[#7c8cff] px-5 py-3.5 font-semibold text-white transition hover:bg-[#8e9bff] disabled:cursor-wait disabled:opacity-60"
        type="submit"
        disabled={pending}
      >
        {pending ? "Logger inn …" : "Logg inn"}
      </button>
    </form>
  );
}
