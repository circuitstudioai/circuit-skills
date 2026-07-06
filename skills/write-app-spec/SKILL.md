---
name: write-app-spec
description: Write buildable app specs with independently verifiable slices. Use when a user has a feature, PRD, app idea, or large implementation goal that needs to become a spec under specs/<feature>/ before coding.
---

# Write App Spec

Use this skill to turn an app idea into a build plan that can be implemented and verified slice by slice.

## Output Location

Default to:

```text
specs/<feature-slug>/README.md
specs/<feature-slug>/slices/001-<slice>.md
```

If the repo already has a spec convention, follow it.

## Spec Principles

- Each slice must be independently buildable and reviewable.
- Each slice must have its own validation evidence.
- Prefer one complete workflow over many partial surfaces.
- Capture unknowns explicitly.
- Keep implementation details light until code reveals the real shape.

## Workflow

1. Read the PRD, issue, README, and relevant app files.
2. Identify user/job, core workflow, data, external systems, and constraints.
3. Map unknowns: product, technical, data, access/deploy, visual.
4. Define the first release slice.
5. Split remaining work into independently verifiable slices.
6. Write validation per slice.
7. Add non-goals so the agent does not sprawl.

## Spec Template

```markdown
# <Feature Name>

## Goal
<What user-visible outcome this feature creates.>

## Non-Goals
- <deferred work>

## Unknowns
- <unknown and how to resolve it>

## Slices
1. <slice> - <independent validation>

## Release Gate
- <commands/evidence required before merge>
```

## Rules

- Do not write a giant backlog.
- Do not hide unknowns as assumptions.
- Do not start implementation until the first slice has a validation path.

