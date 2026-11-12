import { ImageResponse } from "next/og";
import { site } from "@/lib/content";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    (<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0B2545", color: "#fff" }}>
      <div style={{ fontSize: 72, fontWeight: 700 }}>{site.name}</div>
      <div style={{ fontSize: 36, marginTop: 24, color: "#E2E8F0" }}>Import & Export · Store · Marketplace · Printing</div>
    </div>), size);
}
