---
name: blast-radius-review
description: Assess what a schema, migration, or shared-code change could break outside the diff before merge. Use when migrations, shared libraries, API contracts, or cross-package types change, or when a small diff touches high fan-out code.
---

# Blast Radius Review

Adapted from [plugins `pstack/blast-radius`](https://github.com/circuitstudioai/plugins/tree/main/pstack) (MIT). Operational checklist for circuitstudioai repos; not a verbatim copy.

Use when the Circuit Dev loop flags schema, shared libraries, or contract changes. Listing callers is not enough — name the **one fact** the change is safe because of, and prove it when cheap.

## When To Run

- Database schema or migration edits.
- Shared package, type, or utility used across apps.
- Public API or wire-format changes.
- Feature flags or env toggles with cross-service effect.

Skip for isolated UI copy in one route with no shared dependencies.

## Steps

1. Read the diff plus symbols added, changed, or removed.
2. **Find the one safety fact** — e.g. “callers already handle null” or “column is write-only server-side”. If it holds, most scares drop away.
3. **Go where grep stops:** pinned library version, runtime timing, JSON/DB columns, consumers in other repos, feature flags.
4. Rate remaining risks: likelihood, impact, and how to verify. Separate **confirmed risks** from **cleared checks**.
5. **Prove the fact when cheap:** a small script or test that imports the same module and exercises the worried path; paste pass/fail output in the PR.

Do not ship a prose-only blast-radius essay without evidence.

## Output

```markdown
## Blast Radius
Change summary: <one paragraph>

Safety fact: <statement>
Proof level: <line citation | walked case | script/test run | unproven>

### Risks
- <risk> — likelihood/impact — verify: `<command or check>`

### Cleared
- <what you checked and why it is fine>

Before merge: <cheapest test or repro that catches the real regression>
```

## Rules

- Cite real `file:line` paths; do not invent callers.
- Mark the safety fact **unproven** when you cannot verify — treat as a merge blocker until proven or scoped down.
- Keep writeups public-safe: no secrets, internal hostnames, or private account names.
