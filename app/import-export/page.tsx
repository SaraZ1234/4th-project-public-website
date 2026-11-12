import type { Metadata } from "next";
import Link from "next/link";
import { site, APP_URL, countries, pages, type Country } from "@/lib/content";
import { Reveal, SmartImage } from "@/components/Motion";
import {
  Globe2,
  ArrowRight,
  MapPin,
  Factory,
  Cpu,
  Package,
  Wheat,
  Sparkles,
  Megaphone,
  CheckCircle2,
  ListChecks,
  Mail,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  // If your root layout already adds " | Apex Global Group" through a title
  // template, change this to just "Import & Export".
  title: `Import & Export | ${site.name}`,
  description:
    "Learn about our national and international trade: the markets we work in, who can work with us, and how to send a trade enquiry.",
  alternates: { canonical: "/import-export" },
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// TODO: replace these placeholder photos with the client's real photography,
// saved in /public/images/trade/ (WebP or AVIF) and referenced as "/images/trade/hero.jpg".
// Hot-linked third-party photos should not go to production.
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const images = {
  hero: { src: img("photo-1494412574643-ff11b0a5c1c3"), alt: "Container ship carrying cargo across the sea" },
  logistics: { src: img("photo-1586528116311-ad8dd3c8310d"), alt: "Warehouse and freight logistics operations" },
  cta: { src: img("photo-1578575437130-527eed3abbec"), alt: "Stacked shipping containers at a port" },
};

// Goods come from lib/content so this page and the Businesses page always agree.
// PLACEHOLDER: the client must confirm the real list.
const goodsIcons = [Factory, Cpu, Package, Wheat];
const goods =
  pages
    .find((p) => p.slug === "import-export")
    ?.blocks.find((b) => b.h === "Goods we trade")?.items ?? [];

const workWithUs = [
  { role: "Suppliers", desc: "Manufacturers and producers who want to export their goods through us." },
  { role: "Buyers", desc: "Businesses and wholesale buyers who want to import goods." },
  { role: "Trade Partners", desc: "Distributors, agents and other businesses looking for long-term cooperation." },
];

const commercialOpportunities = [
  "Supply and purchasing relationships with suppliers, buyers and trade partners",
  "Trade across national and international markets",
  "A clear process from enquiry to delivery",
];

const tradeSteps = [
  "Send your trade enquiry with the product, quantity, origin and destination",
  "We review your requirements and send a quotation",
  "Confirm the order and agree the commercial terms",
  "Trade documents are prepared",
  "Shipment is arranged",
  "Goods are delivered and the order is completed",
];

// PLACEHOLDER: confirm the wording and document list with the client.
const importantInfo = [
  "Documents commonly used in trade include purchase orders, invoices, packing lists, certificates and customs papers. The exact documents depend on the product and the destination.",
  "Quotations, payments and approvals depend on the product, volume and destination market.",
  "Commercial terms are agreed after your enquiry has been reviewed.",
];

// Announcements for this business (spec 2.17). Leave empty to hide the section.
const tradeUpdates: { date: string; title: string; text: string }[] = [];

const countryNames = countries.map((c) => c.name);
const faqs = [
  {
    q: "Which countries do you trade with?",
    a: countryNames.length
      ? `We currently present the following markets: ${countryNames.join(", ")}. Pakistan is our home market and the others are international markets. Markets may be added over time.`
      : "Please see the markets listed on this page. Markets may be added over time.",
  },
  {
    q: "How do I request a quotation?",
    a: "Use the Submit Trade Enquiry button and include the product, quantity, origin and destination.",
  },
  {
    q: "What documents are needed for import and export?",
    a: "Documents commonly include invoices, packing lists, certificates and customs papers. Requirements depend on the product and the destination market.",
  },
  {
    q: "Who can submit an enquiry?",
    a: "Suppliers, buyers and trade partners can submit an enquiry.",
  },
  {
    q: "How long does a quotation take?",
    a: "The time depends on the product and the destination. Our team will respond to your enquiry after reviewing your requirements.",
  },
];

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
      {eyebrow && <span className="text-xs font-bold uppercase tracking-widest text-teal-700">{eyebrow}</span>}
      <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{text}</p>}
    </Reveal>
  );
}

