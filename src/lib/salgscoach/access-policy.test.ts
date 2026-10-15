import assert from "node:assert/strict";
import test from "node:test";

import {
  isAllowedSalgscoachEmail,
  parseSalgscoachAllowedEmails,
  safeSalgscoachPath,
} from "./access-policy";

test("allowlisten er fail-closed når konfigurasjonen mangler", () => {
  assert.equal(isAllowedSalgscoachEmail("tommy@example.com", undefined), false);
  assert.equal(isAllowedSalgscoachEmail("tommy@example.com", ""), false);
});

test("allowlisten normaliserer store bokstaver og mellomrom", () => {
  const configured = " Tommy@Example.com, admin@example.com ,tommy@example.com ";

  assert.deepEqual(
    [...parseSalgscoachAllowedEmails(configured)],
    ["tommy@example.com", "admin@example.com"],
  );
  assert.equal(isAllowedSalgscoachEmail("  TOMMY@example.com ", configured), true);
  assert.equal(isAllowedSalgscoachEmail("other@example.com", configured), false);
  assert.equal(isAllowedSalgscoachEmail(null, configured), false);
});

test("deep-link bevares bare innenfor Salgscoach-navnerommet", () => {
  assert.equal(
    safeSalgscoachPath("/salgscoach/samtaler/123?vis=rapport#score"),
    "/salgscoach/samtaler/123?vis=rapport#score",
  );
  assert.equal(safeSalgscoachPath("/salgscoach"), "/salgscoach");
  assert.equal(safeSalgscoachPath("/salgscoach-evil"), "/salgscoach");
  assert.equal(safeSalgscoachPath("/frilanseren/dashboard"), "/salgscoach");
  assert.equal(safeSalgscoachPath("//evil.example/salgscoach"), "/salgscoach");
  assert.equal(
    safeSalgscoachPath("/salgscoach%2f%2fevil.example"),
    "/salgscoach",
  );
});
