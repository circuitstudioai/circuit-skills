# Reference Run 001 Scorecard

## Verdict

Encouraging pass. The tested skills provided a useful paved road from idea to verified release, including honest blocker handling. This validates the core loop as public-beta quality; it does not validate the entire library.

## What passed

- The idea became a small spec with one independently verifiable slice.
- The implementation satisfied its functional acceptance criteria.
- Component tests covered expense entry, budget math, over-budget state, and invalid input.
- Build, lint, and dependency audit commands were explicit and repeatable.
- The initial browser failure was recorded as a blocker rather than omitted.
- The repaired environment produced desktop and mobile screenshots.
- Visual review found no clipping, overlap, or horizontal overflow.
- Accessibility review led to actionable fixes and a green rerun.

## Human or environment intervention

- A human repaired the Playwright/Chromium runtime outside the skill run.
- The final rerun added skip navigation, inline validation feedback, form metadata, live regions, responsive interaction improvements, and clearer page metadata.

## Not exercised

- Blind runs with a fresh agent or model
- Multi-slice or large application work
- Backend, authentication, or persistent data
- Supabase staging, migrations, and RLS
- CI failure triage
- Pull request evidence and preview deployment
- Worker retry and idempotency checks
- Visual regression comparison against a prior baseline

## Next cases

1. Blind build of a different frontend app with no mid-run coaching.
2. Supabase-backed app exercising migrations, RLS, staging, and data-quality gates.
3. Worker/API app exercising idempotency, CI triage, preview validation, and PR evidence.

Run each case with at least 1 fresh context and preserve failures as evaluation data.
