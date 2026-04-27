import test from "node:test";
import assert from "node:assert/strict";

import { buildProfileImagePath, inferImageExtension, validateImageFile } from "./media.ts";

test("image validation accepts supported files within size limit", () => {
  const file = new File(["demo"], "portrett.webp", { type: "image/webp" });

  assert.equal(validateImageFile(file), null);
  assert.equal(inferImageExtension(file), "webp");
  assert.equal(buildProfileImagePath("user-1", "freelancer", file), "user-1/profile-image.webp");
});

test("image validation rejects unsupported image formats", () => {
  const file = new File(["demo"], "vector.svg", { type: "image/svg+xml" });

  assert.equal(validateImageFile(file), "Last opp et bilde i JPG, PNG, WebP eller AVIF.");
});

test("image validation rejects files above the size limit", () => {
  const file = new File([new Uint8Array(2 * 1024 * 1024 + 1)], "stor.png", { type: "image/png" });

  assert.equal(validateImageFile(file), "Bildet er for stort. Maks 2 MB.");
});
