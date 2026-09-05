"use client";

import { useRef, useState } from "react";
import ApproveButton from "@/components/ApproveButton";
import { useScene } from "@/components/shell/scroll-scene";
import { Words, Reveal } from "@/components/shell/reveal";
import { withBasePath } from "@/lib/base-path";

/* ── One working day, panned sideways ──────────────────────────────────────
   The argument of the whole site, compressed: the system works from before
   you arrive until after you leave, and it asks for you exactly once.

   The section runs horizontally. Scrolling down moves the day left to right
   through its hours, which is the axis a day actually has, and it is a
   different device from the pinned scene above it so the page does not
   repeat itself.

   The travel is one line of CSS rather than a measured pixel value:
   `translateX(calc(var(--p) * (100vw - 100%)))`. A percentage in translateX
   resolves against the element's own width, so at `--p` 1 the track has
   moved exactly far enough to bring its right edge to the right edge of the
   viewport, whatever the panels add up to. Nothing has to be measured in
   JavaScript and nothing breaks when the copy changes length.

   Below 1000px, and under `prefers-reduced-motion`, the scene never
   registers and the track becomes a plain vertical list of the same four
   beats. The approval still works there, because it is the point.
   ───────────────────────────────────────────────────────────────────────── */

const WIDE = "(min-width: 1000px)";

const BEATS = [
  {
    time: "07:10",
    what: "The world is read.",
    note: "Overnight mail, orders, plant state and calendars, gathered before anyone opens a laptop.",
  },
  {
    time: "10:30",
    what: "The decision is prepared.",
    note: "Drafts written, an order tested against real capacity, the research legwork already done.",
  },
  {
    time: "18:45",
    what: "You approve one batch.",
    note: null,
    yours: true,
  },
  {
    time: "19:00",
    what: "Your evening is still yours.",
    note: "Nothing waits for you overnight, because nothing ran without you.",
  },
];

export function Day() {
  const [approved, setApproved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, "pin", undefined, WIDE);

  return (
    <div className="pan" ref={ref}>
      <div className="pan-pin">
        {/* An open plateau at first light. Barely there: the day is about
            time passing, and the one thing behind it should be a place with
            a long horizon rather than a picture asking to be looked at. */}
        <div className="pan-art" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/plate-hr-1536.webp")}
            srcSet={`${withBasePath("/plate-hr-1024.webp")} 1024w, ${withBasePath("/plate-hr-1536.webp")} 1536w`}
            sizes="100vw"
            width={1536}
            height={768}
            loading="lazy"
            decoding="async"
            alt=""
          />
        </div>
        <div className="wrap pan-head">
          <Words
            id="day-title"
            className="display-lg"
            lines={["Spectre works all day.", "You touch it once."]}
          />
        </div>

        <div className="pan-track">
          {BEATS.map((b) => (
            <article
              key={b.time}
              className={`pan-panel${b.yours ? " is-yours" : ""}`}
            >
              <p className="mono pan-time">{b.time}</p>
              <p className="display display-md pan-what">{b.what}</p>
              {b.note ? <p className="pan-note">{b.note}</p> : null}

              {/* The one object on the page with any weight: the prepared
                  work, and the boundary it stops at. */}
              {b.yours ? (
                <div className="approve pan-approve">
                  <p className="approve-payload">
                    14 items, prepared and logged. Nothing has run.
                  </p>
                  <ApproveButton
                    onApprove={() => setApproved(true)}
                    doneLabel="Released"
                  />
                  <p className="mono approve-note" aria-live="polite">
                    {approved
                      ? "18:46 RELEASED BY YOU. LOGGED."
                      : "18:45 STAGED BY THE SYSTEM."}
                  </p>
                </div>
              ) : null}

            </article>
          ))}
        </div>

        <div className="wrap">
          <Reveal>
            <p className="stamp pan-foot">
              Scripted showcase. Fictional data. The rhythm is real.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
