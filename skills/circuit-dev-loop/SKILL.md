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

Adapted from [agent-skills `git-workflow-and-versioning`](https://github.com/circuitstudioai/agent-skills) (MIT).

- **One feature per branch or git worktree** — parallel streams stay isolated until merge.
- Name: `feat/<slug>-<YYYY-MM-DD>` (or team `fix/` / `chore/` prefixes when appropriate).
- Branch from `main`; keep branches short-lived; delete after merge.
- **Never commit to `main`.**
- Prefer atomic commits per verified slice; do not accumulate a giant uncommitted diff.

```bash
git checkout main && git pull
git checkout -b feat/<slug>-<date>
# optional parallel agent:
git worktree add ../<repo>-<slug> feat/<slug>-<date>
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

### UI changes

- Screenshots at **1440px** and **390px** viewport widths (desktop and mobile).
- Run an **axe-core** accessibility pass on changed routes; paste summary (violations fixed or deferred with reason).
- Use `screenshot-critique` on the captures when judging visuals.

### Bug fixes

- Write a **failing test first** that reproduces the bug, then implement the fix and show the test green.

## 7. Automated Review (No Paid Bot)

1. Wait for CI green; use `ci-failure-triage` on failures.
2. Run `code-review` on the PR diff with a **reviewer model different from the author model**.
3. Run `security-and-hardening` whenever **auth, RLS, secrets, or external integrations** change.
4. Run `blast-radius-review` when **schema, migrations, shared libraries, or cross-package contracts** change.
5. Fix or rebut every **Critical** and required finding.
6. Post a PR comment update with changed items, evidence, and remaining blockers.

Do not request merge while unresolved Critical or required review items remain.

## 8. Merge Request (Owner Gate)

- Mark the PR ready for review.
- Send the owner the PR link, verdict, risks, and rollback steps.
- **Never merge or deploy production without explicit owner approval.**
- **Before merge:** re-run release gate (and applicable checks) on the **latest commit**; CI must be green on that SHA.
- Log **owner approval** in a PR comment (decision + timestamp).

## 9. Close

After merge and owner deploy:

- Run `close-spec` for the shipped slice.
- Run `circuit-handoff` if work continues elsewhere.
- Run a production smoke check after deploy is confirmed.

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
| `blast-radius-review` | Review (schema/shared code) |
| `close-spec` | Close |
| `circuit-handoff` | Close |

## Integrity Rules

- Do not weaken gates, tests, or RLS to look done.
- Do not merge or deploy without logged owner approval.
- Record blockers as evidence, not silence.
