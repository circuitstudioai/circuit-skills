---
name: screenshot-critique
description: Review screenshots for visible UI defects. Use when validating frontend work, checking a preview deployment, reviewing before/after screenshots, or asking for a second visual pass before accepting a UI change.
---

# Screenshot Critique

Use this skill to inspect screenshots like a user would, not like the author of the code would.

## Inputs

- One or more screenshots.
- Target surface or workflow.
- Any known design intent or acceptance criteria.

If intent is missing, critique observable defects and label taste calls as uncertain.

## Checklist

- Blank or broken states.
- Text overlap or clipping.
- Buttons too small or overflowing.
- Poor contrast.
- Missing loading/empty/error states.
- Layout breaks on mobile/desktop.
- Modals, menus, and forms misaligned.
- Visual hierarchy unclear.
- Primary workflow hard to find.

## Review Pattern

For each issue:

```markdown
- Issue: <visible problem>
  Evidence: <where it appears>
  Severity: <high | medium | low>
  Fix direction: <what kind of change helps>
```

## Rules

- Do not approve visuals from code alone.
- Do not invent brand rules.
- Do not nitpick taste if the workflow is broken.
- Prefer concrete visible defects over vague "polish" comments.

