# Reference evaluation

These pinned third-party instructions informed this adaptation; they are not authority for a
consuming project. Its own instructions and decisions govern its context.

## Generation

| Reference                                                                                                                                                 | Useful contribution                                                       | Local decision                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [effective-html: html-diagram](https://github.com/plannotator/effective-html/blob/2ac1dfecb0f2474e75260cb6d3c9b9d6d9b5062e/skills/html-diagram/SKILL.md)  | Select notation from relationships; inspect responsive, accessible output | Primary reference for dense diagrams; preserve CLI-first selection                                                                                     |
| [effective-html: html-plan](https://github.com/plannotator/effective-html/blob/2ac1dfecb0f2474e75260cb6d3c9b9d6d9b5062e/skills/html-plan/SKILL.md)        | Preserve commitments and distinguish decisions from unknowns              | Reuse traceability principles; planning remains in its existing workflow                                                                               |
| [visual-explainer 0.12.0](https://github.com/nicobailon/visual-explainer/blob/a0ece8a01dbd1e96533ed3acc372d012dbcc552b/plugins/visual-explainer/SKILL.md) | Figures answer a specific question; explain mechanisms and differences    | Retain purpose and explicit connections; reject default HTML, numerical/table thresholds, mandatory SVG, style-library loading and its review commands |

The local skill is one workflow, with no imported skill tree, template bundle, installer or
renderer. Use local HTML/CSS/SVG without build or remote dependencies when HTML earns its cost.
The terminal remains useful for small relationships, comparisons and grounded text bars.
MIT notices from both source repositories accompany this local adaptation. No upstream executable
or dependency was copied.

## Annotation: separate integration

[Plannotator's documented surface](https://github.com/backnotprop/plannotator/blob/71c968ceee1c68af8754123d603db10523c73185/README.md)
can annotate documents, HTML and diffs and return feedback to an agent. The
[Claude integration](https://github.com/backnotprop/plannotator/blob/71c968ceee1c68af8754123d603db10523c73185/apps/hook/README.md)
uses a plugin/mod or a `PermissionRequest` hook for `ExitPlanMode`; the
[Codex integration](https://github.com/backnotprop/plannotator/blob/71c968ceee1c68af8754123d603db10523c73185/apps/codex/README.md)
uses an experimental `Stop` hook for post-turn plan review. These are upstream contracts,
not observed workstation behavior. Cursor integration is not established by these sources.

The standalone binary serves a local browser interface. Its full installer also configures
host commands, skills and hooks; upstream offers a binary-only minimal installation. Rendering
local content needs a browser. Release checks and optional AI/sharing/URL features have distinct
network behavior; local rendering must not be described as universally offline.

An integration is a separate decision: inspect the consuming environment's hook ownership,
ordering, continuation, timeout, trust and installation before changing it. Hook-event overlap
alone proves no conflict or compatibility. These sources do not establish runtime success or
measure the benefit of annotation.
