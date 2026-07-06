# Changelog

## 0.3.0 - 2026-07-06

- Added installer/skills metadata via `.claude-plugin/plugin.json`.
- Added a focused spec lifecycle: `write-app-spec`, `implement-slice`, and `close-spec`.
- Added `skill-eval-harness` to evaluate skills with examples and blind runs.
- Added visual review skills: `screenshot-critique` and `visual-regression-compare`.
- Kept the flat skill layout for now to avoid breaking existing links.

## 0.2.0 - 2026-07-05

- Expanded the repo from 5 to 15 skills to make it useful as a generic open-source skills library.
- Added skill authoring, agent goal, CI triage, preview validation, frontend UX, database, RLS, data quality, worker idempotency, and PRD scoping skills.
- Updated the catalog and README for the broader "agent app-shipping operating system" direction.

## 0.1.1 - 2026-07-05

- Expanded the public skills with more detailed workflows, decision trees, evidence templates, and failure-mode guidance.
- Added more shareable README context for adapting the skills to other teams.
- Kept public-safe wording by avoiding personal accounts, private paths, and internal-only runbooks.

## 0.1.0 - 2026-07-05

- Created the initial Circuit Studio skill repository.
- Added `circuit-app-kit`.
- Added `circuit-release-gate`.
- Added `circuit-handoff`.
- Added `supabase-staging-validation`.
- Added `github-pr-evidence`.
