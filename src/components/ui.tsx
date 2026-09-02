"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { PRODUCTS_DATA as PRODUCTS } from "@/lib/products";
import { Mark } from "@/components/mark";
import { lockScroll } from "@/components/scroll";

/* One CTA string for the whole site. The audit found four names for this
   action, two of them on the same screen (§2.7). */
export const CTA = "Private working session";

/* ── Motion primitives ────────────────────────────────────────────────────
   Built once and reused, never re-invented per section. Every one is a
   no-op under prefers-reduced-motion: content is visible by default and we
   only add `.pending` once JS is live and motion is allowed, so no-JS,
   crawlers and screenshots always see a finished page.
   ───────────────────────────────────────────────────────────────────────── */

function useEnter(
  ref: React.RefObject<HTMLElement | null>,
  { threshold = 0, delay = 0 }: { threshold?: number; delay?: number } = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    /* Already in view on load (the hero, most often): resolve on the next
       frame rather than waiting for a scroll that may never come. */
    el.classList.add("pending");
    let timer: ReturnType<typeof setTimeout>;
    const enter = () => {
      timer = setTimeout(() => {
        el.classList.add("in");
        el.classList.remove("pending");
      }, delay);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            enter();
            io.unobserve(el);
          }
        }
      },
      /* Resolve BEFORE the element reaches the viewport, so a fast
         scroll never lands on a blank section. */
      { threshold, rootMargin: "0px 0px 14% 0px" },
    );
    io.observe(el);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [ref, threshold, delay]);
}

/* Reveal — CONTAINER level. Never wrap the children of a bordered grid;
   that renders the frame before its contents (audit §2.4). */
export function Reveal({
  children,
  delay = 0,
  className = "",
  stagger = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  stagger?: boolean;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEnter(ref, { delay });
  return (
    <Tag ref={ref} className={`reveal ${stagger ? "stagger" : ""} ${className}`.trim()}>
      {children}
    </Tag>
  );
}

/* Headline — the words float in.
   Per WORD, never per character: character-by-character reads as a template
   effect, whereas words arriving in reading order reads as a sentence being
   set. Each word rises a little, resolves out of a soft blur, and settles;
   the line breaks are authored, so the rhythm is deliberate. */
export function Headline({
  lines,
  className = "",
  id,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEnter(ref);
  let n = 0;
  return (
    <Tag ref={ref} id={id} className={`display headline ${className}`.trim()}>
      {lines.map((line, li) => (
        <span className="headline-line" key={line}>
          {line.split(" ").map((word) => {
            const i = n++;
            return (
              <span
                className="word"
                key={`${word}-${i}`}
                style={{ "--w": i } as CSSProperties}
              >
                {word}
              </span>
            );
          })}
          {li < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </Tag>
  );
}

/* Parallax — a dark island's background moves at ~0.85x the page, so you
   fall into the room and come back out of it. Transform only. */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  strength = 0.15,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.setProperty("--parallax", `${(-mid * strength).toFixed(1)}px`);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, strength]);
}

/* ── Scroll is the camera ────────────────────────────────────────────────
   One engine. It writes --p (0 → 1) onto an element as it traverses the
   viewport and CSS does the rest, so every scroll-linked move on the site
   shares one rAF loop and one easing language. Motion is response: nothing
   here runs unless the visitor is scrolling.
   ─────────────────────────────────────────────────────────────────────── */
export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  mode: "leave" | "through" | "pin" = "through",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === "pin") {
        /* A pinned chapter: 0 the moment its frame locks to the top of the
           viewport, 1 the moment it releases. This is the film's timecode. */
        const travel = Math.max(1, rect.height - vh);
        p = -rect.top / travel;
      } else if (mode === "leave") {
        /* 0 while the top is at the top of the viewport, 1 once it has
           travelled a full screen upward — the hero's camera push. */
        p = -rect.top / Math.max(1, Math.min(rect.height, vh));
      } else {
        /* 0 as the element enters the bottom, 1 as it clears the top. */
        p = (vh - rect.top) / Math.max(1, vh + rect.height);
      }
      el.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(4));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, mode]);
}

