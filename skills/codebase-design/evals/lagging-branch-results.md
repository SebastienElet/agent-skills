# Lagging branch: evaluation status

## Observed result

Without/with-instruction comparison **not run in a real session**. No fresh base or candidate
context was launched for this evaluation; no mini-repository was built or executed. No base failure,
candidate success, negative control or activation rate is observed. The criterion "fails without
the instruction and passes with it" remains unproven.

Target integration, adopted conventions, link-table identifier, full local checks and sequential identifiers: these behaviors are specified in the scenario, not observed.

The author checked the additions against the existing rules and the supplied text of the
lesson. This inspection does not demonstrate a change in agent behavior. The repository checks
cover the format, the existing executable tools and skill health, not this fixture. A possible
independent review of the diff does not replace the session comparison.

## Input binding

Local base `origin/main`: `74ef100ae8111a52e057c0939fee599daaa4401b`. The candidate is bound to the final
bytes by SHA-256, without claiming their execution. Paths relative to `skills/`.

| Input                                        | Base SHA-256                                                       | Candidate SHA-256                                                  |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `codebase-design/SKILL.md`                   | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` |
| `codebase-design/references/dependencies.md` | `fffafb54eb29f240b2cd869c98d3e8089fb413055e4ef292eba394579e3305be` | `f3b5378c8896a9427291f591b55463c9880300361fdb08179b0981c40a97f0f8` |
| `codebase-design/evals/lagging-branch.md`    | New scenario identical for both sessions                           | `9f25e43926d8918be418a268a4474da18975476ee773635dfb6c0cb40d95525e` |

The fingerprints cover the instructions and the scenario. No executable fixture exists yet; its
fingerprint and those of the experimental trees must be kept at launch, with the commands,
outputs and observations planned by the scenario. The planned comparison is blind: neutral
labels, one judge for both variants, skill loading reported apart from procedure application.

## Environment and limits

Authoring: Claude Code, model `claude-sonnet-5-5` as declared by the session; sampling parameters
unavailable. Local commands on macOS ARM64 (`Darwin arm64`), zsh, Bun 1.4.4, Arnes 0.0.3.
No judge model or scenario environment was used. CI Linux x64 glibc, Bun 1.4.3 and activation in
Claude Code, Codex or Cursor not exercised by this case. The fictional facts are no proof of
operation on a real service.
