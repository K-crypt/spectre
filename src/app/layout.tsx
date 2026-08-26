import type { Metadata } from "next";
import { Spectral, Instrument_Sans, Spline_Sans_Mono, Michroma } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Nav, Footer } from "@/components/ui";
import { ChatWidget } from "@/components/chat-widget";
import { PremiumScroll } from "@/components/premium-scroll";
import { withBasePath } from "@/lib/base-path";

// Display serif swapped to Spectral 2026-08-04 (his call: Fraunces read
// unprofessional). CSS var name kept for stability across globals.css.
const spectral = Spectral({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Spectre — Private operating intelligence",
  description:
    "Spectre connects scattered business context, prepares consequential decisions, and keeps every material action under human control.",
  robots: { index: true, follow: true }, // launched 2026-07-22 on thespectre.one
  metadataBase: new URL("https://thespectre.one"),
  icons: { icon: withBasePath("/favicon.svg") },
  openGraph: {
    title: "The Spectre — Private operating intelligence",
    description:
      "Private operating intelligence built around your workflows, your context, and human approval.",
    url: "https://thespectre.one",
    siteName: "The Spectre",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spectre — Private operating intelligence",
    description:
      "An AI operating layer for founder-led businesses. They prepare. You decide.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${spectral.variable} ${instrument.variable} ${splineMono.variable} ${michroma.variable}`}>
      <body>
        <PremiumScroll />
        <Nav />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
