import type { Metadata } from "next";
import { Spectral, Instrument_Sans, Spline_Sans_Mono, Michroma } from "next/font/google";
import "./globals.css";
import { Nav, Footer } from "@/components/ui";
import { ChatWidget } from "@/components/chat-widget";

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
  title: "The Spectre — Automate what can be",
  description:
    "The Spectre builds AI operating teams for your business. They run the repeatable work. Every outward move waits for your tap.",
  robots: { index: true, follow: true }, // launched 2026-07-22 on thespectre.one
  metadataBase: new URL("https://thespectre.one"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "The Spectre — Automate what can be. Focus on what can't.",
    description:
      "Five AI specialists that make your executive team more powerful. They prepare the work; your people make the calls.",
    url: "https://thespectre.one",
    siteName: "The Spectre",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spectre — Automate what can be. Focus on what can't.",
    description:
      "Five AI specialists that make your executive team more powerful. They prepare the work; your people make the calls.",
    images: ["/og.jpg"],
  },
};

const themeScript = `try{var t=localStorage.getItem("spectre.site.theme");var l=t?t==="light":true;if(l)document.documentElement.classList.add("light")}catch(e){}`; // white-first (his call 2026-08-04): light is the default for everyone; dark is the stored toggle

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spectral.variable} ${instrument.variable} ${splineMono.variable} ${michroma.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Nav />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
