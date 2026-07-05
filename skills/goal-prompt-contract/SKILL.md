---
name: goal-prompt-contract
description: Write verifiable long-running agent goal prompts. Use when asking an agent to run autonomously, continue until tests pass, perform a large refactor, raise coverage, fix a release blocker, or execute a multi-step task with a clear stop condition.
---

# Goal Prompt Contract

Use this skill to write goals that an agent can pursue without drifting.

## Required Contract

Every long-running goal needs:

- objective: one concrete outcome.
- read first: files, docs, issues, or PRs to inspect.
- constraints: what must not change.
- validation: exact command or evidence that proves progress.
- stop condition: when the agent should stop.
- documentation: what docs should be updated.
- anti-gaming rule: do not weaken or delete tests/checks.

## Template

```markdown
**Objective:** <one concrete outcome>
**Read first:** <files/issues/docs>
**Constraints:** <public APIs, dependencies, architecture, scope limits>
**Validate:** `<exact command>` after meaningful changes
**Document:** Update concise docs for changed behavior or setup.
**Do not:** Delete, skip, weaken, or narrow tests/checks to make the goal pass.
**Stop when:** <verifiable condition>, or when further progress needs human/product input.
```

## Good Fits

- migration with test suite,
- release blocker with failing CI,
- coverage lift,
- focused refactor,
- bug reproduction then fix,
- docs/evidence pack with checklist.

## Bad Fits

- vague "improve this",
- exploratory architecture,
- production credential work,
- tasks without validation,
- anything where success is only subjective.

## Review Checklist

Before sending the goal:

- One objective, not a backlog.
- Exact validation command.
- Clear stop condition.
- Explicit scope boundaries.
- No hidden production actions.

