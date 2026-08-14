import { Search } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <h1
          style={{
            fontSize: "6rem",
            fontWeight: 700,
            color: "#D4AF37",
            margin: "0 0 8px",
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <div
          style={{
            width: 80,
            height: 4,
            background: "#D4AF37",
            borderRadius: 9999,
            margin: "0 auto 24px",
          }}
        />
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#1A1A1A",
            border: "1px solid #2A2A2A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <Search size={36} color="#888" />
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 12px",
          }}
        >
          Page Not Found
        </h2>
        <p style={{ color: "#888", margin: "0 0 32px", lineHeight: 1.6 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "10px 24px",
            background: "#D4AF37",
            color: "#000",
            fontWeight: 600,
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
