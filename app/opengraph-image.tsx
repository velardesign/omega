import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Boreal Móveis | Vidro e Alumínio Sob Medida — Arujá SP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#000000",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 16,
                }}
            >
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, letterSpacing: 8, textTransform: "uppercase", margin: 0 }}>
                    Arujá · Mogi das Cruzes · Guarulhos
                </p>
                <p style={{ color: "#ffffff", fontSize: 72, fontWeight: 300, margin: 0 }}>
                    Boreal Móveis
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 28, fontWeight: 300, margin: 0 }}>
                    Vidro e Alumínio Sob Medida
                </p>
                <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.2)", margin: "8px 0" }} />
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 18, margin: 0 }}>
                    (11) 94542-7947
                </p>
            </div>
        ),
        { ...size }
    );
}