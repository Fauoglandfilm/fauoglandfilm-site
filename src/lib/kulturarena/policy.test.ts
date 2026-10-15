import assert from "node:assert/strict";
import test from "node:test";
import { allowedBridgePath, BodyTooLarge, isKulturarenaIdentity, isKulturarenaPath, readLimitedBody, sameOrigin } from "./policy";

test("private area uses a full path boundary", () => {
  assert.equal(isKulturarenaPath("/kulturarena"), true);
  assert.equal(isKulturarenaPath("/kulturarena/login"), true);
  assert.equal(isKulturarenaPath("/kulturarena-public"), false);
  assert.equal(isKulturarenaPath(null), false);
});

test("bridge cannot reach another project, arbitrary files, or a send endpoint", () => {
  for (const path of [["..", "secrets"], ["file", "knowledge?x=1"], ["file", "..", "config"], ["api", "send"], ["send"], ["frilanseren"], ["file", "config"]]) {
    assert.equal(allowedBridgePath("GET", path), null);
    assert.equal(allowedBridgePath("POST", path), null);
  }
  assert.equal(allowedBridgePath("GET", ["state"]), "state");
  assert.equal(allowedBridgePath("GET", ["file", "knowledge"]), "file/knowledge");
  assert.equal(allowedBridgePath("POST", ["company-create"]), "company-create");
  assert.equal(allowedBridgePath("GET", ["company-create"]), null);
  assert.equal(allowedBridgePath("DELETE", ["state"]), null);
});

test("mutations reject absent, foreign, null, and deceptive origins", () => {
  const request = (origin?: string) => new Request("https://fauoglandfilm.com/kulturarena/api/task", { headers: origin ? { Origin: origin } : {} });
  assert.equal(sameOrigin(request("https://fauoglandfilm.com")), true);
  for (const origin of [undefined, "null", "https://evil.example", "https://fauoglandfilm.com.evil.example", "http://fauoglandfilm.com"])
    assert.equal(sameOrigin(request(origin)), false);
});

test("chunked bodies cannot bypass the size limit", async () => {
  const request = new Request("https://example.test", { method: "POST", body: "0123456789" });
  await assert.rejects(readLimitedBody(request, 5), BodyTooLarge);
  assert.equal(await readLimitedBody(new Request("https://example.test", { method: "POST", body: "norsk: æøå" }), 50), "norsk: æøå");
});

test("an unrelated valid account and missing ownership config never grant access", () => {
  const owner = { id: "culture-owner-uuid", email: "owner@example.test" };
  assert.equal(isKulturarenaIdentity(owner, owner.id, owner.email), true);
  assert.equal(isKulturarenaIdentity({ ...owner, id: "film-account-uuid" }, owner.id, owner.email), false);
  assert.equal(isKulturarenaIdentity({ ...owner, email: "another@example.test" }, owner.id, owner.email), false);
  assert.equal(isKulturarenaIdentity(owner, undefined, owner.email), false);
  assert.equal(isKulturarenaIdentity(owner, owner.id, undefined), false);
  assert.equal(isKulturarenaIdentity(null, owner.id, owner.email), false);
});
