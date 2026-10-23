# Dependencies and Module Depth

Adapted from the upstream `codebase-design/DEEPENING.md`; the version and license are recorded in
this skill.

Depth is useful only within the responsibilities the module owns. A small public interface may
coordinate several cohesive internal parts; it does not require one large file or the removal of
domain and transaction boundaries.

| Dependency                      | Design and verification                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Pure computation or local state | Keep transformations explicit and test the interface owning the invariant.                                                      |
| Database or filesystem          | Preserve the I/O adapter; use the real component when its semantics are under test.                                             |
| Remote owned service            | Respect module ownership and the deployed contract; test owned decisions with an in-memory dependency and transport separately. |
| Third-party service             | Inject the boundary; distinguish application evidence from evidence of the external protocol.                                   |

An existing architectural or security boundary can have one implementation and still be necessary.
Conversely, having two implementations does not automatically justify an abstraction. Require a
concrete responsibility, invariant or variation rather than counting adapters.

Before consolidating modules, identify which decisions would otherwise spread across callers.
Keep parsing, orchestration, policy and mutation separately understandable unless their combination
is trivial. Prefer specific APIs and domain values over general operation selectors.

When moving a test surface, inventory its successful and failing behaviors before replacing tests.
Retire an old check only when its required coverage is retained or an authorized contract change
explicitly removes the requirement. Never infer equivalence from the new suite passing alone.

## Persistent contracts

For each added or expanded database constraint, exclusion or trigger, name the expected refusals
and their stable business errors. Translate structured driver identifiers and codes at the adapter
boundary, including failures at transaction commit; do not parse free-form messages or classify an
unknown technical failure as a business refusal. An early check may improve feedback, but the
database still protects the invariant against concurrent changes. Verify translation and rollback
through the application with the real database, following `tdd`'s database-refusal guidance.

For an immutability or append-only promise, inventory every affected collection, its database
mechanism and protected SQL role. Specify any one-time transition and its permitted fields. With
existing rows and that role, test raw `UPDATE`, `DELETE` and `TRUNCATE` separately, each in its own
transaction, asserting refusal and unchanged content; test allowed transitions and refusal of a
second transition or content change. Qualify the promise against schema administrators. Make any
purge, erasure or demo reset required or permitted by the established contract explicit; test its
success and the ordinary role's inability to enable a bypass. Align personal-data handling with the established
policy; permanent refusal alone proves no erasure compatibility.

Before replacing a referenced collection, inventory incoming references and choose its stable
identity key. Apply the difference atomically: keep retained IDs, insert additions and handle
referenced removals and duplicate keys under an explicit contract. A changed identity key is a
removal plus an addition; global delete/reinsert loses retained identities. For signed fingerprints,
list fields justified by the content actually presented for signature; exclude display preferences,
ordering and technical metadata unless signed. Separately test addition, default change, signed
content change and referenced removal: unchanged content keeps its ID and current approval, changed
signed content invalidates it, and removal leaves no dangling reference or undecided cascade.

## Related lifecycles and reservations

List the state, attributes and provenance that make a reference valid, not just its existence:
unit, period, owner, withdrawal, publication, source closure and current cycle as applicable.
Test each divergence with a named error and an admissible control. For reverse transitions, protect
existing dependents and their evidence: where the contract forbids reopening a referenced source,
check and refuse atomically with respect to new associations, before any modification. Exercise
provisional, open-source and previous-cycle results as well as the accepted published current cycle;
refused reopening must preserve tracking and evidence.

A reservation needs an owner, a failure exit and defined expiry or recovery. Reassignment must
exclude an active write, even if its lease expires; protect acquisition, holder authority and the
handoff to writing atomically. Stale holders cannot release or finalize a successor's reservation.
Do not retain a database connection during application-level waiting. With a real database and a
bounded pool, exercise refusal then recovery, an old failure after reassignment, expiry during a
slow write, and contention exceeding pool size without exhausting it through held waiting connections.

## Schema evolution

Search purge, archive, export, personal-data erasure and seed routines touching the related schema.
Exercise each affected routine with every new relation populated, checking its complete result and
deletion order. Backfill new columns or handle old nulls explicitly, with tests on pre-existing rows.
Before activating a new or widened constraint, detect incompatible historical data in the migration
and apply an owner-validated treatment, or refuse diagnostically before modifying data. Never discard
rows arbitrarily. Test migration on representative old data and the authorized exit from any pending
state newly blocking other operations.
