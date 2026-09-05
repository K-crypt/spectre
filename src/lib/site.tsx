import { PRODUCTS_DATA } from "@/lib/products";

/* ── Where this build thinks it lives ──────────────────────────────────────
   The site has two live origins: thespectre.one on Netlify, and a GitHub
   Pages project build served from /<repo>. Which one is canonical is an open
   decision, so nothing here hard-codes an answer.

   Resolution order:
     1. NEXT_PUBLIC_SITE_URL, if the build sets it. This is the switch: set
        it once in the deploy environment and every canonical tag, OG url,
        sitemap entry and JSON-LD id follows.
     2. The GitHub Pages origin, derived from the repository the workflow is
        running in, so a Pages build never advertises the Netlify host.
     3. thespectre.one, for local builds and the Netlify deploy.

   Until the canonical decision is made, the Pages build carries
   `robots: noindex` (see `shouldIndex`), so the two origins cannot compete
   for the same queries in the meantime. Flipping the decision is one
   environment variable, not a code change.
   ───────────────────────────────────────────────────────────────────────── */

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const onPages = process.env.GITHUB_ACTIONS === "true" && Boolean(repo);

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (onPages ? `https://k-crypt.github.io/${repo}` : "https://thespectre.one")
).replace(/\/$/, "");

/* A Pages build is a preview unless it has been told it is the real thing. */
export const shouldIndex = !onPages || Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_NAME = "The Spectre";
export const SITE_TAGLINE = "Automate what can be. Focus on what can't.";

export function canonical(path = "/") {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;
  return `${SITE_URL}${clean}`;
}

export const OG_IMAGE = `${SITE_URL}/og-v2.jpg`;

/* ── Structured data ───────────────────────────────────────────────────────
   Two graphs. The organisation and the site itself are declared once on the
   home page; each product page declares itself as a service offered by that
   organisation, referencing it by @id rather than restating it.
   ───────────────────────────────────────────────────────────────────────── */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: canonical("/"),
        slogan: SITE_TAGLINE,
        description:
          "A studio in Jaipur building AI operating systems that run a business's repeatable work, with every outward action held for a human approval.",
        parentOrganization: { "@type": "Organization", name: "House of Dotone" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaipur",
          addressCountry: "IN",
        },
        email: "access@thespectre.one",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/spectre-mark.svg` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: canonical("/"),
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

export function productLd(slug: string) {
  const p = PRODUCTS_DATA.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical(slug)}#service`,
    name: p.name,
    description: p.sub,
    url: canonical(slug),
    serviceType: "AI operating system",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: canonical(t.path),
    })),
  };
}

/* Rendered as a plain script tag. JSON.stringify is the only escaping that
   matters here because every value above is authored in this repository. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
