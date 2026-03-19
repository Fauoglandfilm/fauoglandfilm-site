import "server-only";

import type { ContactFormPayload } from "@/lib/contact-form";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatMultiline = (value: string) => escapeHtml(value).replaceAll("\n", "<br />");

export function buildNotificationEmail(payload: ContactFormPayload) {
  const rows = [
    ["Navn", payload.name],
    ["Firma", payload.company || "Ikke oppgitt"],
    ["E-post", payload.email],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;width:140px;font-weight:700;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return {
    subject: "Ny forespørsel fra nettsiden",
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.6;">
        <h1 style="font-size:22px;margin-bottom:8px;">Ny henvendelse fra nettsiden</h1>
        <p style="margin:0 0 18px;">En ny forespørsel er sendt inn via Fau&amp;Land Film sin kontaktside.</p>
        <table style="width:100%;border-collapse:collapse;"><tbody>${rows}</tbody></table>
        <div style="margin-top:18px;">
          <h2 style="font-size:16px;margin-bottom:8px;">Prosjektbeskrivelse</h2>
          <p style="white-space:pre-wrap;margin:0;">${formatMultiline(payload.message)}</p>
        </div>
      </div>`,
    text: [
      "Ny henvendelse fra nettsiden",
      "",
      `Navn: ${payload.name}`,
      `Firma: ${payload.company || "Ikke oppgitt"}`,
      `E-post: ${payload.email}`,
      "",
      "Prosjektbeskrivelse:",
      payload.message,
    ].join("\n"),
  };
}

export function buildConfirmationEmail(payload: ContactFormPayload) {
  return {
    subject: "Vi har mottatt forespørselen din",
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.6;">
        <h1 style="font-size:22px;margin-bottom:8px;">Takk for henvendelsen</h1>
        <p style="margin:0 0 14px;">Hei ${escapeHtml(payload.name)}, vi har mottatt forespørselen din.</p>
        <p style="margin:0 0 14px;">Vi ser gjennom briefen, vurderer format og omfang, og kommer tilbake med anbefalt neste steg.</p>
        <div style="margin-top:18px;padding:14px 16px;border-radius:14px;background:#f3f4f6;">
          <p style="margin:0;font-weight:700;">Kort oppsummering</p>
          <p style="margin:8px 0 0;white-space:pre-wrap;">${formatMultiline(payload.message)}</p>
        </div>
      </div>`,
    text: [
      "Takk for henvendelsen",
      "",
      `Hei ${payload.name}, vi har mottatt forespørselen din.`,
      "Vi ser gjennom briefen, vurderer format og omfang, og kommer tilbake med anbefalt neste steg.",
      "",
      "Kort oppsummering:",
      payload.message,
    ].join("\n"),
  };
}
