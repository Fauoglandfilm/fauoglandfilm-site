import { NextResponse, type NextRequest } from "next/server";

import { createMiddlewareClient } from "@/lib/supabase/serverClient";

const protectedPrefixes = ["/frilanseren/dashboard", "/frilanseren/profile"] as const;

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
}

export async function middleware(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  try {
    const { supabase, getResponse } = createMiddlewareClient(request);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return getResponse();
    }
  } catch {
    // Keep protected routes from crashing the whole app if auth config is missing or unavailable.
  }

  const loginUrl = new URL("/frilanseren/login", request.url);
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (nextPath && nextPath.startsWith("/")) {
    loginUrl.searchParams.set("next", nextPath);
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/frilanseren/dashboard/:path*", "/frilanseren/profile/:path*"],
};
