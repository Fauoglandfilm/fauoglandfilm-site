export const DUPLICATE_EMAIL_MESSAGE =
  "Denne e-postadressen er allerede registrert. Logg inn, eller bekreft e-posten din for å aktivere kontoen.";

function getGenericServerErrorMessage() {
  return "Vi kunne ikke lagre informasjonen akkurat nå. Prøv igjen.";
}

function normalizeEmail(email: string | null | undefined) {
  return String(email ?? "").trim().toLowerCase();
}

type AuthUserLike = {
  email?: string | null;
  identities?: unknown[] | null;
};

export function findMatchingUserByEmail<T extends AuthUserLike>(users: T[], email: string) {
  const target = normalizeEmail(email);

  if (!target) {
    return null;
  }

  return users.find((user) => normalizeEmail(user.email) === target) ?? null;
}

export function looksLikeObfuscatedExistingUser(user: AuthUserLike) {
  return Array.isArray(user.identities) && user.identities.length === 0;
}

export function mapRegistrationErrorMessage(message: string | undefined) {
  if (!message) {
    return getGenericServerErrorMessage();
  }

  if (message.toLowerCase().includes("already registered")) {
    return DUPLICATE_EMAIL_MESSAGE;
  }

  if (message.toLowerCase().includes("password")) {
    return "Passordet må være lengre. Minst 10 tegn.";
  }

  return getGenericServerErrorMessage();
}
