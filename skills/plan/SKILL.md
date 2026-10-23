---
name: plan
description: >
  Prepare an architecture or actionable development plan. Use when asked to plan a change or when
  consequential design choices need resolution before implementation. Make sure to use this skill
  whenever an ongoing task needs that preparation, even without a ticket. Excludes obvious changes,
  functional issue specification and codebase-wide improvement surveys.
metadata:
  category: dev
---

# Plan

## Overview

Turn an authorized outcome into a proportionate design and verifiable units of work. Reuse
`codebase-design` for responsibilities, interfaces and test boundaries, and
`requirements-clarification` for material undecided requirements. A standalone plan is a deliverable;
a plan inside authorized development returns to the same task owner through `orchestrate`.

## Usage

Use `$plan <change>` or `/plan <change>`, or compose it when development needs design preparation.
For example: `/plan Design invoice export; return the plan only.` Return the plan in the
conversation unless saving to a specific destination is authorized. Planning alone authorizes no
implementation, code scaffold, tracker write or publication.

For `Plan then implement invoice export and verify it; do not push`, apply `orchestrate` to preserve
the existing owner and mandate. Return the preparation to that owner, who continues the authorized
development without a new plan-approval checkpoint. An explicit request to stop after planning,
an ADR contradiction or a decision reserved to the user still bounds continuation.

## Steps

1. **Bound the preparation.** Retain the requested result, consumers, acceptance criteria,
   exclusions and permitted effects. In composition, recover these from the owner's current state
   rather than starting another workflow. If the approach is obvious and no consequential design
   choice remains, return the short intended change and relevant existing check; skip alternatives
   and a formal plan. A standalone request ends there; an implementation owner continues.

2. **Ground the change.** Locate the affected flow and its consumers before bulk reading or
   delegation. Inspect current behavior, domain vocabulary, applicable ADR status and scope,
   contracts and existing checks. Treat the request's implementation suggestions as claims to
   verify. Separate sourced facts, assumptions and unknowns; verify consequential external
   dependency behavior against its official documentation and local configuration. Cite relevant
   source revisions so a later implementer can recheck them.

3. **Resolve the prerequisites.** Use `requirements-clarification` for material missing decisions;
   it owns research, delegated choices, isolated proposals and questions reserved to the user.
   Preserve decisions already acquired. An apparent ADR conflict calls for investigation; a
   confirmed contradiction blocks the affected path, not an opportunistic ADR edit. Continue
   independent preparation within the mandate. Do not turn a bounded plan into a questionnaire,
   functional issue specification or multi-session decision map. The local `wayfinder`, `to-spec`
   and interview skills retain their invocation restrictions.

