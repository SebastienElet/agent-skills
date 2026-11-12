# Parallel append-only relations preserve the authorized purge: evaluation status

## Observed status

Without/with-instruction comparison **not run in a real session**. No fresh comparison sessions,
executable fixture or judge were launched. Base failure, candidate success, negative controls and
activation remain unobserved; the required behavioral gain is unproven. Source inspection and
repository checks cover authoring and existing tooling, not this scenario's behavior.

## Input binding

Local base `origin/main`: `9c04c11142c0cd498a051cb8dd5316bae8b25803`. SHA-256 binds final
instruction and scenario bytes, without implying execution. Paths are relative to `skills/`.
Use the same scenario for both arms; retain the executable fixture fingerprint at any future launch.

| Input                                                    | Base SHA-256                                                       | Candidate SHA-256                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `postgresql-engineering/SKILL.md`                        | `1fec10cb5ae53d4f16b93cca313cf749927437ced0b81e14d4d2c27bcce02570` | `1fec10cb5ae53d4f16b93cca313cf749927437ced0b81e14d4d2c27bcce02570` |
| `postgresql-engineering/references/schema-integrity.md`  | `f7ccd80dd8203d84bbca6c91da1dd9e04b094577e70b3f1ad9eec567f0f5cd5a` | `936cd9285dc439d3f4028a9d27937da607ac6a4c5208835f6be80e9f2deea65a` |
| `postgresql-engineering/evals/deletion-path-parallel.md` | Identical new scenario for both arms                               | `f877c31f7922d0fa5907e2986ee18dc7a93f114c0e295fccd64cdb739f3c3145` |

## Environment and limits

Authoring: Codex; exact served build and sampling parameters unavailable. Local checks use macOS
ARM64, zsh and Bun 1.4.4. Linux CI with Bun 1.4.3 and Node 24, other architectures and activation
in Claude Code, Codex or Cursor are not exercised by this scenario. No network or real data used.
