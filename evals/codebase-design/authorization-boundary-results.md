# Authorization survives removal of a blanket grant: evaluation status

## Observed status

Without/with-instruction comparison **not run in a real session**. No fresh comparison sessions,
executable fixture or judge were launched. Base failure, candidate success, negative controls and
activation remain unobserved; the required behavioral gain is unproven. Source inspection and
repository checks cover authoring and existing tooling, not this scenario's behavior.

## Input binding

Local base `origin/main`: `9c04c11142c0cd498a051cb8dd5316bae8b25803`. SHA-256 binds final
instruction and scenario bytes, without implying execution. Paths are relative to `skills/`.
Use the same scenario for both arms; retain the executable fixture fingerprint at any future launch.

| Input                                             | Base SHA-256                                                       | Candidate SHA-256                                                  |
| ------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `codebase-design/SKILL.md`                        | `727846763db60fe81482d5c1775c820973b0d1f18719077943fb0c0e7037c17c` | `727846763db60fe81482d5c1775c820973b0d1f18719077943fb0c0e7037c17c` |
| `codebase-design/references/controls.md`          | `25dbf62f564aa771c508c2735b4585816a3d7f1e576bcbce2f92bf1221b96282` | `3332cd53937692b0b2bc558dd83f36ce4745d03a9210fa7723476ed011fd62a6` |
| `codebase-design/evals/authorization-boundary.md` | Identical new scenario for both arms                               | `57e8b602d0caa7d7ca242376f49e214ed25d9cf2d9eebc92b68f476d4f8fa0d6` |

## Environment and limits

Authoring: Codex; exact served build and sampling parameters unavailable. Local checks use macOS
ARM64, zsh and Bun 1.4.4. Linux CI with Bun 1.4.3 and Node 24, other architectures and activation
in Claude Code, Codex or Cursor are not exercised by this scenario. No network or real data used.
