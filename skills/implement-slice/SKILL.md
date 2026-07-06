---
name: implement-slice
description: Implement one independently verifiable slice from an app spec. Use when working from specs/<feature>/, executing a planned slice, continuing a sliced implementation, or preventing a large feature from turning into one unreviewable diff.
---

# Implement Slice

Use this skill to build one slice at a time and leave evidence.

## Read First

```bash
git status --short
rg --files specs README.md package.json
```

Read the spec README and the target slice file before editing.

## Workflow

1. Confirm the slice objective and validation.
2. Identify the smallest code area that owns the behavior.
3. Implement only this slice.
4. Add or update tests/docs required by the slice.
5. Run the slice validation.
6. Update the slice status with evidence.
7. Stop before starting the next slice unless asked.

## Slice Status

Use:

```markdown
## Status
- State: <not started | in progress | complete | blocked>
- Evidence: `<command>` - <result>
- Notes: <blocker or important decision>
```

## Rules

- Do not merge multiple slices into one diff for convenience.
- Do not mark a slice complete without validation.
- If implementation proves the spec stale, update the spec before continuing.
- If the slice needs product input, mark it blocked instead of guessing.