/* Counter — counts to the real value on entry and never past it. */
export function Counter({
  to,
  prefix = "",
  duration = 900,
}: {
  to: number;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(el);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            /* Ceil, not round, so the count only ever climbs — and the last
               frame is set from the target itself rather than from the
               easing, so it lands exactly on the number and stops there. */
            if (t >= 1) {
              setValue(to);
              return;
            }
            setValue(Math.min(to, Math.ceil(to * eased)));
            raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="count">
      {prefix}
      {value.toLocaleString("en-US")}
    </span>
  );
}

/* ── Chrome ───────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  ["/#room", "The table"],
  ["/#day", "One Tuesday"],
  ["/#proof", "Proof"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  /* Whether the chapter directly under the bar is a dark one. At the top of
     the home page it is the ridge photograph, and a light bar drawn over it
     read as a hard rule across the sky. */
  const [overDark, setOverDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const first = document.querySelector("main .section");
    setOverDark(!!first?.classList.contains("on-dark"));
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      setCondensed(window.scrollY > 80);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", request, { passive: true });
    return () => {
      window.removeEventListener("scroll", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* The page must not scroll behind the open sheet. */
  useEffect(() => {
    lockScroll(open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      lockScroll(false);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => setOpen(false);

  return (
    <nav
      className={`site-nav ${condensed ? "is-condensed" : ""} ${
        overDark ? "is-over-dark" : ""
      }`}
    >
      <div className="wrap">
        <Link href="/" className="nav-brand" onClick={close}>
          <Mark height={12} style={{ position: "relative", top: 0.5 }} />
          <span className="wordmark">THE&nbsp;SPECTRE</span>
        </Link>
        <div className="nav-spacer" />
        <div className="nav-links">
          {NAV_ITEMS.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <Link href="/notes/" className="nav-notes">
            Notes
          </Link>
        </div>
        <Link href="/#access" className="btn btn-hard nav-cta" onClick={close}>
          {CTA}
        </Link>
        <button
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={17} strokeWidth={1.5} /> : <Menu size={17} strokeWidth={1.5} />}
        </button>
      </div>
      {open && (
        <div className="sheet">
          {NAV_ITEMS.map(([href, label]) => (
            <Link key={href} href={href} onClick={close}>
              {label}
            </Link>
          ))}
          <span className="sheet-label">SPECIALIST PAGES</span>
          {PRODUCTS.map((product) => (
            <Link key={product.slug} href={`/${product.slug}/`} onClick={close}>
              {product.name}
            </Link>
          ))}
          <Link href="/notes/" onClick={close}>
            Studio notes
          </Link>
          <Link href="/data/" onClick={close}>
            Data practices
          </Link>
          {/* The CTA never collapses out of reach (audit §2.9). */}
          <Link href="/#access" className="btn btn-hard" onClick={close}>
            {CTA}
          </Link>
        </div>
      )}
    </nav>
  );
}

export function Status({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}

export function Stamp({ children }: { children: ReactNode }) {
  return <div className="stamp">{children}</div>;
}

/* ── The approval gate ────────────────────────────────────────────────────
   The product thesis in miniature, and the interaction the audit found to be
   the worst on the site: the old build blacked the viewport out for 5.5s with
   no way to dismiss it, and pulsed a gold glow forever while you did nothing.

   What was good in it was the perimeter trace, so that is what survives —
   once, on the press, in ruby. The sequence: press (1px) → the trace runs the
   button's edge → the ruby rule draws through the payload → the stamp flips →
   a real log line appends beneath the card. Under 900ms, all of it on the
   card. No overlay, no dim, no loop.
   ───────────────────────────────────────────────────────────────────────── */

type Receipt = { time: string; what: string; state: string };

export function ApproveCard({
  payloads,
  accent = "var(--ruby)",
  stampTime = "18:45",
  onApprove,
}: {
  payloads: string[];
  accent?: string;
  stampTime?: string;
  onApprove?: () => void;
}) {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"ready" | "tracing" | "done">("ready");
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const log = () => {
    const minute = String(46 + receipts.length).padStart(2, "0");
    setReceipts((r) => [
      ...r,
      {
        time: `18:${minute}`,
        what: ["14 items released", "9 items released", "6 items released"][
          r.length % 3
        ],
        state: "approved by you",
      },
    ]);
  };

  const approve = () => {
    if (phase !== "ready") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      log();
      onApprove?.();
      return;
    }
    setPhase("tracing");
    timers.current.push(
      setTimeout(() => {
        setPhase("done");
        log();
        onApprove?.();
      }, 640),
    );
  };

  const armed = phase !== "ready";
  const done = phase === "done";

  return (
    <div
      className={`approve ${armed ? "is-armed" : ""} ${
        phase === "tracing" ? "is-tracing is-flipping" : ""
      }`}
      style={{ "--seat-accent": accent } as CSSProperties}
    >
      <span className="approve-stamp">
        {done ? "EXECUTED · LOGGED" : "STAGED · AWAITING YOUR TAP"}
      </span>
      <div className="approve-payload">{payloads[i]}</div>
      <span className="approve-actions">
        {!done ? (
          <button className="btn btn-hard approve-btn" onClick={approve}>
            Approve
          </button>
        ) : (
          <button
            className="btn btn-soft approve-btn"
            onClick={() => {
              setPhase("ready");
              setI((i + 1) % payloads.length);
            }}
          >
            Stage another
          </button>
        )}
        {/* The perimeter trace, drawn once on the press. An SVG stroke
            rather than a conic gradient: deterministic at any size, and it
            never repaints a layer larger than the button itself. */}
        <svg className="approve-trace" aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none">
          <rect x="1" y="1" width="98" height="38" rx="19" pathLength={1} />
        </svg>
      </span>
      <p className="approve-note">
        {done
          ? "THIS IS WHERE SPECTRE STOPPED AND YOUR JUDGMENT STARTED."
          : `${stampTime} · STAGED BY THE SYSTEM · NOTHING RUNS WITHOUT YOU`}
      </p>

      {/* The payoff: the audit trail appearing, one line per approval.
          The live region is this list only — never the whole card. */}
      {receipts.length > 0 && (
        <ul className="approve-receipt" aria-live="polite">
          {receipts.map((r) => (
            <li key={r.time}>
              <span>{r.time}</span>
              <b>{r.what}</b>
              <i>{r.state}</i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Footer ───────────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap" style={{ paddingBottom: 64 }}>
        <div className="footer-top">
          <div>
            <Mark height={22} style={{ marginBottom: 12, color: "var(--ink)" }} />
            <div className="wordmark" style={{ marginBottom: 10 }}>
              THE&nbsp;SPECTRE
            </div>
            <div className="stamp">
              <span>
                A HOUSE OF DOTONE COMPANY{" "}
                <span style={{ color: "var(--accent-text)" }}>◆</span>
              </span>
            </div>
          </div>
          <div className="footer-links">
            {PRODUCTS.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`}>
                {p.short}
              </Link>
            ))}
            <Link href="/notes/">Notes</Link>
            <Link href="/data/">Data practices</Link>
          </div>
        </div>
        <p className="footer-fine">
          Nothing on this site shows client data. Every demo runs on generated,
          fictional datasets. Every shipped number carries an as-of date.
        </p>
        <p className="footer-fine" style={{ marginTop: 14 }}>
          Working with the studio —{" "}
          <a href="mailto:access@thespectre.one" style={{ color: "var(--ghost)" }}>
            access@thespectre.one
          </a>
        </p>
      </div>
    </footer>
  );
}
