# Release Gate Report

Verdict: yellow

This example assumes a UI slice built successfully and local validation passed, but preview deployment evidence is still missing.

## Commands

- `npm run build` - pass
- `npm test` - pass
- `npm run lint` - pass
- `npm audit --audit-level=high` - pass
- `npx playwright test launch-checklist.spec.ts` - pass
- Preview deploy check - blocked

## Evidence

- Build: production build completed without errors.
- Tests: launch checklist add, complete, and blocker-count behavior passed.
- Lint/typecheck: no new lint or type errors.
- Security/secret scan: no high severity npm audit findings.
- Staging/preview: blocked because deploy provider credentials were not available.
- Data/migration checks: not applicable; slice used existing app persistence.

## Blockers

- Preview deploy credentials unavailable: `VERCEL_TOKEN`.

## Next Step

Run preview deployment validation once `VERCEL_TOKEN` is available, then attach desktop and mobile screenshots to the PR evidence packet.

