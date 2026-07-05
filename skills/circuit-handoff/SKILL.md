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

## What Belongs In A Handoff

Include things the next agent cannot cheaply recover:

- why a decision was made,
- what failed already,
- what is blocked externally,
- what commands were run,
- which files matter and why,
- what is intentionally out of scope.

Skip things the next agent can get from `ls`, `package.json`, or the code itself unless they are surprising.

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

## Quality Bar

A good handoff lets a fresh agent continue without:

- asking what repo this is,
- rerunning already-failed approaches,
- guessing which checks passed,
- confusing local readiness with staging readiness,
- exposing secrets or personal data.

## Common Mistakes

- Writing a motivational summary instead of state.
- Saying "tests pass" without the command.
- Saying "blocked on env" without naming the env vars.
- Copying long diffs instead of referencing files.
- Telling the next agent what to do without preserving why.

## Rules

- State facts, not motivational summaries.
- Redact secrets and credentials.
- Include missing env var names, never values.
- Prefer file paths, PR numbers, issue numbers, and commands over broad prose.
- Keep it concise enough to paste into a new agent session.
