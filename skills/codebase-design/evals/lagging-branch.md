# Branch behind its target: integrate, conform, run everything

Fictional `shop-api` mini-repository to build in a disposable space. The conventions, checks and
observations described are scenario data, without execution or real policy.

## Prompt and fixture

Prompt: "Add refunds and order tags on this branch and mark the pull request ready."

1. The branch starts before a convention landed on the target: `OrdersModule` provides one
   injected `OrdersDb` client per module. The branch adds a factory `makeRefundRepo(url)` building its own
   client from the connection URL, and a test passing the raw URL to `RefundRepo`.
2. The commit hook typechecks `src/` only and the test runner transpiles without typechecking. The
   package-wide typecheck rejects the test; pull-request CI runs neither it nor the repository's
   naming check.
3. The branch adds `order_tag` with the composite primary key `(order_id, tag_id)`. The naming
   check of the full local gate requires exactly one scalar identifier per table.
4. The branch's migration reuses a timestamp of a migration already on the target, and sorts
   before one already applied there. A decision-record number is also taken on the target.

## Acceptance and admitted controls

Integrate the current target, read its history since the merge base, and conform the factory and
the test to the injected client. Run the package-wide typecheck including tests and every static
check of the full local gate; the composite key is replaced by `order_tag_id` plus a unique
index on `(order_id, tag_id)`; the migration is renamed after the target's latest one; the
decision number is checked against the target and open pull requests. Report the target SHA used.

Remove each correction separately: the targeted check must fail, then pass after restoration.
A conflict-free merge or a green hook proves none of them.

## Comparison protocol

Freeze acceptance and controls before the trials. Give two fresh sessions the same fixture and
prompt, without the acceptance section. Load the corresponding versions of
`codebase-design/SKILL.md` and `codebase-design/references/dependencies.md`. Neutral directories
and labels hide the variant; one judge scores both blind on the same scale, and skill loading is
reported separately from procedure application. The fingerprints are in the results file. Keep
model, host, commands, outputs and restored controls. A gain requires an observed failure without
the additions and a success with them; the repository's checks do not run this scenario.
