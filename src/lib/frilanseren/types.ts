export type UserRole = "employer" | "freelancer";

export interface UserMeta {
  id: string;
  role: UserRole;
  full_name: string;
  slug: string | null;
  onboarding_status: string;
  public_status: "private" | "public";
  moderation_status: "pending" | "approved" | "rejected" | "hidden";
  last_seen_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmployerProfile {
  user_id: string;
  company_name: string;
  production_types: string[];
  annual_volume: "1_2" | "3_10" | "10_plus";
  logo_path: string | null;
  slug: string | null;
  company_description: string | null;
  website_url: string | null;
  city: string | null;
  region: string | null;
  is_public: boolean;
  verified_status: "pending" | "approved" | "rejected" | "hidden";
  moderation_status: "pending" | "approved" | "rejected" | "hidden";
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface FreelancerProfile {
  user_id: string;
  roles: string[];
  experience_level: "0_2" | "3_7" | "8_plus";
  profile_image_path: string | null;
  slug: string | null;
  headline: string | null;
  bio: string | null;
  city: string | null;
  region: string | null;
  availability_status: "available" | "busy" | "hidden";
  is_public: boolean;
  is_available: boolean;
  portfolio_links: Array<{ label: string; url: string }>;
  showreel_url: string | null;
  license_tags: string[];
  rate_day: number | null;
  rate_hour: number | null;
  public_contact_mode: string;
  moderation_status: "pending" | "approved" | "rejected" | "hidden";
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConsentLog {
  id: string;
  user_id: string;
  consent_type: string;
  consent_text_version: string;
  ip_address: string | null;
  user_agent: string | null;
  consented_at: string;
}

export type DataRequestType = "access" | "delete";
export type DataRequestStatus = "open" | "processing" | "completed";

export interface DataRequest {
  id: string;
  user_id: string;
  request_type: DataRequestType;
  status: DataRequestStatus;
  created_at: string;
  resolved_at: string | null;
}

export interface AdminAuditLog {
  id: string;
  admin_user_id: string | null;
  action: string;
  target_user_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface FrilanserenActionState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

export interface FrilanserenUserContext {
  userId: string;
  email: string;
  isAdmin: boolean;
  userMeta: UserMeta | null;
  employerProfile: EmployerProfile | null;
  freelancerProfile: FreelancerProfile | null;
  profileImageUrl: string | null;
}

export interface RegisteredUserOverview {
  id: string;
  email: string | null;
  emailConfirmedAt: string | null;
  lastSignInAt: string | null;
  createdAt: string | null;
  role: UserRole | null;
  fullName: string | null;
  companyName: string | null;
  productionTypes: string[];
  annualVolume: EmployerProfile["annual_volume"] | null;
  freelancerRoles: string[];
  experienceLevel: FreelancerProfile["experience_level"] | null;
  deletedAt: string | null;
  imageUrl: string | null;
  imageLabel: string | null;
  hasProfileRecord: boolean;
}
