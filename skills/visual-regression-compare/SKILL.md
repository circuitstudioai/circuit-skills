---
name: visual-regression-compare
description: Compare screenshots and visual changes against intended outcomes. Use when reviewing before/after UI screenshots, checking visual regression artifacts, comparing a baseline to a candidate, or deciding whether a UI change is acceptable.
---

# Visual Regression Compare

Use this skill to compare images against the intended outcome, not blindly against the old baseline.

## Workflow

1. Establish what the screen should show.
2. Confirm images are comparable: route, viewport, data, auth state, theme, time.
3. Compare layout, content, hierarchy, typography, spacing, contrast, and interactive states.
4. Identify differences.
5. Decide whether each difference is improvement, regression, neutral, or unclear.
6. Return a verdict.

## Verdicts

- `accept`: candidate is closer to intended outcome.
- `reject`: candidate regresses important behavior or visuals.
- `both-wrong`: neither image meets the target.
- `unclear`: product/design intent needed.

## Output

```markdown
## Visual Compare
Verdict: <accept | reject | both-wrong | unclear>
Target: <what the screen should show>
Compared:
- Baseline: <file/url>
- Candidate: <file/url>
Findings:
- <difference and judgment>
Required fixes:
- <fix or None>
```

## Rules

- Do not accept because a metric is lower.
- Do not preserve a bad baseline.
- Do not ignore mobile if the UI is responsive.
- Ask for intent when a difference is subjective and material.

