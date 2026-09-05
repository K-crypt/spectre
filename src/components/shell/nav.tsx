"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mark } from "@/components/mark";
import { PRODUCTS_DATA } from "@/lib/products";
import { lockScroll } from "@/components/scroll";
import { usePageProgress } from "@/components/shell/scroll-scene";

/* ── Navigation ────────────────────────────────────────────────────────────
   One line at every desktop width. Six destinations is already the ceiling
   for that, so the five products sit under a single "Systems" position in
   the sheet on small screens rather than being condensed into initials.

   Over the hero photograph the bar is transparent and light. It takes a
   ground the moment the page moves, because further down it can be sitting
   over paper, over graphite, or over a demo frame, and the links have to
   stay legible over all three.
   ───────────────────────────────────────────────────────────────────────── */

export function Nav() {
  const pathname = usePathname() ?? "/";
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  /* How much of the argument is left. On a page this long that is real
     information, and it costs one composited transform per frame. */
  const progress = useRef<HTMLSpanElement>(null);
  usePageProgress(progress);

  /* The bar's own state is the only thing scroll drives here, and it is a
     boolean, so an observer on a sentinel is the right instrument: no
     scroll handler, no work on frames where nothing changed. */
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:64px;pointer-events:none";
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  /* The sheet is a scroll trap otherwise: the page keeps moving behind it. */
  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  /* A route change closes the sheet. Without this, tapping a product leaves
     the sheet covering the page it just navigated to. */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isHome = pathname === "/";
  const current = (href: string) =>
    href === "/" ? (isHome ? "page" : undefined) : pathname.startsWith(href) ? "page" : undefined;

  return (
    <>
      {/* One bar, one colour. The site has a single cream register now, so
          the nav has no dark state to switch into. */}
      <header
        className={`nav${stuck || open ? " is-stuck" : ""}`}
      >
        <div className="wrap">
          <Link href="/" className="nav-brand" aria-label="The Spectre, home">
            <Mark height={20} />
            <span className="wordmark">The Spectre</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {/* The "AI" prefix is on four of the five short names, so in a
                single row it is four repetitions of a word that carries no
                information. The full names are in the footer and on every
                product page, where they are read rather than scanned. */}
            {PRODUCTS_DATA.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`} aria-current={current(`/${p.slug}`)}>
                <span className="vh">{p.short}</span>
                <span aria-hidden>{p.short.replace(/^AI /, "")}</span>
              </Link>
            ))}
            <Link href="/method/" aria-current={current("/method")}>
              Method
            </Link>
          </nav>

          <Link className="btn btn-hard" href="/#access">
            Request access
          </Link>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <span className="nav-progress" ref={progress} aria-hidden />
      </header>

      <div id="nav-sheet" className={`nav-sheet${open ? " is-open" : ""}`} inert={!open}>
        {PRODUCTS_DATA.map((p) => (
          <Link key={p.slug} href={`/${p.slug}/`}>
            {p.short}
          </Link>
        ))}
        <Link href="/method/">Method</Link>
      </div>
    </>
  );
}
