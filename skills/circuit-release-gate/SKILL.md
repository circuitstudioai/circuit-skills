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

## Standard Checks

Use available repo scripts rather than inventing commands. Typical order:

```bash
npm run build
npm test
npm run lint
bash scripts/security-check.sh
```

If the repo uses `pnpm`, `yarn`, or custom scripts, follow that repo.

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

## Integrity Rules

- Do not weaken tests, lint rules, thresholds, migrations, or validation SQL to pass the gate.
- Do not mark a gate green when staging credentials, Vercel access, or provider keys are unavailable.
- If a check fails from known existing debt, report the count and representative causes.
- If a check cannot run, explain the missing dependency or credential by variable name only.

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
