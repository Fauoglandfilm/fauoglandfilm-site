"use client";

import { useActionState } from "react";
import Link from "next/link";

import {
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
  FRILANSEREN_PRIVACY_CONTACT_PATH,
} from "@/lib/frilanseren/constants";
import { FREELANCER_CONSENT_TEXT } from "@/lib/frilanseren/gdpr";
import { initialActionState } from "@/lib/frilanseren/action-state";
import { registerFreelancerAction } from "@/lib/frilanseren/actions";

import { ConsentCheckbox } from "./consent-checkbox";
import { SubmitButton } from "./submit-button";

export function FreelancerRegistrationForm() {
  const [state, action] = useActionState(registerFreelancerAction, initialActionState);

  return (
    <form action={action} className="space-y-4" encType="multipart/form-data">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Navn</span>
        <input name="full_name" className="form-input" placeholder="Fornavn Etternavn" />
        {state.fieldErrors?.full_name ? <p className="text-sm text-[#b42318]">{state.fieldErrors.full_name}</p> : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">E-post</span>
        <input name="email" type="email" className="form-input" placeholder="din@email.no" />
        <p className="text-sm text-[var(--muted)]">
          Vi bruker e-posten til innlogging og varsler om pilot og fremtidige oppdrag.
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
          Hva jobber du hovedsakelig med?
        </legend>
        <div className="grid gap-2">
          {FREELANCER_ROLE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/44 px-4 py-3"
            >
              <input type="checkbox" name="roles" value={option.value} />
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
              <input type="radio" name="experience_level" value={option.value} />
              <span className="text-sm text-[color:var(--foreground)]">{option.label}</span>
            </label>
          ))}
        </div>
        {state.fieldErrors?.experience_level ? (
          <p className="text-sm text-[#b42318]">{state.fieldErrors.experience_level}</p>
        ) : null}
      </fieldset>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">Profilbilde (valgfritt)</span>
        <input
          name="profile_image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="form-input file:mr-3 file:rounded-full file:border-0 file:bg-[color:var(--surface)] file:px-3 file:py-2 file:text-sm file:font-medium"
        />
        <p className="text-sm text-[var(--muted)]">Last opp JPG, PNG, WebP eller AVIF. Maks 2 MB.</p>
        {state.fieldErrors?.profile_image ? (
          <p className="text-sm text-[#b42318]">{state.fieldErrors.profile_image}</p>
        ) : null}
      </label>

      <ConsentCheckbox label={FREELANCER_CONSENT_TEXT} error={state.fieldErrors?.consent} />

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
        <SubmitButton label="Opprett frilanskonto" pendingLabel="Oppretter …" />
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
