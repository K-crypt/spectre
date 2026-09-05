"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/* ── The one signature motion ──────────────────────────────────────────────
   Two forms of the same idea: something arrives because the reader brought
   it into view, not because a timer fired.

   The discipline that matters here is that content is visible by default.
   The server renders finished markup with no hidden state; the hiding class
   is applied on the client, before paint, and only when motion is actually
   allowed. A reader with JavaScript off, or a crawler, gets the whole page.
   A reader who has asked for reduced motion gets the whole page instantly.

   `useLayoutEffect` rather than `useEffect` is deliberate: it runs before
   the browser paints, so the element is never briefly drawn in its final
   position and then yanked back down to animate.
   ───────────────────────────────────────────────────────────────────────── */

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function useEnter<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  delay = 0,
  skip = false,
) {
  const [state, setState] = useState<"idle" | "pending" | "shown">("idle");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (skip) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Anything already on screen at first paint is above the fold. Animating
       it would mean the reader watches the hero assemble itself before they
       can read it, so it resolves immediately instead. */
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.92) {
      setState("shown");
      return;
    }

    setState("pending");
    let timer: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          timer = window.setTimeout(() => setState("shown"), delay);
        }
      },
      /* Resolve slightly before the element reaches the viewport, so a fast
         scroll never lands the reader on a blank section. */
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      if (timer) clearTimeout(timer);
      io.disconnect();
    };
  }, [ref, delay, skip]);

  return state;
}

/* Block reveal. Wrap a container, never the children of a bordered grid:
   revealing the contents of a framed panel draws the frame first and the
   reader watches an empty box wait to be filled. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  as?: ElementType;
} & Record<string, unknown>) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useEnter(ref, delay);
  return (
    <Tag
      ref={ref}
      className={["reveal", stagger && "stagger", state !== "idle" && state, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Word reveal, for display type only.

   Per word, never per character. Character-by-character reads as a template
   effect that happens to contain a sentence; words arriving in reading order
   read as a sentence being set, which is the point.

   Line breaks are authored rather than left to the wrap, so the rhythm is a
   decision. Each word is clipped by its own frame and rises out of it.
   ───────────────────────────────────────────────────────────────────────── */
export function Words({
  lines,
  className = "",
  as: Tag = "h2",
  id,
  lit = false,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  /* Lit headlines are not revealed on entry. They are illuminated word by
     word by the scroll position of the scene around them, which means the
     reader is reading them at the speed they are scrolling. Used once, on
     the manifesto, because it is the one line on the site worth slowing a
     reader down for. The word count goes on the root so the stylesheet can
     do the arithmetic. */
  lit?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const state = useEnter(ref, 0, lit);
  const total = lines.reduce((sum, line) => sum + line.split(" ").length, 0);
  let n = 0;

  return (
    <Tag
      ref={ref}
      id={id}
      style={lit ? ({ "--n": total } as CSSProperties) : undefined}
      className={[
        "display",
        "words",
        lit && "words-lit",
        !lit && state !== "idle" && state,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {lines.map((line) => {
        const words = line.split(" ");
        return (
          <span key={line} style={{ display: "block" }}>
            {words.map((word, wi) => {
              const i = n++;
              return (
                <span key={`${word}-${i}`}>
                  <span className="w" style={{ "--i": i } as CSSProperties}>
                    <span>{word}</span>
                  </span>
                  {/* The gap between words sits outside the clipping frame.
                      Inside it, the space would be clipped along with the
                      word and the line would set solid. */}
                  {wi < words.length - 1 ? " " : null}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
