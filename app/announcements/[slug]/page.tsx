
import { notFound } from "next/navigation";
import Link from "next/link";
import { announcements } from "@/lib/content";
import { Banner } from "@/components/Page";

export const dynamicParams = false;

export function generateStaticParams() {
  return announcements.map((a) => ({ slug: a.slug }));
}

export default async function Item({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = announcements.find((x) => x.slug === slug);

  if (!a) notFound();

  const related = announcements.filter(
    (x) => x.slug !== a.slug && x.category === a.category
  );

  return (
    <>
      <Banner
        title={a.title}
        intro={`${a.category} · ${a.date}`}
        trail={[
          { label: "Announcements" },
          { label: a.title },
        ]}
      />

      <div className="section">
        <div className="container-x max-w-3xl">
          <p className="text-lg">{a.body}</p>

          {related.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl">Related</h2>
              <ul className="mt-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      className="text-teal underline"
                      href={`/announcements/${r.slug}`}
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
