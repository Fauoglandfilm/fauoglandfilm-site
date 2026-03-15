export type LanguageCode = "no" | "en";

export type LocalizedValue<T> = {
  no: T;
  en: T;
};

export type LocalizedText = LocalizedValue<string>;

export function isLocalizedValue<T>(
  value: T | LocalizedValue<T>,
): value is LocalizedValue<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "no" in value &&
    "en" in value
  );
}

export function resolveLocalizedValue<T>(
  value: T | LocalizedValue<T>,
  language: LanguageCode,
): T {
  if (isLocalizedValue(value)) {
    return value[language];
  }

  return value;
}
