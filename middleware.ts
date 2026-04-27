import { NextResponse, type NextRequest } from "next/server";

import { createMiddlewareClient } from "@/lib/supabase/serverClient";

const protectedPrefixes = ["/frilanseren/dashboard", "/frilanseren/profile", "/frilanseren/admin"] as const;

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = isProtectedPath(pathname);

  if (!isProtected) {
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
  } catch (error) {
    console.error("[FRILANSEREN_MIDDLEWARE] threw", {
      path: pathname,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    });
    // Fall through to login redirect so we never return a blind 500 from middleware.
  }

  const loginUrl = new URL("/frilanseren/login", request.url);
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (nextPath && nextPath.startsWith("/")) {
    loginUrl.searchParams.set("next", nextPath);
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/frilanseren/dashboard/:path*", "/frilanseren/profile/:path*", "/frilanseren/admin/:path*"],
};
