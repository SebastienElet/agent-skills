# Agent Skills

Reusable agent workflows distributed as `@sebastienelet/agent-skills`. The [derived index](skills/README.md)
lists the 43 skills and their purposes. Resources, attribution notices and historical evaluations
travel with their skill; historical observations do not qualify this package or current agent versions.

Prepared from the tracked sources at dotfiles revision
[`89307efa`](https://github.com/SebastienElet/dotfiles/tree/89307efadc512f6021696bdf7ebb8249c820a2ff).

The release target is version `0.2.0`. Registry installation, provenance and Claude, Codex or Cursor
activation require independent verification. Dotfiles keeps its current sources and
consumers until publication, independent installation and rollback have been verified.

## Acquisition and selection

After publication, acquire an exact version in a durable consumer-owned directory:

```sh
bun install --exact --ignore-scripts @sebastienelet/agent-skills@0.2.0
```

The package does not install tools, hooks or agent configuration. The consumer selects individual
skills and projects their directories into the chosen host's native discovery location. Preserve
the whole skill directory, refuse divergent destinations, and keep project and user scope distinct.
Do not install the whole collection indiscriminately or expose the same slug twice. Maintain source
in this repository's `skills/`, never through a deployed link or `node_modules`.

`claude-development` is retired without an alias.
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

### Migration from 0.1.0

Version `0.2.0` removes `claude-development` without an alias. Select the new `implement`, `bug-fix`,
`plan` and `orchestrate` paths described above; `claude-developer` remains the manual Claude handoff.
The four tracker workflows are renamed without aliases:

| Version 0.1.0       | Version 0.2.0    |
| ------------------- | ---------------- |
| `linear-issue-spec` | `issue-spec`     |
| `linear-start`      | `issue-start`    |
| `linear-sync`       | `issue-sync`     |
| `linear-workflow`   | `issue-workflow` |

Record the installed version, selection and projection targets for rollback. Update the consumer
manifest and lockfile to exact `0.2.0`, replace the retired selections, remove only their managed
links and redeploy through the consumer's existing mechanism. Verify discovery on each selected
host; rollback restores the recorded version, selection and managed links. Foreign destinations
must remain intact. This release preparation does not update dotfiles or qualify registry
installation, rollback or host activation.

## Optional companions

These separately owned capabilities are not bundled or installed automatically. Their first target
versions are exact `1.0.0`; availability and their consumer paths still require qualification:

| Capability                   | Package                                       | Consumer                                     |
| ---------------------------- | --------------------------------------------- | -------------------------------------------- |
| Context handoff              | `@sebastienelet/agent-handoff@1.0.0`          | Workflows requesting `handoff`               |
| Proof integrity              | `@sebastienelet/proof-integrity-review@1.0.0` | Reviews changing verification mechanisms     |
| PR measurement               | `@sebastienelet/agent-measure@1.0.0`          | `pr-verdict`, via `agent-measure pr-verdict` |
| Scenario/evidence validation | `@sebastienelet/agent-experiments@1.0.0`      | Collection evaluation maintenance            |
| Herdr issue launch           | `@sebastienelet/herdr-issue-worktree@1.0.0`   | Explicit Herdr issue workflows               |

Missing measurement never changes a verdict. Evaluation CI remains pending the qualified
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

The manual `publish.yml` workflow uses npm only for publishing, with OIDC and provenance, after
repository and trusted-publisher setup. Its owner/repository/workflow identity must match npm's
[trusted publisher configuration](https://docs.npmjs.com/trusted-publishers/).
No token fallback is configured. Dispatch publication from `main` after configuring the trusted
publisher. Local checks do not establish registry installation, provenance or host activation.

The root MIT license covers original contributions. Skill-local licenses and attributions retain
their own applicability, including Matt Pocock, Ayoub Ghriss and the visual explanation references.

