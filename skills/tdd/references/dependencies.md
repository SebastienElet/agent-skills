# Test Dependencies

Adapted from the upstream `tdd/mocking.md`; the version and license are recorded in this skill.

Substitute dependencies only where the test's contract permits it. Prefer the real owned component
or a minimal in-memory implementation over mocks of internal collaborators.

| Invariant owner                                 | Relevant dependency strategy                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| Pure domain function                            | Call the actual function with explicit values.                                        |
| Application orchestration                       | Inject a minimal in-memory application dependency.                                    |
| Database constraint, transaction or ORM mapping | Exercise the real database and repository.                                            |
| External protocol integration                   | Exercise the protocol against a supported test endpoint or real local implementation. |
| Time or randomness                              | Inject a deterministic source at the existing boundary.                               |

Accept dependencies instead of constructing them inside the tested operation. Keep application
interfaces specific to their use case; a generic fetcher or conditional operation selector pushes
policy into test doubles and makes unrelated calls hard to distinguish.
Keep `new Date()` and `Date.now()` inside the clock adapter. Flush pending fake timers before
restoring real timers.

A substitute for a third-party service can test the owned application's decisions, but it cannot
prove that the service accepts its requests or behaves as assumed. Name that limitation and use
existing integration or contract checks when the change affects that external boundary.

When an adapter double supplies lifecycle states, run the same observable contract cases against
the double and the real adapter, at least for the states and defaults it produces. A double that
creates an already-active object cannot prove a workflow whose real adapter creates a draft.
Use the supported integration environment for the real implementation; a passing in-memory suite
alone leaves its fidelity unproven. Keep the shared cases limited to the contract the tests consume.

Avoid global module patches and test-only flags in production APIs. Add only the state and behavior
the in-memory implementation needs under test pressure; do not build a second production system.

Use shared typed factories for fixtures consuming the same contract and a shared compiler-checked
test implementation for a common port. Contract additions must expose missing fields or methods
through typecheck rather than leave dispersed handwritten copies silently stale.
A double implements the complete port, for example with `implements OrderRepository`, without a
partial-object cast hiding missing members. Recompile the doubles on the integrated tree.
