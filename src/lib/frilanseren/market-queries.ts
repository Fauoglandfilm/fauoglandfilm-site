import "server-only";

import { notFound } from "next/navigation";

import { hasSupabaseAdminConfig, hasSupabaseAuthConfig, missingSupabaseEnvs } from "@/lib/env";
import { createAdminClient, createServerComponentClient } from "@/lib/supabase/serverClient";

import { FRILANSEREN_MEDIA_BUCKET } from "./constants";
import { DEFAULT_MARKETPLACE_PAGE_SIZE, MAX_MARKETPLACE_PAGE_SIZE } from "./market-constants";
import {
  mapPublicEmployerRow,
  mapPublicFreelancerRow,
  mapPublicJobRow,
  type EmployerRow,
  type FreelancerRow,
  type JobRow,
} from "./market-mappers";

const MARKETPLACE_READ_TIMEOUT_MS = 1800;

function createMarketplaceReadSignal() {
  return AbortSignal.timeout(MARKETPLACE_READ_TIMEOUT_MS);
}

async function createSignedImageUrl(path: string | null | undefined) {
  if (!path || !hasSupabaseAdminConfig()) {
    return null;
  }

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from(FRILANSEREN_MEDIA_BUCKET)
    .createSignedUrl(path, 60 * 60);

  if (error) {
    console.error("[frilanseren/market-signed-image-url-failed]", {
      path,
      message: error.message,
    });
    return null;
  }

  return data.signedUrl;
}

function clampLimit(limit?: number) {
  if (!limit) {
    return DEFAULT_MARKETPLACE_PAGE_SIZE;
  }

  return Math.min(Math.max(1, limit), MAX_MARKETPLACE_PAGE_SIZE);
}

function sanitizeSearchTerm(value: string | undefined) {
  return value?.trim().replace(/[,%]/g, " ") || undefined;
}

type SupabaseReadError = {
  code?: string;
  message?: string;
};

function isMarketplaceSchemaUnavailable(error: SupabaseReadError) {
  if (!error) {
    return false;
  }

  if (["PGRST200", "PGRST204", "PGRST205", "42P01", "42703"].includes(error.code ?? "")) {
    return true;
  }

  return /schema cache|column .* does not exist|relation .* does not exist|could not find .* table/i.test(
    error.message ?? "",
  );
}

function logMarketplaceSchemaUnavailable(scope: string, error: SupabaseReadError) {
  console.error("[frilanseren/market-schema-unavailable]", {
    scope,
    code: error.code,
    message: error.message,
  });
}

function logMarketplaceReadUnavailable(scope: string, error: unknown) {
  console.error("[frilanseren/market-read-unavailable]", {
    scope,
    message: error instanceof Error ? error.message : String(error),
  });
}

function isNextNavigationSignal(error: unknown) {
  if (!error || typeof error !== "object" || !("digest" in error)) {
    return false;
  }

  return String((error as { digest?: unknown }).digest).startsWith("NEXT_");
}

function canReadMarketplace(scope: string) {
  if (hasSupabaseAuthConfig()) {
    return true;
  }

  console.error("[frilanseren/market-config-unavailable]", {
    scope,
    missing: missingSupabaseEnvs(),
  });
  return false;
}

async function mapFreelancerWithImage(row: FreelancerRow) {
  return {
    ...mapPublicFreelancerRow(row),
    image_url: await createSignedImageUrl(row.profile_image_path),
  };
}

async function mapEmployerWithImage(row: EmployerRow) {
  return {
    ...mapPublicEmployerRow(row),
    image_url: await createSignedImageUrl(row.logo_path),
  };
}

async function getEmployerProfileMap(employerUserIds: string[]) {
  const uniqueIds = Array.from(new Set(employerUserIds));

  if (!uniqueIds.length || !canReadMarketplace("employer-profile-map")) {
    return new Map<string, Pick<EmployerRow, "slug" | "company_name">>();
  }

  try {
    const supabase = await createServerComponentClient();
    const { data, error } = await supabase
      .from("employer_profiles")
      .select("user_id, slug, company_name")
      .in("user_id", uniqueIds)
      .abortSignal(createMarketplaceReadSignal());

    if (error) {
      if (isMarketplaceSchemaUnavailable(error)) {
        logMarketplaceSchemaUnavailable("employer-profile-map", error);
      } else {
        logMarketplaceReadUnavailable("employer-profile-map", error);
      }
      return new Map<string, Pick<EmployerRow, "slug" | "company_name">>();
    }

    return new Map(
      (data ?? []).map((row) => [
        String(row.user_id),
        {
          slug: row.slug,
          company_name: row.company_name,
        },
      ]),
    );
  } catch (error) {
    logMarketplaceReadUnavailable("employer-profile-map", error);
    return new Map<string, Pick<EmployerRow, "slug" | "company_name">>();
  }
}

