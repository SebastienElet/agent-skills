---
name: code-review-fix
description: >
  Repair local code-review findings before delivery. Use when local review corrections are
  requested, including an authorized review stage in a development workflow. Use this
  skill for authorized local corrections even if unnamed. Excludes review-only requests and
  open-PR repairs, which belong to pr-fix.
compatibility: Requires Git, code-review, repository checks and independent reviewers. An explicitly requested Codex stage in Claude Code additionally requires the official codex@openai-codex plugin.
metadata:
  category: dev
---

# Code Review Fix

## Overview

Turn local findings into bounded corrections and an independent review of the candidate.
Reuse a clean initial review while its candidate and evidence remain unchanged. Preserve the
author's work and keep every disposition tied to the code it concerns.
This is an agent workflow, not a host-enforced gate or a merge verdict.

## Usage

`/code-review-fix <local scope or findings>` in Claude Code, or `$code-review-fix <local scope or findings>`
in Codex or Cursor. Example: `Review and fix the current local changes before opening a PR.`

A direct invocation or an explicit request to repair authorizes local edits and relevant checks.
A request only to review authorizes no correction. Commits, pushes and PR publication require
authorization from the surrounding task; this skill never approves or merges. Repairing existing
open-PR findings routes to `pr-fix`. Ordinary local implementation on an existing PR branch can
compose this local review without extending its authority to the PR. Do not compose `pr-verdict`.

Development workflows, including `implement` and `bug-fix`, may compose this
stage when local review corrections are authorized. Preserve their mandate and stricter limits
through `orchestrate`; implementation alone does not require independent review or this stage.
The existing repair owner retains one ledger, pass history, progress evidence and applicable
recovery budgets across calls and resumptions. Two completed passes alone do not end an authorized repair.
A delegated writer corrects its slate and returns evidence without re-entering this workflow.
Planning-only tasks and repairs owned by `pr-fix` do not use this composition. This routing is
instruction-level, not host-enforced.

## Steps

1. **Anchor the candidate.** Record the absolute worktree, HEAD, requested comparison and included
   files. Inspect staged, unstaged and relevant untracked changes using `code-review`'s scope rules;
   resolve an explicit base rather than assuming `main`. Preserve the exact scoped diff and untracked file
   contents outside the candidate. Record their hashes alongside HEAD: a SHA alone cannot identify
   local edits. Keep unrelated changes outside the repair slate. Recover the existing ledger,
   authorizations, pass count, disagreements and evidence before another pass. Missing required
   history stops dependent work rather than resetting its counters or inventing progress.
2. **Establish one writer and the runtime.** Suspend the author's writes until the correction
   ends. Use the current agent for corrections and fresh contexts for independent reviews.
   When the mandate specifically requests Codex from Claude Code, read
   [references/claude-code.md](references/claude-code.md) and verify that transport before delegating;
   do not substitute another writer for an explicitly requested runtime. Otherwise no Codex plugin
   is required. Do not invoke Claude from Codex or Cursor. An unavailable required runtime or
   independent reviewer leaves this stage incomplete; preserve work and report the missing
   capability. An absent optional integration alone does not block ordinary development.
3. **Review before accepting findings.** Run the relevant repository checks on the anchored
   candidate when raw evidence is missing or stale, even if the candidate has not changed. Record
   their results; if a check changes the candidate, re-anchor and rerun affected checks. Unavailable
   essential evidence leaves the workflow incomplete. Reuse an existing independent `code-review`
   when its candidate, scope, requirements and raw evidence inputs still match; record the source
   and why it remains applicable. Otherwise obtain a fresh `code-review` of the anchored
   candidate, with requirements, applicable ADRs and raw check evidence. Withhold
   the author's verdict and supplied findings until the reviewer records its first analysis, then reconcile
   them. For each finding, record the location, failure mechanism, violated requirement and relevant
   check in a scratchpad outside Git. Mark it `confirmed`, `refuted` with evidence, or
   `decision-required`. Style preferences do not enter the repair slate. Route unsettled policy
   through `requirements-clarification` under the user's delegation. Review authorized isolated
   proposals against their explicit assumptions; keep sensitive policy `decision-required` until
   the user validates it on the prepared result. Missing authority, an ADR contradiction or essential
   evidence stops only the dependent correction. If the independent review finds no confirmed defect
   or unresolved decision and all essential evidence is available, compare HEAD, the scoped staged
   and unstaged diff, relevant untracked contents and excluded changes with the initial anchor.
   Compare the review's requirements, source, oracle, configuration, dependencies, environment and
   integration inputs with its raw evidence.
   When all remain unchanged and no new evidence or discovery affects the candidate, retain this
   review as the final independent review and proceed to delivery without another reviewer call.
   Otherwise obtain a fresh review of the affected delta and consumers under step 5.
