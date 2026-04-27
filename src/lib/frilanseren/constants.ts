import type { UserRole } from "./types";

export const ROLE_OPTIONS = [
  {
    value: "employer",
    label: "Jeg skal ansette",
    description:
      "Registrer selskapet ditt og bli med i piloten. Vi kontakter deg når vi kan hjelpe deg å fylle neste produksjon raskere og tryggere.",
  },
  {
    value: "freelancer",
    label: "Jeg er frilanser",
    description:
      "Registrer deg for å bli med i den første bølgen av frilansere vi matcher mot reelle oppdrag.",
  },
] as const satisfies ReadonlyArray<{
  value: UserRole;
  label: string;
  description: string;
}>;

export const EMPLOYER_PRODUCTION_TYPES = [
  { value: "reklame", label: "Reklame / kommersielt innhold" },
  { value: "tv", label: "TV / dokumentar" },
  { value: "some", label: "SoMe / always on" },
  { value: "event", label: "Event / live" },
  { value: "annet", label: "Annet" },
] as const;

export const EMPLOYER_ANNUAL_VOLUME_OPTIONS = [
  { value: "1_2", label: "1–2" },
  { value: "3_10", label: "3–10" },
  { value: "10_plus", label: "10+" },
] as const;

export const FREELANCER_ROLE_OPTIONS = [
  { value: "regi", label: "Regi" },
  { value: "foto", label: "Foto / kamera" },
  { value: "klipp", label: "Klipp" },
  { value: "lyd", label: "Lyd" },
  { value: "produsent", label: "Produsent" },
  { value: "lys", label: "Lys / gaffer" },
  { value: "annet", label: "Annet" },
] as const;

export const FREELANCER_EXPERIENCE_OPTIONS = [
  { value: "0_2", label: "0–2 år" },
  { value: "3_7", label: "3–7 år" },
  { value: "8_plus", label: "8+ år" },
] as const;

export const FRILANSEREN_PROTECTED_PATHS = [
  "/frilanseren/dashboard",
  "/frilanseren/profile",
  "/frilanseren/admin",
] as const;

export const FRILANSEREN_BASE_PATH = "/frilanseren";
export const FRILANSEREN_ADMIN_PATH = "/frilanseren/admin";
export const FRILANSEREN_PRIVACY_CONTACT_PATH = "/kontakt";
export const FRILANSEREN_CONSENT_TEXT_VERSION = "frilanseren-v1";
export const FRILANSEREN_MIN_PASSWORD_LENGTH = 10;
export const FRILANSEREN_MEDIA_BUCKET = "frilanseren-media";
export const FRILANSEREN_ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;
export const FRILANSEREN_MAX_IMAGE_BYTES = 2 * 1024 * 1024;
