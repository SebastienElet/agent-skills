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

The database adapter's contract includes identified refusals from constraints and triggers,
including failures raised at transaction commit. Translate those refusals into named application
errors using structured driver information; unknown refusals and unexpected failures remain
technical errors. A useful early application check does not replace the database's enforcement
under concurrency. Prove the translation and absence of persisted transaction writes on a real
database, exercising commit-time refusals and concurrent changes when the affected invariant
requires them.

An existing architectural or security boundary can have one implementation and still be necessary.
Conversely, having two implementations does not automatically justify an abstraction. Require a
concrete responsibility, invariant or variation rather than counting adapters.

Before consolidating modules, identify which decisions would otherwise spread across callers.
Keep parsing, orchestration, policy and mutation separately understandable unless their combination
is trivial. Prefer specific APIs and domain values over general operation selectors.

Before adding a batch, preview, export or replay path, inventory the reads and writes of the
existing path. Share the mappers and reads carrying the same behavior; explicitly refuse an
unsupported variant rather than transforming it by default. Compare paths per variant, including a
preview and a produced document over the same data.

When moving a test surface, inventory its successful and failing behaviors before replacing tests.
Retire an old check only when its required coverage is retained or an authorized contract change
explicitly removes the requirement. Never infer equivalence from the new suite passing alone.

## Persistent contracts

Before adding a table, route or read, inventory the neighboring rules on the same data: owner
permission, immutability, erasure and read bounds. Reuse their canonical rules; justify any
difference by the applicable contract.

If a mode justifies relaxing a constraint, record that mode and bound the exception to it; other
modes keep their requirements. Test the admitted and refused cases of each mode on the real
database, including the migration's historical data.

For a shared `sum <= capacity` invariant, lock the capacity-owning row, reread the sum and write
within the same transaction. Every path changing the sum or capacity follows that protocol;
moving a precheck into an ordinary transaction alone does not serialize concurrent writers.
For at-most-once use, prefer a named unique or exclusion constraint with non-null keys and the
correct organization scope. Validate positive quantities at entry and translate only the expected
constraint violation. Follow `tdd` for overlapping real-database evidence.

For each added or expanded database constraint, exclusion or trigger, name the expected refusals
and their stable business errors. Translate structured driver identifiers and codes at the adapter
boundary, including failures at transaction commit; do not parse free-form messages or classify an
unknown technical failure as a business refusal. An early check may improve feedback, but the
database still protects the invariant against concurrent changes. Verify translation and rollback
through the application with the real database, following `tdd`'s database-refusal guidance.

For a proposal/validation workflow promising independent actors, persist the first actor's identity.
Keep permission separate from separation of duties: an authorized approver still cannot approve
their own proposal. Enforce this
in the domain and, where possible, with a named database constraint such as
`CHECK (approved_by IS NULL OR approved_by <> proposed_by)` on a non-null `proposed_by`.
Translate domain and database self-approval refusals to the same named business error. A single
eligible actor requires an explicit policy decision, not a silent self-approval exception.

For an immutability or append-only promise, inventory every affected collection, its database
mechanism and protected SQL role. Specify any one-time transition and its permitted fields. With
existing rows and that role, test raw `UPDATE`, `DELETE` and `TRUNCATE` separately, each in its own
transaction, asserting refusal and unchanged content; test allowed transitions and refusal of a
second transition or content change. Qualify the promise against schema administrators. Make any
purge, erasure or demo reset required or permitted by the established contract explicit; test its
success and the ordinary role's inability to enable a bypass. Align personal-data handling with the established
policy; permanent refusal alone proves no erasure compatibility.
For every protection, identify the erasure path's authority, scope and preconditions, or record the
missing decision as an open question. An undecided demo-data purge policy authorizes no bypass.
A table made immutable, or holding a `RESTRICT` reference to an object that a deletion routine the
contract already requires (demo purge, personal-data erasure, account deletion) removes, ships its
deletion path in the same change. Test it: create a row in the table, then run the routine. Keep an
automatic guard comparing the catalog's foreign keys onto purged tables with the routine's list. The
bypass takes its authority from a role the application role cannot assume, not from a settable flag;
see `postgresql-engineering` schema integrity.
Determine from the domain contract whether publication is permitted under a hold, who may lift it,
and when historical attributes become stable; record missing decisions. When first use freezes an
attribute, coordinate changes and first use so concurrent operations preserve the permitted outcome;
define whether replaying an unchanged value is allowed.

