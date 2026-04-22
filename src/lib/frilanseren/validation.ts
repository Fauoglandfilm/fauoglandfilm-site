import { z } from "zod";

import {
  EMPLOYER_ANNUAL_VOLUME_OPTIONS,
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
  FRILANSEREN_MIN_PASSWORD_LENGTH,
} from "./constants";

export const REQUIRED_FIELD_MESSAGE = "Fyll inn dette feltet.";
export const INVALID_EMAIL_MESSAGE = "Skriv inn en gyldig e-postadresse.";
export const PASSWORD_MISMATCH_MESSAGE = "Passordene må være like.";
export const PASSWORD_TOO_SHORT_MESSAGE = `Passordet må være lengre. Minst ${FRILANSEREN_MIN_PASSWORD_LENGTH} tegn.`;
export const CONSENT_REQUIRED_MESSAGE =
  "Du må samtykke til behandling av personopplysninger for å opprette konto.";

const employerProductionTypeEnum = z.enum(
  EMPLOYER_PRODUCTION_TYPES.map((option) => option.value) as [
    (typeof EMPLOYER_PRODUCTION_TYPES)[number]["value"],
    ...(typeof EMPLOYER_PRODUCTION_TYPES)[number]["value"][],
  ],
);

const employerAnnualVolumeEnum = z.enum(
  EMPLOYER_ANNUAL_VOLUME_OPTIONS.map((option) => option.value) as [
    (typeof EMPLOYER_ANNUAL_VOLUME_OPTIONS)[number]["value"],
    ...(typeof EMPLOYER_ANNUAL_VOLUME_OPTIONS)[number]["value"][],
  ],
);

const freelancerRoleEnum = z.enum(
  FREELANCER_ROLE_OPTIONS.map((option) => option.value) as [
    (typeof FREELANCER_ROLE_OPTIONS)[number]["value"],
    ...(typeof FREELANCER_ROLE_OPTIONS)[number]["value"][],
  ],
);

const freelancerExperienceEnum = z.enum(
  FREELANCER_EXPERIENCE_OPTIONS.map((option) => option.value) as [
    (typeof FREELANCER_EXPERIENCE_OPTIONS)[number]["value"],
    ...(typeof FREELANCER_EXPERIENCE_OPTIONS)[number]["value"][],
  ],
);

const requiredString = z.string().trim().min(1, REQUIRED_FIELD_MESSAGE);
const emailSchema = requiredString.email(INVALID_EMAIL_MESSAGE);
const passwordSchema = z
  .string()
  .min(FRILANSEREN_MIN_PASSWORD_LENGTH, PASSWORD_TOO_SHORT_MESSAGE);
const consentSchema = z.boolean().refine((value) => value, {
  message: CONSENT_REQUIRED_MESSAGE,
});

const registrationShape = {
  full_name: requiredString,
  email: emailSchema,
  password: passwordSchema,
  confirm_password: passwordSchema,
  consent: consentSchema,
};

function withPasswordConfirmation<
  T extends z.ZodRawShape & {
    password: z.ZodType;
    confirm_password: z.ZodType;
  },
>(shape: T) {
  return z
    .object(shape)
    .superRefine((value, context) => {
      const passwords = value as {
        password: string;
        confirm_password: string;
      };

      if (passwords.password !== passwords.confirm_password) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirm_password"],
          message: PASSWORD_MISMATCH_MESSAGE,
        });
      }
    });
}

export const loginSchema = z.object({
  email: emailSchema,
  password: requiredString,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = withPasswordConfirmation({
  password: passwordSchema,
  confirm_password: passwordSchema,
});

export const employerRegistrationSchema = withPasswordConfirmation({
  ...registrationShape,
  company_name: requiredString,
  production_types: z.array(employerProductionTypeEnum).min(1, REQUIRED_FIELD_MESSAGE),
  annual_volume: employerAnnualVolumeEnum,
});

export const freelancerRegistrationSchema = withPasswordConfirmation({
  ...registrationShape,
  roles: z.array(freelancerRoleEnum).min(1, REQUIRED_FIELD_MESSAGE),
  experience_level: freelancerExperienceEnum,
});

export const employerProfileSchema = z.object({
  full_name: requiredString,
  company_name: requiredString,
  production_types: z.array(employerProductionTypeEnum).min(1, REQUIRED_FIELD_MESSAGE),
  annual_volume: employerAnnualVolumeEnum,
});

export const freelancerProfileSchema = z.object({
  full_name: requiredString,
  roles: z.array(freelancerRoleEnum).min(1, REQUIRED_FIELD_MESSAGE),
  experience_level: freelancerExperienceEnum,
});
