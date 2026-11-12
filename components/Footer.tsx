"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { businesses, site } from "@/lib/content";

const companyLinks = [
  ["About Us", "/about"],
  ["Countries / Markets", "/countries"],
  ["Announcements", "/announcements"],
  ["FAQ", "/faq"],
  ["Contact Us", "/contact"],
  ["Become a Seller", "/become-a-seller"],
] as const;

/* Fires once when the footer scrolls into view. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

export default function Footer() {
  const { ref, inView } = useInView<HTMLElement>();

  /* Staggered entrance: one orchestrated reveal, disabled for reduced motion. */
  const reveal = (i: number) => ({
    className: `transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`,
    style: { transitionDelay: inView ? `${i * 110}ms` : "0ms" },
  });

  const h = "mb-4 font-heading font-semibold text-white";

  /* Link with a sliding underline + gentle nudge on hover. */
  const l =
    "group relative inline-flex items-center py-1 transition-all duration-300 hover:translate-x-1 hover:text-white focus-visible:text-white focus-visible:outline-none motion-reduce:transform-none " +
    "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none";

  const contact =
    "inline-block break-words transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none";

  return (
    <footer ref={ref} className="relative bg-navy text-[#E2E8F0]">
      {/* Soft top highlight line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      <div className="container-x grid grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:py-14 lg:grid-cols-4 lg:gap-12 lg:py-16">
        {/* Brand */}
        <div {...reveal(0)} className={`${reveal(0).className} max-w-sm`}>
          <p className="font-heading text-xl font-bold text-white sm:text-2xl">
            {site.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed">{site.tagline}</p>
        </div>

        {/* Businesses */}
        <nav aria-label="Our Businesses" {...reveal(1)}>
          <p className={h}>Our Businesses</p>
          <ul className="space-y-1">
            {businesses.map((b) => (
              <li key={b.slug}>
                <Link href={b.href} className={l}>
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Company" {...reveal(2)}>
          <p className={h}>Company</p>
          <ul className="space-y-1">
            {companyLinks.map(([t, u]) => (
              <li key={u}>
                <Link href={u} className={l}>
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Support */}
        <div {...reveal(3)} className="text-sm">
          <p className={h}>Support and contact</p>
          <address className="space-y-2 not-italic leading-relaxed">
            <p>
              <a href={`mailto:${site.email}`} className={contact}>
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${String(site.phone).replace(/[^\d+]/g, "")}`}
                className={contact}
              >
                {site.phone}
              </a>
            </p>
            <p>{site.address}</p>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div
          className={`container-x flex flex-col items-center justify-between gap-4 px-4 py-5 text-center text-sm transition-all delay-500 duration-700 ease-out motion-reduce:opacity-100 motion-reduce:transition-none sm:flex-row sm:text-left ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy-policy"
              className="relative transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="relative transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}