import type { Metadata } from "next";
import Link from "next/link";
import { site, APP_URL, products, isOwnProduct, type Product } from "@/lib/content";
import { Reveal, SmartImage } from "@/components/Motion";
import {
  ArrowRight,
  ArrowUpRight,
  Package,
  Sparkles,
  Store,
  Users,
  Headphones,
  Megaphone,
  LayoutGrid,
} from "lucide-react";

export const metadata: Metadata = {
  // If your root layout already adds " | Apex Global Group" through a title
  // template, change this to just "Our Store".
  title: `Our Store | ${site.name}`,
  description:
    "Products sold directly by Apex Global Group. Browse our own store and continue to the online shop to view details and order.",
  alternates: { canonical: "/products" },
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// TODO: replace these placeholder photos with the client's real photography,
// saved in /public/images/store/ (WebP or AVIF) and referenced as "/images/store/hero.jpg".
// Hot-linked third-party photos should not go to production.
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const images = {
  hero: { src: img("photo-1441986300917-64674bd600d8"), alt: "Retail store shelves with products on display" },
  why: { src: img("photo-1553413077-190dd305871c"), alt: "Packaged products prepared for dispatch" },
  cta: { src: img("photo-1556742049-0cfed4f6a45d"), alt: "Customer completing a purchase at checkout" },
};

// Only the organization's own products belong on this page.
// Marketplace seller products are shown on the Marketplace page.
const items: Product[] = products.filter(isOwnProduct);

// Categories come from the real product data, so they never drift from the catalogue.
const categories = Array.from(new Set(items.map((p) => p.category))).map((name) => ({
  name,
  count: items.filter((p) => p.category === name).length,
}));

const buySteps = [
  "Browse the products in our store",
  "Open a product to see its details and availability",
  "Add items to your cart and check out in our online shop",
  "Follow your order status from your customer account",
];

const whyPoints = [
  {
    icon: Store,
    title: `Sold directly by ${site.name}`,
    text: "Every product here belongs to our own store and is labelled clearly, so you always know who you are buying from.",
  },
  {
    icon: Users,
    title: "Separate from marketplace sellers",
    text: "Products from independent sellers live in the marketplace and show their seller’s name. They are never mixed in with ours.",
  },
  {
    icon: Headphones,
    title: "Support from our team",
    text: "Questions about a product or an order? Contact our team and we will help with your enquiry.",
  },
];

// Store announcements and new product introductions (spec 2.17). Leave empty to hide the section.
const storeUpdates: { date: string; title: string; text: string }[] = [];

const faqs = [
  { q: "What payment methods are accepted?", a: "Available payment methods are shown at checkout and may vary by country." },
  { q: "How long does delivery take?", a: "Delivery options and timing depend on the product and your location. They are shown during checkout." },
  { q: "What is your return policy?", a: "Returns and refunds are handled under the store’s policy for each order. Contact our team if you need help with a specific order." },
  { q: "How do I track my order?", a: "Once you place an order, its status and delivery information are available in your customer account." },
  { q: "What is the difference between the store and the marketplace?", a: `Products in Our Store are sold directly by ${site.name}. Marketplace products are offered by independent sellers and are labelled with their seller’s name.` },
  { q: "How do I ask about a product?", a: "Use the Contact Us button on this page and tell us which product you are interested in." },
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

function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden border-b border-line bg-surface">
        {p.image ? (
          <SmartImage
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            role="img"
            aria-label={p.name}
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-50 via-white to-amber-50 text-teal-700"
          >
            <Package size={44} className="transition duration-500 group-hover:scale-110" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md border border-teal-200/60 bg-white/95 px-2.5 py-1 text-[11px] font-bold text-teal-800 shadow-sm backdrop-blur">
          {p.owner}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">{p.category}</span>
        <h3 className="mt-1 text-base font-bold text-navy">{p.name}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted sm:text-sm">{p.desc}</p>

        {(p.available || p.price) && (
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line/70 pt-3 text-xs font-semibold">
            <span className="text-muted">{p.available}</span>
            {p.price && <span className="text-sm font-extrabold text-navy">{p.price}</span>}
          </div>
        )}

        <a
          href={`${APP_URL}/shop/${p.slug}`}
          aria-label={`View details of ${p.name}`}
          className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-4 py-3 text-xs font-bold text-white transition hover:bg-teal-800"
        >
          View details <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function StorePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} Store`,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${APP_URL}/shop/${p.slug}`,
    })),
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-line bg-white py-3">
        <div className="container-x text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="font-bold text-navy" aria-current="page">Our Store</span>
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
                <span>Organization-Owned Store</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">Our Store</h1>
              <p className="mt-4 text-lg font-bold text-teal-700 sm:text-xl">Products sold directly by us.</p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                Shop {site.name}&rsquo;s own range of products. These are products we sell directly, separate from the
                multi-vendor marketplace where independent sellers offer theirs.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
                <a
                  href={`${APP_URL}/shop`}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
                >
                  Shop Now
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white"
                >
                  View Featured Products
                </a>
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

      {/* Categories (from real product data) */}
      {categories.length > 0 && (
        <section className="section border-b border-line bg-surface">
          <div className="container-x max-w-6xl">
            <SectionHeading eyebrow="Browse" title="Shop by category" text="Categories in our store catalogue." />

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {categories.map((cat, i) => (
                <Reveal key={cat.name} delay={(i % 4) * 90} className="h-full">
                  <a
                    href={`${APP_URL}/shop?category=${encodeURIComponent(cat.name)}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl"
                  >
                    <div className="relative flex h-24 items-center justify-between overflow-hidden bg-gradient-to-br from-teal-700 to-teal-500 px-6">
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 transition duration-500 group-hover:scale-150" />
                      <LayoutGrid size={28} className="relative text-white/90 transition duration-500 group-hover:rotate-6" />
                      <span className="relative rounded-md bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                        {cat.count} {cat.count === 1 ? "product" : "products"}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-3 p-5 sm:p-6">
                      <h3 className="text-base font-bold text-navy">{cat.name}</h3>
                      <ArrowRight size={18} className="shrink-0 text-teal-700 transition group-hover:translate-x-1" />
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured products */}
      <section id="featured" className="section scroll-mt-20 border-b border-line bg-white">
        <div className="container-x max-w-6xl">
          <SectionHeading
            eyebrow="Featured"
            title="Featured products"
            text={`A selection of products sold directly by ${site.name}.`}
          />

          {items.length > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {items.map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 4) * 80} className="h-full">
                    <ProductCard p={p} />
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-10 text-center sm:mt-12">
                <a
                  href={`${APP_URL}/shop`}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-teal-700 px-8 py-3.5 text-sm font-bold text-teal-700 transition hover:-translate-y-0.5 hover:bg-teal-700 hover:text-white"
                >
                  View the full catalogue
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </a>
              </Reveal>
            </>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-line bg-surface p-10 text-center">
                <Package size={36} className="mx-auto text-teal-700" />
                <h3 className="mt-4 text-lg font-bold text-navy">Products are coming soon</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Our featured products will appear here. You can still visit the online shop or contact our team.
                </p>
                <a
                  href={`${APP_URL}/shop`}
                  className="mt-6 inline-flex rounded-xl bg-teal-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
                >
                  Visit the shop
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Store vs marketplace */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-6xl">
          <SectionHeading
            eyebrow="Know who you are buying from"
            title="Our Store and the Marketplace"
            text="Two different ways to shop. We keep them clearly separate."
          />

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            <Reveal direction="left" className="h-full">
              <div className="h-full rounded-2xl border-2 border-teal-600 bg-white p-6 shadow-md sm:p-8">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white"><Store size={22} /></span>
                <h3 className="text-xl font-bold text-navy">Our Store (this page)</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Products sold directly by {site.name}. Each one is labelled &ldquo;Sold by {site.name}.&rdquo;
                </p>
                <a href={`${APP_URL}/shop`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:underline">
                  Shop Now <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>

            <Reveal direction="right" delay={100} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><Users size={22} /></span>
                <h3 className="text-xl font-bold text-navy">Marketplace</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Products from independent sellers, each labelled &ldquo;Marketplace Seller.&rdquo; Explore them in one place.
                </p>
                <Link href="/marketplace" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:underline">
                  Explore Marketplace <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How buying works */}
      <section className="section border-b border-line bg-white">
        <div className="container-x max-w-5xl">
          <SectionHeading eyebrow="Process" title="How buying works" />

          <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {buySteps.map((step, idx) => (
              <li key={step} className="h-full">
                <Reveal delay={idx * 90} className="h-full">
                  <div className="group flex h-full gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-white hover:shadow-lg sm:flex-col sm:gap-0 sm:p-6">
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

      {/* Why buy from us */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-white shadow-lg">
              <SmartImage
                src={images.why.src}
                alt={images.why.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Why buy from us</span>
            <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">Clear, direct and supported</h2>
            <ul className="mt-6 space-y-5">
              {whyPoints.map((w) => {
                const Icon = w.icon;
                return (
                  <li key={w.title} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm ring-1 ring-line">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-navy">{w.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{w.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Announcements (hidden when empty) */}
      {storeUpdates.length > 0 && (
        <section className="section border-b border-line bg-white">
          <div className="container-x max-w-5xl">
            <SectionHeading eyebrow="Updates" title="Store announcements" />
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {storeUpdates.map((u, i) => (
                <Reveal key={u.title} delay={i * 90} className="h-full">
                  <article className="h-full rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:shadow-lg sm:p-7">
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
      <section className="section border-b border-line bg-white">
        <div className="container-x max-w-6xl">
          <SectionHeading eyebrow="FAQ" title="Store FAQ" text="Quick answers to common questions about our store." />

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 90} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white hover:shadow-md sm:p-7">
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

      {/* Final CTA */}
      <section className="section overflow-hidden bg-surface">
        <div className="container-x grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left" className="text-center lg:text-left">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">Have a question? Talk to our team.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:mx-0">
              Our team can help with product enquiries and your orders.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <a
                href={`${APP_URL}/shop`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
              >
                Shop Now
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <Link
                href="/contact?category=products"
                className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600"
              >
                Contact Us
              </Link>
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