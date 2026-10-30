# Neighbor guards: evaluation status

## Observed result

Without/with-instruction comparison **not run in a real session**. No fresh base or candidate
context was launched for this evaluation; no mini-repository was built or executed. No base failure,
candidate success, negative control or activation rate is observed. The criterion "fails without
the instruction and passes with it" remains unproven.

Owner permission, personal references, raw SQL immutability and bounded concurrency: these behaviors
are specified in the scenario, not observed.

The author checked the additions against the existing rules and the supplied text of the
lessons. This inspection does not demonstrate a change in agent behavior. The repository checks
cover the format, the existing executable tools and skill health, not this fixture. A possible
independent review of the diff does not replace the session comparison.

## Input binding

Local base `origin/main`: `3262df60b7b9b01537494f2c74db65cf85b7b79a`. The candidate is bound to the final
bytes by SHA-256, without claiming their execution. Paths relative to `skills/`.

| Input                                        | Base SHA-256                                                       | Candidate SHA-256                                                  |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `codebase-design/SKILL.md`                   | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` |
| `codebase-design/references/dependencies.md` | `80762ed9777d428e0d439ce6659cea961b3f83ef553dbfd734439d9549f2d608` | `fffafb54eb29f240b2cd869c98d3e8089fb413055e4ef292eba394579e3305be` |
| `codebase-design/evals/neighbor-guards.md`   | New scenario identical for both sessions                           | `2e8e9ebf31fd7180eb9a944e93804ca041f2c453fc289d7526e689cbd6a0bd28` |

The fingerprints cover the instructions and the scenario. No executable fixture exists yet; its
fingerprint and those of the experimental trees must be kept at launch, with the commands,
outputs and observations planned by the scenario.

The candidate fingerprints are updated for the enriched references; the previous version remains
in the earlier commit. No new session or observation is added.

## Environment and limits

Authoring: Codex; exact served model version and sampling parameters unavailable.
Local commands on macOS ARM64 (`Darwin arm64`), zsh, Bun 1.4.4, Arnes 0.0.3.
No judge model or scenario SQL environment was used. CI Linux x64 glibc, Bun 1.4.3 and activation
in Claude Code, Codex or Cursor not exercised by this case. The fictional facts are no proof of
operation on a real service.
