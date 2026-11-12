"use client";
import { useState } from "react";
import { OwnershipBadge, TextLink } from "./ui";
import Img from "./Img";

type P = { slug: string; name: string; desc: string; category: string; price: string; available: string; owner: "org" | "seller" };
export default function ProductGrid({ products, appUrl }: { products: P[]; appUrl: string }) {
  const [f, setF] = useState<"all" | "org" | "seller">("all");
  const shown = products.filter((p) => f === "all" || p.owner === f);
  const tab = (v: typeof f, t: string) => <button key={v} aria-pressed={f === v} onClick={() => setF(v)} className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${f === v ? "border-navy bg-navy text-white" : "border-line text-navy hover:bg-surface"}`}>{t}</button>;
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter products">{tab("all", "All")}{tab("org", "Our Store")}{tab("seller", "Marketplace")}</div>
      {shown.length === 0 ? <p className="text-muted">No products here yet.</p> : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((p) => (
            <article key={p.slug} className="group overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <Img src={`/images/${p.slug}.svg`} alt={`${p.name}`} className="aspect-square w-full" />
              <div className="space-y-2 p-5">
                <div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-teal">{p.category}</span><OwnershipBadge owner={p.owner} /></div>
                <h3 className="text-lg">{p.name}</h3>
                <p className="text-sm text-muted">{p.desc}</p>
                <p className="text-sm"><span className="font-semibold text-navy">{p.price}</span> <span className="text-muted">· {p.available}</span></p>
                <TextLink href={`${appUrl}/shop/${p.slug}`}>View details</TextLink>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}