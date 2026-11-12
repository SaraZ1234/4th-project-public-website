import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Factory,
  FileText,
  MapPin,
  MessageSquare,
  Package,
  Search,
  Store,
  Truck,
  UserCheck,
  Users,
  Warehouse,
} from "lucide-react";
import { APP_URL, sellerSteps } from "@/lib/content";
import { Banner } from "@/components/Page";

export const metadata = {
  title: "Become a Seller",
  description:
    "Learn how to join the marketplace. Registration and onboarding happen in our web application.",
};

const whoCanSell = [
  { icon: Store, title: "Small businesses", text: "Local and growing shops that want to reach more buyers." },
  { icon: Building2, title: "Large businesses", text: "Established companies adding a connected sales channel." },
  { icon: Factory, title: "Manufacturers", text: "Producers selling their own goods directly." },
  { icon: Warehouse, title: "Wholesalers", text: "Suppliers offering products in volume." },
  { icon: Users, title: "Independent sellers", text: "Individual sellers with products to offer." },
];

const documents = [
  { icon: FileText, text: "Business registration and tax details" },
  { icon: MapPin, text: "Proof of business address" },
  { icon: BadgeCheck, text: "Product certifications, where applicable" },
  { icon: UserCheck, text: "Identification of the authorized representative" },
];

const stepIcons = [Search, CheckCircle2, Package, Store, Truck];

export default function BecomeASeller() {
  return (
    <>
      <Banner title="Become a Seller" trail={[{ label: "Become a Seller" }]} />

      {/* INTRO + WHO CAN SELL */}
      <section className="section relative overflow-hidden border-b border-line bg-white">
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-teal-500/10 blur-[110px] motion-reduce:animate-none"
        />
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-amber-500/10 blur-[110px] motion-reduce:animate-none"
          style={{ animationDelay: "-6s" }}
        />

        <div className="container-x relative max-w-6xl">
          <div className="animate-fade-in mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-teal-200 bg-teal-50/70 px-4 py-2 text-xs font-semibold text-teal-900 shadow-sm sm:text-sm">
              <Store size={16} className="shrink-0 text-teal-600" aria-hidden />
              <span>Marketplace opportunities</span>
            </div>
            <h2 className="break-words text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">
              Sell your products through one connected marketplace
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Learn how to join the marketplace. Registration and onboarding
              happen in our web application.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={`${APP_URL}/seller/register`}
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-800 motion-reduce:transform-none sm:px-7"
              >
                Become a Seller
                <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="#journey"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-6 py-3.5 text-sm font-bold text-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-600 hover:bg-surface motion-reduce:transform-none sm:px-7"
              >
                See the journey
              </a>
            </div>
          </div>

          <div className="mb-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Who can sell
            </span>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Small and large businesses, manufacturers, wholesalers and
              independent sellers can apply to sell on the marketplace.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {whoCanSell.map((w) => {
              const Icon = w.icon;
              return (
                <li key={w.title} className="h-full">
                  <div className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg motion-reduce:transform-none sm:p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition duration-300 group-hover:bg-teal-700 group-hover:text-white">
                      <Icon size={22} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words text-base font-bold text-navy">{w.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{w.text}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* THE JOURNEY */}
      <section
        id="journey"
        className="section relative scroll-mt-16 overflow-hidden bg-navy text-white xl:scroll-mt-32"
      >
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-teal-500/10 blur-[110px] motion-reduce:animate-none"
        />
        <div className="container-x relative">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              The journey
            </span>
            <h2 className="mt-2 break-words text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
              Five steps from interest to onboarding
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
              Follow the steps below. Registration and onboarding take place in
              our web application.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
            {sellerSteps.map((s, i) => {
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <li key={s} className="h-full">
                  <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/50 hover:bg-white/[0.08] motion-reduce:transform-none sm:p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="rounded-xl bg-white/10 p-3 text-teal-400 shadow-sm transition duration-300 group-hover:bg-teal-600 group-hover:text-white">
                        <Icon size={20} aria-hidden />
                      </div>
                      <span className="text-2xl font-black text-white/20 transition group-hover:text-teal-400/50">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white">Step {i + 1}</h3>
                    <p className="mt-2 break-words text-xs leading-relaxed text-white/70 sm:text-sm">{s}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="section border-b border-line bg-surface">
        <div className="container-x max-w-4xl">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Be prepared
            </span>
            <h2 className="mt-2 break-words text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">
              Documents you may need
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Having these ready makes registration quicker.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {documents.map((d) => {
              const Icon = d.icon;
              return (
                <li key={d.text} className="h-full">
                  <div className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-600 hover:shadow-md motion-reduce:transform-none sm:p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 transition duration-300 group-hover:bg-navy group-hover:text-white">
                      <Icon size={22} aria-hidden />
                    </span>
                    <p className="min-w-0 break-words text-sm font-bold leading-relaxed text-navy">{d.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-white py-14 text-center sm:py-20">
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px] motion-reduce:animate-none"
        />
        <div
          aria-hidden
          className="animate-blob pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px] motion-reduce:animate-none"
          style={{ animationDelay: "-6s" }}
        />

        <div className="container-x relative z-10 mx-auto max-w-4xl">
          <div className="rounded-3xl border border-teal-200 bg-teal-50/60 p-5 shadow-xl shadow-teal-900/5 sm:p-12">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-xs font-bold text-teal-800 shadow-sm sm:text-sm">
              <MessageSquare size={16} className="text-teal-600" aria-hidden />
              <span>Ready when you are</span>
            </div>

            <h2 className="break-words text-2xl font-black leading-[1.15] tracking-tight text-navy sm:text-3xl lg:text-4xl">
              Start selling on our marketplace
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Go to registration to begin, or talk to our team first if you
              have questions.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={`${APP_URL}/seller/register`}
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-teal-700 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-800 active:translate-y-0 motion-reduce:transform-none sm:px-8"
              >
                Become a Seller
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <Link
                href="/marketplace"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-6 py-4 text-sm font-extrabold text-navy shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-600 active:translate-y-0 motion-reduce:transform-none sm:px-8"
              >
                Explore Marketplace
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-6 py-4 text-sm font-extrabold text-navy shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-600 active:translate-y-0 motion-reduce:transform-none sm:px-8"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}