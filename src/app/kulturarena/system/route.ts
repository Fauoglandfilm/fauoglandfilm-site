import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { authorizedKulturarenaUser } from "@/lib/kulturarena/server";
import { kulturarenaWorkbookUrl, workbookHome } from "@/lib/kulturarena/workbook";
import { REMOTE_DASHBOARD } from "@/lib/kulturarena/dashboard-source";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET(request: Request) {
  const user = await authorizedKulturarenaUser();
  if (!user) return NextResponse.redirect(new URL("/kulturarena/login", request.url));
  const workbookUrl = kulturarenaWorkbookUrl(process.env.KULTURARENA_CRM_SHEET_URL);
  const html = workbookUrl ? workbookHome(workbookUrl) : REMOTE_DASHBOARD;
  const hashes = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => `'sha256-${createHash("sha256").update(m[1]).digest("base64")}'`);
  return new NextResponse(html, { headers: {
    "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store, private", "X-Robots-Tag": "noindex, nofollow, noarchive", "X-Frame-Options": "DENY", "Referrer-Policy": "same-origin",
    "Content-Security-Policy": `default-src 'none'; script-src ${hashes.join(" ")}; style-src 'unsafe-inline'; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'`,
  } });
}
