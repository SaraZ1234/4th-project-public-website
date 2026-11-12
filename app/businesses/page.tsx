import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL, site, businesses, pages } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import {
  Globe2,
  ShoppingBag,
  Store,
  Printer,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  type LucideIcon
} from "lucide-react";

export const metadata: Metadata = {
  // If your root layout already adds " | Apex Global Group" through a title
  // template, change this to just "Our Businesses".
  title: `Our Businesses | ${site.name}`,
  description:
    "Explore our import and export, own online store, marketplace and printing businesses in one place.",
  alternates: { canonical: "/businesses" },
};

// Reads a list of items from a page defined in lib/content, so the text lives in one place.
const itemsOf = (slug: string, heading: string): string[] =>
  pages.find((p) => p.slug === slug)?.blocks.find((b) => b.h === heading)?.items ?? [];

type CTA = { label: string; href: string; external?: boolean };

type BusinessDetail = {
  icon: LucideIcon;
  accent: { box: string; icon: string; label: string };
  offersTitle: string;
  offers: string[];
  opportunities: string[];
  showMarkets?: boolean;
  actions: CTA[];
};

// PLACEHOLDER: the "offers" lists come from lib/content and must be confirmed by the client.
const details: Record<string, BusinessDetail> = {
  "import-export": {
    icon: Globe2,
    accent: { box: "bg-blue-50 border-blue-200/60", icon: "text-blue-700", label: "text-blue-700" },
    offersTitle: "Goods we trade",
    offers: itemsOf("import-export", "Goods we trade"),
    opportunities: [
      "Suppliers who want to export through us",
      "Buyers who want to import",
      "Trade partners",
    ],
    showMarkets: true,
    actions: [
      { label: "Submit Trade Enquiry", href: `${APP_URL}/trade/enquiry`, external: true },
    ],
  },
  products: {
    icon: ShoppingBag,
    accent: { box: "bg-teal-50 border-teal-200/60", icon: "text-teal-700", label: "text-teal-700" },
    offersTitle: "Product categories",
    offers: itemsOf("products", "Categories"),
    opportunities: ["Customers who want to buy directly from the organization"],
    actions: [{ label: "Shop Now", href: `${APP_URL}/shop`, external: true }],
  },
  marketplace: {
    icon: Store,
    accent: { box: "bg-violet-50 border-violet-200/60", icon: "text-violet-700", label: "text-violet-700" },
    offersTitle: "What you will find",
    offers: [
      "Products from independent sellers",
      "A clear label showing who sells each product",
      "A route for approved sellers to open a shop",
    ],
    opportunities: [
      "Independent sellers",
      "Small and large businesses",
      "Manufacturers and wholesalers",
    ],
    actions: [
      { label: "Explore Marketplace", href: `${APP_URL}/marketplace`, external: true },
      { label: "Become a Seller", href: "/become-a-seller" },
    ],
  },
  printing: {
    icon: Printer,
    accent: { box: "bg-orange-50 border-orange-200/60", icon: "text-orange-700", label: "text-orange-700" },
    offersTitle: "Services",
    offers: itemsOf("printing", "Services"),
    opportunities: ["Individuals", "Businesses that need printing work"],
    actions: [
      { label: "Submit Printing Enquiry", href: `${APP_URL}/printing/enquiry`, external: true },
    ],
  },
};

