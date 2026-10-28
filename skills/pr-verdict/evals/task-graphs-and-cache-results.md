# Task graphs and cache: evaluation status

## Observed status

Comparison **not run**. No fresh base or candidate agent session was launched. No `shop-monorepo`
fixture, scheduler, hashed-input probe, empty-plan refusal, receipt or Git fallback was executed.
There are no observed base failures, candidate passes or activation results. The criterion
"fails without the instruction and passes with it" is unproven.

Source inspection located the guidance in shared classes 1, 14, 19 and 21, consumed through the
existing implementation routing. This is author inspection, not an independent review. Repository
checks do not execute the fictional runner or prove ordering, cache invalidation or shell refusal.

## Input binding

Base revision: `02b071fe0e282374037b8b63e0e29e739e9d9f4a`. Candidate fingerprints bind final
file bytes; they identify inputs, not execution. Paths are relative to `skills/`.

| Input                                       | Base SHA-256                                                       | Candidate SHA-256                                                  |
| ------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `implement/SKILL.md`                        | `57e5b502c913cf031a08fed7b266cd16f338a8dc3652945a5d5e349873048f69` | `8c6cf63cb9a4241353e14f0a6ae0d0876f7463c7905e775793a08ed48f490d27` |
| `pr-verdict/references/failure-classes.md`  | `d3865bf0e550278891697460f4ec19fb00e1a788f078c012e05688aaf6e416c0` | `1ff96008e4622ba1fdf45fde9ab6e3521cf23e44e7d4a8ec68694e6f0179157a` |
| `pr-verdict/evals/task-graphs-and-cache.md` | New identical scenario for both arms                               | `36826d98be0e58cb6411b2a8d8deaee07d7ca2ea4806ea7940d5a8336ec9cbfb` |

## Environment and limits

Authoring environment: Codex, GPT-6; exact served build and sampling settings unavailable.
Shell tools ran on macOS ARM64, with zsh and Bun 1.4.4. No evaluator model/session exists.
The fictional runner has no qualified real CLI or pinned runtime yet. Bun 1.4.3, Linux CI and
activation in Claude Code, Codex or Cursor were not exercised by this scenario. A future comparison
must prepare identical fixtures and retain the observations required by the paired protocol.
