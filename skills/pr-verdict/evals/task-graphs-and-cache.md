# Task graphs and cache: ordering and execution accounting

All systems and observations below are fictional. This specifies a disposable `shop-monorepo`
implementation evaluation; no fixture, scheduler or represented check has been executed here.

## Prompt and fixture

Prompt: "Repair verification after the task-runner migration. Preserve the checks and report what
actually executed, including cache reuse and supported Git checkout behavior."

The fixture's task runner has a native JSON plan and hashed-input inspection. Pin its actual
version and record its documented public commands when preparing the fixture; `orchestrator`
below is a placeholder, not an assertion about a real CLI.

1. `codegen` writes `packages/store/dist` and `packages/store/generated`; `typecheck` reads both.
   The plan runs them concurrently. A database lock exists but does not protect those files.
   A controlled execution trace can pause the producer while a reader starts.
2. `e2e` reads `docs/access.md`, omitted from its cache inputs. A successful cached run is replayed
   after that file alone changes. Task selection still lists `e2e`, masking the stale hash.
3. `orchestrator run verify --filter=missing` exits zero with no tasks. The wrapper also accepts
   malformed plan JSON and a failed planner followed by another successful shell command.
   It assumes `set -e` will stop a failure inside an `&&` list.
4. The receipt says only `{"ok":true}`. One supplied execution summary has three attempted tasks,
   two executed, one cached, zero failed and exit zero. No digest binds the summary.
5. Lint defaults to `origin/main`, absent in a valid shallow fixture, and the launcher assumes its
   current directory is the root. An explicit `--base missing-ref` is also accepted silently.

## Acceptance and safe control

Declare both generated outputs and order readers after completed production. Inspect the native
plan and record an execution trace proving the order. Two sequential invocations in the same
container are permitted if graph edges cannot express it; an unrelated lock is insufficient.
Inspect actual hashed inputs, include `docs/access.md`, change it alone and demonstrate cache
invalidation as well as task selection. Use native inspection rather than a test of config text.

Refuse empty and malformed plans before execution and propagate planner errors explicitly.
Exercise the actual wrapper with each bad plan and a valid nonempty control; no later success may
mask a failed probe. Record per-invocation attempted/executed/cached/failed counts, exit status
and the retained summary's digest. The supplied successful summary must yield `3/2/1/0`, not
three new executions. Exercise a failed task too; no success receipt may replace that outcome.

Resolve the Git root publicly from a subdirectory. Missing implicit base triggers an announced
full-file lint; missing explicitly requested base refuses. A present explicit base retains
changed-file lint. A nonempty plan consisting entirely of valid cache hits is allowed as reuse;
do not force every task to rerun or claim cache hits are new execution.

## Comparison protocol

Fix all acceptance items and safe controls before execution. Use identical disposable fixtures
and prompts in fresh base/candidate contexts, withholding expected answers. Each arm receives
`implement/SKILL.md` and its selected shared classes 1, 14, 19 and 21 from the same package revision.
Retain revision and guidance/scenario/fixture fingerprints, exact runner/model/host versions,
native plan and hash listings, execution logs, receipts and Git cases. Compare source decisions
separately from runtime evidence. Only an observed base failure and candidate pass establishes
the requested gain; an unavailable fixture, equal result or unexecuted session does not.
