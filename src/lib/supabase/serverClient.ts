import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookiesForScope, cookieOptionsForScope, type AuthCookieScope } from "./cookie-scope";

function requiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY" | "SUPABASE_SERVICE_ROLE_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Manglende miljøvariabel: ${name}`);
  }

  return value;
}

type Connection = { url: string; key: string };

export async function createServerComponentClient(scope?: AuthCookieScope, connection?: Connection) {
  const cookieStore = await cookies();

  return createServerClient(
    connection?.url ?? requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    connection?.key ?? requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      ...(scope ? { cookieOptions: { name: scope.name, path: scope.path, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const } } : {}),
      cookies: {
        getAll() {
          return cookiesForScope(cookieStore.getAll(), scope);
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, cookieOptionsForScope(options, scope, process.env.NODE_ENV === "production"));
            });
          } catch {
            // Server Components may be read-only. Middleware and Server Actions handle persistence.
          }
        },
      },
    },
  );
}

export function createProxyClient(request: NextRequest, scope?: AuthCookieScope) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      ...(scope ? { cookieOptions: { name: scope.name, ...cookieOptionsForScope({}, scope, process.env.NODE_ENV === "production") } } : {}),
      cookies: {
        getAll() {
          return cookiesForScope(request.cookies.getAll(), scope);
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, cookieOptionsForScope(options, scope, process.env.NODE_ENV === "production"));
          });
        },
      },
    },
  );

  return {
    supabase,
    getResponse() {
      return response;
    },
  };
}

export function createAdminClient(connection?: Connection) {
  return createSupabaseClient(
    connection?.url ?? requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    connection?.key ?? requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
