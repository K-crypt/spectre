import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Stamp } from "@/components/ui";
import { NOTES, getNote } from "@/lib/notes";

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: `${note.title} — The Spectre`,
    description: note.dek,
    openGraph: { title: note.title, description: note.dek, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const others = NOTES.filter((n) => n.slug !== note.slug).slice(0, 2);
  return (
    <main id="main">
      <article>
        <section className="hairline-b">
          <div className="wrap note-measure" style={{ padding: "80px 24px 48px" }}>
            <Reveal>
              <Stamp>
                STUDIO NOTES · {note.stamp} · {note.minutes} MIN READ
              </Stamp>
              <h1 className="display" style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.14 }}>
                {note.title}
              </h1>
              <p style={{ color: "var(--ghost)", marginTop: 14, fontSize: 17 }}>{note.dek}</p>
            </Reveal>
          </div>
        </section>
        <section className="hairline-b">
          <div className="wrap note-measure note-body" style={{ padding: "56px 24px 72px" }}>
            <Reveal>{note.body}</Reveal>
          </div>
        </section>
      </article>

      <section>
        <div className="wrap note-measure" style={{ padding: "48px 24px 96px" }}>
          <Reveal>
            <Stamp>MORE NOTES</Stamp>
            {others.map((n) => (
              <Link key={n.slug} href={`/notes/${n.slug}/`} className="note-row">
                <div className="mono note-row-stamp">
                  {n.stamp} · {n.minutes} MIN
                </div>
                <div>
                  <div className="display note-row-title" style={{ fontSize: 20 }}>
                    {n.title}
                  </div>
                </div>
                <span className="mono note-row-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
