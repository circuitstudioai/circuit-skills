# Launch Checklist

## Goal

Give a small team one shared launch checklist where they can create a launch, add checklist items, assign owners, and see which items are still blocking launch readiness.

## Non-Goals

- No calendar integration in the first release.
- No Slack, email, or push notifications.
- No role-based permissions beyond the app's existing signed-in user model.
- No multi-project reporting dashboard.

## Unknowns

- Persistence: confirm whether the host app already has a database layer. If not, use the simplest local persistence pattern already present in the repo.
- Auth: confirm whether owner assignment should use real users or free-text names for the first slice.
- Launch verdict: confirm whether "blocked" is manually set or inferred from incomplete required items.

## Slices

1. Create launch checklist - A user can create one launch with checklist items and see incomplete blockers. Validate with unit/component tests and a screenshot.
2. Owner assignment - A user can assign each item to an owner and filter by owner. Validate with tests for item ownership and filtering.
3. Launch readiness summary - The app shows ready, blocked, or incomplete state based on required checklist items. Validate with tests for all summary states.
4. Shareable launch view - The launch page has a stable URL suitable for team review. Validate route loading and empty/error states.

## Release Gate

- Install dependencies with the repo's package manager.
- Run the repo's build, lint/typecheck, and test commands.
- Capture desktop and mobile screenshots for the primary checklist workflow.
- Report missing auth, database, or preview deploy access as blockers.

