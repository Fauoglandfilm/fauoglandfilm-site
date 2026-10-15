import { NextResponse } from "next/server";
import { hasKulturarenaAuthConfig, kulturarenaClient } from "@/lib/kulturarena/server";
import { BodyTooLarge, readLimitedBody, sameOrigin } from "@/lib/kulturarena/policy";
import { authorizedKulturarenaMember, kulturarenaMembers, resolveKulturarenaLogin } from "@/lib/kulturarena/access";

export const dynamic = "force-dynamic";

function denied(request: Request, reason = "invalid") {
  const url = new URL("/kulturarena/login", request.url);
  url.searchParams.set("error", reason);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return new NextResponse("Forbidden", { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 4096) return new NextResponse("Too large", { status: 413 });
  if (!hasKulturarenaAuthConfig()) return denied(request, "busy");
  try {
    if (!request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded")) return denied(request);
    const form = new URLSearchParams(await readLimitedBody(request, 4096));
    const username = String(form.get("username") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const members = kulturarenaMembers(), member = resolveKulturarenaLogin(username, members);
    if (!member || password.length < 1 || password.length > 512) return denied(request);
    const supabase = await kulturarenaClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email: member.email, password });
    if (error || data.user?.id !== member.user_id || !authorizedKulturarenaMember(data.user, members)) {
      if (data.session) await supabase.auth.signOut({ scope: "local" });
      return denied(request);
    }
    return NextResponse.redirect(new URL("/kulturarena/system", request.url), 303);
  } catch (error) {
    if (error instanceof BodyTooLarge) return new NextResponse("Too large", { status: 413 });
    return denied(request, "busy");
  }
}
