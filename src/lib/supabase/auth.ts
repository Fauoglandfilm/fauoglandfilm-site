import "server-only";

import { headers } from "next/headers";

import { createServerComponentClient } from "./serverClient";

function normalizeUrl(value: string | undefined | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withScheme.endsWith("/") ? withScheme.slice(0, -1) : withScheme;
}

/**
 * Resolve the canonical base URL for emails and redirects.
 *
 * Fallback chain (strongest → weakest):
 *   1. NEXT_PUBLIC_SITE_URL              — explicit prod config, we own this
 *   2. VERCEL_PROJECT_PRODUCTION_URL     — stable prod domain on Vercel
 *   3. VERCEL_URL                        — current deployment URL on Vercel
 *   4. http://localhost:3000             — dev only
 *
 * This ensures Supabase confirmation emails NEVER contain "localhost" in prod,
 * even if NEXT_PUBLIC_SITE_URL was forgotten on Vercel.
 */
function getBaseUrl() {
  const fromEnv = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromEnv) return fromEnv;

  const fromVercelProd = normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (fromVercelProd) return fromVercelProd;

  const fromVercel = normalizeUrl(process.env.VERCEL_URL);
  if (fromVercel) return fromVercel;

  return "http://localhost:3000";
}

export function absoluteAuthUrl(path: string) {
  return `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function getUser() {
  const supabase = await createServerComponentClient();
  return supabase.auth.getUser();
}

export async function getSession() {
  const supabase = await createServerComponentClient();
  return supabase.auth.getSession();
}

export async function getRequestMetadata() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");

  return {
    ipAddress: forwardedFor?.split(",")[0]?.trim() ?? null,
    userAgent: headerList.get("user-agent"),
  };
}
