import type { Metadata } from "next";
/* The house stack, shared with the studio's other venture: Cormorant
   Garamond for display — fine, high-contrast, italic for names — and Poppins
   for body and the wide-tracked small-caps labels. */
import "@fontsource/cormorant-garamond/latin-300.css";
import "@fontsource/cormorant-garamond/latin-300-italic.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/poppins/latin-300.css";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/spline-sans-mono/latin-400.css";
import "@fontsource/michroma/latin-400.css";
import "./globals.css";
import { Nav, Footer } from "@/components/ui";
import { ChatWidget } from "@/components/chat-widget";
import { SmoothScroll } from "@/components/scroll";
import { withBasePath } from "@/lib/base-path";

/* The preview image has to be an absolute URL, and which host that is
   depends on where the build is going. Production is thespectre.one; a
   GitHub Pages build serves from /<repo> on k-crypt.github.io, and pointing
   a card there at thespectre.one would show whatever that host happens to
   have rather than this build's image. Derived from the same variable as
   the base path, so it is right for either without anyone remembering to
   switch it. */
const OG_HOST =
  process.env.GITHUB_ACTIONS === "true" && process.env.GITHUB_REPOSITORY
    ? `https://k-crypt.github.io/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
    : "https://thespectre.one";
const OG_IMAGE = `${OG_HOST}/og-v2.jpg`;

export const metadata: Metadata = {
  title: "The Spectre — AI operating layer for founder-led businesses",
  description:
    "Spectre turns scattered business information into one operating picture, prepares the work, and keeps every material decision under human control.",
  robots: { index: true, follow: true }, // launched 2026-07-22 on thespectre.one
  metadataBase: new URL("https://thespectre.one"),
  icons: { icon: withBasePath("/favicon.svg") },
  openGraph: {
    title: "The Spectre — Your business in one operating picture",
    description:
      "An AI operating layer for founder-led businesses. Built around your workflows, trained on your context, and always under human control.",
    url: "https://thespectre.one",
    siteName: "The Spectre",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spectre — Your business in one operating picture",
    description:
      "An AI operating layer for founder-led businesses. They prepare. You decide.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <SmoothScroll />
        <a className="skip-link" href="#main">Skip to content</a>
        <Nav />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
