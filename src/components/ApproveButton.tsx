'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

/* ── The approval ─────────────────────────────────────────────────────────
   The one control on the site where a person, not the system, causes
   something to happen. It is built as an operating event rather than a
   button style: press, a single gold line crosses it left to right, the
   label says what is happening, and it resolves to a mark that stays.

   Two changes from the version this replaces. The infinite pulse is gone —
   a control that glows while nobody is looking at it is ambient decoration,
   and under this system stillness is what "ready" looks like; the gold now
   moves only while the approval is actually resolving. And the press has
   real depression, because a consequential control should answer the finger.

   States: idle → pressed → approving → approved. Disabled is handled by the
   caller. Under prefers-reduced-motion the line does not travel; the states
   still change, so the meaning survives.
   ───────────────────────────────────────────────────────────────────────── */

interface ApproveButtonProps {
  label?: string;
  doneLabel?: string;
  onApprove?: () => void;
  disabled?: boolean;
}

export default function ApproveButton({
  label = 'Approve',
  doneLabel = 'Approved',
  onApprove,
  disabled = false,
}: ApproveButtonProps) {
  const [state, setState] = useState<'idle' | 'approving' | 'done'>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleClick = useCallback(() => {
    if (state !== 'idle' || disabled) return;
    setState('approving');
    timers.current.push(
      setTimeout(() => {
        setState('done');
        onApprove?.();
      }, 620),
    );
  }, [state, disabled, onApprove]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || state !== 'idle'}
      aria-live="polite"
      className={`approve-btn is-${state}`}
    >
      <span className="approve-btn-label">
        {state === 'idle' && label}
        {state === 'approving' && 'Approving'}
        {state === 'done' && (
          <>
            <span className="approve-btn-mark" aria-hidden>
              ✓
            </span>
            {doneLabel}
          </>
        )}
      </span>
      <span className="approve-btn-trace" aria-hidden />
    </button>
  );
}
