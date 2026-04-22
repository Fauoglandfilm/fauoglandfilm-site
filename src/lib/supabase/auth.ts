import "server-only";

import { headers } from "next/headers";

import { createServerComponentClient } from "./serverClient";

function getBaseUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredSiteUrl) {
    return configuredSiteUrl.endsWith("/") ? configuredSiteUrl.slice(0, -1) : configuredSiteUrl;
  }

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
