"use client";

import { useActionState } from "react";

import { initialActionState } from "@/lib/frilanseren/action-state";
import { saveTimesheetAction } from "@/lib/frilanseren/market-actions";
import { TIMESHEET_DISCLAIMER } from "@/lib/frilanseren/timesheet";
import type { FrilanserenActionState } from "@/lib/frilanseren/types";

import { SubmitButton } from "./submit-button";

const DEFAULT_ROWS = Array.from({ length: 7 }, (_, index) => index);

export function TimesheetForm() {
  const [state, formAction] = useActionState<FrilanserenActionState, FormData>(
    saveTimesheetAction,
    initialActionState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Prosjekt</span>
          <input name="project_name" className="form-input" placeholder="Kortfilm / reklame / serie" />
          {state.fieldErrors?.project_name ? <p className="text-sm text-[#b42318]">{state.fieldErrors.project_name}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Arbeidsgiver</span>
          <input name="employer_name" className="form-input" placeholder="Produksjonsselskap" />
          {state.fieldErrors?.employer_name ? <p className="text-sm text-[#b42318]">{state.fieldErrors.employer_name}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Rolle</span>
          <input name="role_label" className="form-input" placeholder="Fotograf" />
          {state.fieldErrors?.role_label ? <p className="text-sm text-[#b42318]">{state.fieldErrors.role_label}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Standard sats</span>
          <input name="default_rate" type="number" min="0" className="form-input" placeholder="650" defaultValue="0" />
          {state.fieldErrors?.default_rate ? <p className="text-sm text-[#b42318]">{state.fieldErrors.default_rate}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Periode start</span>
          <input name="period_start" type="date" className="form-input" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Periode slutt</span>
          <input name="period_end" type="date" className="form-input" />
        </label>
      </div>

      <div className="overflow-x-auto rounded-[1.4rem] border border-[color:var(--line)]">
        <table className="min-w-[760px] w-full border-collapse bg-[color:var(--surface)]/82 text-sm">
          <thead className="bg-[color:var(--surface-muted)]/60 text-left text-[var(--muted)]">
            <tr>
              <th className="px-3 py-3 font-medium">Dato</th>
              <th className="px-3 py-3 font-medium">Timer</th>
              <th className="px-3 py-3 font-medium">Sats</th>
              <th className="px-3 py-3 font-medium">Tillegg</th>
              <th className="px-3 py-3 font-medium">Notat</th>
            </tr>
          </thead>
          <tbody>
            {DEFAULT_ROWS.map((row) => (
              <tr key={row} className="border-t border-[color:var(--line)]">
                <td className="px-3 py-2">
                  <input name="work_date" type="date" className="form-input min-w-36" />
                </td>
                <td className="px-3 py-2">
                  <input name="hours" type="number" min="0" max="24" step="0.25" className="form-input min-w-24" />
                </td>
                <td className="px-3 py-2">
                  <input name="rate" type="number" min="0" className="form-input min-w-24" defaultValue="0" />
                </td>
                <td className="px-3 py-2">
                  <input name="supplement" type="number" min="0" className="form-input min-w-24" defaultValue="0" />
                </td>
                <td className="px-3 py-2">
                  <input name="note" className="form-input min-w-52" placeholder="Dag, overtid, reise ..." />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {state.fieldErrors?.entries ? <p className="text-sm text-[#b42318]">{state.fieldErrors.entries}</p> : null}
      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <p className="text-sm leading-6 text-[var(--muted-2)]">{TIMESHEET_DISCLAIMER}</p>
      <SubmitButton label="Lagre timeliste" pendingLabel="Lagrer ..." />
    </form>
  );
}
