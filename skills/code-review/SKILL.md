---
name: code-review
description: Review a PR or diff for correctness, regressions, tests, and scope without a paid review bot. Use when CI is green and automated pre-merge review is needed, when asked to review agent-built changes, or before requesting merge approval.
---

# Code Review

Adapted from [agent-skills `code-review-and-quality`](https://github.com/circuitstudioai/agent-skills) (MIT). Aligned with Circuit Skills layout; not a verbatim copy.

Use a **fresh review pass** separate from implementation. The **reviewer model must differ from the model that authored the change**. Do not edit code during review unless the user asked for fixes afterward.

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
2. Read tests first — behavior covered, edge cases, regression strength.
3. Read behavior-critical paths (auth, data writes, migrations, jobs).
4. Walk human-authored changed lines with enough context for regressions.
5. Flag complexity, missing docs, or scope creep.

## Core Checks

Correctness, readability, architecture fit, security touchpoints, and obvious performance traps (N+1, unbounded fetch).

## Severity Labels

Label every finding so authors know what is mandatory:

| Label | Meaning | Author action |
| --- | --- | --- |
| **Critical:** | Blocks merge | Security, data loss, broken behavior — must fix |
| *(no prefix)* | Required | Must address before merge |
| **Optional:** / **Consider:** | Suggestion | Worth considering; not required |
| **Nit:** | Style/minor | May ignore |
| **FYI** | Informational | No action required |

Lead with Critical and required items before nits.

## Finding Format

```markdown
### <label> <title>
- File: `<path>:<line>`
- Impact: <what breaks or degrades>
- Evidence: <why this is a problem>
- Fix: <concrete suggestion>
```

Use **Critical:** prefix for blockers; omit prefix for other required items.

## Verdict

```markdown
## Code Review
Reviewer model: <name> (must differ from author)
Verdict: <approve | approve with notes | request changes>
Findings: <count by label>
Must fix before merge: <list or None>
Notes: <optional rebuttal guidance>
```

## Rules

- Prioritize correctness and regressions over style nits.
- Stay within the PR scope unless a Critical defect is clearly introduced elsewhere.
- Post findings to the PR when completing the Circuit Dev loop.
- Fix or rebut every Critical and required finding before merge request; rebuttals need evidence.
