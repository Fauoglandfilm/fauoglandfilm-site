import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

import { hasSupabaseAuthConfig } from "@/lib/env";
import { safeRedirectPath } from "@/lib/safe-redirect";

const DEFAULT_NEXT = "/frilanseren/dashboard";
const FAILURE_REDIRECT = "/frilanseren/login?error=auth_failed";

function requireEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
  const value = process.env[name];
  if (!value) throw new Error(`Manglende miljøvariabel: ${name}`);
  return value;
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const next = safeRedirectPath(requestUrl.searchParams.get("next"), DEFAULT_NEXT);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const code = requestUrl.searchParams.get("code");

  const failure = NextResponse.redirect(new URL(FAILURE_REDIRECT, request.url));

  if (!hasSupabaseAuthConfig()) {
    console.error("[AUTH_CONFIRM] supabase auth config missing — redirecting to failure");
    return failure;
  }

  // No params at all → nothing to verify, just bounce to next (safe default).
  if (!code && (!tokenHash || !type)) {
    return NextResponse.redirect(new URL(next, request.url));
  }

  const success = NextResponse.redirect(new URL(next, request.url));

  const supabase = createServerClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            success.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  try {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("[AUTH_CONFIRM] exchangeCodeForSession failed", {
          message: error.message,
          status: error.status,
        });
        return failure;
      }
      console.log("[AUTH_CONFIRM] exchangeCodeForSession ok", { next });
      return success;
    }

    if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as "email" | "recovery" | "invite" | "magiclink",
      });
      if (error) {
        console.error("[AUTH_CONFIRM] verifyOtp failed", {
          type,
          message: error.message,
          status: error.status,
        });
        return failure;
      }
      console.log("[AUTH_CONFIRM] verifyOtp ok", { type, next });
      return success;
    }
  } catch (error) {
    console.error("[AUTH_CONFIRM] threw", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return failure;
  }

  return failure;
}
