import { z } from "zod";

import {
  EMPLOYER_ANNUAL_VOLUME_OPTIONS,
  EMPLOYER_PRODUCTION_TYPES,
  FREELANCER_EXPERIENCE_OPTIONS,
  FREELANCER_ROLE_OPTIONS,
} from "./constants";
import { MAX_PORTFOLIO_LINKS, MAX_TIMESHEET_ENTRIES, RATE_UNITS } from "./market-constants";

const requiredString = z.string().trim().min(1, "Fyll inn dette feltet.");
const optionalText = z.string().trim().optional().default("");
const optionalDate = z.string().trim().optional().default("");

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

const productionTypeEnum = z.enum(
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

const rateUnitEnum = z.enum(RATE_UNITS);

function optionalInteger(value: unknown) {
  const raw = String(value ?? "").trim();

  if (!raw) {
    return null;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : Number.NaN;
}

function requiredNumber(value: unknown) {
  const raw = String(value ?? "").trim();
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

const portfolioLinkSchema = z.object({
  label: requiredString.max(40, "Maks 40 tegn."),
  url: requiredString.url("Skriv inn en gyldig URL."),
});

export const publicFreelancerProfileSchema = z
  .object({
    full_name: requiredString,
    roles: z.array(freelancerRoleEnum).min(1, "Velg minst én rolle."),
    experience_level: freelancerExperienceEnum,
    headline: optionalText,
    bio: optionalText,
    city: optionalText,
    region: optionalText,
    is_public: z.boolean(),
    is_available: z.boolean(),
    portfolio_links: z.array(portfolioLinkSchema).max(MAX_PORTFOLIO_LINKS).default([]),
    showreel_url: optionalText,
    license_tags: z.array(z.string().trim().min(1)).default([]),
    rate_day: z.preprocess(optionalInteger, z.number().int().nonnegative().nullable()),
    rate_hour: z.preprocess(optionalInteger, z.number().int().nonnegative().nullable()),
  })
  .superRefine((value, context) => {
    if (value.is_public && !value.city) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["city"],
        message: "By/sted kreves for offentlig profil.",
      });
    }
  });

export const publicEmployerProfileSchema = z.object({
  full_name: requiredString,
  company_name: requiredString,
  production_types: z.array(productionTypeEnum).min(1, "Velg minst én produksjonstype."),
  annual_volume: employerAnnualVolumeEnum,
  company_description: optionalText,
  website_url: optionalText,
  city: optionalText,
  region: optionalText,
  is_public: z.boolean(),
});

export const jobFormSchema = z.object({
  title: requiredString.min(4, "Skriv en tydelig jobbtittel."),
  production_type: productionTypeEnum.optional(),
  role_tags: z.array(freelancerRoleEnum).min(1, "Velg minst én rolle."),
  description: requiredString.min(20, "Beskriv jobben med minst 20 tegn."),
  location: optionalText,
  region: optionalText,
  starts_on: optionalDate,
  ends_on: optionalDate,
  application_deadline: optionalDate,
  compensation_label: optionalText,
  rate_amount: z.preprocess(optionalInteger, z.number().int().nonnegative().nullable()),
  rate_unit: z.union([rateUnitEnum, z.literal("")]).transform((value) => (value === "" ? null : value)),
  is_public: z.boolean(),
});

export const jobApplicationSchema = z.object({
  job_id: requiredString.uuid(),
  message: z
    .string()
    .trim()
    .max(1200, "Maks 1200 tegn.")
    .transform((value) => (value ? value : null)),
});

export const contactRequestSchema = z.object({
  target_user_id: requiredString.uuid(),
  job_id: z.union([requiredString.uuid(), z.literal("")]).transform((value) => (value === "" ? null : value)),
  message: requiredString.max(1200, "Maks 1200 tegn."),
});

export const timesheetEntrySchema = z.object({
  work_date: requiredString,
  hours: z.preprocess(requiredNumber, z.number().min(0).max(24)),
  rate: z.preprocess(requiredNumber, z.number().min(0)),
  supplement: z.preprocess(requiredNumber, z.number().min(0)),
  note: optionalText,
});

export const timesheetFormSchema = z.object({
  project_name: requiredString,
  employer_name: requiredString,
  role_label: requiredString,
  period_start: optionalDate,
  period_end: optionalDate,
  default_rate: z.preprocess(requiredNumber, z.number().min(0)),
  entries: z.array(timesheetEntrySchema).min(1, "Legg inn minst én linje.").max(MAX_TIMESHEET_ENTRIES),
});
