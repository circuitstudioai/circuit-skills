# Reference Run 001: Monthly Budget App

This is the first end-to-end reference evaluation of Circuit Skills against a real app build. It records the complete path from a small product idea to a scoped slice, working implementation, release evidence, an honest blocked verdict, and a successful rerun.

## Goal

Test whether the public skills give a coding agent enough structure to:

1. turn an idea into a buildable spec,
2. implement one independently verifiable slice,
3. run concrete quality and security checks,
4. capture and critique UI evidence,
5. report blockers without claiming a false pass, and
6. finish the release after the environment is repaired.

## Skills exercised

- `write-app-spec`
- `implement-slice`
- `circuit-release-gate`
- `screenshot-critique`

The remaining skills were not evaluated by this run.

## Result

Verdict: encouraging pass for the core app-building loop.

The first release gate was yellow because Chromium could not launch without a system library. The agent recorded the precise blocker instead of weakening the visual requirement. After Playwright was repaired, the rerun captured desktop and mobile evidence, found and fixed accessibility and release-quality issues, and produced a green gate.

A single green reference run is not proof that every skill works across stacks, agents, or project sizes. See [`scorecard.md`](scorecard.md) for the limits of this result.

## Layout

- [`app/`](app/) — reproducible React/Vite application source and tests
- [`specs/`](specs/) — product spec and implemented slice
- [`evidence/`](evidence/) — final screenshots and green review reports
- [`evidence/initial-yellow-release-gate.md`](evidence/initial-yellow-release-gate.md) — original honest blocker
- [`scorecard.md`](scorecard.md) — evaluation judgment and next cases

## Reproduce

```bash
cd examples/budget-validation-app/app
npm ci
npm test
npm run build
npm run lint
npm audit --audit-level=high
```

Run `npm run dev -- --host 127.0.0.1`, then use Playwright to capture desktop and mobile screenshots if visual evidence needs to be regenerated.

## Hosting

For Vercel, set the project root directory to `examples/budget-validation-app/app`. The app is a standard Vite build with `dist/` output.
