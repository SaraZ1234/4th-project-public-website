"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { nav, businesses, site, APP_URL } from "@/lib/content";

/*
 Layout
 - Below 1280px (phones, tablets, small laptops): one 64px row (logo + menu button).
   The menu opens a drawer: full width on phones, a right-hand panel with a dimmed backdrop from 640px up.
 - 1280px and up: one 76px row. Logo on the left, nav centred, search / login / register / seller on the right.
   "Our Businesses" opens a dropdown on hover, focus or click.
*/

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export default function Header() {
  const path = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const [dd, setDd] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  const active = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

  // Shadow once the page scrolls
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // Close everything on navigation
  useEffect(() => {
    setOpen(false);
    setDd(false);
    setSub(false);
  }, [path]);

  // Lock page scroll and handle Escape while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", k);
    };
  }, [open]);

  // Close the drawer if the window grows to desktop width
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1280px)");
    const f = () => m.matches && setOpen(false);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line bg-white transition-shadow duration-200 motion-reduce:transition-none ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 xl:h-[76px] xl:gap-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className={`min-w-0 shrink truncate rounded-md font-heading text-xl font-bold tracking-tight text-navy xl:shrink-0 xl:text-2xl ${focus}`}
        >
          {site.name}
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden h-full flex-1 items-stretch justify-center xl:flex">
          {nav.map((n) => {
            const isActive = active(n.href);
            const bar = (
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-3 bottom-0 h-[3px] origin-left rounded-t-full transition-transform duration-200 motion-reduce:transition-none ${
                  isActive
                    ? "scale-x-100 bg-teal"
                    : "scale-x-0 bg-teal/50 group-hover:scale-x-100"
                }`}
              />
            );
            const text = `flex h-full items-center whitespace-nowrap px-3 text-[15px] font-semibold transition-colors ${
              isActive ? "text-teal" : "text-navy group-hover:text-teal"
            }`;

            if (n.href === "/businesses") {
              return (
                <div
                  key={n.href}
                  className="group relative flex items-stretch"
                  onMouseEnter={() => setDd(true)}
                  onMouseLeave={() => setDd(false)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDd(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setDd(false);
                  }}
                >
                  <Link
                    href={n.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`${text} pr-1 ${focus}`}
                  >
                    {n.label}
                  </Link>
                  <button
                    type="button"
                    aria-label="Show businesses menu"
                    aria-expanded={dd}
                    aria-haspopup="true"
                    onClick={() => setDd(!dd)}
                    className={`flex w-7 items-center justify-center pr-2 text-navy group-hover:text-teal ${focus}`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 motion-reduce:transition-none ${dd ? "rotate-180" : ""}`}
                    />
                  </button>
                  {bar}

                  <ul
                    className={`absolute left-0 top-full z-50 w-64 rounded-b-xl border border-t-0 border-line bg-white p-2 shadow-lg transition duration-150 motion-reduce:transition-none ${
                      dd ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"
                    }`}
                  >
                    {businesses.map((b) => (
                      <li key={b.slug}>
                        <Link
                          href={b.href}
                          aria-current={active(b.href) ? "page" : undefined}
                          className={`block rounded-md px-3 py-2.5 text-[15px] font-medium hover:bg-surface hover:text-teal ${
                            active(b.href) ? "bg-surface text-teal" : "text-navy"
                          } ${focus}`}
                        >
                          {b.name}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-line pt-1">
                      <Link
                        href={n.href}
                        className={`block rounded-md px-3 py-2.5 text-sm font-semibold text-teal hover:bg-surface ${focus}`}
                      >
                        View all businesses
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            }

            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-stretch ${focus}`}
              >
                <span className={text}>{n.label}</span>
                {bar}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <Link
            href="/search"
            aria-label="Search the website"
            className={`flex size-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-surface hover:text-teal ${focus}`}
          >
            <Search size={20} />
          </Link>
          <a
            href={`${APP_URL}/login`}
            className={`inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-navy transition-colors hover:text-teal ${focus}`}
          >
            Login
          </a>
          <a
            href={`${APP_URL}/register`}
            className={`inline-flex min-h-11 items-center rounded-lg border-[1.5px] border-navy px-4 font-semibold text-navy transition-colors hover:bg-surface ${focus}`}
          >
            Register
          </a>
          <a
            href={`${APP_URL}/seller/register`}
            className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-lg bg-amber px-4 font-semibold text-navy transition-colors hover:bg-amber-hover ${focus}`}
          >
            Become a Seller
          </a>
        </div>

        {/* Menu button (below 1280px) */}
        <button
          ref={menuBtn}
          type="button"
          className={`flex size-11 shrink-0 items-center justify-center rounded-lg text-navy hover:bg-surface xl:hidden ${focus}`}
          aria-expanded={open}
          aria-controls="drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Drawer (below 1280px) */}
      <div
        id="drawer"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 flex xl:hidden ${
          open ? "visible" : "invisible delay-300"
        } transition-[visibility] motion-reduce:transition-none`}
      >
        {/* Backdrop (visible beside the panel on tablets) */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-navy/40 transition-opacity duration-300 motion-reduce:transition-none ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative ml-auto flex h-full w-full flex-col overflow-y-auto overscroll-contain bg-white shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none sm:max-w-sm sm:border-l sm:border-line ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex-1 px-5 pb-4 pt-4 sm:px-6">
            <Link
              href="/search"
              className={`mb-3 flex min-h-12 items-center gap-3 rounded-lg border border-line bg-surface px-4 text-[15px] font-medium text-navy ${focus}`}
            >
              <Search size={18} className="text-navy/70" />
              Search the website
            </Link>

            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((n) => {
                const isActive = active(n.href);
                const row = `relative flex-1 py-3.5 pl-4 text-lg font-semibold transition-colors ${
                  isActive ? "text-teal" : "text-navy"
                }`;
                const marker = (
                  <span
                    aria-hidden
                    className={`absolute inset-y-2.5 left-0 w-1 rounded-full ${isActive ? "bg-teal" : "bg-transparent"}`}
                  />
                );

                if (n.href === "/businesses") {
                  return (
                    <div key={n.href} className="border-b border-line">
                      <div className="relative flex items-center">
                        {marker}
                        <Link
                          href={n.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`${row} ${focus}`}
                        >
                          {n.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={sub}
                          aria-controls="biz-sub"
                          aria-label="Toggle businesses list"
                          onClick={() => setSub(!sub)}
                          className={`flex size-11 items-center justify-center rounded-lg text-navy ${focus}`}
                        >
                          <ChevronDown
                            className={`transition-transform duration-200 motion-reduce:transition-none ${sub ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                      <div
                        id="biz-sub"
                        className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${
                          sub ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <ul className={`overflow-hidden pl-4 ${sub ? "visible pb-3" : "invisible"}`}>
                          {businesses.map((b) => (
                            <li key={b.slug}>
                              <Link
                                href={b.href}
                                aria-current={active(b.href) ? "page" : undefined}
                                className={`block rounded-md py-2.5 pl-4 text-[16px] font-medium ${
                                  active(b.href) ? "text-teal" : "text-navy/90"
                                } ${focus}`}
                              >
                                {b.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={n.href} className="relative flex border-b border-line">
                    {marker}
                    <Link
                      href={n.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`${row} ${focus}`}
                    >
                      {n.label}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Actions pinned to the bottom of the drawer */}
          <div className="sticky bottom-0 grid grid-cols-2 gap-3 border-t border-line bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
            <a
              href={`${APP_URL}/login`}
              className={`inline-flex min-h-12 items-center justify-center rounded-lg border-[1.5px] border-navy px-4 font-semibold text-navy hover:bg-surface ${focus}`}
            >
              Login
            </a>
            <a
              href={`${APP_URL}/register`}
              className={`inline-flex min-h-12 items-center justify-center rounded-lg border-[1.5px] border-navy px-4 font-semibold text-navy hover:bg-surface ${focus}`}
            >
              Register
            </a>
            <a
              href={`${APP_URL}/seller/register`}
              className={`col-span-2 inline-flex min-h-12 items-center justify-center rounded-lg bg-amber px-4 font-semibold text-navy hover:bg-amber-hover ${focus}`}
            >
              Become a Seller
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}