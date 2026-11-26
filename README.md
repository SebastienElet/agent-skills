# Agent Skills

Reusable agent workflows distributed as `@sebastienelet/agent-skills`. The [derived index](skills/README.md)
lists the skills and their purposes. Operational resources and attribution notices travel with
their skill. In the source checkout, reusable evaluation scenarios and fixtures live under
`skills/<slug>/evals/`. The package contains the operational skill directories and excludes
evaluations.

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
skills from the installed package and projects their directories into the chosen host's native discovery location. Preserve
the whole skill directory, refuse divergent destinations, and keep project and user scope distinct.
Do not install the whole collection indiscriminately or expose the same slug twice. Maintain source
in this repository's `skills/`, never through a deployed link or `node_modules`.

Check each selected skill's `compatibility` and workflow for prerequisites, and follow the same
declarations for its dependencies. These are instructions for the consumer, not automatic dependency
resolution. Project required skill directories from the same package version into the chosen host's
discovery location; keep the required resources reachable. If a required capability is unavailable,
report the affected step without claiming it ran.

Select `unslop` for standalone revision. For drafting articles and documentation, select
`writing-style` and `unslop` from the same package version.

For the interview and issue-start paths, the initial selection is:

| Selected path                   | Same-version prerequisites                                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `grill-me`                      | `grilling` for the interview                                                                                                  |
| Direct `grilling`               | No caller skill; compositions require the authorized caller and its own prerequisites                                         |
| `improve-codebase-architecture` | `codebase-design` for the survey; its `pr-verdict` catalogue; `grilling` after a candidate is selected                        |
| `issue-start`                   | `issue-workflow` and `orchestrate`; `diagnosing-bugs`, `plan`, `tdd` and `implement` as their respective stages become needed |

For conditional stages, inspect the selected specialist's own prerequisites as well: for example,
`plan` uses `codebase-design`, `requirements-clarification` only when a decision may require human authority,
and the `pr-verdict` catalogue. `issue-workflow` needs only the selected tracker and forge adapters.
Reading the `pr-verdict` catalogue does not invoke its verdict workflow. Presence of these files does
not establish that a host discovers or applies the skills.

Use `implement` for changes, `bug-fix` for repairs and `plan` for planning, with `orchestrate` retaining
the task across stages. `issue-start`, `issue-workflow` and `issue-spec` keep tracker
(Linear or GitHub Issues) separate from forge (GitHub or Bitbucket): Linear + GitHub and
Linear + Bitbucket are both supported paths. Probe only the selected providers.
Independent review is optional unless requested or
already required; `code-review` handles review alone, `code-review-fix` local corrections and
`pr-fix` authorized open-PR repair. No agent or Codex integration is mandatory for ordinary development.
User instructions supply preferences,
including note naming and the default Obsidian corpus. This package supplies
no personal instructions, corpus, agent/model selection, credentials or service configuration.

### Frontend design dependency (Bun)

`design-taste-frontend` is acquired transitively from the official
[Taste Skill repository](https://github.com/Leonxlnx/taste-skill/tree/12af471f627f866411b4bd785b19646d3672784c),
pinned to `12af471f627f866411b4bd785b19646d3672784c` (v2.1.5). Install this package with
Bun 1.4.3 or later and `--ignore-scripts`. npm installation is unsupported while that upstream
revision has no root `package.json`; an archive of the same tree does not supply one either.

Keep only `@sebastienelet/agent-skills` as a direct dependency. With Bun's default hoisted
installation, select `node_modules/design-taste-frontend/skills/taste-skill` and expose that whole
directory once per host as `design-taste-frontend`:

| Host        | User destination                         |
| ----------- | ---------------------------------------- |
| Claude Code | `~/.claude/skills/design-taste-frontend` |
| Codex       | `~/.agents/skills/design-taste-frontend` |
| Cursor      | `~/.cursor/skills/design-taste-frontend` |

For dotfiles, change only this skill's manifest `source` from
`node_modules/@sebastienelet/agent-skills/skills/design-taste-frontend` to
`node_modules/design-taste-frontend/skills/taste-skill`. Retire each existing link only after
verifying it targets the former source, then rerun the consumer's installer. Its refusal of a
divergent destination still applies. Other linker layouts must locate the dependency before
projecting it; a path in this table is not proof of host activation.

This is the unmodified upstream entry point, with its original description, house style and
resources. The former local activation, scope, review-output and design-system adaptations are
removed. Project instructions must establish the desired scope and design system; the upstream
inspector's aesthetic findings can conflict with those decisions. Node 22+ and an installed
Chrome, Edge or Chromium remain runtime prerequisites. Upstream scripts and their known defects
are unchanged by this distribution migration.

To upgrade, change the full Git revision in this package's dependency, regenerate `bun.lock`,
then rebuild and reinstall this package in the consumer. Roll back both the dependency pin and
lockfile together and reinstall. No upstream installer, lifecycle script or second direct
dependency is required.

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
prerequisites, including forge access or third-party tools.

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

## Evaluation replay

Start from the source checkout. For example, `skills/codebase-design/evals/module-boundaries/`
contains `case.json` (fixture, setup and oracle), `a.txt` (baseline instructions) and `b.txt`
(lesson instructions). Use the [pinned source runner](https://github.com/SebastienElet/agent-experiments/tree/04056ee28f987fc0d2e4b9097a606611d36c92e3#repository-trials)
with a disposable workspace. Follow the runner's isolation requirements for cases that need Docker.

The [historical archive](https://github.com/SebastienElet/agent-skills/tree/b63e5f44cc61abf978a804bd49c2a84a2930eaff/evals)
holds the original reports, snapshots and fingerprints, including the complete
[`orchestrate` partial-block campaign](https://github.com/SebastienElet/agent-skills/tree/b63e5f44cc61abf978a804bd49c2a84a2930eaff/evals/orchestrate/partial-block).
Look up a migrated case under
`evals/<slug>/<case>/` at that revision. Use its summary and report to verify the exact input hashes
before reusing evidence. Store new run logs and snapshots with the PR or campaign artifacts.
