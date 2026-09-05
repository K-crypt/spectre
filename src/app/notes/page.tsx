import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Words } from "@/components/shell/reveal";
import { NOTES } from "@/lib/notes";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio notes",
  description:
    "Substantive writing from the studio on context, software sold as a service, and the architecture of trust in systems that act on your behalf.",
  alternates: { canonical: canonical("notes") },
};

export default function NotesIndex() {
  return (
    <main id="main">
      <section className="section">
        <div className="wrap">
          <div className="movement-head">
            <Words as="h1" className="display-lg" lines={["Thinking we", "stand behind."]} />
            <Reveal delay={120}>
              <p className="lede">
                Written by the studio, in the studio&apos;s voice. No news and no
                announcements. Only ideas we run our own operations on.
              </p>
            </Reveal>
          </div>

          {/* The same row grammar as the roster on the home page, because
              this is the same kind of object: a short list of named things
              that wants to be scanned in one pass. */}
          <Reveal className="roster is-plain" stagger>
            {NOTES.map((n, i) => (
              <div className="roster-row" key={n.slug} style={{ "--i": i } as React.CSSProperties}>
                <div className="roster-main">
                  <h2 className="roster-name display display-md">
                    <Link href={`/notes/${n.slug}/`}>{n.title}</Link>
                  </h2>
                  <p className="roster-claim">{n.dek}</p>
                </div>
                <div className="roster-meta">
                  <span className="stamp">
                    {n.stamp} · {n.minutes} min
                  </span>
                  <span className="roster-go" aria-hidden>
                    Read
                  </span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
