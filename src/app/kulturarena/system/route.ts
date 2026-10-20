import { KULTURARENA_WORKSPACE, retiredHeaders } from "@/lib/kulturarena/retired";
export const dynamic = "force-dynamic";
export async function GET() { return new Response(null, { status: 307, headers: { ...retiredHeaders, Location: KULTURARENA_WORKSPACE } }); }
