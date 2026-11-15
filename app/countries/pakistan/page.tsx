import type { Metadata } from "next";
import Link from "next/link";
import { site, APP_URL, products, isOwnProduct } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import {
  Globe2,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Package,
  ShoppingBag,
  Store,
  Printer,
  Sparkles,
  CheckCircle2,
  ArrowDownRight,
  Send
} from "lucide-react";

export const metadata: Metadata = {
  // The root layout already adds the brand name to titles, so it is not repeated here.
  title: "Our Business in Pakistan",
  description: `See what ${site.name} does in Pakistan: import and export, our online store, the marketplace and printing services.`,
  alternates: { canonical: "/countries/pakistan" },
};

const pakistanBusinesses = [
  {
    title: "Import & Export",
    desc: "Trade with suppliers, buyers and trade partners in Pakistan and other markets.",
    icon: Globe2,
    href: "/import-export"
  },
  {
    title: "Our Store",
    desc: "Shop our own products online.",
    icon: ShoppingBag,
    href: "/products"
  },
  {
    title: "Marketplace",
    desc: "Buy from independent sellers, or apply to sell your own products.",
    icon: Store,
    href: "/marketplace"
  },
  {
    title: "Printing Services",
    desc: "Request printing work and receive a quotation.",
    icon: Printer,
    href: "/printing"
  }
];

// PLACEHOLDERS: replace with the lists the client confirms.
const importItems = [
  "Industrial raw materials",
  "Commercial retail technology hardware",
  "Manufacturing equipment",
  "Packaging paper substrates"
];

const exportItems = [
  "Raw cotton bales and agricultural produce",
  "Finished textiles and apparel",
  "Corrugated boxes and printed packaging",
  "Artisan goods and commercial leather"
];

// PLACEHOLDER: replace with the client's confirmed hours (or remove).
const workingHours = "Monday – Saturday: 9:00 AM – 6:00 PM (PKT)";

type MarketAnnouncement = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

// Add only real, approved Pakistan announcements. The section hides when empty.
const pakistanAnnouncements: MarketAnnouncement[] = [];

