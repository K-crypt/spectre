import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stamp } from "@/components/ui";
import { NOTES } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Studio notes — The Spectre",
  description: "Substantive thinking from the studio: context, software as a service, and the architecture of trust.",
};

export default function NotesIndex() {
  return (
    <main id="main">
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "88px 24px 56px" }}>
          <Reveal>
            <Stamp>STUDIO NOTES</Stamp>
            <h1 className="display" style={{ fontSize: "clamp(34px, 4.6vw, 52px)", maxWidth: "18ch" }}>
              Thinking we stand behind.
            </h1>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch", marginTop: 14 }}>
              Written by the studio, in the studio&apos;s voice. No news, no
              announcements — only ideas we run our own operations on.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ padding: "40px 24px 96px" }}>
          {NOTES.map((n, i) => (
            <Reveal key={n.slug} delay={i * 60}>
              <Link href={`/notes/${n.slug}/`} className="note-row">
                <div className="mono note-row-stamp">
                  {n.stamp} · {n.minutes} MIN
                </div>
                <div>
                  <div className="display note-row-title">{n.title}</div>
                  <div className="note-row-dek">{n.dek}</div>
                </div>
                <span className="mono note-row-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