async function attachEmployerProfiles(rows: JobRow[]) {
  const employerByUserId = await getEmployerProfileMap(rows.map((row) => row.employer_user_id));

  return rows.map((row) => ({
    ...row,
    employer_profiles: employerByUserId.get(row.employer_user_id) ?? null,
  }));
}

export async function listPublicFreelancers(options?: { role?: string; query?: string; limit?: number }) {
  if (!canReadMarketplace("public-freelancers")) {
    return [];
  }

  try {
    const supabase = await createServerComponentClient();
    const searchTerm = sanitizeSearchTerm(options?.query);
    let query = supabase
      .from("freelancer_profiles")
      .select("*, users_meta(full_name)")
      .eq("is_public", true)
      .eq("moderation_status", "approved")
      .order("approved_at", { ascending: false })
      .limit(clampLimit(options?.limit));

    if (options?.role) {
      query = query.contains("roles", [options.role]);
    }

    if (searchTerm) {
      query = query.or(`headline.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,region.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query.abortSignal(createMarketplaceReadSignal());

    if (error) {
      if (isMarketplaceSchemaUnavailable(error)) {
        logMarketplaceSchemaUnavailable("public-freelancers", error);
      } else {
        logMarketplaceReadUnavailable("public-freelancers", error);
      }
      return [];
    }

    return Promise.all((data ?? []).map((row) => mapFreelancerWithImage(row as FreelancerRow)));
  } catch (error) {
    logMarketplaceReadUnavailable("public-freelancers", error);
    return [];
  }
}

export async function getPublicFreelancerBySlug(slug: string) {
  if (!canReadMarketplace("public-freelancer-detail")) {
    notFound();
  }

  try {
    const supabase = await createServerComponentClient();
    const { data, error } = await supabase
      .from("freelancer_profiles")
      .select("*, users_meta(full_name)")
      .eq("slug", slug)
      .eq("is_public", true)
      .eq("moderation_status", "approved")
      .abortSignal(createMarketplaceReadSignal())
      .maybeSingle();

    if (error) {
      if (isMarketplaceSchemaUnavailable(error)) {
        logMarketplaceSchemaUnavailable("public-freelancer-detail", error);
      } else {
        logMarketplaceReadUnavailable("public-freelancer-detail", error);
      }
      notFound();
    }

    if (!data) {
      notFound();
    }

    return mapFreelancerWithImage(data as FreelancerRow);
  } catch (error) {
    if (isNextNavigationSignal(error)) {
      throw error;
    }
    logMarketplaceReadUnavailable("public-freelancer-detail", error);
    notFound();
  }
}

export async function listPublicEmployers(options?: { query?: string; limit?: number }) {
  if (!canReadMarketplace("public-employers")) {
    return [];
  }

  try {
    const supabase = await createServerComponentClient();
    const searchTerm = sanitizeSearchTerm(options?.query);
    let query = supabase
      .from("employer_profiles")
      .select("*, users_meta(full_name)")
      .eq("is_public", true)
      .eq("moderation_status", "approved")
      .order("approved_at", { ascending: false })
      .limit(clampLimit(options?.limit));

    if (searchTerm) {
      query = query.or(`company_name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,region.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query.abortSignal(createMarketplaceReadSignal());

    if (error) {
      if (isMarketplaceSchemaUnavailable(error)) {
        logMarketplaceSchemaUnavailable("public-employers", error);
      } else {
        logMarketplaceReadUnavailable("public-employers", error);
      }
      return [];
    }

    return Promise.all((data ?? []).map((row) => mapEmployerWithImage(row as EmployerRow)));
  } catch (error) {
    logMarketplaceReadUnavailable("public-employers", error);
    return [];
  }
}

export async function getPublicEmployerBySlug(slug: string) {
  if (!canReadMarketplace("public-employer-detail")) {
    notFound();
  }

  try {
    const supabase = await createServerComponentClient();
    const { data, error } = await supabase
      .from("employer_profiles")
      .select("*, users_meta(full_name)")
      .eq("slug", slug)
      .eq("is_public", true)
      .eq("moderation_status", "approved")
      .abortSignal(createMarketplaceReadSignal())
      .maybeSingle();

    if (error) {
      if (isMarketplaceSchemaUnavailable(error)) {
        logMarketplaceSchemaUnavailable("public-employer-detail", error);
      } else {
        logMarketplaceReadUnavailable("public-employer-detail", error);
      }
      notFound();
    }

    if (!data) {
      notFound();
    }

    return mapEmployerWithImage(data as EmployerRow);
  } catch (error) {
    if (isNextNavigationSignal(error)) {
      throw error;
    }
    logMarketplaceReadUnavailable("public-employer-detail", error);
    notFound();
  }
}

export async function listPublicJobs(options?: { role?: string; query?: string; limit?: number }) {
  if (!canReadMarketplace("public-jobs")) {
    return [];
  }

  try {
    const supabase = await createServerComponentClient();
    const searchTerm = sanitizeSearchTerm(options?.query);
    let query = supabase
      .from("jobs")
      .select("*, job_roles(role_tag)")
      .eq("is_public", true)
      .eq("moderation_status", "approved")
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .limit(clampLimit(options?.limit));

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query.abortSignal(createMarketplaceReadSignal());

    if (error) {
      if (isMarketplaceSchemaUnavailable(error)) {
        logMarketplaceSchemaUnavailable("public-jobs", error);
      } else {
        logMarketplaceReadUnavailable("public-jobs", error);
      }
      return [];
    }

    const rows = await attachEmployerProfiles((data ?? []) as JobRow[]);
    const jobs = rows.map(mapPublicJobRow);

    if (!options?.role) {
      return jobs;
    }

    return jobs.filter((job) => job.role_tags.includes(options.role as string));
  } catch (error) {
    logMarketplaceReadUnavailable("public-jobs", error);
    return [];
  }
}

export async function getPublicJobBySlug(slug: string) {
  if (!canReadMarketplace("public-job-detail")) {
    notFound();
  }

  try {
    const supabase = await createServerComponentClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*, job_roles(role_tag)")
      .eq("slug", slug)
      .eq("is_public", true)
      .eq("moderation_status", "approved")
      .eq("status", "open")
      .abortSignal(createMarketplaceReadSignal())
      .maybeSingle();

    if (error) {
      if (isMarketplaceSchemaUnavailable(error)) {
        logMarketplaceSchemaUnavailable("public-job-detail", error);
      } else {
        logMarketplaceReadUnavailable("public-job-detail", error);
      }
      notFound();
    }

    if (!data) {
      notFound();
    }

    const [row] = await attachEmployerProfiles([data as JobRow]);
    return mapPublicJobRow(row);
  } catch (error) {
    if (isNextNavigationSignal(error)) {
      throw error;
    }
    logMarketplaceReadUnavailable("public-job-detail", error);
    notFound();
  }
}

export async function listPendingFreelancerProfilesForAdmin() {
  if (!hasSupabaseAdminConfig()) {
    return [];
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("freelancer_profiles")
    .select("*, users_meta(full_name)")
    .eq("is_public", true)
    .eq("moderation_status", "pending")
    .order("updated_at", { ascending: false });

  if (error) {
    if (isMarketplaceSchemaUnavailable(error)) {
      logMarketplaceSchemaUnavailable("admin-pending-freelancers", error);
      return [];
    }

    throw error;
  }

  return data ?? [];
}

export async function listPendingEmployerProfilesForAdmin() {
  if (!hasSupabaseAdminConfig()) {
    return [];
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("employer_profiles")
    .select("*, users_meta(full_name)")
    .eq("is_public", true)
    .eq("moderation_status", "pending")
    .order("updated_at", { ascending: false });

  if (error) {
    if (isMarketplaceSchemaUnavailable(error)) {
      logMarketplaceSchemaUnavailable("admin-pending-employers", error);
      return [];
    }

    throw error;
  }

  return data ?? [];
}

export async function listPendingJobsForAdmin() {
  if (!hasSupabaseAdminConfig()) {
    return [];
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("jobs")
    .select("*, job_roles(role_tag)")
    .eq("is_public", true)
    .eq("moderation_status", "pending")
    .order("updated_at", { ascending: false });

  if (error) {
    if (isMarketplaceSchemaUnavailable(error)) {
      logMarketplaceSchemaUnavailable("admin-pending-jobs", error);
      return [];
    }

    throw error;
  }

  const rows = await attachEmployerProfiles((data ?? []) as JobRow[]);
  return rows.map(mapPublicJobRow);
}

export async function listModerationReportsForAdmin() {
  if (!hasSupabaseAdminConfig()) {
    return [];
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("moderation_reports")
    .select("*")
    .in("status", ["open", "reviewing"])
    .order("created_at", { ascending: false });

  if (error) {
    if (isMarketplaceSchemaUnavailable(error)) {
      logMarketplaceSchemaUnavailable("admin-moderation-reports", error);
      return [];
    }

    throw error;
  }

  return data ?? [];
}
