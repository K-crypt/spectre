import Link from "next/link";
import { Mark } from "@/components/mark";
import { PRODUCTS_DATA } from "@/lib/products";

/* ── Footer ────────────────────────────────────────────────────────────────
   A ledger, not a sitemap dump. Three things belong here: who this is, where
   everything is, and the trust line that says what the demos on this site
   are and are not. The full product names live here rather than the nav's
   abbreviations, because this is read rather than scanned, and because it is
   the site's densest set of internal links.
   ───────────────────────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Mark height={22} />
            <p className="body" style={{ color: "var(--ghost)", fontSize: 15 }}>
              Five AI operating systems that run a business&apos;s repeatable work.
              Every outward action waits for a person.
            </p>
            <a className="mono" href="mailto:access@thespectre.one" style={{ fontSize: 13 }}>
              access@thespectre.one
            </a>
          </div>

          <nav className="footer-col" aria-label="Systems">
            <span className="stamp">Systems</span>
            {PRODUCTS_DATA.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`}>
                {p.name}
              </Link>
            ))}
          </nav>

          <nav className="footer-col" aria-label="The studio">
            <span className="stamp">Studio</span>
            <Link href="/method/">Method</Link>
            <Link href="/notes/">Notes</Link>
            <Link href="/data/">Data and privacy</Link>
            <Link href="/#access">Request access</Link>
          </nav>
        </div>

        <div className="footer-base">
          {/* The trust line. It is the last thing on the page on purpose:
              every demo above it is fictional and deterministic, and a
              visitor who scrolled this far deserves that stated plainly
              rather than buried in a footnote beside each one. */}
          <span className="stamp footer-trust">
            All demonstrations run on fictional data. No client information appears on this site.
          </span>
          {/* The house stamp, per DESIGN.md §3. */}
          <span className="stamp">Est. 2026 · Jaipur, India</span>
          <span className="stamp">A House of Dotone company</span>
        </div>
      </div>
    </footer>
  );
}
