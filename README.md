# Agent Skills

Reusable agent workflows distributed as `@sebastienelet/agent-skills`. The [derived index](skills/README.md)
lists the 39 skills and their purposes. Resources, attribution notices and historical evaluations
travel with their skill; historical observations do not qualify this package or current agent versions.

Prepared from the tracked sources at dotfiles revision
[`89307efa`](https://github.com/SebastienElet/dotfiles/tree/89307efadc512f6021696bdf7ebb8249c820a2ff).

Registry installation, provenance and Claude, Codex or Cursor activation require independent verification. Dotfiles keeps its current sources and
consumers until publication, independent installation and rollback have been verified.

## Acquisition and selection

After publication, acquire an exact version in a durable consumer-owned directory:

```sh
bun install --exact --ignore-scripts @sebastienelet/agent-skills@<version>
```

The package does not install tools, hooks or agent configuration. The consumer selects individual
skills and projects their directories into the chosen host's native discovery location. Preserve
the whole skill directory, refuse divergent destinations, and keep project and user scope distinct.
Do not install the whole collection indiscriminately or expose the same slug twice. Maintain source
in this repository's `skills/`, never through a deployed link or `node_modules`.

Check each selected skill's `compatibility` and workflow for prerequisites, and follow the same
declarations for its dependencies. These are instructions for the consumer, not automatic dependency
resolution. Project required skill directories from the same package version into the chosen host's
discovery location; keep the required resources reachable. If a required capability is unavailable,
report the affected step without claiming it ran.

For the interview and issue-start paths, the initial selection is:

| Selected path                   | Same-version prerequisites                                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `grill-me`                      | `grilling` for the interview                                                                                                  |
| Direct `grilling`               | No caller skill; compositions require the authorized caller and its own prerequisites                                         |
| `improve-codebase-architecture` | `codebase-design` for the survey; its `pr-verdict` catalogue; `grilling` after a candidate is selected                        |
| `issue-start`                   | `issue-workflow` and `orchestrate`; `diagnosing-bugs`, `plan`, `tdd` and `implement` as their respective stages become needed |

For conditional stages, inspect the selected specialist's own prerequisites as well: for example,
`plan` uses `codebase-design`, `requirements-clarification` when a material decision is unresolved,
and the `pr-verdict` catalogue. `issue-workflow` needs only the selected tracker and forge adapters.
Reading the `pr-verdict` catalogue does not invoke its verdict workflow. Presence of these files does
not establish that a host discovers or applies the skills.

Use `implement` for changes, `bug-fix` for repairs and `plan` for planning, with `orchestrate` retaining
the task across stages. `issue-start`, `issue-workflow`, `issue-spec` and `issue-sync` keep tracker
(Linear or GitHub Issues) separate from forge (GitHub or Bitbucket): Linear + GitHub and
Linear + Bitbucket are both supported paths. Probe only the selected providers.
`claude-developer` retains the manual handoff. Independent review is optional unless requested or
already required; `code-review` handles review alone, `code-review-fix` local corrections and
`pr-fix` authorized open-PR repair. No agent or Codex integration is mandatory for ordinary development.
User instructions supply preferences,
including note naming and the default Obsidian corpus. This package supplies
no personal instructions, corpus, agent/model selection, credentials or service configuration.

## Optional companions

These separately owned capabilities are not bundled or installed automatically. Each is listed with
its exact package version; availability and their consumer paths still require qualification:

| Capability                   | Package                                       | Consumer                                 |
| ---------------------------- | --------------------------------------------- | ---------------------------------------- |
| Context handoff              | `@sebastienelet/agent-handoff@1.0.0`          | Workflows requesting `handoff`           |
| Proof integrity              | `@sebastienelet/proof-integrity-review@1.0.0` | Reviews changing verification mechanisms |
| Scenario/evidence validation | `@sebastienelet/agent-experiments@1.0.0`      | Collection evaluation maintenance        |
| Herdr issue launch           | `@sebastienelet/herdr-issue-worktree@1.0.0`   | Explicit Herdr issue workflows           |

Evaluation CI remains pending the qualified
`agent-experiments` interface; its validator is not copied here. Each skill declares its own other
prerequisites, including forge access or third-party tools. `issue-sync` remains a manual tracker reconciliation
workflow; it neither calls nor replaces the retired Bitbucket–Linear synchronization CLI.

`output-discipline-hook` belongs to `output-discipline` and requires Bun. Its
[integration reference](skills/output-discipline/references/integration.md) describes the opt-in and
manual host configuration. The generic auditor configuration travels with
[`design-claim-audit`](skills/design-claim-audit/SKILL.md); model and effort remain host choices.

## Local contribution and release

Use Bun `1.4.3`, `bun install --frozen-lockfile`, `bun test`, `bun run typecheck` and
`bun run format:check`. Use `skill-manager` for changes and regenerate `skills/README.md` twice.
`bun pm pack --dry-run` inspects the native package contents. A local tarball is preparation evidence,
not a registry or agent activation check. Supported hosts are Claude Code, Codex and Cursor according
to each skill's declared scope; the collection makes no uniform platform or activation guarantee.

The manual `publish.yml` workflow publishes to npm with OIDC and provenance, after repository and
trusted-publisher setup, then creates the GitHub release `v<version>`. Its owner/repository/workflow
identity must match npm's [trusted publisher configuration](https://docs.npmjs.com/trusted-publishers/).
No npm token fallback is configured. Dispatch publication from `main` after configuring the trusted
publisher. Local checks do not establish registry installation, provenance or host activation.

The root MIT license covers original contributions. Skill-local licenses and attributions retain
their own applicability, including Matt Pocock, Ayoub Ghriss and the visual explanation references.

## Executable lesson evaluations

The following synthetic mini-repositories are materialized from source maps, with trusted setup
and executable oracles. They exercise behavior through the built service, database, public API or
mounted form; they do not test declarative file text.

| Subject                                                   | Case and retained executions                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Build artifact, JSX, token identity and production image  | [build-artifact-proof](skills/tdd/evals/build-artifact-proof/case.json)         |
| Target integration and complete package checks            | [lagging-branch](skills/codebase-design/evals/lagging-branch/case.json)         |
| Historical values, copied versions and constraint rollout | [moved-data](skills/codebase-design/evals/moved-data/case.json)                 |
| Immutable relations and authorized deletion               | [deletion-path](skills/postgresql-engineering/evals/deletion-path/case.json)    |
| Owner semantics and composed references                   | [module-boundaries](skills/codebase-design/evals/module-boundaries/case.json)   |
| Bounded file parsing                                      | [user-supplied-file](skills/codebase-design/evals/user-supplied-file/case.json) |
| Screen context, active rank and time bounds               | [screens-and-windows](skills/tdd/evals/screens-and-windows/case.json)           |

Each directory retains `a.txt` (common instructions), `b.txt` (the same instructions plus the
lesson), `control.json` (the original defective fixture), `summary.json`, and run
directories containing inputs, Codex JSONL, oracle output, source snapshots and Unix modes.
Read each summary before selecting evidence: pilots, failures, INVALID runs and successes without
the added instruction remain visible. A successful fixture smoke is not a live-agent observation.

Use the source CLI from [agent-experiments PR12](https://github.com/SebastienElet/agent-experiments/pull/12),
commit `04056ee28f987fc0d2e4b9097a606611d36c92e3`, for these repository trials; the companion's npm
interface remains unqualified. With an absolute case directory, a separately prepared disposable
Docker daemon, an explicit model and tool PATH:

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
