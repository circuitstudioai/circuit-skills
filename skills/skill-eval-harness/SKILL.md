---
name: skill-eval-harness
description: Evaluate an agent skill against realistic examples. Use when testing whether a SKILL.md works, hardening trigger descriptions, comparing skill outputs, creating golden cases, or checking a skill before release.
---

# Skill Eval Harness

Treat a skill like code: test it on examples before trusting it.

## Required Inputs

- Target skill path.
- Example input the skill should handle.
- Expected bar: what a good output accomplishes and what smells bad.

If any input is missing, ask for it or create a clearly marked draft case.

## Eval Workflow

1. Read the target skill.
2. State the skill's first principles.
3. Run the example in a fresh context when possible.
4. Judge the output against the bar.
5. Record gaps.
6. Patch the skill.
7. Re-run the case if the change is meaningful.

## Golden Case Format

```markdown
## Case: <name>
Input:
<what the user/agent receives>

Bar:
- <what good achieves>

Smells:
- <bad output pattern>
```

## Judging Rules

- Do not show the expected answer to the runner.
- Judge against the skill's purpose, not personal taste.
- Prefer concrete evidence over scores.
- A single green run is encouraging, not proof.

## Output

Return cases run, verdicts, gaps found, and skill changes recommended.

