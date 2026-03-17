import type { ContactFormPayload } from "@/lib/contact-form";

export function ContactNotificationEmail({
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
      <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>Ny henvendelse fra nettsiden</h1>
      <p style={{ margin: "0 0 18px" }}>
        En ny forespørsel er sendt inn via Fau&amp;Land Film sin kontaktside.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {[
            ["Navn", payload.name],
            ["Firma", payload.company || "-"],
            ["E-post", payload.email],
            ["Telefon", payload.phone || "-"],
            ["Prosjekttype", payload.projectType || "-"],
            ["Budsjett", payload.budget || "-"],
          ].map(([label, value]) => (
            <tr key={label}>
              <td
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                  width: "140px",
                  fontWeight: 700,
                }}
              >
                {label}
              </td>
              <td style={{ padding: "8px 0", borderBottom: "1px solid #e5e7eb" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "18px" }}>
        <h2 style={{ fontSize: "16px", marginBottom: "8px" }}>Prosjektbeskrivelse</h2>
        <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{payload.message}</p>
      </div>
    </div>
  );
}
