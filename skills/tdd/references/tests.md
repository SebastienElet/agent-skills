# Behavioral Tests

Adapted from the upstream `tdd/tests.md`; the version and license are recorded in this skill.

Tests describe an observable contract through the interface owning it. Name the production defect
that would make the assertion fail before writing the test. A passing test whose oracle cannot
disagree with the implementation provides no useful protection.

## Independent expected results

Use a known example rather than copying the calculation into the expected value:

```typescript
test("total includes both invoice lines", () => {
  expect(calculateTotal([{ amount: 10 }, { amount: 5 }])).toBe(15);
});
```

The literal `15` is derived from the worked example. Recomputing it with the same reduction as
`calculateTotal` can repeat the same bug. Snapshots are appropriate only when their content has an
independent meaning and the review can detect a wrong result.

## Boundary and assertions

- Test outcomes callers rely on, including rejected inputs, stable error codes and ordering when
  order is part of the contract. A test may need several assertions for one coherent behavior.
  For errors translated to HTTP, assert both the error class and stable business code, then exercise
  the status mapping at its owning boundary. The same message on a generic error or wrong code
  must not satisfy the contract.
- Read through the public interface for ordinary application behavior. When the database owns an
  invariant, direct database inspection or constraint exercise is a legitimate integration boundary.
- Use a real database for uniqueness, transactions and ORM mapping. An in-memory application
  dependency does not establish database semantics.
- For consumed environment values, derive fixtures from observed runtime values or current platform
  documentation and record their provenance; invented values alone cannot establish the format.
  For date-sensitive tests, use explicit offsets for instants and run at least once outside UTC.
  For timezone-aware database columns, set and verify the database session timezone itself: changing
  the application timezone alone does not prove session behavior. Keep business dates as dates when
  their contract is a calendar date rather than an instant.
  For tests depending on today, freeze the injected clock and derive relative dates from it;
  each date literal must be the frozen clock's origin or a fixed calendar case. Flag implicit
  expiry: a future date that becomes past, a bound counted from today or an expected date copied
  from the day the test was written.
- Test pure domain behavior directly when the invariant belongs there. Broader integration tests
  do not automatically make focused domain tests redundant.
- Name tests according to the boundary actually assembled. In-process application integration with
  a real database and substituted external services is not automatically end-to-end testing.

## Preserving tests through a rewrite

Before deleting or rewriting a test, inventory each assertion and map every surviving behavior to
its replacement evidence. Remove an assertion only when its protected behavior is intentionally
removed. Exercise every member of a set that drives behavior, rather than one representative.

For command orchestration, assert the complete ordered command list, every cleanup target and
secret isolation across all launch variants, including custom entrypoints. Use a synthetic secret.
Resolve the Git root through `git rev-parse --show-toplevel` and exercise a public invocation from
a subdirectory; testing a root helper alone cannot prove the caller uses it. Construct a worker
through its public interface, request stop during a batch and observe that the batch completes
without starting the next one; an internal stop-helper test cannot establish that wiring.

For each new oracle, remove or break the production behavior it protects in a disposable copy and
observe the intended assertion fail. Restore it and observe green. An observed test-first RED
suffices for that same missing behavior; no duplicate mutation is needed. Record the test, faulty
variant, assertion failure and restored result. Setup errors and crashes do not qualify.

## Controlled time

Search date literals in added or changed tests. A literal may anchor a frozen clock or an
independent calendar case; it must not silently mean "future" relative to the machine clock.
Inject or freeze time in the system under test, not only in the assertion. Derive dates relative
to today from that same clock with the project's calendar operations. Cover expected response dates,
future events and maximum durations, including the exact boundary and the first rejected value.
Replay with several controlled dates, including one after the old fixed fixtures, to expose hidden
expiry. Make the timezone explicit when crossing midnight matters; retain the database-session
checks above when storage interprets instants.

Owned domain code consumes the injected clock: keep `new Date()` and `Date.now()` reads inside its
clock adapter. Before restoring real timers, unmount consumers and drain pending fake-timer work.
For a Vitest UI test, put `cleanup()`, `await vi.advanceTimersByTimeAsync(0)`, `vi.clearAllTimers()`,
then `vi.useRealTimers()` in `finally`; clearing alone can discard an awaited notification.
After finding this defect, search every matching teardown with `rg useRealTimers`, correct the same
faulty pattern wherever it occurs and replay repeatedly and in randomized order. Do not hide it
with retries or repair only the first neighboring test.

For a rule derived from a dated text, take expected results from the applicable source and version:
exercise each reference date, inclusive/exclusive bound, exception and counting mode. Include a case
where candidate reference dates produce different outcomes; comparing identical dates hides a wrong
choice. A passing invented-policy example establishes no real policy's validity.
Use different manufacture and approval dates when the fictional rule names approval. For each
date-order invariant test equality, the previous day and the next day through its owning boundaries;
exercise missing expiry when duration is mandated as well as the accepted required or derived expiry.

## Evidence and collection cases

