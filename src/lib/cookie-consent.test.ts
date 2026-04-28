import assert from "node:assert/strict";
import test from "node:test";

import {
  createCookieConsentRecord,
  parseCookieConsent,
  readCookieValue,
  serializeCookieConsent,
} from "@/lib/cookie-consent";

test("cookie consent round-trips through serialization", () => {
  const consent = createCookieConsentRecord({
    analytics: true,
    externalMedia: true,
    marketing: false,
  });

  const parsed = parseCookieConsent(serializeCookieConsent(consent));

  assert.deepEqual(parsed, consent);
});

test("invalid cookie consent payload returns null", () => {
  assert.equal(parseCookieConsent("not-json"), null);
  assert.equal(
    parseCookieConsent(
      encodeURIComponent(
        JSON.stringify({
          analytics: "yes",
          externalMedia: false,
          marketing: false,
          consentedAt: new Date().toISOString(),
          version: "1",
        }),
      ),
    ),
    null,
  );
});

test("readCookieValue extracts the requested cookie", () => {
  const cookieValue = readCookieValue(
    "fau_cookie_consent",
    "foo=bar; fau_cookie_consent=abc123; theme=dark",
  );

  assert.equal(cookieValue, "abc123");
});
