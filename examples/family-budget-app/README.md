# Reference Run 003: Common Ground

Common Ground is a usable family-finance app and the first Circuit Skills reference run to exercise authentication-ready data design, household tenancy, migrations, RLS, responsive UX, and release evidence together.

## Product flows

- Passwordless email sign-in when Supabase is configured.
- Create a household or join with an invite code.
- Shared envelope budgets, income/expense ledger, and savings goals.
- Owner, adult, and viewer roles enforced in the database contract.
- Polished credential-free demo mode.

## Run

```bash
cd app
npm ci
npm run dev
```

The app opens in demo mode without environment variables. For shared data, copy `.env.example` to `.env.local`, add a Supabase URL and anon key, then apply the migration.

## Validate

```bash
npm test
npm run lint
npm run build
npm audit --audit-level=high
python3 scripts/validate-family-migration.py
```

With Docker access, also run `supabase start`, `supabase db reset`, and `supabase db lint --local`. Docker was unavailable in this run, so executable RLS validation remains a blocker rather than a claimed pass.
