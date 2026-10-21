---
name: orchestrate
description: >
  Preserve task ownership and state across skill transitions. Use when composing specialist stages,
  delegating a bounded step, or resuming a composed task. Make sure to use this skill whenever a
  specialist returns to an ongoing task, even if no tracker is involved. Excludes standalone
  specialist work with no transition.
metadata:
  category: dev
---

# Orchestrate

## Overview

Keep one identifiable owner responsible for the authorized outcome across specialist calls,
delegation and interruption. This contract defines what crosses those boundaries; existing skills
retain their procedures, activation restrictions and authority. It supplies no implementation
playbook, tracker adapter or execution engine. Following these instructions is not host enforcement.

## Usage

Use `$orchestrate <ongoing task>` or `/orchestrate <ongoing task>`, or compose
it at a skill transition. For example: `Plan then implement invoice export, verify it and commit
locally; do not push.` The existing task owner applies the contract without launching another
orchestrator. A standalone specialist returns its own requested deliverable.

Read only the specialists needed for the next step. Use the host's available skill loading,
conversation and delegation facilities; no particular tool name, model or subagent is required.
When a capability essential to the mandate is unavailable, retain that limitation rather than
substituting a weaker result. This contract grants no additional implementation or external-write
authority.

## Steps

1. **Identify the owner and mandate.** Retain the original outcome, acceptance criteria, scope,
   exclusions, applicable instructions and ADRs in force. Record acquired decisions and
   authorizations with their sources, including separate limits on edits, commits, publication,
   approvals and merges. Choose the request class from the user's actual intent:

   | Request                                       | Boundary                                                                                                                |
   | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
   | Analysis or review only                       | Return findings and evidence; no implementation or correction.                                                          |
   | Plan only                                     | Return the requested plan with decisions and limits; no implementation.                                                 |
   | Implementation, including plan then implement | Continue through authorized realization, verification and delivery; the plan is an intermediate result.                 |
   | Bug                                           | Distinguish diagnosis alone from authorized repair; use `diagnosing-bugs` for reproduction and cause before correction. |
   | Explicit open-PR repair                       | Retain the `pr-fix` owner, journal and authorization boundaries; an attached PR alone does not select repair.           |

   A complete request continues through its already authorized steps. A partial request ends at
   its requested deliverable. Preserve existing workflow ownership rather than adding a competing
   owner when another skill is loaded.

2. **Keep compact task state.** Reuse the conversation or the workflow's existing scratchpad or
   journal. Persist enough state at an interruption or handoff to recover these facts; no new
   repository document or fixed serialization is required:

   - Owner, outcome, request class, acceptance criteria and scope limits.
   - Decisions and authorizations already acquired, their sources, and pending user questions.
   - Current stage, independent work and prerequisites, active writer or delegates, and next action.
   - Candidate identity: repository/worktree, comparison base, HEAD and relevant staged, unstaged
     and untracked contents or hashes. For non-code work, identify the artifact and source revision.
   - Evidence tied to that candidate and its inputs: command or observation, result, location,
     environment and uncovered targets. Keep hypotheses distinct from demonstrated facts.
   - Blockers, attempted resolutions, elapsed investigation, correction-pass counts and their limits.

3. **Frame each specialist step.** Supply its bounded outcome, relevant verified source pointers,
   current candidate, decisions, permitted effects, prerequisites and success condition. Verify
   the specialist's activation contract first; a composition cannot bypass manual invocation.
   Let it own its procedure, including its existing checks and correction budget. Delegate only
   when useful and permitted, with explicit file or artifact ownership and no concurrent writers
   to the same candidate. Independent reads or isolated work may proceed in parallel.

   Require a return containing the actual result or artifact, candidate identity, decisions,
   performed checks and raw evidence locations, remaining limits and recommended next action.
   Classify it as `ready`, `retry`, `decision-required` or `blocked`. These are transition labels,
   not tracker states or a replacement for a specialist's own verdict. A `ready` step has met its
   stated success condition with relevant current evidence; it does not finish the task.

4. **Consume the return and choose the transition.** The owner inspects the returned result and
   affected delta against the requested step, candidate and evidence. A completed delegate, green
   test, checked task list or confident summary alone does not satisfy the original mandate.

   | Return or observation                                                               | Owner's next action                                                                                                                                                                                                                      |
   | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Step is `ready`                                                                     | Accept only the demonstrated scope; continue to the next authorized dependency-ready step, or assess final delivery.                                                                                                                     |
   | Recoverable failure (`retry`)                                                       | Return to the stage owning the failure with the observations and remaining budget: reproduction/cause to diagnosis, unsuitable design to design, a demonstrated implementation defect to correction. Rerun affected checks after change. |
   | Missing or stale evidence                                                           | Obtain or refresh the relevant existing check. If essential evidence remains unavailable, keep the affected step `blocked`; do not report success.                                                                                       |
   | Empty, malformed or timed-out return                                                | Inspect any artifacts and candidate changes first. Treat the step as unfinished; retry only a safe, bounded operation with remaining budget.                                                                                             |
   | Discoverable unknown                                                                | Investigate through authorized sources; do not ask the user to supply repository facts.                                                                                                                                                  |
   | Reserved decision or missing authorization (`decision-required`)                    | Use `requirements-clarification` to prepare the permitted result and ask the smallest material question; pause only dependent actions. Silence is not approval.                                                                          |
   | ADR contradiction, exhausted budget or unavailable essential capability (`blocked`) | Preserve the candidate, evidence and exact missing condition; report the limit and continue independent authorized work.                                                                                                                 |

   Review is optional unless requested or already required. When authorized corrections use
   `code-review-fix` or `pr-fix`, consume that workflow's result and retain its loop owner; do not
   nest or restart its review/correction sequence. Failed or incomplete required review remains
   unfinished. Existing publication and approval checkpoints still apply.

