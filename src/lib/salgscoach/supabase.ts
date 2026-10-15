import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { getSalgscoachSupabaseConfig } from "./config";

const cookieOptions = {
  name: "salgscoach-session",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/salgscoach",
};

function requiredConfig() {
  const config = getSalgscoachSupabaseConfig();
  if (!config) throw new Error("Salgscoach database is not configured.");
  return config;
}

export async function createSalgscoachServerClient() {
  const config = requiredConfig();
  const cookieStore = await cookies();
  return createServerClient(config.url, config.key, {
    cookieOptions,
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components are read-only; the proxy persists token refreshes.
        }
      },
    },
  });
}

export function createSalgscoachProxyClient(request: NextRequest) {
  const config = requiredConfig();
  let response = NextResponse.next({ request: { headers: request.headers } });
  const supabase = createServerClient(config.url, config.key, {
    cookieOptions,
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request: { headers: request.headers } });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  return { supabase, getResponse: () => response };
}
