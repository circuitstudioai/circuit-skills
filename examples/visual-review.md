# Visual Review Example

Target workflow: launch checklist creation on desktop and mobile.

## Findings

- Issue: Primary action is visually clear on desktop but drops below the fold on mobile.
  Evidence: mobile screenshot, launch form initial state.
  Severity: medium
  Fix direction: keep the create action in the first viewport or reduce vertical spacing above the form.

- Issue: Blocker count and completed count use similar weight and color.
  Evidence: desktop screenshot, checklist summary row.
  Severity: low
  Fix direction: make the blocked state more distinct with stronger text weight and an accessible status color.

- Issue: Empty checklist state does not show what the next action is.
  Evidence: desktop screenshot, new launch with zero items.
  Severity: medium
  Fix direction: add a short empty-state line and focus the item input after launch creation.

## Verdict

Usable for a first slice after the mobile primary-action placement is fixed. Remaining issues are polish unless the workflow depends on fast mobile checklist creation.
