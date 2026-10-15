import assert from "node:assert/strict";
import test from "node:test";

import { safeRedirectPath } from "./safe-redirect";

const fallback = "/trygg";

test("beholder vanlige relative stier", () => {
  assert.equal(safeRedirectPath("/salgscoach?fra=login#topp", fallback), "/salgscoach?fra=login#topp");
});

test("avviser absolutte og protokoll-relative URL-er", () => {
  assert.equal(safeRedirectPath("https://evil.example", fallback), fallback);
  assert.equal(safeRedirectPath("//evil.example", fallback), fallback);
});

test("avviser bakstrek og kodede varianter som URL-normalisering kan gjøre eksterne", () => {
  assert.equal(safeRedirectPath("/\\evil.example", fallback), fallback);
  assert.equal(safeRedirectPath("/%5cevil.example", fallback), fallback);
  assert.equal(safeRedirectPath("/%255cevil.example", fallback), fallback);
  assert.equal(safeRedirectPath("/%2f%2fevil.example", fallback), fallback);
});

test("avviser ugyldig prosentkoding og kontrolltegn", () => {
  assert.equal(safeRedirectPath("/%zz", fallback), fallback);
  assert.equal(safeRedirectPath("/safe%0d%0aLocation:evil", fallback), fallback);
});

test("avviser unormalt dypt kodede stier", () => {
  let target = "//evil.example";
  for (let index = 0; index < 9; index += 1) {
    target = encodeURIComponent(target);
  }

  assert.equal(safeRedirectPath(`/${target}`, fallback), fallback);
});
