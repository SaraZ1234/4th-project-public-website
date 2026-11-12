import { faqCategories } from "@/lib/content";
import { Banner, JsonLd } from "@/components/Page";
export const metadata = { title: "FAQ", description: "Answers to common questions about the organization, selling, trade and printing." };
export default function FAQ() {
  const all = Object.values(faqCategories).flat();
  return (
    <>
      <Banner title="Frequently asked questions" trail={[{ label: "FAQ" }]} />
      <div className="section"><div className="container-x max-w-3xl">
        <nav aria-label="FAQ categories" className="mb-8 flex flex-wrap gap-2">{Object.keys(faqCategories).map((c) => <a key={c} href={`#${c.replace(/\W+/g, "-")}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold text-navy hover:bg-surface">{c}</a>)}</nav>
        {Object.entries(faqCategories).map(([c, qs]) => (
          <section key={c} id={c.replace(/\W+/g, "-")} className="mb-10"><h2 className="text-2xl">{c}</h2><div className="mt-4 space-y-3">{qs.map((f) => <details key={f.q} className="rounded-xl border border-line p-5"><summary className="cursor-pointer font-semibold text-navy">{f.q}</summary><p className="mt-3 text-muted">{f.a}</p></details>)}</div></section>))}
      </div></div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: all.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    </>
  );
}
