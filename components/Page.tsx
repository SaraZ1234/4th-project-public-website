import Script from "next/script";
import Link from "next/link";

export function Banner({
  title,
  intro,
  trail = [],
}: {
  title: string;
  intro?: string;
  trail?: { label: string }[];
}) {
  return (
    <section className="bg-surface py-16">
      <div className="container-x">
        <nav className="mb-4 text-sm text-muted">
          <Link href="/">Home</Link>
          {trail.map((item, index) => (
            <span key={index}> / {item.label}</span>
          ))}
        </nav>
        <h1>{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-navy py-16 text-white">
      <div className="container-x">
        <h2>{title}</h2>
        <div className="mt-6 flex flex-wrap gap-4">{children}</div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <Script
      id="page-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}