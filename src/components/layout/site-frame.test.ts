import assert from "node:assert/strict";
import test from "node:test";

import { isPrivatePortalPath } from "./site-frame";

test("private portaler får ikke markedsføringsmeny eller sporing", () => {
  assert.equal(isPrivatePortalPath("/salgscoach"), true);
  assert.equal(isPrivatePortalPath("/salgscoach/login"), true);
  assert.equal(isPrivatePortalPath("/odysseus"), true);
});

test("vanlige nettsider beholder ordinær sideinnramming", () => {
  assert.equal(isPrivatePortalPath("/"), false);
  assert.equal(isPrivatePortalPath("/frilanseren"), false);
  assert.equal(isPrivatePortalPath("/salgscoach-demo"), false);
});
