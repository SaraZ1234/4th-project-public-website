import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { pages, products, APP_URL } from "@/lib/content";
import { Banner, CtaBand, JsonLd } from "@/components/Page";
import { Button, OwnershipBadge } from "@/components/ui";

export const dynamicParams = false;

export async function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const p = pages.find((x) => x.slug === resolvedParams.slug);

  return p
    ? {
        title: p.title,
        description: p.desc,
        alternates: {
          canonical: `/${p.slug}`,
        },
      }
    : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const p = pages.find((x) => x.slug === resolvedParams.slug);

  if (!p) notFound();

  const legal = p.slug === "privacy-policy" || p.slug === "terms";

  return (
    <>
      <Banner title={p.title} intro={p.intro} trail={[{ label: p.title }]} />
      {p.blocks.map((b, i) => (
        <section key={b.h} className={`section ${i % 2 ? "bg-surface" : ""}`}>
          <div id={b.h.toLowerCase().replace(/\W+/g, "-")} className={`container-x ${legal ? "max-w-3xl" : ""}`}>
            <h2>{b.h}</h2>
            {b.text && <p className="mt-4 max-w-2xl text-lg text-muted">{b.text}</p>}
            {b.items &&
              (b.steps ? (
                <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {b.items.map((s, n) => (
                    <li key={s} className="rounded-xl border border-line bg-white p-4">
                      <span className="font-semibold text-navy">Step {n + 1}</span>
                      <p className="text-sm text-muted">{s}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {b.items.map((s) => (
                    <li key={s} className="rounded-xl border border-line bg-white p-5 font-medium text-navy">
                      {s.startsWith("/") ? (
                        <Link href={s} className="text-teal hover:underline">
                          View page
                        </Link>
                      ) : (
                        s
                      )}
                    </li>
                  ))}
                </ul>
              ))}
          </div>
        </section>
      ))}
      {(p.slug === "products" || p.slug === "marketplace") && (
        <section className="section">
          <div className="container-x">
            <h2>Featured products</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products
                .filter((x) => p.slug === "products" || x.owner === "seller")
                .map((x) => (
                  <article key={x.slug} className="space-y-2 rounded-xl border border-line p-4">
                    <div className="aspect-square bg-surface" />
                    <OwnershipBadge owner={x.owner} />
                    <h3 className="text-lg">{x.name}</h3>
                    <Link href={`${APP_URL}/shop/${x.slug}`} className="font-semibold text-teal hover:underline">
                      View details
                    </Link>
                  </article>
                ))}
            </div>
          </div>
        </section>
      )}
      {p.json && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: products.map((x, i) => ({
              "@type": "Product",
              position: i + 1,
              name: x.name,
            })),
          }}
        />
      )}
      {p.cta && (
        <CtaBand title={p.title}>
          <Button href={p.cta.href}>{p.cta.label}</Button>
          {p.cta2 && (
            <Button href={p.cta2.href} variant="onDark">
              {p.cta2.label}
            </Button>
          )}
        </CtaBand>
      )}
    </>
  );
}