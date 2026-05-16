import type { PublicEmployerProfile, PublicFreelancerProfile, PublicJob } from "./market-types";

export type PublicStatusRow = {
  is_public: boolean;
  moderation_status: string;
};

export function publicProfileFilter(row: PublicStatusRow) {
  return row.is_public === true && row.moderation_status === "approved";
}

export type FreelancerRow = {
  user_id: string;
  slug: string;
  roles: string[];
  experience_level: "0_2" | "3_7" | "8_plus";
  profile_image_path: string | null;
  headline: string | null;
  bio: string | null;
  city: string | null;
  region: string | null;
  availability_status: "available" | "busy" | "hidden";
  is_public: boolean;
  is_available: boolean;
  portfolio_links: unknown;
  showreel_url: string | null;
  license_tags: string[];
  rate_day: number | null;
  rate_hour: number | null;
  approved_at: string | null;
  users_meta?: {
    full_name?: string | null;
  } | null;
};

export function mapPublicFreelancerRow(row: FreelancerRow): PublicFreelancerProfile {
  return {
    user_id: row.user_id,
    slug: row.slug,
    full_name: row.users_meta?.full_name ?? "Frilanser",
    roles: row.roles ?? [],
    experience_level: row.experience_level,
    profile_image_path: row.profile_image_path,
    headline: row.headline,
    bio: row.bio,
    city: row.city,
    region: row.region,
    availability_status: row.availability_status,
    is_public: row.is_public,
    is_available: row.is_available,
    portfolio_links: Array.isArray(row.portfolio_links)
      ? (row.portfolio_links as PublicFreelancerProfile["portfolio_links"])
      : [],
    showreel_url: row.showreel_url,
    license_tags: row.license_tags ?? [],
    rate_day: row.rate_day,
    rate_hour: row.rate_hour,
    approved_at: row.approved_at,
    image_url: null,
  };
}

export type EmployerRow = {
  user_id: string;
  slug: string;
  company_name: string;
  production_types: string[];
  annual_volume: "1_2" | "3_10" | "10_plus";
  logo_path: string | null;
  company_description: string | null;
  website_url: string | null;
  city: string | null;
  region: string | null;
  is_public: boolean;
  verified_status: "pending" | "approved" | "rejected" | "hidden";
  approved_at: string | null;
  users_meta?: {
    full_name?: string | null;
  } | null;
};

export function mapPublicEmployerRow(row: EmployerRow): PublicEmployerProfile {
  return {
    user_id: row.user_id,
    slug: row.slug,
    full_name: row.users_meta?.full_name ?? row.company_name,
    company_name: row.company_name,
    production_types: row.production_types ?? [],
    annual_volume: row.annual_volume,
    logo_path: row.logo_path,
    company_description: row.company_description,
    website_url: row.website_url,
    city: row.city,
    region: row.region,
    is_public: row.is_public,
    verified_status: row.verified_status,
    approved_at: row.approved_at,
    image_url: null,
  };
}

export type JobRow = {
  id: string;
  employer_user_id: string;
  title: string;
  slug: string;
  production_type: string | null;
  description: string;
  location: string | null;
  region: string | null;
  starts_on: string | null;
  ends_on: string | null;
  application_deadline: string | null;
  compensation_label: string | null;
  rate_amount: number | null;
  rate_unit: "hour" | "day" | "project" | null;
  status: "draft" | "open" | "filled" | "closed" | "archived";
  created_at: string;
  employer_profiles?: {
    slug?: string | null;
    company_name?: string | null;
  } | null;
  job_roles?: Array<{
    role_tag: string;
  }> | null;
};

export function mapPublicJobRow(row: JobRow): PublicJob {
  return {
    id: row.id,
    employer_user_id: row.employer_user_id,
    employer_slug: row.employer_profiles?.slug ?? null,
    employer_name: row.employer_profiles?.company_name ?? "Arbeidsgiver",
    title: row.title,
    slug: row.slug,
    production_type: row.production_type,
    description: row.description,
    location: row.location,
    region: row.region,
    starts_on: row.starts_on,
    ends_on: row.ends_on,
    application_deadline: row.application_deadline,
    compensation_label: row.compensation_label,
    rate_amount: row.rate_amount,
    rate_unit: row.rate_unit,
    status: row.status,
    role_tags: row.job_roles?.map((role) => role.role_tag) ?? [],
    created_at: row.created_at,
  };
}
