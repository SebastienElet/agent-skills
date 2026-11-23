# Maintainer evaluations

Keep reusable scenarios and fixtures under `skills/<slug>/evals/` in the source checkout.
Use an installed package for operational projection. Its skill directories omit evaluations.
Keep new campaign journals, reports and snapshots with the PR or campaign artifacts. Record the
source revision, exact inputs and their hashes, tools, environment and results in the artifact.

## Historical evidence

The [pre-migration archive](https://github.com/SebastienElet/agent-skills/tree/b63e5f44cc61abf978a804bd49c2a84a2930eaff/evals) preserves the original files and Git revision, including
summaries, raw logs, snapshots and fingerprinted evidence bundles. The live path
`skills/<slug>/evals/<path>` corresponds to `evals/<slug>/<path>` in that archive for migrated
cases. Use the archive revision for paths and hashes cited by historical records. Some records
predate [PR #152](https://github.com/SebastienElet/agent-skills/pull/152) and refer to the older `<slug>/evals/` or
`skills/<slug>/evals/` layout. Those references identify the captured inputs.

To inspect a recorded run locally, extract its campaign from Git into an empty directory. For
example, retrieve the complete `module-boundaries` campaign, including the selected reports.

```sh
git archive b63e5f44cc61abf978a804bd49c2a84a2930eaff \
  evals/codebase-design/module-boundaries | tar -x -C "$archive_dir"
```

The [partial-block corpus](../evals/orchestrate/partial-block/README.md) remains at the path
established by [PR #163](https://github.com/SebastienElet/agent-skills/pull/163).

## Executable lesson evaluations

The following synthetic mini-repositories are materialized from source maps, with trusted setup
and executable oracles. They exercise behavior through the built service, database, public API or
mounted form; they do not test declarative file text.

| Subject                                                   | Reusable case                                                                      |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Build artifact, JSX, token identity and production image  | [build-artifact-proof](../skills/tdd/evals/build-artifact-proof/case.json)         |
| Target integration and complete package checks            | [lagging-branch](../skills/codebase-design/evals/lagging-branch/case.json)         |
| Historical values, copied versions and constraint rollout | [moved-data](../skills/codebase-design/evals/moved-data/case.json)                 |
| Immutable relations and authorized deletion               | [deletion-path](../skills/postgresql-engineering/evals/deletion-path/case.json)    |
| Owner semantics and composed references                   | [module-boundaries](../skills/codebase-design/evals/module-boundaries/case.json)   |
| Bounded file parsing                                      | [user-supplied-file](../skills/codebase-design/evals/user-supplied-file/case.json) |
| Screen context, active rank and time bounds               | [screens-and-windows](../skills/tdd/evals/screens-and-windows/case.json)           |

Each case directory contains `case.json` with the fixture, setup and oracle, plus `a.txt`
(common instructions) and `b.txt` (the same instructions plus the lesson). Its archived counterpart
contains the negative control, comparison, summary and run directories. Read the archived summary
before selecting evidence. It identifies pilots, failed and invalid runs and successes without the
added instruction. Check the case and instruction hashes against the selected report before replay.

Use the source CLI from [agent-experiments PR12](https://github.com/SebastienElet/agent-experiments/pull/12),
commit `04056ee28f987fc0d2e4b9097a606611d36c92e3`, for these repository trials; the companion's npm
interface remains unqualified. Set `case_dir` to the absolute path of the case directory in a source checkout. Use a
separately prepared disposable Docker daemon, an explicit model and tool PATH.

```sh
agent-experiments repository-run --case "$case_dir/case.json" \
  --instructions "$case_dir/a.txt" --model gpt-6-luna --reasoning-effort medium \
  --tool-path "$experiment_path" --network --docker-host "$dedicated_endpoint" \
  --timeout-seconds 600 --report "$new_baseline_dir"
agent-experiments repository-run --case "$case_dir/case.json" \
  --instructions "$case_dir/b.txt" --model gpt-6-luna --reasoning-effort medium \
  --tool-path "$experiment_path" --network --docker-host "$dedicated_endpoint" \
  --timeout-seconds 600 --report "$new_candidate_dir"
agent-experiments repository-compare "$new_baseline_dir" "$new_candidate_dir"
```

Recorded live runs used macOS ARM64, Bun1.4.4, CodexCLI0.166.0, Europe/Paris and a dedicated
Docker29.9.2 daemon; the database cases used PostgreSQL18 and the image case used Bun1.4.3.
Each report identifies the requested model, reasoning effort, frozen bytes and runner binary.
These exploratory comparisons inject instructions explicitly and demonstrate only the recorded
cases. They do not establish automatic skill activation, statistical uplift, adversarial isolation,
Linux live-model behavior or Claude Code/Cursor behavior. The parser fixture uses a synthetic
SHOPPDF/gzip envelope, not a PDF conformance corpus. Retained source snapshots exclude Git
metadata and node_modules; reconstruct those through setup and dependency installation.
