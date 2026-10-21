---
name: bug-fix
description: >
  Carry a bug through reproduction, confirmed cause, repair, replay and authorized delivery.
  Use when asked to fix unexpected behavior, with or without a ticket. Make sure to use this skill
  whenever diagnosis must continue into an authorized repair, even after interruption.
  Excludes diagnosis-only requests and explicit open-PR repair.
metadata:
  category: dev
---

# Bug Fix

## Overview

Keep responsibility for an authorized repair across diagnosis and implementation. Compose
`diagnosing-bugs` for the investigation and `implement` for realization and delivery under
`orchestrate`. The original symptom remains an acceptance criterion throughout; a plausible cause
or passing unit test cannot finish the repair.

## Usage

Use `$bug-fix <symptom>` or `/bug-fix <symptom>`, or apply it to an ordinary repair request.
For example: `Fix duplicate invoices under concurrent submission, verify and commit locally;
do not push.` No ticket, particular agent or independent review is required by this path.

Diagnosis alone stays with `diagnosing-bugs` and authorizes no repair. An explicit open-PR repair
retains `pr-fix` and its existing loop owner. A manual handoff to Claude retains `claude-developer`;
this path does not authorize launching Claude.

## Steps

1. **Recover the repair context.** Apply `orchestrate` for the mandate, candidate, permitted
   effects, bounded recovery and resumption. With a ticket, use `issue-start` and `issue-workflow`
   for verified eligibility and exact branch/PR context unless already current. Without one,
   inspect Git state, remotes and existing work directly; require no tracker or ticket creation.
   On resumption, reconcile actual contents before writing and preserve others' edits. Retain the
   original reproduction, hypothesis history, regression results and consumed investigation budget;
   refresh only evidence whose candidate or inputs changed. Missing history is a limit, not a
   fresh budget or permission to overwrite work.

2. **Establish symptom and cause.** Give `diagnosing-bugs` a bounded diagnosis-only outcome:
   reproduce the reported symptom at the relevant boundary, distinguish hypotheses with execution
   evidence and return before repair. Consume its command or observation, original inputs and
   environment, minimized reproduction, tested predictions and confirmed mechanism. Keep observed
   symptom, confirmed cause, hypothesis and unavailable environment distinct. Source inspection
   alone cannot confirm the cause. If execution is inaccessible, retain the exact missing access
   or redacted observation and next probe; continue independent inspection and preparation, asking
   only for what available authorized tools cannot obtain. Do not claim demonstrated repair.

3. **Act on contrary evidence.** When a prediction is refuted, return to `diagnosing-bugs` with
   the observation and remaining budget. Remove only temporary or speculative changes motivated
   solely by that hypothesis, preserving unrelated work and useful regression evidence. An
   inconclusive observation leaves the hypothesis unconfirmed. Repeat only evidence-producing
   probes within `orchestrate`'s retained limit; do not restart the hunt after interruption.

4. **Continue the confirmed repair.** Pass the confirmed cause and reproduction to `implement`
   under the same owner and mandate, retaining verified startup context rather than starting it
   again. Include the original scenario and affected consumers in its acceptance criteria. Let
   `plan` resolve consequential design choices when needed; an obvious fix needs no heavy plan.
   Use local `tdd` through `implement` for the smallest regression proof at the boundary owning
   the failure: observe failure for this mechanism before repair, then success after the targeted
   fix. Reuse existing or native validation for declarative or external-tool behavior. If no
   adequate automated boundary exists, name the gap and why direct replay is the relevant evidence;
   do not add a shallow substitute or a new harness by default. Missing essential evidence blocks
   demonstrated completion, even when independent preparation can continue.

5. **Require the original replay before delivery.** Keep this as a verification condition of
   `implement`, before its review and delivery stages: rerun the unreduced original scenario on
   the matching surface and conditions, check the affected effects and run the required repository
   checks on the complete candidate. Consume the actual results and environment, including any
   regression red/green evidence; a green reduced test does not replace the original replay.
   For intermittent symptoms, retain the baseline frequency, controlled conditions and observation
   window; a single clean run or inconclusive replay cannot establish correction. Never hide the
   symptom with retries, skips or weaker assertions. If evidence challenges the cause, return to
   diagnosis through step 3; if it challenges the design, return to `plan` within the same budget.
   Rerun affected checks after correction and remove temporary instrumentation.

6. **Finish within the mandate.** Continue `implement`'s existing review and delivery stages
   without another human phase launch or a second review/correction loop. Review stays optional
   unless requested or already required. Its GitHub or Bitbucket adapter, selected from verified
   remotes, owns repository/PR operations and checks for the exact remote revision, also without a
   ticket; require no tooling from the other forge. With a ticket, retain `issue-start`'s PR
   association and `issue-workflow`'s completion-evidence policy. Preserve `orchestrate`'s recovery
   of uncertain external effects before retrying. Commit, push, PR, tracker updates and further
   delivery remain separately bounded by the mandate. Report what was broken, the demonstrated
   cause and fix, reproduction and regression results, original replay, execution environment,
   untested supported targets, actual delivery identity and any precise remaining blocker. Never
   describe a repair as demonstrated when reproduction or replay remains unavailable.

## Gotchas

- **Diagnosis returns a recommendation** — an authorized repair stops early; consume the cause
  and continue through `implement` without asking the user to launch each stage.
- **A disproved theory leaves its patch behind** — unsupported changes ship with the real fix;
  withdraw only the changes justified solely by that theory and resume diagnosis.
- **The reduced test passes on another surface** — the reported symptom remains untested; retain
  the original inputs and replay them at the affected boundary before delivery.
- **Resumption remembers only HEAD** — local changes, failed probes and spent budgets disappear;
  reconcile candidate contents and diagnosis history through `orchestrate` before continuing.

## Constraints

- Never repair from a diagnosis-only request or infer external-write authority from this path.
- Never call a hypothesis a confirmed cause, or missing, stale or inconclusive replay a success.
- Never require a tracker, unrelated forge, particular agent, subagent or model.
- Never duplicate specialist procedures or introduce a new review loop, mirror gate or validator.
- Never reset investigation limits across retries, delegates or sessions, or discard foreign edits.

## References

These pinned sources are inspirations; local specialists and the mandate govern execution.

- [Bug fix](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/poteto-mode/playbooks/bug-fix.md):
  retain one responsible owner, mechanism confirmed at runtime, withdrawal of refuted patches
  and replay on the original surface. Adapt investigation to bounded available capabilities and
  planning to consequential choices. Omit mandatory delegation/models, Cursor loops, separate
  failing-test commits and automatic PR publication; cost alone does not waive essential evidence.
- [diagnosing-bugs](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/diagnosing-bugs/SKILL.md):
  reuse the local adaptation's symptom-specific feedback, minimization, falsifiable predictions,
  mutation verification and original replay. Retain its independent inspection when execution is
  blocked; omit a mandatory hypothesis count, human loop script and default throwaway harness.
- [tdd](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/tdd/SKILL.md):
  reuse local public-boundary regression tests and incremental red/green repair. Keep established
  test authority, native declarative validation and small local refactoring; omit systematic
  test-surface reconfirmation and the upstream ban on refactoring within the loop.
