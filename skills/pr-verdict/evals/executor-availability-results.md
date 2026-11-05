# Executor fingerprints observe assertion prerequisites: evaluation status

## Observed status

Without/with-instruction comparison **not run in a real session**. No fresh comparison sessions,
executable mini-repository or blind judge were launched. Base failure, candidate success, negative
witnesses, safe controls and activation remain unobserved. The criterion "fails without the
instruction and passes with it" is unproven. Repository checks validate authored material and
existing tooling, not this scenario's behavior.

Lesson source: [SebastienElet/dotfiles#726](https://github.com/SebastienElet/dotfiles/issues/726).

## Input binding

Local base revision: `28af4565fb28c24629d2f1880080713ffdb941d9`. SHA-256 fingerprints bind final authored
bytes, not execution. Paths are relative to `skills/`. The new scenario is identical for both
future comparison arms; retain the materialized fixture digest separately at launch. Existing
historical evaluation records are unchanged and do not certify these additions.

| Input                                       | Base SHA-256                                                       | Authored candidate SHA-256                                         |
| ------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `codebase-design/SKILL.md`                  | `727846763db60fe81482d5c1775c820973b0d1f18719077943fb0c0e7037c17c` | `727846763db60fe81482d5c1775c820973b0d1f18719077943fb0c0e7037c17c` |
| `codebase-design/references/controls.md`    | `3332cd53937692b0b2bc558dd83f36ce4745d03a9210fa7723476ed011fd62a6` | `8fe4bd2f148f71ff06d74ea4f27ac12101af2b84ca5a20057ba7f29f7a78ed62` |
| `pr-verdict/SKILL.md`                       | `5afaf5e52c06974a86e2cef915d86d9a44395cf2a5bca8e2058f655c4831be96` | `5afaf5e52c06974a86e2cef915d86d9a44395cf2a5bca8e2058f655c4831be96` |
| `pr-verdict/references/failure-classes.md`  | `277690b2fce9b005d0b02d87aedc8a9c15078fae2ff9ba24ffbdb0c24167df67` | `53be61514ca7f107db80ee2bd11bb9d0b954fcc658182a6b47d164cf0c8a123c` |
| `pr-verdict/evals/executor-availability.md` | Identical new scenario for both arms                               | `cdb7ab73c3f8bc37eb8b3667a0dbf3e29c18f3e12ca62eddeea0aa486ccb8d30` |

## Environment and limits

Authoring environment: Codex, macOS ARM64, zsh and Bun 1.4.4; exact served model build and sampling
settings unavailable. No memory-reader fixture, emulated executor, benchmark assertion or cache replay was executed.
Linux CI with Bun 1.4.3, other architectures and activation in Claude Code, Codex or Cursor were
not exercised by this scenario. No actual evaluator outcome is claimed.
