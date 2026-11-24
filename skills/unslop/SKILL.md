---
name: unslop
description: >
  Revise existing prose with minimal edits that preserve the author's voice. Use when asked to
  polish, clarify, tighten, or remove formulaic language from a draft. Use writing-style for
  substantial article or documentation restructuring. Make sure to use unslop for focused
  editorial revisions and the final pass of writing-style.
metadata:
  category: ops
---

# Unslop

## Overview

Improve an existing draft in the language and register of its audience. Keep the author's meaning,
voice, technical terms, and degree of certainty. Change only what improves the draft.

## Usage

Use `$unslop`, `/unslop`, or a request such as “Clarify this message before I send it.” For a
standalone edit, ask for the draft if it is missing. When called by `writing-style`, review the
completed draft once and return it to that workflow for delivery. Code review, issue scoping,
and skill maintenance follow their own workflows.

## Steps

1. Read the full draft. Identify the requested edit, the intended reader, and which claims,
   qualifications, and turns of phrase matter to the author.
2. Revise unclear or repetitive passages in place. Use these cues where they improve the text:
   - Cut filler openings, transitions that state no actual connection, and conclusions that
     repeat the last point. State the point directly when a contrast exists only for emphasis.
   - Replace interchangeable claims with the action, condition, or result supported by the
     draft. Name the actor or source when the supplied material identifies it.
   - Use direct verbs and a consistent term for each concept. Vary the rhythm where repetitive
     sentences make the passage harder to read.
3. Compare the revision with the original. Check facts, references, uncertainty, and deliberate
   choices of tone. Return the result in the requested format.

## Gotchas

- **Vague attribution**. A claim such as “experts agree” needs a named source. If the draft depends
  on an attribution you cannot substantiate, flag it for the author.
- **Mechanical cleanup**. A blacklist can erase precise terminology, useful contrasts, or a
  distinctive voice. Keep language that does real work.
- **Invented specificity**. Adding a number, cause, or example can quietly change the claim.
  Use available material and flag consequential gaps.

## Constraints

- Scope edits to the requested draft. Routine replies and requests to write from scratch do not
  trigger standalone revision.
- Preserve supported facts, uncertainty, specialist terms, and the author's position.
- Keep added details grounded in the supplied material. Do not make up facts or add opinions
  or recommendations on the author's behalf.
- Treat quoted wording as exact. Keep any publication or sending action within the user's request.

## References

The minimal-edit approach draws on [no-ai-slop](https://github.com/petergyang/no-ai-slop).
The diagnostic cues draw on [P-Stack's unslop](https://github.com/cursor/plugins/blob/2f87c854fe3e2fcda44ca86b46ede35aad3c46b7/pstack/skills/unslop/SKILL.md).
