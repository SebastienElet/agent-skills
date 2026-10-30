# Multi-step operations: order and recovery

Fictional `shop-api` repository, without real data or services. This document specifies a
mini-repository to build; no scenario is executed by its presence alone.

## Prompt and fixture

Prompt: "Fix the refunds and notifications without duplicates or stuck state; keep the proof of
refusals and of recoveries after interruption."

Provide the same data and defects to both sessions:

1. `executeRefund()` writes before reserving, then goes from `VALIDATED` to `EXECUTED`.
   `cancelRefund()` can win between the write and the transition. Another path reserves before
   checking period, permission and document; a refusal leaves `reserved_by` set.
2. For an order of 40 minor units, two credit notes of 30 both reread the initial remainder. The
   faulty result is 60. Each write must leave a non-negative remainder.
3. `onPaymentRejected()` cancels the write, marks the event received, then fails before
   `notifySupport()`. On replay, `seen(event.id)` causes an early return.
4. The total reversed is indexed by technical assignment. After refusal and reassignment with a
   new ID for the same order/payer pair, the same amount is counted twice. The contract computes
   the active assignments minus the unreleased reversals, by that business pair, with a result
   never negative.
5. A linked request stays processed after its event is cancelled and forbids its replacement. A
   refusal test fails on a reservation conflict instead of the expected business assertion.
6. `POST /refunds` relies only on `UNIQUE(request_id)`: the second submission receives `409`
   instead of the original response. The repository's common mechanism keeps a response without
   personal data and handles recovery; a new route bypassed it.
7. Two comparisons use `JSON.stringify()`: `{ amount: 10, orderId: 'o1' }` and
   `{ orderId: 'o1', amount: 10 }` are considered different. An interruption can occur during
   creation, before or after the effect is persisted, without a response received by the client.

## Acceptance and admitted controls

Order checks, atomic reservation, idempotent effect and transition. On a real database, with
separate connections and deterministic barriers, attempt a cancellation between each step. If it
wins before reservation, no effect is written; after reservation, it cannot invalidate the
protected write. Each check refusal leaves the request unreserved and resumable. A failure after
reservation follows the planned recovery, without an abandoned reservation.

The credit notes write 30 then 10, total 40, remainder 0. Interrupt then replay the notification:
the cancellation is not repeated and the idempotent notification is finally emitted once.
Changing the technical ID without changing order/payer does not renew the available amount;
another business pair stays independent. Cancelling the linked event must update the derived
status and allow the replacement planned by the contract.

Through the common mechanism, the first submission creates a row and returns `201` with a body
containing the created identifier. Replaying with the same key, including with the key order
reversed: same status and body, no second creation or conflict response. Inject an interruption
before then after persistence and replay until the original response, without doubled effect.
Compare the payloads by canonical hash at both comparison points; the same key with amount 11
instead of 10 receives `422`, without modification. Another business key stays independent. Read
the stored response to verify the absence of the personal data planned by the fixture.

For each oracle added, keep a faulty variant, the failure of its targeted assertion and the
success after restoration. A conflict exception during setup is not this control. Admitted
controls: valid refund completed, replay completed without duplicate, cancellation before
reservation and correction of a refused document followed by a successful attempt.

## Comparison protocol

Freeze the criteria before execution. Build two identical disposable copies of the
mini-repository, with a dedicated real local database, no shared resource. Give two fresh contexts
the same prompt and the fixture, without the expected answers; load, for each version,
`tdd/SKILL.md`, its `tests.md` and `dependencies.md` references, as well as
`codebase-design/SKILL.md` and its `dependencies.md` reference. The base is the revision indicated
in the results file; the candidate is the final indexed tree. No PR verdict or publication is
requested. Keep fingerprints of the instructions, fixture and scenario, model version, host, SQL
database, commands, outputs, persisted states and controls. Compare decisions and executed repairs
separately. Only an observed failure without the additions and a success with them establish a
gain; inspection or format checks are not enough.
