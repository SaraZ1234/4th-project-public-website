import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CookieBanner, BackToTop } from "@/components/Extras";
import { site } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com"),
  title: { default: `${site.name} | Trade, Store, Marketplace, Printing`, template: `%s | ${site.name}` },
  description: site.tagline,
  openGraph: { type: "website", siteName: site.name },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

const locale = process.env.NEXT_PUBLIC_LOCALE ?? "en";
const dir = ["ar", "ur", "fa", "he"].includes(locale) ? "rtl" : "ltr";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  email: site.email,
  telephone: site.phone,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <CookieBanner />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}