---
name: frontend-ux-gate
description: Check frontend UX readiness before release. Use when reviewing a web UI, validating app screens, checking responsive behavior, catching broken layouts, or preparing frontend release evidence.
---

# Frontend UX Gate

Use this skill to catch obvious frontend problems before a human reviewer or user does.

## State Check

```bash
git status --short
rg --files -g 'package.json' -g 'src/**' -g 'app/**' -g 'pages/**'
cat package.json
```

Start the app if needed, then inspect the relevant routes.

## Checks

- Page is not blank.
- Text does not overlap.
- Buttons and controls fit their containers.
- Loading, empty, error, and success states exist for core flows.
- Mobile and desktop layouts are usable.
- Forms have labels and useful validation.
- Primary workflow can be completed.
- Visual style matches the product context.

## Evidence

Capture:

- routes inspected,
- viewport sizes,
- screenshots when available,
- broken interactions,
- console/network errors,
- release verdict.

## Verdicts

- `green`: core workflow works and layout is clean.
- `yellow`: usable with minor polish issues.
- `red`: broken layout, inaccessible form, or core workflow failure.
- `blocked`: app cannot run or route cannot be accessed.

## Rules

- Do not approve a UI based only on code inspection.
- Do not ignore mobile.
- Do not call a static mock "ready" if expected interactions do nothing.

