import assert from "node:assert/strict";
import { test } from "node:test";

import {
  jobApplicationSchema,
  jobFormSchema,
  publicFreelancerProfileSchema,
  timesheetFormSchema,
} from "./market-validation";

test("public freelancer profile requires city when profile is public", () => {
  const result = publicFreelancerProfileSchema.safeParse({
    full_name: "Ada Foto",
    roles: ["foto"],
    experience_level: "3_7",
    headline: "Filmfotograf",
    bio: "Jobber med reklame og dokumentar.",
    city: "",
    region: "Oslo",
    is_public: true,
    is_available: true,
    portfolio_links: [],
    showreel_url: "",
    license_tags: [],
    rate_day: "",
    rate_hour: "",
  });

  assert.equal(result.success, false);
  assert.equal(result.error.issues[0]?.path[0], "city");
});

test("job form requires at least one role and an open-friendly title", () => {
  const result = jobFormSchema.safeParse({
    title: "Opptak",
    production_type: "reklame",
    description: "Kort jobb",
    location: "Oslo",
    region: "Oslo",
    starts_on: "2026-06-01",
    ends_on: "2026-06-03",
    application_deadline: "2026-05-25",
    compensation_label: "Etter avtale",
    rate_amount: "",
    rate_unit: "",
    role_tags: [],
    is_public: true,
  });

  assert.equal(result.success, false);
  assert.equal(result.error.issues[0]?.path[0], "role_tags");
});

test("job application trims optional message", () => {
  const result = jobApplicationSchema.safeParse({
    job_id: "3fba9e25-0b45-46ed-927e-03bfdd9f7f6a",
    message: "  Jeg er ledig disse dagene.  ",
  });

  assert.equal(result.success, true);
  assert.equal(result.data.message, "Jeg er ledig disse dagene.");
});

test("timesheet validates entries and computes compatible numeric input", () => {
  const result = timesheetFormSchema.safeParse({
    project_name: "Kortfilm",
    employer_name: "Fau&Land Film",
    role_label: "Fotograf",
    period_start: "2026-06-01",
    period_end: "2026-06-02",
    default_rate: "650",
    entries: [
      {
        work_date: "2026-06-01",
        hours: "8",
        rate: "650",
        supplement: "0",
        note: "Dagopptak",
      },
    ],
  });

  assert.equal(result.success, true);
  assert.equal(result.data.entries[0]?.hours, 8);
});
