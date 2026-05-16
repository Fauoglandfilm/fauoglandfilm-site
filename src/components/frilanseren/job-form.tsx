"use client";

import { useActionState } from "react";

import {
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_ROLE_OPTIONS,
} from "@/lib/frilanseren/constants";
import { initialActionState } from "@/lib/frilanseren/action-state";
import { createJobAction } from "@/lib/frilanseren/market-actions";
import type { FrilanserenActionState } from "@/lib/frilanseren/types";

import { SubmitButton } from "./submit-button";

export function JobForm() {
  const [state, formAction] = useActionState<FrilanserenActionState, FormData>(
    createJobAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Tittel</span>
          <input name="title" className="form-input" placeholder="Fotograf til reklamefilm" />
          {state.fieldErrors?.title ? <p className="text-sm text-[#b42318]">{state.fieldErrors.title}</p> : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Produksjonstype</span>
          <select name="production_type" className="form-input" defaultValue="">
            <option value="">Velg type</option>
            {EMPLOYER_PRODUCTION_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-[color:var(--foreground)]">Roller</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {FREELANCER_ROLE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/44 px-4 py-3"
            >
              <input type="checkbox" name="role_tags" value={option.value} />
              <span className="text-sm text-[color:var(--foreground)]">{option.label}</span>
            </label>
          ))}
        </div>
        {state.fieldErrors?.role_tags ? <p className="text-sm text-[#b42318]">{state.fieldErrors.role_tags}</p> : null}
      </fieldset>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Beskrivelse</span>
        <textarea
          name="description"
          rows={6}
          className="form-input min-h-40"
          placeholder="Beskriv prosjektet, arbeidsdagene, teamet og hva dere ser etter."
        />
        {state.fieldErrors?.description ? (
          <p className="text-sm text-[#b42318]">{state.fieldErrors.description}</p>
        ) : null}
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Sted</span>
          <input name="location" className="form-input" placeholder="Oslo" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Region</span>
          <input name="region" className="form-input" placeholder="Oslo" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Startdato</span>
          <input name="starts_on" type="date" className="form-input" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Sluttdato</span>
          <input name="ends_on" type="date" className="form-input" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Søknadsfrist</span>
          <input name="application_deadline" type="date" className="form-input" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Honorar</span>
          <input name="compensation_label" className="form-input" placeholder="Etter avtale" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Sats</span>
          <input name="rate_amount" type="number" min="0" className="form-input" placeholder="6500" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Satsen gjelder</span>
          <select name="rate_unit" className="form-input" defaultValue="">
            <option value="">Ikke satt</option>
            <option value="hour">Time</option>
            <option value="day">Dag</option>
            <option value="project">Prosjekt</option>
          </select>
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/44 px-4 py-3">
        <input type="checkbox" name="is_public" className="mt-1" />
        <span className="text-sm leading-6 text-[color:var(--foreground)]">
          Publiser jobben når admin har godkjent den
        </span>
      </label>

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton label="Lagre jobb" pendingLabel="Lagrer ..." />
    </form>
  );
}
