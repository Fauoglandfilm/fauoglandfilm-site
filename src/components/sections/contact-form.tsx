"use client";

import { useState } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";
import { normalizeContactFormPayload, type ContactFormPayload } from "@/lib/contact-form";
import { uiCopy } from "@/data/ui-copy";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

const initialState: ContactFormPayload = {
  name: "",
  company: "",
  email: "",
  message: "",
  website: "",
  turnstileToken: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<ContactFormPayload>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitSuccessfully, setDidSubmitSuccessfully] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const { language } = useSitePreferences();
  const copy = uiCopy.form[language];
  const genericSubmitError =
    language === "no" ? "Kunne ikke sende. Prøv igjen." : "Could not send. Please try again.";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setDidSubmitSuccessfully(false);

    try {
      if (turnstileSiteKey && !turnstileToken) {
        throw new Error(copy.botCheckMessage);
      }

      const payload = normalizeContactFormPayload({
        ...formState,
        turnstileToken: turnstileToken ?? "",
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.ok) {
        if (result?.message) {
          throw new Error(result.message);
        }

        throw new Error(genericSubmitError);
      }

      setDidSubmitSuccessfully(true);
      setFormState(initialState);
      setTurnstileToken(null);
      setTurnstileResetKey((current) => current + 1);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : genericSubmitError,
      );
      if (turnstileSiteKey) {
        setTurnstileToken(null);
        setTurnstileResetKey((current) => current + 1);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form-shell relative grid gap-4" onSubmit={handleSubmit} id="foresporsel">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formState.website}
          onChange={(event) =>
            setFormState((current) => ({ ...current, website: event.target.value }))
          }
        />
      </div>

      <div className="contact-form-row grid gap-4 md:grid-cols-2">
        <label className="contact-form-field space-y-2.5">
          <span className="contact-form-label text-sm font-medium text-[color:var(--foreground)]">{copy.name}</span>
          <input
            className="form-input contact-form-input"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({ ...current, name: event.target.value }))
            }
            required
          />
        </label>
        <label className="contact-form-field space-y-2.5">
          <span className="contact-form-label text-sm font-medium text-[color:var(--foreground)]">{copy.company}</span>
          <input
            className="form-input contact-form-input"
            name="company"
            autoComplete="organization"
            maxLength={160}
            value={formState.company}
            onChange={(event) =>
              setFormState((current) => ({ ...current, company: event.target.value }))
            }
          />
        </label>
      </div>

      <div className="contact-form-row grid gap-4 md:grid-cols-2">
        <label className="contact-form-field space-y-2.5">
          <span className="contact-form-label text-sm font-medium text-[color:var(--foreground)]">{copy.email}</span>
          <input
            className="form-input contact-form-input"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={160}
            value={formState.email}
            onChange={(event) =>
              setFormState((current) => ({ ...current, email: event.target.value }))
            }
            required
          />
        </label>
        <div />
      </div>

      <label className="contact-form-field space-y-2.5">
        <span className="contact-form-label text-sm font-medium text-[color:var(--foreground)]">{copy.message}</span>
        <textarea
          className="form-input contact-form-input contact-form-textarea min-h-32 resize-y"
          name="message"
          rows={5}
          minLength={12}
          maxLength={4000}
          value={formState.message}
          onChange={(event) =>
            setFormState((current) => ({ ...current, message: event.target.value }))
          }
          placeholder={copy.placeholder}
          required
        />
      </label>

      {turnstileSiteKey ? (
        <div className="pt-1">
          <TurnstileWidget
            siteKey={turnstileSiteKey}
            resetKey={turnstileResetKey}
            onTokenChange={setTurnstileToken}
            className="min-h-[65px]"
          />
        </div>
      ) : null}

      <div className="contact-form-actions flex flex-col gap-3 pt-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="contact-form-feedback space-y-2">
          {didSubmitSuccessfully ? (
            <div
              role="status"
              className="contact-form-status rounded-[1rem] border border-[var(--accent)]/24 bg-[var(--accent)]/10 px-4 py-3 text-sm leading-6 text-[color:var(--foreground)]"
            >
              <p className="font-semibold text-[color:var(--foreground)]">{copy.successMessage}</p>
            </div>
          ) : null}
          {submitError ? (
            <div
              role="alert"
              className="contact-form-status rounded-[1rem] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 text-sm leading-6 text-[color:var(--foreground)]"
            >
              {submitError}
            </div>
          ) : null}
        </div>
        <Button
          type="submit"
          fullWidth
          className="contact-form-submit sm:w-auto [--button-bg-current:#171717] [--button-border-current:rgba(17,17,17,0.16)] [--button-text-current:#f7f3ea] hover:[--button-bg-current:#202020] hover:[--button-border-current:rgba(17,17,17,0.22)] active:[--button-bg-current:#111111] active:[--button-border-current:rgba(17,17,17,0.24)] [html[data-theme='dark']_&]:[--button-bg-current:#f2eadb] [html[data-theme='dark']_&]:[--button-border-current:rgba(255,255,255,0.14)] [html[data-theme='dark']_&]:[--button-text-current:#111111] [html[data-theme='dark']_&]:hover:[--button-bg-current:#fff6e7]"
        >
          {isSubmitting ? "..." : copy.submit}
        </Button>
      </div>
    </form>
  );
}
