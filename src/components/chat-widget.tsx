"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { Mark } from "@/components/mark";
import { personaForPath, FREE_TEXT, type Persona, type QA } from "@/lib/chat-content";

type Msg = { who: "bot" | "user"; text: string };

/* threads survive client-side navigation per persona (reset on hard reload) */
const THREADS = new Map<string, Msg[]>();

function Avatar({ accent }: { accent: string }) {
  return (
    <span
      style={{
        width: 26, height: 26, borderRadius: "50%", border: "1px solid var(--hairline)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: accent, flexShrink: 0, background: "var(--surface)",
      }}
    >
      <Mark height={9} />
    </span>
  );
}

function Bubble({ msg, accent, typing }: { msg: Msg; accent: string; typing?: boolean }) {
  const isBot = msg.who === "bot";
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: isBot ? "flex-start" : "flex-end", alignItems: "flex-end" }}>
      {isBot && <Avatar accent={accent} />}
      <div
        style={{
          maxWidth: "82%", fontSize: 13, lineHeight: 1.55, padding: "9px 12px",
          borderRadius: isBot ? "10px 10px 10px 3px" : "10px 10px 3px 10px",
          background: isBot ? "var(--surface-2)" : accent,
          color: isBot ? "var(--ink)" : "var(--ground)",
          border: isBot ? "1px solid var(--hairline)" : "none",
          whiteSpace: "pre-wrap",
        }}
      >
        {typing ? <span className="chat-dots"><i /><i /><i /></span> : msg.text}
      </div>
    </div>
  );
}

export function ChatWidget() {
  const pathname = usePathname();
  const persona: Persona = personaForPath(pathname ?? "/");
  /* Home follows the logo's contrast inversion (ink on ground); products use their accent */
  const accent = persona.id === "home" ? "var(--ink)" : persona.accent;
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* load / seed the thread whenever the persona changes */
  useEffect(() => {
    const existing = THREADS.get(persona.id);
    setMsgs(existing ?? [{ who: "bot", text: persona.greeting }]);
    setBusy(false);
  }, [persona.id, persona.greeting]);

  const close = () => {
    setOpen(false);
    setExpanded(false);
  };

  /* page change closes the panel */
  useEffect(() => {
    setOpen(false);
    setExpanded(false);
  }, [pathname]);

  /* click anywhere outside closes the panel; Escape too */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t && !t.closest(".chat-panel") && !t.closest(".chat-launcher") && !t.closest(".chat-label")) {
        setOpen(false);
        setExpanded(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    THREADS.set(persona.id, msgs);
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, persona.id]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function botReply(text: string) {
    setBusy(true);
    const t1 = setTimeout(() => {
      if (reduced) {
        setMsgs((m) => [...m, { who: "bot", text }]);
        setBusy(false);
        return;
      }
      /* word-streamed reveal */
      const words = text.split(" ");
      let i = 0;
      setMsgs((m) => [...m, { who: "bot", text: "" }]);
      const iv = setInterval(() => {
        i += 1;
        setMsgs((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { who: "bot", text: words.slice(0, i).join(" ") };
          return copy;
        });
        if (i >= words.length) {
          clearInterval(iv);
          setBusy(false);
        }
      }, 26);
      timers.current.push(iv as unknown as ReturnType<typeof setTimeout>);
    }, 650);
    timers.current.push(t1);
  }

  function ask(qa: QA) {
    if (busy) return;
    setMsgs((m) => [...m, { who: "user", text: qa.q }]);
    botReply(qa.a);
  }

  function sendFree(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !draft.trim()) return;
    setMsgs((m) => [...m, { who: "user", text: draft.trim() }]);
    setDraft("");
    botReply(FREE_TEXT);
  }

  const askedQs = new Set(msgs.filter((m) => m.who === "user").map((m) => m.text));
  const remaining = persona.qa.filter((x) => !askedQs.has(x.q));

  /* the discovery tooltip shows on EVERY landing (including refresh and
     returning to a page); it goes quiet only once the visitor interacts,
     and only for the current visit to that page — no storage, by design */
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    setSeen(false);
  }, [persona.id]);
  const openChat = () => {
    setOpen(!open);
    setSeen(true);
  };
  const label = persona.id === "home" ? "Ask the Spectre" : `Ask about ${persona.title}`;

  return (
    <>
      {/* discovery label — accent-tinted so it reads as the bot speaking */}
      {!open && !seen && (
        <button
          className="chat-label"
          onClick={openChat}
          style={{
            background: `color-mix(in srgb, ${accent} 9%, var(--surface))`,
            borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
          }}
        >
          {label}
        </button>
      )}

      {/* launcher — filled so it never blends away. Home runs the contrast
          inversion (ink on ground: white disc in dark mode, black in light);
          product pages fill with their accent. */}
      <button
        aria-label="Chat with The Spectre"
        onClick={openChat}
        className="chat-launcher"
        style={{
          background: accent,
          color: "var(--ground)",
          border: "none",
        }}
      >
        {open ? <X size={18} strokeWidth={1.5} /> : <Mark height={16} style={{ position: "relative", top: -0.5 }} />}
      </button>

      {/* scrim behind the expanded dialog */}
      {open && expanded && <div className="chat-scrim" onClick={close} aria-hidden />}

      {/* panel */}
      {open && (
        <div className={`chat-panel${expanded ? " chat-panel-x" : ""}`} role="dialog" aria-label={`${persona.title} chat preview`}>
          <div className="chat-head" style={{ borderBottom: `1px solid var(--hairline)` }}>
            <Avatar accent={accent} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{persona.title}</div>
              <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", letterSpacing: ".1em", textTransform: "uppercase" }}>
                {persona.subtitle}
              </div>
            </div>
            <button
              className="theme-btn"
              style={{ width: 28, height: 28 }}
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? "Collapse chat" : "Expand chat"}
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <Minimize2 size={13} strokeWidth={1.5} /> : <Maximize2 size={13} strokeWidth={1.5} />}
            </button>
            <span className="dot" style={{ background: accent, width: 6, height: 6 }} />
          </div>

          <div className="chat-thread" ref={scrollRef}>
            {msgs.map((m, i) => (
              <Bubble key={i} msg={m} accent={accent} />
            ))}
            {busy && msgs[msgs.length - 1]?.who === "user" && (
              <Bubble msg={{ who: "bot", text: "" }} accent={accent} typing />
            )}
          </div>

          {remaining.length > 0 && (
            <div className="chat-chips">
              {remaining.map((qa) => (
                <button key={qa.q} className="chip" onClick={() => ask(qa)} disabled={busy}>
                  {qa.q}
                </button>
              ))}
            </div>
          )}

          <form className="chat-input" onSubmit={sendFree}>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type anything…"
              aria-label="Message"
            />
            <button className="btn btn-hard" style={{ background: accent }} type="submit" disabled={busy}>
              Send
            </button>
          </form>
          <div className="mono chat-foot">
            PREVIEW · SET ANSWERS · THE LIVE VERSION RUNS ON THE REAL MODEL
          </div>
        </div>
      )}
    </>
  );
}
