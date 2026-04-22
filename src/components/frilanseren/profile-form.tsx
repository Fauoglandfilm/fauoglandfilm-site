"use client";

import { useActionState } from "react";

import {
  EMPLOYER_ANNUAL_VOLUME_OPTIONS,
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
} from "@/lib/frilanseren/constants";
import type { EmployerProfile, FreelancerProfile, FrilanserenActionState, UserRole } from "@/lib/frilanseren/types";
import { initialActionState } from "@/lib/frilanseren/action-state";
import { updateEmployerProfileAction, updateFreelancerProfileAction } from "@/lib/frilanseren/actions";

import { SubmitButton } from "./submit-button";

type ProfileFormProps = {
  role: UserRole;
  fullName: string;
  email: string;
  employerProfile?: EmployerProfile | null;
  freelancerProfile?: FreelancerProfile | null;
};

export function ProfileForm({
  role,
  fullName,
  email,
  employerProfile,
  freelancerProfile,
}: ProfileFormProps) {
  const action = role === "employer" ? updateEmployerProfileAction : updateFreelancerProfileAction;
  const [state, formAction] = useActionState<FrilanserenActionState, FormData>(action, initialActionState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Navn</span>
          <input name="full_name" className="form-input" defaultValue={fullName} placeholder="Fornavn Etternavn" />
          {state.fieldErrors?.full_name ? <p className="text-sm text-[#b42318]">{state.fieldErrors.full_name}</p> : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">E-post</span>
          <input className="form-input opacity-80" value={email} disabled readOnly />
        </label>
      </div>

      {role === "employer" ? (
        <>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[color:var(--foreground)]">Firma</span>
            <input
              name="company_name"
              className="form-input"
              defaultValue={employerProfile?.company_name ?? ""}
              placeholder="Selskap / organisasjon"
            />
            {state.fieldErrors?.company_name ? (
              <p className="text-sm text-[#b42318]">{state.fieldErrors.company_name}</p>
            ) : null}
          </label>

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
                  <input
                    type="checkbox"
                    name="production_types"
                    value={option.value}
                    defaultChecked={employerProfile?.production_types.includes(option.value)}
                  />
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
                  <input
                    type="radio"
                    name="annual_volume"
                    value={option.value}
                    defaultChecked={employerProfile?.annual_volume === option.value}
                  />
                  <span className="text-sm text-[color:var(--foreground)]">{option.label}</span>
                </label>
              ))}
            </div>
            {state.fieldErrors?.annual_volume ? (
              <p className="text-sm text-[#b42318]">{state.fieldErrors.annual_volume}</p>
            ) : null}
          </fieldset>
        </>
      ) : (
        <>
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-[color:var(--foreground)]">
              Hva jobber du hovedsakelig med?
            </legend>
            <div className="grid gap-2">
              {FREELANCER_ROLE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/44 px-4 py-3"
                >
                  <input
                    type="checkbox"
                    name="roles"
                    value={option.value}
                    defaultChecked={freelancerProfile?.roles.includes(option.value)}
                  />
                  <span className="text-sm text-[color:var(--foreground)]">{option.label}</span>
                </label>
              ))}
            </div>
            {state.fieldErrors?.roles ? <p className="text-sm text-[#b42318]">{state.fieldErrors.roles}</p> : null}
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-[color:var(--foreground)]">
              Hvor lenge har du jobbet i feltet?
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {FREELANCER_EXPERIENCE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/44 px-4 py-3"
                >
                  <input
                    type="radio"
                    name="experience_level"
                    value={option.value}
                    defaultChecked={freelancerProfile?.experience_level === option.value}
                  />
                  <span className="text-sm text-[color:var(--foreground)]">{option.label}</span>
                </label>
              ))}
            </div>
            {state.fieldErrors?.experience_level ? (
              <p className="text-sm text-[#b42318]">{state.fieldErrors.experience_level}</p>
            ) : null}
          </fieldset>
        </>
      )}

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton label="Lagre endringer" pendingLabel="Lagrer …" />
    </form>
  );
}
