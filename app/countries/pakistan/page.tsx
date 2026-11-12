import type { Metadata } from "next";
import Link from "next/link";
import { site, APP_URL, announcements, products } from "@/lib/content";
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
  title: `Our Business in Pakistan | ${site.name}`,
  description: "Explore our domestic market operations in Pakistan including import & export, online store, marketplace, and printing services.",
  alternates: { canonical: "/countries/pakistan" },
};

const pakistanBusinesses = [
  {
    title: "Import & Export",
    desc: "Sourcing raw cotton, finished textiles, and managing domestic port clearance.",
    icon: Globe2,
    href: "/import-export"
  },
  {
    title: "Our Store",
    desc: "Shop flagship products online, delivered securely across Pakistan.",
    icon: ShoppingBag,
    href: "/products"
  },
  {
    title: "Marketplace",
    desc: "Buy from verified local sellers, or register your business to sell.",
    icon: Store,
    href: "/marketplace"
  },
  {
    title: "Printing Services",
    desc: "Industrial commercial press, custom packaging, and fast quotations.",
    icon: Printer,
    href: "/printing"
  }
];

const importItems = [
  "Industrial polymers & chemical raw materials",
  "Commercial retail technology & POS hardware",
  "Specialized manufacturing & press equipment",
  "High-grade packaging paper substrates"
];

const exportItems = [
  "Grade-A raw cotton bales & agricultural produce",
  "Finished home textiles & apparel lines",
  "Custom corrugated boxes & printed packaging",
  "Crafted artisan goods & commercial leather"
];

export default function PakistanPage() {
  const localProducts = products.slice(0, 4);
  const recentAnnouncements = announcements.slice(0, 2);

  return (
    <div className="min-h-screen bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-line py-3.5">
        <div className="container-x text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
          <span className="mx-2 text-muted/50">›</span>
          <Link href="/countries" className="hover:text-teal-700 transition-colors">Countries</Link>
          <span className="mx-2 text-muted/50">›</span>
          <span className="text-navy font-bold">Pakistan</span>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28 border-b border-line">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-amber-500/10 blur-[140px]" />

        <div className="container-x relative max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs sm:text-sm font-bold text-teal-800 shadow-sm">
            <Sparkles size={16} className="text-teal-600" />
            <span>Primary Operational Headquarters</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl leading-[1.12]">
            Our Business in <span className="text-teal-700 underline decoration-teal-300 decoration-wavy underline-offset-8">Pakistan</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted leading-relaxed">
            {site.name} works with suppliers, buyers, and corporate partners across Pakistan. As our primary home market, all four business pillars operate simultaneously under one unified ecosystem.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`${APP_URL}/trade/enquiry`}
              className="inline-flex items-center gap-2.5 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-800 active:translate-y-0"
            >
              Submit an Enquiry
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact-info"
              className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition-all duration-300 hover:border-teal-600 hover:bg-white"
            >
              Contact Local Hub
            </a>
          </div>
        </div>
      </section>

      {/* Four Businesses Grid */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-6xl">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Full Ecosystem Access</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Our businesses here</h2>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Every division operates locally, backed by singular corporate accountability and shared logistics.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pakistanBusinesses.map((b) => {
              const Icon = b.icon;
              return (
                <Link
                  key={b.title}
                  href={b.href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-teal-500/50"
                >
                  <div>
                    <div className="mb-6 inline-flex rounded-2xl bg-surface p-4 text-teal-700 border border-line group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-navy">{b.title}</h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-muted leading-relaxed">{b.desc}</p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-line flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-navy transition-colors">
                    <span>Explore division</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Import & Export Operations Section */}
      <section className="section bg-white border-b border-line">
        <div className="container-x max-w-6xl">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Bilateral Trade</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Import & Export Operations</h2>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Managing raw materials, finished textiles, and heavy machinery logistics across Pakistan’s key ports.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-10">
            {/* Imports */}
            <div className="rounded-3xl border border-line bg-surface p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-teal-50 border border-teal-200/60 p-3 text-teal-800">
                  <ArrowDownRight size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy">What We Import</h3>
                  <p className="text-xs text-muted">Commodities brought into Pakistan</p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {importItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-navy">
                    <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exports */}
            <div className="rounded-3xl border border-line bg-surface p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-amber-50 border border-amber-200/60 p-3 text-amber-800">
                  <ArrowUpRight size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy">What We Export</h3>
                  <p className="text-xs text-muted">Goods distributed globally from Pakistan</p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {exportItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-navy">
                    <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Network Card */}
          <div className="rounded-3xl border border-teal-500/20 bg-surface p-8 sm:p-10 shadow-sm text-center relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Partner Network</span>
            <h3 className="mt-2 text-2xl font-extrabold text-navy">Who We Work With</h3>
            <p className="mt-3 mx-auto max-w-xl text-sm text-muted leading-relaxed">
              We partner directly with certified textile mills, raw cotton growers, industrial manufacturers, and regional customs clearing agents across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Products & Services Catalog */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-6xl">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Market Catalog</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Products & services for this market</h2>
            <p className="mt-3 text-base text-muted leading-relaxed">Browse active products available for immediate domestic fulfillment.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {localProducts.map((p) => (
              <article key={p.slug} className="rounded-3xl border border-line bg-white p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div>
                  <div className="aspect-square w-full rounded-2xl bg-surface flex items-center justify-center text-teal-700 mb-5 border border-line">
                    <Package size={40} />
                  </div>
                  <span className="inline-block rounded-md bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-800 border border-teal-200/60 mb-2">
                    Domestic Delivery
                  </span>
                  <h3 className="text-base font-bold text-navy">{p.name}</h3>
                  <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">{p.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-bold text-navy">{p.price}</span>
                  <a
                    href={`${APP_URL}/shop/${p.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline"
                  >
                    View details <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Office Info */}
      <section id="contact-info" className="section bg-white border-b border-line">
        <div className="container-x max-w-5xl">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Direct Contact</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Contact us in Pakistan</h2>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12 shadow-sm grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line mt-1">
                  <Building2 size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy">Apex Global Pakistan Hub</h3>
                  <p className="text-xs text-muted mt-0.5">National Administrative & Operations Office</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold text-navy block">Email Us</span>
                  <a href="mailto:info@apexglobal.com" className="text-xs text-teal-700 hover:underline">info@apexglobal.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold text-navy block">Call Us</span>
                  <span className="text-xs text-muted">+92 21 30000000 / +92 (51) 555-0192</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t md:border-t-0 md:border-l border-line pt-6 md:pt-0 md:pl-8">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line mt-1">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy">Headquarters Address</h3>
                  <p className="text-xs text-muted leading-relaxed mt-1">
                    Apex Tower, Main Shahrah-e-Faisal, Karachi & Blue Area, Jinnah Avenue, Islamabad, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white p-3 text-teal-700 shadow-sm border border-line mt-1">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy">Working Hours</h3>
                  <p className="text-xs text-muted mt-1">Monday – Saturday: 9:00 AM – 6:00 PM (PKT)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements from Pakistan */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-5xl">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Updates</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Latest from Pakistan</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {recentAnnouncements.map((a) => (
              <article key={a.slug} className="rounded-3xl border border-line bg-white p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-teal-700">{a.category} · {a.date}</span>
                  <h3 className="mt-2 text-lg font-bold text-navy">{a.title}</h3>
                  <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">{a.excerpt}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-line">
                  <Link href={`/announcements/${a.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-teal-700">
                    Read full update <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={`${APP_URL}/trade/enquiry`}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800"
            >
              Submit an Enquiry
              <Send size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}