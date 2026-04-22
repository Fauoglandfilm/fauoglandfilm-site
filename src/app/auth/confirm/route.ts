import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

function requiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Manglende miljøvariabel: ${name}`);
  }

  return value;
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const next = requestUrl.searchParams.get("next") ?? "/frilanseren/dashboard";
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");

  const redirectUrl = new URL(next, request.url);
  const response = NextResponse.redirect(redirectUrl);

  if (!tokenHash || !type) {
    return response;
  }

  const supabase = createServerClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: type as "email" | "recovery",
  });

  return response;
}
