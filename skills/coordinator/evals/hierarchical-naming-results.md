# Hierarchical naming keeps coordinator work traceable: evaluation status

## Observed status

Without/with-instruction comparison **not run in a real session**. No fresh comparison sessions,
Herdr layout or judge were launched. Base failure, candidate success and activation remain
unobserved; the behavioral gain is unproven. Source inspection and repository checks cover
authoring and existing tooling, not case Q of `contract-scenarios.md`.

## Input binding

Base `origin/main`: `7e1675e0cc0e5f5c12681b0a3846114e45214f59`. SHA-256 binds final instruction and scenario bytes, without implying
execution. Paths are relative to `skills/`.

| Input                                     | Base SHA-256                                                       | Candidate SHA-256                                                  |
| ----------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `coordinator/SKILL.md`                    | `26468db70495a0a0dc021ffb74bf06465c85a06542473291e4eb8f73186f167b` | `48362a0bdc2172c0bcc4e572ac23d492e461de842ed18551d8a53d6507dd5ec6` |
| `coordinator/references/naming.md`        | Absent from base                                                   | `63885b2ab320743d84c9ec7b0ee192cfae5a87c58b1db6058547d157f9ddb362` |
| `coordinator/evals/contract-scenarios.md` | `fcbf6e3a783520e2cd76d41252903a54a2e9f7f8dc9867b25d89f3ba7dcda4b6` | `920e1a1f86b6870209ff46751a146d4103af4fe11d4e1bf28e59dbdbee8a5af8` |

## Environment and limits

Authoring: Claude Code; exact served build and sampling parameters unavailable. Local checks use
macOS ARM64, zsh and Bun 1.4.4. Linux CI, other architectures, activation in Codex or Cursor and
real Herdr name validation are not exercised. No network or real data used.
