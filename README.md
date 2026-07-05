# Circuit Skills

Agent skills as lightweight release infrastructure.

This repo is a public example of how Circuit Studio is experimenting with small, reusable `SKILL.md` workflows for agent-built apps. The goal is simple: give coding agents paved roads for scaffolding, validation, pull requests, staging checks, and handoffs instead of asking them to improvise every workflow from scratch.

Inspired by:

- Block's App Kit writeup: https://engineering.block.xyz/blog/from-localhost-to-launched-safely-shipping-apps-that-anyone-can-build
- David Ondrej's public skills repo: https://github.com/davidondrej/skills

## Version

Current version: `0.1.0`

## Included Skills

| Skill | Purpose |
| --- | --- |
| `circuit-app-kit` | Create or extend app projects through an approved app-kit path. |
| `circuit-release-gate` | Run build, lint, test, security, data-quality, and evidence checks before release. |
| `circuit-handoff` | Produce state-focused handoffs for long-running or interrupted agent work. |
| `supabase-staging-validation` | Validate migrations, RLS, service functions, and staging evidence for Supabase-backed apps. |
| `github-pr-evidence` | Prepare reviewer-ready PR summaries, evidence, risks, and follow-up notes. |

## Why Skills?

Prompts are easy to write and easy to lose. Skills are versioned operating procedures.

A good skill gives an agent:

- when to use the workflow,
- what state to check before acting,
- which commands or evidence matter,
- what must not be weakened,
- how to report blockers honestly.

## Operating Principles

- Prefer exact commands and state checks over generic guidance.
- Keep skills small and composable.
- Never paste or expose secrets.
- Do not weaken tests, release gates, or validation thresholds to make work look complete.
- Record blockers as evidence.
- Treat external actions such as pushes, deploys, comments, invites, and merges as deliberate operations.

## Layout

```text
skills/
  <skill-name>/
    SKILL.md
    agents/openai.yaml
```

## Validate

```bash
python3 scripts/validate-skills.py
```

The validator checks that each skill has:

- a `SKILL.md`,
- YAML-style frontmatter,
- matching `name`,
- a non-placeholder `description`,
- optional `agents/openai.yaml` metadata.

## Install

Copy or symlink selected skill folders into your agent's skill directory.

Examples:

```bash
# Codex-style local skill directory
mkdir -p ~/.codex/skills
ln -s "$PWD/skills/circuit-release-gate" ~/.codex/skills/circuit-release-gate

# Or copy instead of symlinking
cp -R skills/circuit-handoff ~/.codex/skills/
```

Treat this repo as inspiration, not a universal framework. The best skills are usually specific to the team, stack, and failure modes they are meant to protect.

