# Persistence and time: decision observations

Two fresh delegated contexts independently assessed the identical
[scenarios](persistence-and-time.md) on 2026-10-23. The base reader used only the seven guidance
files at `27797c8a979ec9cd04dea3fa245161af72e9903d` via `git show`; the candidate reader used only
their working-tree counterparts. Neither saw the other response or the author's conclusions.
The scenario's criterion was fixed before either run. These were offline decision exercises,
not live PR verdicts or host-activation trials.

Both readers identified all 13 supplied violations, requested evidence at the owning boundary and
accepted all 13 safe controls. The base reader could infer the needed decisions from the supplied
facts even where its guidance was less specific. The comparison establishes no detection-rate gain,
repeatability or prevention of recurrence. No represented database, HTTP, clock, cache, migration,
permission or coverage behavior was executed.

| Case            | Base guidance reported by its reader                                                                        | Candidate decision and required evidence                                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time            | Partial: deterministic dependencies and timezone guidance, no explicit expiry replay                        | Controlled application clock, relative fixtures, boundaries and replay beyond old dates; independent calendar literals remain valid.                            |
| Refusals        | Partial: error contract and real database, no explicit deferred-commit translation                          | Structured named translation, exact status/code and rollback through the real application/database, concurrent refusal and unknown technical error.             |
| Immutability    | Partial: layer proof and erasure, no explicit truncate/role matrix                                          | Both collections, raw update/delete/truncate, role-scoped non-bypass, one-time transition and successful authorized reset/erasure.                              |
| Producers       | Partial: consumers and ambiguity, no explicit producer inventory                                            | Every source and consumer, replay, intended allocation target and admitted historical input without fabricated workflow objects.                                |
| Identity        | Partial: atomicity and references, no explicit signed projection                                            | Atomic difference preserving IDs, duplicate/removal contract, unsigned-change stability and signed-change invalidation.                                         |
| Dated rule      | Partial: authoritative requirements and independent expectations                                            | Applicable source/version, discriminating dates, exact/exceeded bounds, every counting mode and waiver, controlled today.                                       |
| Permission      | Direct: explicit permissions, scope and discriminating subjects                                             | Dedicated action permission, parent-only refusal without writes and authorized control.                                                                         |
| Cache           | Partial: complete inputs, no explicit final atomic publication                                              | Late failure and interruption publish no success, validated entry survives, another worktree executes after failure and reuses complete success.                |
| Reservation     | Partial: atomicity/replay, no explicit owner/lease/pool contract                                            | Real database with bounded pool: recovery, stale-holder refusal, expiry during slow write without reassignment and contention without held waiting connections. |
| Reference cycle | Partial: reference validity and atomicity, no explicit published/current-cycle source or reverse transition | Provisional/open/old-cycle refusals, accepted published closed current cycle and atomic reopening refusal preserving tracking/evidence.                         |
| Migration       | Partial: old rows and dependent purge, no explicit widened-constraint conflict treatment                    | Representative historical migration, approved treatment or pre-modification diagnostic refusal, every populated relation and authorized pending exit.           |
| Identifiers     | Direct: destination, drafts, unassociated branches and coordinated version union                            | Refresh before publication, recheck after integration, migration order and fresh manifest version preserving intended keys.                                     |
| Coverage        | Direct: exact CI command, measured suite and threshold                                                      | Behavioral in-memory tests in the measured suite; command, percentage, unchanged threshold and environment.                                                     |

For every case the candidate accepted the supplied safe control without requiring an always-rejecting
path, fabricated historical object, broader permission, arbitrary deletion or disabled cache.
The coverage paragraph was restored to the base wording during evaluation to avoid duplicating an
already covered recurrence. The candidate reader then reread the final TDD file, recorded its new
fingerprint and confirmed all decisions unchanged; the other inputs stayed identical.
After independent source review, the immutability paragraphs were qualified to require only purge,
erasure or reset paths required or permitted by the established contract. The candidate reader
reread both paragraphs and confirmed case 3 unchanged; it also accepted absence of those paths
when the established retention contract permits none, without claiming erasure compatibility.
The final fingerprints below include both follow-ups; no other guidance or scenario changed.

## Input binding and environment

SHA-256 identifies text, not software execution. Paths below are relative to `skills/`.

| Guidance                                     | Base SHA-256                                                       | Candidate SHA-256                                                  |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `tdd/SKILL.md`                               | `c87f6fb47785e6cf76840a51037d02f093bcb031b1b775c387801fe54046c1b0` | `3b2eb0e83673649c539af3e027f7f98548328aa75e08b3325caa2f5b5e8d2896` |
| `tdd/references/tests.md`                    | `23a721e0caeb04927cfdc6af4dc068e5ae910cec07392957aba59356884f1ed4` | `9b711e288a89acf08d26b46ed948231fca4980cc4719504e9364800e6f6ac61b` |
| `implement/SKILL.md`                         | `85d7f67939185f1c924f68f03a60b87b19c3194e66777fd668fad25d3df5408b` | `9a059edaab3933054caf1f4f806f702aa815373d5c9bfdf3d27a7d92d6afb60c` |
| `codebase-design/SKILL.md`                   | `139bc13e27884760a500ebf571783d45192b17fd94455a2444f66f9086822b91` | `794791581cbd4afdd355a217060b7c5d83a899606fe45ee290588fd297f3045d` |
| `codebase-design/references/dependencies.md` | `182e9b80b140f305a1ebde681e665d52fc139610e0648ab52b55a3c8015918d2` | `109567cf9ddee325bdca4527765d7a4b617438a8443adb39f6b3cb2e8aba5ec1` |
| `code-enforcement/SKILL.md`                  | `9233bf8544c01e08b84be733bf3a5eb37a83bb788d066bbc13a3777daab64ed9` | `c0d29945d40675345c70b283e7540cbb43374eab5813e2c0a5ccefcdde4a50e6` |
| `pr-verdict/references/failure-classes.md`   | `e2532a5d59a9a0bb0e1efe30f6191693a8b7e5e91bf766cc57276a994d471455` | `ece41fb00ccd15f92b1b542a8897d78c66c04b92a96a6a5d37f55f38dbc2ac23` |

Scenario SHA-256: `85b6cb4af35dd93cb3b9575e76875cb85dde7a48b6b0b929cd24b155c603e088`.
Readers used shell file reads, `git show` for the base, SHA-256 and environment inspection;
they did not edit the candidate or execute the fictional systems. Observed host: macOS ARM64
(`Darwin`; candidate reader observed kernel `27.0.0`), supplied shell `zsh`. Exact served model,
backend build and sampling settings were not exposed. Each wording received one assessment only.

Repository checks ran separately on macOS ARM64 with Bun `1.4.4`:
`bun install --frozen-lockfile --ignore-scripts`, `bun test` (15 passed), `bun run typecheck`,
`bun run format:check`, `bun pm pack --dry-run` and `git diff --cached --check` exited zero.
Two index generations were byte-identical and unchanged.
The tests exercise the existing output hook, not these new instructions. The README requests Bun
`1.4.3`; that exact version, Linux and activation in Claude Code, Codex and Cursor were not exercised.
`skills-ref` was absent, so standard-tool validation was unavailable; local structural review is
separate. The comparison supports a source-guidance change only, not installed-harness qualification
or the mini-repository acceptance evaluations described by the originating lessons.
