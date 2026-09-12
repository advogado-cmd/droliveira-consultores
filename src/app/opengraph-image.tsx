import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#082533", color: "#EFEBE6", padding: 72, fontFamily: "serif", borderBottom: "14px solid #CCAB76" }}>
        <div style={{ fontSize: 24, letterSpacing: 6, color: "#CCAB76" }}>DR.OLIVEIRA · CONSULTORES</div>
        <div style={{ fontSize: 60, lineHeight: 1.15, maxWidth: 1000 }}>Ampliar a visão. Destravar áreas. Crescer de novo.</div>
        <div style={{ fontSize: 26, color: "#A9B79E" }}>Estratégia · Mercado · Regulação — droliveiraconsultores.com.br</div>
      </div>
    ),
    size
  );
}
