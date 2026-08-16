"use client";

/* THE DAY — the landing's spine. A single working day on a time rail:
   artifacts appear hour by hour, each staged by one specialist; the visitor
   themself taps the one 18:45 Approve — the product's core mechanic, lived.
   Fictional data by law; the rail says so. Static and complete under
   prefers-reduced-motion (everything visible, the tap still works). */

import Link from "next/link";
import { useState } from "react";

const DOT: Record<string, string> = {
  pa: "var(--spectral)",
  coo: "var(--steel)",
  cmo: "var(--clay)",
  researcher: "var(--archive)",
  hr: "var(--ochre)",
};

function Beat({
  time,
  who,
  slug,
  title,
  children,
  you = false,
}: {
  time: string;
  who?: string;
  slug?: string;
  title: string;
  children?: React.ReactNode;
  you?: boolean;
}) {
  return (
    <div className={`beat ${you ? "beat-you" : ""}`}>
      <div className="beat-rail">
        <span className="mono beat-time">{time}</span>
        <span className="beat-dot" style={you ? { background: "var(--ink)" } : slug ? { background: DOT[slug] } : {}} />
      </div>
      <div className="beat-body">
        <div className="beat-head">
          {who && slug ? (
            <Link href={`/${slug}/`} className="mono beat-who">
              {who}
            </Link>
          ) : (
            <span className="mono beat-who beat-who-you">{who ?? "YOU"}</span>
          )}
          <span className="beat-title">{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function ApproveMoment() {
  const [done, setDone] = useState(false);
  return (
    <div className={`card approve-moment ${done ? "is-done" : ""}`}>
      {!done ? (
        <>
          <div className="stamp" style={{ marginBottom: 10 }}>STAGED · AWAITING THE ONLY TAP OF THE DAY</div>
          <p style={{ fontSize: 14.5, margin: "0 0 14px" }}>
            One batch needs you: tomorrow&apos;s post, 12 replies in your voice,
            one purchase list. 14 items, prepared and logged.
          </p>
          <button className="btn btn-hard" onClick={() => setDone(true)}>
            Approve
          </button>
          <div className="mono" style={{ fontSize: 10, color: "var(--ghost)", marginTop: 12 }}>
            THIS IS WHERE SPECTRE STOPS AND YOUR JUDGMENT STARTS.
          </div>
        </>
      ) : (
        <>
          <div className="stamp" style={{ marginBottom: 10 }}>EXECUTED · 18:46</div>
          <p style={{ fontSize: 14.5, margin: "0 0 6px" }}>
            Published. Sent. Ordered. Logged — every action, attributable, reversible
            where reversal exists.
          </p>
          <div className="mono" style={{ fontSize: 10, color: "var(--ghost)", marginTop: 10 }}>
            THE SYSTEM FILES EVERYTHING BACK. TOMORROW IT IS SLIGHTLY BETTER.
          </div>
        </>
      )}
    </div>
  );
}

export function Day() {
  return (
    <div className="day">
      <div className="mono day-label">A DAY, DEMONSTRATED · FICTIONAL DATA · THE RHYTHM IS REAL</div>

      <Beat time="07:10" who="AI PA" slug="pa" title="Your inbox, triaged before you wake.">
        <ul className="beat-list">
          <li>41 messages read · 3 need your judgment</li>
          <li>2 replies drafted in your voice, staged</li>
          <li>1 meeting clash found — a fix is proposed</li>
        </ul>
      </Beat>

      <Beat time="08:00" who="AI CMO" slug="cmo" title="The numbers, computed and narrated.">
        <div className="beat-stats mono">
          <span>REACH ▲ 12%</span>
          <span>1 ANOMALY FLAGGED</span>
          <span>14 ITEMS RAN CLEAN</span>
        </div>
      </Beat>

      <Beat time="09:00" you title="Your first appearance: four minutes.">
        <p className="beat-note">You read the digest with your coffee. Two decisions. Both took one line.</p>
      </Beat>

      <Beat time="10:30" who="AI COO" slug="coo" title="A rush order lands. It is simulated before lunch.">
        <div className="beat-feas">
          <span className="mono ok">FEASIBLE</span>
          <span>one bottleneck on line 2 · purchase list staged · nothing ordered yet</span>
        </div>
      </Beat>

      <Beat time="12:00" who="AI RESEARCHER" slug="researcher" title="The study checks itself.">
        <p className="beat-note">
          Chapter 4 re-verified against sources. Two claims corrected before you ever saw them.
        </p>
      </Beat>

      <Beat time="15:00" who="AI HR" slug="hr" title="People work, remembered.">
        <p className="beat-note">Two appraisal summaries staged from the available record, with gaps flagged for review.</p>
      </Beat>

      <Beat time="18:45" you title="The only tap of the day.">
        <ApproveMoment />
      </Beat>

      <div className="day-close">
        <span className="mono beat-time" style={{ opacity: 0.6 }}>19:00</span>
        <p className="display day-close-line">Your evening. Still yours.</p>
      </div>
    </div>
  );
}
