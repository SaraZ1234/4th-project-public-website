"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { try { setShow(!localStorage.getItem("consent")); } catch { setShow(true); } }, []);
  if (!show) return null;
  const pick = (v: string) => { try { localStorage.setItem("consent", v); } catch {} setShow(false); /* load analytics only when v === "all" */ };
  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 shadow-lg">
      <div className="container-x flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-3xl text-sm">We use essential cookies. Analytics and tracking run only if you accept. See our <Link href="/privacy-policy" className="text-teal underline">Privacy Policy</Link>.</p>
        <div className="flex gap-2">
          <button onClick={() => pick("essential")} className="min-h-11 rounded-lg border-[1.5px] border-navy px-4 font-semibold text-navy">Essential only</button>
          <button onClick={() => pick("all")} className="min-h-11 rounded-lg bg-amber px-4 font-semibold text-navy hover:bg-amber-hover">Accept all</button>
        </div>
      </div>
    </div>
  );
}
export function BackToTop() {
  const [on, setOn] = useState(false);
  useEffect(() => { const f = () => setOn(window.scrollY > 800); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return on ? <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0 })} className="fixed bottom-20 right-4 z-40 flex size-11 items-center justify-center rounded-full bg-navy text-white"><ArrowUp size={20} /></button> : null;
}
export function Search({ items, label }: { items: { name: string; href: string; text: string }[]; label: string }) {
  const [q, setQ] = useState("");
  const r = items.filter((i) => (i.name + i.text).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <label htmlFor="s" className="font-medium">{label}</label>
      <input id="s" type="search" value={q} onChange={(e) => setQ(e.target.value)} className="mt-1 min-h-12 w-full max-w-md rounded-lg border border-line px-3" />
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {r.map((i) => <li key={i.href} className="rounded-xl border border-line bg-white p-6"><h3 className="text-xl">{i.name}</h3><p className="mt-2 text-muted">{i.text}</p><Link href={i.href} className="mt-4 inline-block font-semibold text-teal hover:underline">View</Link></li>)}
      </ul>
      {r.length === 0 && <p className="mt-6 text-muted">No matches. Clear the search to see everything.</p>}
    </div>
  );
}
