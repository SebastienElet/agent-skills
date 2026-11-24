---
name: writing-style
description: >
  Draft articles and documentation for human readers in French or English. Use when creating or
  substantially restructuring an article, guide, README, or documentation page. Make sure to use
  it whenever drafting those deliverables, even if style is not mentioned.
compatibility: >
  Requires `unslop` from the same package version for the final editorial pass.
metadata:
  category: ops
---

# Writing Style

## Overview

Shape an article or documentation page around the reader's purpose. Match the destination's
language, the author's voice, and the publication or repository's conventions.

## Usage

Use `$writing-style`, `/writing-style`, or a request such as “Turn these notes into a French
article for backend engineers.” Use `unslop` directly for a focused edit to an existing draft.

## Steps

1. Identify what readers already know and what they should understand or accomplish. Read the
   source material and any existing text whose voice or conventions the draft should follow.
2. Choose an order that serves the reader.
   - **Article**. Lead with a concrete observation or a claim the piece can support. Introduce
     unfamiliar ideas before relying on them. Use the author's examples and point of view where
     they help develop the argument.
   - **Documentation**. Start with the task, behavior, or decision readers came for. Give
     prerequisites before steps that depend on them. Use exact terms, commands, and expected
     results when the source material establishes them.
3. Draft in the destination language. Use headings that help readers find what they need. Give
   claims space in proportion to their evidence. Ask for missing information when it materially
   changes the piece and leave the gap visible if it remains open.
4. Load the same-version `unslop` skill and apply it once to the complete draft before returning
   it or saving it to the requested destination. If the skill is unavailable, deliver the draft
   and disclose that the editorial pass could not run.

## Gotchas

- **Starting from the source order**. Notes follow the author's discovery process. Reorder
  them around what readers need to know at each step.
- **Using article rhythm in a procedure**. A digression can bury a prerequisite. Put it where
  readers can act on it and move supporting context to a suitable point in the page.
- **Smoothing over a source gap**. A fluent sentence can make a guess sound established. Keep
  the author's uncertainty visible or ask for the supporting material.

## Constraints

- Use the language of the deliverable and honor its established vocabulary and conventions.
- Never invent observations, quotations, sources, or product behavior to complete a draft.
- Keep the final editing procedure in `unslop`. Publishing requires separate authorization.

## References

Inspired by [Wallforfry's writing-style](https://github.com/wallforfry/dotfiles/blob/c075d9c0e8f8e5bbd336a1362964f52f9965c10f/dot_config/agent-skills/writing-style/SKILL.md).
