"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerComponentClient } from "@/lib/supabase/serverClient";

import { contactRequestSchema, jobApplicationSchema, jobFormSchema, timesheetFormSchema } from "./market-validation";
import { calculateTimesheetTotals } from "./timesheet";
import { requireAdminUser, requireCurrentUserContext } from "./queries";
import { buildUniqueSlug } from "./slug";
import type { FrilanserenActionState } from "./types";

function fieldErrorsFromIssues(issues: Array<{ path: PropertyKey[]; message: string }>) {
  return Object.fromEntries(issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]));
}

function formArray(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => String(value).trim())
    .filter(Boolean);
}

function zipTimesheetEntries(formData: FormData) {
  const dates = formData.getAll("work_date");
  const hours = formData.getAll("hours");
  const rates = formData.getAll("rate");
  const supplements = formData.getAll("supplement");
  const notes = formData.getAll("note");

  return dates
    .map((workDate, index) => ({
      work_date: String(workDate).trim(),
      hours: hours[index] ?? "",
      rate: rates[index] ?? "",
      supplement: supplements[index] ?? "0",
      note: notes[index] ?? "",
    }))
    .filter((entry) => String(entry.work_date).trim() && String(entry.hours).trim());
}

export async function createJobAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();

  if (context.userMeta?.role !== "employer") {
    return { status: "error", message: "Du må ha arbeidsgiverkonto for å legge ut jobb." };
  }

  const payload = jobFormSchema.safeParse({
    title: formData.get("title"),
    production_type: formData.get("production_type") || undefined,
    description: formData.get("description"),
    location: formData.get("location"),
    region: formData.get("region"),
    starts_on: formData.get("starts_on"),
    ends_on: formData.get("ends_on"),
    application_deadline: formData.get("application_deadline"),
    compensation_label: formData.get("compensation_label"),
    rate_amount: formData.get("rate_amount"),
    rate_unit: formData.get("rate_unit"),
    role_tags: formArray(formData, "role_tags"),
    is_public: formData.get("is_public") === "on",
  });

  if (!payload.success) {
    return { status: "error", fieldErrors: fieldErrorsFromIssues(payload.error.issues) };
  }

  const supabase = await createServerComponentClient();
  const { data: existingJobs } = await supabase.from("jobs").select("slug");
  const slug = buildUniqueSlug(payload.data.title, new Set((existingJobs ?? []).map((job) => String(job.slug))));

  const { data: job, error } = await supabase
    .from("jobs")
    .insert({
      employer_user_id: context.userId,
      title: payload.data.title,
      slug,
      production_type: payload.data.production_type ?? null,
      description: payload.data.description,
      location: payload.data.location || null,
      region: payload.data.region || null,
      starts_on: payload.data.starts_on || null,
      ends_on: payload.data.ends_on || null,
      application_deadline: payload.data.application_deadline || null,
      compensation_label: payload.data.compensation_label || null,
      rate_amount: payload.data.rate_amount,
      rate_unit: payload.data.rate_unit,
      is_public: payload.data.is_public,
      status: payload.data.is_public ? "open" : "draft",
      moderation_status: "pending",
    })
    .select("id")
    .single();

  if (error || !job) {
    return { status: "error", message: "Vi kunne ikke lagre jobben akkurat nå." };
  }

  const { error: roleError } = await supabase.from("job_roles").insert(
    payload.data.role_tags.map((role_tag) => ({
      job_id: job.id,
      role_tag,
    })),
  );

  if (roleError) {
    return { status: "error", message: "Jobben ble lagret, men rollene kunne ikke lagres." };
  }

  redirect(`/frilanseren/dashboard/jobber?created=${job.id}`);
}

export async function applyToJobAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();

  if (context.userMeta?.role !== "freelancer") {
    return { status: "error", message: "Du må ha frilanskonto for å melde interesse." };
  }

  const payload = jobApplicationSchema.safeParse({
    job_id: formData.get("job_id"),
    message: formData.get("message") ?? "",
  });

  if (!payload.success) {
    return { status: "error", fieldErrors: fieldErrorsFromIssues(payload.error.issues) };
  }

  const supabase = await createServerComponentClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("id, status")
    .eq("id", payload.data.job_id)
    .eq("is_public", true)
    .eq("moderation_status", "approved")
    .maybeSingle();

  if (!job || job.status !== "open") {
    return { status: "error", message: "Denne jobben er ikke åpen for interesse akkurat nå." };
  }

  const { error } = await supabase.from("job_applications").insert({
    job_id: payload.data.job_id,
    freelancer_user_id: context.userId,
    message: payload.data.message,
  });

  if (error) {
    if (error.code === "23505") {
      return { status: "error", message: "Du har allerede meldt interesse for denne jobben." };
    }

    return { status: "error", message: "Vi kunne ikke registrere interessen akkurat nå." };
  }

  return { status: "success", message: "Interessen er registrert." };
}

