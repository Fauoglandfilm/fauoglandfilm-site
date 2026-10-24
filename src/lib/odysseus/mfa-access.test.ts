import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import type { User } from "@supabase/supabase-js";
import { cancelOwnerMfaEnrollment, enrollOwnerMfa, loadOwnerAccess, verifyOwnerMfa, type OwnerAuth } from "./mfa-access";

const id = "11111111-1111-4111-8111-111111111111";
const foreignId = "22222222-2222-4222-8222-222222222222";
const isOwner = (email: string | undefined) => email === "owner@example.invalid";

function fixture() {
  const state = {
    user: { id: "owner-id", email: "owner@example.invalid", email_confirmed_at: "2026-10-24T00:00:00Z", factors: [] } as unknown as User,
    aal: "aal1", subject: "owner-id", calls: [] as string[],
    rejectIdentity: false, rejectClaims: false, throwIdentity: false,
    rejectVerify: false, saveNewSession: true,
  };
  const auth = {
    getUser: async () => {
      state.calls.push("getUser");
      if (state.throwIdentity) throw new Error("provider-private-token");
      return { data: { user: state.user }, error: state.rejectIdentity ? new Error("no identity") : null };
    },
    getClaims: async () => {
      state.calls.push("getClaims");
      return { data: { claims: { sub: state.subject, aal: state.aal } }, error: state.rejectClaims ? new Error("provider-private-token") : null };
    },
    mfa: {
      enroll: async () => {
        state.calls.push("enroll");
        state.user.factors = [{ id, factor_type: "totp", status: "unverified", friendly_name: "Odysseus test" }] as User["factors"];
        return { data: { id, type: "totp", totp: { qr_code: "data:image/svg+xml;utf-8,<svg>synthetic</svg>", secret: "JBSWY3DPEHPK3PXP" } }, error: null };
      },
      challengeAndVerify: async () => {
        state.calls.push("challengeAndVerify");
        if (state.rejectVerify) throw new Error("provider-private-token");
        if (state.saveNewSession) {
          state.aal = "aal2";
          state.user.factors = state.user.factors?.map((factor) => ({ ...factor, status: "verified" }));
        }
        return { data: {}, error: null };
      },
      unenroll: async () => { state.calls.push("unenroll"); return { data: {}, error: null }; },
    },
  } as unknown as OwnerAuth;
  return { state, auth };
}

test("password-only owner must enroll; signed AAL2 still needs a current verified TOTP", async () => {
  const { state, auth } = fixture();
  assert.equal((await loadOwnerAccess(auth, isOwner)).state, "setup_required");
  state.aal = "aal2";
  assert.equal((await loadOwnerAccess(auth, isOwner)).state, "setup_required");
  state.user.factors = [{ id, factor_type: "totp", status: "verified" }] as User["factors"];
  assert.equal((await loadOwnerAccess(auth, isOwner)).state, "ready");
  state.aal = "aal1";
  assert.equal((await loadOwnerAccess(auth, isOwner)).state, "challenge_required");
});

for (const failure of ["unrelated_owner", "unconfirmed_email", "bad_identity", "bad_signature", "foreign_subject", "unknown_aal", "provider_throw"] as const) {
  test(`owner gate rejects ${failure} without MFA calls or private error leakage`, async () => {
    const { state, auth } = fixture();
    if (failure === "unrelated_owner") state.user.email = "other@example.invalid";
    if (failure === "unconfirmed_email") delete state.user.email_confirmed_at;
    if (failure === "bad_identity") state.rejectIdentity = true;
    if (failure === "bad_signature") state.rejectClaims = true;
    if (failure === "foreign_subject") state.subject = "someone-else";
    if (failure === "unknown_aal") state.aal = "admin";
    if (failure === "provider_throw") state.throwIdentity = true;
    const access = await loadOwnerAccess(auth, isOwner);
    assert.equal(access.user, null);
    assert.notEqual(access.state, "ready");
    assert.equal((await enrollOwnerMfa(auth, isOwner)).status, "error");
    assert.equal(state.calls.includes("enroll"), false);
    assert.equal(JSON.stringify(access).includes("provider-private-token"), false);
  });
}

test("user-editable metadata is never accepted as AAL or factor verification", async () => {
  const { state, auth } = fixture();
  state.user.user_metadata = { aal: "aal2", owner: true, factors: [{ status: "verified" }] };
  assert.equal((await loadOwnerAccess(auth, isOwner)).state, "setup_required");
});

