import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { cookiesForScope, cookieOptionsForScope } from "./cookie-scope";
import { ODYSSEUS_SESSION_SCOPE } from "../odysseus/contracts";

test("private client reads only its exact session and PKCE cookie chunks", () => {
  const names = ["sb-project-auth-token", "salgscoach-session", "kulturarena-session",
    "odysseus-session", "odysseus-session.0", "odysseus-session.1", "odysseus-session.foo",
    "odysseus-session-foreign", "odysseus-session-code-verifier", "odysseus-session-code-verifier.0",
    "odysseus-session-code-verifier-other"];
  const cookies = names.map((name) => ({ name, value: "synthetic-only" }));
  assert.deepEqual(cookiesForScope(cookies, ODYSSEUS_SESSION_SCOPE).map((item) => item.name), [
    "odysseus-session", "odysseus-session.0", "odysseus-session.1",
    "odysseus-session-code-verifier", "odysseus-session-code-verifier.0",
  ]);
  assert.equal(cookiesForScope(cookies), cookies);
  assert.equal(cookies.length, names.length);
});

test("private scope forces HttpOnly/path/SameSite/Secure without mutating SDK options", () => {
  const original = { path: "/", httpOnly: false, secure: false, sameSite: "none", maxAge: 600 };
  assert.deepEqual(cookieOptionsForScope(original, ODYSSEUS_SESSION_SCOPE, true), {
    path: "/odysseus", httpOnly: true, secure: true, sameSite: "lax", maxAge: 600,
  });
  assert.equal(original.path, "/");
  assert.equal(original.httpOnly, false);
  assert.equal(cookieOptionsForScope(original, undefined, true), original);
  assert.equal(cookieOptionsForScope(original, ODYSSEUS_SESSION_SCOPE, false).secure, false);
});

test("owner identity, MFA, sign-in/out and proxy share scope; reset keeps original PKCE callback", async () => {
  const base = new URL("../odysseus/", import.meta.url);
  const auth = await readFile(new URL("auth.ts", base), "utf8");
  const mfa = await readFile(new URL("mfa-actions.ts", base), "utf8");
  const actions = await readFile(new URL("actions.ts", base), "utf8");
  const proxy = await readFile(new URL("../../proxy.ts", import.meta.url), "utf8");
  assert.ok(auth.includes("createServerComponentClient(ODYSSEUS_SESSION_SCOPE)"));
  assert.equal(mfa.match(/createServerComponentClient\(ODYSSEUS_SESSION_SCOPE\)/g)?.length, 3);
  const login = actions.slice(actions.indexOf("export async function signInOdysseusAction"), actions.indexOf("export async function requestOdysseusPasswordResetAction"));
  const reset = actions.slice(actions.indexOf("export async function requestOdysseusPasswordResetAction"), actions.indexOf("export async function signOutOdysseusAction"));
  const logout = actions.slice(actions.indexOf("export async function signOutOdysseusAction"), actions.indexOf("function commandPayload"));
  assert.ok(login.includes("createServerComponentClient(ODYSSEUS_SESSION_SCOPE)"));
  assert.ok(logout.includes("createServerComponentClient(ODYSSEUS_SESSION_SCOPE)"));
  assert.ok(reset.includes("createServerComponentClient()"));
  assert.ok(reset.includes("/auth/confirm?next=/frilanseren/reset-password"));
  assert.ok(proxy.includes("? ODYSSEUS_SESSION_SCOPE : undefined"));
});

test("both cookie adapters apply the tested read and write policy", async () => {
  const source = await readFile(new URL("./serverClient.ts", import.meta.url), "utf8");
  assert.ok(source.includes("cookiesForScope(cookieStore.getAll(), scope)"));
  assert.ok(source.includes("cookiesForScope(request.cookies.getAll(), scope)"));
  assert.equal(source.match(/cookieOptionsForScope\(options, scope, process.env.NODE_ENV === "production"\)/g)?.length, 2);
});
