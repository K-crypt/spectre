import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, Spline_Sans_Mono, Michroma } from "next/font/google";
import "./globals.css";
import { Nav, Footer } from "@/components/ui";
import { ChatWidget } from "@/components/chat-widget";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
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
  robots: { index: false, follow: false }, // preview phase — flips at public launch
  icons: { icon: "/favicon.svg" },
};

const themeScript = `try{var t=localStorage.getItem("spectre.site.theme");var l=t?t==="light":matchMedia("(prefers-color-scheme: light)").matches;if(l)document.documentElement.classList.add("light")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${instrument.variable} ${splineMono.variable} ${michroma.variable}`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Nav />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
