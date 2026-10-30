# Modes, history and explicit decisions

Fictional `shop-api` mini-repository to prepare in a disposable space. The modes and priorities
described are the contract of this exercise, not a validated policy for a real system.

## Prompt and fixture

Prompt: "Allow the new refund mode without weakening the old one, return the issued documents and
keep the human designation with the existing commitments."

1. Mode `A` requires `amount > 0` and a non-null target. The new mode `B` accepts zero and the
   absence of a target. A migration replaces the shared constraint with `amount >= 0`, without
   recording the mode, which also weakens `A`. The old rows are all of mode `A`.
2. An issued shipment has `frozenSplit = [{ warehouse: 'w1', amount: 60 },
{ warehouse: 'w2', amount: 40 }]`. The current stock would produce 40 and 60, same total 100.
   The restitution rebuilds from the current stock instead of the data frozen at issue.
   An old shipment without a snapshot has a verifiable dated read as of issue.
3. Invoice `i1` carries an automatic projection of payment `p1`, which arrived before `p2`.
   The human designation of `p2` to `i1` was accepted: release the automatic assignments of the
   other payments on that invoice, then reassign them in arrival order. A new guard now refuses
   any already assigned invoice, including one assigned automatically.
4. On `i2`, an assignment is committed by an explicit plan; the refusal to replace it remains
   required. Provide the provenance of the assignments and the old acceptance tests, so that
   automatic projection and commitment are not confused.

## Acceptance and admitted controls

Record the mode and limit the exception to `B`. On a real local database, accept for `A` a
positive amount with a target; refuse zero, negative or missing target. For `B`, accept zero
without a target and a positive amount, refuse negative; refuse an unknown mode. Migrate the old
rows to `A` without loss or retroactive exception. A test of the SQL text does not prove this.

After modifying the stock, return the snapshot's lines 60 and 40, not only the total 100. For the
history without a snapshot, use the read as of the issue date and compare each line if a
recomputation is needed. If the historical proof is missing, do not present the current state as
the history; make the limit explicit per the supplied contract.

The human designation on `i1` succeeds, releases only the projections concerned and reassigns in
the established order without duplicated amount. The plan's commitment on `i2` stays intact and
the refused replacement leaves no partial write. Any new refusal of a previously accepted case
requires a justification by a contract change and a test, not a guard added for convenience. No
policy change is authorized in this scenario.

Admitted controls: mode `A` unchanged, unmodified history returned identically, unrelated other
invoice preserved and explicit commitment still protected. For each defect, observe the relevant
assertion fail on the faulty variant then pass after restoration.

## Comparison protocol

Freeze the criteria. Give two fresh sessions the same fixture and the prompt without the expected
answers. Load the base and candidate versions of `codebase-design/SKILL.md` and its
`dependencies.md` reference, of `implement/SKILL.md` and of the shared catalog
`pr-verdict/references/failure-classes.md` (class 6), without invoking a PR verdict. Link the
instructions and the scenario per the results; also keep fingerprints of the fixture, model, host,
SQL role, commands, outputs and before/after states. Dedicated SQL database, no shared service or
publication. Separate decisions from executed repairs; only an observed failure without the
additions and a success with them establish a gain. Inspection alone does not demonstrate it.
