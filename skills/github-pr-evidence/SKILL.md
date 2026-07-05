---
name: github-pr-evidence
description: Prepare GitHub PR evidence for agent-built changes. Use when opening, updating, reviewing, or summarizing a PR; adding test evidence; explaining CI/preview/staging blockers; or making reviewer-ready PR notes.
---

# GitHub PR Evidence

Use this skill to make PRs easy to review and hard to misunderstand.

## State Check

```bash
pwd
git status --short
git branch --show-current
git remote -v
gh auth status
```

If a PR already exists:

```bash
gh pr status
gh pr view --json number,title,url,state,mergeable,headRefName,baseRefName,statusCheckRollup
```

## PR Body Shape

```markdown
## Summary
- <user-facing change>
- <technical change>

## Evidence
- `<command>` - <pass/fail>
- <preview/staging URL if available>

## Risk
- <migration, auth, data quality, provider access, or deploy risk>

## Rollback
- <how to revert or disable>

## Blockers
- <missing access/env/checks, or None>
```

## Evidence Rules

- Include exact commands run.
- Include failing checks honestly.
- Separate local validation from deployed/staging validation.
- Mention missing env vars by name only.
- Do not claim preview deploy success unless the check actually passed.
- Do not request merge when release gate verdict is red or blocked.

## Reviewer Notes

Call out:

- Schema migrations.
- RLS or auth changes.
- Background jobs.
- External provider changes.
- Data-quality thresholds.
- Manual setup needed after merge.
