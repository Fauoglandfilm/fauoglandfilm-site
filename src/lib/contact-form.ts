import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(12).max(4000),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

export function normalizeContactFormPayload(payload: ContactFormPayload): ContactFormPayload {
  return {
    name: payload.name.trim(),
    company: payload.company.trim(),
    email: payload.email.trim(),
    message: payload.message.trim(),
  };
}
