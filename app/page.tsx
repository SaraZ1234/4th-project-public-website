"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  site,
  APP_URL,
  businesses,
  countries,
  products,
  whyUs,
  sellerSteps,
  faqs,
  announcements,
  testimonials,
  Product,
} from "@/lib/content";
import { Reveal, SmartImage } from "@/components/Motion";
import {
  Boxes,
  Handshake,
  Store,
  ShoppingBag,
  Globe2,
  Layers,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Search,
  Package,
  Truck,
  Printer,
  Building2,
  ShieldCheck,
  MessageSquare,
  Megaphone,
} from "lucide-react";

import { OwnershipBadge } from "@/components/OwnershipBadge";



/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

/* Counts up to a number when it scrolls into view. */
function CountUp({ to, duration = 1200 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val}</span>;
}

function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
      {eyebrow && (
        <span className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-teal-400" : "text-teal-700"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-2 break-words text-2xl font-extrabold sm:text-3xl lg:text-4xl ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      {text && <p className={`mt-3 text-sm leading-relaxed sm:text-base ${dark ? "text-white/80" : "text-muted"}`}>{text}</p>}
    </Reveal>
  );
}

/* §2.5: scope of the complete business ecosystem. */
const ecosystemScope = [
  { icon: Package, title: "Product-based business", text: "Products the organization owns, supplies, or manages." },
  { icon: Globe2, title: "National & international trade", text: "Import and export activity across our home and international markets." },
  { icon: ShoppingBag, title: "E-commerce", text: "Our own store, selling products directly to customers." },
  { icon: Store, title: "Marketplace", text: "Independent sellers offering their products in one connected place." },
  { icon: Printer, title: "Printing services", text: "Printing with enquiry, quotation, and order follow-up." },
  { icon: Sparkles, title: "Future activities", text: "New businesses, products, and markets can be added as the organization grows." },
];

