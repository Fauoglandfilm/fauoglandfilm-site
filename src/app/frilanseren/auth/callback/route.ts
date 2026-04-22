import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

import { hasSupabaseAuthConfig } from "@/lib/env";

/**
 * OAuth / PKCE callback for Frilanseren.
 *
 * Supabase redirects here after the user clicks a confirmation link or returns
 * from an OAuth provider. We accept:
 *   - ?code=...                → exchangeCodeForSession(code)
 *   - ?token_hash=...&type=... → verifyOtp({ token_hash, type })  (fallback)
 *
 * On success → /frilanseren/dashboard (or safe ?next=/...).
 * On any failure → /frilanseren/login?error=auth_failed.
 */

const DEFAULT_NEXT = "/frilanseren/dashboard";
const FAILURE_REDIRECT = "/frilanseren/login?error=auth_failed";

function safeNextPath(raw: string | null): string {
  if (!raw) return DEFAULT_NEXT;
  if (!raw.startsWith("/") || raw.startsWith("//")) return DEFAULT_NEXT;
  return raw;
}

function requireEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
  const value = process.env[name];
  if (!value) throw new Error(`Manglende miljøvariabel: ${name}`);
  return value;
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const next = safeNextPath(requestUrl.searchParams.get("next"));
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const errorParam = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  const failure = NextResponse.redirect(new URL(FAILURE_REDIRECT, request.url));

  if (errorParam) {
    console.error("[FRILANSEREN_AUTH_CALLBACK] provider returned error", {
      error: errorParam,
      description: errorDescription,
    });
    return failure;
  }

  if (!hasSupabaseAuthConfig()) {
    console.error("[FRILANSEREN_AUTH_CALLBACK] supabase auth config missing");
    return failure;
  }

  if (!code && (!tokenHash || !type)) {
    console.error("[FRILANSEREN_AUTH_CALLBACK] missing code/token_hash — nothing to verify");
    return failure;
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
        console.error("[FRILANSEREN_AUTH_CALLBACK] exchangeCodeForSession failed", {
          message: error.message,
          status: error.status,
        });
        return failure;
      }
      console.log("[FRILANSEREN_AUTH_CALLBACK] exchangeCodeForSession ok", { next });
      return success;
    }

    if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as "email" | "recovery" | "invite" | "magiclink",
      });
      if (error) {
        console.error("[FRILANSEREN_AUTH_CALLBACK] verifyOtp failed", {
          type,
          message: error.message,
          status: error.status,
        });
        return failure;
      }
      console.log("[FRILANSEREN_AUTH_CALLBACK] verifyOtp ok", { type, next });
      return success;
    }
  } catch (error) {
    console.error("[FRILANSEREN_AUTH_CALLBACK] threw", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return failure;
  }

  return failure;
}
