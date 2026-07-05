---
name: ci-failure-triage
description: Diagnose failed CI checks and identify the next fix. Use when GitHub Actions, Vercel, tests, lint, typecheck, build, or deployment checks fail and the user wants a concise root-cause analysis or repair plan.
---

# CI Failure Triage

Use this skill to turn failed checks into a clear fix path.

## State Check

```bash
git status --short
git branch --show-current
gh auth status
gh pr status
```

If a PR exists:

```bash
gh pr view --json number,title,url,statusCheckRollup,headRefName,baseRefName
```

## Workflow

1. Identify failing check names.
2. Fetch logs for the failed job or provider.
3. Find the first real error, not the last cascade.
4. Classify the failure.
5. Reproduce locally when possible.
6. Propose the smallest fix.
7. Re-run the relevant local command.

## Failure Classes

- code: test/build/type error from changed code.
- config: missing env var, wrong script, dependency mismatch.
- provider access: deployment account lacks project access.
- flaky/external: network, rate limit, service outage.
- quality gate: data threshold, security scan, migration check.

## Output

```markdown
## CI Triage
Failing check: <name>
Class: <code | config | provider access | flaky/external | quality gate>
Root cause: <one paragraph>
Evidence: <log line or command>
Local repro: `<command>` - <result>
Next fix: <smallest useful fix>
```

## Rules

- Do not call a check flaky without evidence.
- Do not hide access failures as code failures.
- Do not weaken tests to make CI green.
- Report missing env var names only, never values.

