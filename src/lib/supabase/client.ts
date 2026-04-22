import { createBrowserClient } from "@supabase/ssr";

function requiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Manglende miljøvariabel: ${name}`);
  }

  return value;
}

export function createClientComponentClient() {
  return createBrowserClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  );
}