5. **Bound recovery across relays.** Apply the task's investigation budget and each specialist's
   correction limits. If no applicable limit exists, name a finite attempt or time limit before
   the first recovery loop. Charge attempts and elapsed investigation to the same blocker across
   delegates, interruptions and continuations. Each attempt must add evidence; stop uninformative
   repetition. A fresh agent, new session or new candidate does not reset consumed budgets. At a
   limit, report observations, attempts and the decision, authority or capability needed to proceed;
   never waive essential evidence. Progress work with no code or architectural dependency on it.

6. **Resume from verified state.** Recover the compact state and existing journals before writing.
   Reconcile actual candidate contents, active writers, source revisions and any external effects
   against the last observation. If an external action has an uncertain result, inspect the remote
   state before repeating it; retry only the missing safe operation within existing authority.
   Retain decisions and evidence whose scope and inputs still match. Revalidate changed facts,
   affected evidence and dependent steps rather than blindly replaying the whole sequence. Recover
   lost history from verifiable sources; if a required counter, authorization or candidate cannot
   be recovered, name the gap and stop only actions that depend on it. Make ownership transfer
   explicit: the receiving task accepts the same mandate and limits, and the previous writer stops.

7. **Assess the authorized end state.** Compare the final candidate and observations with the
   original acceptance criteria, requested delivery and remaining decisions. Report what changed,
   actual checks and their environment, untested supported targets, and any unresolved limits.
   An analysis or plan can be the finished requested result without implementation. A full task
   remains incomplete when a required stage, reserved decision, essential proof or authorized
   delivery action is missing. Do not invent an unrequested publication or review prerequisite.

## Gotchas

- **A specialist's finish becomes task completion** — the next authorized stage disappears; the
  owner compares the return with the original outcome before delivering.
- **Every child orchestrates the whole task** — review loops recurse and counters restart; give
  bounded steps and retain one owner for each existing correction loop.
- **HEAD is reused as the candidate** — local edits and changed check inputs disappear; retain
  the relevant contents and evidence inputs as well as the commit.
- **An interruption loses budgets or consent** — recovery either repeats work or invents authority;
  recover the compact state and surface unverifiable history before dependent actions.

## Constraints

- Never infer implementation, sensitive-policy approval or external-write authority from a skill
  return, plan, tracker state or unanswered recommendation.
- Never bypass an ADR in force, a specialist's invocation restriction or a stricter user limit.
- Never reset recovery counters through delegation, continuation or a second orchestrator.
- Never require a subagent, model, tracker, forge, host-specific tool or heavy plan for a small task.
- Never replace an existing oracle with a prose validator, mirror gate or checklist of claims.
- Never report unavailable, stale or unperformed verification as successful, or these instructions
  as qualified behavior on Claude Code, Codex or Cursor without observed executions.

## References

The sources below are design inspirations at fixed snapshots, not local authority. The contract
scenarios in [evals/contract-scenarios.md](evals/contract-scenarios.md) specify expected transitions;
they are not execution evidence or cross-host qualification.

| Source                                                                                                                                                                                                                                                                                     | Retained or adapted                                                                             | Excluded and reason                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [poteto-mode](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/poteto-mode/SKILL.md), [Feature](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/poteto-mode/playbooks/feature.md)               | One owner consumes specialist work; route by intent and prerequisites; separate shared writes.  | Mandatory delegates, models, Cursor/cloud tools and automatic PR creation do not follow from the mandate.                                                                         |
| [Bug fix](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/poteto-mode/playbooks/bug-fix.md)                                                                                                                                                  | Evidence directs return to diagnosis and replay of the symptom through the existing specialist. | Unbounded pursuit of reproduction and Cursor loops conflict with bounded investigation and available capabilities.                                                                |
| [architect](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/architect/SKILL.md), [Multi-phase plan](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md) | Feed design failures back into design; distinguish a standalone plan from an intermediate plan. | Mandatory competing designs, plan templates/validators, ten verification lanes and a new execution go-ahead regardless of existing authority add unsupported cost or checkpoints. |
| [implement](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/implement/SKILL.md)                                                                                                                                                      | Pass settled scope to `tdd` where applicable; check the complete result after local units.      | Automatic review and commits would replace local requirements and authorization.                                                                                                  |
| [implement-spec](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/implement-spec/SKILL.md)                                                                                                                                            | Retain the overall outcome, dependency-ready work and concise source pointers across delegates. | Integration branches, worktree fan-out, merger agents, tracker closure and PR writes remain workflow choices with separate authority.                                             |
