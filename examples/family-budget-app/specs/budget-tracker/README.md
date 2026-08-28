# Common Ground Family Budget Spec

## Goal

Give a family one calm place to understand this month, record money together, and make progress toward shared goals without requiring financial expertise.

## Personas

- Owner: creates the household and manages membership.
- Adult: plans budgets and manages money activity.
- Viewer: can understand the plan without changing it.

## Verifiable slices

1. Household tenancy, roles, auth profile, invite RPCs, and RLS contract.
2. Responsive dashboard with demo household and envelope math.
3. Live Supabase loading and household setup flows.
4. Transaction create/delete with member attribution.
5. Shared goal creation and progress.
6. Release, migration, accessibility, and visual evidence.

## Release acceptance

- One household cannot access another household's rows and viewers cannot mutate records.
- A new user can create or join a household.
- Income, expenses, category room, and goals remain mathematically consistent.
- Primary flows work at desktop and 390px widths; demo mode works without credentials.
- Tests, lint, build, audit, migration checks, and RLS execution are reported independently.
