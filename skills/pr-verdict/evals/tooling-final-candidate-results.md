# Tooling delivery: evaluation status

## Observed status

Comparison **not run**. No fresh base or candidate agent session was launched. The fictional
registry, dead-code audit, CI runs, PR split and parallel identifier allocations were not operated
or independently assessed. There are no observed base failures, candidate passes or activation
results. The criterion "fails without the instruction and passes with it" is unproven.

Author inspection found existing identifier checks in class 3 and evidence-reuse rules in
`behavior-evidence.md`; those were retained rather than replaced with a demand to rerun everything.
The candidate adds tooling reconciliation and independent production-fix scope. Source inspection
and repository gates cannot establish that agents now make different or correct delivery decisions.

## Input binding

Base revision: `02b071fe0e282374037b8b63e0e29e739e9d9f4a`. Candidate fingerprints bind final
file bytes; they identify inputs, not execution. Paths are relative to `skills/`.

| Input                                         | Base SHA-256                                                       | Candidate SHA-256                                                  |
| --------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `implement/SKILL.md`                          | `57e5b502c913cf031a08fed7b266cd16f338a8dc3652945a5d5e349873048f69` | `8c6cf63cb9a4241353e14f0a6ae0d0876f7463c7905e775793a08ed48f490d27` |
| `pr-verdict/references/failure-classes.md`    | `d3865bf0e550278891697460f4ec19fb00e1a788f078c012e05688aaf6e416c0` | `1ff96008e4622ba1fdf45fde9ab6e3521cf23e44e7d4a8ec68694e6f0179157a` |
| `pr-verdict/references/behavior-evidence.md`  | `aa87536b2c37629e6df45f9357eaa902b12ba5f7a9e74baa4701a1dc5435b5e1` | `fbaeb2066dbac1123476d9cd8b61d1dffeeb9d9747e9164a60368411f55d21fa` |
| `pr-verdict/evals/tooling-final-candidate.md` | New identical scenario for both arms                               | `ad3792b2749a5029d95d62478c2d570db7883062e8f5097c51018211cd83b80a` |

## Environment and limits

Authoring environment: Codex, GPT-6; exact served build and sampling settings unavailable.
Shell tools ran on macOS ARM64, with zsh and Bun 1.4.4. No evaluator model/session exists.
No live forge or tracker was mutated. Bun 1.4.3, Linux CI and activation in Claude Code, Codex or
Cursor were not qualified by this scenario. The paired scenario specifies the future comparison
and permitted controls; a supplied CI fact must never be reported as an observed execution.
