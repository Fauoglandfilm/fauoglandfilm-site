import type { Metadata } from "next";

// Dynamic + no-index: this is a debug probe, not a public page.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Frilanseren debug",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

type CheckResult = {
  ok: boolean;
  error?: string;
};

async function checkServerClientImport(): Promise<CheckResult> {
  try {
    await import("@/lib/supabase/serverClient");
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("[FRILANSEREN_DEBUG_ROUTE] serverClient import failed", {
      errorMessage: message,
      errorStack: stack,
    });
    return { ok: false, error: message };
  }
}

async function checkCreateServerClient(): Promise<CheckResult> {
  try {
    const mod = await import("@/lib/supabase/serverClient");
    await mod.createServerComponentClient();
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("[FRILANSEREN_DEBUG_ROUTE] createServerComponentClient threw", {
      errorMessage: message,
      errorStack: stack,
    });
    return { ok: false, error: message };
  }
}

export default async function FrilanserenDebugPage() {
  const flags = {
    hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasSupabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasSiteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    nodeEnv: process.env.NODE_ENV ?? null,
    vercelEnv: process.env.VERCEL_ENV ?? null,
  };

  const importCheck = await checkServerClientImport();
  const clientCheck = importCheck.ok
    ? await checkCreateServerClient()
    : { ok: false, error: "skipped (import failed)" };

  const ok = flags.hasSupabaseUrl && flags.hasSupabaseAnonKey && importCheck.ok && clientCheck.ok;

  console.log("[FRILANSEREN_DEBUG_ROUTE] snapshot", {
    ts: new Date().toISOString(),
    ok,
    flags,
    importOk: importCheck.ok,
    clientOk: clientCheck.ok,
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-10 font-mono text-sm">
      <h1 className="text-xl font-bold">Frilanseren debug</h1>
      <p className="text-xs">
        Internal probe. No secrets shown. Boolean flags only.
      </p>

      <pre className="rounded bg-black/80 p-4 text-white">
        {JSON.stringify(
          {
            ok,
            flags,
            importSupabaseServerClient: importCheck,
            createServerClient: clientCheck,
            logTag: "[FRILANSEREN_DEBUG_ROUTE]",
          },
          null,
          2,
        )}
      </pre>

      <p className="text-xs text-neutral-500">
        Search Vercel Runtime Logs for <code>FRILANSEREN_DEBUG_ROUTE</code>.
      </p>
    </div>
  );
}
