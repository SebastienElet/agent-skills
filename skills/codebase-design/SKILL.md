---
name: codebase-design
description: >
  Design cohesive modules with simple public interfaces. Use when deciding an interface, dependency
  boundary or test surface. Make sure to use this skill whenever another skill needs module-design
  guidance, even if architecture is unnamed. Excludes routine edits and separately requested cleanup.
license: MIT
compatibility: >
  Requires the `pr-verdict` skill from the same package version for its failure-class catalogue;
  report the reference unavailable when absent.
metadata:
  category: dev
---

# Codebase Design

## Overview

A useful module hides meaningful complexity behind an interface callers can understand. Evaluate
depth by the behavior and decisions that interface provides, rather than line counts. Preserve
cohesion, local reasoning, testability and every boundary established by an ADR.

Adapted from [codebase-design by Matt Pocock](https://github.com/mattpocock/skills/tree/d81f3a183412e71a5b1e84ca21bc1a35eea03a60/skills/engineering/codebase-design).
The upstream license is preserved in [LICENSE](LICENSE).

## Usage

Use `$codebase-design <interface>` or `/codebase-design <interface>`, or consult it from `tdd`
when the test boundary requires design. For example: `Design the invoice repository interface
around the uniqueness invariant.` This is design guidance, not permission to reorganize a codebase.

## Steps

1. Locate the producers, consumers, affected domain contract and ADRs in force. Before introducing
   derived data or a precondition, inventory every source, including imports, background jobs and
   historical data. State how each source is supported, migrated or excluded by the contract;
   a new precondition must not silently block admissible historical data. Bound the interface under
   discussion. Use the project's canonical vocabulary; module, interface, adapter and test boundary
   are explanatory terms, not mandatory replacements for domain or framework names.
2. Describe what callers must know: inputs, results, invariants, error modes, ordering, required
   configuration and relevant performance constraints. The type signature alone is not the contract.
   For a referenced collection replacement, define the stable matching key, preserve retained
   identities and specify how removals and duplicate keys are handled. Require bounded pagination
   by default and a documented maximum for every exposed list; for each new creation endpoint,
   apply class 2, "Retry idempotence", in the `pr-verdict` skill's
   `pr-verdict/references/failure-classes.md` or document
   why idempotence is unnecessary. Composite item keys must remain unique when a component is null
   or empty; otherwise use a stable identifier. For a fingerprint or
   signature, define the covered fields from the protected content; exclude unrelated preferences
   and metadata.
   For rules derived from a text, cite its applicable source, status and version in the design;
   identify the reference date for each effect or attribution, inclusive/exclusive bounds,
   exceptions and counting modes. Put the established rule in the domain and derive boundary and
   exception tests from that source. Escalate material ambiguity to its owner through
   `requirements-clarification`; a proposal or a document aligned on the code does not establish policy.
   For database-backed contracts, include identified database refusals, including at commit,
   translated at the adapter boundary into named application errors;
   unexpected failures remain technical errors.
3. Apply the deletion test: if the module disappeared, would its decisions spread across callers
   or would unnecessary delegation disappear? Keep functions and adapters with a real responsibility
   even when they have one caller or one implementation.
4. Keep the public surface small and specific to actual use cases. Hide cohesive implementation
   details, accept dependencies with effects at the appropriate boundary and prefer pure transformations
   for the owned core. Avoid hypothetical ports, boolean switches and generic operation handlers.
5. Read [references/dependencies.md](references/dependencies.md) when considering dependency
   boundaries, persistence, lifecycle changes or consolidation. State where each invariant is enforced
   and test it there. Do not collapse domain, transport or transaction boundaries merely to make a module deeper. For
   database-owned invariants, prove identified refusals, their error translation and transaction
   rollback on a real database, including commit-time failures when applicable.
6. Compare alternatives only when a consequential design choice remains. State the gain in
   locality, caller effort and testability; separate a contract change from a behavior-preserving
   restructuring. Use `requirements-clarification` for unresolved material policy, and
   `code-simplify` for an authorized cleanup implementation.
7. Before replacing tests or interfaces, inventory existing guarantees and independent consumers.
   Preserve their coverage until replacement checks exercise the same required behavior, including
   failures. Follow repository size limits rather than expanding one file without a cohesion limit.

## Gotchas

- **Depth measured by implementation size** — padding looks like progress; judge the useful
  behavior exposed and complexity removed from callers.
- **One implementation mistaken for a useless boundary** — an architectural invariant is lost;
  inspect the ADR and responsibility before proposing removal.
- **Replacing domain words with a skill glossary** — terminology diverges; retain the project's
  canonical names and explain design concepts in that vocabulary.
- **Deleting unit tests as soon as integration tests exist** — uncovered invariants disappear;
  compare behavioral coverage before retiring the old checks.

## Constraints

- An ADR in force and the domain contract take precedence over depth heuristics.
- Never introduce an abstraction solely for hypothetical future consumers or adapters.
- Never merge responsibilities solely to reduce the number of files or methods.
- Never erase a test boundary or its coverage solely because a broader test now exists.
- Design discussion does not authorize unrelated implementation or architectural migration.
