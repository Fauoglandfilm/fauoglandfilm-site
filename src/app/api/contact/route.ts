import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { contactFormSchema, isContactFormSpam } from "@/lib/contact-form";
import { getResend } from "@/lib/resend";
import {
  buildConfirmationEmail,
  buildNotificationEmail,
} from "@/lib/server/contact-email";
import {
  getClientIp,
  limitContactRequest,
  verifyContactTurnstileToken,
} from "@/lib/server/contact-protection";
import { getResendConfig, hasResendServerConfig } from "@/lib/server/resend-config";

const JSON_MIME_TYPE = "application/json";
const ALLOW_HEADER = "POST, OPTIONS";
const MAX_CONTACT_REQUEST_BYTES = 24_000;

function jsonResponse(
  body: { ok: boolean; message?: string; delivery?: "logged" },
  status = 200,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function hasJsonContentType(request: Request) {
  const contentType = request.headers.get("content-type");

  return typeof contentType === "string" && contentType.toLowerCase().includes(JSON_MIME_TYPE);
}

function getContentLength(request: Request) {
  const value = Number(request.headers.get("content-length") ?? "");

  return Number.isFinite(value) ? value : null;
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: ALLOW_HEADER,
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  if (!hasJsonContentType(request)) {
    return jsonResponse({ ok: false, message: "Ugyldig innholdstype." }, 415);
  }

  const rateLimit = await limitContactRequest(request);

  if (!rateLimit.success) {
    const retryAfterSeconds = Math.max(1, Math.ceil((rateLimit.reset - Date.now()) / 1000));

    return jsonResponse(
      {
        ok: false,
        message: "For mange forespørsler. Vent litt og prøv igjen.",
      },
      429,
      {
        "Retry-After": String(retryAfterSeconds),
      },
    );
  }

  const contentLength = getContentLength(request);

  if (contentLength !== null && contentLength > MAX_CONTACT_REQUEST_BYTES) {
    return jsonResponse({ ok: false, message: "Forespørselen er for stor." }, 413);
  }

  try {
    const json = await request.json();
    const payload = contactFormSchema.parse(json);

    if (isContactFormSpam(payload)) {
      return jsonResponse({ ok: true });
    }

    const ipAddress = getClientIp(request);
    const turnstile = await verifyContactTurnstileToken(payload.turnstileToken, ipAddress);

    if (!turnstile.success) {
      console.warn("[contact] bot protection rejected request", {
        reason: turnstile.reason,
        details: turnstile.details,
      });

      return jsonResponse(
        {
          ok: false,
          message: "Bekreft at du ikke er en robot og prøv igjen.",
        },
        400,
      );
    }

    const notificationEmail = buildNotificationEmail(payload);
    const confirmationEmail = buildConfirmationEmail(payload);

    if (!hasResendServerConfig()) {
      console.warn("[contact] resend unavailable, storing submission in logs", {
        hasCompany: payload.company.length > 0,
        messageLength: payload.message.length,
      });

      return jsonResponse({ ok: true, delivery: "logged" });
    }

    const resend = getResend();
    const { fromEmail: from, toEmail: to } = getResendConfig();

    try {
      await resend.emails.send({
        from,
        to: [to],
        replyTo: payload.email,
        subject: notificationEmail.subject,
        html: notificationEmail.html,
        text: notificationEmail.text,
      });
    } catch (error) {
      console.error("[contact] notification delivery failed; falling back to logs", error);
      console.warn("[contact] submission stored in logs after delivery failure", {
        hasCompany: payload.company.length > 0,
        messageLength: payload.message.length,
      });

      return jsonResponse({ ok: true, delivery: "logged" });
    }

    try {
      await resend.emails.send({
        from,
        to: [payload.email],
        replyTo: to,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html,
        text: confirmationEmail.text,
      });
    } catch (error) {
      console.error("[contact] confirmation delivery failed", error);
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) {
      console.warn(
        "[contact] validation failed",
        error.issues.map((issue) => ({
          code: issue.code,
          path: issue.path.join("."),
        })),
      );

      return jsonResponse(
        {
          ok: false,
          message: "Sjekk feltene og prøv igjen.",
        },
        400,
      );
    }

    if (error instanceof SyntaxError) {
      return jsonResponse(
        {
          ok: false,
          message: "Ugyldig forespørsel.",
        },
        400,
      );
    }

    console.error("[contact] submit failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return jsonResponse(
      {
        ok: false,
        message: "Kunne ikke sende henvendelsen akkurat nå.",
      },
      502,
    );
  }
}
