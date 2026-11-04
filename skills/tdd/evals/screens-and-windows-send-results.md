# Sending rechecks the actual business window: evaluation status

## Observed status

Without/with-instruction comparison **not run in a real session**. No fresh comparison sessions,
executable fixture or judge were launched. Base failure, candidate success, negative controls and
activation remain unobserved; the required behavioral gain is unproven. Source inspection and
repository checks cover authoring and existing tooling, not this scenario's behavior.

## Input binding

Local base `origin/main`: `9c04c11142c0cd498a051cb8dd5316bae8b25803`. SHA-256 binds final
instruction and scenario bytes, without implying execution. Paths are relative to `skills/`.
Use the same scenario for both arms; retain the executable fixture fingerprint at any future launch.

| Input                                   | Base SHA-256                                                       | Candidate SHA-256                                                  |
| --------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `tdd/SKILL.md`                          | `5db25130df1984419bdec93132044dedfb01140c5bf94cb640c8e60e04e4b2a4` | `5db25130df1984419bdec93132044dedfb01140c5bf94cb640c8e60e04e4b2a4` |
| `tdd/references/tests.md`               | `af84fb485b22c2ce7d62177c20f6f32704011650773ac295e31183c8cd56701c` | `f5be8fe34db99880bd1f3176e742af7e91f0691ed6ab95713637432bc67e277b` |
| `tdd/evals/screens-and-windows-send.md` | Identical new scenario for both arms                               | `3726a19c7df8a1110a5f43253f16ca76cd6b52160d72797a660b07e4ad7b2c9d` |

## Environment and limits

Authoring: Codex; exact served build and sampling parameters unavailable. Local checks use macOS
ARM64, zsh and Bun 1.4.4. Linux CI with Bun 1.4.3 and Node 24, other architectures and activation
in Claude Code, Codex or Cursor are not exercised by this scenario. No network or real data used.
