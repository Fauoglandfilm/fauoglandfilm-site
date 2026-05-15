import {
  APPLICATION_STATUSES,
  AVAILABILITY_STATUSES,
  CONTACT_REQUEST_STATUSES,
  JOB_STATUSES,
  MARKETPLACE_MODERATION_STATUSES,
  RATE_UNITS,
  TIMESHEET_STATUSES,
} from "./market-constants";
import type { EmployerProfile, FreelancerProfile, UserRole } from "./types";

export type ModerationStatus = (typeof MARKETPLACE_MODERATION_STATUSES)[number];
export type PublicVisibilityStatus = "private" | "public";
export type AvailabilityStatus = (typeof AVAILABILITY_STATUSES)[number];
export type JobStatus = (typeof JOB_STATUSES)[number];
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type ContactRequestStatus = (typeof CONTACT_REQUEST_STATUSES)[number];
export type TimesheetStatus = (typeof TIMESHEET_STATUSES)[number];
export type RateUnit = (typeof RATE_UNITS)[number];

export type PortfolioLink = {
  label: string;
  url: string;
};

export type PublicFreelancerProfile = Pick<
  FreelancerProfile,
  "user_id" | "roles" | "experience_level" | "profile_image_path"
> & {
  slug: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
  city: string | null;
  region: string | null;
  availability_status: AvailabilityStatus;
  is_public: boolean;
  is_available: boolean;
  portfolio_links: PortfolioLink[];
  showreel_url: string | null;
  license_tags: string[];
  rate_day: number | null;
  rate_hour: number | null;
  approved_at: string | null;
  image_url: string | null;
};

export type PublicEmployerProfile = Pick<
  EmployerProfile,
  "user_id" | "company_name" | "production_types" | "annual_volume" | "logo_path"
> & {
  slug: string;
  full_name: string;
  company_description: string | null;
  website_url: string | null;
  city: string | null;
  region: string | null;
  is_public: boolean;
  verified_status: ModerationStatus;
  approved_at: string | null;
  image_url: string | null;
};

export type PublicJob = {
  id: string;
  employer_user_id: string;
  employer_slug: string | null;
  employer_name: string;
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
  rate_unit: RateUnit | null;
  status: JobStatus;
  role_tags: string[];
  created_at: string;
};

export type JobApplication = {
  id: string;
  job_id: string;
  freelancer_user_id: string;
  message: string | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
};

export type ContactRequest = {
  id: string;
  requester_user_id: string;
  target_user_id: string;
  job_id: string | null;
  message: string | null;
  status: ContactRequestStatus;
  created_at: string;
  updated_at: string;
};

export type TimesheetEntryInput = {
  work_date: string;
  hours: number;
  rate: number;
  supplement: number;
  note?: string;
};

export type TimesheetExportModel = {
  title: string;
  freelancerName: string;
  employerName: string;
  projectName: string;
  role: string;
  periodLabel: string;
  entries: Array<TimesheetEntryInput & { lineTotal: number }>;
  totalHours: number;
  totalAmount: number;
  disclaimer: string;
};

export type ProfileOwnerRole = Extract<UserRole, "employer" | "freelancer">;
