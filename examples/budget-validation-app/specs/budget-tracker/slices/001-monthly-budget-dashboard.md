# Slice 001: Monthly Budget Dashboard

## Objective

Replace the Vite starter screen with a working monthly budget dashboard:

- edit monthly income,
- show fixed category budgets,
- add an expense with amount and category,
- update spent, remaining, and over-budget status,
- show total remaining cash for the month.

## Acceptance Criteria

- Monthly income is visible and editable.
- At least four budget categories are visible.
- A user can add an expense with description, category, and amount.
- Category spent and remaining values update after an expense.
- A category shows an over-budget status when spending exceeds its planned amount.
- Blank descriptions or non-positive amounts are not added.

## Validation

- Component test covers adding an expense and updating remaining cash.
- Component test covers an over-budget category.
- Component test covers invalid expense prevention.
- Build, lint, test, and audit commands pass.
- Screenshot evidence is captured or marked blocked with the exact reason.

## Status

- State: complete
- Evidence: `npm test` — pass, 3 tests; `npm run build` — pass; `npm run lint` — pass; `npm audit --audit-level=high` — pass; Playwright desktop and mobile screenshots — pass
- Notes: Local state only. No real account data or external finance integrations. Release-gate and visual-review evidence are stored in the reference run's `evidence/` directory.
