type Environment = Record<string, string | undefined>;

export function getSalgscoachSupabaseConfig(env: Environment = process.env) {
  const rawUrl = env.SALGSCOACH_SUPABASE_URL?.trim();
  const key = env.SALGSCOACH_SUPABASE_ANON_KEY?.trim();
  if (!rawUrl || !key) return null;
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) return null;
    return { url: url.origin, key };
  } catch {
    return null;
  }
}

export function hasSalgscoachAuthConfig() {
  return getSalgscoachSupabaseConfig() !== null;
}
