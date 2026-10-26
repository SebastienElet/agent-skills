---
name: implement
description: >
  Carry an authorized feature, refactoring or configuration change through implementation,
  verification and delivery. Use when asked to build a change, with or without a ticket.
  Make sure to use this skill whenever planning is followed by authorized implementation.
  Excludes plan-only requests, bug diagnosis and explicit open-PR repair.
compatibility: >
  Requires the `pr-verdict` and `issue-workflow` skills from the same package version for the
  failure-class catalogue and forge adapters, respectively; report the reference unavailable when
  its skill is absent.
metadata:
  category: dev
---

# Implement

## Overview

Conduct an authorized change from its requested outcome to a verified result and the permitted
delivery boundary. Compose existing specialists under `orchestrate`; a finished unit returns to
the same task owner rather than ending the request. No tracker, agent, delegation or independent
review is required by this skill alone.

## Usage

Use `$implement <change>` or `/implement <change>`, or apply it to an ordinary implementation
request. For example: `Plan then implement invoice export, verify it and commit locally; do not
push.` A plan-only request belongs to `plan` and authorizes no implementation. A request without
a ticket is fully executable without tracker access or ticket creation.

Preserve an enclosing workflow's owner and mandate. `issue-start` supplies issue context; it does
not replace this implementation path. Explicit open-PR repair retains `pr-fix`; bug reproduction
and cause belong to `diagnosing-bugs`. A manual handoff to Claude retains `claude-developer` and
does not authorize launching Claude.

## Steps

1. **Recover the mandate.** Apply `orchestrate` for ownership, current candidate, decisions,
   permitted effects, recovery budgets and resumption. Establish the observable outcome,
   acceptance criteria, consumers and exclusions from the user's actual request. Keep edit,
   commit, push, PR, tracker update and further delivery authority distinct. Do not restart
   completed preparation or introduce an approval between already authorized stages.

2. **Ground the work.** With a ticket, compose `issue-start` and `issue-workflow` unless their
   current verified context is already available. On their return, resume this step rather than
   calling startup again. Retain their eligibility, exact branch/PR and provider limits. Without
   a ticket, inspect Git state, remotes and any existing work directly; preserve unrelated changes.
   Locate the affected flow and consumers, then inspect current code, instructions, contracts,
   applicable ADRs in force and existing checks. A ticket or saved plan supplies constraints to
   verify, not a historical implementation recipe. Resolve discoverable facts from sources.

3. **Prepare only what is needed.** Use `requirements-clarification` for material unresolved
   requirements and `plan` for consequential design choices or a requested plan. Reuse settled
   decisions and proportionate preparation; an obvious declarative edit needs only its intended
   change and relevant native or existing check. Consume the plan through `orchestrate` and
   continue authorized implementation. A reserved decision or confirmed ADR contradiction blocks
   dependent work; progress independent authorized units within the existing mandate.

   When the change touches a concern in the
   failure-class domain index in the `pr-verdict` skill's `pr-verdict/references/failure-classes.md`,
   read the index, then only the relevant classes to inform the design and its failure paths. This reads a
   shared reference; it does not invoke `pr-verdict` or apply its verdict policy.

4. **Realize verifiable units.** Identify each unit's observable result, genuine prerequisites
   and relevant oracle, including affected failure paths. Use the plan's units when still valid;
   do not require a ticket, commit, worktree or PR for each unit. Apply `tdd` to owned executable
   behavior and native or existing validation to declarative changes without owned behavior.
   Compose other relevant specialists rather than reproducing their procedures. Delegation is
   optional and follows `orchestrate`'s ownership and isolation rules; actual dependencies govern
   readiness. Inspect each returned delta and evidence before accepting the unit. A green test or
   completed delegate advances work; it does not establish the overall result.

   For each unit touching an indexed concern, use the index above to select only the useful
   classes before implementing and choosing failure-path checks. In particular, apply class 3
   when choosing sequential or timestamped identifiers, class 24 when supervising processes, and
   classes 10, 22 and 27 for immutability claims and their purge/erasure consequences. Exercise the
   applicable failures at their owning boundary with existing or native checks and ordinary tests.

5. **Verify the complete change.** Exercise the original acceptance criteria and affected
   consumers together, beyond individual units, at the boundary owning each invariant. Before
   declaring a PR ready, resolve its real target branch, fetch it and record its SHA. Integrate it
   into the candidate when authorized; otherwise state the missing integration in the readiness
   declaration. A conflict-free `merge-tree` does not prove compatibility. Search the integrated
   tree for all consumers of the changed contract, including those added by the target. Replay
   only checks the repository already runs for the affected files and consumers (for example,
   affected tasks), never a fixed checklist or all gates. Index intended new files before the
   relevant checks. Retain commands or observations, candidate, environment and
   uncovered targets under `orchestrate`. For a failure, return to its owning stage with the new
   observations and remaining recovery budget, correct within scope and rerun affected checks.
   Contrary design evidence returns to `plan`; reproduction or cause questions return to
   `diagnosing-bugs`. Never weaken the oracle or replace missing essential evidence with a green
   substitute. Reassess affected units and consumers after changes without repeating unaffected
   checks by default.
   Reuse evidence when its relevant source, oracle, configuration, dependency, environment and
   integration inputs remain valid; retain its provenance and the comparison justifying reuse.
   If selection is uncertain, state the affected scope and evidence gap, investigate the existing
   checks and leave essential missing proof explicit; do not default to the complete suite.

