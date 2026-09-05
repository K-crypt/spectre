"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { PRODUCTS_DATA } from "@/lib/products";
import { useSteppedScene } from "@/components/shell/scroll-scene";
import { Reveal, Words } from "@/components/shell/reveal";
import { withBasePath } from "@/lib/base-path";

/* ── The five systems, as a pinned scene ───────────────────────────────────
   The centre of the page, and the one place it takes the reader's scroll and
   spends it deliberately.

   The section is five screens tall. Its inner frame sticks to the top of the
   viewport for that whole distance, and each screen of scroll advances one
   system: the plate numeral changes, the panel swaps, and the motif for that
   system draws itself in as you move through it.

   Why pin rather than list. A list of five rows is scanned in two seconds
   and remembers nothing. Each of these systems has a name, a claim, three
   concrete capabilities and a real maturity status, and that is more than a
   row can hold. Pinning buys a full screen for each one without asking the
   reader to click into five pages first.

   The ground does not change. One plate, the cloud sea, for all five.

   Five photographs swapping per product read as arbitrary, because a
   picture changing carries a promise that it means something and those ones
   did not. So the picture holds still, and the change is carried entirely
   by the type: the name is clipped up out of its own rule and the rest is
   set under it in reading order. No colour, no curtain. The difference
   between five systems is what they say, and that is what moves.

   The index down the left is what a plate numeral used to be, doing more.
   A numeral told the reader they were on the second of five and nothing
   else. The index names all five, marks the one they are on, and jumps the
   scroll to any of the others, so a pinned scene stays something the reader
   steers rather than a ride they have to sit through.

   What it degrades to. Below 900px, and under `prefers-reduced-motion`, the
   scene never registers: the section collapses to its natural height, the
   frame stops sticking, and all five panels sit in the flow as a plain
   stacked list. Every fact stays on the page in every mode. The only thing
   that is lost is the choreography, which is the correct thing to lose.
   ───────────────────────────────────────────────────────────────────────── */

const DESKTOP = "(min-width: 900px)";

export function SystemsStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { index: active } = useSteppedScene(ref, PRODUCTS_DATA.length, DESKTOP);

  /* Land in the middle of the target system's screen, so the panel is
     settled rather than mid-transition. Routed through the site's one scroll
     engine when it is running, so the jump is eased like every other
     movement on the page instead of teleporting. */
  const jumpTo = useCallback((i: number) => {
    const el = ref.current;
    if (!el || el.dataset.scene !== "on") return;
    const travel = el.offsetHeight - window.innerHeight;
    const share = (i + 0.5) / PRODUCTS_DATA.length;
    const top = el.offsetTop + 0.06 * travel + share * 0.88 * travel;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(top, { duration: 1 });
    else window.scrollTo({ top, behavior: "auto" });
  }, []);

  return (
    <div className="stage" ref={ref}>
      <div
        className="stage-pin"
        style={
          {
            "--field": PRODUCTS_DATA[active]?.field,
            "--field-deep": PRODUCTS_DATA[active]?.fieldDeep,
          } as React.CSSProperties
        }
      >
        {/* One sky for all five. It holds still so the change can move. */}
        <div className="stage-sky" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/plate-pa-1536.webp")}
            srcSet={`${withBasePath("/plate-pa-1024.webp")} 1024w, ${withBasePath("/plate-pa-1536.webp")} 1536w`}
            sizes="100vw"
            width={1536}
            height={768}
            loading="lazy"
            decoding="async"
            alt=""
          />
        </div>

        <div className="wrap stage-inner">
          {/* The head lives inside the pinned frame rather than above it.
              Left in the flow it scrolls away in the first screen, and the
              reader then spends five screens inside a scene with no title
              on it. Pinned, it is the one fixed thing while the five
              systems move underneath. */}
          <div className="movement-head stage-head">
            <Words
              id="systems-title"
              className="display-lg"
              lines={["Five systems.", "One operating memory."]}
            />
            <Reveal delay={140}>
              <p className="lede">
                Each one takes a single seat&apos;s repeatable half. What any of
                them learns, the rest can use.
              </p>
            </Reveal>
          </div>

          <div className="stage-body">
            <nav className="stage-index" aria-label="The five systems">
              {PRODUCTS_DATA.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  className={`stage-index-item${
                    i === active ? " is-on" : i < active ? " is-done" : ""
                  }`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => jumpTo(i)}
                >
                  <span className="stage-index-rule" aria-hidden>
                    <span />
                  </span>
                  {p.short}
                  {/* Gold is a state. A system that the reader has passed
                      through is a system that has come online, and by the
                      end of the scene all five are lit. This is the
                      mechanism the 2026-09-04 teaser brief describes,
                      running in the page it was written for. */}
                  <span className="stage-index-live" aria-hidden />
                </button>
              ))}
            </nav>

            <div className="stage-panels">
              {PRODUCTS_DATA.map((p, i) => (
                <article
                  key={p.slug}
                  className={`stage-panel${i === active ? " is-on" : ""}`}
                  style={{ "--accent": p.accent } as React.CSSProperties}
                >
                  <h3 className="display display-lg stage-name">
                    <Link href={`/${p.slug}/`}>{p.name}</Link>
                  </h3>
                  <p className="stage-claim">{p.claim}</p>

                  {/* The three capabilities were already in products.ts and
                      were not on the home page at all before this. They are
                      the most concrete thing the site can say about each
                      system in one line. */}
                  <ul className="stage-does">
                    {p.bullets.map((b, li) => (
                      <li key={b} style={{ "--li": li } as React.CSSProperties}>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <p className="stage-foot">
                    <span className="dot" aria-hidden />
                    <span className="stamp">{p.status}</span>
                    <Link className="stamp stage-open" href={`/${p.slug}/`}>
                      Open {p.short}
                    </Link>
                  </p>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
