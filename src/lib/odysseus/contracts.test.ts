import assert from "node:assert/strict";
import test from "node:test";

import {
  ODYSSEUS_COMMAND_LEASE_MS,
  ODYSSEUS_NAV_ITEMS,
  classifyOdysseusBackendProbe,
  expiredOdysseusCommandUpdate,
  odysseusCommandLeaseCutoff,
  odysseusReadinessState,
  readBoundedDailySendLimit,
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

test("owner navigation only contains anchors backed by portal sections", () => {
  assert.deepEqual(ODYSSEUS_NAV_ITEMS.map((item) => item.href), [
    "#oversikt",
    "#salg",
    "#crmsynk",
    "#system",
    "#innstillinger",
    "#hendelser",
  ]);
});

test("daily send limit accepts only the fail-closed configured range", () => {
  assert.equal(readBoundedDailySendLimit(25), 25);
  assert.equal(readBoundedDailySendLimit(0), null);
  assert.equal(readBoundedDailySendLimit(51), null);
  assert.equal(readBoundedDailySendLimit("25"), null);
});

test("command lease uses a fifteen minute no-retry timeout", () => {
  const now = Date.parse("2026-10-15T12:30:00.000Z");
  const cutoff = odysseusCommandLeaseCutoff(now);
  assert.equal(now - Date.parse(cutoff), ODYSSEUS_COMMAND_LEASE_MS);
  assert.deepEqual(expiredOdysseusCommandUpdate("2026-10-15T12:30:00.000Z"), {
    status: "failed",
    completed_at: "2026-10-15T12:30:00.000Z",
    error_code: "lease_expired_no_automatic_retry",
  });
});

test("backend readiness distinguishes network, database and table failures", () => {
  const unreachable = classifyOdysseusBackendProbe(false);
  assert.deepEqual(unreachable, {
    backendReady: false,
    databaseReady: false,
    tableReady: false,
  });
  assert.deepEqual(classifyOdysseusBackendProbe(true, "PGRST205"), {
    backendReady: true,
    databaseReady: true,
    tableReady: false,
  });
  assert.deepEqual(classifyOdysseusBackendProbe(true, "PGRST301"), {
    backendReady: true,
    databaseReady: false,
    tableReady: false,
  });
  assert.deepEqual(classifyOdysseusBackendProbe(true, null), {
    backendReady: true,
    databaseReady: false,
    tableReady: false,
  });
  assert.deepEqual(classifyOdysseusBackendProbe(true, ""), {
    backendReady: true,
    databaseReady: false,
    tableReady: false,
  });
  assert.deepEqual(classifyOdysseusBackendProbe(true), {
    backendReady: true,
    databaseReady: true,
    tableReady: true,
  });
  assert.deepEqual(odysseusReadinessState(true, unreachable), {
    ok: false,
    readinessStatus: "backend_unreachable",
  });
  assert.deepEqual(
    odysseusReadinessState(true, classifyOdysseusBackendProbe(true, "PGRST205")),
    { ok: false, readinessStatus: "portal_table_unavailable" },
  );
  assert.deepEqual(
    odysseusReadinessState(true, classifyOdysseusBackendProbe(true)),
    { ok: true, readinessStatus: "ready" },
  );
  assert.deepEqual(
    odysseusReadinessState(false, classifyOdysseusBackendProbe(true)),
    { ok: false, readinessStatus: "configuration_incomplete" },
  );
});
