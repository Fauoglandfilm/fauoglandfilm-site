import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(12).max(4000),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
