# Reference Run 002: Advanced Budget App

This branch-only spike tests whether Circuit Skills remains useful after the toy-app stage.

## Complexity added

- persistent state with corrupt-data recovery,
- transaction create, edit, and delete flows,
- search and category filtering,
- dated and categorized ledger entries,
- CSV export,
- multi-slice implementation and validation,
- five component/integration tests.

## Reproduce

```bash
cd app
npm ci
npm test
npm run lint
npm run build
npm audit --audit-level=high
```

See `evidence/` for the initial yellow gate and final green gate. This is a complexity test, not a production app or visual-design reference.
