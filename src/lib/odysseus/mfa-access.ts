import type { SupabaseClient, User } from "@supabase/supabase-js";

export type OwnerAuth = Pick<SupabaseClient["auth"], "getUser" | "getClaims" | "mfa">;
export type OwnerFactor = { id: string; name: string; status: "verified" | "unverified" };
export type OwnerAccess = {
  state: "unauthenticated" | "unavailable" | "setup_required" | "challenge_required" | "ready";
  user: User | null;
  factors: OwnerFactor[];
};

export const ODYSSEUS_FACTOR_PREFIX = "Odysseus ";
export const FACTOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Provider-validated identity + signed AAL claim + current factors, not user_metadata. */
export async function loadOwnerAccess(
  auth: OwnerAuth,
  isOwner: (email: string | undefined) => boolean,
): Promise<OwnerAccess> {
  const denied: OwnerAccess = { state: "unauthenticated", user: null, factors: [] };
  try {
    const identity = await auth.getUser();
    const user = identity.data.user;
    if (identity.error || !user?.id || !user.email_confirmed_at || !isOwner(user.email)) return denied;

    const signed = await auth.getClaims();
    const claims = signed.data?.claims;
    if (signed.error || !claims || claims.sub !== user.id || !["aal1", "aal2"].includes(String(claims.aal))) {
      return { ...denied, state: "unavailable" };
    }
    // getUser fetched these from Auth. SDK listFactors performs that same read;
    // do not make a duplicate provider call on every dashboard refresh.
    const factors: OwnerFactor[] = (user.factors ?? [])
      .filter((factor) => factor.factor_type === "totp" && FACTOR_ID.test(factor.id)
        && (factor.status === "verified" || factor.status === "unverified"))
      .map((factor) => ({ id: factor.id, name: factor.friendly_name ?? "Autentikator", status: factor.status }));
    const verified = factors.some((factor) => factor.status === "verified");
    return {
      user, factors,
      state: !verified ? "setup_required" : claims.aal === "aal2" ? "ready" : "challenge_required",
    };
  } catch {
    // Never serialize provider exceptions (which may contain session material).
    return { ...denied, state: "unavailable" };
  }
}

export type MfaState = {
  status: "idle" | "error" | "enrolled" | "success";
  message?: string;
  factorId?: string;
  qrCode?: string;
  secret?: string;
};

const failed = (message: string): MfaState => ({ status: "error", message });

export async function enrollOwnerMfa(auth: OwnerAuth, isOwner: (email: string | undefined) => boolean): Promise<MfaState> {
  const access = await loadOwnerAccess(auth, isOwner);
  if (access.state !== "setup_required") return failed("Logg inn som eier før du setter opp tofaktor.");
  if (access.factors.some((factor) => factor.status === "unverified" && factor.name.startsWith(ODYSSEUS_FACTOR_PREFIX))) {
    return failed("Avbryt det ufullførte Odysseus-oppsettet nedenfor før du starter et nytt.");
  }
  try {
    const { data, error } = await auth.mfa.enroll({
      factorType: "totp", friendlyName: `${ODYSSEUS_FACTOR_PREFIX}${crypto.randomUUID().slice(0, 8)}`,
    });
    if (error || !data || !("totp" in data) || !FACTOR_ID.test(data.id)
      || !data.totp.qr_code.startsWith("data:image/svg+xml") || data.totp.qr_code.length > 50_000
      || !/^[a-z2-7]{16,128}=*$/i.test(data.totp.secret)) return failed("Tofaktoroppsettet kunne ikke startes. Prøv igjen.");
    return { status: "enrolled", factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret };
  } catch {
    return failed("Tofaktoroppsettet kunne ikke startes. Prøv igjen.");
  }
}

export async function verifyOwnerMfa(
  auth: OwnerAuth, isOwner: (email: string | undefined) => boolean, factorId: string, code: string,
): Promise<MfaState> {
  if (!FACTOR_ID.test(factorId) || !/^\d{6}$/.test(code)) return failed("Skriv inn den sekssifrede koden fra autentikatorappen.");
  const access = await loadOwnerAccess(auth, isOwner);
  if (!["setup_required", "challenge_required"].includes(access.state)) return failed("Start fra eierinnloggingen og prøv igjen.");
  const factor = access.factors.find((item) => item.id === factorId);
  if (!factor || (factor.status === "unverified" && !factor.name.startsWith(ODYSSEUS_FACTOR_PREFIX))) {
    return failed("Dette oppsettet tilhører ikke den aktive eierinnloggingen.");
  }
  try {
    const { error } = await auth.mfa.challengeAndVerify({ factorId, code });
    if (error) return failed("Koden ble ikke godkjent. Bruk en fersk kode og prøv igjen.");
    // A successful API call alone is not proof of a cookie-backed AAL2 session.
    const after = await loadOwnerAccess(auth, isOwner);
    return after.state === "ready" && after.user?.id === access.user?.id
      ? { status: "success" } : failed("Innloggingen kunne ikke bekreftes. Last siden på nytt.");
  } catch {
    return failed("Koden kunne ikke kontrolleres nå. Prøv igjen.");
  }
}

export async function cancelOwnerMfaEnrollment(
  auth: OwnerAuth, isOwner: (email: string | undefined) => boolean, factorId: string,
): Promise<MfaState> {
  const access = await loadOwnerAccess(auth, isOwner);
  const factor = access.factors.find((item) => item.id === factorId);
  if (access.state !== "setup_required" || !factor || factor.status !== "unverified"
    || !factor.name.startsWith(ODYSSEUS_FACTOR_PREFIX)) return failed("Bare ditt ufullførte Odysseus-oppsett kan avbrytes her.");
  try {
    const { error } = await auth.mfa.unenroll({ factorId });
    return error ? failed("Oppsettet kunne ikke avbrytes. Prøv igjen.") : { status: "success" };
  } catch {
    return failed("Oppsettet kunne ikke avbrytes. Prøv igjen.");
  }
}
