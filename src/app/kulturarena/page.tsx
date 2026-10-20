import { redirect } from "next/navigation";
import { KULTURARENA_WORKSPACE } from "@/lib/kulturarena/retired";
export const dynamic = "force-dynamic";
export default function KulturarenaWorkspace() { redirect(KULTURARENA_WORKSPACE); }
