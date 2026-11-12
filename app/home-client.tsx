"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/content";

import {
  Boxes,
  Handshake,
  Store,
  ShoppingBag,
  Globe2,
  Layers,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Search,
  Package,
  Truck,
  Printer,
  Building2,
} from "lucide-react";

import { Button, OwnershipBadge, Section, TextLink } from "@/components/ui";

import {
  APP_URL,
  announcements,
  testimonials,
  businesses,
  countries,
  faqs,
  products,
  sellerSteps,
  whyUs,
} from "@/lib/content";

const whyIcons = [Boxes, Handshake, Store, ShoppingBag, Globe2, Layers];
const businessIcons = [Building2, Globe2, ShoppingBag, Printer];
const sellerIcons = [Search, CheckCircle2, Package, Store, Truck];

export default function HomeClient() {
  const [activeProduct, setActiveProduct] = useState<(typeof products)[number] | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const previousTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="overflow-hidden bg-white text-navy selection:bg-teal/20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-teal/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[30rem] w-[30rem] rounded-full bg-navy/5 blur-[120px]" />

        <div className="container-x relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 animate-[fadeIn_.8s_ease-out]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-navy shadow-sm">
                <Sparkles size={16} className="text-teal animate-pulse" />
                <span>One organization. Multiple business opportunities.</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-navy leading-[1.1]">
                Import, export, retail, marketplace and printing in one organization
              </h1>

              <p className="mt-6 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed">
                {site.tagline} Choose a business to explore, or go straight to the shop.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/businesses" className="shadow-lg shadow-teal/10 hover:shadow-teal/20 transition-all">
                  Explore Our Businesses
                </Button>
                <Button href={`${APP_URL}/shop`} variant="secondary">
                  Shop Now
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-2.5">
                {[
                  ["Import & Export", "/import-export"],
                  ["Shop", "/products"],
                  ["Marketplace", "/marketplace"],
                  ["Printing", "/printing"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-teal hover:bg-white hover:shadow-sm"
                  >
                    {label}
                    <ArrowUpRight size={14} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
                  </Link>
                ))}
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="lg:col-span-5 relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-teal/20 to-navy/10 blur-xl opacity-70" />

              <div className="relative overflow-hidden rounded-3xl bg-navy p-6 sm:p-8 text-white shadow-2xl border border-white/10">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-teal/20 blur-3xl pointer-events-none" />

                <div className="relative flex flex-col justify-between gap-8 h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">OUR ECOSYSTEM</span>
                    <div className="rounded-full bg-white/10 p-2.5 backdrop-blur-md">
                      <Globe2 size={20} className="text-teal" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    {[
                      { icon: Globe2, label: "Global Trade" },
                      { icon: Store, label: "Marketplace" },
                      { icon: ShoppingBag, label: "Retail" },
                      { icon: Printer, label: "Printing" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12] hover:border-teal/50"
                      >
                        <item.icon size={22} className="mb-6 text-teal transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-sm font-semibold tracking-wide">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-xs text-white/60">Connected business ecosystem</p>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-teal group-hover:underline">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-line bg-white/90 p-4 shadow-xl backdrop-blur-md animate-bounce-subtle">
                <div className="rounded-xl bg-surface p-3 text-teal">
                  <Handshake size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">One organization</p>
                  <p className="text-xs text-muted font-medium">Multiple opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS ECOSYSTEM */}
      <Section
        title="One ecosystem, four businesses"
        intro="Products, national and international trade, e-commerce, marketplace participation, printing and future activities, all under one organization."
      >
        <div className="relative rounded-2xl border border-line bg-surface p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="rounded-xl bg-navy px-6 py-4 text-sm font-bold text-white shadow-md">
              {site.name}
            </div>
            <ArrowRight className="hidden text-teal lg:block" size={20} />
            {businesses.map((b, i) => {
              const Icon = businessIcons[i % businessIcons.length];
              return (
                <Link
                  key={b.slug}
                  href={b.href}
                  style={{ borderColor: b.color }}
                  className="group flex items-center gap-3 rounded-xl border-2 bg-white px-5 py-3.5 text-sm font-semibold text-navy transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <Icon size={18} className="text-teal" />
                  <span>{b.name}</span>
                  <ArrowUpRight size={14} className="opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* BUSINESS CATEGORIES */}
      <Section
        alt
        title="Four businesses, one organization"
        intro="Each business runs on its own, and all of them share one account, one brand and one place to start."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((b, i) => {
            const Icon = businessIcons[i % businessIcons.length];
            return (
              <Link
                key={b.slug}
                href={b.href}
                style={{ borderTopColor: b.color }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line border-t-4 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-teal/5 transition-transform duration-500 group-hover:scale-150 pointer-events-none" />
                <div className="relative">
                  <div className="mb-5 inline-flex rounded-xl bg-surface p-3.5 text-teal transition-all duration-300 group-hover:bg-navy group-hover:text-white shadow-sm">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-navy">{b.name}</h3>
                  <p className="mt-2.5 text-sm text-muted leading-relaxed line-clamp-3">{b.text}</p>
                </div>
                <div className="relative mt-6 flex items-center justify-between border-t border-line/60 pt-4 text-sm font-semibold text-teal">
                  <span>Explore business</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* FEATURED PRODUCTS */}
      <Section title="Featured products" intro="A selection chosen by our team. Each item shows who sells it.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div>
                <button
                  onClick={() => setActiveProduct(p)}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-surface text-left"
                  aria-label={`Quick view ${p.name}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-muted/60 transition-transform duration-500 group-hover:scale-105">
                    <Package size={52} strokeWidth={1} />
                  </div>
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy/90 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                    Quick View
                  </span>
                </button>

                <div className="p-5 space-y-2.5">
                  <OwnershipBadge owner={p.owner} />
                  <h3 className="text-base font-bold text-navy line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">{p.desc}</p>
                  <p className="text-[11px] font-medium text-muted/80 pt-1">
                    {p.category} · <span className="text-teal font-semibold">{p.available}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line px-5 py-3.5 bg-surface/35">
                <button 
                  onClick={() => setActiveProduct(p)} 
                  className="text-xs font-semibold text-teal transition hover:text-navy"
                >
                  Quick view
                </button>
                <Link
                  href={`${APP_URL}/shop/${p.slug}`}
                  className="rounded-full bg-surface p-2 text-navy transition hover:bg-navy hover:text-white"
                  aria-label={`View ${p.name}`}
                >
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={`${APP_URL}/shop`}>View all products</Button>
        </div>
      </Section>

      {/* PRODUCT QUICK VIEW MODAL */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-4 backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
          onClick={() => setActiveProduct(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProduct.name} quick view`}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute right-4 top-4 rounded-full bg-surface p-2 text-navy transition hover:bg-navy hover:text-white"
              aria-label="Close product details"
            >
              <X size={18} />
            </button>

            <div className="mb-6 flex aspect-video items-center justify-center rounded-xl bg-surface text-teal">
              <Package size={48} strokeWidth={1} />
            </div>

            <OwnershipBadge owner={activeProduct.owner} />
            <h2 className="mt-3 text-xl font-bold text-navy">{activeProduct.name}</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">{activeProduct.desc}</p>

            <div className="mt-4 rounded-xl bg-surface p-4 text-xs text-muted space-y-1.5 border border-line">
              <p><span className="font-semibold text-navy">Category:</span> {activeProduct.category}</p>
              <p><span className="font-semibold text-navy">Availability:</span> {activeProduct.available}</p>
            </div>

            <div className="mt-6">
              <Button href={`${APP_URL}/shop/${activeProduct.slug}`} className="w-full justify-center">
                View Product Details
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* COUNTRIES */}
      <Section alt title="Countries and markets" intro="Pakistan is shown separately from our international markets.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => {
            const isActive = activeCountry === c.slug;
            return (
              <article
                key={c.slug}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-semibold text-teal tracking-wide">
                      {c.group === "home" ? "Home market" : "International"}
                    </span>
                    <Globe2 size={20} className="text-teal transition-transform duration-500 group-hover:rotate-180" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-navy">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{c.text}</p>
                </div>

                <div>
                  <button
                    onClick={() => setActiveCountry(isActive ? null : c.slug)}
                    aria-expanded={isActive}
                    className="mt-6 flex w-full items-center justify-between border-t border-line pt-4 text-xs font-semibold text-teal transition hover:text-navy"
                  >
                    <span>{isActive ? "Show less" : "Explore market"}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
                  </button>

                  {isActive && (
                    <div className="mt-3 animate-[fadeIn_.2s_ease-out] rounded-xl bg-surface p-3.5 border border-line">
                      <p className="mb-2 text-xs text-muted">Explore business opportunities and activities in {c.name}.</p>
                      <TextLink href={`/countries/${c.slug}`}>View market details</TextLink>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/countries" variant="secondary">View all countries</Button>
        </div>
      </Section>

      {/* SELLER JOURNEY */}
      <section className="section bg-navy text-[#E2E8F0] py-20 lg:py-28">
        <div className="container-x mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal">Marketplace opportunities</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold !text-white tracking-tight">Start selling with us</h2>
            <p className="mt-3 text-sm sm:text-base text-white/70">Join our marketplace and take your products to a wider audience.</p>
          </div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {sellerSteps.map((s, i) => {
              const Icon = sellerIcons[i % sellerIcons.length];
              return (
                <li
                  key={s}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/50 hover:bg-white/[0.06]"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="rounded-xl bg-white/10 p-3 text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-white shadow-sm">
                        <Icon size={20} />
                      </div>
                      <span className="text-2xl font-black text-white/20">0{i + 1}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">Step {i + 1}</h3>
                    <p className="mt-2 text-xs text-white/70 leading-relaxed">{s}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={`${APP_URL}/seller/register`}>Become a Seller</Button>
            <Button href="/marketplace" variant="onDark">Explore Marketplace</Button>
          </div>
        </div>
      </section>

      {/* PRINTING SERVICES */}
      <Section alt title="Printing services" intro="Professional printing solutions for your business requirements.">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 sm:p-12 text-white shadow-xl">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10 pointer-events-none" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex rounded-2xl bg-white/10 p-3.5 text-teal backdrop-blur-md">
                <Printer size={26} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold !text-white">Bring your printing ideas to life</h2>
              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
                Tell us what you need, share your requirements, and receive a quotation from our team.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href={`${APP_URL}/printing/enquiry`} className="shadow-lg">
                Submit Printing Enquiry
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button href="/printing" variant="onDark">Explore Printing Services</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* WHY CHOOSE US */}
      <Section title="Why work with us">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <li
                key={w}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 font-medium text-navy transition-all duration-300 hover:-translate-y-1 hover:border-teal hover:shadow-md"
              >
                <div className="shrink-0 rounded-xl bg-surface p-3 text-teal transition-all duration-300 group-hover:bg-navy group-hover:text-white shadow-sm">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <div className="pt-1 text-sm leading-relaxed font-semibold">{w}</div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button href="/about" variant="secondary">Learn More</Button>
        </div>
      </Section>

      {/* ANNOUNCEMENTS */}
      <Section alt title="Latest announcements" intro="Stay informed about our latest business activities and updates.">
        <div className="grid gap-6 md:grid-cols-3">
          {announcements.slice(0, 3).map((a) => (
            <article
              key={a.slug}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal tracking-wide">{a.category}</span>
                  <ArrowUpRight size={16} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
                </div>
                <p className="mt-3 text-[11px] font-medium text-muted/80">{a.date}</p>
                <h3 className="mt-2 text-base font-bold text-navy">
                  <Link href={`/announcements/${a.slug}`} className="hover:text-teal transition-colors">{a.title}</Link>
                </h3>
                <p className="mt-2.5 text-xs text-muted leading-relaxed line-clamp-3">{a.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <TextLink href="/announcements">View all announcements</TextLink>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <Section title="What customers say">
          <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-white p-8 sm:p-10 shadow-sm">
            <blockquote className="text-lg sm:text-xl font-medium leading-relaxed text-navy">
              “{testimonials[activeTestimonial].quote}”
            </blockquote>

            <div className="mt-8 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-bold text-navy">{testimonials[activeTestimonial].name}</p>
                <p className="mt-0.5 text-xs text-muted font-medium">{testimonials[activeTestimonial].meta}</p>
              </div>

              {testimonials.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={previousTestimonial}
                    className="rounded-full border border-line p-2.5 text-navy transition hover:bg-navy hover:text-white"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="rounded-full border border-line p-2.5 text-navy transition hover:bg-navy hover:text-white"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section
        alt={testimonials.length === 0}
        title="Common questions"
        intro="Find answers to frequently asked questions about our organization and services."
      >
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.slice(0, 8).map((f, i) => {
            const isOpen = activeFaq === i;
            return (
              <article
                key={f.q}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen ? "border-teal shadow-md" : "border-line"
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-navy"
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-teal transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && <div className="animate-[fadeIn_.2s_ease-out] px-5 pb-5 text-xs sm:text-sm text-muted leading-relaxed">{f.a}</div>}
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <TextLink href="/faq">View all FAQs</TextLink>
        </div>
      </Section>

      {/* CONTACT CTA */}
      <section className="section bg-navy text-center py-20 lg:py-28">
        <div className="container-x mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 p-3.5 text-teal backdrop-blur-md">
              <Handshake size={26} />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold !text-white tracking-tight">Let&apos;s build something together</h2>

            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#E2E8F0] leading-relaxed">
              Have a question about products, international trade, selling opportunities or printing? Our team is ready to hear from you.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact">Contact Our Team</Button>
              <Button href="/businesses" variant="onDark">Explore Businesses</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}