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

## Reference audits

Scan a disposable installation of the native tarball. Scanning the checkout also reads source-only
evaluation fixtures; scanning one skill cannot establish whether its sibling skills are available.

Use Bun `1.4.3`, SkillEvaluator `1.0.1` from
[`4964c8b301cadbc121e126c268d06e201047133c`](https://github.com/NVIDIA/SkillEvaluator/tree/4964c8b301cadbc121e126c268d06e201047133c)
and SkillSpector `2.13.6`. Prepare these tools separately. The commands below use their installed
executables and make no model calls. Record their version output and the OS and architecture.

### Build and install

From the repository root, with the intended changes indexed:

```sh
bun --version
skillevaluator --version
skillspector --version
uname -sm
audit_dir="$(mktemp -d)"
git rev-parse HEAD > "$audit_dir/source-revision"
git diff --binary HEAD > "$audit_dir/source.patch"
bun install --frozen-lockfile --ignore-scripts
bun pm pack --ignore-scripts --destination "$audit_dir" > "$audit_dir/pack.log"
tarball="$(find "$audit_dir" -maxdepth 1 -name '*.tgz' -type f)"
shasum -a 256 "$tarball" > "$audit_dir/package.sha256"
mkdir "$audit_dir/consumer"
printf '%s\n' '{"private":true}' > "$audit_dir/consumer/package.json"
bun add --cwd "$audit_dir/consumer" --ignore-scripts --no-save "$tarball"
package_dir="$audit_dir/consumer/node_modules/@sebastienelet/agent-skills"
```

Retain the tarball, source revision, patch and package digest with the reports. A tarball installation
exercises this candidate's package boundary; it does not verify a registry release or host activation.

### Retain both native reports

Use a clean child environment to avoid inherited scanner policy, baselines or provider settings.
The focused run selects only the security check; it is not a complete Tier 1 audit. SkillEvaluator
scans each skill separately even when its target is the collection. Its
[reference contract](https://github.com/NVIDIA/SkillEvaluator/blob/4964c8b301cadbc121e126c268d06e201047133c/docs/tier1-reference.mdx#the-checks)
explains the conditions under which a missing reference leaves the scan incomplete.

```sh
evaluator="$(command -v skillevaluator)"
scanner="$(command -v skillspector)"
if env -i PATH="$PATH" TMPDIR="${TMPDIR:-/tmp}" \
  SKILLEVALUATOR_SKILLSPECTOR_PATH="$scanner" \
  "$evaluator" validate "$package_dir/skills" --tiers 1 --checks security \
  --no-llm --continue-on-failure --workers 4 --report json \
  --output-dir "$audit_dir/evaluator" > "$audit_dir/evaluator.log" 2>&1
then status=0; else status=$?; fi
printf '%s\n' "$status" > "$audit_dir/evaluator.exit"
mkdir "$audit_dir/skillspector"
for skill_dir in "$package_dir"/skills/*/; do
  slug="$(basename "$skill_dir")"
  if env -i PATH="$PATH" TMPDIR="${TMPDIR:-/tmp}" \
    "$scanner" scan "$skill_dir" --no-llm --format json --fail-on-incomplete \
    --output "$audit_dir/skillspector/$slug.json" \
    > "$audit_dir/skillspector/$slug.log" 2>&1
  then status=0; else status=$?; fi
  printf '%s\n' "$status" > "$audit_dir/skillspector/$slug.exit"
done
```

Preserve nonzero exits, missing reports, findings, caveats and completeness ledgers. A successful
process exit alone does not mean the scanner inspected every referenced resource.

### Qualify each unresolved occurrence

For every native `analysis_completeness.references` entry with status `missing` or `ambiguous`,
record the source file, line, quoted evidence, intended target, owner and availability evidence.
Keep rejected external links separate from unresolved local references.

| Owner                          | Availability evidence                                                                                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The skill                      | Locate the operational resource in its installed directory. An absent required resource is a defect.                                                                                                         |
| Another skill                  | Locate the resource in the same installed package version, then verify its reachability through the consumer's actual selected projection. Package presence alone leaves projection availability unverified. |
| The consumer project or corpus | Identify the selected repository or vault and any conditional requirement, such as “when present.” Without that consumer context, availability remains unverified.                                           |
| An example or generated output | Read the surrounding passage to establish its role. Do not create placeholder files to make the scan pass. A generated output is unverified until the relevant operation produces it.                        |
| An external tool               | Check the declared exact version's distribution or documentation. Distinguish a verified published resource from an unverified local installation.                                                           |

Attribute checkout diagnostics under `skills/<slug>/evals/` to source fixtures, preserving their
source revision and path. They are not evidence that the installed package contains those fixtures;
confirm the package boundary from the tarball and installation. Do not merge checkout and installed
findings into one undifferentiated count.

Store the occurrence table, native reports, commands, exits and hashes with the PR or campaign
artifacts. State which package resources were located, which consumer projections were inspected,
and which resources were outside the scan. Preserve the scanner's incomplete status alongside that
qualification; locating a target neither scans its contents nor clears an unrelated analysis gap.

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
