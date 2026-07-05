---
name: database-migration-review
description: Review database migrations for safety. Use when adding or reviewing SQL migrations, schema changes, indexes, constraints, destructive statements, backfills, or rollback notes before merge or deploy.
---

# Database Migration Review

Use this skill before merging database schema changes.

## State Check

```bash
git status --short
rg --files -g 'supabase/migrations/**' -g 'migrations/**' -g 'db/**'
rg -n "create table|alter table|drop table|truncate|delete from|create index|policy|constraint" .
```

## Review Areas

- Migration order and naming.
- Destructive operations.
- Backward compatibility with deployed code.
- Required indexes.
- Constraints and defaults.
- Data backfill strategy.
- Rollback or recovery path.
- RLS/auth impact.

## Destructive SQL

Flag before merge:

```bash
rg -n "drop table|drop column|drop schema|truncate|delete from|alter table .* drop" .
```

Destructive SQL is not automatically wrong, but it needs explicit rationale and rollback.

## Output

```markdown
## Migration Review
Verdict: <green | yellow | red | blocked>
Files: <migration files>
Risk: <low | medium | high>
Findings:
- <finding>
Required before merge:
- <action or None>
```

## Rules

- Do not run migrations against production unless explicitly asked.
- Do not ignore RLS changes.
- Do not treat local migration success as staging validation.