export default function BusinessesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-line py-3.5">
        <div className="container-x text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
          <span className="mx-2 text-muted/50" aria-hidden="true">›</span>
          <span className="text-navy font-bold" aria-current="page">Our Businesses</span>
        </div>
      </nav>

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28 border-b border-line">
        <div className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] sm:h-[36rem] sm:w-[36rem] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] sm:h-[36rem] sm:w-[36rem] rounded-full bg-amber-500/10 blur-[140px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative max-w-5xl text-center px-4 sm:px-6">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs sm:text-sm font-semibold text-teal-900 shadow-sm backdrop-blur-md">
              <Sparkles size={16} className="text-teal-600 animate-pulse" />
              <span>Four businesses, one organization</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl leading-[1.12]">
              Our <span className="text-teal-700 underline decoration-teal-300 decoration-wavy underline-offset-8">Businesses</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 mx-auto max-w-3xl text-sm sm:text-base lg:text-lg text-muted leading-relaxed">
              Our businesses work together as one ecosystem. Whether you want to trade internationally, shop online, sell on our marketplace or order printing, you can start here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BUSINESS BLOCKS */}
      <section className="section bg-surface border-b border-line py-12 sm:py-16 lg:py-20">
        <div className="container-x max-w-6xl space-y-8 sm:space-y-12">
          {businesses.map((b, idx) => {
            const d = details[b.slug];
            if (!d) return null;
            const Icon = d.icon;
            const flip = idx % 2 === 1;

            return (
              <Reveal key={b.slug} delay={idx * 90}>
                <article
                  id={b.slug}
                  className="group relative overflow-hidden rounded-3xl border border-line bg-white p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-teal-500/40"
                >
                  <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Text */}
                    <div className={`lg:col-span-7 space-y-5 ${flip ? "lg:order-2" : ""}`}>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className={`inline-flex rounded-2xl border p-3.5 shadow-sm ${d.accent.box}`}>
                          <Icon size={28} className={d.accent.icon} />
                        </div>
                        <span className="rounded-full bg-surface px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy border border-line">
                          {b.tag}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy group-hover:text-teal-700 transition-colors">
                          {b.name}
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">{b.text}</p>
                      </div>

                      {d.offers.length > 0 && (
                        <div className="pt-2 space-y-3">
                          <span className="text-xs font-bold uppercase tracking-widest text-navy">{d.offersTitle}</span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {d.offers.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-navy">
                                <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="space-y-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-navy">Who can work with us</span>
                        <ul className="space-y-2">
                          {d.opportunities.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                              <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {d.showMarkets && (
                        <p className="text-xs sm:text-sm text-muted">
                          Pakistan is shown separately from our other markets.{" "}
                          <Link href="/countries" className="font-bold text-teal-700 hover:underline">
                            View countries / markets
                          </Link>
                        </p>
                      )}

                      {/* Buttons: Learn more plus the contact / enquiry action(s) */}
                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        <Link
                          href={b.href}
                          className="group/btn inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-teal-800 hover:-translate-y-0.5"
                        >
                          Learn More
                          <ArrowRight size={16} className="transition group-hover/btn:translate-x-1" />
                        </Link>

                        {d.actions.map((a) =>
                          a.external ? (
                            <a
                              key={a.label}
                              href={a.href}
                              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-navy shadow-sm transition-all duration-300 hover:border-teal-600 hover:bg-surface hover:-translate-y-0.5"
                            >
                              {a.label}
                            </a>
                          ) : (
                            <Link
                              key={a.label}
                              href={a.href}
                              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-navy shadow-sm transition-all duration-300 hover:border-teal-600 hover:bg-surface hover:-translate-y-0.5"
                            >
                              {a.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>

                    {/* Image area. TODO: replace the icon panel with a real photo (WebP/AVIF, with alt text) */}
                    <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                      <Reveal direction={flip ? "left" : "right"} delay={200}>
                        <div
                          className={`flex aspect-[4/3] items-center justify-center rounded-2xl border ${d.accent.box}`}
                          role="img"
                          aria-label={`${b.name} illustration`}
                        >
                          <Icon size={64} strokeWidth={1.25} className={d.accent.icon} />
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* COUNTRIES & MARKETS */}
      <section className="section bg-white border-b border-line py-16 sm:py-20">
        <div className="container-x max-w-5xl text-center px-4 sm:px-6">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Markets</span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-navy">Countries &amp; Markets</h2>
            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed max-w-2xl mx-auto">
              See the markets we work in and what we do in each of them.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8">
              <Link
                href="/countries"
                className="group inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-7 py-4 text-xs sm:text-sm font-bold text-navy shadow-sm transition-all duration-300 hover:bg-white hover:border-teal-600 hover:-translate-y-0.5"
              >
                View Countries / Markets
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT BAND */}
      <section className="section bg-surface border-b border-line py-16 sm:py-20">
        <div className="container-x max-w-5xl text-center px-4 sm:px-6">
          <Reveal>
            <div className="rounded-3xl border border-teal-500/20 bg-white p-8 sm:p-12 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs sm:text-sm font-bold text-teal-800 shadow-sm">
                <MessageSquare size={16} className="text-teal-600" />
                <span>We&apos;re here to help</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
                Not sure where to start? Talk to our team.
              </h2>
              <p className="mt-3 max-w-xl mx-auto text-xs sm:text-base text-muted leading-relaxed">
                Ask us about trade, our store, marketplace participation or printing, and our team will get back to you.
              </p>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-700 px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:bg-teal-800 hover:-translate-y-0.5"
                >
                  Contact Us
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}