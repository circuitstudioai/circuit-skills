#!/usr/bin/env python3
"""Validate the public Circuit Skills repo without external dependencies."""

from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILLS_DIR = ROOT / "skills"


def parse_frontmatter(text: str) -> tuple[dict[str, str], list[str]]:
    errors: list[str] = []
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, ["missing opening frontmatter fence"]

    try:
        end = lines[1:].index("---") + 1
    except ValueError:
        return {}, ["missing closing frontmatter fence"]

    meta: dict[str, str] = {}
    for raw in lines[1:end]:
        if not raw.strip():
            continue
        if ":" not in raw:
            errors.append(f"invalid frontmatter line: {raw}")
            continue
        key, value = raw.split(":", 1)
        meta[key.strip()] = value.strip().strip('"')

    return meta, errors


def validate_skill(path: Path) -> list[str]:
    errors: list[str] = []
    skill_md = path / "SKILL.md"
    if not skill_md.exists():
        return ["missing SKILL.md"]

    text = skill_md.read_text(encoding="utf-8")
    meta, fm_errors = parse_frontmatter(text)
    errors.extend(fm_errors)

    name = meta.get("name")
    description = meta.get("description")
    if name != path.name:
        errors.append(f"frontmatter name {name!r} does not match folder {path.name!r}")
    if not description:
        errors.append("missing description")
    elif "TODO" in description or "Complete and informative" in description:
        errors.append("placeholder description")

    if "TODO" in text:
        errors.append("contains TODO placeholder")

    openai_yaml = path / "agents" / "openai.yaml"
    if openai_yaml.exists():
        yaml_text = openai_yaml.read_text(encoding="utf-8")
        for field in ("display_name", "short_description", "default_prompt"):
            if field not in yaml_text:
                errors.append(f"agents/openai.yaml missing {field}")

    return errors


def main() -> int:
    if not SKILLS_DIR.exists():
        print("skills directory missing", file=sys.stderr)
        return 1

    failed = False
    for skill in sorted(p for p in SKILLS_DIR.iterdir() if p.is_dir()):
        errors = validate_skill(skill)
        if errors:
            failed = True
            print(f"FAIL {skill.name}")
            for error in errors:
                print(f"  - {error}")
        else:
            print(f"OK   {skill.name}")

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())

