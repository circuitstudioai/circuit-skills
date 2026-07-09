# Examples

These examples show what a normal user should get back after installing Circuit Skills and asking an agent to use them.

They are intentionally small and stack-neutral. Treat them as output shapes, not as project templates.

## Day One Flow

1. Install the repo:

```bash
npx skills add circuitstudioai/circuit-skills
```

2. Ask an agent to write a spec:

```text
Use the write-app-spec skill from circuit-skills.

I want to build a small team launch checklist app. Users can create a launch, add checklist items, mark owners, and see what is blocked before launch day.

Write the first buildable spec and split it into independently verifiable slices.
```

3. Ask the agent to implement only the first slice:

```text
Use the implement-slice skill from circuit-skills.
Read specs/launch-checklist/README.md and implement slice 001 only.
Run the slice validation and update the slice status with evidence.
```

4. Ask for release evidence:

```text
Use the circuit-release-gate skill from circuit-skills.
Run the checks available in this repo and return a release gate verdict with commands, evidence, blockers, and the next step.
```

5. Ask for visual review before merge:

```text
Use the screenshot-critique skill from circuit-skills.
Review these desktop and mobile screenshots for visible UI defects before I merge the launch checklist slice.
```

## Included Example Artifacts

- `first-app-spec/README.md` shows the spec shape produced by `write-app-spec`.
- `first-app-spec/slices/001-create-launch-checklist.md` shows one independently verifiable slice.
- `release-gate-report.md` shows a concise release evidence packet.
- `visual-review.md` shows how screenshot critique findings should be reported.

## Validation Test Prompt

Use this prompt when testing whether Circuit Skills works in a real app repo:

```text
Use circuitstudioai/circuit-skills to build one small but real feature in this repo.

Start with write-app-spec, implement only the first independently verifiable slice, run the matching release gate checks, and include screenshot or preview evidence if the feature has UI.

Do not skip evidence. If something is blocked by credentials or missing tooling, report it as blocked instead of pretending it passed.
```