6. **Honor the review boundary.** Independent review remains optional unless requested or
   already required. Use the existing review or correction workflow for that authorized scope
   and consume its result through `orchestrate`; retain its owner, limits and checkpoints.
   Do not introduce another review/correction loop. A required review that is missing or
   unfinished remains an explicit limit on completion.

7. **Complete authorized delivery.** Continue commits, pushes, PR work and further delivery
   included in the mandate without asking the user to relaunch each stage. For repository/PR
   operations select the forge from verified Git remotes and read only its adapter in `issue-workflow`:
   `issue-workflow/references/github.md` for GitHub or `issue-workflow/references/bitbucket.md` for
   Bitbucket, even without a ticket.
   Reuse the exact existing source branch and matching open PR; create a PR only when needed
   and authorized, resolving ambiguous or terminal associations first. Before PR delivery,
   fetch the resolved target again and compare its SHA with the verified
   base; if it advanced, return to step 5 for integration, consumer discovery and affected checks
   within existing authority. Verify the committed
   delta and, after an authorized push, the remote revision. Read CI for that exact revision;
   missing, pending, failed or inaccessible checks are not success. With a ticket, let
   `issue-start` own PR association and `issue-workflow` govern completion evidence and any
   permitted tracker writes. Without one, omit tracker operations. Recover uncertain external
   effects through `orchestrate` before retrying, then independently read back the actual
   delivery result. Do not infer approval, merge or deployment permission from a push or PR.

   Before publication, inspect each outgoing commit against the resolved destination: connect it
   to the stated outcome, remove unrelated changes within authority or disclose them, and separate
   verification tooling or explain its coupling. Follow the repository's commit convention;
   do not publish temporary `wip` commits or rewrite shared history without authorization.
   If identifiers were allocated, reread only class 3 via the domain index and refresh its
   destination, open/draft PR and remote-branch comparison before publication and after destination
   integration; preserve already applied migrations.
   After changes or a push, compare evidence inputs, including source, oracle, configuration,
   dependencies, environment and integration state. Reuse still-valid observations with their
   original provenance and the comparison justifying reuse; a different SHA alone does not
   invalidate them. Replay only invalidated affected checks or name the remaining evidence gap,
   and align the delivery description with that evidence. Record tested head/base, command, exit
   status and actual environment. When execution depends on inherited values, timezones or file
   modes, use the index to read class 21 and verify the actual invocation before delivery.

8. **Report the actual end state.** Assess the final candidate against the whole request through
   `orchestrate`. Report the changed behavior, checks and environment, supported targets not
   exercised, remaining decisions or missing evidence, and delivery actions actually completed
   with their commit or canonical PR identity. When publication was not authorized, deliver the
   verified local result and name that boundary. If an authorized action could not finish, state
   its exact blocker and the decision or capability needed; do not call the whole request done.

## Gotchas

- **Startup becomes development** — issue eligibility is reported as task completion; consume
  `issue-start`'s context and continue the original change without re-entering startup.
- **One unit goes green** — other criteria or consumers remain broken; verify the complete
  candidate before assessing delivery.
- **A saved plan becomes authority** — stale implementation choices survive contrary code;
  rediscover the current flow and return affected decisions to `plan`.
- **PR creation is replayed after a timeout** — duplicate remote artifacts appear; inspect the
  selected forge's actual state and recover only the missing safe operation.

## Constraints

- Never implement from a plan-only or review-only request, or exceed the original scope.
- Never infer publication, tracker writes, approval, merge or deployment authority from this path.
- Never require a ticket, unrelated forge tooling, specific agent, subagent or model.
- Never copy specialist loops, add a mirror test, prose validator or new verification gate.
- Never declare the whole result delivered from a local unit, delegate report or stale CI result.

## References

These pinned inspirations inform the composition; local skills and the mandate govern execution.

- [Feature](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/poteto-mode/playbooks/feature.md):
  retain overall responsibility, dependency-aware units and verification of consumers. Adapt
  delegation to available authority and isolation; omit mandatory models, parallel competitions,
  commits and PR publication.
- [Multi-phase plan](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md):
  retain evidence for units and a standalone plan boundary through local `plan`. Omit plan
  templates, validators, schedulers and universal live/performance lanes; an existing mandate
  to implement needs no second execution approval.
- [implement](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/implement/SKILL.md):
  retain context retrieval, composition with local `tdd` and final aggregate checks. Adapt review
  and commit to the mandate; omit a host-specific Skill tool and manual-only activation.
- [implement-spec](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/implement-spec/SKILL.md):
  retain dependency-ready work and source pointers returning to one owner. Omit required tickets,
  integration branches, implementer/merger agents, automatic ticket closure and publication.
- [tdd](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/tdd/SKILL.md):
  reuse the local adaptation's public-boundary tests and incremental implementation. Retain its
  declarative exception and established test authority instead of repeated test-surface approval;
  leave the test loop and small refactoring rules in the local specialist.
