import type { MetadataRoute } from "next";
import { SITE_URL, shouldIndex } from "@/lib/site";

/* The GitHub Pages build disallows everything until the canonical origin is
   settled, so the two live copies of this site cannot compete for the same
   queries. Setting NEXT_PUBLIC_SITE_URL on that build flips both this file
   and the robots meta tag in the same move. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!shouldIndex) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
