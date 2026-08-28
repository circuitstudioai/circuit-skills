# Advanced Budget Tracker Spec

## Goal

Test the Circuit Skills core loop on a stateful, multi-flow frontend rather than a single-form demo.

## Slices

1. Persistent transaction domain with safe fallback.
2. Transaction CRUD and derived budget totals.
3. Search, category filters, and CSV export.
4. Release evidence and failure preservation.

## Acceptance

- Invalid stored JSON never crashes the app.
- Create, edit, and delete update totals correctly.
- Filters compose without mutating the underlying ledger.
- Export produces dated, categorized CSV rows.
- Tests, lint, build, and dependency audit return green evidence.
