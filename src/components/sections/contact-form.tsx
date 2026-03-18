"use client";

import { useState } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { Button } from "@/components/ui/button";
import type { ContactFormPayload } from "@/lib/contact-form";
import { uiCopy } from "@/data/ui-copy";

const initialState: ContactFormPayload = {
  name: "",
  company: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<ContactFormPayload>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didTriggerSubmit, setDidTriggerSubmit] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { language } = useSitePreferences();
  const copy = uiCopy.form[language];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "Kunne ikke sende skjemaet.");
      }

      setDidTriggerSubmit(true);
      setFormState(initialState);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : language === "no"
            ? "Noe gikk galt. Prøv igjen."
            : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-3.5" onSubmit={handleSubmit} id="foresporsel">
      <div className="grid gap-3.5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">{copy.name}</span>
          <input
            className="form-input"
            name="name"
            autoComplete="name"
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({ ...current, name: event.target.value }))
            }
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">{copy.company}</span>
          <input
            className="form-input"
            name="company"
            autoComplete="organization"
            value={formState.company}
            onChange={(event) =>
              setFormState((current) => ({ ...current, company: event.target.value }))
            }
          />
        </label>
      </div>

      <div className="grid gap-3.5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">{copy.email}</span>
          <input
            className="form-input"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={formState.email}
            onChange={(event) =>
              setFormState((current) => ({ ...current, email: event.target.value }))
            }
            required
          />
        </label>
        <div />
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-[color:var(--foreground)]">{copy.message}</span>
        <textarea
          className="form-input min-h-32 resize-y"
          name="message"
          rows={5}
          value={formState.message}
          onChange={(event) =>
            setFormState((current) => ({ ...current, message: event.target.value }))
          }
          placeholder={copy.placeholder}
          required
        />
      </label>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm leading-6 text-[var(--muted)]">
            {language === "no" ? "Vi følger opp innen 24 timer." : "We follow up within 24 hours."}
          </p>
          {didTriggerSubmit ? (
            <div className="rounded-[1rem] border border-[var(--accent)]/24 bg-[var(--accent)]/10 px-4 py-3 text-sm leading-6 text-[color:var(--foreground)]">
              <p className="font-semibold text-[color:var(--foreground)]">{copy.successTitle}</p>
              <p className="mt-1 text-[var(--muted-2)]">{copy.successDescription}</p>
            </div>
          ) : null}
          {submitError ? (
            <div className="rounded-[1rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 text-sm leading-6 text-[color:var(--foreground)]">
              {submitError}
            </div>
          ) : null}
        </div>
        <Button type="submit" fullWidth className="sm:w-auto">
          {isSubmitting ? "..." : copy.submit}
        </Button>
      </div>
    </form>
  );
}
