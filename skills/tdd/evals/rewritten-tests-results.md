# Rewritten tests: evaluation status

## Observed status

Comparison **not run**. No fresh base or candidate agent session was launched. No `shop-api`
fixture was built or executed; command plans, worker shutdown, error translation and targeted
mutations remain unexercised. There are no observed base failures, candidate passes or activation
results. The criterion "fails without the instruction and passes with it" is unproven.

The author inspected the source guidance and scenario for coverage of the requested lesson.
That inspection is not independent review or behavior validation. Repository checks exercise
formatting, existing executable tooling and package distribution, not this scenario's behavior.

## Input binding

Base revision: `02b071fe0e282374037b8b63e0e29e739e9d9f4a`. Candidate fingerprints bind final
file bytes; they identify inputs, not execution. Paths are relative to `skills/`.

| Input                            | Base SHA-256                                                       | Candidate SHA-256                                                  |
| -------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `tdd/SKILL.md`                   | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` |
| `tdd/references/tests.md`        | `bfe13d847bce3755201f47564d1b2adeb9d61cbb9ec18e40c1ad86895df7e579` | `984bfa4bd1fdaeaa296cc509a786d012d404668e71495c00a51a8ec12369996c` |
| `tdd/references/dependencies.md` | `6db8ae3de4c3b6f2ec8e2e03ed8f3417207987b6a3b75c7d7f0c8420b51c7f8e` | `6db8ae3de4c3b6f2ec8e2e03ed8f3417207987b6a3b75c7d7f0c8420b51c7f8e` |
| `tdd/evals/rewritten-tests.md`   | New identical scenario for both arms                               | `9903517e65ec68b6a586793950ab6be86f4f69b69a63e76193488ccf907a5413` |

## Environment and limits

Authoring environment: Codex, GPT-6; exact served build and sampling settings unavailable.
Shell tools ran on macOS ARM64, with zsh and Bun 1.4.4. No evaluator model/session exists.
Bun 1.4.3, Linux CI and activation in Claude Code, Codex or Cursor were not qualified by this
scenario. The paired scenario fixes the future comparison protocol and safe controls; pending
outcomes must remain pending until actual evidence is retained.
