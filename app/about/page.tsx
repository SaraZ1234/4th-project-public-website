"use client";

import React, { useState } from "react";
import Link from "next/link";
import { site, pages, businesses, countries } from "@/lib/content";
import { Reveal } from "@/components/Motion";
import { Store } from "lucide-react";
import {
  Building2,
  Globe2,
  ShoppingBag,
  Printer,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  Users,
  Target,
  Layers,
  MapPin,
  TrendingUp,
  Briefcase,
  Scale,
  Truck
} from "lucide-react";

export default function AboutPage() {
  const aboutData = pages.find((p) => p.slug === "about");
  const [activeDivision, setActiveDivision] = useState(0);

  const divisions = [
    {
      title: "Import & Export",
      icon: Globe2,
      tag: "Trade",
      href: "/import-export",
      desc: "Trade between Pakistan and other markets, working with suppliers, buyers and trade partners."
    },
    {
      title: "Own E-Commerce Store",
      icon: ShoppingBag,
      tag: "Store",
      href: "/products",
      desc: "Products sold directly by Fast Group through our online store."
    },
    {
      title: "Marketplace",
      icon: Store,
      tag: "Marketplace",
      href: "/marketplace",
      desc: "A platform where independent sellers offer their products to buyers, separate from our own store."
    },
    {
      title: "Printing Services",
      icon: Printer,
      tag: "Printing",
      href: "/printing",
      desc: "Printing services for individuals and businesses, from enquiry and quotation through to delivery."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface font-sans text-ink selection:bg-teal-500 selection:text-white">
      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32 border-b border-line">
        <div className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="animate-blob pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-amber-500/10 blur-[140px]" style={{ animationDelay: "-6s" }} />

        <div className="container-x relative max-w-5xl text-center">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50/70 px-4 py-2 text-xs sm:text-sm font-semibold text-teal-900 shadow-sm backdrop-blur-md">
              <Sparkles size={16} className="text-teal-600 animate-pulse" />
              <span>Comprehensive Corporate Profile</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-7xl leading-[1.12]">
              About <span className="text-teal-700">Fast Group</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 mx-auto max-w-3xl text-base sm:text-lg text-muted leading-relaxed">
              {aboutData?.intro}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-700 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-800"
              >
                Contact Us
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="/businesses"
                className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-white px-7 py-4 text-sm font-bold text-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500 hover:bg-surface"
              >
                Explore Our Businesses
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO WE ARE & DEEP DIVE */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal direction="left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-lg bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-800 border border-teal-200/60">
                  <Building2 size={15} />
                  <span>Enterprise Foundation</span>
                </div>
                <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Who we are</h2>
                <p className="text-base text-muted leading-relaxed">
                  Fast Group is a Pakistan-based business group working in international trade, e-commerce, a multi-vendor marketplace and printing services. We bring these activities together under one organization so that customers, sellers and business partners can deal with us in one place.
                </p>
                <p className="text-base text-muted leading-relaxed">
                  Our four businesses are import and export, our own online store, a multi-vendor marketplace and printing services. Each has its own page, and they are managed together as one organization.
                </p>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal direction="right" delay={100}>
                <div className="rounded-3xl border border-line bg-white p-8 sm:p-10 shadow-sm relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="animate-blob absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-500/5 pointer-events-none" />
                  <h3 className="text-2xl font-bold text-navy">Vision and objectives</h3>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    Our vision is to bring trade, retail, marketplace and printing together in one connected organization that serves customers, sellers and partners clearly and reliably.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Develop trade relationships across relevant markets",
                      "Give independent sellers a reliable place to sell",
                      "Offer printing services to individuals and businesses",
                      "Add new business activities over time"
                    ].map((item, i) => (
                      <Reveal key={item} delay={250 + i * 90}>
                        <div className="flex items-center gap-2.5 text-xs font-bold text-navy">
                          <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={250}>
                <div className="rounded-3xl border border-line bg-navy p-8 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <h3 className="text-xl font-bold text-white">The Business Concept</h3>
                  <p className="mt-2 text-xs text-white/80 leading-relaxed">
                    Several businesses, one ecosystem: trade, own store, marketplace and printing. We connect national and international trade with online selling and printing services, so buyers, sellers, suppliers and trade partners can work through one connected organization.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED DIVISION BREAKDOWN */}
      <section className="section bg-white border-b border-line">
        <div className="container-x max-w-6xl">
          <Reveal className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Operational Pillars</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">How our businesses connect</h2>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Four businesses, managed together as one organization.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {divisions.map((div, i) => {
              const Icon = div.icon;
              return (
                <Reveal key={div.title} delay={(i % 2) * 90} className="h-full">
                  <div
                    className="h-full rounded-3xl border border-line bg-surface p-8 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:bg-white group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="rounded-2xl bg-teal-50 p-4 text-teal-700 border border-teal-100 group-hover:bg-navy group-hover:text-white transition-colors">
                          <Icon size={28} className="transition duration-500 group-hover:rotate-6 group-hover:scale-110" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted bg-white px-3 py-1 rounded-full border border-line">
                          {div.tag}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-navy">{div.title}</h3>
                      <p className="mt-3 text-sm text-muted leading-relaxed">{div.desc}</p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-line flex items-center justify-between">
                      <a href={div.href} className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-teal-700 transition hover:gap-2">
                        Learn more <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COUNTRIES / MARKETS LINK BANNER */}
      <section className="section bg-surface border-b border-line">
        <div className="container-x max-w-5xl">
          <Reveal>
            <div className="rounded-3xl border border-line bg-navy p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
              <div className="animate-blob absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10 pointer-events-none" />
              <div className="animate-blob absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" style={{ animationDelay: "-4s" }} />
              <div className="relative max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Markets</span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Countries and markets</h2>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                  See the markets we work in and what we do in each of them.
                </p>
              </div>
              <div className="relative mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                <a
                  href="/countries"
                  className="group inline-flex items-center gap-2 rounded-xl bg-teal-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-500"
                >
                  View Countries / Markets
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </a>
                <a
                  href="/businesses"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  View All Businesses
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPROACH & FINAL CTA */}
      <section className="section bg-white text-center">
        <div className="container-x max-w-4xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Our approach to customers and partners</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl mx-auto">
              We aim to deal with every customer, seller and trade partner clearly and fairly. Whether you want to buy, sell, trade or order printing, our team supports your enquiry across all our businesses.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/businesses"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
              >
                Explore Our Businesses
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-surface px-8 py-4 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:border-teal-600"
              >
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}