# Integration and provenance

## Source and adaptation

Adapted by Codex from [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd),
commit `6f1f982d0a47c65899af3c5a7450b7098bc65325`, resolved on 2026-09-11.
The remote default branch resolved to that same commit; there were no later changes to adopt.
The upstream [MIT notice](../LICENSE), copyright 2026 Ayoub Ghriss, is retained in full.

The ten presentation rules, six exceptions, conversational persistence and pre-send editorial
check are retained. After a live test exposed reactivation on resume, the user explicitly chose
to remove conversational deactivation, preferring to edit the skill when necessary. This intentionally differs from upstream; there is no off command or session
suppression state in the final adaptation. Medical assertions were replaced with neutral presentation goals; the title,
commands, activation message and marker were renamed. The category and section structure follow
local skill conventions. Nothing in the adaptation diagnoses the reader.

The canonical body is the adjacent skill’s `SKILL.md`. Claude’s manual invocation flag and
Codex’s `agents/openai.yaml` keep implicit model selection disabled. Explicit marker opt-in
allows lifecycle loading independently of discovery controls.

`output-discipline-hook` is the Bun companion shipped in the same package. It resolves the body
relative to its own installed module, so no manifest link, current repository or dotfiles checkout
is consulted. Missing or unreadable resources and invalid configuration produce a diagnostic
without blocking startup. An absent marker is silent. The loader writes neither state nor network
requests and reloads the body on every invocation. Bun is its only runtime; package dependencies
are acquired by the consumer through the exact package version and lockfile.

## Deployment and commands

Acquire the exact package version in a durable consumer-owned location, then select and project
the skill directory into the host’s native user discovery location. No automatic host configuration
runs during package acquisition. For Claude Code and Codex, configure the resolved executable path
of `output-discipline-hook` as the command for `SessionStart`, matcher
`startup|resume|clear|compact`, timeout 30 seconds. Preserve unrelated hooks and trust settings.
This package does not install or reconcile those declarations; the consumer owns that step.
A package update and its projections must be qualified together before retiring an older path.

Manual activation in a session:

- Claude Code: `/output-discipline`
- Codex: `$output-discipline`

Enable automatic loading for subsequent lifecycle events:

```sh
mkdir -p "${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
touch "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.output-discipline-always"
```

There is no conversational deactivation command. Edit the canonical skill when its behavior
needs adjustment; the loader reads the edited body on the next lifecycle event.
The marker remains shared with Claude's configuration directory even under Codex, preserving upstream's convention. If using
`CLAUDE_CONFIG_DIR`, give both runtimes the same value. The consumer must configure the matching hook destination for a custom Claude configuration
directory; writing a marker alone does not declare or trust a hook. Environment paths must be absolute.

## Host contracts and limits

Official documentation checked on 2026-09-11:

- [Claude hooks](https://code.claude.com/docs/en/hooks): `SessionStart` matches `startup`, `resume`,
  `clear`, `compact`; stdout is context. The consuming host configuration supplies the command.
- [Codex hooks](https://learn.chatgpt.com/docs/hooks): the same lifecycle source names and stdout
  context are supported; The consuming host configuration supplies the command. Each new or changed non-managed hook
  must be reviewed and trusted in `/hooks`; writing the file does not grant trust.
- [Claude skills](https://code.claude.com/docs/en/skills) documents explicit `/name` invocation and
  `disable-model-invocation`. [Codex skills](https://learn.chatgpt.com/docs/build-skills) documents
  local discovery. The paired OpenAI metadata is retained from upstream and local convention.

The hook declares only `SessionStart`, matcher `startup|resume|clear|compact`, timeout 30 seconds.
It reads the same full body used by manual activation and strips initial YAML frontmatter.
No per-message hook, word count, response rewriting or output compliance gate is introduced.
Injection consumes context; installation alone says nothing about improved answers.

The marker causes fresh loading on resume or compaction. This is intentional after the user
removed conversational deactivation from scope; no persisted session override is needed.
Higher-priority host and user instructions continue to apply.

## Verification record

See [verification.md](verification.md) for historical dotfiles checks and live observations. Those
observations do not qualify this extracted loader. The adjacent `scripts/output-discipline-hook.test.ts`
exercises the companion’s process boundary with temporary files; it does not execute host lifecycle events.
