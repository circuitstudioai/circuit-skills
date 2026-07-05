---
name: rls-policy-review
description: Review row-level security policies. Use when adding Supabase/Postgres RLS, changing auth policies, reviewing tenant/user isolation, or checking whether service-role functions safely bypass normal user access.
---

# RLS Policy Review

Use this skill to audit row-level security and ownership boundaries.

## State Check

```bash
rg -n "enable row level security|create policy|alter policy|security definer|auth\\.uid|service_role|tenant|organization|owner" .
```

## Table Checklist

For each user- or tenant-owned table:

- RLS enabled.
- Select policy exists.
- Insert policy exists if users create rows.
- Update/delete policies match ownership model.
- Tenant/org isolation is explicit.
- Admin/service paths are intentional.

## Service Function Checklist

For `security definer` or backend-only helpers:

- Function has a narrow purpose.
- Inputs are validated.
- Ownership checks exist or bypass is intentional.
- Search path is safe when applicable.
- Caller is restricted.

## Common Findings

- RLS enabled but no policy.
- Select policy too broad.
- Insert allows spoofed owner/user id.
- Update policy checks `using` but not `with check`.
- Service function bypasses tenant boundary.

## Output

Return verdict, tables reviewed, policies reviewed, findings, and required fixes.

