---
name: design-taste-frontend
description: >
  Art direction and visual critique for frontend pages and app screens. Use when designing,
  redesigning, restyling, polishing or visually reviewing a frontend. Make sure to use this skill
  whenever frontend design quality is the task, even if unnamed. Excludes backend work and
  functional fixes without a visual design request.
license: MIT
compatibility: >
  Node 22+ and an installed Chrome, Edge or Chromium for browser inspection. Asset search needs
  network access. Scripts install no dependencies.
metadata:
  category: dev
---

# Design Taste Frontend

## Overview

Apply tasteskill's researched art directions, library, source scan and browser critique to frontend
visual design. The complete upstream guide is [references/upstream-skill.md](references/upstream-skill.md);
its research observations and aesthetic rules are guidance, not universal quality guarantees.
[UPSTREAM.md](UPSTREAM.md) records the pinned source, license and local adaptations.

## Usage

Select implicitly for frontend design work or explicitly with `$design-taste-frontend` or
`/design-taste-frontend`. For example: “Polish this dashboard using our existing components and tokens.”
A visual review produces findings only; a component polish stays within that component. A functional
fix without a visual design request does not activate this skill.

## Steps

1. Read the consuming project's instructions, design system, existing components and requested scope.
   They take precedence over every upstream instruction, generated direction and script finding.
   Preserve the stack, tokens, accessibility requirements and behavior. Do not expand a component
   task into a page redesign, introduce interactions or motion, or change a design system merely
   to meet the house style.
2. Read [references/upstream-skill.md](references/upstream-skill.md). All paths in that guide and
   the upstream references are relative to this skill's root, represented by `<skill>` in commands.
   For an app screen also read [references/app-screens.md](references/app-screens.md); use its app
   workflow instead of the page workflow. For an existing component, use the guide's special case.
3. Run the applicable draw and build or review workflow from the project root. Keep existing palette
   and type with `--keep palette,type`; retain the project's other design decisions too. Treat
   pictures, motion, typography and layout quotas as upstream defaults only where compatible with
   the brief. Do not fabricate business facts or implement payment, pricing or access policies
   suggested by sample directions.
4. Use only installed prerequisites. Keep working output in the project; for isolated work set
   `TASTE_SKILL_HISTORY` to a temporary path and `TASTE_SKILL_TMP` to a dedicated temporary directory.
   Draws otherwise also write `~/.taste-skill/history.json`. Do not run an installer, fetch skill
   updates or add dependencies. Asset search and selected media downloads are optional project
   work, subject to its network, privacy and licensing policy; never submit private briefs or data.
   Fonts and optional scene CDN examples need the project's dependency and hosting approval.
5. Run the applicable bundled lint and browser inspection, then inspect the resulting screenshots.
   These are aesthetic diagnostics, not the project's acceptance barrier. Use inspector `--allow`
   only for named rules that conflict with established requirements; document those exceptions.
   The source linter has no `--allow`: report its conflicting findings rather than changing
   compliant project code to silence them. Run the project's relevant checks as well.
6. Report actual commands, viewports, findings, exceptions and visual observations. If a prerequisite
   is unavailable, report the unrun check immediately; the upstream report checklist does not
   prohibit reporting a limitation. Distinguish measured findings from subjective critique and
   never claim that file deployment proves agent discovery or activation.

## Gotchas

- **Page rules on an app screen** — marketing quotas damage working interfaces; select `--app`
  and read the app workflow before drawing or inspecting.
- **House style overriding a design system** — generated directions and diagnostics can reject valid
  project choices; keep the project's decisions and report the conflicting rule.
- **Draw history outside the project** — default draws write user history; redirect
  `TASTE_SKILL_HISTORY` during isolated checks.
- **An empty scene catalogue** — this snapshot has no `library/scenes.json`, scene modules or demos;
  `--list scenes` reports that absence. Use the shared stage only when the task needs a scene.
- **Missing browser or network** — an unrun inspector or unavailable image source supplies no
  evidence; report the gap and use available project tools within scope.

## Constraints

- Follow consuming-project instructions, design decisions and the user's scope over upstream defaults.
- Keep review-only work read-only and preserve existing functional behavior during visual work.
- Never install prerequisites, download skill code, auto-update or deploy agent configuration.
- Do not add media, external fonts, CDN dependencies or animation solely to satisfy a numerical quota.
- Verify image and font rights for the actual use; a search result's license label is not legal approval.
- Do not claim visual quality, host discovery or activation from a successful script or filesystem check.
