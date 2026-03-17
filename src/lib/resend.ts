import { Resend } from "resend";

import { appEnv, readRequiredEnv } from "@/lib/env";

let resendInstance: Resend | null = null;

export function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(readRequiredEnv(appEnv.resendApiKey, "RESEND_API_KEY"));
  }

  return resendInstance;
}
