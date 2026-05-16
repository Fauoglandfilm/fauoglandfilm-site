import assert from "node:assert/strict";
import { test } from "node:test";

import {
  mapPublicFreelancerRow,
  mapPublicJobRow,
  publicProfileFilter,
} from "./market-mappers";

test("publicProfileFilter only allows public approved rows", () => {
  assert.equal(publicProfileFilter({ is_public: true, moderation_status: "approved" }), true);
  assert.equal(publicProfileFilter({ is_public: false, moderation_status: "approved" }), false);
  assert.equal(publicProfileFilter({ is_public: true, moderation_status: "pending" }), false);
});

test("mapPublicFreelancerRow removes private email-like data", () => {
  const mapped = mapPublicFreelancerRow({
    user_id: "user-1",
    slug: "ada-foto",
    roles: ["foto"],
    experience_level: "3_7",
    profile_image_path: "user-1/profile.webp",
    headline: "Filmfotograf",
    bio: "Dokumentar og reklame.",
    city: "Oslo",
    region: "Oslo",
    availability_status: "available",
    is_public: true,
    is_available: true,
    portfolio_links: [{ label: "Vimeo", url: "https://vimeo.com/example" }],
    showreel_url: "https://vimeo.com/showreel",
    license_tags: ["B"],
    rate_day: 6500,
    rate_hour: 850,
    approved_at: "2026-05-15T10:00:00.000Z",
    users_meta: { full_name: "Ada Foto", email: "ada@example.com" } as { full_name: string },
  });

  assert.equal(mapped.full_name, "Ada Foto");
  assert.equal("email" in mapped, false);
  assert.equal(mapped.image_url, null);
});

test("mapPublicJobRow flattens role tags", () => {
  const mapped = mapPublicJobRow({
    id: "job-1",
    employer_user_id: "employer-1",
    title: "Fotograf til reklamefilm",
    slug: "fotograf-reklamefilm",
    production_type: "reklame",
    description: "Vi trenger fotograf.",
    location: "Oslo",
    region: "Oslo",
    starts_on: "2026-06-01",
    ends_on: "2026-06-03",
    application_deadline: "2026-05-25",
    compensation_label: "Etter avtale",
    rate_amount: 6500,
    rate_unit: "day",
    status: "open",
    created_at: "2026-05-15T10:00:00.000Z",
    employer_profiles: { slug: "fau-land", company_name: "Fau&Land Film" },
    job_roles: [{ role_tag: "foto" }, { role_tag: "lys" }],
  });

  assert.deepEqual(mapped.role_tags, ["foto", "lys"]);
  assert.equal(mapped.employer_name, "Fau&Land Film");
});
