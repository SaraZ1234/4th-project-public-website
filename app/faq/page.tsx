import Link from "next/link";
import { ArrowRight, ChevronDown, MessageSquare } from "lucide-react";
import { faqCategories } from "@/lib/content";
import { Banner, JsonLd } from "@/components/Page";
import { Reveal } from "@/components/Motion";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about the organization, selling, trade and printing.",
};

const slugify = (s: string) => s.replace(/\W+/g, "-");

export default function FAQ() {
  const entries = Object.entries(faqCategories);
  const all = Object.values(faqCategories).flat();

  return (
    <>
      <Banner title="Frequently asked questions" trail={[{ label: "FAQ" }]} />

      <section className="section relative overflow-hidden border-b border-line bg-surface">
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-teal-500/10 blur-[110px] motion-reduce:animate-none"
        />
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-amber-500/10 blur-[110px] motion-reduce:animate-none"
          style={{ animationDelay: "-6s" }}
        />

        <div className="container-x relative max-w-3xl">
          <Reveal className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Help centre
            </span>
            <h2 className="mt-2 break-words text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">
              Answers to common questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Browse by topic to find answers about our organization, selling,
              trade and printing services.
            </p>
          </Reveal>

          <nav
            aria-label="FAQ categories"
            className="mb-10 flex flex-wrap items-center justify-center gap-2.5"
          >
            {entries.map(([c]) => (
              <a
                key={c}
                href={`#${slugify(c)}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-xs font-semibold text-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-600 hover:text-teal-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 motion-reduce:transform-none sm:px-5 sm:text-sm"
              >
                {c}
              </a>
            ))}
          </nav>

          {entries.map(([c, qs]) => {
            const catId = slugify(c);
            return (
              <section
                key={c}
                id={catId}
                aria-labelledby={`${catId}-heading`}
                className="mb-10 scroll-mt-20 last:mb-0 xl:scroll-mt-32"
              >
                <h2
                  id={`${catId}-heading`}
                  className="mb-4 flex items-center gap-3 break-words text-xl font-extrabold text-navy sm:text-2xl"
                >
                  <span
                    aria-hidden
                    className="h-6 w-1.5 shrink-0 rounded-full bg-teal-600"
                  />
                  {c}
                </h2>

                <div className="space-y-3.5">
                  {qs.map((f, i) => (
                    <details
                      key={f.q}
                      open={i === 0 && entries[0][0] === c}
                      className="group overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:border-teal-300 open:border-teal-600 open:shadow-md"
                    >
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 p-4 text-left text-sm font-bold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-600 sm:p-5 sm:text-base [&::-webkit-details-marker]:hidden">
                        <span className="min-w-0 break-words">{f.q}</span>
                        <ChevronDown
                          size={18}
                          aria-hidden
                          className="shrink-0 text-teal-700 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                        />
                      </summary>
                      <p className="break-words border-t border-line/60 px-4 pb-5 pt-3 text-sm leading-relaxed text-muted sm:px-5">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* Contact CTA, same style as the home page */}
      <section className="relative overflow-hidden bg-white py-14 text-center sm:py-20">
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px] motion-reduce:animate-none"
        />
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px] motion-reduce:animate-none"
          style={{ animationDelay: "-6s" }}
        />

        <div className="container-x relative z-10 mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-3xl border border-teal-200 bg-teal-50/60 p-5 shadow-xl shadow-teal-900/5 sm:p-12">
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-xs font-bold text-teal-800 shadow-sm sm:text-sm">
                <MessageSquare size={16} className="text-teal-600" aria-hidden />
                <span>Still need help?</span>
              </div>

              <h2 className="break-words text-2xl font-black leading-[1.15] tracking-tight text-navy sm:text-3xl lg:text-4xl">
                Can&apos;t find your answer? Talk to our team.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                Ask us about products, international trade, selling
                opportunities or printing. We are ready to hear from you.
              </p>

              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-teal-700 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-800 active:translate-y-0 motion-reduce:transform-none sm:px-8"
                >
                  Contact Our Team
                  <ArrowRight
                    size={18}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/businesses"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-line bg-white px-6 py-4 text-sm font-extrabold text-navy shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-600 active:translate-y-0 motion-reduce:transform-none sm:px-8"
                >
                  Explore Businesses
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: all.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}