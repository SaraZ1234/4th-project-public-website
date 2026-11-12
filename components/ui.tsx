import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const base = "inline-flex items-center justify-center rounded-lg px-6 font-semibold transition-colors min-h-12";
export function Button({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "onDark" }) {
  const v = {
    primary: "bg-amber text-navy hover:bg-amber-hover",
    secondary: "border-[1.5px] border-navy text-navy hover:bg-surface",
    onDark: "border-[1.5px] border-white text-white hover:bg-white/10",
  }[variant];
  const Cmp = href.startsWith("http") ? "a" : Link; // app links open in the same tab
  return <Cmp href={href} className={`${base} ${v}`}>{children}</Cmp>;
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-1 font-semibold text-teal hover:underline">{children}<ArrowRight size={18} aria-hidden /></Link>;
}
export function Section({ id, alt, title, intro, children }: { id?: string; alt?: boolean; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className={`section ${alt ? "bg-surface" : "bg-white"}`}>
      <div className="container-x">
        <div className="mb-10 max-w-2xl"><h2>{title}</h2>{intro && <p className="mt-3 text-lg text-muted">{intro}</p>}</div>
        {children}
      </div>
    </section>
  );
}
export function OwnershipBadge({ owner }: { owner: "org" | "seller" }) {
  return owner === "org"
    ? <span className="rounded-md bg-navy px-2 py-0.5 text-xs font-semibold text-white">Sold by Organization</span>
    : <span className="rounded-md border border-biz-market px-2 py-0.5 text-xs font-semibold text-biz-market">Marketplace Seller</span>;
}
