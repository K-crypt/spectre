# The Spectre — AI engineering brief

## Ownership

Codex is the lead engineer and final integrator for this repository. It owns
architecture, task breakdown, implementation review, testing, and release
readiness. Claude may be used as a focused frontend collaborator when given a
written task with an explicit file scope and acceptance criteria.

## Product principles

- Make the site feel precise, credible, distinctive, and quietly ambitious.
- Demonstrate the product instead of relying on hype or vague claims.
- Preserve the core promise: the machine proposes; the human decides.
- Keep all public examples fictional, deterministic, and clearly labelled.
- Maintain excellent desktop and mobile experiences in both themes.
- Respect reduced-motion preferences and basic accessibility requirements.

## Engineering rules

- Do not expose client data, secrets, keys, or files from `raw/`.
- Do not deploy, push, or publish without the owner's explicit approval.
- Do not rewrite unrelated components during a focused design task.
- Reuse the design tokens in `src/app/globals.css`; avoid scattered constants.
- Preserve the static-export architecture unless Codex approves a change.
- Run `npm run build` after implementation and report any unavailable checks.
- Keep each handoff reviewable: summarize intent, files changed, and tradeoffs.

## Claude handoffs

Claude should treat the prompt in `docs/CLAUDE-HANDOFF.md` as the full task
contract. If a requested change would require files outside the stated scope,
Claude should explain why before editing them. Codex reviews and integrates all
returned work.
