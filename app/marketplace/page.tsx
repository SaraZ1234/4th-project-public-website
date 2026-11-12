import type { Metadata } from "next";
import Link from "next/link";
import {
  site,
  APP_URL,
  products,
  isOwnProduct,
  sellerSteps,
  type Product,
} from "@/lib/content";
import { Reveal, SmartImage } from "@/components/Motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Package,
  Sparkles,
  Store,
  Users,
  Search,
  Tag,
  BadgeCheck,
  ShoppingCart,
  Megaphone,
  ClipboardList,
} from "lucide-react";

export const metadata: Metadata = {
  // If your root layout already adds " | Apex Global Group" through a title
  // template, change this to just "Marketplace".
  title: `Marketplace | ${site.name}`,
  description:
    "Many sellers. One place. Discover products from independent sellers, each clearly labelled, or apply to become a seller.",
  alternates: { canonical: "/marketplace" },
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// TODO: replace these placeholder photos with the client's real photography,
// saved in /public/images/marketplace/ (WebP or AVIF) and referenced as "/images/marketplace/hero.jpg".
// Hot-linked third-party photos should not go to production.
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const images = {
  hero: { src: img("photo-1472851294608-062f824d29cc"), alt: "Busy marketplace with many independent shops" },
  sellers: { src: img("photo-1556740749-887f6717d7e4"), alt: "Independent seller preparing products for sale" },
  cta: { src: img("photo-1607082348824-0a96f2a4b9da"), alt: "Buyer browsing products online" },
};

// Only independent seller products belong on this page.
// The organization's own products are shown on the Our Store page.
const sellerProducts: Product[] = products.filter((p) => !isOwnProduct(p));

const buyerFeatures = [
  { icon: Search, title: "Discover and search", text: "Find products from many sellers in one connected place, with search, filtering and sorting in the marketplace." },
  { icon: BadgeCheck, title: "See who is selling", text: "Each product shows whether it is sold by an independent seller or directly by us." },
  { icon: Tag, title: "Check price and availability", text: "See the price and availability of each product before you decide." },
  { icon: ShoppingCart, title: "Shop across sellers", text: "Products from different sellers can be placed in the same cart. Each item stays linked to its seller." },
];

const sellerWho = [
  "Small and large businesses",
  "Manufacturers and wholesalers",
  "Independent sellers",
];

// Information collected during seller registration. Exact requirements are confirmed in the application.
const sellerProvides = [
  "Your name and business or shop name",
  "Email address and contact number",
  "Country and business address",
  "Business type",
  "Relevant business documents",
];

// Marketplace announcements (spec 2.17). Leave empty to hide the section.
const marketUpdates: { date: string; title: string; text: string }[] = [];

const faqs = [
  { q: "Who can sell on the marketplace?", a: "Businesses, manufacturers, wholesalers and independent sellers can apply. Every application is reviewed, and a seller must be approved before selling." },
  { q: "How are sellers approved?", a: "Applicants submit their business information and documents. The organization reviews each application, and you are told its status." },
  { q: "How long does approval take?", a: "The time depends on the review of your application and documents. You can follow the status of your application after you apply." },
  { q: "How can I tell who is selling a product?", a: `Every product is labelled. Products sold directly by us say “Sold by ${site.name}”, and products from independent sellers are marked “Marketplace Seller”.` },
  { q: "Can I buy from multiple sellers in one cart?", a: "Yes. Products from different sellers can be in the same cart. Each item stays linked to its seller, so an order may be handled as separate seller shipments." },
  { q: "How do I become a seller?", a: "Select Become a Seller and complete the registration. You will be guided through the application and onboarding steps." },
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
  const own = isOwnProduct(p);
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
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-50 via-white to-teal-50 text-violet-700"
          >
            <Package size={44} className="transition duration-500 group-hover:scale-110" />
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-md border px-2.5 py-1 text-[11px] font-bold shadow-sm backdrop-blur ${
            own
              ? "border-teal-200/60 bg-white/95 text-teal-800"
              : "border-violet-200 bg-violet-50/95 text-violet-800"
          }`}
        >
          {p.owner}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">{p.category}</span>
        <h3 className="mt-1 text-base font-bold text-navy">{p.name}</h3>
        {p.sellerName && <p className="mt-1 text-xs font-semibold text-muted">Seller: {p.sellerName}</p>}
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted sm:text-sm">{p.desc}</p>

        {(p.available || p.price) && (
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line/70 pt-3 text-xs font-semibold">
            <span className="text-muted">{p.available}</span>
            {p.price && <span className="text-sm font-extrabold text-navy">{p.price}</span>}
          </div>
        )}

        <a
          href={`${APP_URL}/marketplace/product/${p.slug}`}
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

export default function MarketplacePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} Marketplace`,
    itemListElement: sellerProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${APP_URL}/marketplace/product/${p.slug}`,
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
          <span className="font-bold text-navy" aria-current="page">Marketplace</span>
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
                <span>Multi-Vendor Marketplace</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">Marketplace</h1>
              <p className="mt-4 text-lg font-bold text-teal-700 sm:text-xl">Many sellers. One place.</p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                Our marketplace brings independent sellers and buyers together. Buyers discover products from many
                sellers, and sellers reach customers through one platform.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
                <a
                  href={`${APP_URL}/marketplace`}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
                >
                  Explore Marketplace
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>
                <Link
                  href="/become-a-seller"
                  className="inline-flex items-center justify-center rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white"
                >
                  Become a Seller
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

      {/* Two kinds of products */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-5xl">
          <SectionHeading
            eyebrow="Know who you are buying from"
            title="Two kinds of products, clearly labelled"
            text="Every product shows its source, so you always know who is selling it."
          />

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            <Reveal direction="left" className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                <span className="mb-4 inline-flex items-center gap-2 rounded-md border border-teal-200/60 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">
                  <Store size={14} /> Sold by {site.name}
                </span>
                <h3 className="text-lg font-bold text-navy">Our own products</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Products sold directly by our organization. You can find them in our own store.
                </p>
                <Link href="/products" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:underline">
                  Visit Our Store <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>

            <Reveal direction="right" delay={100} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                <span className="mb-4 inline-flex items-center gap-2 rounded-md border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-800">
                  <Users size={14} /> Marketplace Seller
                </span>
                <h3 className="text-lg font-bold text-navy">Independent seller products</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Products offered by independent sellers who have applied and been approved to sell on the marketplace.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What buyers can do */}
      <section className="section border-b border-line bg-white">
        <div className="container-x max-w-6xl">
          <SectionHeading eyebrow="For buyers" title="Shop many sellers in one place" />

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {buyerFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 90} className="h-full">
                  <div className="group h-full rounded-2xl border border-line bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-white hover:shadow-lg sm:p-7">
                    <span className="mb-4 inline-flex rounded-xl bg-white p-3 text-teal-700 shadow-sm ring-1 ring-line transition group-hover:bg-teal-700 group-hover:text-white">
                      <Icon size={22} />
                    </span>
                    <h3 className="text-base font-bold text-navy">{f.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{f.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured seller products */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-6xl">
          <SectionHeading
            eyebrow="Showcase"
            title="Featured seller products"
            text="A selection of products offered by independent sellers. Each one shows who is selling it."
          />

          {sellerProducts.length > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {sellerProducts.map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 4) * 80} className="h-full">
                    <ProductCard p={p} />
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-12 text-center">
                <a
                  href={`${APP_URL}/marketplace`}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-teal-700 px-8 py-3.5 text-sm font-bold text-teal-700 transition hover:-translate-y-0.5 hover:bg-teal-700 hover:text-white"
                >
                  Explore the full marketplace
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </a>
              </Reveal>
            </>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-line bg-white p-10 text-center">
                <Package size={36} className="mx-auto text-teal-700" />
                <h3 className="mt-4 text-lg font-bold text-navy">Seller products are coming soon</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Featured seller products will appear here. You can still visit the marketplace or apply to become a seller.
                </p>
                <a
                  href={`${APP_URL}/marketplace`}
                  className="mt-6 inline-flex rounded-xl bg-teal-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
                >
                  Visit the marketplace
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* For sellers */}
      <section id="sellers" className="section scroll-mt-20 border-b border-line bg-white">
        <div className="container-x max-w-6xl">
          <SectionHeading
            eyebrow="For sellers"
            title="Become a seller"
            text="Reach customers through one platform. Here is how participation works."
          />

          <div className="mb-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface shadow-lg">
                <SmartImage
                  src={images.sellers.src}
                  alt={images.sellers.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>

            <Reveal direction="right" delay={100}>
              <h3 className="text-lg font-bold text-navy">Who can sell</h3>
              <ul className="mt-3 space-y-2.5">
                {sellerWho.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-sm font-semibold text-navy">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-600" />
                    {w}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 flex items-center gap-2 text-lg font-bold text-navy">
                <ClipboardList size={18} className="text-teal-700" /> What you will be asked for
              </h3>
              <ul className="mt-3 space-y-2.5">
                {sellerProvides.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-600" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Applications are reviewed by our team. Exact requirements are confirmed during your application.
              </p>
            </Reveal>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
            {sellerSteps.map((step, idx) => (
              <li key={step} className="h-full">
                <Reveal delay={(idx % 5) * 80} className="h-full">
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

          <Reveal className="mt-10 text-center sm:mt-12">
            <Link
              href="/become-a-seller"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
            >
              Become a Seller
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Announcements (hidden when empty) */}
      {marketUpdates.length > 0 && (
        <section className="section border-b border-line bg-surface">
          <div className="container-x max-w-5xl">
            <SectionHeading eyebrow="Updates" title="Marketplace announcements" />
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {marketUpdates.map((u, i) => (
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
          <SectionHeading eyebrow="FAQ" title="Marketplace FAQ" text="Quick answers for buyers and sellers." />

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

      {/* Final CTA */}
      <section className="section overflow-hidden bg-white">
        <div className="container-x grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left" className="text-center lg:text-left">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">Have a question? Talk to our team.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:mx-0">
              Our team can help buyers and sellers with their enquiries.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <a
                href={`${APP_URL}/marketplace`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
              >
                Explore Marketplace
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <Link
                href="/contact?category=marketplace"
                className="inline-flex items-center justify-center rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white"
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