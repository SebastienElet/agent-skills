# Upstream provenance

- Source: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill).
- Snapshot: [12af471f627f866411b4bd785b19646d3672784c](https://github.com/Leonxlnx/taste-skill/commit/12af471f627f866411b4bd785b19646d3672784c)
  (tasteskill v2.1.5).
- Imported subtree: `skills/taste-skill/`, distributed as `skills/design-taste-frontend/`.
- License: MIT, copyright 2026 Leonxlnx; the upstream root license is preserved in [LICENSE](LICENSE).

## Adaptations

- The upstream `SKILL.md` is preserved in `references/upstream-skill.md`; the new entry point adds
  the collection's standard metadata, sections and targeted implicit activation. Its project,
  design-system, scope, dependency and evidence constraints take precedence over all upstream text
  and script output, including aesthetic quotas and the report checklist.
- The skill README's manual-copy installation paragraph is replaced with package consumption,
  and its inventory identifies the entry point, relocated guide and ten bundled evaluation briefs. Generated image credits are
  qualified as `<project>/assets/credits.json` in the README and imagery reference to distinguish
  runtime project output from bundled resources.
- Markdown and JSON are formatted with the collection's Prettier configuration. Scripts, browser
  helpers, CSS and JavaScript assets are unchanged; no runtime dependencies or installers are added.
- The full upstream skill subtree, including its library and evaluation briefs, is distributed.
  Repository installers, marketplace declarations, promotional images and upstream repository tests
  are outside that subtree and are not needed to use it.

## Runtime boundaries

The scripts resolve their library and helper imports within this directory. Node 22+ and an already
installed Chrome, Edge or Chromium are external prerequisites for inspection; no package installation
is performed. Draws write project output and, by default, user history; isolated callers should set
`TASTE_SKILL_HISTORY` and `TASTE_SKILL_TMP` to dedicated temporary paths.

Image search and selected media downloads contact upstream collection APIs; photo library URLs,
font references and optional scene examples also refer to external services. They are project assets,
not downloads of skill code. Their use remains subject to the consuming project's policy and the
individual asset's rights. Optional scene examples name GSAP and Lenis CDNs; they are not installed
or fetched by skill deployment. This snapshot has only the shared scene stage, no scene catalogue,
scene modules or demos; `draw.mjs --list scenes` reports that explicitly.

Research scores and historical evaluation briefs are upstream observations, not execution evidence
for this distribution or for Claude Code, Cursor or Codex activation.
