---
name: circuit-dev-loop
description: Standard development loop for Circuit Dev and cloud coding agents on circuitstudioai repos. Use when starting feature work, opening a PR, gating release, running automated review, requesting merge approval, or closing a shipped slice.
---

# Circuit Dev Loop

Operational checklist for Circuit Dev (principal architect) and Cursor cloud agents shipping circuitstudioai apps.

## Stack Assumptions

- Deploy: Vercel.
- Database and auth: Supabase (Supabase Auth).
- Gemini: call the API directly with `GEMINI_API_KEY` in Vercel env (not Vercel AI Gateway).
- Name env vars only; never paste values.

## 1. Intake

- Run `goal-prompt-contract` for the run objective, constraints, validation, and stop condition.
- Execute exactly **one** `implement-slice` per agent run.
- ClinicFlow and insurtech-buddy work still routes through Circuit Dev.

## 2. Model Choice

| Default | Composer or Grok (or another cost-efficient model) |
| --- | --- |
| Escalate | Top-tier model only for hard bugs, auth/RLS, or security work |

When escalating, note **why** in the PR body.

## 3. Branch Discipline

- One feature per branch or worktree.
- Name: `feat/<slug>-<YYYY-MM-DD>`.
- Never commit to `main`.

```bash
git checkout -b feat/<slug>-<date>
git status --short
```

## 4. Build To The Stack

Implement against the repo’s real scripts and providers. Do not swap stacks without explicit approval.

## 5. Gate Before PR

Always run `circuit-release-gate`.

When migrations or auth change, also run as applicable:

- `supabase-staging-validation`
- `database-migration-review`
- `rls-policy-review`

## 6. PR Evidence

Use `github-pr-evidence` shape. The PR body must include:

- Release gate packet (verdict + commands).
- Test output summary.
- Link to the CI run.
- `preview-deploy-validation` result.
- Desktop and mobile screenshots of changed UI (use `screenshot-critique` when reviewing visuals).

## 7. Automated Review (No Paid Bot)

1. Wait for CI green; use `ci-failure-triage` on failures.
2. Run `code-review` on the PR diff.
3. Run `security-and-hardening` when auth, RLS, secrets, or external integrations changed.
4. Fix or rebut every finding.
5. Post a PR comment update with changed items, evidence, and remaining blockers.

Do not request merge while unresolved critical/high review items remain.

## 8. Merge Request (Human Gate)

- Mark the PR ready for review.
- Send Abhishek the PR link, verdict, risks, and rollback steps.
- **Never merge or deploy production without his explicit go-ahead.**
- Log his approval in a PR comment (quote decision + timestamp).

## 9. Close

After merge and his deploy:

- Run `close-spec` for the shipped slice.
- Run `circuit-handoff` if work continues elsewhere.
- Run a production smoke check after he confirms deploy.

## Referenced Skills

Compose these by name from this repo:

| Skill | Step |
| --- | --- |
| `goal-prompt-contract` | Intake |
| `implement-slice` | Intake |
| `circuit-release-gate` | Gate |
| `supabase-staging-validation` | Gate (Supabase) |
| `database-migration-review` | Gate (migrations) |
| `rls-policy-review` | Gate (RLS/auth) |
| `github-pr-evidence` | PR |
| `preview-deploy-validation` | PR |
| `screenshot-critique` | PR (UI) |
| `ci-failure-triage` | Review |
| `code-review` | Review |
| `security-and-hardening` | Review |
| `close-spec` | Close |
| `circuit-handoff` | Close |

## Integrity Rules

- Do not weaken gates, tests, or RLS to look done.
- Do not merge or deploy without logged approval.
- Record blockers as evidence, not silence.
