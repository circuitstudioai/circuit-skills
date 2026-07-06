---
name: close-spec
description: Close a shipped app spec into a durable rationale record. Use when implementation has landed, all slices are complete, or a build plan under specs/<feature>/ should be archived with why/what/validation instead of remaining as stale future-tense planning.
---

# Close Spec

Use this skill when a spec is done shipping and should become a record.

## Workflow

1. Confirm the feature is complete or explicitly stopped.
2. Read the spec and the shipped code.
3. Compare plan against reality.
4. Preserve decisions, invariants, dead ends, and validation evidence.
5. Remove stale future-tense implementation instructions.
6. Archive or move the spec according to repo convention.

## Record Template

```markdown
# <Feature Name> - Shipped Record

## What Shipped
<Present-tense summary.>

## Why It Works This Way
<Rationale and tradeoffs.>

## Invariants
- <rule the implementation must preserve>

## Validation
- `<command>` - <result>

## Code Pointers
- `<path>` - <what to inspect>

## Dead Ends
- <approach rejected and why>
```

## Rules

- Do not restate code mechanics that are obvious from source.
- Do not leave stale "will implement" language.
- Do not delete useful rationale just because implementation changed.
- Treat the closed spec as the why; code remains the how.

