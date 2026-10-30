# Parallel branches: schema and contracts after integration

Fictional `shop-monorepo` monorepo, to prepare in disposable copies. The branches, schema and
proofs below are scenario inputs; no remote Git service or forge is operated.

## Prompt and fixture

Prompt: "Verify the compatibility of the combined order branches with their target; fix the
migrations and doubles, then prepare the proofs of the integrated tree, without publishing."

1. The supplied target contains migration `202610281200_orders.sql`, with an
   `orders_status_check` constraint allowing `NEW`, `PAID` and `CANCELLED`. Rows exist for these
   states.
2. Branch A redefines the constraint with `NEW`, `PAID`, `ON_HOLD`. Branch B uses
   `202610271100_refunds.sql`, earlier than the target's latest migration, and redefines the
   constraint with `NEW`, `PAID`, `REFUNDED`. Both copies forget `CANCELLED`; the last definition
   applied also loses the other branch's addition. Provide the local refs of the parallel
   branches and a target schema inspectable with `pg_get_constraintdef`.
3. The integrated `OrderRepository` port has `find`, `save` and `listRefundable`. A partial
   double is cast to the port; another places `listRefundable` in the wrong double. The tests
   were transpiled without type checking. Each branch has isolated green results.
4. The composition exceeds a linter line limit; an assembled E2E test still uses data refused by
   a new constraint of the target. Provide the existing lint, typecheck, migration and E2E
   commands; do not add a gate or a test of the SQL text.
5. A branch adds `refunds.disabled` without adding it to the catalog or the public list.
   `/refunds` goes through the error translator but `/reports` bypasses it. A reject reason is
   missing from a partial table and its label displays empty. Provide the closed unions
   `RejectReason` and `PublicCode`, the catalog and both routes in the local copies.
6. A neighboring branch removes `invoice-42.pdf` and `private/orders` from the logs. A rewrite
   loses this guard; its test only checks the presence of `orderId`, which accepts the leak.
7. A factory receives a mandatory parameter. Callers and tests of the neighboring branch do not
   supply it. The supplied refs make it possible to find them before the change.

## Acceptance and admitted controls

Inspect the supplied refs and the current migration order. Date the migrations not yet applied
after the target's latest one and in a deterministic order; never renumber an applied migration.
Start from the current definition and the parallel additions: each redefinition keeps the values
allowed so far, the final definition admits the five states.

On a dedicated real database, migrate a fresh database and an existing database containing the
target's values; keep its rows and verify an insert per allowed state. An unknown value stays
refused by the named constraint. Do not substitute an assertion on the migration file for the SQL
exercise. The handling of historical data must delete no row arbitrarily.

Each double implements the complete port without a partial cast; typing must refuse a missing
member or one placed on another double. Integrate the branches in the disposable copy, fix the
semantic conflicts and rerun the existing lint, typecheck and E2E on this composition. The E2E
exercises the assembled system boundary provided by the fixture. The old isolated results do not
qualify this tree; relevant unchanged inputs may keep their proof with provenance. Keep the
controls: lost state, inconsistent order, missing member, lint defect and stale E2E fixture, with
relevant failure then restored success. No real branch is pushed.

Add the new code to the catalog and to its derived or existing public list, without editing a
generated artifact. Compile a total table `Record<RejectReason, PublicCode>`: each reason has a
cataloged code. Through `/refunds` and `/reports`, verify status, stable code and expected label
per the contract; an unknown technical error stays generic. A test of the translator alone does
not cover the route that bypasses it.

Reread the neighboring diffs and keep their guards in the rewrite. Capture the real logs,
including on error; verify that a diagnostic is emitted and that neither `invoice-42.pdf` nor
`private/orders` appears in any output. Removing the guard must make these absence assertions
fail, then its restoration make them pass. Search the callers on all supplied open refs before
imposing the parameter; adapt the contract and its consumers together in the composition. Also
keep the controls missing code, omitted reason, untranslated route and broken neighboring caller;
do not infer their coverage from the success of the schema tests alone.

## Comparison protocol

Fix the criteria before execution. Give two fresh contexts the same fixture and the prompt,
without the expected answers, with dedicated local refs and databases. Load the corresponding
version of `implement/SKILL.md`, `pr-verdict/references/failure-classes.md` (classes 3, 6, 21 and
22), `tdd/SKILL.md` and its `dependencies.md` and `tests.md` references. Reading the catalog as a
reference is not a verdict invocation; no publication is authorized. Link instructions, scenario,
fixture and composed trees by fingerprint; keep model, host, SQL, commands and outputs.
Distinguish decisions from executed repairs. Only an observed failure without the additions and a
success with them demonstrate a gain; individually green branches do not.
