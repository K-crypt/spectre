"use client";

import { useState } from "react";
import { UserRound, Clock3, Brain, Coins, Hand, TrendingUp } from "lucide-react";
import { PRODUCTS_DATA as PRODUCTS } from "@/lib/products";

/* ── the comparison centerpiece: pick a task, three columns fill.
      The Spectre column is the raised, brass-marked highlight. ── */
const TASKS = {
  "a weekly performance report": {
    you: ["You do it yourself, after hours", "Your next free evening", "It lives in your head", "Your evenings, every week", "Total, because it is you", "Mostly your fatigue"],
    agency: ["Their junior team does it", "About a week, plus a briefing call", "Re-explained every quarter", "A retainer that never ends", "You get a monthly summary", "Their case-study page"],
    spectre: ["Your system runs it overnight", "Waiting for you at 8 a.m.", "It compounds with every report", "A system you keep", "Every number waits for your tap", "Your own second brain"],
  },
  "50 personalized outreach drafts": {
    you: ["You write each one yourself", "A lost weekend", "Buried in your sent folder", "Your weekend, gone", "Total, but exhausting", "Fatigue, again"],
    agency: ["A template with mail-merge", "A week, then revisions", "Your voice, approximated", "Fees per campaign", "You review a sample", "Their swipe file"],
    spectre: ["Drafted one by one, in your voice", "Staged and ready by morning", "Every reply is remembered", "A system you keep", "Each send waits for your approval", "Your outreach memory"],
  },
  "a new-market feasibility study": {
    you: ["You do it between meetings", "A month of evenings", "Twelve open tabs", "A month of your attention", "Total, in theory", "A folder you will lose"],
    agency: ["A consulting team", "Six weeks and a deck", "Handed over, then forgotten", "A five-figure invoice", "You get a final readout", "Their credentials slide"],
    spectre: ["Agent fleets, at machine depth", "Days, and verified twice", "Filed into your own library", "A system you keep", "Every claim is sourced for you", "A library you own forever"],
  },
} as const;

const ROWS = [
  { label: "Who does it", Icon: UserRound },
  { label: "How long it takes", Icon: Clock3 },
  { label: "Where the context lives", Icon: Brain },
  { label: "What it costs you", Icon: Coins },
  { label: "How much control you keep", Icon: Hand },
  { label: "What compounds", Icon: TrendingUp },
];

export function Comparison() {
  const keys = Object.keys(TASKS) as (keyof typeof TASKS)[];
  const [task, setTask] = useState<keyof typeof TASKS>(keys[0]);
  const t = TASKS[task];
  return (
    <div className="cmp-panel">
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20, position: "relative" }}>
        {keys.map((k) => (
          <button key={k} className="chip" data-on={k === task} onClick={() => setTask(k)}>
            {k}
          </button>
        ))}
      </div>
      <div style={{ overflowX: "auto", position: "relative" }}>
        <table className="cmp-table">
          <thead>
            <tr>
              <th />
              <th className="stamp" style={{ fontSize: 10 }}>Yourself</th>
              <th className="stamp" style={{ fontSize: 10 }}>An agency</th>
              <th className="stamp cmp-us" style={{ fontSize: 10 }}>The Spectre</th>
            </tr>
          </thead>
          <tbody key={task} className="cmp-swap">
            {ROWS.map(({ label, Icon }, i) => (
              <tr key={label}>
                <td>
                  <span className="cmp-rowlabel">
                    <Icon size={13} strokeWidth={1.5} />
                    {label}
                  </span>
                </td>
                <td>{t.you[i]}</td>
                <td>{t.agency[i]}</td>
                <td className="cmp-us">{t.spectre[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 20, position: "relative" }}>
        <p style={{ fontSize: 14, color: "var(--ghost)", flex: "1 1 320px" }}>
          It is the same task every time. The difference is what you are left holding:
          an invoice, or a system that keeps getting better.
        </p>
        <a href="#access" className="btn btn-hard" style={{ padding: "11px 18px" }}>
          Discuss a design partnership
        </a>
      </div>
    </div>
  );
}

/* ── design-partner enquiry (Netlify Forms; static-export friendly) ── */
export function WaitlistForm({ preselect }: { preselect?: string }) {
  const [picked, setPicked] = useState<string[]>(preselect ? [preselect] : []);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  function toggle(slug: string) {
    setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("products", picked.join(", "));
    setState("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="card" style={{ padding: 24, maxWidth: 560 }}>
        <div className="stamp" style={{ marginBottom: 8 }}>RECEIVED</div>
        <p style={{ fontSize: 14 }}>
          Thank you. We&apos;ll review the operation you described and reply personally within 48 hours.
        </p>
      </div>
    );

  return (
    <form
      name="design-partner"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      style={{ maxWidth: 560 }}
    >
      <input type="hidden" name="form-name" value="design-partner" />
      <p style={{ display: "none" }}>
        <label>Don&apos;t fill this out: <input name="bot-field" /></label>
      </p>
      <div className="mono form-label">WHERE SHOULD THE OPERATING LAYER START?</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        {PRODUCTS.map((p) => (
          <button
            key={p.slug}
            type="button"
            className="chip"
            data-on={picked.includes(p.slug)}
            onClick={() => toggle(p.slug)}
          >
            {p.short}
          </button>
        ))}
      </div>
      <input type="hidden" name="products" value={picked.join(", ")} />
      <label className="field-label" htmlFor="design-company">Company or website</label>
      <input id="design-company" type="text" name="company" required autoComplete="organization" placeholder="Company name" />
      <label className="field-label" htmlFor="design-email">Work email</label>
      <input id="design-email" type="email" name="email" required autoComplete="email" placeholder="you@company.com" />
      <label className="field-label" htmlFor="design-first">Which operation should we understand first?</label>
      <input id="design-first" type="text" name="first" required placeholder="For example: order feasibility before commitment" />
      <div className="form-submit-row">
        <span className="mono form-submit-note">ALL REQUIRED FIELDS COMPLETE BEFORE SUBMISSION</span>
        <input
          type="hidden"
          name="source"
          value="website-private-working-session"
        />
        <button className="btn btn-hard" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Request a private working session"}
        </button>
      </div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--ghost)", marginTop: 12 }}>
        No automated sales sequence. We reply within 48 hours, personally.
        {state === "error" && " · Something failed — email us instead: access@thespectre.one"}
      </div>
    </form>
  );
}