4. **Correct one slate.** Present the confirmed scope, then proceed under the existing repair
   authorization without reconfirmation. Give the writer the candidate identity, confirmed findings,
   requirements and allowed files; require it to verify the candidate before editing and preserve unrelated work. Use TDD
   for owned behavior: observe the relevant reproduction fail, fix the cause, then observe it pass.
   For declarative changes, use the native or existing relevant validation. A failed delegation is
   not permission to bypass a required runtime or start a second loop. Record changed files, evidence,
   environment and remaining findings before another pass. Charge the pass in the existing ledger
   when the slate starts writing, so interruption cannot erase a partially completed correction.
5. **Validate and review the changed result.** After any candidate change, inspect its delta against
   the anchor and any correction slate, index only intended new files before checks, and rerun the
   repository barrier reached by that delta. Recheck the provenance and relevance of new evidence;
   rerun checks whose inputs or validity changed. Run any essential check found missing or stale by
   the review even if the candidate is unchanged; re-anchor if it changes the candidate. Once planned
   edits finish, obtain a review without source edits in a fresh context that did not write the
   corrections.
   Also obtain a fresh review when new evidence or discoveries invalidate the clean-path comparison
   in step 3, even without a candidate change. Supply the final candidate, requirements and raw
   evidence before earlier conclusions;
   reconcile the finding ledger after its first analysis. Review the affected delta and consumers.
   Changed verification mechanisms require `proof-integrity-review` over the complete affected
   change. Compare candidate hashes before and after review; concurrent edits invalidate the
   affected review and require a new anchor.
6. **Assess progress and deliver.** Each correction pass ends with validation and an independent
   review. Compare their raw results with the previous candidate in the same ledger: name the
   confirmed failure resolved, remaining or recurring mechanisms, regressions and next action.
   Relevant passing checks and independent review must support a claimed correction; changed
   files, a smaller finding count or a writer's assertion alone do not establish progress.
   Continue the next confirmed, in-scope correction under existing authority, including after
   the second pass, while this evidence shows progress and no stricter user limit is reached.
   Newly discovered defects remain explicit; do not erase them to claim success.

   When a correction fails, the same mechanism recurs or evidence contradicts the proposed cause,
   stop repeating that correction and return to diagnosis, design or the owning check with the
   observed failure. Before recovery, retain the applicable finite attempt or investigation-time
   budget under `orchestrate`; charge it to the same blocker across resumptions. New causal
   evidence may justify another correction within that budget; uninformative repetition or
   exhaustion stops dependent work as `incomplete`. Record the failed approach and the evidence
   needed to resume. A reserved decision, ADR contradiction, missing authority, unavailable
   essential evidence or required independence also leaves dependent work incomplete. Continue
   independent authorized work. An explicit user stop ends the requested work immediately.

   On success, report the final candidate identity, corrections, refutations, checks and
   limits and return them to the task owner for the next authorized action. Say that no demonstrated
   defect remains in the reviewed scope; never equate that with merge approval. On timeout, failed
   checks, empty or malformed reviewer output, missing essential
   evidence or unavailable independence, report `incomplete` and preserve the scratchpad and work.

## Gotchas

- **Using the repair thread as reviewer** — its conclusions share the correction's assumptions;
  start a new context and withhold prior verdicts until its independent first analysis.
- **Both agents write at once** — the reviewed diff becomes stale or edits collide; suspend the
  author, verify the candidate identity, and review only after the writer has finished.
- **A finding becomes cleanup** — subjective preferences enlarge the change; repair only confirmed
  mechanisms and keep unresolved decisions explicit.
- **Reusing an old SHA for local edits** — HEAD may stay unchanged through every pass; bind the diff
  and untracked contents too, then invalidate reviews when that candidate changes.
- **Turning a review request into repair authority** — the user did not authorize mutation; return
  findings through `code-review` until a repair is requested.

## Constraints

- Never mutate without repair authority, broaden the confirmed slate, or overwrite unrelated work.
- Never let the context that wrote a correction perform its final independent review.
- Never stop solely at two passes, reset pass history or recovery budgets, repeat a failed
  correction without new causal evidence, or override a stricter user limit or explicit stop.
- Never treat failed, missing, stale or empty reviewer output as acceptance.
- Never treat a proposal's passing checks or review as human approval of its sensitive policy.
- Never approve, merge, publish a verdict, or activate `pr-verdict` from this local workflow.
- Never install missing runtimes during a repair or enable the companion's automatic Stop gate.
