import assert from "node:assert/strict";
import { test } from "node:test";

import { buildUniqueSlug, slugify } from "./slug";

test("slugify normalizes Norwegian names and removes punctuation", () => {
  assert.equal(slugify("Åse Øst Film & Lyd!"), "ase-ost-film-lyd");
});

test("slugify falls back when the source has no usable characters", () => {
  assert.equal(slugify("!!!", "profil"), "profil");
});

test("buildUniqueSlug returns base slug when it is unused", () => {
  assert.equal(buildUniqueSlug("Foto Oslo", new Set(["klipp-oslo"])), "foto-oslo");
});

test("buildUniqueSlug appends suffix when base slug exists", () => {
  assert.equal(buildUniqueSlug("Foto Oslo", new Set(["foto-oslo", "foto-oslo-2"])), "foto-oslo-3");
});
