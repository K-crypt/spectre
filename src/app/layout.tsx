import type { Metadata } from "next";

/* ── The house stack ───────────────────────────────────────────────────────
   Three registers, self-hosted through @fontsource: the build has no network
   dependency and the page has no font-loading flash.

   Only the weights actually used are loaded. Cormorant carries display at
   300 with 400 for the rare short line that needs weight, and both italics
   because italic is the brand's emphasis. Instrument Sans carries every
   running word at 400 with 500 for the few places that need a lift. Spline
   Sans Mono carries data. Michroma exists for the wordmark and nothing else.
   ───────────────────────────────────────────────────────────────────────── */
import "@fontsource/cormorant-garamond/latin-300.css";
import "@fontsource/cormorant-garamond/latin-300-italic.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/instrument-sans/latin-400.css";
import "@fontsource/instrument-sans/latin-500.css";
import "@fontsource/spline-sans-mono/latin-400.css";
import "@fontsource/michroma/latin-400.css";

import "./globals.css";
/* Last, so a demo frame can specialise a shell class and never the reverse. */
import "../styles/engines.css";

import { Nav } from "@/components/shell/nav";
import { Footer } from "@/components/shell/footer";
import { ChatWidget } from "@/components/chat-widget";
import { SmoothScroll } from "@/components/scroll";
import { Pointer } from "@/components/shell/pointer";
import { SITE_NAME, SITE_URL, canonical, OG_IMAGE, shouldIndex } from "@/lib/site";
import { withBasePath } from "@/lib/base-path";

const DESCRIPTION =
  "The Spectre builds five AI operating systems that run a business's repeatable work: research, monitoring, drafting, scheduling, reconciliation. Nothing is sent, published or spent until a person approves it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Spectre - AI operating systems for founder-led businesses",
    /* Every page states its own subject; the house name is appended once,
       here, so no page title has to remember to carry it. */
    template: `%s - ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: canonical("/") },
  /* A GitHub Pages build is a preview until the canonical origin is
     settled, and two indexed copies of one site compete with each other. */
  robots: shouldIndex
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  icons: { icon: withBasePath("/favicon.svg") },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: canonical("/"),
    title: "The Spectre - AI operating systems for founder-led businesses",
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "The Spectre" }],
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spectre - AI operating systems for founder-led businesses",
    description: "Five systems that prepare the work. One person who decides.",
    images: [OG_IMAGE],
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The hero photograph is the largest contentful paint on the home
            page, and it is a static export, so the preload is the only way
            the browser learns about it before the stylesheet resolves. */}
        <link
          rel="preload"
          as="image"
          href={withBasePath("/ridge-1920.webp")}
          imageSrcSet={`${withBasePath("/ridge-1280.webp")} 1280w, ${withBasePath("/ridge-1920.webp")} 1920w, ${withBasePath("/ridge-2560.webp")} 2560w`}
          imageSizes="100vw"
          fetchPriority="high"
        />
        <meta name="theme-color" content="#221e1b" />
      </head>
      <body>
        <SmoothScroll />
        <Pointer />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
