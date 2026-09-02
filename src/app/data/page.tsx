import type { Metadata } from "next";
import { Reveal, Stamp } from "@/components/ui";

export const metadata: Metadata = {
  title: "Data practices — The Spectre",
  description: "What this site holds, and what it never shows.",
};

export default function DataPage() {
  return (
    <main id="main">
      <section>
        <div className="wrap" style={{ padding: "96px 24px", maxWidth: 760 }}>
          <Reveal>
            <Stamp>DATA PRACTICES · AS OF JUL 2026</Stamp>
            <h1 className="display" style={{ fontSize: 40, marginBottom: 24 }}>
              Plainly, about data.
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, color: "var(--ghost)", fontSize: 15 }}>
              <p>
                <strong style={{ color: "var(--ink)" }}>This site shows no client data.</strong>{" "}
                Every demo runs on generated, fictional datasets. Client names appear
                only with written permission, and never inside demos.
              </p>
              <p>
                <strong style={{ color: "var(--ink)" }}>The waitlist stores what you type and nothing else:</strong>{" "}
                your email, the products you picked, and your optional note. It is used
                to reply to you and to open access, not for anything else.
              </p>
              <p>
                <strong style={{ color: "var(--ink)" }}>No analytics scripts run on this site today.</strong>
              </p>
              <p>
                <strong style={{ color: "var(--ink)" }}>In client engagements,</strong> systems we
                build hold your data under your accounts wherever possible, tokens are
                stored encrypted, outward actions pass a human approval gate with a full
                audit log, and your knowledge remains portable, exportable text.
              </p>
              <p className="mono" style={{ fontSize: 12 }}>
                Questions: access@thespectre.one
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
