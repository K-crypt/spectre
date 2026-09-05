import type { MetadataRoute } from "next";
import { PRODUCTS_DATA } from "@/lib/products";
import { NOTES } from "@/lib/notes";
import { canonical } from "@/lib/site";

/* Emitted as a real sitemap.xml by the static export. Priorities are
   relative rather than absolute: the home page and the five systems are what
   the site is for, the studio pages support them, and the notes are the
   long tail. Every URL carries the trailing slash the export actually
   serves, which `canonical()` handles. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: canonical("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...PRODUCTS_DATA.map((p) => ({
      url: canonical(p.slug),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: canonical("method"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: canonical("notes"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...NOTES.map((n) => ({
      url: canonical(`notes/${n.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    { url: canonical("data"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
