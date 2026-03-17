import { NextResponse } from "next/server";

import { ContactConfirmationEmail } from "@/components/emails/contact-confirmation-email";
import { ContactNotificationEmail } from "@/components/emails/contact-notification-email";
import { siteConfig } from "@/data/site-content";
import { contactFormSchema } from "@/lib/contact-form";
import { appEnv, hasResendConfig, resendDefaults } from "@/lib/env";
import { getResend } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = contactFormSchema.parse(json);

    if (!hasResendConfig()) {
      return NextResponse.json(
        {
          ok: false,
          message: "RESEND_API_KEY must be configured on the server.",
        },
        { status: 503 },
      );
    }

    const resend = getResend();
    const from = appEnv.resendFromEmail ?? resendDefaults.fromEmail;
    const to = appEnv.contactToEmail ?? resendDefaults.toEmail ?? siteConfig.email;

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

    return NextResponse.json(
      {
        ok: false,
        message: "Kunne ikke sende henvendelsen akkurat nå.",
      },
      { status: 400 },
    );
  }
}
