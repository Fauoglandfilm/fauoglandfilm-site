export type UserRole = "employer" | "freelancer";

export interface UserMeta {
  id: string;
  role: UserRole;
  full_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmployerProfile {
  user_id: string;
  company_name: string;
  production_types: string[];
  annual_volume: "1_2" | "3_10" | "10_plus";
  created_at: string;
  updated_at: string;
}

export interface FreelancerProfile {
  user_id: string;
  roles: string[];
  experience_level: "0_2" | "3_7" | "8_plus";
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
  userMeta: UserMeta | null;
  employerProfile: EmployerProfile | null;
  freelancerProfile: FreelancerProfile | null;
}
