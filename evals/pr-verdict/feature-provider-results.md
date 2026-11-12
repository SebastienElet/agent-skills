# Feature provider: evaluation status

## Observed result

Without/with-instruction comparison **not run in a real session**. No fresh base or candidate
context was launched for this exercise; no mini-repository was built or executed. No base failure,
candidate success, negative control or activation rate is observed. The criterion "fails without
the instruction and passes with it" remains unproven.

Shipped provider, opening without simulation and production closure planned by the contract:
specified behaviors, not observed.

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
| `pr-verdict/SKILL.md`                        | `66cf12ef59ef8db36960621afa602af115933e0cf8c1ff597c0419da7032f097` | `66cf12ef59ef8db36960621afa602af115933e0cf8c1ff597c0419da7032f097` |
| `pr-verdict/references/behavior-evidence.md` | `fbaeb2066dbac1123476d9cd8b61d1dffeeb9d9747e9164a60368411f55d21fa` | `cf529600897a5d2875625b041af7998545ad3ed8ffb12b5b765b8b1b970fe659` |
| `pr-verdict/evals/feature-provider.md`       | Current scenario identical for both sessions                       | `13a5f43a6cccd613e39961f0e43defd923695d9e55d383297d371c0088c7d472` |

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
