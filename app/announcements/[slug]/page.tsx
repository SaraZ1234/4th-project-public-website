import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MessageSquare,
  Tag,
} from "lucide-react";
import { announcements } from "@/lib/content";
import { Banner } from "@/components/Page";

export const dynamicParams = false;

export function generateStaticParams() {
  return announcements.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = announcements.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function Item({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = announcements.find((x) => x.slug === slug);

  if (!a) notFound();

  const related = announcements
    .filter((x) => x.slug !== a.slug && x.category === a.category)
    .slice(0, 3);

  const paragraphs = String(a.body).split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <Banner
        title={a.title}
        intro={`${a.category} · ${a.date}`}
        trail={[{ label: "Announcements" }, { label: a.title }]}
      />

      {/* ARTICLE */}
      <section className="section relative overflow-hidden border-b border-line bg-white">
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-teal-500/10 blur-[110px] motion-reduce:animate-none"
        />
        <div className="container-x relative max-w-3xl">
          <Link
            href="/announcements"
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-xs font-bold text-teal-700 transition hover:gap-3 hover:text-teal-900 sm:text-sm"
          >
            <ArrowLeft size={16} aria-hidden /> All announcements
          </Link>

          <article className="rounded-3xl border border-line bg-surface p-5 shadow-sm sm:p-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">
                <Tag size={12} aria-hidden /> {a.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
                <CalendarDays size={14} aria-hidden />
                <time dateTime={a.date}>{a.date}</time>
              </span>
            </div>

            <div className="mt-6 space-y-5 break-words text-base leading-relaxed text-navy sm:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="section border-b border-line bg-surface">
          <div className="container-x max-w-5xl">
            <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
                Keep reading
              </span>
              <h2 className="mt-2 break-words text-2xl font-extrabold text-navy sm:text-3xl">
                Related announcements
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {related.map((r) => (
                <article
                  key={r.slug}
                  className="group relative flex h-full min-w-0 flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transform-none sm:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                        {r.category}
                      </span>
                      <ArrowUpRight
                        size={16}
                        aria-hidden
                        className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700"
                      />
                    </div>
                    <time
                      dateTime={r.date}
                      className="mt-3 block text-[11px] font-semibold text-muted"
                    >
                      {r.date}
                    </time>
                    <h3 className="mt-2 break-words text-base font-bold text-navy transition-colors group-hover:text-teal-700">
                      <Link
                        href={`/announcements/${r.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-teal-600"
                      >
                        {r.title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">
                      {r.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
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
          <div className="rounded-3xl border border-teal-200 bg-teal-50/60 p-5 shadow-xl shadow-teal-900/5 sm:p-12">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-xs font-bold text-teal-800 shadow-sm sm:text-sm">
              <MessageSquare size={16} className="text-teal-600" aria-hidden />
              <span>Questions?</span>
            </div>
            <h2 className="break-words text-2xl font-black leading-[1.15] tracking-tight text-navy sm:text-3xl lg:text-4xl">
              Want to know more? Talk to our team.
            </h2>
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
                href="/announcements"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-6 py-4 text-sm font-extrabold text-navy shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-600 active:translate-y-0 motion-reduce:transform-none sm:px-8"
              >
                All Announcements
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}