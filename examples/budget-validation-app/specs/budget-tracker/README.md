# Budget Tracker

## Goal

Build a simple monthly budget tracker for personal finance planning. A user should see income, planned budgets, spending by category, remaining cash, and categories that are over budget.

## Non-Goals

- No bank connections or transaction import.
- No authentication.
- No multi-month history.
- No investment, tax, or financial advice.
- No backend persistence.

## Unknowns

- Persistence: this validation slice uses local React state only.
- Categories: slice 001 uses a fixed category list so the app can prove the budget math first.
- Currency: use USD formatting for the validation app.

## Slices

1. Monthly budget dashboard - Show income, category budgets, expense entry, remaining amount, and over-budget warning. Validate budget math with tests, build, lint, and screenshot evidence when available.
2. Category management - Add, rename, and remove budget categories. Validate category totals and empty states.
3. Savings goal - Reserve a monthly savings target and show spendable cash after savings. Validate goal math and overrun behavior.

## Release Gate

- `npm run build`
- `npm test`
- `npm run lint`
- `npm audit --audit-level=high`
- desktop and mobile screenshot evidence, or a stated browser blocker
