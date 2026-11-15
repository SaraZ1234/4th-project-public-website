import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, APP_URL, countries, announcements } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import {
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Pakistan has its own page at /countries/pakistan, so only international markets are built here.
export function generateStaticParams() {
  return countries.filter((c) => c.group !== "home").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  if (!country || country.group === "home") return {};
  return {
    // The root layout already adds the brand name to titles, so it is not repeated here.
    title: `Our Business in ${country.name}`,
    description: `See how ${site.name} works with suppliers, buyers and trade partners in ${country.name}, and send a trade enquiry.`,
    alternates: { canonical: `/countries/${country.slug}` },
  };
}

export default async function InternationalCountryPage({ params }: PageProps) {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  if (!country || country.group === "home") {
    notFound();
  }

  const enquiryHref = `${APP_URL}/trade/enquiry?country=${encodeURIComponent(country.slug)}`;
  const imports = country.imports ?? [];
  const exports = country.exports ?? [];
  const marketNews = announcements.filter((a) => a.country === country.slug).slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-line py-3.5">
        <div className="container-x text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
          <span className="mx-2 text-muted/50" aria-hidden="true">›</span>
          <Link href="/countries" className="hover:text-teal-700 transition-colors">Countries / Markets</Link>
          <span className="mx-2 text-muted/50" aria-hidden="true">›</span>
          <span className="text-navy font-bold" aria-current="page">{country.name}</span>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28 border-b border-line">
        <div className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-amber-500/10 blur-[140px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative max-w-4xl text-center">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs sm:text-sm font-bold text-teal-800 shadow-sm">
              <Sparkles size={16} className="text-teal-600" />
              <span>International Market</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Our Business in {country.name}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted leading-relaxed">
              We work with suppliers, buyers and trade partners in {country.name}. Get in touch to discuss opportunities in this market.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={enquiryHref}
                className="group inline-flex items-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
              >
                Submit an Enquiry
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <Link
                href="/contact?category=import-export"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Activities here */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-4xl">
          <Reveal className="mx-auto max-w-3xl text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Activities</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Activities here</h2>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm sm:p-8">
              <h3 className="text-base font-bold text-navy">Import & Export</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{country.text}</p>
              <Link
                href="/import-export"
                className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:gap-2 transition-all"
              >
                About our import and export business <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we import / export (only when the client has confirmed the lists) */}
      {(imports.length > 0 || exports.length > 0) && (
        <section className="section bg-white border-b border-line">
          <div className="container-x max-w-5xl">
            <Reveal className="mx-auto max-w-3xl text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Trade</span>
              <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Import and export with {country.name}</h2>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2">
              {imports.length > 0 && (
                <Reveal direction="left" className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-surface p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="rounded-xl bg-teal-50 border border-teal-200/60 p-3 text-teal-800">
                        <ArrowDownRight size={22} />
                      </div>
                      <h3 className="text-xl font-bold text-navy">What we import</h3>
                    </div>
                    <ul className="space-y-3.5">
                      {imports.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm font-semibold text-navy">
                          <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {exports.length > 0 && (
                <Reveal direction="right" className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-surface p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="rounded-xl bg-amber-50 border border-amber-200/60 p-3 text-amber-800">
                        <ArrowUpRight size={22} />
                      </div>
                      <h3 className="text-xl font-bold text-navy">What we export</h3>
                    </div>
                    <ul className="space-y-3.5">
                      {exports.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm font-semibold text-navy">
                          <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Who we work with */}
      <section className="section bg-white border-b border-line">
        <div className="container-x max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Who we work with</h2>
            <p className="mt-4 text-base text-muted leading-relaxed">
              Suppliers, buyers and trade partners in {country.name}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Market announcements (hidden when there are none for this country) */}
      {marketNews.length > 0 && (
        <section className="section bg-surface border-b border-line">
          <div className="container-x max-w-6xl">
            <Reveal className="mx-auto max-w-3xl text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Updates</span>
              <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Latest from {country.name}</h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {marketNews.map((a, i) => (
                <Reveal key={a.slug} delay={(i % 3) * 80} className="h-full">
                  <article className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div>
                      <span className="text-xs font-bold text-teal-700 tracking-wider uppercase">{a.category}</span>
                      <p className="mt-3 text-[11px] font-semibold text-muted">{a.date}</p>
                      <h3 className="mt-2 text-lg font-bold text-navy group-hover:text-teal-700 transition-colors">{a.title}</h3>
                      <p className="mt-3 text-xs text-muted leading-relaxed">{a.excerpt}</p>
                    </div>
                    <Link href={`/announcements/${a.slug}`} className="mt-6 text-xs font-bold text-teal-700 hover:underline">
                      Read full update &rarr;
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact and enquiry */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-3xl text-center">
          <Reveal>
            <div className="rounded-3xl border border-teal-500/20 bg-white p-8 shadow-md sm:p-12">
              <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Interested in {country.name}?</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted leading-relaxed sm:text-base">
                Send us your enquiry, or contact our team using the details below.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={enquiryHref}
                  className="group inline-flex items-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
                >
                  Submit an Enquiry
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>
                <Link
                  href="/countries"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:bg-white"
                >
                  View all countries / markets
                </Link>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 text-sm">
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
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}