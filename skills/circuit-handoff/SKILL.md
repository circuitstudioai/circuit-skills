---
name: circuit-handoff
description: Create a state-focused handoff for agent work. Use when context is getting long, work is paused, another agent should continue, a PR needs continuity notes, or the user asks for a handoff / status packet.
---

# Circuit Handoff

Write handoffs that preserve state, decisions, traps, and blockers without bloating the next session.

## Read First

If available, read:

```bash
test -f AGENTS.md && sed -n '1,220p' AGENTS.md
git status --short
git log --oneline --max-count=5
```

Do not restate stable repo instructions already covered by `AGENTS.md`.

## Handoff Template

```markdown
# Handoff: <work title>
Generated: <timestamp>

## Goal
<The business/product outcome in 1-3 sentences.>

## Current State
- DONE: <completed facts>
- PARTIAL: <in-progress facts>
- NOT STARTED: <known remaining scope>

## Key Decisions
- <decision> - <why>

## Validation Evidence
- `<command>` - <pass/fail/not run and why>

## Blockers
- <missing access, credential, product decision, or external dependency>

## Traps / Do Not Repeat
- <failed approach or tempting wrong move>

## Relevant Files
- `<path>` - <why it matters>

## Next Useful Step
<One concrete next step, phrased as status/context rather than a command when possible.>
```

## Rules

- State facts, not motivational summaries.
- Redact secrets and credentials.
- Include missing env var names, never values.
- Prefer file paths, PR numbers, issue numbers, and commands over broad prose.
- Keep it concise enough to paste into a new agent session.
