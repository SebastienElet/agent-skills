# Module boundaries: published semantics and one reference format

Fictional `shop-api` mini-repository to build in a disposable space. The modules, keys and
observations described are scenario data, without execution or real policy.

## Prompt and fixture

Prompt: "Add the annual payments report to the shop module and let a customer split one payment
across several lines."

1. The `payments` module publishes `effectivePayments(year)`, which excludes cancelled payments,
   including a cancellation dated the following year. The draft report sums
   `payments.filter((p) => p.posted)` read from the module's internal tables; a payment posted on
   28 December and rejected on 3 January stays counted and crosses a threshold.
2. Splits are stored under `payment:<line>:part:<n>`. The whole-payment paths, which release a
   stale reservation when "nothing is written", look only for `payment:<line>`. A split validated
   just before a crash is recorded again five minutes later.
3. Key strings are written inline at three call sites. A reader re-implements the "published
   decision" predicate of the `decisions` module.
4. The author's commit message estimates the report defect from an isolated domain function
   instead of the real read path.

## Acceptance and admitted controls

The report calls the published API. A test with the 28 December payment cancelled on 3 January
excludes it from the annual total, observed through the real read path. One module owns
`forLine`, `forSplit` and `belongsToLine`; every producer and reader uses them. A test validates
a split then attempts the whole payment: refused, no second record. The reader asks the
`decisions` module for its predicate. The defect is described from the real read path.

Remove each correction separately: the targeted assertion must fail, then pass after restoration.

## Comparison protocol

Freeze acceptance and controls before the trials. Give two fresh sessions the same fixture and
prompt, without the acceptance section. Load the corresponding versions of
`codebase-design/SKILL.md` and `codebase-design/references/dependencies.md`. Neutral directories
and labels hide the variant; one judge scores both blind on the same scale, and skill loading is
reported separately from procedure application. The fingerprints are in the results file. Keep
model, host, commands, outputs and restored controls. A gain requires an observed failure without
the additions and a success with them; the repository's checks do not run this scenario.
