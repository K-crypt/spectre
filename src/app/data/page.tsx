import type { Metadata } from "next";
import { Reveal, Words } from "@/components/shell/reveal";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data and privacy",
  description:
    "What this site holds and what it never shows: fictional demo data, no analytics, no client information, and how data is handled in client engagements.",
  alternates: { canonical: canonical("data") },
};

export default function DataPage() {
  return (
    <main id="main">
      <section className="section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <Words as="h1" className="display-lg" lines={["Plainly,", "about data."]} />

          <Reveal delay={120} className="flow" style={{ marginTop: 40, "--flow": "1.4rem" }}>
            <p className="body">
              <strong>This site shows no client data.</strong> Every demonstration on
              it runs on generated, fictional datasets. Client names appear only with
              written permission, and never inside a demo.
            </p>
            <p className="body">
              <strong>The enquiry form stores what you type and nothing else:</strong>{" "}
              your email, the company, the systems you picked, and the operation you
              described. It is used to reply to you and to open access. Nothing else.
            </p>
            <p className="body">
              <strong>No analytics scripts run on this site.</strong> There are no
              third-party requests at runtime at all: the fonts are self-hosted and
              the demonstrations run entirely in your browser.
            </p>
            <p className="body">
              <strong>In client engagements,</strong> the systems we build hold your
              data under your own accounts wherever that is possible. Tokens are
              stored encrypted, outward actions pass a human approval gate with a
              full audit log, and your knowledge stays portable, exportable text.
            </p>
            <p className="stamp" style={{ marginTop: 8 }}>
              Questions: <a href="mailto:access@thespectre.one">access@thespectre.one</a>
            </p>
            <p className="stamp">As of Jul 2026</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
