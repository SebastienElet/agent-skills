# Moved data and copied versions: older rows keep their value

Fictional `shop-api` mini-repository to build in a disposable space. The rows, amounts and
observations described are scenario data, without execution or real policy.

## Prompt and fixture

Prompt: "Move the approved monthly fee out of the subscription terms into a dedicated
`pricing_decision`, add a non-negative constraint, and let a subscription start a new version."

1. Existing rows hold `terms.monthlyFeeCents`. The first draft reads
   `pricingDecision?.feeCents ?? MIN_FEE`, so every subscription approved before the migration
   falls back to the minimum and later invoices undercharge.
2. Approved subscriptions have no amount in the new column and display "changed since approval".
3. A new version is created with `{ ...previous.terms }`, carrying `monthlyFeeCents` into a
   version nobody priced.
4. The backfill copies unfiltered, then adds `CHECK (approved_fee >= 0)`. One existing decision
   has a fee of -500. The backfill also copies today's fee instead of the fee in force on the
   decision date; fee history is available.
5. The draft turns the response's `fee` into a nullable field and makes the plan a discriminated
   union. A client of the previous release receives 400 during the rollout.

## Acceptance and admitted controls

A test creates a subscription before the migration, migrates, then reads its fee: it equals the
decided value, not `MIN_FEE`, and the status shows approved. A new version omits the fee and asks
for a new decision. The backfill uses the fee in force on the decision date and counts rows with
a negative fee before adding the constraint; with the -500 row, the migration stops with a
report and the table is unchanged; after owner treatment of that row, it succeeds. The response
keeps its previous shape, with additions only; a previous-release request still gets 200.

Remove each correction separately: the targeted assertion must fail, then pass after restoration.

## Comparison protocol

Freeze acceptance and controls before the trials. Give two fresh sessions the same fixture and
prompt, without the acceptance section, and a dedicated SQL database. Load the corresponding
versions of `codebase-design/SKILL.md` and `codebase-design/references/dependencies.md`. Neutral
directories and labels hide the variant; one judge scores both blind on the same scale, and skill
loading is reported separately from procedure application. The fingerprints are in the results
file. Keep model, host, SQL role, commands, outputs, persisted content and restored controls. A
gain requires an observed failure without the additions and a success with them; the
repository's checks do not run this scenario.
