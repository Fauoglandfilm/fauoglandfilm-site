import { NextResponse } from "next/server";
import { kulturarenaClient } from "@/lib/kulturarena/server";
import { sameOrigin } from "@/lib/kulturarena/policy";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return new NextResponse("Forbidden", { status: 403 });
  try {
    const client = await kulturarenaClient();
    await client.auth.signOut({ scope: "local" });
  } catch {
    // Expire only this product's session even if its provider is offline.
  }
  const response = NextResponse.redirect(new URL("/kulturarena/login", request.url), 303);
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  jar.getAll().filter((c) => c.name === "ka-auth" || c.name.startsWith("ka-auth.")).forEach((c) => response.cookies.set(c.name, "", { path: "/kulturarena", maxAge: 0, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" }));
  return response;
}
