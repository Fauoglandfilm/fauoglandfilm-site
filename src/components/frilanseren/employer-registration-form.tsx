"use client";

import { useActionState } from "react";
import Link from "next/link";

import {
  EMPLOYER_ANNUAL_VOLUME_OPTIONS,
  EMPLOYER_PRODUCTION_TYPES,
  FRILANSEREN_PRIVACY_CONTACT_PATH,
} from "@/lib/frilanseren/constants";
import { EMPLOYER_CONSENT_TEXT } from "@/lib/frilanseren/gdpr";
import { initialActionState } from "@/lib/frilanseren/action-state";
import { registerEmployerAction } from "@/lib/frilanseren/actions";

import { ConsentCheckbox } from "./consent-checkbox";
import { SubmitButton } from "./submit-button";

export function EmployerRegistrationForm() {
  const [state, action] = useActionState(registerEmployerAction, initialActionState);

  return (
    <form action={action} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Navn</span>
        <input name="full_name" className="form-input" placeholder="Fornavn Etternavn" />
        {state.fieldErrors?.full_name ? <p className="text-sm text-[#b42318]">{state.fieldErrors.full_name}</p> : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Firma</span>
        <input name="company_name" className="form-input" placeholder="Selskap / organisasjon" />
        {state.fieldErrors?.company_name ? (
          <p className="text-sm text-[#b42318]">{state.fieldErrors.company_name}</p>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">E-post</span>
        <input name="email" type="email" className="form-input" placeholder="din@bedrift.no" />
        <p className="text-sm text-[var(--muted)]">
          Vi bruker e-posten til innlogging og dialog om piloten.
        </p>
        {state.fieldErrors?.email ? <p className="text-sm text-[#b42318]">{state.fieldErrors.email}</p> : null}
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Passord</span>
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
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-[color:var(--foreground)]">
          Hvilke type produksjoner jobber dere mest med?
        </legend>
        <div className="grid gap-2">
          {EMPLOYER_PRODUCTION_TYPES.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/44 px-4 py-3"
            >
              <input type="checkbox" name="production_types" value={option.value} />
              <span className="text-sm text-[color:var(--foreground)]">{option.label}</span>
            </label>
          ))}
        </div>
        {state.fieldErrors?.production_types ? (
          <p className="text-sm text-[#b42318]">{state.fieldErrors.production_types}</p>
        ) : null}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-[color:var(--foreground)]">
          Ca. hvor mange produksjoner har dere i året?
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {EMPLOYER_ANNUAL_VOLUME_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/44 px-4 py-3"
            >
              <input type="radio" name="annual_volume" value={option.value} />
              <span className="text-sm text-[color:var(--foreground)]">{option.label}</span>
            </label>
          ))}
        </div>
        {state.fieldErrors?.annual_volume ? (
          <p className="text-sm text-[#b42318]">{state.fieldErrors.annual_volume}</p>
        ) : null}
      </fieldset>

      <ConsentCheckbox label={EMPLOYER_CONSENT_TEXT} error={state.fieldErrors?.consent} />

      <p className="text-sm text-[var(--muted-2)]">
        Les vår{" "}
        <Link href={FRILANSEREN_PRIVACY_CONTACT_PATH} className="underline underline-offset-4">
          personvernerklæring
        </Link>
        .
      </p>

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton label="Opprett arbeidsgiverkonto" pendingLabel="Oppretter …" />
        <p className="text-sm text-[var(--muted-2)]">
          Allerede bruker?{" "}
          <Link href="/frilanseren/login" className="underline underline-offset-4">
            Logg inn
          </Link>
        </p>
      </div>
    </form>
  );
}
