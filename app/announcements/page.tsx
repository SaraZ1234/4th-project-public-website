import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Megaphone } from "lucide-react";
import { announcements, announcementCategories } from "@/lib/content";
import { Banner } from "@/components/Page";

export const metadata = {
  title: "Announcements",
  description: "News, product introductions and updates.",
};

const PER = 6;

export default async function List({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;

  const all = announcements.filter((a) => !category || a.category === category);
  const totalPages = Math.max(1, Math.ceil(all.length / PER));
  const pg = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const items = all.slice((pg - 1) * PER, pg * PER);

  const href = (p: number, cat?: string) => {
    const qs = new URLSearchParams();
    if (cat) qs.set("category", cat);
    if (p > 1) qs.set("page", String(p));
    const s = qs.toString();
    return s ? `/announcements?${s}` : "/announcements";
  };

  const chip = (on: boolean) =>
    `inline-flex min-h-11 items-center rounded-full border px-4 text-xs font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 motion-reduce:transform-none sm:px-5 sm:text-sm ${
      on
        ? "border-navy bg-navy text-white"
        : "border-line bg-white text-navy hover:border-teal-600 hover:text-teal-700"
    }`;

  const pageBtn =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 text-sm font-bold text-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-600 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 motion-reduce:transform-none";

  return (
    <>
      <Banner title="Announcements" trail={[{ label: "Announcements" }]} />

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

        <div className="container-x relative">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Corporate News
            </span>
            <h2 className="mt-2 break-words text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">
              News, products and updates
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Stay informed about our latest business activities and
              operational updates.
            </p>
          </div>

          <nav
            aria-label="Categories"
            className="mb-10 flex flex-wrap items-center justify-center gap-2.5"
          >
            <Link
              href="/announcements"
              aria-current={!category ? "page" : undefined}
              className={chip(!category)}
            >
              All
            </Link>
            {announcementCategories.map((c) => (
              <Link
                key={c}
                href={href(1, c)}
                aria-current={category === c ? "page" : undefined}
                className={chip(category === c)}
              >
                {c}
              </Link>
            ))}
          </nav>

          {items.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Megaphone size={22} aria-hidden />
              </span>
              <p className="text-sm font-semibold text-navy">
                No announcements in this category yet.
              </p>
              <Link
                href="/announcements"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline"
              >
                View all announcements
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {items.map((a) => (
                <article
                  key={a.slug}
                  className="group relative flex h-full min-w-0 flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transform-none sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                        {a.category}
                      </span>
                      <ArrowUpRight
                        size={16}
                        aria-hidden
                        className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700"
                      />
                    </div>
                    <time
                      dateTime={a.date}
                      className="mt-3 block text-[11px] font-semibold text-muted"
                    >
                      {a.date}
                    </time>
                    <h2 className="mt-2 break-words text-lg font-bold text-navy transition-colors group-hover:text-teal-700">
                      <Link
                        href={`/announcements/${a.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-teal-600"
                      >
                        {a.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                      {a.excerpt}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-teal-700 transition-all group-hover:gap-2">
                    Read full story <ArrowUpRight size={14} aria-hidden />
                  </span>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              {pg > 1 ? (
                <Link href={href(pg - 1, category)} className={pageBtn}>
                  <ArrowLeft size={16} aria-hidden /> Previous
                </Link>
              ) : null}
              <span className="px-2 text-xs font-semibold text-muted">
                Page {pg} of {totalPages}
              </span>
              {pg < totalPages ? (
                <Link href={href(pg + 1, category)} className={pageBtn}>
                  Next <ArrowRight size={16} aria-hidden />
                </Link>
              ) : null}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}