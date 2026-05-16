"use client";

import { useActionState } from "react";

import {
  EMPLOYER_ANNUAL_VOLUME_OPTIONS,
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
} from "@/lib/frilanseren/constants";
import { initialActionState } from "@/lib/frilanseren/action-state";
import { updateEmployerProfileAction, updateFreelancerProfileAction } from "@/lib/frilanseren/actions";
import type { EmployerProfile, FreelancerProfile, FrilanserenActionState, UserRole } from "@/lib/frilanseren/types";

import { SubmitButton } from "./submit-button";

type ProfileFormProps = {
  role: UserRole;
  fullName: string;
  email: string;
  imageUrl?: string | null;
  employerProfile?: EmployerProfile | null;
  freelancerProfile?: FreelancerProfile | null;
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-[#b42318]">{message}</p> : null;
}

export function ProfileForm({
  role,
  fullName,
  email,
  imageUrl,
  employerProfile,
  freelancerProfile,
}: ProfileFormProps) {
  const action = role === "employer" ? updateEmployerProfileAction : updateFreelancerProfileAction;
  const [state, formAction] = useActionState<FrilanserenActionState, FormData>(action, initialActionState);
  const imageLabel = role === "employer" ? "Firmalogo" : "Profilbilde";

  return (
    <form action={formAction} className="space-y-6" encType="multipart/form-data">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">Navn</span>
          <input name="full_name" className="form-input" defaultValue={fullName} placeholder="Fornavn Etternavn" />
          <FieldError message={state.fieldErrors?.full_name} />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">E-post</span>
          <input className="form-input opacity-80" value={email} disabled readOnly />
        </label>
      </div>

      <div className="space-y-3 rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/48 p-4">
        <div className="flex flex-wrap items-center gap-4">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={imageLabel}
              className="h-20 w-20 rounded-[1.25rem] border border-[color:var(--line)] object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] border border-dashed border-[color:var(--line)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Ingen fil
            </div>
          )}

          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-sm font-medium text-[color:var(--foreground)]">{imageLabel}</p>
            <input
              name={role === "employer" ? "company_logo" : "profile_image"}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="form-input file:mr-3 file:rounded-full file:border-0 file:bg-[color:var(--surface)] file:px-3 file:py-2 file:text-sm file:font-medium"
            />
            <p className="text-sm text-[var(--muted)]">Last opp JPG, PNG, WebP eller AVIF. Maks 2 MB.</p>
            <FieldError message={role === "employer" ? state.fieldErrors?.company_logo : state.fieldErrors?.profile_image} />
          </div>
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/44 px-4 py-3">
        <input
          type="checkbox"
          name="is_public"
          className="mt-1"
          defaultChecked={role === "employer" ? employerProfile?.is_public : freelancerProfile?.is_public}
        />
        <span className="text-sm leading-6 text-[color:var(--foreground)]">
          Gjør profilen synlig i den åpne markedsplassen etter admin-godkjenning
        </span>
      </label>

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
            <FieldError message={state.fieldErrors?.company_name} />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[color:var(--foreground)]">Selskapsbeskrivelse</span>
            <textarea
              name="company_description"
              rows={5}
              className="form-input min-h-32"
              defaultValue={employerProfile?.company_description ?? ""}
              placeholder="Hva produserer dere, og hvilke typer folk leter dere ofte etter?"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">Nettside</span>
              <input
                name="website_url"
                type="url"
                className="form-input"
                defaultValue={employerProfile?.website_url ?? ""}
                placeholder="https://"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">By/sted</span>
              <input name="city" className="form-input" defaultValue={employerProfile?.city ?? ""} placeholder="Oslo" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">Region</span>
              <input name="region" className="form-input" defaultValue={employerProfile?.region ?? ""} placeholder="Oslo" />
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
            <FieldError message={state.fieldErrors?.production_types} />
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
            <FieldError message={state.fieldErrors?.annual_volume} />
          </fieldset>
        </>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">Overskrift</span>
              <input
                name="headline"
                className="form-input"
                defaultValue={freelancerProfile?.headline ?? ""}
                placeholder="Filmfotograf med dokumentar- og reklameerfaring"
              />
            </label>
            <label className="block space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">Bio</span>
              <textarea
                name="bio"
                rows={5}
                className="form-input min-h-32"
                defaultValue={freelancerProfile?.bio ?? ""}
                placeholder="Skriv kort om erfaring, type produksjoner og hva du ser etter."
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">By/sted</span>
              <input name="city" className="form-input" defaultValue={freelancerProfile?.city ?? ""} placeholder="Oslo" />
              <FieldError message={state.fieldErrors?.city} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">Region</span>
              <input name="region" className="form-input" defaultValue={freelancerProfile?.region ?? ""} placeholder="Oslo" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">Showreel</span>
              <input
                name="showreel_url"
                type="url"
                className="form-input"
                defaultValue={freelancerProfile?.showreel_url ?? ""}
                placeholder="https://"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">Sertifikater</span>
              <input
                name="license_tags_text"
                className="form-input"
                defaultValue={freelancerProfile?.license_tags.join(", ") ?? ""}
                placeholder="Førerkort B, drone, lift"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">Dagsats</span>
              <input
                name="rate_day"
                type="number"
                min="0"
                className="form-input"
                defaultValue={freelancerProfile?.rate_day ?? ""}
                placeholder="6500"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[color:var(--foreground)]">Timesats</span>
              <input
                name="rate_hour"
                type="number"
                min="0"
                className="form-input"
                defaultValue={freelancerProfile?.rate_hour ?? ""}
                placeholder="850"
              />
            </label>
          </div>

          <label className="flex items-start gap-3 rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/44 px-4 py-3">
            <input type="checkbox" name="is_available" className="mt-1" defaultChecked={freelancerProfile?.is_available} />
            <span className="text-sm leading-6 text-[color:var(--foreground)]">Marker meg som ledig for oppdrag</span>
          </label>

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
            <FieldError message={state.fieldErrors?.roles} />
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
            <FieldError message={state.fieldErrors?.experience_level} />
          </fieldset>
        </>
      )}

      {state.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-[#b42318]" : "text-[color:var(--foreground)]"}`}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton label="Lagre endringer" pendingLabel="Lagrer ..." />
    </form>
  );
}