export async function requestContactAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();
  const payload = contactRequestSchema.safeParse({
    target_user_id: formData.get("target_user_id"),
    job_id: formData.get("job_id") ?? "",
    message: formData.get("message"),
  });

  if (!payload.success) {
    return { status: "error", fieldErrors: fieldErrorsFromIssues(payload.error.issues) };
  }

  const supabase = await createServerComponentClient();
  const { error } = await supabase.from("contact_requests").insert({
    requester_user_id: context.userId,
    target_user_id: payload.data.target_user_id,
    job_id: payload.data.job_id,
    message: payload.data.message,
  });

  if (error) {
    return { status: "error", message: "Vi kunne ikke sende kontaktforespørselen akkurat nå." };
  }

  return { status: "success", message: "Kontaktforespørselen er sendt." };
}

export async function saveTimesheetAction(
  _previousState: FrilanserenActionState,
  formData: FormData,
): Promise<FrilanserenActionState> {
  const context = await requireCurrentUserContext();
  const payload = timesheetFormSchema.safeParse({
    project_name: formData.get("project_name"),
    employer_name: formData.get("employer_name"),
    role_label: formData.get("role_label"),
    period_start: formData.get("period_start"),
    period_end: formData.get("period_end"),
    default_rate: formData.get("default_rate"),
    entries: zipTimesheetEntries(formData),
  });

  if (!payload.success) {
    return { status: "error", fieldErrors: fieldErrorsFromIssues(payload.error.issues) };
  }

  const totals = calculateTimesheetTotals(payload.data.entries);
  const supabase = await createServerComponentClient();
  const { data: timesheet, error } = await supabase
    .from("timesheets")
    .insert({
      owner_user_id: context.userId,
      project_name: payload.data.project_name,
      employer_name: payload.data.employer_name,
      role_label: payload.data.role_label,
      period_start: payload.data.period_start || null,
      period_end: payload.data.period_end || null,
      default_rate: payload.data.default_rate,
      total_hours: totals.totalHours,
      total_amount: totals.totalAmount,
    })
    .select("id")
    .single();

  if (error || !timesheet) {
    return { status: "error", message: "Vi kunne ikke lagre timelisten akkurat nå." };
  }

  const { error: entriesError } = await supabase.from("timesheet_entries").insert(
    totals.entries.map((entry) => ({
      timesheet_id: timesheet.id,
      work_date: entry.work_date,
      hours: entry.hours,
      rate: entry.rate,
      supplement: entry.supplement,
      note: entry.note || null,
      line_total: entry.lineTotal,
    })),
  );

  if (entriesError) {
    return { status: "error", message: "Timelisten ble opprettet, men linjene kunne ikke lagres." };
  }

  redirect(`/frilanseren/dashboard/timelister?saved=${timesheet.id}`);
}

async function requireAdminSupabase() {
  await requireAdminUser();
  return createServerComponentClient();
}

function revalidateAdminModeration() {
  revalidatePath("/frilanseren/admin");
  revalidatePath("/frilanseren");
}

export async function approveFreelancerProfileAction(formData: FormData) {
  const supabase = await requireAdminSupabase();
  const userId = String(formData.get("user_id") ?? "");
  const timestamp = new Date().toISOString();

  await supabase
    .from("freelancer_profiles")
    .update({
      moderation_status: "approved",
      is_public: true,
      approved_at: timestamp,
    })
    .eq("user_id", userId);
  revalidateAdminModeration();
}

export async function hideFreelancerProfileAction(formData: FormData) {
  const supabase = await requireAdminSupabase();
  const userId = String(formData.get("user_id") ?? "");

  await supabase.from("freelancer_profiles").update({ moderation_status: "hidden" }).eq("user_id", userId);
  revalidateAdminModeration();
}

export async function approveEmployerProfileAction(formData: FormData) {
  const supabase = await requireAdminSupabase();
  const userId = String(formData.get("user_id") ?? "");
  const timestamp = new Date().toISOString();

  await supabase
    .from("employer_profiles")
    .update({
      moderation_status: "approved",
      verified_status: "approved",
      is_public: true,
      approved_at: timestamp,
    })
    .eq("user_id", userId);
  revalidateAdminModeration();
}

export async function hideEmployerProfileAction(formData: FormData) {
  const supabase = await requireAdminSupabase();
  const userId = String(formData.get("user_id") ?? "");

  await supabase
    .from("employer_profiles")
    .update({ moderation_status: "hidden", verified_status: "hidden" })
    .eq("user_id", userId);
  revalidateAdminModeration();
}

export async function approveJobAction(formData: FormData) {
  const supabase = await requireAdminSupabase();
  const jobId = String(formData.get("job_id") ?? "");

  await supabase
    .from("jobs")
    .update({
      moderation_status: "approved",
      is_public: true,
      status: "open",
    })
    .eq("id", jobId);
  revalidateAdminModeration();
}

export async function hideJobAction(formData: FormData) {
  const supabase = await requireAdminSupabase();
  const jobId = String(formData.get("job_id") ?? "");

  await supabase.from("jobs").update({ moderation_status: "hidden" }).eq("id", jobId);
  revalidateAdminModeration();
}
