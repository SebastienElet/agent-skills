# Agent Skills

Reusable agent workflows distributed as `@sebastienelet/agent-skills`. The [derived index](skills/README.md)
lists the 40 skills and their purposes. Resources, attribution notices and historical evaluations
travel with their skill; historical observations do not qualify this package or current agent versions.

Prepared from the tracked sources at dotfiles revision
[`89307efa`](https://github.com/SebastienElet/dotfiles/tree/89307efadc512f6021696bdf7ebb8249c820a2ff).

This is an unpublished local preparation for version `1.0.0`. No registry installation, provenance,
Claude, Codex or Cursor activation has been qualified. Dotfiles keeps its current sources and
consumers until publication, independent installation and rollback have been verified.

## Acquisition and selection

After publication, acquire an exact version in a durable consumer-owned directory:

```sh
bun add --exact @sebastienelet/agent-skills@1.0.0
```

The package does not install tools, hooks or agent configuration. The consumer selects individual
skills and projects their directories into the chosen host's native discovery location. Preserve
the whole skill directory, refuse divergent destinations, and keep project and user scope distinct.
Do not install the whole collection indiscriminately or expose the same slug twice. Maintain source
in this repository's `skills/`, never through a deployed link or `node_modules`.

`code-review-fix` and `claude-development` are the canonical names; old skill aliases are not shipped.
Independent final Codex review is optional unless requested. User instructions supply preferences,
including note naming and the default Obsidian corpus. This package supplies
no personal instructions, corpus, agent/model selection, credentials or service configuration.

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
prerequisites, including forge access or third-party tools. `linear-sync` remains a manual assigned-issue
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
No token fallback is configured. GitHub creation, trusted-publisher configuration, remote creation
and publication are awaiting Sébastien's agreement. No workflow has been executed remotely.

The root MIT license covers original contributions. Skill-local licenses and attributions retain
their own applicability, including Matt Pocock, Ayoub Ghriss and the visual explanation references.
