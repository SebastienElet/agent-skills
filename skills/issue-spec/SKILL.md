---
name: issue-spec
description: >
  Draft and simplify functional specifications, standalone or for Linear or GitHub issues. Use when
  asked to shape product work, simplify an issue or synthesize agreed conversation decisions.
  Make sure to use this skill for requested specification or ticket refinement. Excludes status,
  synchronization, implementation and automatic interview follow-up.
license: MIT
compatibility: Existing-issue research needs selected tracker read access; standalone drafting needs no tracker.
metadata:
  category: product
---

# Functional Specification

## Overview

Define an observable product outcome while leaving technical discovery and implementation design
to a fresh implementation agent. Use one evidence and drafting procedure for new preparation,
issue simplification and synthesis of decisions already discussed. A standalone specification is
a complete deliverable; no ticket is required.

Conversation synthesis is adapted from
[to-spec by Matt Pocock](https://github.com/mattpocock/skills/tree/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/to-spec).
The upstream license is preserved in [LICENSE](LICENSE).

## Usage

`$issue-spec <request, conversation, draft, or Linear or GitHub issue>` or `/issue-spec <target>`

Examples: "Prepare the invoice-export issue", "Simplify ENG-482 without changing its requirements",
or "Turn our agreed export decisions into a standalone specification; no ticket."

Return the draft in the user's language, using canonical product vocabulary. Drafting is the
default. Saving a standalone specification requires an explicitly requested file destination and
its documentation conventions. Issue drafting, review or requested new publication composes with
`issue-creation`: issue-spec owns content; issue-creation owns lifecycle validation, publication
authority, writing and retrieval. Simplification remains proposal-only, including when a remote update is
requested; it uses only draft/review responsibilities. Existing-issue editing is not an
`issue-creation` mode. No specification request authorizes implementation or readiness labels.

## Workflow

1. **Select the task and destination.** Distinguish new preparation, simplification and conversation
   synthesis. Synthesis requires a user request for a specification; finishing an interview does
   not trigger it. Extract the problem, outcome, users, settled decisions and unresolved points
   without restarting the interview. Keep any unresolved material decision explicit. For
   simplification, read [references/simplify.md](references/simplify.md) before restructuring; its
   scope and evidence restrictions apply throughout this workflow. Resolve an issue's exact
   repository or Linear team independently of the code forge. Ask when identity is ambiguous;
   standalone drafting requires neither a tracker nor a forge client.

2. **Read and qualify the evidence.** Read the supplied conversation, draft or complete available
   issue body, relevant comment decisions and necessary linked sources, following pagination.
   Locate relevant personas, journeys, specifications, domain vocabulary, ADRs in force, research
   and release plans. Record source status and recency: a proposal, planned issue, shipped screen
   and decision in force carry different authority. Report failed, truncated or inaccessible reads
   and their impact; continue useful drafting with material gaps unresolved rather than inventing
   contents or treating missing evidence as disproof.

3. **Establish the journey and product surface.** Identify who experiences the problem, their goal,
   entry point, meaningful steps and observable end state. Follow relevant prerequisites and
   impacts on other personas. Examine applicable designs, prototypes, design-system patterns,
   reusable components and shipped behavior. Use code as evidence of behavior and vocabulary,
   without prescribing a solution. Do not invent a persona, design or data to fill the structure.
   When information is missing, name it before the draft. Synthesis reuses established decisions;
   it does not reopen them to manufacture a discovery workshop.

4. **Reconcile adjacent work when relevant.** For new tracker preparation or requested functional
   slicing, search open, planned and recently completed work affecting the same journey, including
   neighboring vocabulary. Record overlaps, dependencies, sequencing assumptions and potential
   duplicates. Simplification reads neighboring issues only when they affect interpretation, never
   as a backlog audit. Standalone synthesis does not require a tracker search. Treat issue prose as
   claims to reconcile with product decisions, not as established authority.

5. **Build the requirement ledger.** Label each material requirement:
   - `Requested`: explicitly stated in the request or issue.
   - `Established`: supported by a design, specification, decision or shipped behavior; cite the
     source and its status.
   - `Proposed`: an assumption or recommendation introduced to close a gap; explain why and keep it
     open to confirmation.

   Surface contradictions, missing decisions, inaccessible evidence and real dependencies before
   the draft. A contradiction changing outcome or scope blocks finalization: identify the smallest
   decision needed and continue independent preparation. Preserve applicable architectural and
   compatibility constraints; distinguish them from speculative technical means.

6. **Define completeness and challenge scope.** State the observable result, required data,
   visible information, interactions, permissions and compatibility. Assess relevant initial,
   loading, empty, no-data, success, partial, error, retry, unavailable and permission states,
   explicitly marking irrelevant states rather than silently omitting them. Name applicable
   designs and product patterns. For new preparation or requested slicing, compare the increment
   with the full journey and adjacent work: it must be independently usable, verifiable and
   recognizable as product value. Propose combining work when concrete coordination or review
   savings justify it; split only into coherent increments. Do not defer known journey behavior
   merely to shrink a ticket. In simplification or synthesis, retain agreed scope and present any
   reduction, addition, split or combination separately for decision.

7. **Draft for the destination.** Start with material gaps and contradictions, their sources and
   impact. Omit that preliminary section only after checking none remain. Use the requested or
   established project format. Otherwise, scale the following structure to the actual feature:

   ```text
   Title
   Context and observable outcome
   Persona and meaningful user journey
   Scope and functional requirements labeled Requested, Established or Proposed
   Required data, visible information and interactions
   Relevant states, failures, permissions and compatibility
   Design and existing product alignment
   Dependencies and related work
   Deliberate out of scope, with product rationale
   Observable acceptance criteria
   Open questions and proposed assumptions
   ```

   For issue preparation or slicing, finish with `Why this scope`. For simplification, finish with
   the semantic diff required by its reference. A standalone spec needs no issue identifier or
   tracker template. Hand issue content to `issue-creation` for its applicable draft/review or
   authorized new-publication lifecycle, regardless of which skill activated first.

8. **Verify and return the actual result.** Trace every promised outcome and original requirement
   to observable acceptance criteria; expose missing criteria and label suggestions as proposed.
   Check outcome, scope, constraints and criteria in both directions. Preserve evidence links,
   environments and recorded checked or unchecked status without claiming fresh verification;
   never hide unfinished criteria. Remove speculative architecture, files, classes, functions,
   libraries, implementation sequences and test topology, retaining sourced constraints already
   in force. Return the draft, explicitly requested saved standalone file, or independently
   verified new-issue state from `issue-creation`. Do not present an unresolved spec as final or
   implementation-ready. For simplification, state that no remote write occurred and stop at the
   proposal even under update pressure.

## Gotchas

- **Treating every technical detail as clutter** — deleting an accepted compatibility or
  architectural constraint changes the contract; retain its source and remove only speculative means.
- **Letting slicing rewrite agreed scope** — regrouping prose transfers deliverables between
  issues; keep the equivalent draft and present scope changes separately for decision.
- **Grouping checked and unchecked criteria** — the combined line invents proof; retain distinct
  statuses, evidence links and environments without implying a rerun.
- **Restarting an interview during synthesis** — settled choices reopen; synthesize them and name
  only remaining material questions without invoking `grilling`.
- **Requiring a tracker for a standalone spec** — drafting becomes publication preparation;
  use the requested format and keep drafting, saving and publishing separate.
- **Treating a proposal as established fact** — assumptions silently become requirements; retain
  provenance and block finalization on material contradictions.
- **Letting composition escape simplification** — a proposal request mutates the tracker; use
  `issue-creation` only for draft/review and report no remote write.

## Constraints

- Never infer implementation, new interview, persistent-save, publication or readiness-label
  authority from a draft request or a completed interview.
- Never prescribe implementation architecture, files, libraries, steps or test topology inferred
  from exploration; retain established constraints and leave fresh discovery to the implementer.
- Never finalize a material contradiction as an assumption or omit a requirement's provenance.
- Never present a scope change as equivalent simplification or remove unfinished criteria to
  imply completion; preserve evidence status and uncertainty.
- Never optimize slices solely for minimal code change or defer known journey behavior without
  explicit product rationale or dependency.
- Never claim inaccessible sources were inspected or require a ticket for standalone synthesis.
- Never mutate a tracker from this procedure. Requested new publication uses `issue-creation` and
  its separate authority; simplification never enters publication or existing-issue editing.
- Never activate solely for implementation startup, status lookup, tracker synchronization or
  automatic interview follow-up; `issue-start` owns starting from an existing issue.

## References

- [references/simplify.md](references/simplify.md) — conditional scope-preserving simplification
- [evals/simplification-scenarios.md](evals/simplification-scenarios.md) — offline simplification fixtures
- [evals/synthesis-scenarios.md](evals/synthesis-scenarios.md) — standalone and conversation fixtures