function CountryCard({ c }: { c: Country }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl">
      <div className="relative flex h-24 items-center justify-between overflow-hidden bg-gradient-to-br from-teal-700 to-teal-500 px-6">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 transition duration-500 group-hover:scale-150" />
        <span className="relative rounded-md bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
          {c.group === "home" ? "Home Market" : "International Market"}
        </span>
        <Globe2 size={30} className="relative text-white/90 transition duration-500 group-hover:rotate-12" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-lg font-bold text-navy">{c.name}</h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">{c.text}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs font-bold">
          <Link href={`/countries/${c.slug}`} className="inline-flex items-center gap-1 text-teal-700 transition hover:gap-2 hover:text-teal-900">
            Market details <ArrowRight size={14} />
          </Link>
          <a
            href={`${APP_URL}/trade/enquiry?country=${encodeURIComponent(c.slug)}`}
            className="inline-flex items-center gap-1 text-navy transition hover:text-teal-700"
          >
            Enquire about {c.name}
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ImportExportPage() {
  const homeMarkets = countries.filter((c) => c.group === "home");
  const intlMarkets = countries.filter((c) => c.group !== "home");

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-line bg-white py-3">
        <div className="container-x text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="font-bold text-navy" aria-current="page">Import & Export</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-white py-14 sm:py-20 lg:py-28">
        <div className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-bold text-teal-800 shadow-sm">
                <Sparkles size={15} className="text-teal-600" />
                <span>Trade</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">Import & Export</h1>
              <p className="mt-4 text-lg font-bold text-teal-700 sm:text-xl">Trade that connects markets.</p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                {site.name} is active in national and international trade. We work with suppliers and buyers across
                different markets to import and export goods.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
                <a
                  href={`${APP_URL}/trade/enquiry`}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
                >
                  Submit Trade Enquiry
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white"
                >
                  Contact Us
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" delay={150}>
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
                <SmartImage
                  src={images.hero.src}
                  alt={images.hero.alt}
                  priority
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-white shadow-lg">
              <SmartImage
                src={images.logistics.src}
                alt={images.logistics.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Overview</span>
            <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">National and international trade</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Our import and export business is a dedicated part of the {site.name} ecosystem. Trade is handled through
              its own enquiry, quotation and shipment process rather than as an ordinary product order.
            </p>
            <ul className="mt-6 space-y-3">
              {commercialOpportunities.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm font-semibold text-navy">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-600" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Where we trade: Pakistan first and separate */}
      <section id="markets" className="section border-b border-line bg-white">
        <div className="container-x max-w-6xl">
          <SectionHeading
            eyebrow="Markets"
            title="Where we trade"
            text="Our home market is shown separately from our international markets."
          />

          {homeMarkets.length > 0 && (
            <div className="mb-10 sm:mb-12">
              <Reveal>
                <h3 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy">
                  <MapPin size={16} className="text-teal-700" /> Home market
                </h3>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {homeMarkets.map((c, i) => (
                  <Reveal key={c.slug} delay={i * 80} className="h-full">
                    <CountryCard c={c} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {intlMarkets.length > 0 && (
            <div>
              <Reveal>
                <h3 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy">
                  <Globe2 size={16} className="text-teal-700" /> International markets
                </h3>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {intlMarkets.map((c, i) => (
                  <Reveal key={c.slug} delay={(i % 3) * 80} className="h-full">
                    <CountryCard c={c} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <Reveal delay={100}>
            <div className="mt-10 text-center">
              <Link
                href="/countries"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-7 py-3.5 text-sm font-bold text-navy shadow-sm transition hover:border-teal-600 hover:bg-white"
              >
                View all countries / markets <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we trade (from lib/content) */}
      {goods.length > 0 && (
        <section className="section border-b border-line bg-surface">
          <div className="container-x max-w-6xl">
            <SectionHeading eyebrow="Goods" title="What we trade" text="The goods we work with." />

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {goods.map((title, i) => {
                const Icon = goodsIcons[i % goodsIcons.length];
                return (
                  <Reveal key={title} delay={i * 90} className="h-full">
                    <div className="group flex h-full flex-col items-start rounded-2xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl sm:p-7">
                      <span className="mb-5 inline-flex rounded-xl bg-teal-50 p-3.5 text-teal-700 transition group-hover:bg-navy group-hover:text-white">
                        <Icon size={24} />
                      </span>
                      <h3 className="text-base font-bold text-navy">{title}</h3>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Who can work with us */}
      <section className="section border-b border-line bg-white">
        <div className="container-x max-w-5xl">
          <SectionHeading eyebrow="Opportunities" title="Who can work with us" />

          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {workWithUs.map((w, i) => (
              <Reveal key={w.role} delay={i * 100} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-white hover:shadow-lg sm:p-7">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-navy">{w.role}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-5xl">
          <SectionHeading eyebrow="How it works" title="How trade enquiries work" />

          <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {tradeSteps.map((step, idx) => (
              <li key={step} className="h-full">
                <Reveal delay={(idx % 3) * 90} className="h-full">
                  <div className="group flex h-full gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg sm:flex-col sm:gap-0 sm:p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-sm font-black text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
                      0{idx + 1}
                    </span>
                    <p className="text-sm font-semibold leading-relaxed text-navy sm:mt-4">{step}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Important information */}
      <section className="section border-b border-line bg-white">
        <div className="container-x max-w-4xl">
          <Reveal>
            <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-lg font-extrabold text-navy sm:text-2xl">
                <ListChecks className="shrink-0 text-teal-700" /> Important information for partners
              </h2>
              <ul className="mt-5 space-y-3">
                {importantInfo.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-700" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Announcements (hidden when empty) */}
      {tradeUpdates.length > 0 && (
        <section className="section border-b border-line bg-surface">
          <div className="container-x max-w-5xl">
            <SectionHeading eyebrow="Updates" title="Trade announcements" />
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {tradeUpdates.map((u, i) => (
                <Reveal key={u.title} delay={i * 90} className="h-full">
                  <article className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-7">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold text-teal-700">
                      <Megaphone size={14} /> {u.date}
                    </div>
                    <h3 className="text-base font-bold text-navy">{u.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{u.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-6xl">
          <SectionHeading eyebrow="FAQ" title="Import & Export FAQ" text="Quick answers to common trade questions." />

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 90} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-600 hover:shadow-md sm:p-7">
                  <div className="mb-3 flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal-200 bg-teal-50 text-xs font-bold text-teal-800">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-bold text-navy">{f.q}</h3>
                  </div>
                  <p className="pl-9 text-xs leading-relaxed text-muted sm:text-sm">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + contact details */}
      <section className="section overflow-hidden border-t border-line bg-white">
        <div className="container-x grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left" className="text-center lg:text-left">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">Have a trade requirement? Talk to our team.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:mx-0">
              Send us your enquiry, or contact us using the details below.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <a
                href={`${APP_URL}/trade/enquiry`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
              >
                Submit Trade Enquiry
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <Link
                href="/contact?category=import-export"
                className="inline-flex items-center justify-center rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 text-sm lg:items-start">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 font-semibold text-navy hover:text-teal-700">
                <Mail size={16} className="text-teal-700" /> {site.email}
              </a>
              <a
                href={`tel:${String(site.phone).replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-2 font-semibold text-navy hover:text-teal-700"
              >
                <Phone size={16} className="text-teal-700" /> {site.phone}
              </a>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-line shadow-xl">
              <SmartImage
                src={images.cta.src}
                alt={images.cta.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
} 