export default function PakistanPage() {
  // Only the organization's own products are shown here (not marketplace sellers).
  const localProducts = products.filter(isOwnProduct).slice(0, 4);

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-line py-3.5">
        <Reveal>
          <div className="container-x text-xs font-semibold text-muted">
            <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
            <span className="mx-2 text-muted/50" aria-hidden="true">›</span>
            <Link href="/countries" className="hover:text-teal-700 transition-colors">Countries / Markets</Link>
            <span className="mx-2 text-muted/50" aria-hidden="true">›</span>
            <span className="text-navy font-bold" aria-current="page">Pakistan</span>
          </div>
        </Reveal>
      </nav>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28 border-b border-line">
        <div className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-amber-500/10 blur-[140px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative max-w-4xl text-center">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs sm:text-sm font-bold text-teal-800 shadow-sm">
              <Sparkles size={16} className="text-teal-600 animate-pulse" />
              <span>Home Market</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl leading-[1.12]">
              Our Business in <span className="text-teal-700 underline decoration-teal-300 decoration-wavy underline-offset-8">Pakistan</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted leading-relaxed">
              {site.name} works with suppliers, buyers and trade partners in Pakistan. This page shows our activities and offerings in this market.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={`${APP_URL}/trade/enquiry?country=pakistan`}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-800 active:translate-y-0"
              >
                Submit an Enquiry
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="#contact-info"
                className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white"
              >
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Four Businesses Grid */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-6xl">
          <Reveal className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Our Businesses</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Our businesses here</h2>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Choose a business to learn more about what we offer in Pakistan.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pakistanBusinesses.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={(i % 4) * 90} className="h-full">
                  <Link
                    href={b.href}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-teal-500/50"
                  >
                    <div>
                      <div className="mb-6 inline-flex rounded-2xl bg-surface p-4 text-teal-700 border border-line group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                        <Icon size={26} className="transition duration-500 group-hover:rotate-6 group-hover:scale-110" />
                      </div>
                      <h3 className="text-xl font-bold text-navy">{b.title}</h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-muted leading-relaxed">{b.desc}</p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-line flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-navy transition-colors">
                      <span>Learn more</span>
                      <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Import & Export Section */}
      <section className="section bg-white border-b border-line">
        <div className="container-x max-w-6xl">
          <Reveal className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Trade</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Import & Export</h2>
            <p className="mt-3 text-base text-muted leading-relaxed">
              We work with suppliers, buyers and trade partners in Pakistan.
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 mb-10">
            {/* Imports */}
            <Reveal direction="left" className="h-full">
              <div className="h-full rounded-3xl border border-line bg-surface p-8 shadow-sm relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="animate-float-slow rounded-xl bg-teal-50 border border-teal-200/60 p-3 text-teal-800">
                    <ArrowDownRight size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">What We Import</h3>
                    <p className="text-xs text-muted">Goods brought into Pakistan</p>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {importItems.map((item, i) => (
                    <li key={item}>
                      <Reveal delay={150 + i * 80}>
                        <div className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-navy">
                          <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Exports */}
            <Reveal direction="right" className="h-full">
              <div className="h-full rounded-3xl border border-line bg-surface p-8 shadow-sm relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="animate-float-slow rounded-xl bg-amber-50 border border-amber-200/60 p-3 text-amber-800">
                    <ArrowUpRight size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">What We Export</h3>
                    <p className="text-xs text-muted">Goods sent from Pakistan</p>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {exportItems.map((item, i) => (
                    <li key={item}>
                      <Reveal delay={150 + i * 80}>
                        <div className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-navy">
                          <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Who we work with */}
          <Reveal>
            <div className="rounded-3xl border border-teal-500/20 bg-surface p-8 sm:p-10 shadow-sm text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="animate-blob pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl" />
              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Partners</span>
                <h3 className="mt-2 text-2xl font-extrabold text-navy">Who We Work With</h3>
                <p className="mt-3 mx-auto max-w-xl text-sm text-muted leading-relaxed">
                  We work with suppliers, buyers and trade partners in Pakistan.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products & Services */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-6xl">
          <Reveal className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Products</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Products and services for this market</h2>
            <p className="mt-3 text-base text-muted leading-relaxed">Products available in this market.</p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {localProducts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 80} className="h-full">
                <article className="group h-full rounded-3xl border border-line bg-white p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div>
                    <div className="aspect-square w-full rounded-2xl bg-surface flex items-center justify-center text-teal-700 mb-5 border border-line overflow-hidden">
                      <Package size={40} className="transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <span className="inline-block rounded-md bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-800 border border-teal-200/60 mb-2">
                      Sold by {site.name}
                    </span>
                    <h3 className="text-base font-bold text-navy">{p.name}</h3>
                    <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">{p.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                    {p.available ? (
                      <span className="text-xs font-bold text-teal-700">{p.available}</span>
                    ) : (
                      <span />
                    )}
                    <a
                      href={`${APP_URL}/shop/${p.slug}`}
                      aria-label={`View details of ${p.name}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-teal-700 hover:underline"
                    >
                      View details <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market announcements (hidden until real ones are added) */}
      {pakistanAnnouncements.length > 0 && (
        <section className="section bg-white border-b border-line">
          <div className="container-x max-w-6xl">
            <Reveal className="mx-auto max-w-3xl text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Updates</span>
              <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Latest from Pakistan</h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {pakistanAnnouncements.slice(0, 3).map((a, i) => (
                <Reveal key={a.slug} delay={(i % 3) * 80} className="h-full">
                  <article className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <div>
                      <span className="text-xs font-bold text-teal-700 tracking-wider uppercase">{a.category}</span>
                      <p className="mt-3 text-[11px] font-semibold text-muted">{a.date}</p>
                      <h3 className="mt-2 text-lg font-bold text-navy group-hover:text-teal-700 transition-colors">{a.title}</h3>
                      <p className="mt-3 text-xs text-muted leading-relaxed">{a.excerpt}</p>
                    </div>
                    <Link
                      href={`/announcements/${a.slug}`}
                      className="mt-6 text-xs font-bold text-teal-700 hover:underline"
                    >
                      Read full update &rarr;
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/announcements"
                className="rounded-xl border border-line bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-sm transition hover:bg-surface hover:border-teal-600"
              >
                View all announcements
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact & Office Info */}
      <section id="contact-info" className="section bg-white border-b border-line">
        <div className="container-x max-w-5xl">
          <Reveal className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Contact</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Contact us in Pakistan</h2>
          </Reveal>

          <Reveal>
            <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12 shadow-sm grid gap-8 md:grid-cols-2 items-center">
              <Reveal direction="left" delay={100}>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line mt-1">
                      <Building2 size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy">{site.name}</h3>
                      <p className="text-xs text-muted mt-0.5">Pakistan office</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-navy block">Email</span>
                      <a href={`mailto:${site.email}`} className="text-xs text-teal-700 hover:underline">{site.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-navy block">Phone</span>
                      <a
                        href={`tel:${String(site.phone).replace(/[^+\d]/g, "")}`}
                        className="text-xs text-teal-700 hover:underline"
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={200}>
                <div className="space-y-6 border-t md:border-t-0 md:border-l border-line pt-6 md:pt-0 md:pl-8">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line mt-1">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy">Office Address</h3>
                      <p className="text-xs text-muted leading-relaxed mt-1">{site.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line mt-1">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy">Working Hours</h3>
                      <p className="text-xs text-muted mt-1">{workingHours}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 text-center">
              <a
                href={`${APP_URL}/trade/enquiry?country=pakistan`}
                className="group inline-flex items-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
              >
                Submit an Enquiry
                <Send size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}