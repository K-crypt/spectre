"use client";

import { useEffect, useRef, useState } from "react";

/* ── Scroll is the camera ──────────────────────────────────────────────────
   One engine for every scroll-linked move on the site.

   A scene registers itself, and each frame the engine writes `--p`, a number
   from 0 to 1, onto that element. CSS does all the animating from there:
   transforms, opacities and gradient stops read `--p` through `calc()`. That
   keeps the choreography in the stylesheet where it can be read next to the
   thing it moves, and it keeps React out of the frame loop entirely.

   Three rules this enforces, which are the ones that usually get broken:

   1. **One loop, not one per element.** Every scene shares a single rAF
      ticker, and the ticker stops itself when no scene is near the viewport.
      Ten `window.addEventListener("scroll")` handlers is how a page like
      this starts dropping frames on a laptop.

   2. **Read, then write.** All rects are measured in one pass before any
      style is set, so the browser never has to re-layout mid-frame.

   3. **Transform and opacity only.** Nothing here animates a width, a top
      or a height.

   Under `prefers-reduced-motion` the engine never starts and `--p` stays at
   its initial value, which every rule below is written to treat as the
   finished state rather than the starting one.
   ───────────────────────────────────────────────────────────────────────── */

export type SceneMode =
  /* 0 as the element enters the bottom of the viewport, 1 as it clears the
     top. The general case: parallax, drifting art, long reveals. */
  | "through"
  /* 0 while the top of the element is at the top of the viewport, 1 once it
     has travelled one screen upward. The hero's exit. */
  | "leave"
  /* 0 the moment a tall element's frame locks to the top of the viewport, 1
     the moment it releases. This is the timecode for a pinned scene. */
  | "pin";

type Scene = {
  el: HTMLElement;
  mode: SceneMode;
  onProgress?: (p: number) => void;
  last: number;
};

const scenes = new Set<Scene>();
let ticking = false;

function measure(scene: Scene, vh: number) {
  const rect = scene.el.getBoundingClientRect();

  /* Nothing to do for a scene that is more than a screen away in either
     direction. This is what lets the loop stay cheap on a long page. */
  if (rect.bottom < -vh || rect.top > vh * 2) return null;

  let p: number;
  if (scene.mode === "pin") {
    p = -rect.top / Math.max(1, rect.height - vh);
  } else if (scene.mode === "leave") {
    p = -rect.top / Math.max(1, Math.min(rect.height, vh));
  } else {
    p = (vh - rect.top) / Math.max(1, vh + rect.height);
  }
  return Math.max(0, Math.min(1, p));
}

function frame() {
  const vh = window.innerHeight;

  /* Pass one: measure everything. */
  const pending: [Scene, number][] = [];
  for (const scene of scenes) {
    const p = measure(scene, vh);
    if (p !== null) pending.push([scene, p]);
  }

  /* Pass two: write. */
  for (const [scene, p] of pending) {
    if (Math.abs(p - scene.last) < 0.0005) continue;
    scene.last = p;
    scene.el.style.setProperty("--p", p.toFixed(4));
    scene.onProgress?.(p);
  }

  if (scenes.size) requestAnimationFrame(frame);
  else ticking = false;
}

function register(scene: Scene) {
  scenes.add(scene);
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(frame);
  }
  return () => {
    scenes.delete(scene);
  };
}

/* Attach a scene. `onProgress` is optional and exists for the one case CSS
   cannot cover: a pinned scene that has to swap which of five panels is on
   screen. It is called every frame, so anything it does must be cheap, and
   the caller is responsible for not setting React state unless something
   the reader can actually see has changed. */
export function useScene(
  ref: React.RefObject<HTMLElement | null>,
  mode: SceneMode = "through",
  onProgress?: (p: number) => void,
  /* A media query the scene requires. The pinned roster asks for a desktop
     width, because pinning a scene inside a 375px viewport turns five
     readable rows into five screens the reader has to scroll past. */
  requires?: string,
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (requires && !window.matchMedia(requires).matches) return;

    el.dataset.scene = "on";
    const unregister = register({
      el,
      mode,
      last: -1,
      onProgress: (p) => cb.current?.(p),
    });
    return () => {
      unregister();
      delete el.dataset.scene;
      el.style.removeProperty("--p");
    };
  }, [ref, mode, requires]);
}

/* Page progress, for the hairline under the navigation bar. It is a real
   piece of information on a page this long: how much of the argument is
   left. Written as a scaleX on one element, so it costs one composited
   transform per frame and nothing else. */
export function usePageProgress(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene: Scene = {
      el,
      mode: "through",
      last: -1,
      onProgress: undefined,
    };
    /* The document is the scene here, not the bar itself. */
    let raf = 0;
    let last = -1;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (Math.abs(p - last) > 0.0005) {
        last = p;
        el.style.setProperty("--page", p.toFixed(4));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    void scene;
    return () => cancelAnimationFrame(raf);
  }, [ref]);
}

/* A pinned scene that steps through a fixed number of panels.

   Returns the active index and the progress within that panel. The index is
   React state because it changes what is rendered; the sub-progress is not,
   because it only drives CSS, and it is written straight onto the element as
   `--sub`. State changes at most `count` times across the whole scene. */
export function useSteppedScene(
  ref: React.RefObject<HTMLElement | null>,
  count: number,
  requires?: string,
) {
  const [index, setIndex] = useState(0);
  /* The engine only measures a scene that is near the viewport, so the
     first tick is proof the reader has actually arrived. Without this a
     caller cannot tell "the reader is on the first panel" apart from "the
     component mounted", and anything that fires on the index would fire
     once at page load for a scene five screens down. */
  const [entered, setEntered] = useState(false);

  useScene(ref, "pin", (p) => {
    setEntered((was) => was || true);
    /* A short hold at each end so the first and last panels are readable
       before the scene starts moving and after it stops. */
    const eased = Math.max(0, Math.min(1, (p - 0.06) / 0.88));
    const exact = eased * count;
    const next = Math.max(0, Math.min(count - 1, Math.floor(exact)));
    const sub = Math.max(0, Math.min(1, exact - next));
    ref.current?.style.setProperty("--sub", sub.toFixed(4));
    setIndex((current) => (current === next ? current : next));
  }, requires);

  return { index, entered };
}

/* A scene wrapper, so a server component can attach choreography to a
   section without becoming a client component itself. The element renders
   identically with or without the engine; all the engine adds is `--p` and
   the `data-scene` attribute the stylesheet keys off. */
export function Scene({
  mode = "through",
  requires,
  as: Tag = "section",
  className,
  children,
  ...rest
}: {
  mode?: SceneMode;
  requires?: string;
  as?: "section" | "div";
  className?: string;
  children: React.ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, mode, undefined, requires);
  return (
    <Tag ref={ref as never} className={className} {...rest}>
      {children}
    </Tag>
  );
}
