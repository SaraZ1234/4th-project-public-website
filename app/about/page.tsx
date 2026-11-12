"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Globe2,
  Printer,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import { pages } from "@/lib/content";
import { Reveal } from "@/components/Motion";

/* Shared classes */
const ring =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600";
const ringLight =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const lift =
  "transition duration-300 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none";
// Buttons are full width on phones and shrink to fit from 640px up
const btn =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-bold sm:w-auto";
const btnPrimary = `${btn} ${lift} bg-teal-700 text-white shadow-lg shadow-teal-700/20 hover:bg-teal-800 ${ring}`;
const btnOutline = `${btn} ${lift} border border-line bg-white text-navy shadow-sm hover:border-teal-500 hover:bg-surface ${ring}`;
const btnRow =
  "flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4";
const arrow =
  "shrink-0 transition group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none";

type Division = { title: string; icon: LucideIcon; tag: string; href: string; desc: string };

const divisions: Division[] = [
  {
    title: "Import & Export",
    icon: Globe2,
    tag: "Trade",
    href: "/import-export",
    desc: "Trade between Pakistan and other markets, working with suppliers, buyers and trade partners.",
  },
  {
    title: "Own E-Commerce Store",
    icon: ShoppingBag,
    tag: "Store",
    href: "/products",
    desc: "Products sold directly by Fast Group through our online store.",
  },
  {
    title: "Marketplace",
    icon: Store,
    tag: "Marketplace",
    href: "/marketplace",
    desc: "A platform where independent sellers offer their products to buyers, separate from our own store.",
  },
  {
    title: "Printing Services",
    icon: Printer,
    tag: "Printing",
    href: "/printing",
    desc: "Printing services for individuals and businesses, from enquiry and quotation through to delivery.",
  },
];

const objectives = [
  "Develop trade relationships across relevant markets",
  "Give independent sellers a reliable place to sell",
  "Offer printing services to individuals and businesses",
  "Add new business activities over time",
];

