import type { Metadata } from "next";
import Link from "next/link";
import { site, APP_URL } from "@/lib/content";
import { Reveal, SmartImage } from "@/components/Motion";
import {
  ArrowRight,
  CheckCircle2,
  Package,
  Presentation,
  FileText,
  Stamp,
  Tag,
  Printer,
  Sparkles,
  Megaphone,
  Route,
  ClipboardList,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Printing Services | ${site.name}`,
  description:
    "Printing for individuals and businesses. Tell us what you need, receive a quotation, and follow your order through to delivery or collection.",
  alternates: { canonical: "/printing" },
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

/* Replace any URL with your own photo, e.g. "/images/printing/hero.jpg"
   (file in /public/images/printing/). A gradient shows if an image fails. */
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const images = {
  hero: { src: img("photo-1562564055-71e051d33c19"), alt: "Commercial printing press producing colour prints" },
  about: { src: img("photo-1586075010923-2dd4570fb338"), alt: "Printed stationery and brand materials" },
  cta: { src: img("photo-1607082349566-187342175e2f"), alt: "Printed packaging boxes ready for dispatch" },
};

/* NOTE: the organization defines the final service list (spec 3.16.1).
   Confirm these before publishing, then edit, add, or remove freely. */
const printingServicesList = [
  { title: "Custom Packaging", desc: "Printed boxes and carton packaging for products and shipments.", icon: Package, image: img("photo-1607082349566-187342175e2f", 800), alt: "Printed packaging boxes" },
  { title: "Banners & Display Signage", desc: "Large-format banners, roll-up stands, and promotional signage.", icon: Presentation, image: img("photo-1561070791-2526d30994b5", 800), alt: "Large-format printed banner" },
  { title: "Brand Collateral & Stationery", desc: "Business cards, letterheads, folders, and product tags.", icon: FileText, image: img("photo-1586075010923-2dd4570fb338", 800), alt: "Business cards and stationery" },
  { title: "Finishing Options", desc: "Finishes such as foil stamping and embossing, where available for your job.", icon: Stamp, image: img("photo-1513542789411-b6a5d4f31634", 800), alt: "Printed material with special finishing" },
  { title: "Product Labels", desc: "Adhesive labels for jars, bottles, and boxes.", icon: Tag, image: img("photo-1605518216938-7c31b7b14ad0", 800), alt: "Printed product labels" },
  { title: "Offset & Digital Printing", desc: "Commercial print runs by offset or digital methods, suited to your quantity.", icon: Printer, image: img("photo-1562564055-71e051d33c19", 800), alt: "Printing press in operation" },
];

const whoItsFor = [
  "Individuals",
  "Small & medium businesses",
  "Large businesses & retailers",
  "Manufacturers & exporters",
];

// Follows the customer journey in spec 3.16.
const printingSteps = [
  "Submit your enquiry with your printing requirements",
  "Receive a quotation based on your specifications",
  "Accept the quotation and confirm your order and payment arrangement",
  "Review and approve your artwork or proof, where required",
  "Your order goes through production, finishing, and quality checking",
  "Your order is delivered or collected, and the job is completed",
];

// Mirrors the enquiry information in spec 3.16.2.
const prepareList = [
  "The printing service you need",
  "Quantity, and the size or dimensions",
  "Material and colour requirements",
  "Any finishing you would like",
  "Your delivery location, or that you will collect",
  "The date you need it completed",
  "Your artwork or print-ready files, if you have them",
  "Any additional instructions",
];

// Printing service updates (spec 2.17). Leave empty to hide the section.
const printingUpdates: { date: string; title: string; text: string }[] = [];

const faqs = [
  { q: "What can I get printed?", a: "Our current printing services are listed on this page. If you need something that is not listed, send an enquiry and our team will tell you whether we can help." },
  { q: "How do I get a quotation?", a: "Submit a printing enquiry with your requirements. A quotation depends on details such as the service, quantity, material, size, finishing, and delivery." },
  { q: "Do I need to supply artwork?", a: "You can provide your artwork or print-ready files with your enquiry. Our team will confirm what is needed for your job." },
  { q: "Will I see a proof before production?", a: "Where a job needs approval of the artwork, design, or a proof, you can review it and approve it or ask for changes before production." },
  { q: "How does payment work?", a: "Payment arrangements, including whether an advance is needed, are confirmed by our team as part of your quotation and order." },
  { q: "How do I receive my order, and can I follow it?", a: "Completed orders are delivered or collected, depending on your arrangement. You can follow your order's status as it moves through production and delivery." },
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

export default function PrintingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} Printing Services`,
    itemListElement: printingServicesList.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      description: s.desc,
    })),
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="border-b border-line bg-white py-3">
        <div className="container-x text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span className="mx-2">›</span>
          <span className="font-bold text-navy">Printing Services</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-white py-14 sm:py-20 lg:py-28">
        <div className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-bold text-teal-800 shadow-sm">
                <Sparkles size={15} className="text-teal-600" />
                <span>Printing Division</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">Printing Services</h1>
              <p className="mt-4 text-lg font-bold text-teal-700 sm:text-xl">Printing for individuals and businesses.</p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                {site.name} offers printing services for individuals and businesses. Tell us what you need, get a
                quotation, and follow your order until it is delivered or collected.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
                <a
                  href={`${APP_URL}/printing/enquiry`}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
                >
                  Submit Printing Enquiry
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white"
                >
                  View Our Services
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

              <div className="animate-float absolute -bottom-5 left-3 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:-left-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700"><Printer size={20} /></span>
                <div>
                  <p className="text-lg font-extrabold leading-none text-navy">{printingServicesList.length}</p>
                  <p className="mt-1 text-[11px] font-semibold text-muted">Service types</p>
                </div>
              </div>

              <div className="animate-float-slow absolute -top-4 right-3 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:-right-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Route size={20} /></span>
                <div>
                  <p className="text-lg font-extrabold leading-none text-navy">{printingSteps.length} steps</p>
                  <p className="mt-1 text-[11px] font-semibold text-muted">Enquiry to delivery</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About the printing business + who it's for */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-white shadow-lg">
              <SmartImage
                src={images.about.src}
                alt={images.about.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">About our printing business</span>
            <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">A dedicated printing service</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Printing is a separate business within the {site.name} ecosystem. It follows its own process of
              enquiry, quotation, order, and production, so each job is handled according to its own requirements.
            </p>

            <h3 className="mt-7 text-base font-bold text-navy">Who it&rsquo;s for</h3>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {whoItsFor.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm font-semibold text-navy">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-600" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section scroll-mt-20 border-b border-line bg-white">
        <div className="container-x max-w-6xl">
          <SectionHeading
            eyebrow="What we print"
            title="Our services"
            text="Available options, materials, and finishes are confirmed with your quotation."
          />

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {printingServicesList.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={(i % 3) * 90} className="h-full">
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      <SmartImage
                        src={s.image}
                        alt={s.alt}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute bottom-3 left-3 inline-flex rounded-lg bg-white p-2.5 text-teal-700 shadow-md">
                        <Icon size={20} />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-base font-bold text-navy">{s.title}</h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">{s.desc}</p>
                      <a
                        href={`${APP_URL}/printing/enquiry?service=${encodeURIComponent(s.title)}`}
                        className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-teal-700 transition hover:gap-2 hover:text-teal-900"
                      >
                        Enquire about this <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-5xl">
          <SectionHeading eyebrow="Workflow" title="How it works" />

          <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {printingSteps.map((step, idx) => (
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

      {/* What to prepare */}
      <section className="section border-b border-line bg-white">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow="Before you enquire"
            title="What to prepare"
            text="Depending on the service, our enquiry form may ask for the following."
          />

          <Reveal>
            <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-6 sm:p-8">
              <h3 className="flex items-center gap-3 text-base font-extrabold text-navy sm:text-lg">
                <ClipboardList className="shrink-0 text-teal-700" /> Helpful details
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {prepareList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-700" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-muted">
                Not sure about something? Send your enquiry anyway and our team will help.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Announcements (hidden when empty) */}
      {printingUpdates.length > 0 && (
        <section className="section border-b border-line bg-surface">
          <div className="container-x max-w-5xl">
            <SectionHeading eyebrow="Updates" title="Printing service updates" />
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {printingUpdates.map((u, i) => (
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
          <SectionHeading eyebrow="Support & Answers" title="Printing FAQ" text="Quick answers to common printing questions." />

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

      {/* Final CTA (white) */}
      <section className="section overflow-hidden bg-white">
        <div className="container-x grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left" className="text-center lg:text-left">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">Have a question? Talk to our team.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:mx-0">
              Our printing team is ready to help with your printing requirements.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <a
                href={`${APP_URL}/printing/enquiry`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
              >
                Submit Printing Enquiry
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