test("loading access never enrolls; only an explicit setup call returns a private QR", async () => {
  const { state, auth } = fixture();
  await loadOwnerAccess(auth, isOwner);
  assert.deepEqual(state.calls, ["getUser", "getClaims"]);
  const result = await enrollOwnerMfa(auth, isOwner);
  assert.equal(result.status, "enrolled");
  assert.equal(result.factorId, id);
  assert.ok(result.qrCode?.startsWith("data:image/svg+xml"));
  assert.equal((await enrollOwnerMfa(auth, isOwner)).status, "error");
  assert.equal(state.calls.filter((call) => call === "enroll").length, 1);
});

test("MFA challenge is owner/factor scoped and requires persisted AAL2 readback", async () => {
  const { state, auth } = fixture();
  await enrollOwnerMfa(auth, isOwner);
  assert.equal((await verifyOwnerMfa(auth, isOwner, foreignId, "123456")).status, "error");
  assert.equal((await verifyOwnerMfa(auth, isOwner, id, "12345x")).status, "error");
  assert.equal(state.calls.includes("challengeAndVerify"), false);
  state.saveNewSession = false;
  assert.equal((await verifyOwnerMfa(auth, isOwner, id, "123456")).status, "error");
  assert.notEqual((await loadOwnerAccess(auth, isOwner)).state, "ready");
  state.saveNewSession = true;
  assert.equal((await verifyOwnerMfa(auth, isOwner, id, "123456")).status, "success");
  assert.equal((await loadOwnerAccess(auth, isOwner)).state, "ready");
});

test("provider verification failures stay generic and do not grant access", async () => {
  const { state, auth } = fixture();
  await enrollOwnerMfa(auth, isOwner);
  state.rejectVerify = true;
  const result = await verifyOwnerMfa(auth, isOwner, id, "123456");
  assert.equal(result.status, "error");
  assert.equal(JSON.stringify(result).includes("provider-private-token"), false);
  assert.notEqual((await loadOwnerAccess(auth, isOwner)).state, "ready");
});

test("cancel only removes this owner's unverified Odysseus setup, never verified/foreign factors", async () => {
  const { state, auth } = fixture();
  await enrollOwnerMfa(auth, isOwner);
  assert.equal((await cancelOwnerMfaEnrollment(auth, isOwner, foreignId)).status, "error");
  assert.equal((await cancelOwnerMfaEnrollment(auth, isOwner, id)).status, "success");
  state.user.factors![0].status = "verified";
  assert.equal((await cancelOwnerMfaEnrollment(auth, isOwner, id)).status, "error");
  state.user.factors![0].status = "unverified";
  state.user.factors![0].friendly_name = "Another application";
  assert.equal((await cancelOwnerMfaEnrollment(auth, isOwner, id)).status, "error");
  assert.equal(state.calls.filter((call) => call === "unenroll").length, 1);
});

test("dashboard and command mutations use the MFA gate before privileged data access", async () => {
  const actions = await readFile(new URL("./actions.ts", import.meta.url), "utf8");
  const command = actions.slice(actions.indexOf("export async function enqueueOdysseusCommand"));
  assert.ok(command.indexOf("await requireOdysseusOwner()") < command.indexOf("createAdminClient()"));
  const page = await readFile(new URL("../../app/odysseus/page.tsx", import.meta.url), "utf8");
  assert.ok(page.indexOf("await requireOdysseusOwner()") < page.indexOf("await loadOdysseusPortalState()"));
  const auth = await readFile(new URL("./auth.ts", import.meta.url), "utf8");
  assert.ok(auth.includes('access.state !== "ready"'));
  assert.ok(auth.includes('redirect("/odysseus/mfa")'));
});

test("private MFA/cache headers override general site defaults, not the other way round", async () => {
  const config = await readFile(new URL("../../../next.config.ts", import.meta.url), "utf8");
  const specific = config.indexOf('source: "/odysseus/:path*"');
  assert.ok(specific > config.indexOf('source: "/(.*)"'));
  const headers = config.slice(specific, config.indexOf("],", specific));
  assert.ok(headers.includes('value: "private, no-store"'));
  assert.ok(headers.includes('value: "same-origin"'));
  assert.ok(headers.includes("noarchive"));
});
