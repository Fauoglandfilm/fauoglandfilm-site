import test from "node:test";
import assert from "node:assert/strict";

import {
  DUPLICATE_EMAIL_MESSAGE,
  findMatchingUserByEmail,
  looksLikeObfuscatedExistingUser,
  mapRegistrationErrorMessage,
} from "./signup.ts";

test("findMatchingUserByEmail matches existing emails case-insensitively", () => {
  const match = findMatchingUserByEmail(
    [
      {
        email: "pilot@example.com",
      },
      {
        email: "Frilanser@Example.no",
      },
    ],
    "frilanser@example.no",
  );

  assert.equal(match?.email, "Frilanser@Example.no");
});

test("looksLikeObfuscatedExistingUser only matches users without identities", () => {
  assert.equal(
    looksLikeObfuscatedExistingUser({
      identities: [],
    }),
    true,
  );

  assert.equal(
    looksLikeObfuscatedExistingUser({
      identities: [{ id: "identity-1" }],
    }),
    false,
  );

  assert.equal(
    looksLikeObfuscatedExistingUser({
      identities: null,
    }),
    false,
  );
});

test("mapRegistrationErrorMessage returns the duplicate-email copy for already registered users", () => {
  assert.equal(mapRegistrationErrorMessage("User already registered"), DUPLICATE_EMAIL_MESSAGE);
  assert.equal(mapRegistrationErrorMessage("Password should be at least 10 characters"), "Passordet må være lengre. Minst 10 tegn.");
  assert.equal(
    mapRegistrationErrorMessage(undefined),
    "Vi kunne ikke lagre informasjonen akkurat nå. Prøv igjen.",
  );
});
