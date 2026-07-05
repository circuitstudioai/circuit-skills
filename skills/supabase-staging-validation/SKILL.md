---
name: supabase-staging-validation
description: Validate Supabase-backed apps in staging. Use when running migrations, checking RLS, validating service-role functions, producing staging evidence, or when SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY access blocks validation.
---

# Supabase Staging Validation

Use this skill when an app depends on Supabase migrations, RLS, service functions, storage, auth, or staging evidence.

## State Check

```bash
pwd
git status --short
rg --files supabase docs scripts | sort
echo "SUPABASE_URL set? ${SUPABASE_URL:+YES}"
echo "SUPABASE_SERVICE_ROLE_KEY set? ${SUPABASE_SERVICE_ROLE_KEY:+YES}"
echo "VITE_SUPABASE_URL set? ${VITE_SUPABASE_URL:+YES}"
echo "VITE_SUPABASE_ANON_KEY set? ${VITE_SUPABASE_ANON_KEY:+YES}"
```

If service credentials are unavailable, stop before pretending staging was validated. Continue with local static checks only.

## Local Static Checks

Inspect:

- Migration ordering and naming.
- RLS policies for new tables.
- Service-role helper functions.
- Validation SQL scripts.
- Docs that list env vars and staging steps.

Useful commands:

```bash
rg -n "create table|alter table|policy|security definer|service_role|rls|storage" supabase
rg -n "SUPABASE|staging|migration|RLS|validation" docs scripts README.md
```

## Staging Evidence

When credentials exist, run the repo's documented validation first. Prefer existing validation scripts. Examples:

```bash
ls supabase/sql/validation*.sql
psql "$SUPABASE_URL" -f supabase/sql/validation_<area>.sql
```

Adjust only to match the repo's actual documented command.

Evidence should cover:

- Migrations applied.
- Tables exist.
- RLS is enabled where required.
- Policies protect tenant/user data.
- Service-role functions exist and return expected shapes.
- Idempotency/replay behavior where relevant.
- Storage buckets or artifact URLs where relevant.

## Rules

- Never print or commit Supabase keys.
- Do not run destructive SQL unless the user explicitly asks and the target is confirmed non-production.
- Do not mark staging green if only local SQL inspection was performed.
- Record exact missing env vars when blocked.

## Output

Return:

- `validated`, `partially validated`, or `blocked`.
- Commands run.
- Evidence summary.
- Missing credentials or access.
- Recommended next validation step.
