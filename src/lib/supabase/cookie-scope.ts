export type AuthCookieScope = { name: string; path: string };

/** Keep other applications' sessions out of a private server-only client. */
export function cookiesForScope<T extends { name: string }>(cookies: T[], scope?: AuthCookieScope): T[] {
  if (!scope) return cookies;
  const matches = (name: string, key: string) => name === key
    || (name.startsWith(`${key}.`) && /^\d+$/.test(name.slice(key.length + 1)));
  return cookies.filter(({ name }) => matches(name, scope.name) || matches(name, `${scope.name}-code-verifier`));
}

export function cookieOptionsForScope<T extends object>(options: T, scope: AuthCookieScope | undefined, production: boolean) {
  return scope ? { ...options, path: scope.path, httpOnly: true, secure: production, sameSite: "lax" as const } : options;
}
