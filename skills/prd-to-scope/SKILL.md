---
name: prd-to-scope
description: Convert PRDs or product ideas into scoped release slices. Use when given a PRD, product idea, feature request, customer workflow, or vague app concept and asked to define MVP, implementation scope, milestones, or what an agent should build first.
---

# PRD To Scope

Use this skill to turn product ambition into a buildable release slice.

## Read First

Read the PRD, issue, chat brief, or docs the user provided. If a repo exists, inspect the current app before proposing new scope.

## Scope Ladder

Break the idea into:

- user/job,
- core workflow,
- must-have data,
- must-have actions,
- non-goals,
- first release,
- later releases.

## MVP Rules

- Prefer one complete workflow over many partial screens.
- Prefer evidence-producing backend behavior over mock UI.
- Keep integrations fake or manual unless they are the core value.
- Mark unknowns explicitly.
- Do not turn a PRD into a giant backlog.

## Output

```markdown
## Release Slice
User/job: <who and why>
MVP workflow: <one complete workflow>
Build now:
- <item>
Defer:
- <item>
Evidence needed:
- <test, demo, staging proof>
Open questions:
- <question>
```

## Agent Handoff

If the next step is implementation, produce a goal-style prompt with objective, read-first files, constraints, validation, and stop condition.

