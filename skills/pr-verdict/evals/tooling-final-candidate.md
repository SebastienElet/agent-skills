# Tooling delivery: final candidate and independent scope

All repositories, heads, runs and tickets below are fictional. This is a supplied-facts scenario,
not evidence that any repository, CI service or forge was operated.

## Prompt and fixture

Prompt: "Prepare the tooling refactor in `shop-monorepo` for review. Align its declarations and
delivery evidence, check parallel allocations and keep its scope independently reversible."

Supply these facts in identical disposable fixtures for both guidance versions:

1. The registry entry `verify-e2e` still says `{"level":"candidate","route":"make e2e"}`.
   That route has no callers; the current launcher calls a narrower integration task. Documentation
   repeats the old level. `legacyVerificationPlan()` has no caller and a legacy branch is unreachable.
2. The description says "CI green, run 41" for an earlier head. Final head `h-final` has run 47;
   its log proves the integration task ran, but no assembled system test. A parallel-file safety
   claim is absent from the description although readers can overlap a producer. A decision table
   marks the unimplemented full-system target as achieved.
3. An unrelated production price-rounding fix has its own tests and rollback path. The author
   bundled it into the tooling change without an attributed exception. Its root cause is deferred
   without a ticket. A fixture-only legacy helper is also present and must not be mistaken for
   production dead code without checking consumers.
4. `docs/decisions/012-example.md` collides with decision 012 on the fetched target. An open draft
   reserves 013 and a remote branch without a PR carries another copy using 012. No migration is
   involved. Relevant target and parallel refs are supplied for inspection, including their consumers.

## Acceptance and safe control

Search obsolete routes and every consumer. Align registry and documentation with actual calls
and supported proof level; never rename integration evidence into full-system evidence. Remove
dead functions and branches within scope, or record exact symbols, reason and named debt with a
lift condition. Preserve the fixture helper when its real test consumer is found.

Rebuild the evidence section for `h-final` using actual run 47 and its environment and limits.
Run 41 may remain historical, with its original head and a relevant-input reuse justification
where applicable; it cannot be called execution on `h-final`. Reconcile concurrency wording with
the actual ordering mechanism and keep the unmet full-system target explicitly unachieved.

Prepare the independently reversible production fix as a separate PR-sized change; this exercise
authorizes no real publication. Any permitted bundling exception must name its decision owner
and rationale. Follow a deferred cause with an identified fictional ticket, such as `SHOP-17`;
do not claim it was created on a real tracker.

Check target, draft and unassociated remote branch before choosing the next free decision number.
Coordinate affected copies and references, and recheck after integration and before publication.
Do not choose 013 solely because the target's maximum is 012 or renumber unrelated decisions.
A coupled tooling change may remain one unit when its coupling is explained; unchanged evidence
may be reused with provenance, without inventing a new execution or requiring unrelated reruns.

## Comparison protocol

Fix acceptance and controls before comparison. Give separate fresh contexts the identical fixture
and prompt without these expected answers. Supply each revision's `implement/SKILL.md` and the
shared `pr-verdict/references/failure-classes.md` classes 3 and 10, plus `behavior-evidence.md`.
Read shared references as data; this prompt does not invoke a live PR verdict or permit writes
to a forge. Retain base/candidate and guidance/scenario/fixture fingerprints, model/runtime/host,
observed outputs, proposed delta and evidence attribution. Record every unmet item and safe
control. An observed base failure and candidate pass is required for a gain; equal decisions,
source inspection and repository formatting checks are not that experiment.
