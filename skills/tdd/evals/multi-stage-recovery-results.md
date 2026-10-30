# Multi-step operations and replayed creation: evaluation status

## Observed result

Without/with-instruction comparison **not run in a real session**. No fresh base or candidate
context was launched for this exercise; no mini-repository was built or executed. No base failure,
candidate success, negative control or activation rate is observed. The criterion "fails without
the instruction and passes with it" remains unproven.

Reservation, recovery, business aggregates, original response, interruption and canonical hash:
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
| `tdd/SKILL.md`                               | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` |
| `tdd/references/tests.md`                    | `4ce57b83deeb0b9f7c47aa7bd81ef17ab3f9e8251f3c62f72846ab7d391d2099` | `494dd7ca2ae52a6b68a8941f3f8869f509cab92aaa196b533a3703c46e1710a4` |
| `tdd/references/dependencies.md`             | `dcaa2beb1aa80fe591dc12f52d3c415831a012708bbff4a088c7bdb55d91c3f4` | `c0b8dba2bb9886c054c5c6e4e5e0546f9c0e46da9e5018e5918081c53843a804` |
| `codebase-design/SKILL.md`                   | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` |
| `codebase-design/references/dependencies.md` | `9bdf9fdb36df7102896c3d9baa1d13b80e9052cd0fb4f04e063cb797c1d4894d` | `fffafb54eb29f240b2cd869c98d3e8089fb413055e4ef292eba394579e3305be` |
| `tdd/evals/multi-stage-recovery.md`          | Current scenario identical for both sessions                       | `f7705bcfcb70de5654af48efc1361ba2f0e625d7544690f92fd7e6237ca4c429` |

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
