"use client";

import { useState } from "react";

import { siteConfig } from "@/data/site-content";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Koble denne formen til CRM, API-rute eller Calendly-flow når backend er klar.
    const subject = encodeURIComponent(
      `Ny forespørsel fra ${formState.company || formState.name || "nettsiden"}`,
    );
    const body = encodeURIComponent(
      [
        `Navn: ${formState.name}`,
        `Firma: ${formState.company}`,
        `E-post: ${formState.email}`,
        `Telefon: ${formState.phone}`,
        "",
        "Melding:",
        formState.message,
      ].join("\n"),
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="grid gap-3.5" onSubmit={handleSubmit} id="foresporsel">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white">Navn</span>
          <input
            className="form-input"
            name="name"
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({ ...current, name: event.target.value }))
            }
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-white">Firma</span>
          <input
            className="form-input"
            name="company"
            value={formState.company}
            onChange={(event) =>
              setFormState((current) => ({ ...current, company: event.target.value }))
            }
          />
        </label>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white">E-post</span>
          <input
            className="form-input"
            name="email"
            type="email"
            value={formState.email}
            onChange={(event) =>
              setFormState((current) => ({ ...current, email: event.target.value }))
            }
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-white">Telefon</span>
          <input
            className="form-input"
            name="phone"
            type="tel"
            value={formState.phone}
            onChange={(event) =>
              setFormState((current) => ({ ...current, phone: event.target.value }))
            }
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-white">Melding</span>
        <textarea
          className="form-input min-h-32 resize-y"
          name="message"
          value={formState.message}
          onChange={(event) =>
            setFormState((current) => ({ ...current, message: event.target.value }))
          }
          placeholder="Fortell kort hva dere trenger og hva innholdet skal brukes til."
          required
        />
      </label>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[var(--muted)]">{siteConfig.responseTime}</p>
        <button type="submit" className="button-primary">
          Send forespørsel
        </button>
      </div>
    </form>
  );
}
