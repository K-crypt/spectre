'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

/* The original approval button, kept because the perimeter trace was the
   best thing on the old site. One change: the full-viewport blackout it used
   to trigger is gone. That overlay sat over the whole page for 5.5 seconds
   with `pointer-events: none`, so it could not be dismissed — the visitor
   simply waited it out, and if the button had scrolled out of view the
   blackout had no visible cause at all. Everything else here is as it was. */

interface ApproveButtonProps {
  label?: string;
  doneLabel?: string;
  onApprove?: () => void;
}

export default function ApproveButton({
  label = 'Approve',
  doneLabel = 'Done',
  onApprove,
}: ApproveButtonProps) {
  const [state, setState] = useState<'idle' | 'approving' | 'done'>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /* The idle pulse is the one looping animation left on the site, and it is
     here because the owner asked for this button back as it was. It now
     pauses whenever the button is off screen — identical while you are
     looking at it, and nothing running while you are not. */
  useEffect(() => {
    const el = btn.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleClick = useCallback(() => {
    if (state !== 'idle') return;
    setState('approving');
    timers.current.push(setTimeout(() => {
      setState('done');
      onApprove?.();
    }, 280));
  }, [state, onApprove]);

  return (
    <>
      <button
        ref={btn}
        type="button"
        onClick={handleClick}
        disabled={state === 'done'}
        className={`approve-btn approve-btn--${state}`}
      >
        {state === 'done' ? (
          <span className="approve-check">✓ {doneLabel}</span>
        ) : (
          label
        )}
      </button>

      <style jsx>{`
        .approve-btn {
          position: relative;
          z-index: 30;
          overflow: hidden;
          isolation: isolate;
          padding: 0.85rem 1.75rem;
          border-radius: 8px;
          border: 1px solid rgba(232, 180, 90, 0.35);
          background: rgba(20, 18, 14, 0.9);
          color: #f0e6d2;
          font-size: 0.95rem;
          cursor: pointer;
          transition: box-shadow 0.4s ease, transform 0.2s ease;
          animation: pulseGlow 3.2s ease-in-out infinite;
        }
        .approve-btn:hover {
          transform: translateY(-1px);
        }
        .approve-btn--approving {
          animation: none;
          box-shadow: 0 0 0 6px rgba(232, 180, 90, 0.22),
            0 0 32px rgba(232, 180, 90, 0.55);
        }
        .approve-btn--done {
          border-color: transparent;
          background: #15110d;
          color: #f6e5be;
          cursor: default;
          animation: none;
          box-shadow: 0 0 22px rgba(232, 180, 90, 0.18);
        }
        .approve-btn--done::before {
          content: "";
          position: absolute;
          inset: -90%;
          z-index: 0;
          --gold-trace: 0deg;
          background: conic-gradient(
            from 0deg,
            #d99b3f 0deg,
            #f2bd5e var(--gold-trace),
            transparent var(--gold-trace),
            transparent 360deg
          );
          animation: goldTrace 1.15s cubic-bezier(.35,.05,.3,1) 1 forwards;
        }
        .approve-btn--done::after {
          content: "";
          position: absolute;
          inset: 1px;
          z-index: 1;
          border-radius: 6px;
          background: linear-gradient(180deg, #19140f, #110e0b);
        }
        .approve-check {
          position: relative;
          z-index: 2;
          display: inline-flex;
          gap: 0.4em;
          text-shadow: 0 0 14px rgba(255, 220, 151, 0.42);
        }

        @property --gold-trace {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes goldTrace {
          to { --gold-trace: 360deg; }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(232, 180, 90, 0),
              0 0 12px rgba(232, 180, 90, 0.18);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(232, 180, 90, 0.12),
              0 0 22px rgba(232, 180, 90, 0.4);
          }
        }


        @media (prefers-reduced-motion: reduce) {
          .approve-btn {
            animation: none;
          }
          .approve-btn--approving {
            box-shadow: none;
          }
          .approve-btn--done {
            border-color: rgba(242, 189, 94, 0.7);
          }
          .approve-btn--done::before,
          .approve-btn--done::after {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
