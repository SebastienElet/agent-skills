# Server refusals remain understandable on screen: evaluation status

## Observed status

Without/with-instruction comparison **not run in a real session**. No fresh comparison sessions,
executable fixture or judge were launched. Base failure, candidate success, negative controls and
activation remain unobserved; the required behavioral gain is unproven. Source inspection and
repository checks cover authoring and existing tooling, not this scenario's behavior.

## Input binding

Local base `origin/main`: `9c04c11142c0cd498a051cb8dd5316bae8b25803`. SHA-256 binds final
instruction and scenario bytes, without implying execution. Paths are relative to `skills/`.
Use the same scenario for both arms; retain the executable fixture fingerprint at any future launch.

| Input                                              | Base SHA-256                                                       | Candidate SHA-256                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `codebase-design/SKILL.md`                         | `727846763db60fe81482d5c1775c820973b0d1f18719077943fb0c0e7037c17c` | `727846763db60fe81482d5c1775c820973b0d1f18719077943fb0c0e7037c17c` |
| `codebase-design/references/dependencies.md`       | `4725aba24714d93099b5b17ef26c15d733ec1a936f4127d6762a4a5f398a24be` | `2832be7b0ed791bf4cd632aa7e5725ebb6e7a248e6582d66b61c20a2aec4915f` |
| `codebase-design/evals/refusal-verdict-screens.md` | Identical new scenario for both arms                               | `f28b7191c1a845db1a92a3240d4e233a6148c091ce0674579484b1ced431a272` |

## Environment and limits

Authoring: Codex; exact served build and sampling parameters unavailable. Local checks use macOS
ARM64, zsh and Bun 1.4.4. Linux CI with Bun 1.4.3 and Node 24, other architectures and activation
in Claude Code, Codex or Cursor are not exercised by this scenario. No network or real data used.
