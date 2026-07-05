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

## Before Opening A PR

Check:

- branch name is meaningful,
- working tree only contains intended files,
- release gate has been run or blocker is documented,
- migrations and env vars are called out,
- docs changed when behavior changed.

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

## Status Check Interpretation

- Passing local checks do not imply preview deploy success.
- A mergeable PR can still be release-blocked by failed preview, missing staging evidence, or data quality.
- A failed check with external access missing is a blocker; do not hide it as "known flaky".
- If CI and local disagree, report both and investigate the environment difference.

## Evidence Rules

- Include exact commands run.
- Include failing checks honestly.
- Separate local validation from deployed/staging validation.
- Mention missing env vars by name only.
- Do not claim preview deploy success unless the check actually passed.
- Do not request merge when release gate verdict is red or blocked.

## Comment / Review Update Template

```markdown
Update:
- Changed: <what changed since last review>
- Evidence: `<command>` - <result>
- Still blocked: <blocker or None>
- Reviewer attention: <files/areas to inspect>
```

## Reviewer Notes

Call out:

- Schema migrations.
- RLS or auth changes.
- Background jobs.
- External provider changes.
- Data-quality thresholds.
- Manual setup needed after merge.
