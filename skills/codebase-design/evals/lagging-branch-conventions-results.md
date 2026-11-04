# Lagging branches adopt the integrated target conventions: evaluation status

## Observed status

Without/with-instruction comparison **not run in a real session**. No fresh comparison sessions,
executable fixture or judge were launched. Base failure, candidate success, negative controls and
activation remain unobserved; the required behavioral gain is unproven. Source inspection and
repository checks cover authoring and existing tooling, not this scenario's behavior.

## Input binding

Local base `origin/main`: `9c04c11142c0cd498a051cb8dd5316bae8b25803`. SHA-256 binds final
instruction and scenario bytes, without implying execution. Paths are relative to `skills/`.
Use the same scenario for both arms; retain the executable fixture fingerprint at any future launch.

| Input                                                 | Base SHA-256                                                       | Candidate SHA-256                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `implement/SKILL.md`                                  | `37e34765c2bdc6b460b44e8d781214cd11a6ec42d4b85c131bcc1a511f7bae3b` | `37e34765c2bdc6b460b44e8d781214cd11a6ec42d4b85c131bcc1a511f7bae3b` |
| `pr-verdict/references/failure-classes.md`            | `b247240ca2c8c49a7c166e78463a834813c54dd9ea612ab4d8ec22d18963dcd3` | `277690b2fce9b005d0b02d87aedc8a9c15078fae2ff9ba24ffbdb0c24167df67` |
| `codebase-design/evals/lagging-branch-conventions.md` | Identical new scenario for both arms                               | `d8c2ababe45063c6c0f610f673f09edad7b14c11152034308e980b580dfb6b6d` |

## Environment and limits

Authoring: Codex; exact served build and sampling parameters unavailable. Local checks use macOS
ARM64, zsh and Bun 1.4.4. Linux CI with Bun 1.4.3 and Node 24, other architectures and activation
in Claude Code, Codex or Cursor are not exercised by this scenario. No network or real data used.
