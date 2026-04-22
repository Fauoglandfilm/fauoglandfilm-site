"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[global-error-boundary]", {
      message: error?.message,
      digest: error?.digest,
      stack: error?.stack,
    });
  }, [error]);

  return (
    <html lang="nb">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: "#ffffff",
          color: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "36rem", width: "100%" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#777",
              margin: "0 0 0.85rem 0",
            }}
          >
            Midlertidig feil
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              margin: "0 0 0.9rem 0",
              fontWeight: 700,
            }}
          >
            Siden kunne ikke lastes
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "#444",
              margin: "0 0 1.5rem 0",
            }}
          >
            Noe gikk galt hos oss akkurat nå. Prøv på nytt om et øyeblikk, eller gå tilbake til
            forsiden.
          </p>
          {error?.digest ? (
            <p
              style={{
                fontSize: "0.78rem",
                color: "#888",
                margin: "0 0 1.5rem 0",
              }}
            >
              Feilkode: {error.digest}
            </p>
          ) : null}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                appearance: "none",
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                padding: "0.7rem 1.15rem",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "0.92rem",
                cursor: "pointer",
              }}
            >
              Prøv igjen
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid #d6d6d6",
                color: "#111",
                padding: "0.7rem 1.15rem",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "0.92rem",
                textDecoration: "none",
              }}
            >
              Til forsiden
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
