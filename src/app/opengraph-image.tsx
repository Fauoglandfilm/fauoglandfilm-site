import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top left, rgba(226,194,122,0.22), transparent 26%), linear-gradient(135deg, #091120 0%, #0f1d35 55%, #07101f 100%)",
          color: "white",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#e8d39d",
          }}
        >
          <span>Fau&Land Film</span>
          <span>Oslo · Norway</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
          <div style={{ fontSize: 76, lineHeight: 0.96, fontWeight: 700 }}>
            Film som blir sett.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#ced7e7" }}>
            Video og visuelt innhold som bygger synlighet, tillit og flere henvendelser.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 28,
          }}
        >
          {["Book møte", "Oslo", "Premium B2B"].map((item) => (
            <div
              key={item}
              style={{
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 999,
                padding: "14px 24px",
                color: item === "Book møte" ? "#08111f" : "white",
                background: item === "Book møte" ? "#e2c27a" : "rgba(255,255,255,0.05)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
