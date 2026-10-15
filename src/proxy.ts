import { NextResponse, type NextRequest } from "next/server";

import { createProxyClient } from "@/lib/supabase/serverClient";
import { createSalgscoachProxyClient } from "@/lib/salgscoach/supabase";

const protectedPrefixes = [
  "/frilanseren/dashboard",
  "/frilanseren/profile",
  "/frilanseren/admin",
  "/odysseus",
  "/salgscoach",
] as const;

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname === "/odysseus/login" ||
    pathname === "/odysseus/forgot-password" ||
    pathname === "/salgscoach/login"
  ) {
    return NextResponse.next();
  }
  const isProtected = isProtectedPath(pathname);

  if (!isProtected) {
    return NextResponse.next();
  }

  try {
    const { supabase, getResponse } = pathname === "/salgscoach" || pathname.startsWith("/salgscoach/")
      ? createSalgscoachProxyClient(request)
      : createProxyClient(request);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return getResponse();
    }
  } catch (error) {
    console.error("[PRIVATE_PORTAL_PROXY] threw", {
      path: pathname,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    });
    // Fail closed to the correct login route instead of returning a blind 500.
  }

  const loginUrl = new URL(
    pathname.startsWith("/odysseus")
      ? "/odysseus/login"
      : pathname.startsWith("/salgscoach")
        ? "/salgscoach/login"
        : "/frilanseren/login",
    request.url,
  );
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (nextPath && nextPath.startsWith("/")) {
    loginUrl.searchParams.set("next", nextPath);
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/frilanseren/dashboard/:path*",
    "/frilanseren/profile/:path*",
    "/frilanseren/admin/:path*",
    "/odysseus/:path*",
    "/salgscoach/:path*",
  ],
};
