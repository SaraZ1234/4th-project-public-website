import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import { site, APP_URL } from "@/lib/content";
import { Reveal, SmartImage } from "@/components/Motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Users,
  Globe2,
  Printer,
  MessageSquare,
  ClipboardList,
  CheckCircle2,
  Store,
} from "lucide-react";

export const metadata: Metadata = {
  // If your root layout already adds " | Apex Global Group" through a title
  // template, change this to just "Contact Us".
  title: `Contact Us | ${site.name}`,
  description:
    "Send an enquiry about products, marketplace selling, import and export, or printing. Find our email, phone and address.",
  alternates: { canonical: "/contact" },
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// TODO: replace these placeholder photos with the client's real photography,
// saved in /public/images/contact/ (WebP or AVIF) and referenced as "/images/contact/hero.jpg".
// Hot-linked third-party photos should not go to production.
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const images = {
  hero: { src: img("photo-1521791136064-7986c2920216"), alt: "Two business partners shaking hands" },
  support: { src: img("photo-1553877522-43269d4ea984", 900), alt: "Customer support team at work" },
};

/* IMPORTANT: each `value` is passed to <EnquiryForm defaultCategory>.
   Make sure these match the category options inside EnquiryForm.
   `aliases` are other spellings that links from other pages may use
   (for example /contact?category=import-export). */
const categories = [
  { value: "Products", label: "Products & Store", icon: ShoppingBag, aliases: ["products", "product", "store", "shop"] },
  { value: "Marketplace", label: "Marketplace & Selling", icon: Users, aliases: ["marketplace", "seller", "sellers"] },
  { value: "Import & Export", label: "Import & Export", icon: Globe2, aliases: ["import & export", "import-export", "import export", "trade"] },
  { value: "Printing", label: "Printing", icon: Printer, aliases: ["printing", "print"] },
  { value: "General", label: "General enquiry", icon: MessageSquare, aliases: ["general"] },
];

// Turns any accepted spelling into the official category value (or undefined).
const resolveCategory = (raw?: string | string[]): string | undefined => {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return undefined;
  const key = value.trim().toLowerCase();
  return categories.find((c) => c.value.toLowerCase() === key || c.aliases.includes(key))?.value;
};

// Official channels (spec 2.14: "where available"). Leave empty to hide the block.
const officialChannels: { label: string; href: string }[] = [];

const includeList = [
  "Your name and email address",
  "A contact number, where it helps",
  "Which business your enquiry is about",
  "A clear subject and your message",
];

const routes = [
  { title: "Trade quotation", text: "Import or export requirements with product, quantity and destination.", href: `${APP_URL}/trade/enquiry`, icon: Globe2, internal: false },
  { title: "Printing quotation", text: "Printing requirements with size, material, quantity and artwork.", href: `${APP_URL}/printing/enquiry`, icon: Printer, internal: false },
  { title: "Become a seller", text: "Apply to sell on our multi-vendor marketplace.", href: "/become-a-seller", icon: Users, internal: true },
  { title: "Shop our store", text: "Browse products sold directly by us.", href: `${APP_URL}/shop`, icon: Store, internal: false },
];

const faqs = [
  { q: "What can I contact you about?", a: "Products and orders, marketplace selling, import and export, printing, or general questions. Choose the category that fits best." },
  { q: "What should I include in my enquiry?", a: "Your name, your email, a subject and your message. A contact number can help where it is requested." },
  { q: "What happens after I send an enquiry?", a: "You will see a confirmation once your enquiry is submitted, and our team will review it." },
  { q: "What if my enquiry does not send?", a: "Please try again. If it still does not work, contact us by email or phone using the details on this page." },
  { q: "Should I use this form for a quotation?", a: "For trade or printing quotations, the dedicated enquiry pages collect the details we need, so they are the best starting point." },
  { q: "How do I become a seller?", a: "Use the Become a Seller option to start your application. This contact form is for general questions." },
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

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const params = await searchParams; // e.g. /contact?category=Printing
  const selected = resolveCategory(params.category);

  const telHref = site.phone ? `tel:${String(site.phone).replace(/[^\d+]/g, "")}` : null;

  const contactItems = [
    site.email && { icon: Mail, label: "Email", value: String(site.email), href: `mailto:${site.email}` },
    site.phone && { icon: Phone, label: "Phone", value: String(site.phone), href: telHref },
    site.address && { icon: MapPin, label: "Address", value: String(site.address), href: null },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string | null }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      ...(site.email ? { email: site.email } : {}),
      ...(site.phone ? { telephone: site.phone } : {}),
      ...(site.address ? { address: String(site.address) } : {}),
    },
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
          <span className="font-bold text-navy" aria-current="page">Contact Us</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-surface py-12 sm:py-16 lg:py-20">
        <div className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-bold text-teal-800 shadow-sm">
                <Sparkles size={15} className="text-teal-600" />
                <span>Get in touch</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">Contact Us</h1>
              <p className="mt-4 text-lg font-bold text-teal-700 sm:text-xl">We&rsquo;d like to hear from you.</p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                Send an enquiry about products, marketplace selling, import and export, or printing, and our team will
                review it.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div role="group" aria-label="Enquiry categories" className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const active = selected === c.value;
                  return (
                    <Link
                      key={c.value}
                      href={`/contact?category=${encodeURIComponent(c.value)}#enquiry`}
                      aria-current={active ? "true" : undefined}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                        active
                          ? "border-teal-700 bg-teal-700 text-white"
                          : "border-line bg-white text-navy hover:border-teal-600"
                      }`}
                    >
                      <Icon size={14} />
                      {c.label}
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" delay={150}>
            <div className="group relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-white shadow-2xl lg:max-w-none">
              <SmartImage
                src={images.hero.src}
                alt={images.hero.alt}
                priority
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form + contact details */}
      <section id="enquiry" className="section scroll-mt-20 border-b border-line bg-white">
        <div className="container-x grid max-w-6xl gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
          <Reveal direction="left">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-lg sm:p-8">
              <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Send an enquiry</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Choose a category, add a subject and your message, and we will take it from there.
              </p>
              <div className="mt-6 sm:mt-8">
                <EnquiryForm defaultCategory={selected} />
              </div>
            </div>
          </Reveal>

          <aside className="space-y-6" aria-label="Contact details">
            <Reveal direction="right" delay={100}>
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
                <div className="relative aspect-[16/7] overflow-hidden">
                  <SmartImage src={images.support.src} alt={images.support.alt} className="h-full w-full object-cover" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-5 sm:p-7">
                  <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Reach us directly</h2>

                  {contactItems.length > 0 ? (
                    <address className="mt-5 space-y-4 not-italic">
                      {contactItems.map((c) => {
                        const Icon = c.icon;
                        const inner = (
                          <>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm ring-1 ring-line">
                              <Icon size={18} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[11px] font-bold uppercase tracking-wider text-teal-700">{c.label}</span>
                              <span className="mt-0.5 block whitespace-pre-line break-words text-sm font-semibold text-navy">{c.value}</span>
                            </span>
                          </>
                        );
                        return c.href ? (
                          <a
                            key={c.label}
                            href={c.href}
                            className="group flex items-start gap-3 rounded-xl transition hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div key={c.label} className="flex items-start gap-3">
                            {inner}
                          </div>
                        );
                      })}
                    </address>
                  ) : (
                    <p className="mt-4 text-sm leading-relaxed text-muted">Please use the enquiry form and we will get back to you.</p>
                  )}

                  {officialChannels.length > 0 && (
                    <>
                      <h3 className="mt-7 text-base font-bold text-navy">Official channels</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {officialChannels.map((ch) => (
                          <li key={ch.href}>
                            <a
                              href={ch.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-xs font-bold text-navy transition hover:border-teal-600 hover:text-teal-700"
                            >
                              {ch.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-5 sm:p-7">
                <h3 className="flex items-center gap-2.5 text-base font-extrabold text-navy">
                  <ClipboardList size={18} className="text-teal-700" /> What to include
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {includeList.map((i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-700" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Specific routes */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-6xl">
          <SectionHeading
            eyebrow="Need something specific?"
            title="Go straight to the right place"
            text="These pages collect the details we need for common requests."
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {routes.map((r, i) => {
              const Icon = r.icon;
              const body = (
                <>
                  <span className="mb-4 inline-flex rounded-xl bg-surface p-3 text-teal-700 ring-1 ring-line transition group-hover:bg-teal-700 group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-base font-bold text-navy">{r.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">{r.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-teal-700 transition group-hover:gap-2">
                    Continue <ArrowRight size={14} />
                  </span>
                </>
              );
              const cls =
                "group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:p-7";
              return (
                <Reveal key={r.title} delay={(i % 4) * 90} className="h-full">
                  {r.internal ? (
                    <Link href={r.href} className={cls}>{body}</Link>
                  ) : (
                    <a href={r.href} className={cls}>{body}</a>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-x max-w-6xl">
          <SectionHeading eyebrow="FAQ" title="Contact FAQ" text="Quick answers about getting in touch." />

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
    </div>
  );
}