import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { ContactConfirmationEmail } from "@/components/emails/contact-confirmation-email";
import { ContactNotificationEmail } from "@/components/emails/contact-notification-email";
import { contactFormSchema } from "@/lib/contact-form";
import { getResend } from "@/lib/resend";
import { getResendConfig, hasResendServerConfig } from "@/lib/server/resend-config";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = contactFormSchema.parse(json);

    if (!hasResendServerConfig()) {
      return NextResponse.json(
        {
          ok: false,
          message: "Kontaktskjemaet er midlertidig utilgjengelig. Prøv igjen snart.",
        },
        { status: 503 },
      );
    }

    const resend = getResend();
    const { fromEmail: from, toEmail: to } = getResendConfig();

    await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: "Ny forespørsel fra nettsiden",
      react: ContactNotificationEmail({ payload }),
    });

    await resend.emails.send({
      from,
      to: [payload.email],
      replyTo: to,
      subject: "Vi har mottatt forespørselen din",
      react: ContactConfirmationEmail({ payload }),
    });

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