/* Company websites showcased on the home page (external links). */
const companyWebsites = [
  {
    name: "Fast Group",
    tag: "Printing & Packaging",
    text: "Custom printing and packaging for businesses, including digital, offset, screen and large-format printing, labels and custom packaging.",
    href: "https://fast-printing-frontend-woad.vercel.app/",
    host: "fast-printing-frontend-woad.vercel.app",
    icon: Printer,
    preview: "bg-gradient-to-br from-teal-700 to-teal-500",
  },
  {
    name: "Fast Media Agency",
    tag: "Media Agency",
    text: "Our media agency. Visit its website to see what it offers and to get in touch with the team.",
    href: "https://fast-media-agency-five.vercel.app/",
    host: "fast-media-agency-five.vercel.app",
    icon: Megaphone,
    preview: "bg-gradient-to-br from-amber-600 to-amber-500",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomeClient() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [notification, setNotification] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  const openProduct = (p: Product) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setActiveProduct(p);
  };

  // Testimonial auto-rotation with pause on hover/focus & reduced motion support
  useEffect(() => {
    if (testimonials.length === 0) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || isPaused) return;

    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Quick-view modal: Escape key & focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProduct(null);
        lastFocus.current?.focus();
      }
      if (e.key === "Tab" && activeProduct && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (activeProduct) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProduct]);

  // Quick-view modal: lock background scroll and move focus inside
  useEffect(() => {
    if (!activeProduct) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>("button, [href]")?.focus();
    }, 30);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [activeProduct]);

  const pakistanHub = countries.find((c) => c.group === "home") || countries[0];
  const internationalMarkets = countries.filter((c) => c.group !== "home");

  const whyIcons = [Boxes, Handshake, Store, ShoppingBag, Globe2, Layers];
  const businessIcons = [Globe2, ShoppingBag, Store, Printer];
  const sellerIcons = [Search, CheckCircle2, Package, Store, Truck];

  const heroTiles = [
    { icon: Globe2, label: "Import & Export", detail: "Trade", href: "/import-export" },
    { icon: Store, label: "Marketplace", detail: "Independent Sellers", href: "/marketplace" },
    { icon: ShoppingBag, label: "Retail", detail: "Direct Store", href: "/products" },
    { icon: Printer, label: "Printing", detail: "Print Services", href: "/printing" },
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* Toast Notification with role="status" */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="animate-pop-in fixed bottom-4 left-4 right-4 z-50 flex items-center gap-3 rounded-2xl border border-teal-500/30 bg-navy px-4 py-3 text-sm font-semibold text-white shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm sm:px-5 sm:py-4"
        >
          <CheckCircle2 className="shrink-0 text-teal-400" size={20} />
          <span className="min-w-0 break-words">{notification}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-line bg-white py-12 sm:py-20 lg:py-24 xl:py-28">
        <div className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative">
          <div className="grid items-center gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 text-center lg:col-span-7 lg:text-left">
              <Reveal>
                <div className="mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50/70 px-4 py-2 text-center text-xs font-semibold text-teal-900 shadow-sm backdrop-blur-md sm:text-sm">
                  <Sparkles size={16} className="shrink-0 animate-pulse text-teal-600" />
                  <span>One organization. Multiple business opportunities.</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="break-words text-3xl font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-5xl xl:text-6xl">
                  Import, export, retail, marketplace and printing in one organization
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                  {site.tagline} Choose a business to explore, or go straight to the shop.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
                  <a
                    href="#businesses"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-800 sm:px-7"
                  >
                    Explore Our Businesses
                    <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                  </a>
                  <a
                    href={`${APP_URL}/shop`}
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-line bg-white px-6 py-4 text-sm font-bold text-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500 hover:bg-surface sm:px-7"
                  >
                    Shop Now
                    <ShoppingBag size={18} className="text-teal-600" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                  {[
                    ["Import & Export", "/import-export"],
                    ["Shop", `${APP_URL}/shop`],
                    ["Marketplace", "/marketplace"],
                    ["Printing", "/printing"],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface/80 px-3.5 py-2.5 text-xs font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white hover:shadow-sm sm:px-4 sm:text-sm"
                    >
                      {label}
                      <ArrowUpRight size={14} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-600" />
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal direction="right" delay={200} className="min-w-0 lg:col-span-5">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy p-5 text-white shadow-2xl sm:p-8">
                  <div className="animate-blob pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/20 blur-3xl" />
                  <div className="relative flex h-full flex-col justify-between gap-6 sm:gap-8">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-300">OUR ECOSYSTEM</span>
                      <div className="rounded-xl bg-white/10 p-2.5 backdrop-blur-md">
                        <Globe2 size={20} className="text-teal-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                      {heroTiles.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="group flex min-w-0 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/50 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:p-4"
                        >
                          <item.icon size={22} className="mb-4 text-teal-400 transition-transform duration-300 group-hover:scale-110" />
                          <div className="min-w-0">
                            <p className="break-words text-sm font-bold tracking-wide text-white">{item.label}</p>
                            <p className="text-[11px] font-medium text-teal-200/70">{item.detail}</p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
                      <p className="text-xs font-medium text-white/70">One organization, one place to start</p>
                      <a href="#businesses" className="flex items-center gap-1.5 text-xs font-bold text-teal-400 transition hover:text-white">
                        Explore <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Stat badges: sit in a row under the card on phones, float over the card corners from sm up */}
                <div className="mt-5 flex items-center justify-center gap-3 sm:contents">
                  {countries.length > 0 && (
                    <div className="animate-float flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:absolute sm:-bottom-5 sm:-left-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700"><Globe2 size={20} /></span>
                      <div>
                        <p className="text-lg font-extrabold leading-none text-navy"><CountUp to={countries.length} /></p>
                        <p className="mt-1 text-[11px] font-semibold text-muted">Markets</p>
                      </div>
                    </div>
                  )}

                  <div className="animate-float-slow flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:absolute sm:-right-4 sm:-top-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Layers size={20} /></span>
                    <div>
                      <p className="text-lg font-extrabold leading-none text-navy"><CountUp to={businesses.length} /></p>
                      <p className="mt-1 text-[11px] font-semibold text-muted">Businesses</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OUR COMPANY WEBSITES (showcase, redirects to external sites) */}
      <section id="companies" className="section relative scroll-mt-16 overflow-hidden border-b border-line bg-gradient-to-b from-teal-50/80 via-white to-amber-50/70 xl:scroll-mt-32">
        <div className="animate-blob pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-500/10 blur-[110px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-amber-500/15 blur-[110px]" style={{ animationDelay: "-5s" }} />

        <div className="container-x relative">
          <SectionHeading
            eyebrow="Our Companies"
            title="Visit our company websites"
            text="Explore the websites of our companies to learn about their services and get in touch."
          />

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
            {companyWebsites.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.href} delay={i * 120} className="h-full">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-teal-400 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:p-5"
                  >
                    {/* Browser-window style preview */}
                    <div className={`relative overflow-hidden rounded-2xl shadow-md ${c.preview}`}>
                      <div className="flex items-center gap-2 border-b border-white/15 bg-black/20 px-3 py-2.5 sm:px-4">
                        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
                          <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
                        </span>
                        <span className="ml-1 min-w-0 flex-1 truncate rounded-md bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90 sm:ml-2">
                          {c.host}
                        </span>
                        <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold text-white">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                          Live
                        </span>
                      </div>
                      <div className="relative flex h-40 flex-col items-center justify-center gap-3 sm:h-52">
                        <div className="animate-blob pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
                        <div className="animate-float relative rounded-2xl bg-white/15 p-4 backdrop-blur-md">
                          <Icon size={40} className="text-white transition duration-500 group-hover:scale-110" />
                        </div>
                        <p className="relative break-words px-4 text-center text-xl font-extrabold text-white sm:text-2xl">{c.name}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between px-1 pb-1 pt-6 sm:px-2">
                      <div>
                        <span className="inline-block rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-800">
                          {c.tag}
                        </span>
                        <h3 className="mt-3 break-words text-xl font-bold text-navy transition-colors group-hover:text-teal-700 sm:text-2xl">{c.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{c.text}</p>
                      </div>

                      <span className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 group-hover:bg-teal-800">
                        Visit website
                        <span className="sr-only"> (opens in a new tab)</span>
                        <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM INTRODUCTION (spec 2.5) */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-6xl">
          <SectionHeading
            eyebrow="The complete ecosystem"
            title="One organization, many ways to do business"
            text={`${site.name} brings its commercial activities together in one connected place.`}
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {ecosystemScope.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={(i % 3) * 90} className="h-full">
                  <div className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg sm:p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition duration-300 group-hover:bg-teal-700 group-hover:text-white">
                      <Icon size={22} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words text-base font-bold text-navy">{s.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUSINESS CATEGORIES GRID */}
      <section id="businesses" className="section scroll-mt-16 border-b border-line bg-white xl:scroll-mt-32">
        <div className="container-x">
          <SectionHeading
            title="Four businesses, one organization"
            text="Each business runs on its own, and all of them share one account, one brand and one place to start."
          />

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {businesses.map((b, i) => {
              const Icon = businessIcons[i % businessIcons.length];
              return (
                <Reveal key={b.slug} delay={(i % 4) * 90} className="h-full">
                  <Link
                    href={b.href}
                    style={{ borderTopColor: b.color }}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line border-t-4 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-7"
                  >
                    <div>
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                        <div className="inline-flex rounded-xl bg-teal-50 p-3.5 text-teal-700 shadow-sm transition duration-300 group-hover:bg-navy group-hover:text-white">
                          <Icon size={24} className="transition duration-500 group-hover:rotate-6 group-hover:scale-110" />
                        </div>
                        <span className="rounded-md bg-surface px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted">
                          {b.tag}
                        </span>
                      </div>
                      <h3 className="break-words text-xl font-bold text-navy">{b.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{b.text}</p>
                    </div>
                    <div className="relative mt-8 flex items-center justify-between border-t border-line pt-4 text-sm font-bold text-teal-700">
                      <span>Explore business</span>
                      <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section id="products" className="section scroll-mt-16 border-b border-line bg-surface xl:scroll-mt-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Showcase"
            title="Featured products"
            text="A selection chosen by our team. Each item shows who sells it."
          />

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => {
              const image = (p as Product & { image?: string }).image;
              return (
                <Reveal key={p.slug} delay={(i % 4) * 80} className="h-full">
                  <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <div>
                      <button
                        onClick={() => openProduct(p)}
                        className="relative block aspect-[4/3] w-full overflow-hidden border-b border-line bg-surface text-left"
                        aria-label={`Quick view ${p.name}`}
                      >
                        {image ? (
                          <SmartImage
                            src={image}
                            alt={p.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-amber-50 text-teal-700/60 transition-transform duration-500 group-hover:scale-105">
                            <Package size={48} strokeWidth={1.25} />
                          </div>
                        )}
                        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy/90 px-4 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                          Quick View
                        </span>
                      </button>

                      <div className="space-y-3 p-4 sm:p-5">
                        <OwnershipBadge owner={p.owner} />
                        <h3 className="line-clamp-1 text-base font-bold text-navy">{p.name}</h3>
                        <p className="line-clamp-2 text-xs leading-relaxed text-muted">{p.desc}</p>
                        <div className="border-t border-line/60 pt-2 text-[11px] font-semibold text-muted">
                          <span>{p.category}</span>
                          <span className="mt-0.5 block font-bold text-teal-700">{p.available}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-line bg-surface/60 px-4 py-3.5 sm:px-5">
                      <button
                        onClick={() => openProduct(p)}
                        className="text-xs font-bold text-teal-700 transition hover:text-navy"
                      >
                        Quick view
                      </button>
                      <a
                        href={`${APP_URL}/shop/${p.slug}`}
                        className="rounded-full border border-line bg-white p-2 text-navy transition hover:bg-navy hover:text-white"
                        aria-label={`View ${p.name}`}
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12 flex justify-center">
            <a
              href={`${APP_URL}/shop`}
              className="group inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-navy-light"
            >
              View all products
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {activeProduct && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={() => {
            setActiveProduct(null);
            lastFocus.current?.focus();
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="animate-pop-in relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-line bg-white p-5 shadow-2xl [max-height:90dvh] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setActiveProduct(null);
                lastFocus.current?.focus();
              }}
              aria-label="Close product quick view"
              className="absolute right-4 top-4 z-10 rounded-full bg-surface p-2 text-navy transition hover:rotate-90 hover:bg-navy hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mb-6 flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
              {(activeProduct as Product & { image?: string }).image ? (
                <SmartImage
                  src={(activeProduct as Product & { image?: string }).image as string}
                  alt={activeProduct.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Package size={52} strokeWidth={1} />
              )}
            </div>

            <OwnershipBadge owner={activeProduct.owner} />
            <h2 id="modal-title" className="mt-3 break-words text-xl font-bold text-navy">{activeProduct.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{activeProduct.desc}</p>

            <div className="mt-5 space-y-2 rounded-xl border border-line bg-surface p-4 text-xs text-muted">
              <p><span className="font-bold text-navy">Category:</span> {activeProduct.category}</p>
              <p><span className="font-bold text-navy">Availability:</span> {activeProduct.available}</p>
            </div>

            <div className="mt-6">
              <Link
                href={`/contact?category=Products&product=${encodeURIComponent(activeProduct.name)}`}
                onClick={() => setActiveProduct(null)}
                className="inline-flex w-full justify-center rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-teal-800"
              >
                Inquire About Product
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* COUNTRIES & MARKETS (Pakistan separated) */}
      <section id="markets" className="section scroll-mt-16 border-b border-line bg-white xl:scroll-mt-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Global Reach"
            title="Countries and markets"
            text="Our home market and the international markets we work with."
          />

          {/* Pakistan Featured Card */}
          {pakistanHub && (
            <Reveal className="mb-8">
              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm transition duration-300 hover:shadow-lg sm:p-8">
                <div className="grid items-center gap-6 md:grid-cols-12">
                  <div className="min-w-0 space-y-4 md:col-span-8">
                    <span className="inline-block rounded-md border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">
                      Home Market
                    </span>
                    <h3 className="break-words text-2xl font-bold text-navy">{pakistanHub.name}</h3>
                    <p className="text-sm leading-relaxed text-muted">{pakistanHub.text}</p>
                    <div>
                      <Link
                        href={`/countries/${pakistanHub.slug}`}
                        className="group inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-teal-800"
                      >
                        View Pakistan Market
                        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-center md:col-span-4">
                    <div className="animate-float flex h-24 w-24 items-center justify-center rounded-2xl border border-line bg-white text-teal-700 shadow-sm sm:h-32 sm:w-32">
                      <Building2 size={56} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* International Markets Grid */}
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {internationalMarkets.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 80} className="h-full">
                <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">
                  <div>
                    <div className="relative flex h-16 items-center justify-between overflow-hidden bg-gradient-to-br from-teal-700 to-teal-500 px-5 sm:px-6">
                      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 transition duration-500 group-hover:scale-150" />
                      <span className="relative rounded-md bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                        International Market
                      </span>
                      <Globe2 size={22} className="relative shrink-0 text-white/90 transition-transform duration-500 group-hover:rotate-180" />
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="break-words text-lg font-bold text-navy">{c.name}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{c.text}</p>
                    </div>
                  </div>

                  <div className="mx-5 mb-5 border-t border-line pt-4 sm:mx-6 sm:mb-6">
                    <Link
                      href={`/countries/${c.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 transition hover:gap-2 hover:text-teal-900"
                    >
                      View {c.name} market <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex justify-center">
            <Link
              href="/countries"
              className="rounded-xl border border-line bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-surface"
            >
              View all countries
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SELLER JOURNEY (PDF approved 5 steps) */}
      <section id="sellers" className="section relative scroll-mt-16 overflow-hidden bg-navy text-white xl:scroll-mt-32">
        <div className="animate-blob pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-teal-500/10 blur-[110px]" />
        <div className="container-x relative">
          <SectionHeading
            dark
            eyebrow="Marketplace Opportunities"
            title="Start selling with us"
            text="Join our marketplace and reach buyers through one platform."
          />

          <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
            {sellerSteps.map((s, i) => {
              const Icon = sellerIcons[i % sellerIcons.length];
              return (
                <li key={s} className="h-full">
                  <Reveal delay={(i % 5) * 90} className="h-full">
                    <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/50 hover:bg-white/[0.08] sm:p-6">
                      <div>
                        <div className="mb-6 flex items-center justify-between">
                          <div className="rounded-xl bg-white/10 p-3 text-teal-400 shadow-sm transition duration-300 group-hover:bg-teal-600 group-hover:text-white">
                            <Icon size={20} />
                          </div>
                          <span className="text-2xl font-black text-white/20 transition group-hover:text-teal-400/50">0{i + 1}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white">Step {i + 1}</h3>
                        <p className="mt-2 break-words text-xs leading-relaxed text-white/70">{s}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <Reveal className="mt-12 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={`${APP_URL}/seller/register`}
              className="rounded-xl bg-teal-600 px-7 py-4 text-center text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700"
            >
              Become a Seller
            </a>
            <Link
              href="/marketplace"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-center text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Explore Marketplace
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PRINTING SERVICES CTA */}
      <section id="printing" className="section scroll-mt-16 border-b border-line bg-surface xl:scroll-mt-32">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white shadow-xl sm:p-10 lg:p-14">
              <div className="animate-blob pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="animate-blob pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl" style={{ animationDelay: "-4s" }} />

              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-xl">
                  <div className="animate-float mb-5 inline-flex rounded-2xl bg-white/10 p-3.5 text-teal-400 backdrop-blur-md">
                    <Printer size={28} />
                  </div>
                  <h2 className="break-words text-2xl font-extrabold text-white sm:text-3xl">Bring your printing ideas to life</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                    Tell us what you need and receive a quotation.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                  <a
                    href={`${APP_URL}/printing/enquiry`}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-700 sm:px-7"
                  >
                    Submit Printing Enquiry
                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </a>
                  <Link
                    href="/printing"
                    className="rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-center text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20 sm:px-7"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US (PDF approved 6 points) */}
      <section className="section border-b border-line bg-white">
        <div className="container-x">
          <SectionHeading title="Why work with us" />

          <ul className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <li key={w} className="h-full">
                  <Reveal delay={(i % 3) * 90} className="h-full">
                    <div className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-5 font-semibold text-navy transition-all duration-300 hover:-translate-y-1 hover:border-teal-600 hover:bg-white hover:shadow-md sm:p-6">
                      <div className="shrink-0 rounded-xl bg-white p-3.5 text-teal-700 shadow-sm ring-1 ring-line transition duration-300 group-hover:bg-navy group-hover:text-white">
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 break-words pt-1 text-sm font-bold leading-relaxed">{w}</div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal className="mt-12 flex justify-center">
            <Link
              href="/about"
              className="rounded-xl border border-line bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-surface"
            >
              Learn More About Us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Corporate News"
            title="Latest announcements"
            text="Stay informed about our latest business activities and operational updates."
          />

          <div className="mx-auto grid max-w-4xl gap-5 sm:gap-6 md:grid-cols-2">
            {announcements.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 2) * 90} className="h-full">
                <article className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-7">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-700">{a.category}</span>
                      <ArrowUpRight size={16} className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700" />
                    </div>
                    <p className="mt-3 text-[11px] font-semibold text-muted">{a.date}</p>
                    <h3 className="mt-2 break-words text-lg font-bold text-navy transition-colors group-hover:text-teal-700">{a.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted">{a.excerpt}</p>
                  </div>

                  <Link
                    href={`/announcements/${a.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-left text-xs font-bold text-teal-700 transition hover:gap-2"
                  >
                    Read full story <ArrowUpRight size={14} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <Link href="/announcements" className="text-xs font-bold text-teal-700 hover:underline">
              View all announcements →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER (hidden if empty) */}
      {testimonials.length > 0 && (
        <section
          className="section border-b border-line bg-white"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="container-x">
            <SectionHeading title="What partners & customers say" />

            <Reveal>
              <div className="relative mx-auto max-w-3xl rounded-3xl border border-line bg-surface p-5 shadow-sm sm:p-12">
                <div key={activeTestimonial} className="animate-fade-in" aria-live="polite">
                  <blockquote className="min-h-[100px] break-words text-base font-medium leading-relaxed text-navy sm:text-xl">
                    “{testimonials[activeTestimonial].quote}”
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-bold text-navy">{testimonials[activeTestimonial].name}</p>
                    <p className="mt-0.5 text-xs font-medium text-muted">{testimonials[activeTestimonial].meta}</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
                  <div className="flex min-w-0 flex-wrap gap-2" role="tablist" aria-label="Choose testimonial">
                    {testimonials.map((t, i) => (
                      <button
                        key={t.name + i}
                        role="tab"
                        aria-selected={i === activeTestimonial}
                        aria-label={`Show testimonial ${i + 1}`}
                        onClick={() => setActiveTestimonial(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-8 bg-teal-700" : "w-2 bg-line hover:bg-teal-300"
                          }`}
                      />
                    ))}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                      className="rounded-full border border-line bg-white p-3 text-navy transition hover:bg-navy hover:text-white"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                      className="rounded-full border border-line bg-white p-3 text-navy transition hover:bg-navy hover:text-white"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ ACCORDION */}
      <section id="faq" className="section scroll-mt-16 border-b border-line bg-surface xl:scroll-mt-32">
        <div className="container-x">
          <SectionHeading
            title="Common questions"
            text="Find answers to frequently asked questions about our organization and services."
          />

          <div className="mx-auto max-w-3xl space-y-3.5">
            {faqs.map((f, i) => {
              const isOpen = activeFaq === i;
              return (
                <Reveal key={f.q} delay={(i % 4) * 70}>
                  <article
                    className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${isOpen ? "border-teal-600 shadow-md" : "border-line hover:border-teal-300"
                      }`}
                  >
                    <h3>
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-bold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:p-5"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-button-${i}`}
                      >
                        <span className="min-w-0 break-words">{f.q}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-teal-700 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <div className="break-words border-t border-line/60 px-4 pb-5 pt-3 text-xs leading-relaxed text-muted sm:px-5 sm:text-sm">
                          {f.a}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10 text-center">
            <Link href="/faq" className="text-xs font-bold text-teal-700 hover:underline">
              View all FAQs →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FINAL CONTACT CTA SECTION (white) */}
      <section className="relative overflow-hidden bg-white py-14 text-center sm:py-24">
        <div className="animate-blob pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative z-10 mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-3xl border border-teal-200 bg-teal-50/60 p-5 shadow-xl shadow-teal-900/5 sm:p-14">
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-xs font-bold text-teal-800 shadow-sm sm:text-sm">
                <MessageSquare size={16} className="text-teal-600" />
                <span>Contact Us</span>
              </div>

              <h2 className="break-words text-2xl font-black leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Have a question? Talk to our team.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-lg">
                Have a question about products, international trade, selling opportunities or printing? Our team is ready to hear from you.
              </p>

              <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-700 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-800 active:translate-y-0 sm:px-8"
                >
                  Contact Our Team
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/businesses"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-line bg-white px-6 py-4 text-sm font-extrabold text-navy shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-600 active:translate-y-0 sm:px-8"
                >
                  Explore Businesses
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}