export default function AboutPage() {
  const aboutData = pages.find((p) => p.slug === "about");

  return (
    // overflow-x-clip (not hidden) stops the slide-in reveals from causing sideways scroll
    // without turning this wrapper into a scroll container
    <div className="min-h-screen overflow-x-clip bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-white py-16 sm:py-20 lg:py-32">
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl motion-reduce:animate-none sm:-right-40 sm:-top-40 sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]"
        />
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl motion-reduce:animate-none sm:-bottom-40 sm:-left-40 sm:h-[36rem] sm:w-[36rem] sm:blur-[140px]"
          style={{ animationDelay: "-6s" }}
        />

        <div className="container-x relative max-w-5xl text-center">
          <Reveal>
            <div className="mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50/70 px-4 py-2 text-xs font-semibold text-teal-900 shadow-sm sm:text-sm">
              <Sparkles size={16} aria-hidden className="shrink-0 text-teal-600" />
              <span>Comprehensive Corporate Profile</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-balance break-words text-4xl font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-7xl">
              About <span className="text-teal-700">Fast Group</span>
            </h1>
          </Reveal>

          {aboutData?.intro && (
            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
                {aboutData.intro}
              </p>
            </Reveal>
          )}

          <Reveal delay={300}>
            <div className={`mt-10 ${btnRow}`}>
              <Link href="/contact" className={btnPrimary}>
                Contact Us
                <ArrowRight size={18} aria-hidden className={arrow} />
              </Link>
              <Link href="/businesses" className={btnOutline}>
                Explore Our Businesses
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal direction="left">
              <div className="space-y-5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 rounded-lg border border-teal-200/60 bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-800">
                  <Building2 size={15} aria-hidden />
                  <span>Enterprise Foundation</span>
                </div>
                <h2 className="text-balance text-3xl font-extrabold text-navy sm:text-4xl">Who we are</h2>
                <p className="text-base leading-relaxed text-muted">
                  Fast Group is a Pakistan-based business group working in international trade, e-commerce, a multi-vendor marketplace and printing services. We bring these activities together under one organization so that customers, sellers and business partners can deal with us in one place.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  Our four businesses are import and export, our own online store, a multi-vendor marketplace and printing services. Each has its own page, and they are managed together as one organization.
                </p>
              </div>
            </Reveal>

            <div className="space-y-5 sm:space-y-6">
              <Reveal direction="right" delay={100}>
                <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none sm:rounded-3xl sm:p-8 lg:p-10">
                  <div
                    aria-hidden
                    className="animate-blob pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-500/5 motion-reduce:animate-none"
                  />
                  <h3 className="relative text-xl font-bold text-navy sm:text-2xl">Vision and objectives</h3>
                  <p className="relative mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    Our vision is to bring trade, retail, marketplace and printing together in one connected organization that serves customers, sellers and partners clearly and reliably.
                  </p>
                  <ul className="relative mt-6 space-y-3">
                    {objectives.map((item, i) => (
                      <li key={item}>
                        <Reveal delay={250 + i * 90}>
                          <div className="flex items-start gap-2.5 text-sm font-semibold text-navy">
                            <CheckCircle2 size={18} aria-hidden className="mt-0.5 shrink-0 text-teal-600" />
                            <span>{item}</span>
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal direction="right" delay={250}>
                <div className="rounded-2xl border border-line bg-navy p-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl motion-reduce:transform-none motion-reduce:transition-none sm:rounded-3xl sm:p-8">
                  <h3 className="text-lg font-bold text-white sm:text-xl">The Business Concept</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/85">
                    Several businesses, one ecosystem: trade, own store, marketplace and printing. We connect national and international trade with online selling and printing services, so buyers, sellers, suppliers and trade partners can work through one connected organization.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section className="section border-b border-line bg-white">
        <div className="container-x max-w-6xl">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Operational Pillars</span>
            <h2 className="mt-2 text-balance text-3xl font-extrabold text-navy sm:text-4xl">
              How our businesses connect
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Four businesses, managed together as one organization.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {divisions.map((div, i) => {
              const Icon = div.icon;
              return (
                <Reveal key={div.title} delay={(i % 2) * 90} className="h-full">
                  <article className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none sm:rounded-3xl sm:p-8">
                    <div>
                      <div className="mb-6 flex items-center justify-between gap-3">
                        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-3.5 text-teal-700 transition-colors group-hover:bg-navy group-hover:text-white sm:p-4">
                          <Icon
                            aria-hidden
                            className="size-6 transition duration-500 group-hover:rotate-6 group-hover:scale-110 motion-reduce:transform-none sm:size-7"
                          />
                        </div>
                        <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted">
                          {div.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-navy sm:text-2xl">{div.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{div.desc}</p>
                    </div>

                    <div className="mt-6 border-t border-line pt-2 sm:mt-8">
                      <Link
                        href={div.href}
                        className={`inline-flex min-h-11 items-center gap-1 rounded-md text-sm font-bold text-navy transition-all hover:gap-2 hover:text-teal-700 ${ring}`}
                      >
                        Learn more
                        <span className="sr-only"> about {div.title}</span>
                        <ArrowUpRight
                          size={15}
                          aria-hidden
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                        />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COUNTRIES / MARKETS */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-navy p-6 text-white shadow-xl sm:rounded-3xl sm:p-10 lg:p-14">
              <div
                aria-hidden
                className="animate-blob pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10 motion-reduce:animate-none"
              />
              <div
                aria-hidden
                className="animate-blob pointer-events-none absolute -bottom-24 right-10 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl motion-reduce:animate-none sm:right-24"
                style={{ animationDelay: "-4s" }}
              />
              <div className="relative max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Markets</span>
                <h2 className="mt-2 text-balance text-2xl font-extrabold text-white sm:text-3xl">
                  Countries and markets
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                  See the markets we work in and what we do in each of them.
                </p>
              </div>
              <div className="relative mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/countries"
                  className={`${btn} ${lift} bg-teal-600 text-white shadow-lg hover:bg-teal-500 ${ringLight}`}
                >
                  View Countries / Markets
                  <ArrowRight size={16} aria-hidden className={arrow} />
                </Link>
                <Link
                  href="/businesses"
                  className={`${btn} ${lift} border border-white/20 bg-white/10 text-white hover:bg-white/20 ${ringLight}`}
                >
                  View All Businesses
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPROACH + FINAL CTA */}
      <section className="section bg-white text-center">
        <div className="container-x max-w-4xl">
          <Reveal>
            <h2 className="text-balance text-3xl font-extrabold text-navy sm:text-4xl">
              Our approach to customers and partners
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
              We aim to deal with every customer, seller and trade partner clearly and fairly. Whether you want to buy, sell, trade or order printing, our team supports your enquiry across all our businesses.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className={`mt-10 ${btnRow}`}>
              <Link href="/businesses" className={btnPrimary}>
                Explore Our Businesses
                <ArrowRight size={18} aria-hidden className={arrow} />
              </Link>
              <Link href="/contact" className={btnOutline}>
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
