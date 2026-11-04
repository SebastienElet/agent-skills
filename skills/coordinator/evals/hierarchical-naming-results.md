# Hierarchical naming keeps coordinator work traceable: evaluation status

## Observed status

Without/with-instruction comparison **not run in a real session**. No fresh comparison sessions,
Herdr layout or judge were launched. Base failure, candidate success and activation remain
unobserved; the behavioral gain is unproven. Source inspection and repository checks cover
authoring and existing tooling, not case O of `contract-scenarios.md`.

## Input binding

Local base `HEAD`: `8fd7621bf55180b9c8f8de0304e63ad201b6bcd1`. SHA-256 binds final instruction and scenario bytes, without implying
execution. Paths are relative to `skills/`.

| Input                                     | Base SHA-256                                                       | Candidate SHA-256                                                  |
| ----------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `coordinator/SKILL.md`                    | `d2741713272357cac9c64f62f5e24f55723e24e9dca6a899b123b7e3f01013b7` | `10804ab07688765d79a037b827a66f18cf18fc90b284497ce68055054d024b11` |
| `coordinator/references/naming.md`        | Absent from base                                                   | `eca88799a5b5aa305f3145ae62ac5ac0b9e67ed3452f2d5f4ee00339f363e393` |
| `coordinator/evals/contract-scenarios.md` | `a670f584fdd0bde3e2ac43f45a86f92b7e549121ccc1c5880360fe5b4b136ad8` | `67871175d70d0236d2ed453a2bafa7df8cdebd7e5aa9bb5f04365a5f57fb4fa8` |

## Environment and limits

Authoring: Claude Code; exact served build and sampling parameters unavailable. Local checks use
macOS ARM64, zsh and Bun 1.4.4. Linux CI, other architectures, activation in Codex or Cursor and
real Herdr name validation are not exercised. No network or real data used.