4. **Sketch and choose.** Use `codebase-design` to describe caller usage, responsibilities,
   interfaces, invariant enforcement and relevant failure paths. Include inputs, results, ordering
   and errors beyond type signatures. When encoding rules derived from text, apply `codebase-design`
   step 2 to complete the rule's contract before implementation. For external writes, address partial
   failure, idempotence and safe retry; for a replacement, inventory existing guarantees and their
   oracles first.
   When the design touches a concern in the
   [failure-class domain index](../pr-verdict/references/failure-classes.md#domain-index), read the
   index, then only the useful classes to challenge its invariants and failure paths. This does
   not invoke `pr-verdict` or apply its verdict policy.
   When viable designs have materially different consequences, compare at least two distinct
   sketches against the same relevant criteria: caller effort, locality, testability, compatibility,
   operational risk or cost. State the chosen design, evidence, rejected alternative and remaining
   limits. Do not manufacture a competition around a settled choice. Parallel exploration or a
   prototype is optional: use it only for a discriminating uncertainty, within available
   capabilities, authorization, isolation and budget; otherwise keep sketches in the conversation.
   Never require executable stubs or commit planned breakage as a planning artifact.

5. **Sequence verifiable results.** Size the plan to the change. Prefer independently verifiable
   behavior over layer-by-layer task lists, with only genuine blocking dependencies. For each
   unit, identify its observable result, prerequisites and relevant existing or native oracle,
   including meaningful failures. Preserve required guarantees during migrations. Name any
   missing essential evidence and its consequence without inventing a validator or universal
   verification template. Work units need not be tickets, commits, sessions or PRs.

6. **Return a usable plan.** Include the outcome and scope, constraints and sources, chosen
   responsibilities and contracts, consequential decisions and alternatives, units and dependencies,
   verification criteria, risks and unresolved prerequisites. Keep only detail needed to act;
   source pointers are discovery aids, not a frozen file-by-file implementation recipe. Future
   implementers rediscover current code and contracts before changing them. Distinguish checks
   proposed from checks actually performed, with their candidate, environment and uncovered targets.
   In composition, use `orchestrate`'s return contract and transition labels: readiness concerns
   preparation only, and missing essential evidence or a reserved decision stays explicit. A
   standalone plan ends at the requested deliverable; a composed plan returns the next authorized
   action to its owner without adding publication or review authority.

7. **Revise on contrary evidence.** When diagnosis or implementation refutes an assumption,
   identify the observation, affected decision and dependent units. Reopen that design choice
   through `codebase-design` or the missing requirement through `requirements-clarification`;
   route reproduction or cause questions back to `diagnosing-bugs` when applicable. Revise the
   affected plan and verification criteria, retaining still-valid decisions and evidence. Repeated
   workarounds are a reason to reassess the design, not accumulate exceptions. Return the revision
   to the same owner under `orchestrate`'s existing recovery budget; a new sketch or session never
   resets it or expands authority.

## Gotchas

- **Every change gets competing designs** — an obvious edit becomes a workshop; apply the small
  change exit before sketching and compare only consequential open choices.
- **A plan silently changes the mandate** — planning starts code or stalls authorized development;
  retain the original request class and return to its owner at the correct boundary.
- **A snapshot becomes an implementation script** — later agents follow stale paths and shapes;
  pass constraints, decisions and verification criteria with sources to rediscover.
- **A failing assumption attracts patches** — the plan's dependent units remain unsound; reopen
  the affected design and refresh its evidence before continuing them.

## Constraints

- Never infer implementation, sensitive-policy approval or external-write authority from a plan.
- Never override an ADR in force or bypass a specialist's invocation restriction.
- Never duplicate the procedures of `codebase-design`, `requirements-clarification` or `orchestrate`.
- Never require a tracker, subagent, model, prototype, plan file or new gate for preparation.
- Never present proposed verification as executed evidence or a ready plan as a verified product.

## References

These pinned sources inform the workflow; local skills and the user's mandate govern its use.

- [architect](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/architect/SKILL.md):
  retain caller-first sketches, comparable alternatives and redesign on contrary evidence; adapt
  competition to consequential choices and omit mandatory models, fan-out and code scaffolds.
- [Multi-phase plan](https://github.com/cursor/plugins/blob/190d28736eff128ec94f502a22c7fe0c4b56cd37/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md):
  retain standalone planning and verifiable units; omit mandatory prototypes, PR-sized units,
  templates, prose validators and universal live/performance lanes. Existing execution authority
  does not need a second go-ahead.
- [wayfinder](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/wayfinder/SKILL.md):
  retain progressive decisions and dependencies for uncertain work; reuse the local manual skill
  only when invoked, without imposing tracker maps or one-decision-per-session limits here.
- [to-spec](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/to-spec/SKILL.md)
  and [to-tickets](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/to-tickets/SKILL.md):
  retain settled context, observable results and genuine blocking edges; omit automatic publication,
  readiness labels, exhaustive stories and mandatory granularity or test-surface approvals.
- [codebase-design](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/codebase-design/SKILL.md):
  reuse the local adaptation for interface contracts and testability instead of copying its
  principles or imposing upstream vocabulary and test topology.
