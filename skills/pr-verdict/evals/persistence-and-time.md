# Persistence and time: decision scenarios

These are supplied facts about fictional systems, not executed software results. Compare the
base and candidate guidance in separate fresh contexts. For each case, return the defect or missing
proof, the required evidence and the safe control's disposition. Do not execute a live PR workflow.
Criterion fixed before comparison: the candidate must identify each supplied violation, require
evidence at its owning boundary and accept each control without imposing the forbidden behavior.
Compare specificity with the base; equal decisions establish no improvement rate.

## Cases

1. **Time.** A reservation test expects the day it was authored in an HTTP response, assumes a
   literal start remains future, and uses a fixed end date against a limit relative to today.
   All pass on the authoring day. Control: the system uses a frozen clock, relative dates use that
   clock, and independent end-of-month cases retain literals; replay after the old dates passes.
2. **Refusals.** A named database trigger rejects confirmation only at commit; a second named
   constraint rejects a period extension. Both escape as generic server errors although the API
   promises named business refusals. An application precheck passes before a concurrent change.
   Control: real-database application tests assert both promised status/code pairs and rollback,
   including commit-time and concurrent refusal; unknown technical errors retain generic handling.
3. **Immutability.** Two version collections are promised append-only. Only one has row guards;
   raw truncation succeeds, and the proposed fix blocks required demo reset and personal erasure.
   Control: the declared ordinary role cannot update, delete or truncate either collection or
   enable a bypass; the only permitted transition is field-limited and one-time; authorized
   reset/erasure succeeds. Schema-administrator limits and the established policy remain explicit.
4. **Producers.** A new invoice path feeds reminders; a periodic source and receipt import do not.
   Allocation picks the first open item and an opening record lacks the newly mandatory invoice.
   Control: every producer and consumer is accounted for, imports replay without duplicates,
   allocation preserves its target, and legitimate opening data works without fabricated invoices.
5. **Identity.** Replacing payment tokens deletes and recreates unchanged elements. A signed
   approval refers to one retained element, and the hash includes an unsigned default flag.
   Control: an atomic difference retains IDs, handles duplicate keys and referenced removals,
   preserves approval after addition/default changes and invalidates changed signed content.
6. **Dated rule.** A versioned fictional library policy names notification and approval as distinct
   reference dates, bounds duration and decision dates, counts a participation mode differently
   and grants two minimum-fee waivers. Code uses the common case and omits these distinctions.
   Control: source-derived tests distinguish the dates, exact and exceeded bounds, all modes and
   both waivers; today is controlled. A pending alternative policy is not treated as authority.
7. **Permission.** The design reserves publication to an action permission. The route instead
   requires the parent's general edit permission; an editor publishes without the required right.
   Control: with valid scope an editor-only subject is refused without writes and the subject
   with the dedicated permission succeeds.
8. **Cache.** A verifier publishes reusable success after its first check, then a required second
   check fails. Another worktree reuses that entry. The key covers every read input.
   Control: only complete success publishes atomically; failure, interruption and incomplete runs
   publish nothing and preserve validated entries; another worktree executes after failure and
   reuses complete success for identical inputs.
9. **Reservation.** A refused write leaves its number reserved forever. Releasing it by key can
   clear a successor's assignment; waiting holds database connections. A lease expires during a
   slow write and permits reassignment while that write is active.
   Control: owner-checked acquisition and handoff exclude reassignment during writing; recovery
   and stale release/finalization are exercised with a real database and contention above a bounded
   pool's size, without holding connections during application waiting.
10. **Reference cycle.** Publication accepts a provisional favorable result from an open session
    or an old cycle. Reopening a source with dependents erases their tracking and evidence; a new
    association can race the dependency check.
    Control: only published current-cycle results from a closed source authorize publication;
    reopening a referenced source is atomically refused with a named error and no lost evidence.
11. **Migration.** Three new restrictive relations independently break parent-first purge. A
    widened overlap exclusion rejects historical pending rows before the application starts;
    pending objects lack an exit and can block later associations indefinitely.
    Control: representative old-data migration detects conflicts before modification and applies
    approved treatment or diagnostic refusal; populated-relation purge and authorized pending exit
    have real-database tests. No arbitrary row deletion is assumed acceptable.
12. **Identifiers.** After the initial check, a refreshed destination holds a chosen document
    number and a later migration. A draft and a remote branch without a PR also hold candidate
    numbers; a parallel permission manifest reuses a version for different keys. Merge is clean.
    Control: rechecks before publication and after integration cover those refs and migration
    order, and coordination preserves the intended key union under a fresh version.
13. **Coverage.** End-to-end tests pass, but a new handler's branches are absent from the CI's
    unit-only coverage report and the package falls below its unchanged threshold.
    Control: behavior tests with in-memory application adapters detect a broken rule, feed the
    measured suite and restore the gate; the exact CI command, percentage, threshold and execution
    environment are recorded.

## Limits

These cases assess decisions under supplied facts. They do not execute database, HTTP, cache,
migration or clock behavior, test host activation, or establish recurrence prevention. Record the
exact guidance and scenario fingerprints, agent/runtime information available and actual tool use
separately from the decisions. No result from these cases qualifies a mini-repository evaluation.
