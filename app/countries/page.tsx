import type { Metadata } from "next";
import Link from "next/link";
import { site, countries } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import { Globe2, ArrowRight, MapPin, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  // The root layout already adds the brand name to titles, so it is not repeated here.
  title: "Countries / Markets",
  description: `See the markets ${site.name} works in and what we do in each of them.`,
  alternates: { canonical: "/countries" },
};

// Pakistan always comes first and is shown separately.
const homeMarkets = countries.filter((c) => c.group === "home");
const intlMarkets = countries.filter((c) => c.group !== "home");

// PLACEHOLDER: replace with the businesses that really operate in Pakistan.
const homeBusinesses = ["Import & Export", "Store", "Marketplace", "Printing"];

export default function CountriesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-line bg-white py-3.5">
        <div className="container-x text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
          <span className="mx-2 text-muted/50" aria-hidden="true">›</span>
          <span className="font-bold text-navy" aria-current="page">Countries / Markets</span>
        </div>
      </nav>

      {/* Banner */}
      <section className="relative overflow-hidden border-b border-line bg-white py-16 sm:py-20 lg:py-24">
        <div className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[120px] sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative max-w-4xl text-center">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-bold text-teal-800 shadow-sm sm:text-sm">
              <Sparkles size={16} className="text-teal-600" />
              <span>Markets</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">Countries / Markets</h1>
            <p className="mt-4 text-lg font-bold text-teal-700 sm:text-xl">Where we do business.</p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {site.name} works with suppliers, buyers and partners across different markets. Choose a country to see
              our activities, products and contact details there.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pakistan: shown first and on its own */}
      {homeMarkets.length > 0 && (
        <section className="section border-b border-line bg-surface">
          <div className="container-x max-w-6xl">
            <Reveal>
              <h2 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy">
                <MapPin size={16} className="text-teal-700" /> Home market
              </h2>
            </Reveal>

            {homeMarkets.map((c) => (
              <Reveal key={c.slug}>
                <article className="flex flex-col gap-6 rounded-3xl border border-line border-t-4 border-t-teal-700 bg-white p-7 shadow-sm sm:p-10 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-extrabold text-navy sm:text-3xl">{c.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{c.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {homeBusinesses.map((b) => (
                        <li
                          key={b}
                          className="rounded-md border border-teal-200/60 bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-800"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/countries/${c.slug}`}
                    className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
                  >
                    View {c.name}
                    <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* International markets */}
      {intlMarkets.length > 0 && (
        <section className="section border-b border-line bg-white">
          <div className="container-x max-w-6xl">
            <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">International</span>
              <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">Our international markets</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Select a market to learn more.
              </p>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {intlMarkets.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 3) * 80} className="h-full">
                  <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-white hover:shadow-xl sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md border border-teal-200/50 bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-800">
                        Import / Export
                      </span>
                      <Globe2 size={20} className="text-teal-700 transition-transform duration-500 group-hover:rotate-12" />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-navy">{c.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.text}</p>

                    <Link
                      href={`/countries/${c.slug}`}
                      className="mt-6 inline-flex items-center gap-1 border-t border-line pt-4 text-xs font-bold text-teal-700 transition hover:gap-2 hover:text-navy"
                    >
                      View {c.name} <ArrowRight size={14} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="section bg-surface">
        <div className="container-x max-w-4xl text-center">
          <Reveal>
            <div className="rounded-3xl border border-teal-500/20 bg-white p-8 shadow-md sm:p-12">
              <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Don&rsquo;t see your country?</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                Tell us what you need and our team will get back to you.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact?category=import-export"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
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