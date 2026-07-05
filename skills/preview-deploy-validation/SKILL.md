---
name: preview-deploy-validation
description: Validate preview deployments before release. Use when a Vercel/Netlify/Fly/Render preview URL exists, a PR deploy check passes or fails, or the user asks whether a deployed preview is actually usable.
---

# Preview Deploy Validation

Use this skill to prove a preview URL works beyond "deployment succeeded."

## State Check

```bash
git status --short
gh pr view --json number,title,url,statusCheckRollup
```

Collect the preview URL from the PR, deployment provider, or user.

## Validation Steps

1. Open the URL.
2. Check HTTP status.
3. Confirm the expected app route renders.
4. Exercise the core happy path.
5. Check browser console/network errors when browser tools are available.
6. Check responsive layout if the app has a UI.
7. Confirm auth/env blockers are explicit.

## Smoke Test Checklist

- Home or target route loads.
- No blank screen.
- No obvious hydration/runtime error.
- Primary CTA or workflow works.
- API calls return expected status.
- Auth state behaves as expected.
- Mobile viewport is not broken.

## Blocker Wording

Use:

- `blocked: preview URL unavailable`
- `blocked: deployment provider access missing`
- `blocked: required env vars missing`
- `red: preview renders but core workflow fails`
- `green: preview passes smoke validation`

## Output

Return URL, verdict, checks performed, evidence, and remaining blockers.

