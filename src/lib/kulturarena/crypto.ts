import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from "node:crypto";
export const TENANT = "kulturarena";
export const SYSTEM = "kulturarena-sales";
export const DEVICE = "kulturarena-mac-2";
export type Envelope = { v: 1; tenant_id: typeof TENANT; purpose: string; nonce: string; ciphertext: string; tag: string };
function key(value: string) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(value)) throw new Error("Invalid data key");
  const decoded = Buffer.from(value, "base64url");
  if (decoded.length !== 32) throw new Error("Invalid data key");
  return decoded;
}
function aad(purpose: string) { return Buffer.from(JSON.stringify([1, TENANT, SYSTEM, DEVICE, purpose])); }
export function seal(value: unknown, purpose: string, secret: string): Envelope {
  const nonce = randomBytes(12), cipher = createCipheriv("aes-256-gcm", key(secret), nonce);
  cipher.setAAD(aad(purpose));
  const content = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return { v: 1, tenant_id: TENANT, purpose, nonce: nonce.toString("base64url"), ciphertext: content.toString("base64url"), tag: cipher.getAuthTag().toString("base64url") };
}
export function unseal<T = Record<string, unknown>>(value: Envelope, purpose: string, secret: string): T {
  if (value.v !== 1 || value.tenant_id !== TENANT || value.purpose !== purpose || value.ciphertext.length > 3_000_000) throw new Error("Envelope scope denied");
  const nonce = Buffer.from(value.nonce, "base64url"), tag = Buffer.from(value.tag, "base64url");
  if (nonce.length !== 12 || tag.length !== 16) throw new Error("Invalid envelope");
  const decipher = createDecipheriv("aes-256-gcm", key(secret), nonce);
  decipher.setAAD(aad(purpose)); decipher.setAuthTag(tag);
  return JSON.parse(Buffer.concat([decipher.update(Buffer.from(value.ciphertext, "base64url")), decipher.final()]).toString("utf8")) as T;
}
export function tokenMatches(header: string | null, expectedHex: string | undefined) {
  if (!expectedHex || !/^[a-f0-9]{64}$/.test(expectedHex)) return false;
  const match = /^Bearer ([A-Za-z0-9_-]{43,128})$/.exec(header || "");
  return !!match && timingSafeEqual(createHash("sha256").update(match[1]).digest(), Buffer.from(expectedHex, "hex"));
}
