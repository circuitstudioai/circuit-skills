---
name: skill-design-guide
description: Design, review, or improve agent skills. Use when creating a new SKILL.md, expanding a skills repo, deciding skill boundaries, writing trigger descriptions, or checking whether a skill is too broad, vague, or unsafe.
---

# Skill Design Guide

Use this skill to turn repeated agent work into a small, portable, useful `SKILL.md`.

## Core Rule

One skill should teach one workflow or capability. If the skill covers planning, implementation, testing, deployment, and documentation, split it.

## Anatomy

Every skill needs:

- `name`: lowercase, hyphenated, same as folder.
- `description`: routing contract. Include what it does and when to use it.
- body: only the instructions the agent needs after the skill triggers.
- optional `agents/openai.yaml`: UI metadata.
- optional scripts/references/assets only when they reduce repeated work.

## Good Skill Test

A useful skill should answer:

- What user request should trigger this?
- What should the agent check before acting?
- What exact steps reduce errors?
- What evidence proves completion?
- What must not happen?
- What should the final answer include?

## Description Pattern

```text
<Do X>. Use when <specific user asks / situations / files / workflows>. Differentiator: <when this skill is preferred over adjacent skills>.
```

Avoid vague descriptions like "helps with apps" or "useful workflow." The description is the routing layer.

## When To Add Detail

Add detail for:

- fragile commands,
- recurring failure modes,
- safety boundaries,
- evidence formats,
- state checks,
- project-specific conventions.

Do not add detail for things the model already knows, like what Git is or how Markdown works.

## Validation

Before release:

```bash
python3 scripts/validate-skills.py
rg -n "PLACEHOLDER|Complete and informative|/home/|password|credential literal" .
```

Report any intentional matches.
