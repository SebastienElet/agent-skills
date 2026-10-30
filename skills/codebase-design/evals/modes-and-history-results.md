# Modes and history: evaluation status

## Observed result

Without/with-instruction comparison **not run in a real session**. No fresh base or candidate
context was launched for this exercise; no mini-repository was built or executed. No base failure,
candidate success, negative control or activation rate is observed. The criterion "fails without
the instruction and passes with it" remains unproven.

Per-mode constraints, rows frozen at issue, human priority and explicit commitments: specified
behaviors, not observed.

The author checked the additions against the supplied text and the existing rules. This
inspection does not demonstrate a change in agent behavior. The repository checks exercise the
format, the existing executable tools and skill health, not the behaviors of the mini-repository.
An independent static review does not replace a comparison in a session.

## Input binding

Local base before enrichment: `90acc586ed50f76b18b93e60ea28796d9be62ca0`. The candidate is bound to the
situations described by the final bytes of the instructions and the scenario, without proof of
execution. Paths relative to `skills/`; the modified instruction references, or those needed for
the comparison, are below. Also keep the other references actually loaded when a session is
launched, which does not exist yet.

| Input                                        | Base SHA-256                                                       | Candidate SHA-256                                                  |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `codebase-design/SKILL.md`                   | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` |
| `codebase-design/references/dependencies.md` | `9bdf9fdb36df7102896c3d9baa1d13b80e9052cd0fb4f04e063cb797c1d4894d` | `fffafb54eb29f240b2cd869c98d3e8089fb413055e4ef292eba394579e3305be` |
| `implement/SKILL.md`                         | `8c6cf63cb9a4241353e14f0a6ae0d0876f7463c7905e775793a08ed48f490d27` | `8c6cf63cb9a4241353e14f0a6ae0d0876f7463c7905e775793a08ed48f490d27` |
| `pr-verdict/references/failure-classes.md`   | `8e7ef13a6d8b841e4e77fe924bf3bd61735ae86ed7c813d3bfb4d7d74dc89ebf` | `442364480b447c28fc20992914a9d143e557d5dba0ca4d4ad640d8615169407b` |
| `codebase-design/evals/modes-and-history.md` | Current scenario identical for both sessions                       | `1ed7ca83b4cb5ec3cecc79f749690933eaa78af2154b7e3bb302526625781136` |

The same current scenario must be given to both sessions, even when it enriches a case already
present at the base. The fingerprints of the older versions remain available in that earlier
commit; no execution observation is replaced there. No executable fixture exists yet: keep its
fingerprint and those of the experimental trees at launch, along with the commands, outputs and
observations required by the protocol.

## Environment and limits

Authoring: Codex; exact served model version and sampling parameters unavailable.
Local commands: macOS ARM64 (`Darwin arm64`), zsh, Bun 1.4.4, Arnes 0.0.3.
No judge model or scenario SQL environment used. CI Linux, Bun 1.4.3 and activation in Claude
Code, Codex or Cursor not exercised by this case. No network access or real service; the
fictional observations are not proof of an external operation.