For a filed document, persist and read the exact deposited version, never a mutable latest alias.
Return its breakdowns from the data frozen at issue or a read as of that date; if a recomputation
is needed, compare each line to that data, not only the total.
Verify sealing before finalization and preserve that version's retention and availability. Missing
versions or failed integrity checks refuse without fallback; deposit-to-record failure needs
explicit recovery or cleanup. Handle historical documents in the schema migration rather than
silently pointing them at today's version.

Before replacing a referenced collection, inventory incoming references and choose its stable
identity key. Apply the difference atomically: keep retained IDs, insert additions and handle
referenced removals and duplicate keys under an explicit contract. A changed identity key is a
removal plus an addition; global delete/reinsert loses retained identities. For signed fingerprints,
list fields justified by the content actually presented for signature; exclude display preferences,
ordering and technical metadata unless signed. Separately test addition, default change, signed
content change and referenced removal: unchanged content keeps its ID and current approval, changed
signed content invalidates it, and removal leaves no dangling reference or undecided cascade.

## Related lifecycles and reservations

For a multi-step operation, identify its actual steps, concurrent changes and interruption points.
Protect mutable preconditions through the relevant write and define recovery so partial effects do
not create duplicates or omit required follow-ups. If the contract uses reservations, define their
acquisition, release and recovery; refusal must not leave an unintended blocking reservation.
Where progress is keyed by business identity, preserve it across technical identifier changes and
recompute remaining amounts and linked states according to the domain contract.

An automatic projection does not justify refusing the prioritized human decision provided by the
contract. Reassign projections in their established order, preserving explicit commitments,
notably by plan; distinguish these origins in the model and tests.

Recheck a temporal rule at each step producing or transmitting its value, with that step's clock;
an earlier confirmation does not validate a later export.

Enforce form rules on the server and downstream preconditions at the step producing the promised
state, with shared stable business codes. Explicitly incomplete drafts remain allowed under their
contract. References resolved through a global service still require caller scope and applicable
active-state checks; mutable validity must remain protected through the write.

For a check that can report no warnings, enumerate required evidence kinds before inspecting
supplied objects. Model valid, expired, unknown, undated and missing explicitly: unknown or undated
evidence needs confirmation, and an absent required kind is missing. Neither is verified compliance;
an explicitly unlimited validity rule is the only basis for accepting null expiry. Persist the
examined evidence and outcomes so verified compliance remains distinct from an unverifiable check.
For example, prefer `certificationWarnings(requiredKinds, certs, today)` over an expired-only filter.

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

## Collection APIs and identity

A read requires the permission of the data's owner, even from another module's route. Reference
people rather than copying their names; resolve labels at read time to follow renaming and erasure
per the contract. Also bound calls over a caller-supplied collection: prefer bulk, otherwise
explicitly limited concurrency, without `Promise.all` over an unbounded collection.

Every new creation endpoint needs an idempotence contract or an explicit justification for its
absence. For keyed creation, define key scope and lifetime, protect uniqueness in the database, and
couple request identity and effect atomically or provide durable recovery without lost or duplicate
effects. When replay is promised, commit the replayable response with the effect. In `shop-api`,
`POST /orders` might replay the original status and body for the same key and equivalent content,
and refuse changed content with a named `422`. Treat these as examples: define replay, same-key
changed-content behavior, response retention and personal-data handling from the applicable contract, or resolve
missing decisions. For a contract promising replay, a unique index alone is insufficient; define
concurrent outcomes and interruption recovery without duplicate effects. If payload equivalence
ignores object key order, apply that comparison consistently.

