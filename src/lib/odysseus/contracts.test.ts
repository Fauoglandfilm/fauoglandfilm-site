import assert from "node:assert/strict";
import test from "node:test";

import {
  resolveOdysseusOwnerConfig,
  runningOdysseusCommandScope,
} from "@/lib/odysseus/contracts";

test("Odysseus owner access fails closed without an explicit owner email", () => {
  assert.deepEqual(resolveOdysseusOwnerConfig("tommy", undefined), {
    username: "tommy",
    email: "",
    ready: false,
  });
});

test("Odysseus owner configuration normalizes its explicit credentials", () => {
  assert.deepEqual(resolveOdysseusOwnerConfig(" Tommy ", " Owner@Example.com "), {
    username: "tommy",
    email: "owner@example.com",
    ready: true,
  });
});

test("command results are scoped to the one configured Odysseus device", () => {
  assert.deepEqual(runningOdysseusCommandScope("9e1bac88-b092-4de7-948b-7e93ec7f10fb"), {
    id: "9e1bac88-b092-4de7-948b-7e93ec7f10fb",
    deviceId: "mac-2",
    status: "running",
  });
});
