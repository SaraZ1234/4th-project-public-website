"use client";
import { useState, type FormEvent } from "react";
import Script from "next/script";

const categories = ["General", "Products", "Marketplace / Seller participation", "Import & Export", "Printing", "Customer support", "Other"];
const businessesList = ["Import & Export", "Own Store", "Marketplace", "Printing", "Other"];
type Errors = Record<string, string>;

export default function EnquiryForm({ defaultCategory = "General" }: { defaultCategory?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [ref, setRef] = useState<string | null>(null);

  function validate(d: FormData): Errors {
    const e: Errors = {}; const s = (k: string) => String(d.get(k) ?? "").trim();
    if (s("name").length < 2 || s("name").length > 80) e.name = "Enter your full name (2 to 80 characters).";
    if (!/^\S+@\S+\.\S+$/.test(s("email"))) e.email = "Enter a valid email address, like name@example.com.";
    if (s("subject").length < 5 || s("subject").length > 120) e.subject = "Subject must be 5 to 120 characters.";
    if (s("message").length < 20 || s("message").length > 2000) e.message = "Message must be 20 to 2000 characters.";
    if (!d.get("consent")) e.consent = "Agree to the Privacy Policy to send your enquiry.";
    return e;
  }
  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget; const data = new FormData(form);
    const e = validate(data); setErrors(e);
    if (Object.keys(e).length) { requestAnimationFrame(() => document.getElementById("error-summary")?.focus()); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: JSON.stringify(Object.fromEntries(data)), headers: { "Content-Type": "application/json" } });
      if (res.status === 429) { setStatus("fail"); return; }
      if (!res.ok) throw new Error();
      const j = await res.json().catch(() => ({})); setRef(j.reference ?? null); setStatus("ok"); form.reset();
    } catch { setStatus("fail"); }
  }
  if (status === "ok") return (
    <div role="status" className="rounded-xl border border-line bg-surface p-8">
      <h2 className="text-2xl">Enquiry sent</h2>
      <p className="mt-2 text-muted">Thank you. Our team will reply by email.{ref && <> Your reference number is <strong>{ref}</strong>.</>}</p>
    </div>
  );
  const field = "mt-1 min-h-12 w-full rounded-lg border border-line px-3";
  const Err = ({ k }: { k: string }) => errors[k] ? <p id={`${k}-err`} className="mt-1 text-sm font-medium text-error">⚠ {errors[k]}</p> : null;
  const a = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {Object.keys(errors).length > 0 && (
        <div id="error-summary" tabIndex={-1} role="alert" className="rounded-lg border border-error p-4 text-sm">
          <p className="font-semibold text-error">Fix these before sending:</p>
          <ul className="mt-1 list-disc pl-5">{Object.entries(errors).map(([k, v]) => <li key={k}><a href={`#${k}`} className="underline">{v}</a></li>)}</ul>
        </div>
      )}
      {status === "fail" && <p role="alert" className="rounded-lg border border-error p-4 text-sm">We could not send your enquiry. Your details are kept below. Check your connection and try again.</p>}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" /> {/* honeypot */}
      <div><label htmlFor="name" className="font-medium">Full name</label><input id="name" name="name" autoComplete="name" className={field} {...a("name")} /><Err k="name" /></div>
      <div><label htmlFor="email" className="font-medium">Email address</label><input id="email" name="email" type="email" autoComplete="email" className={field} {...a("email")} /><Err k="email" /></div>
      <div><label htmlFor="phone" className="font-medium">Contact number (optional)</label><input id="phone" name="phone" type="tel" autoComplete="tel" className={field} /></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="category" className="font-medium">Enquiry category</label><select id="category" name="category" defaultValue={defaultCategory} className={field}>{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label htmlFor="business" className="font-medium">Relevant business</label><select id="business" name="business" className={field}>{businessesList.map((c) => <option key={c}>{c}</option>)}</select></div>
      </div>
      <div><label htmlFor="subject" className="font-medium">Subject</label><input id="subject" name="subject" className={field} {...a("subject")} /><Err k="subject" /></div>
      <div><label htmlFor="message" className="font-medium">Message</label><textarea id="message" name="message" rows={6} className={`${field} py-2`} {...a("message")} /><Err k="message" /></div>
      <div><label className="flex items-start gap-2"><input id="consent" name="consent" type="checkbox" className="mt-1.5 size-5" {...a("consent")} /><span>I agree to the <a href="/privacy-policy" className="text-teal underline">Privacy Policy</a>.</span></label><Err k="consent" /></div>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" /><div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} /></>}
      <button disabled={status === "sending"} className="min-h-12 rounded-lg bg-amber px-6 font-semibold text-navy hover:bg-amber-hover disabled:opacity-50">{status === "sending" ? "Sending…" : status === "fail" ? "Try again" : "Send enquiry"}</button>
    </form>
  );
}