Every new exposed API list is bounded by default, with documented default and maximum limits and
named behavior above the maximum. Default to cursor pagination with stable ordering ending in a
unique ID; define the cursor and terminal-page contract, preserving an established alternative
pagination contract where applicable. UI keys use stable element IDs. A composite key needs
proof of uniqueness even when a component is null or empty; type plus optional expiry is no such
proof. See `tdd`'s collection cases for the behavioral evidence at each owning boundary.

Reads must not create revisions or other domain writes; expose those effects as explicit commands.
Keep sensitive search values out of URLs, logs and errors; moving a search into a request body
does not alone prevent disclosure. Derive organization scope from authentication, apply it to
queries and organization-local unique indexes, and authorize sensitive fields separately from
list access. Replacing a global index requires a compatible migration removing the old restriction.
Bound the underlying query too: avoid full-table loading and pairwise in-memory duplicate searches;
use scoped database grouping and verify indexes and query plans on representative volume.

Display labels describe the query or predicate actually executed. A sum of invoiced amounts is
not a refundable amount; deciding the latter requires its own rule. Help text announcing a
precondition needs an operation enforcing it; otherwise describe only the observed fact or remove
the promise. See `tdd` for evidence joining the real calculation and rendered wording.

## Module boundaries and reference formats

A consumer reads another module's data through the API or port its owner publishes, with the
owner's effective semantics and published states. Preserve its established predicates unless
the task explicitly changes that contract; never reread its internal shape or rewrite its predicates
("posted", "published", "cancelled") locally. A local rewrite loses the
cases the owner handles, such as a cancellation dated after the reporting period.
A composed key or reference format has one function producing it and one recognizing it, used by
every producer and reader. A new form of that format sends every path deciding "nothing written
yet" or releasing a reservation back through review. Measure and describe a defect on the real read
path, not on an isolated domain function.

## Files and cross-system writes

For storage followed by database writes, define order, durable progress, request identity and
recovery before implementation. A local transaction cannot make independent systems atomic;
choose a recovery mechanism under the applicable contracts, such as an outbox with an idempotent
consumer or explicit compensation. Define duplicate and changed-content behavior, object identity,
integrity, success and retention; resolve missing policy rather than assuming a reservation protocol.
Verify content before reusing an object; atomically record the identity, integrity metadata and
completion state needed by the contract before success. Make cleanup recoverable, remove abandoned
objects when required by the contract, and protect objects referenced by other operations. Validate content at entry and integrity before release as in
`code-enforcement`; exercise applicable partial failures and recovery as in `tdd`.

Analyse a user-supplied file (PDF, archive, image, XML) with explicit bounds: input size,
decompressed size, time, memory and concurrency. When the library offers no such limit, run the
analysis outside the server process, with a deadline, an output cap, a memory cap and an empty
environment; a supervisor that fails to start stops its child. Every stop becomes an unreadable-file
outcome with the contracted fallback, while a saturated queue answers with a distinct retryable
refusal. A decompression-bomb test generated by the test accompanies the change; see `tdd`.

## Schema evolution

Search purge, archive, export, personal-data erasure and seed routines touching the related schema.
Exercise each affected routine with every new relation populated, checking its complete result and
deletion order. Backfill new columns or handle old nulls explicitly, with tests on pre-existing rows.
Before activating a new or widened constraint, detect incompatible historical data in the migration
and apply an owner-validated treatment, or refuse diagnostically before modifying data. Never discard
rows arbitrarily. Test migration on representative old data and the authorized exit from any pending
state newly blocking other operations.

Moving where a value lives keeps the old location readable for existing rows, or the migration
carries them over; test with a row created before the migration. A copy from one version to the
next carries only values already decided for the new version; a value that must be redecided is
omitted, not inherited. A backfill takes the value in force on the day of the decision, not the
current one, and counts the rows violating the constraint it is about to add; any violation stops
the migration with a report. A new table follows the repository's identifier convention; when it
requires a scalar identifier, give a link table its own ID plus a unique natural key. A contract change stays
additive while old and new clients coexist: no existing field becomes nullable, no response becomes
a discriminated union, no accepted input is narrowed.
