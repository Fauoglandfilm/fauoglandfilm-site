import { siteConfig } from "@/data/site-content";

import { FRILANSEREN_CONSENT_TEXT_VERSION } from "./constants";
import type { DataRequestType } from "./types";

export const EMPLOYER_CONSENT_TEXT =
  "Jeg samtykker til at Fau&Land Film behandler mine personopplysninger for å opprette og administrere min konto, og kontakte meg om piloten, i tråd med personvernerklæringen.";

export const FREELANCER_CONSENT_TEXT =
  "Jeg samtykker til at Fau&Land Film behandler mine personopplysninger for å opprette og administrere min konto, og kontakte meg om piloten og relevante oppdrag, i tråd med personvernerklæringen.";

export const PRIVACY_SECTION_COPY =
  "Du kan når som helst be om innsyn i eller sletting av dataene dine.";

export const ACCESS_REQUEST_SUCCESS_MESSAGE =
  "Vi har registrert forespørselen din. Du får svar på e-post når den er behandlet.";

export const DELETE_REQUEST_SUCCESS_MESSAGE =
  "Vi har registrert at du ønsker å slette kontoen din. Du vil bli logget ut nå, og vi behandler slettingen i tråd med våre rutiner.";

export function getConsentText(role: "employer" | "freelancer") {
  return role === "employer" ? EMPLOYER_CONSENT_TEXT : FREELANCER_CONSENT_TEXT;
}

export function getConsentTextVersion() {
  return FRILANSEREN_CONSENT_TEXT_VERSION;
}

export function getPrivacyContactEmail() {
  return siteConfig.email;
}

export function buildDataRequestPayload(requestType: DataRequestType) {
  return {
    request_type: requestType,
    status: "open" as const,
  };
}
