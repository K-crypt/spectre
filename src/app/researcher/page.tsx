import type { Metadata } from "next";
import { ProductPage } from "@/components/sections/product-page";
import { ResearcherPlayground } from "@/components/researcher-playground";
import { PRODUCT_PAGES } from "@/lib/product-pages";
import { canonical, OG_IMAGE } from "@/lib/site";

const copy = PRODUCT_PAGES.researcher;

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: { canonical: canonical("researcher") },
  openGraph: {
    title: `${copy.metaTitle} - The Spectre`,
    description: copy.metaDescription,
    url: canonical("researcher"),
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: copy.metaTitle }],
  },
};

export default function Page() {
  return <ProductPage slug="researcher" playground={<ResearcherPlayground />} />;
}
