import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160),
  email: z.email().max(160),
  message: z.string().trim().min(12).max(4000),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
