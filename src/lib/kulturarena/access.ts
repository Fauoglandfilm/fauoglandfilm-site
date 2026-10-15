export type KulturarenaMember = {
  user_id: string;
  email: string;
  username: string;
  role: "owner" | "editor";
};
type Environment = Record<string, string | undefined>;
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Server-owned membership. Provider metadata and browser claims grant no access. */
export function kulturarenaMembers(env: Environment = process.env): KulturarenaMember[] {
  try {
    const raw = env.KULTURARENA_USERS;
    const entries: unknown = raw?.trim()
      ? JSON.parse(raw)
      : env.KULTURARENA_USER_ID && env.KULTURARENA_LOGIN_EMAIL
        ? [{ user_id: env.KULTURARENA_USER_ID, email: env.KULTURARENA_LOGIN_EMAIL, username: "tommy.kulturarena", role: "owner" }]
        : [];
    if (!Array.isArray(entries) || entries.length > 10) return [];
    const ids = new Set<string>(), aliases = new Set<string>(), members: KulturarenaMember[] = [];
    for (const entry of entries) {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
      if (Object.keys(entry).some((k) => !["user_id", "email", "username", "role"].includes(k))) return [];
      const r = entry as Record<string, unknown>;
      if (![r.user_id, r.email, r.username, r.role].every((v) => typeof v === "string")) return [];
      const user_id = (r.user_id as string).trim().toLowerCase();
      const address = (r.email as string).trim().toLowerCase();
      const username = (r.username as string).trim().toLowerCase();
      if (!uuid.test(user_id) || !email.test(address) || !/^[a-z0-9][a-z0-9._@+-]{1,253}$/.test(username)) return [];
      if (!["owner", "editor"].includes(r.role as string) || ids.has(user_id)) return [];
      if (address === env.ODYSSEUS_OWNER_EMAIL?.trim().toLowerCase()) return [];
      const ownAliases = new Set([address, username]);
      if ([...ownAliases].some((v) => aliases.has(v))) return [];
      ids.add(user_id); ownAliases.forEach((v) => aliases.add(v));
      members.push({ user_id, email: address, username, role: r.role as KulturarenaMember["role"] });
    }
    return members;
  } catch { return []; }
}

export function resolveKulturarenaLogin(login: string, members: KulturarenaMember[]) {
  const normalized = login.trim().toLowerCase();
  return members.find((m) => m.email === normalized || m.username === normalized) ?? null;
}

export function authorizedKulturarenaMember(user: { id: string; email?: string } | null, members: KulturarenaMember[]) {
  return user ? members.find((m) => m.user_id === user.id && m.email === user.email?.trim().toLowerCase()) ?? null : null;
}

/** No fallback to another product's database. */
export function kulturarenaConnection(env: Environment = process.env) {
  const raw = env.KULTURARENA_SUPABASE_URL?.trim(), key = env.KULTURARENA_SUPABASE_ANON_KEY?.trim();
  if (!raw || !key) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
    for (const other of [env.NEXT_PUBLIC_SUPABASE_URL, env.SALGSCOACH_SUPABASE_URL]) {
      if (other && new URL(other).hostname === url.hostname) return null;
    }
    return { url: url.origin, key };
  } catch { return null; }
}
