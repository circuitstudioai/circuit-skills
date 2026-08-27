# Monthly Money Map

A focused React validation app for planning monthly income, category budgets, and expenses. The dashboard updates total and per-category balances immediately and highlights overspending.

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Release checks

```bash
npm test
npm run build
npm run lint
npm audit --audit-level=high
```

The reference run's release-gate results and Playwright screenshots are in [`../evidence`](../evidence/).

## Scope

- Editable monthly income
- 4 fixed budget categories
- Expense entry by description, category, and amount
- Live total and category calculations
- Over-budget state and accessible validation feedback
- Responsive desktop and mobile layouts

Data is intentionally stored in local React state. Persistence, accounts, and external finance integrations are outside this validation slice.
