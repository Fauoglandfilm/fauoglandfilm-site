import { Resend } from "resend";

import { getResendConfig } from "@/lib/server/resend-config";

let resendInstance: Resend | null = null;

export function getResend() {
  if (!resendInstance) {
    const config = getResendConfig();

    if (!config.apiKey) {
      throw new Error("Missing required server configuration: RESEND_API_KEY");
    }

    resendInstance = new Resend(config.apiKey);
  }

  return resendInstance;
}
