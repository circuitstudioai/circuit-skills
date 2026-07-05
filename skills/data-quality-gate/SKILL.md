---
name: data-quality-gate
description: Gate releases on data quality evidence. Use when an app depends on scraped, imported, generated, vendor, pricing, lead, location, or analytics data and release readiness depends on coverage, freshness, confidence, or source mix.
---

# Data Quality Gate

Use this skill when the product can compile but still fail because the data is bad.

## Define Thresholds

Before judging readiness, identify required thresholds:

- sample size,
- coverage,
- freshness,
- confidence score,
- error rate,
- duplicate rate,
- source concentration,
- required fields present.

If no thresholds exist, create proposed thresholds and mark the gate `yellow` until accepted.

## Evidence Commands

Prefer existing audit scripts. Examples:

```bash
rg --files scripts | rg "audit|quality|readiness|validate"
node scripts/api-readiness-audit.mjs --enforce
```

## Verdicts

- `green`: thresholds pass.
- `yellow`: data usable but thresholds are incomplete or partially met.
- `red`: threshold failure blocks launch.
- `blocked`: cannot access dataset/provider/staging.

## Output

```markdown
## Data Quality Gate
Verdict: <green | yellow | red | blocked>
Dataset/source: <name>
Thresholds:
- <metric>: <actual> / <required>
Blockers:
- <blocker or None>
```

## Rules

- Do not hide low-confidence data behind a successful build.
- Do not lower thresholds without saying so.
- Separate provider availability from data quality.

