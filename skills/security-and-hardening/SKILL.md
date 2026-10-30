---
name: security-and-hardening
description: Review changes for auth, secrets, RLS, injection, and unsafe defaults before merge. Use when Supabase auth/RLS, API routes, env handling, or third-party integrations change, or when the Circuit Dev loop requires a security pass.
---

# Security And Hardening

Adapted for Circuit Skills from the intended `security-and-hardening` workflow in [circuit-agent-blueprint](https://github.com/circuitstudioai/circuit-agent-blueprint) (source repo not used verbatim; aligned with this repo’s skill style).

Pair with `rls-policy-review` and `database-migration-review` when database policies change.

## State Check

```bash
gh pr diff
rg -n "service_role|SUPABASE_SERVICE|API_KEY|SECRET|password|token|eval\(|dangerouslySetInnerHTML" --glob '!node_modules' --glob '!dist'
test -d supabase && rg -n "POLICY|ENABLE ROW LEVEL SECURITY|SECURITY DEFINER" supabase/
```

Read `AGENTS.md` or repo security notes when present.

## Checklist

### Secrets and config

- No secrets, tokens, or private keys in code, logs, or PR text.
- Env vars referenced by name only in docs and comments.
- Client bundles must not embed server-only keys (`SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, etc.).

### Auth and session

- Supabase Auth used consistently; no custom auth bypass without explicit design.
- Server actions and API routes validate the caller before mutations.
- Cookies/session settings appropriate for production (httpOnly, secure, sameSite where applicable).

### RLS and data access

- Tables exposed to clients have RLS enabled and policies match product roles.
- No broad `USING (true)` on sensitive tables without documented reason.
- Service-role usage limited to trusted server/worker paths.

### Input and output

- SQL via parameterized queries or Supabase client (no string-concat SQL).
- HTML/JS injection paths sanitized or escaped.
- File uploads and webhooks validated (type, size, signature when applicable).

### Dependencies and supply chain

- New dependencies justified; known risky patterns flagged (dynamic `require`, postinstall scripts) when introduced.

## Finding Format

```markdown
### [security-<severity>] <title>
- File: `<path>:<line>`
- Risk: <confidentiality | integrity | availability | authz>
- Evidence: <what is unsafe>
- Remediation: <concrete fix>
```

## Verdict

```markdown
## Security Review
Verdict: <pass | pass with notes | block>
Must fix before merge: <list or None>
Follow-up: <RLS staging validation, rotation, etc., or None>
```

## Rules

- Do not downgrade RLS or remove checks to unblock merge.
- Name missing env vars only, never values.
- Block merge on unmitigated critical/high authz or secret-exposure findings.
