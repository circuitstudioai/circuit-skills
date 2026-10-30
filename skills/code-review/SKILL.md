---
name: code-review
description: Review a PR or diff for correctness, regressions, tests, and scope without a paid review bot. Use when CI is green and automated pre-merge review is needed, when asked to review agent-built changes, or before requesting merge approval.
---

# Code Review

Adapted for Circuit Skills from the intended `code-review` workflow in [circuit-agent-blueprint](https://github.com/circuitstudioai/circuit-agent-blueprint) (source repo not used verbatim; aligned with this repo’s skill style).

Use a **fresh review pass** separate from implementation. Do not edit code during review unless the user asked for fixes afterward.

## State Check

```bash
git fetch origin
gh pr view --json number,title,url,baseRefName,headRefName,files,additions,deletions
gh pr diff
```

If not on a PR, review the current branch against `main`:

```bash
git diff origin/main...HEAD
```

## Review Order

1. Confirm the change matches the stated objective and slice scope.
2. Read behavior-critical paths first (auth, data writes, migrations, jobs).
3. Walk every human-authored changed line with enough context for regressions.
4. Check tests: changed behavior covered, assertions observe outcomes, tests would fail if broken.
5. Flag complexity, missing docs, or scope creep.

## Core Checks

- Behavior regression on existing flows.
- Error-path safety (no silent failures or unsafe defaults).
- Boundary inputs (empty, null, overflow, permission denied).
- Test gaps on changed behavior.
- Docs or env var names updated when behavior changed.

## Finding Format

```markdown
### [<severity>] <title>
- File: `<path>:<line>`
- Impact: <what breaks or degrades>
- Evidence: <why this is a problem>
- Fix: <concrete suggestion>
```

Severity: `critical` | `high` | `medium` | `low`.

## Verdict

```markdown
## Code Review
Verdict: <approve | approve with notes | request changes>
Findings: <count by severity>
Must fix before merge: <list or None>
Notes: <optional rebuttal guidance>
```

## Rules

- Prioritize correctness and regressions over style nits.
- Stay within the PR scope unless a critical defect is clearly introduced elsewhere.
- Post findings to the PR (or return them for a PR comment) when asked to complete the Circuit Dev loop.
- Fix or rebut every finding before merge request; rebuttals need evidence.
