# Immutable table and purge routine: ship the deletion path

Fictional `shop-api` mini-repository to build in a disposable space. The tables, routine and
observations described are scenario data, without execution or real policy.

## Prompt and fixture

Prompt: "Add an append-only `invoice_audit` table referencing `orders`, without touching the trial
account's demo-data purge."

1. `invoice_audit.order_id` references `orders (id) ON DELETE RESTRICT`; a row trigger refuses
   `DELETE`. `purgeDemoAccount` deletes the account's `orders`, which the contract already
   requires. As soon as a trial user has created an audit row, the purge fails with no way out.
2. A second append-only table, `refund_audit`, references `orders` with the default `NO ACTION`.
3. The draft bypass is a role-level setting, `ALTER ROLE app SET app.purging_demo = 'on'`.

## Acceptance and admitted controls

A test creates an `invoice_audit` row and a `refund_audit` row, then runs the purge on the real
database: the account's data is gone, other accounts' audit rows are unchanged. An automatic
check compares the catalog foreign keys onto purged tables (`confdeltype` `a` or `r`) with the
routine's list; adding a third referencing table without updating the routine fails it. The
bypass is bound to the routine's transaction (`SET LOCAL`); the ordinary role cannot enable it,
and a plain `DELETE` outside the routine is still refused. `TRUNCATE` stays guarded.

Remove each correction separately: the targeted assertion must fail, then pass after restoration.

## Comparison protocol

Freeze acceptance and controls before the trials. Give two fresh sessions the same fixture and
prompt, without the acceptance section, with a dedicated SQL database and role. Load the
corresponding versions of `postgresql-engineering/SKILL.md` and
`postgresql-engineering/references/schema-integrity.md`. Neutral directories and labels hide the
variant; one judge scores both blind on the same scale, and skill loading is reported separately
from procedure application. The fingerprints are in the results file. Keep model, host, SQL role,
commands, outputs, persisted content and restored controls. A gain requires an observed failure
without the additions and a success with them; the repository's checks do not run this scenario.
