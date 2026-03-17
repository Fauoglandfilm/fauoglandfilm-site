import type { ContactFormPayload } from "@/lib/contact-form";

export function ContactConfirmationEmail({
  payload,
}: {
  payload: ContactFormPayload;
}) {
  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#111827",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>Takk for henvendelsen</h1>
      <p style={{ margin: "0 0 14px" }}>
        Hei {payload.name}, vi har mottatt forespørselen din og følger opp innen 24 timer.
      </p>
      <p style={{ margin: "0 0 14px" }}>
        Vi ser gjennom briefen, vurderer format og omfang, og kommer tilbake med anbefalt neste steg.
      </p>
      <div
        style={{
          marginTop: "18px",
          padding: "14px 16px",
          borderRadius: "14px",
          background: "#f3f4f6",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>Kort oppsummering</p>
        <p style={{ margin: "8px 0 0", whiteSpace: "pre-wrap" }}>{payload.message}</p>
      </div>
    </div>
  );
}
