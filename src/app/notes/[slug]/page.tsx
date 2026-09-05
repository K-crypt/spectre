import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Words } from "@/components/shell/reveal";
import { NOTES, getNote } from "@/lib/notes";
import { JsonLd, breadcrumbLd, canonical, OG_IMAGE, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.dek,
    alternates: { canonical: canonical(`notes/${slug}`) },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.dek,
      url: canonical(`notes/${slug}`),
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: note.title }],
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const others = NOTES.filter((n) => n.slug !== note.slug).slice(0, 2);

  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: note.title,
          description: note.dek,
          url: canonical(`notes/${slug}`),
          publisher: { "@id": `${SITE_URL}/#organization` },
          isAccessibleForFree: true,
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "The Spectre", path: "/" },
          { name: "Studio notes", path: "notes" },
          { name: note.title, path: `notes/${slug}` },
        ])}
      />

      <article>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="wrap note-measure">
            <p className="stamp" style={{ marginBottom: 24 }}>
              {note.stamp} · {note.minutes} min read
            </p>
            <Words as="h1" className="display-lg" lines={[note.title]} />
            <Reveal delay={120}>
              <p className="lede" style={{ marginTop: 24, maxWidth: "52ch" }}>
                {note.dek}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap note-measure note-body">
            <Reveal>{note.body}</Reveal>
          </div>
        </section>
      </article>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap note-measure">
          <hr className="rule" style={{ marginBottom: 32 }} />
          <p className="stamp" style={{ marginBottom: 20 }}>
            More notes
          </p>
          {others.map((n) => (
            <Link
              key={n.slug}
              href={`/notes/${n.slug}/`}
              style={{ display: "block", padding: "18px 0", borderTop: "1px solid var(--hairline)" }}
            >
              <span className="display display-sm">{n.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
