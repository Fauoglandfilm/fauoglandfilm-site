const SAFE_ORIGIN = "https://fauoglandfilm.invalid";

function decodeForValidation(value: string) {
  let decoded = value;

  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) return decoded;
      decoded = next;
    } catch {
      return null;
    }
  }

  // Refuse unusually deep encoding instead of guessing how a downstream
  // proxy or browser will normalize it.
  return null;
}

export function safeRedirectPath(
  value: FormDataEntryValue | string | null | undefined,
  fallback: string,
) {
  const target = String(value ?? "").trim();
  const decoded = decodeForValidation(target);

  if (
    !target.startsWith("/") ||
    target.startsWith("//") ||
    decoded === null ||
    decoded.startsWith("//") ||
    decoded.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(decoded)
  ) {
    return fallback;
  }

  try {
    const resolved = new URL(target, SAFE_ORIGIN);
    if (resolved.origin !== SAFE_ORIGIN || resolved.username || resolved.password) {
      return fallback;
    }
    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  } catch {
    return fallback;
  }
}
