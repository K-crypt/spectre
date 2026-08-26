"use client";

import { useEffect } from "react";

/* A restrained desktop-only inertia layer. Touch, keyboard, nested panels and
   reduced-motion users keep the browser's native scrolling behavior. */
export function PremiumScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reduceMotion.matches || !finePointer.matches) return;

    let current = window.scrollY;
    let target = current;
    let frame = 0;
    let running = false;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clamp = (value: number) => Math.max(0, Math.min(maxScroll(), value));

    const isNestedScroller = (targetNode: EventTarget | null) => {
      let element = targetNode instanceof Element ? targetNode : null;
      while (element && element !== document.body) {
        const style = window.getComputedStyle(element);
        const scrollable = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 2;
        if (scrollable) return true;
        element = element.parentElement;
      }
      return false;
    };

    const settle = () => {
      const distance = target - current;
      current += distance * 0.115;
      window.scrollTo(0, current);
      if (Math.abs(distance) > 0.45) {
        frame = window.requestAnimationFrame(settle);
      } else {
        current = target;
        window.scrollTo(0, target);
        running = false;
        frame = 0;
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || isNestedScroller(event.target)) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      if (!running) {
        current = window.scrollY;
        target = current;
        running = true;
      }
      const delta = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * 16 : event.deltaY;
      target = clamp(target + delta * 0.92);
      if (!frame) frame = window.requestAnimationFrame(settle);
    };

    const onNativeScroll = () => {
      if (!running) {
        current = window.scrollY;
        target = current;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onNativeScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
