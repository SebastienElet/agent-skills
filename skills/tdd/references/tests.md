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

## Controlled time

Search date literals in added or changed tests. A literal may anchor a frozen clock or an
independent calendar case; it must not silently mean "future" relative to the machine clock.
Inject or freeze time in the system under test, not only in the assertion. Derive dates relative
to today from that same clock with the project's calendar operations. Cover expected response dates,
future events and maximum durations, including the exact boundary and the first rejected value.
Replay with several controlled dates, including one after the old fixed fixtures, to expose hidden
expiry. Make the timezone explicit when crossing midnight matters; retain the database-session
checks above when storage interprets instants.

For a rule derived from a dated text, take expected results from the applicable source and version:
exercise each reference date, inclusive/exclusive bound, exception and counting mode. Include a case
where candidate reference dates produce different outcomes; comparing identical dates hides a wrong
choice. A passing invented-policy example establishes no real policy's validity.

## Database refusals

For each added or expanded constraint, exclusion or trigger, exercise its named refusal through
the application with the real database. Assert the exact transport status and business code, then
read back all transaction writes to prove rollback. Include deferred refusal at commit, an unknown
technical error and a concurrent change defeating any early application check. A direct SQL refusal
alone does not prove the adapter's translation; a mocked exception does not prove the database path.

## Discriminating security tests

For isolation, authorization and redaction, arrange a case where only the targeted predicate can
prevent the forbidden result. An empty access scope can conceal a missing tenant filter; give the
foreign subject access to the candidate resource so only tenant isolation excludes it. Pair the
refusal with an authorized control to rule out a path that always rejects.

Observe a red witness by removing or breaking the intended predicate in a disposable copy: the
test must fail by assertion, not by setup error or crash. Restore it and observe green. An existing
test-first red suffices when it demonstrates that same missing predicate; no duplicate mutation
campaign is required. Delivery evidence names the targeted test, faulty variant, observed assertion
failure and restored result for each added security test.

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
