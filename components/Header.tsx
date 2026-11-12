"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { nav, businesses, site, APP_URL } from "@/lib/content";
import { Button } from "./ui";

/*
 Structure
 - Below 1280px: one row (logo + menu button). Everything else lives in the drawer.
 - 1280px and up: two rows. Row 1 = logo + search/login/register/seller. Row 2 = the nine nav links.
*/
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const [dd, setDd] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { setOpen(false); setDd(false); setSub(false); }, [path]);
  useEffect(() => { // lock page scroll and allow Escape while the drawer is open
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open]);
  useEffect(() => { // close the drawer if the window grows to desktop width
    const m = window.matchMedia("(min-width: 1280px)");
    const f = () => m.matches && setOpen(false);
    m.addEventListener("change", f); return () => m.removeEventListener("change", f);
  }, []);

  const link = (href: string) =>
    `whitespace-nowrap rounded-md px-3 py-3 text-[15px] font-semibold ${path === href ? "text-teal" : "text-navy hover:text-teal"}`;
  const bar = (href: string) => path === href ? "border-b-[3px] border-teal" : "border-b-[3px] border-transparent";

  return (
    <header className={`sticky top-0 z-40 bg-white ${scrolled ? "shadow-md" : "border-b border-line"}`}>
      {/* Row 1 */}
      <div className="container-x flex h-16 items-center justify-between gap-4 xl:h-[72px]">
        <Link href="/" aria-label={`${site.name} home`} className="min-w-0 truncate font-heading text-xl font-bold text-navy">{site.name}</Link>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link href="/search" aria-label="Search the website" className="flex size-11 items-center justify-center rounded-lg text-navy hover:bg-surface"><Search size={20} /></Link>
          <a href={`${APP_URL}/login`} className="px-2 font-semibold text-navy hover:text-teal">Login</a>
          <a href={`${APP_URL}/register`} className="inline-flex min-h-11 items-center rounded-lg border-[1.5px] border-navy px-4 font-semibold text-navy hover:bg-surface">Register</a>
          <a href={`${APP_URL}/seller/register`} className="inline-flex min-h-11 items-center rounded-lg bg-amber px-4 font-semibold text-navy hover:bg-amber-hover">Become a Seller</a>
        </div>

        <button
          className="flex size-11 shrink-0 items-center justify-center rounded-lg text-navy hover:bg-surface xl:hidden"
          aria-expanded={open} aria-controls="drawer" aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >{open ? <X /> : <Menu />}</button>
      </div>

      {/* Row 2: desktop navigation */}
      <div className="hidden border-t border-line xl:block">
        <nav aria-label="Main" className="container-x flex items-center justify-between">
          {nav.map((n) =>
            n.href === "/businesses" ? (
              <div
                key={n.href} className={`relative flex items-center ${bar(n.href)}`}
                onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDd(false); }}
                onKeyDown={(e) => e.key === "Escape" && setDd(false)}
              >
                <Link href={n.href} aria-current={path === n.href ? "page" : undefined} className={link(n.href)}>{n.label}</Link>
                <button aria-label="Show businesses menu" aria-expanded={dd} aria-haspopup="true" onClick={() => setDd(!dd)} className="-ml-2 flex size-8 items-center justify-center rounded text-navy"><ChevronDown size={16} className={dd ? "rotate-180" : ""} /></button>
                {dd && (
                  <ul className="absolute left-0 top-full z-50 w-60 rounded-lg border border-line bg-white p-2 shadow-lg">
                    {businesses.map((b) => <li key={b.slug}><Link href={b.href} className="block rounded-md px-3 py-2.5 font-medium text-navy hover:bg-surface">{b.name}</Link></li>)}
                  </ul>
                )}
              </div>
            ) : (
              <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined} className={`${link(n.href)} ${bar(n.href)} rounded-none`}>{n.label}</Link>
            )
          )}
        </nav>
      </div>

      {/* Mobile and tablet drawer */}
      {open && (
        <div id="drawer" className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-white xl:hidden">
          <div className="container-x py-4">
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((n) =>
                n.href === "/businesses" ? (
                  <div key={n.href} className="border-b border-line">
                    <div className="flex items-center justify-between">
                      <Link href={n.href} aria-current={path === n.href ? "page" : undefined} className={`flex-1 py-3 text-lg font-semibold ${path === n.href ? "text-teal" : "text-navy"}`}>{n.label}</Link>
                      <button aria-expanded={sub} aria-controls="biz-sub" aria-label="Toggle businesses list" onClick={() => setSub(!sub)} className="flex size-11 items-center justify-center text-navy"><ChevronDown className={sub ? "rotate-180" : ""} /></button>
                    </div>
                    {sub && <ul id="biz-sub" className="pb-3 pl-4">{businesses.map((b) => <li key={b.slug}><Link href={b.href} className="block py-2.5 text-navy">{b.name}</Link></li>)}</ul>}
                  </div>
                ) : (
                  <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined} className={`border-b border-line py-3 text-lg font-semibold ${path === n.href ? "text-teal" : "text-navy"}`}>{n.label}</Link>
                )
              )}
              <Link href="/search" className="border-b border-line py-3 text-lg font-semibold text-navy">Search</Link>
            </nav>
            <div className="flex flex-col gap-3 py-6 sm:flex-row sm:flex-wrap">
              <Button href={`${APP_URL}/login`} variant="secondary">Login</Button>
              <Button href={`${APP_URL}/register`} variant="secondary">Register</Button>
              <Button href={`${APP_URL}/seller/register`}>Become a Seller</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}