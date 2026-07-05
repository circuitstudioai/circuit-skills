---
name: circuit-release-gate
description: Run release validation before merge, deploy, or launch. Use when asked to verify readiness, run release checks, prepare launch evidence, assess blockers, or make a repo CI/preview/staging ready.
---

# Circuit Release Gate

Use this skill to prove an app is ready to merge, deploy, demo, or launch.

## State Check

```bash
pwd
git status --short
rg --files -g 'package.json' -g 'pnpm-lock.yaml' -g 'package-lock.json' -g 'yarn.lock' -g 'supabase/**' -g 'scripts/**' -g '.github/workflows/**'
```

Read the project instructions and package scripts before running checks:

```bash
test -f AGENTS.md && sed -n '1,220p' AGENTS.md
cat package.json
```

If there is no package manager or this is not a JavaScript app, adapt the same structure: build, tests, static checks, security scan, staging evidence, blockers.

## Standard Checks

Use available repo scripts rather than inventing commands. Typical order:

```bash
npm run build
npm test
npm run lint
bash scripts/security-check.sh
```

If the repo uses `pnpm`, `yarn`, or custom scripts, follow that repo.

## Gate Selection

Pick the checks that match the project:

- Web app: build, lint/typecheck, tests, preview deploy.
- API: build/typecheck, unit tests, integration tests, health endpoint, auth checks.
- Data product: data freshness, source mix, confidence thresholds, sample size, schema validation.
- Supabase app: migration ordering, RLS policies, service-role functions, staging SQL validation.
- Worker/job: idempotency, retry behavior, dead-letter/error path, observability.

## Evidence Categories

Capture pass/fail for:

- Build.
- Tests.
- Lint/typecheck.
- Security or secret scan.
- Staging or preview deploy status.
- Database migration/RLS validation when applicable.
- Data-quality gate when the product depends on external data.
- Known external blockers.

## Evidence Packet

Use this format in PRs or status updates:

```markdown
## Release Gate
Verdict: <green | yellow | red | blocked>

## Commands
- `<command>` - <pass/fail/not run>

## Evidence
- Build: <result>
- Tests: <result>
- Lint/typecheck: <result>
- Security/secret scan: <result>
- Staging/preview: <result>
- Data/migration checks: <result>

## Blockers
- <missing access/env/decision/check, or None>
```

## Integrity Rules

- Do not weaken tests, lint rules, thresholds, migrations, or validation SQL to pass the gate.
- Do not mark a gate green when staging credentials, Vercel access, or provider keys are unavailable.
- If a check fails from known existing debt, report the count and representative causes.
- If a check cannot run, explain the missing dependency or credential by variable name only.

## Failure Handling

- Build failure: inspect the first real error, not the cascade.
- Lint debt: report count, representative files, and whether it is new or existing.
- Missing env vars: list names only.
- Preview blocked by provider access: mark external validation `blocked`, not failed.
- Data quality below threshold: mark release `red` even if the app compiles.

## Launch Verdict

Use one of these verdicts:

- `green`: all required gates pass and no release blocker remains.
- `yellow`: core build works, but non-critical debt or missing evidence remains.
- `red`: release blocker remains.
- `blocked`: required external access or credentials are missing.

## Output

Return:

- Verdict.
- Commands run.
- Pass/fail summary.
- Blockers with exact missing access or env var names.
- Recommended next step.
