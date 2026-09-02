"use client";

/* THE DAY — the landing's spine, cut from six beats to three.
   Six beats restated the Executive Room's argument at four times the length
   (audit §2.6); the room already carries "one context, five specialists", so
   the day only has to carry the rhythm: work arrives prepared, work gets
   tested, and exactly one moment belongs to you.
   Fictional data by law; the rail says so. Static and complete under
   prefers-reduced-motion — everything visible, and the tap still works. */

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import ApproveButton from "@/components/ApproveButton";

const DOT: Record<string, string> = {
  pa: "var(--spectral)",
  coo: "var(--steel)",
  cmo: "var(--clay)",
  researcher: "var(--archive)",
  hr: "var(--ochre)",
};

function Beat({
  index,
  time,
  who,
  slug,
  title,
  children,
  you = false,
}: {
  /* The scroll advances the beats; each one carries its own place in the
     sequence so the CSS can derive its arrival from the chapter's --p. */
  index: number;
  time: string;
  who?: string;
  slug?: string;
  title: string;
  children?: ReactNode;
  you?: boolean;
}) {
  return (
    <div
      className={`beat ${you ? "beat-you" : ""}`}
      style={{ "--i": index } as CSSProperties}
    >
      <div className="beat-rail">
        <span className="mono beat-time">{time}</span>
        <span
          className="beat-dot"
          style={!you && slug ? { background: DOT[slug] } : undefined}
        />
      </div>
      <div className="beat-body">
        <div className="beat-head">
          {who && slug ? (
            <Link href={`/${slug}/`} className="mono beat-who">
              {who}
            </Link>
          ) : (
            <span className="mono beat-who">{who ?? "YOU"}</span>
          )}
          <span className="beat-title">{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Day() {
  const [approved, setApproved] = useState(false);
  return (
    <div className={`day ${approved ? "is-approved" : ""}`}>
      <span className="day-rail" aria-hidden />
      <div className="mono day-label">
        A DAY, DEMONSTRATED · FICTIONAL DATA · THE RHYTHM IS REAL
      </div>

      <Beat
        index={1}
        time="07:10"
        who="AI PA"
        slug="pa"
        title="Your inbox, triaged before you wake."
      >
        <ul className="beat-list">
          <li>41 messages read · 3 need your judgment</li>
          <li>2 replies drafted in your voice, staged</li>
        </ul>
      </Beat>

      <Beat
        index={2}
        time="10:30"
        who="AI COO"
        slug="coo"
        title="A rush order lands. It is tested before lunch."
      >
        <p className="beat-note">
          Feasible, with one bottleneck on line 2. Purchase list staged,
          schedule revised, nothing ordered.
        </p>
      </Beat>

      <Beat index={3} time="18:45" you title="The only tap of the day.">
        <div className="approve">
          <span className="approve-stamp">STAGED · AWAITING YOUR TAP</span>
          <p className="approve-payload">
            One batch needs you: tomorrow&rsquo;s post, 12 replies in your voice,
            one purchase list. 14 items, prepared and logged.
          </p>
          <ApproveButton onApprove={() => setApproved(true)} doneLabel="Executed" />
          <p className="approve-note" aria-live="polite">
            {approved
              ? "18:46 · APPROVED BY YOU · EXECUTED · LOG APPENDED"
              : "18:45 · STAGED BY THE SYSTEM · NOTHING RUNS WITHOUT YOU"}
          </p>
        </div>
      </Beat>

      {/* The payoff of the only tap of the day: once it is approved, this is
          the line that lights. It is the whole argument in four words. */}
      <div className="day-close">
        <span className="mono beat-time" style={{ opacity: 0.6 }}>
          19:00
        </span>
        <p className="display day-close-line">Your evening. Still yours.</p>
      </div>
    </div>
  );
}
