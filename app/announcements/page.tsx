import Link from "next/link";
import { announcements, announcementCategories } from "@/lib/content";
import { Banner } from "@/components/Page";
export const metadata = { title: "Announcements", description: "News, product introductions and updates." };
const PER = 6;
export default async function List({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
  const { category, page } = await searchParams; const pg = Math.max(1, Number(page) || 1);
  const all = announcements.filter((a) => !category || a.category === category); const items = all.slice((pg - 1) * PER, pg * PER);
  const chip = (on: boolean) => `inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold ${on ? "border-navy bg-navy text-white" : "border-line text-navy hover:bg-surface"}`;
  return (<><Banner title="Announcements" trail={[{ label: "Announcements" }]} />
    <div className="section"><div className="container-x">
      <nav aria-label="Categories" className="mb-8 flex flex-wrap gap-2"><Link href="/announcements" className={chip(!category)}>All</Link>{announcementCategories.map((c) => <Link key={c} href={`/announcements?category=${encodeURIComponent(c)}`} className={chip(category === c)}>{c}</Link>)}</nav>
      {items.length === 0 ? <p className="text-muted">No announcements in this category yet.</p> :
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((a) => <article key={a.slug} className="rounded-xl border border-line p-6"><p className="text-sm font-semibold text-teal">{a.category} · <time dateTime={a.date}>{a.date}</time></p><h2 className="mt-2 text-xl"><Link href={`/announcements/${a.slug}`}>{a.title}</Link></h2><p className="mt-2 text-muted">{a.excerpt}</p></article>)}</div>}
      <div className="mt-8 flex gap-4">{pg > 1 && <Link className="font-semibold text-teal" href={`/announcements?page=${pg - 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}>Previous</Link>}{all.length > pg * PER && <Link className="font-semibold text-teal" href={`/announcements?page=${pg + 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}>Next</Link>}</div>
    </div></div></>);
}
