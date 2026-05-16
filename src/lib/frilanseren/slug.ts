const NORWEGIAN_REPLACEMENTS: Record<string, string> = {
  æ: "ae",
  ø: "o",
  å: "a",
  Æ: "ae",
  Ø: "o",
  Å: "a",
};

export function slugify(value: string, fallback = "filmlanseren") {
  const normalized = value
    .replace(/[æøåÆØÅ]/g, (match) => NORWEGIAN_REPLACEMENTS[match] ?? match)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return normalized || fallback;
}

export function buildUniqueSlug(source: string, existingSlugs: ReadonlySet<string>, fallback = "filmlanseren") {
  const base = slugify(source, fallback);

  if (!existingSlugs.has(base)) {
    return base;
  }

  let suffix = 2;
  let candidate = `${base}-${suffix}`;

  while (existingSlugs.has(candidate)) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  return candidate;
}
