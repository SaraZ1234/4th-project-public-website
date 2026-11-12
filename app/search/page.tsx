import { nav, products, countries, announcements, pages } from "@/lib/content";
import { Banner } from "@/components/Page";
import { Search } from "@/components/Extras";
export const metadata = { title: "Search", robots: { index: false } };
export default function SearchPage() {
  const items = [
    ...nav.map((n) => ({ name: n.label, href: n.href, text: "Page" })),
    ...pages.map((p) => ({ name: p.title, href: `/${p.slug}`, text: p.desc })),
    ...countries.map((c) => ({ name: c.name, href: `/countries/${c.slug}`, text: c.text })),
    ...announcements.map((a) => ({ name: a.title, href: `/announcements/${a.slug}`, text: a.excerpt })),
    ...products.map((p) => ({ name: p.name, href: `/products`, text: `${p.category}. ${p.desc}` })),
  ].filter((v, i, a) => a.findIndex((x) => x.href === v.href && x.name === v.name) === i);
  return (<><Banner title="Search the website" trail={[{ label: "Search" }]} /><div className="section"><div className="container-x"><Search label="Search pages, products, countries and announcements" items={items} /></div></div></>);
}
