import type { Metadata } from "next";
import Link from "next/link";
import { site, APP_URL, countries } from "@/lib/content";
import { Globe2, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return countries.filter((c) => c.group !== "home").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug); if (!country) return {};
  return {
    title: `Our Business in ${country.name} | ${site.name}`,
    description: `Explore our trade operations, import and export corridors, and partner networks in ${country.name}.`,
    alternates: { canonical: `/countries/${country.slug}` },
  };
}

export default async function InternationalCountryPage({ params }: PageProps) {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  if (!country || country.group === "home") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-line py-3">
        <div className="container-x text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/countries" className="hover:text-teal-700">Countries</Link>
          <span className="mx-2">›</span>
          <span className="text-navy font-bold">{country.name}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28 border-b border-line">
        <div className="container-x relative max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">International Market</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Our Business in {country.name}
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted leading-relaxed">
            We trade with partners in {country.name}, importing and exporting high-grade commercial commodities. Get in touch to discuss opportunities in this market.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`${APP_URL}/trade/enquiry`}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-teal-800"
            >
              Submit an Enquiry
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Activities Here */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-4xl">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Activities here</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <h3 className="text-base font-bold text-navy">Import & Export</h3>
              <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">{country.text}</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
              <h3 className="text-base font-bold text-navy">Other businesses</h3>
              <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">Retail storefront and printing services are currently available via our domestic hub or direct digital channels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="section bg-white border-b border-line">
        <div className="container-x max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Who we work with</h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            Suppliers, buyers, and long-term trade partners in {country.name}.
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:bg-white hover:border-teal-600"
            >
              Contact Our Trade Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}