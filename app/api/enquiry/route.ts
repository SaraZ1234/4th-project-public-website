import { NextResponse } from "next/server";
// The website stores nothing. It validates, protects against abuse, then forwards to the
// endpoint owned by the Web Application / Admin Panel team (ENQUIRY_ENDPOINT).
const hits = new Map<string, number[]>();
const LIMIT = 5, WINDOW = 10 * 60_000; // 5 enquiries per IP per 10 minutes (use Redis/edge limits in production)

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now(); const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false }, { status: 400 });
  if (b.website) return NextResponse.json({ ok: true }); // honeypot

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret, response: b["cf-turnstile-response"] ?? "", remoteip: ip }) });
    if (!(await r.json()).success) return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  }
  const s = (k: string) => String(b[k] ?? "").trim();
  if (s("name").length < 2 || !/^\S+@\S+\.\S+$/.test(s("email")) || s("subject").length < 5 || s("message").length < 20 || !b.consent)
    return NextResponse.json({ ok: false }, { status: 422 });

  const target = process.env.ENQUIRY_ENDPOINT;
  if (!target) return NextResponse.json({ ok: true, reference: "DEMO-0001" });
  const r = await fetch(target, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) });
  if (!r.ok) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json(await r.json().catch(() => ({ ok: true })));
}
