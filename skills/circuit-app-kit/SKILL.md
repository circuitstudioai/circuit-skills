---
name: circuit-app-kit
description: Create or extend app projects through an approved app-kit path. Use when asked to build a new app, prototype safely, add an app module, create a scaffold, or discuss app-kit / safe app launchpad workflows.
---

# Circuit App Kit

Use the Circuit App Kit path whenever an agent is creating or materially extending an app project. The goal is fast app creation with boring deployment, auth, secrets, validation, and ownership.

## State Check

Before changing files, identify the repo and current status:

```bash
pwd
git status --short
rg --files -g 'AGENTS.md' -g 'README.md' -g 'package.json' -g 'vite.config.*' -g 'next.config.*' -g 'supabase/**'
```

If the work is in an existing app, read `AGENTS.md`, `README.md`, `package.json`, and the nearest app entry point first.

## Approved Default Stack

Prefer the existing app's stack. For a new app, default to the team's approved stack. A common baseline is:

- Frontend: Vite or Next.js, matching the target product's needs.
- Backend/data: Supabase/Postgres when persistence, auth, RLS, or storage are needed.
- Deploy: Vercel for web apps.
- Source control: GitHub or the team's approved source control.
- Automation: n8n only when the workflow benefits from visual orchestration or external SaaS chaining.

Do not switch an active product to a new backend or framework unless the user explicitly asks for an architecture migration.

## App Contract

Every new app or major module needs:

- Product owner and purpose in `README.md` or an app-specific docs file.
- Local dev command.
- Build command.
- Release gate command or checklist.
- Environment variable list with names only, no secret values.
- Auth/access assumption.
- Data source and persistence assumption.
- Known blockers.

## Workflow

1. Define the smallest useful app slice.
2. Reuse an existing app pattern before adding new architecture.
3. Add the implementation.
4. Add or update docs for env vars, local run, and validation.
5. Run the release gate with `circuit-release-gate` if available.
6. Prepare PR evidence with `github-pr-evidence` if opening or updating a PR.

## Hard Rules

- Do not commit secrets or paste secret values into docs.
- Do not remove auth, RLS, validation, or tests to make a demo easier.
- Do not create a marketing landing page when the request is for an app or tool.
- Do not create production-facing integrations without an explicit owner and rollback path.
- Do not assume Vercel or Supabase access exists; check and report blockers concretely.

## Output

When reporting progress, include:

- What app slice was created or changed.
- Commands run and pass/fail status.
- External blockers, especially Vercel, Supabase, GitHub, or provider access.
- The next most useful unblocked step.
