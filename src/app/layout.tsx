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
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spectre — Your business in one operating picture",
    description:
      "An AI operating layer for founder-led businesses. They prepare. You decide.",
    images: ["/og.jpg"],
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
