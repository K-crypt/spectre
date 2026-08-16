"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/* ── Reveal: the single motion signature (IntersectionObserver + CSS).
   Content is visible by default; we hide with .pending only once JS is live
   and motion is allowed, so no-JS/crawlers/captures always see the page. ── */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    el.classList.add("pending");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            setTimeout(() => {
              el.classList.add("in");
              el.classList.remove("pending");
            }, delay);
            io.unobserve(el);
          }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ── product registry: canonical data lives in @/lib/products.
      Server components must import it from there directly — data re-exported
      through this "use client" module crosses the boundary as a reference. ── */
import { Sun, Moon, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { PRODUCTS_DATA as PRODUCTS } from "@/lib/products";
import { Mark } from "@/components/mark";

/* ── theme toggle (html.light + localStorage; pre-paint script in layout) ── */
function ThemeToggle() {
  const [light, setLight] = useState<boolean | null>(null);
  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);
  const flip = () => {
    const next = !document.documentElement.classList.contains("light");
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("spectre.site.theme", next ? "light" : "dark");
    } catch {}
    setLight(next);
  };
  return (
    <button className="theme-btn" onClick={flip} aria-label="Switch theme" title="Switch theme">
      {light === null ? <Sun size={15} strokeWidth={1.5} style={{ opacity: 0.5 }} /> : light ? <Moon size={15} strokeWidth={1.5} /> : <Sun size={15} strokeWidth={1.5} />}
    </button>
  );
}

/* ── Nav ── */
export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  return (
    <nav
      className={`hairline-b site-nav ${onHome ? "site-nav-home" : ""}`}
      style={{ position: "sticky", top: 0, zIndex: 70, background: onHome ? "rgba(6, 10, 12, .9)" : "color-mix(in srgb, var(--ground) 88%, transparent)", backdropFilter: "blur(12px)" }}
    >
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 16, height: 60 }}>
        <Link
          href="/"
          style={{ textDecoration: "none", color: onHome ? "#f0f3f3" : "var(--ink)", display: "flex", alignItems: "center", gap: 10 }}
          onClick={() => setOpen(false)}
        >
          <Mark height={12} style={{ position: "relative", top: 0.5 }} />
          <span className="wordmark">THE&nbsp;SPECTRE</span>
        </Link>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 18, alignItems: "center" }} className="nav-products nav-buyer">
          <Link href="/#how">How it works</Link>
          <Link href="/#proof">Proof</Link>
          <Link href="/#modules">Executive team</Link>
        </div>
        <Link href="/notes/" className="nav-notes" style={{ textDecoration: "none", color: "var(--ghost)", fontSize: 13 }}>
          Notes
        </Link>
        <ThemeToggle />
        <Link href="/#access" className="btn btn-hard nav-access" style={{ padding: "10px 16px" }} onClick={() => setOpen(false)}>
          Design partnership
        </Link>
        <button className="menu-btn" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
        </button>
      </div>
      {open && (
        <div className="sheet">
          <Link href="/#how" onClick={() => setOpen(false)}>How it works</Link>
          <Link href="/#proof" onClick={() => setOpen(false)}>Proof</Link>
          <Link href="/#modules" onClick={() => setOpen(false)}>Executive team</Link>
          <Link href="/#day" onClick={() => setOpen(false)}>One Tuesday</Link>
          <span className="sheet-label">SPECIALIST PAGES</span>
          {PRODUCTS.map((product) => (
            <Link key={product.slug} href={`/${product.slug}/`} onClick={() => setOpen(false)}>
              {product.name}
            </Link>
          ))}
          <Link href="/notes/" onClick={() => setOpen(false)}>
            Studio notes
          </Link>
          <Link href="/data/" onClick={() => setOpen(false)}>
            Data practices
          </Link>
          <Link href="/#access" onClick={() => setOpen(false)}>
            Discuss a design partnership
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ── status badge ── */
export function Status({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}

/* ── section stamp ── */
export function Stamp({ children }: { children: ReactNode }) {
  return <div className="stamp" style={{ marginBottom: 20 }}>{children}</div>;
}

/* ── the approval gate (recurring brand interaction) ── */
export function ApproveCard({
  payloads,
  accent = "var(--accent)",
}: {
  payloads: string[];
  accent?: string;
}) {
  const [i, setI] = useState(0);
  const [approved, setApproved] = useState(false);
  const stampTime = "18:45"; // fixed demo time — the calendar rhythm nod
  return (
    <div className="card" style={{ padding: 18, maxWidth: 440 }}>
      <div className="stamp" style={{ marginBottom: 10 }}>
        {approved ? "EXECUTED · LOGGED" : "STAGED · AWAITING YOUR TAP"}
      </div>
      <div
        style={{ fontSize: 13.5, borderLeft: `2px solid ${accent}`, paddingLeft: 12, marginBottom: 14, minHeight: 42 }}
      >
        {payloads[i]}
      </div>
      {!approved ? (
        <button
          className="btn"
          style={{ background: accent, color: "var(--ground)", border: "none", padding: "9px 16px" }}
          onClick={() => setApproved(true)}
        >
          Approve
        </button>
      ) : (
        <button
          className="btn btn-soft"
          style={{ padding: "9px 16px" }}
          onClick={() => {
            setApproved(false);
            setI((i + 1) % payloads.length);
          }}
        >
          Stage another
        </button>
      )}
      <div className="mono" style={{ fontSize: 10, color: "var(--ghost)", marginTop: 12 }}>
        {approved
          ? `${stampTime} · approved by you · executed · log appended`
          : `${stampTime} · staged by the system · nothing runs without you`}
      </div>
    </div>
  );
}

/* ── footer: the credibility ledger ── */
export function Footer() {
  return (
    <footer className="hairline-t" style={{ marginTop: 96 }}>
      <div className="wrap" style={{ padding: "48px 24px 64px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between" }}>
          <div>
            <Mark height={22} style={{ marginBottom: 12, color: "var(--ink)" }} />
            <div className="wordmark" style={{ marginBottom: 10 }}>THE&nbsp;SPECTRE</div>
            <div className="stamp" style={{ letterSpacing: ".14em" }}>
              A HOUSE OF DOTONE COMPANY · <span style={{ color: "var(--brass)" }}>◆</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {PRODUCTS.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`} style={{ color: "var(--ghost)", fontSize: 12, textDecoration: "none" }}>
                {p.short}
              </Link>
            ))}
            <Link href="/notes/" style={{ color: "var(--ghost)", fontSize: 12, textDecoration: "none" }}>
              Notes
            </Link>
            <Link href="/data/" style={{ color: "var(--ghost)", fontSize: 12, textDecoration: "none" }}>
              Data practices
            </Link>
          </div>
        </div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--ghost)", marginTop: 28, maxWidth: 640, lineHeight: 1.7 }}>
          Nothing on this site shows client data. Every demo runs on generated, fictional
          datasets. Every shipped number carries an as-of date.
        </div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--ghost)", marginTop: 14 }}>
          Working with the studio —{" "}
          <a href="mailto:access@thespectre.one" style={{ color: "var(--ghost)" }}>
            access@thespectre.one
          </a>
        </div>
      </div>
    </footer>
  );
}
