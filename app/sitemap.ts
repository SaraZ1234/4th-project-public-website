import type { MetadataRoute } from "next";
import { nav, countries, pages, announcements } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com";
  return [...nav.map((n) => n.href), ...pages.map((p) => `/${p.slug}`), "/faq", "/announcements", ...announcements.map((a) => `/announcements/${a.slug}`), ...countries.map((c) => `/countries/${c.slug}`)].map((p) => ({ url: base + p }));
}
