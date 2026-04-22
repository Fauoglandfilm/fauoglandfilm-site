import test from "node:test";
import assert from "node:assert/strict";

import {
  EMPLOYER_ANNUAL_VOLUME_OPTIONS,
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
  ROLE_OPTIONS,
} from "./constants.ts";
import {
  employerRegistrationSchema,
  freelancerRegistrationSchema,
  loginSchema,
} from "./validation.ts";

test("constants expose the supported Frilanseren role and profile options", () => {
  assert.deepEqual(ROLE_OPTIONS.map((option) => option.value), ["employer", "freelancer"]);
  assert.equal(EMPLOYER_PRODUCTION_TYPES.length, 5);
  assert.equal(EMPLOYER_ANNUAL_VOLUME_OPTIONS.length, 3);
  assert.equal(FREELANCER_ROLE_OPTIONS.length, 7);
  assert.equal(FREELANCER_EXPERIENCE_OPTIONS.length, 3);
});

test("employer registration requires consent and matching passwords", () => {
  const missingConsent = employerRegistrationSchema.safeParse({
    full_name: "Ola Nordmann",
    company_name: "Pilot Produksjon",
    email: "ola@example.com",
    password: "sterktpassord",
    confirm_password: "sterktpassord",
    production_types: ["reklame"],
    annual_volume: "3_10",
    consent: false,
  });

  assert.equal(missingConsent.success, false);
  assert.equal(missingConsent.error.issues[0]?.message, "Du må samtykke til behandling av personopplysninger for å opprette konto.");

  const mismatch = employerRegistrationSchema.safeParse({
    full_name: "Ola Nordmann",
    company_name: "Pilot Produksjon",
    email: "ola@example.com",
    password: "sterktpassord",
    confirm_password: "annetpassord",
    production_types: ["reklame"],
    annual_volume: "3_10",
    consent: true,
  });

  assert.equal(mismatch.success, false);
  assert.equal(mismatch.error.issues[0]?.message, "Passordene må være like.");
});

test("freelancer registration requires at least one role", () => {
  const result = freelancerRegistrationSchema.safeParse({
    full_name: "Kari Nordmann",
    email: "kari@example.com",
    password: "sterktpassord",
    confirm_password: "sterktpassord",
    roles: [],
    experience_level: "3_7",
    consent: true,
  });

  assert.equal(result.success, false);
  assert.equal(result.error.issues[0]?.message, "Fyll inn dette feltet.");
});

test("login schema rejects invalid email copy in Norwegian", () => {
  const result = loginSchema.safeParse({
    email: "ikke-epost",
    password: "sterktpassord",
  });

  assert.equal(result.success, false);
  assert.equal(result.error.issues[0]?.message, "Skriv inn en gyldig e-postadresse.");
});
