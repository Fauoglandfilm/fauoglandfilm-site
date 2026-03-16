"use client";

import { useState } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didTriggerSubmit, setDidTriggerSubmit] = useState(false);
  const { language } = useSitePreferences();
  const copy = uiCopy.form[language];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setDidTriggerSubmit(true);

    // Koble denne formen til CRM, API-rute eller Calendly-flow når backend er klar.
    const subject = encodeURIComponent(
      `${copy.subjectPrefix} ${formState.company || formState.name || copy.subjectFallback}`,
    );
    const body = encodeURIComponent(
      [
        `${copy.name}: ${formState.name}`,
        `${copy.company}: ${formState.company}`,
        `${copy.email}: ${formState.email}`,
        `${copy.phone}: ${formState.phone}`,
        `${copy.projectType}: ${formState.projectType || "-"}`,
        `${copy.budget}: ${formState.budget || "-"}`,
        "",
        copy.messageLabel,
        formState.message,
      ].join("\n"),
    );

    window.setTimeout(() => {
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
    }, 120);
  };

  return (
    <form className="grid gap-3.5" onSubmit={handleSubmit} id="foresporsel">
      <div className="grid gap-3.5 sm:grid-cols-2">
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

      <div className="grid gap-3.5 sm:grid-cols-2">
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
        <label className="space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">{copy.phone}</span>
          <input
            className="form-input"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={formState.phone}
            onChange={(event) =>
              setFormState((current) => ({ ...current, phone: event.target.value }))
            }
          />
        </label>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">{copy.projectType}</span>
          <select
            className="form-input"
            name="projectType"
            value={formState.projectType}
            onChange={(event) =>
              setFormState((current) => ({ ...current, projectType: event.target.value }))
            }
          >
            <option value="">{copy.projectType}</option>
            {copy.projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-[color:var(--foreground)]">{copy.budget}</span>
          <select
            className="form-input"
            name="budget"
            value={formState.budget}
            onChange={(event) =>
              setFormState((current) => ({ ...current, budget: event.target.value }))
            }
          >
            <option value="">{copy.budget}</option>
            {copy.budgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
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
            {resolveLocalizedValue(siteConfig.responseTime, language)}
          </p>
          {didTriggerSubmit ? (
            <div className="rounded-[1rem] border border-[var(--accent)]/24 bg-[var(--accent)]/10 px-4 py-3 text-sm leading-6 text-[color:var(--foreground)]">
              <p className="font-semibold text-[color:var(--foreground)]">{copy.successTitle}</p>
              <p className="mt-1 text-[var(--muted-2)]">{copy.successDescription}</p>
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
