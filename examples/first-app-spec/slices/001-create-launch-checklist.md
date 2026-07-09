# Slice 001: Create Launch Checklist

## Objective

Build the smallest useful launch checklist workflow:

- create a launch name,
- add checklist items,
- mark items complete,
- see which incomplete items are still blocking launch.

## Acceptance Criteria

- A user can create or open a launch checklist from the primary app surface.
- A user can add at least three checklist items.
- A user can mark an item complete or incomplete.
- Incomplete required items are shown as blockers.
- Empty state, form validation, and completion state are visible.

## Validation

- Component or integration test covers adding and completing checklist items.
- Test covers blocker count changing when an item is completed.
- Manual screenshot evidence covers desktop and mobile layout.
- Release gate runs available build, lint/typecheck, and test commands.

## Status

- State: not started
- Evidence: none yet
- Notes: First implementation should avoid owner assignment, notifications, and launch history.