For warning-producing checks, cover every declared state separately: valid, expired, unknown,
undated and absent required evidence. At minimum, missing and unknown must produce a warning or
refusal; inspect the recorded examined evidence and distinguish unverifiable from verified compliant.
Include the safe case where the applicable rule explicitly permits unlimited validity.

For keyed creation, exercise concurrent identical requests against the real database: one row and
the replayed response. Reuse the key with a different body and assert the named refusal without a
second effect. For lists, seed more than the default limit; assert the bound, pagination continuation,
stable traversal without duplicate or omitted IDs on unchanged data, terminal page and the named
above-maximum behavior. For UI identity, include two elements with the same type and null or empty
expiry; exercise independent selection or update so a colliding key cannot pass as a harmless render.

## Database refusals

For aggregate caps, use separate real-database connections and synchronize requests to overlap
inside the decision/write window. In `event-api`, three concurrent requests for 20 seats against
50 available seats must leave the persisted sum at most 50. Use `Promise.allSettled` to inspect
every outcome and read back state. Concurrent same-organization uses of a single-use promotion
yield one success and one named refusal, with no partial writes; different organizations succeed
independently. Exercise all paths changing the cap or its contributors, not just creation.

For each added or expanded constraint, exclusion or trigger, exercise its named refusal through
the application with the real database. Assert the exact transport status and business code, then
read back all transaction writes to prove rollback. Include deferred refusal at commit, an unknown
technical error and a concurrent change defeating any early application check. A direct SQL refusal
alone does not prove the adapter's translation; a mocked exception does not prove the database path.

Bypass each form rule with a direct API request. Test missing, inactive and foreign references,
including those returned by a global service, without leaking foreign data. The producing and
downstream steps use the same precondition code and promised status, such as `422`; a permitted
incomplete draft remains a control. For strengthened historical rules, exercise migration refusal
without data changes on invalid rows and success on conforming rows.

For frozen data, assert refusal preserves protections; failed sealing cannot finalize a document.
Add a new file version and verify historical download still returns the deposited version; missing
or corrupt deposited content refuses without fallback. Overlap first use with a label rename:
only the contract-permitted outcome persists, and an unchanged-label replay succeeds. Test an
authorized erasure path only under an established policy; an open purge decision is not approval.

## Display and endpoint behavior

Pair wording with the behavior it describes. In `shop-api`, seed paid and unpaid orders, execute
the real aggregate query and render the card; assert both amount and label from those facts.
Exercise help text's actual predicate and any operation it claims to restrict. A copied string
assertion or declarative-file inspection proves neither calculation semantics nor enforcement.

For new reads, compare domain state before and after to detect silent writes. Exercise sensitive
searches through the actual request and logging/error paths, checking that URLs and diagnostics
contain no secret. Prove organization-local uniqueness permits the same reference in another
organization and refuses duplicates locally. Test sensitive-field denial or masking independently
of list access, alongside an authorized control. Reuse the collection traversal cases above;
record query-plan and representative-volume observations separately from page-size assertions.

## File integrity and recovery

Reject arbitrary text declared as a binary format; accept valid binary and permitted text variants
through the real content validator. Exercise changed bytes and absent objects at retrieval and
assert no content is released. Inject failure between storage deposit and database finalization,
then replay successfully; include concurrent identical requests, changed-content key reuse and an
already-present object with different bytes. Inspect durable state and the atomically finalized
object/digest/type association, not only the response. Exercise compensation after abandonment or
conflict and prove it preserves objects referenced by another operation. Distinguish evidence for
owned orchestration from storage-protocol evidence; a substitute alone proves no remote guarantee.

## Discriminating security tests

For isolation, authorization and redaction, arrange a case where only the targeted predicate can
prevent the forbidden result. An empty access scope can conceal a missing tenant filter; give the
foreign subject access to the candidate resource so only tenant isolation excludes it. Pair the
refusal with an authorized control to rule out a path that always rejects.

For approval requiring independent actors, give the proposer approval permission so only actor
separation can refuse self-approval. Assert the named `403` and no writes; accept another authorized actor
and refuse an actor without permission. Exercise direct SQL self-approval against a real database
as well as application error translation; neither proof substitutes for the other.

Apply the oracle-sensitivity procedure above to each added security test, targeting the predicate
that alone protects the forbidden result.

For redaction and sensitive persistence, assert exact stored values, including absent or cleared
personal fields; a partial object match accepts extra sensitive fields. Read the persisted body
separately from the response so response cleanup cannot conceal an unredacted stored copy.

## Failures that invalidate the evidence

Setup exceptions, syntax errors and a missing runtime are not the expected behavioral failure.
A test already green before the fix may characterize existing behavior, but it does not prove
that it detects the regression. Rerun the failing scenario after the fix as well as the focused test.

Assertions about internal call counts, private methods or implementation shape usually break
during harmless refactors. Check the observed result instead. For a protocol whose interaction
order is the invariant, test the actual protocol contract rather than a mock's incidental call order.
