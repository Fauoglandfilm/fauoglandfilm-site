import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { contactFormSchema } from "@/lib/contact-form";
import { getResend } from "@/lib/resend";
import {
  buildConfirmationEmail,
  buildNotificationEmail,
} from "@/lib/server/contact-email";
import { getResendConfig, hasResendServerConfig } from "@/lib/server/resend-config";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = contactFormSchema.parse(json);
    const notificationEmail = buildNotificationEmail(payload);
    const confirmationEmail = buildConfirmationEmail(payload);

    if (!hasResendServerConfig()) {
      console.warn("[contact] resend unavailable, storing submission in logs", {
        name: payload.name,
        company: payload.company,
        email: payload.email,
        messageLength: payload.message.length,
      });

      return NextResponse.json({ ok: true, delivery: "logged" });
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
        name: payload.name,
        company: payload.company,
        email: payload.email,
        messageLength: payload.message.length,
      });

      return NextResponse.json({ ok: true, delivery: "logged" });
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] submit failed", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          message: "Sjekk feltene og prøv igjen.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        message: "Kunne ikke sende henvendelsen akkurat nå.",
      },
      { status: 502 },
    );
  }
}
