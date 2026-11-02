# Deletion path: evaluation status

## Observed result

Without/with-instruction comparison **not run in a real session**. No fresh base or candidate
context was launched for this evaluation; no mini-repository was built or executed. No base failure,
candidate success, negative control or activation rate is observed. The criterion "fails without
the instruction and passes with it" remains unproven.

Purge of an immutable table, catalog guard and role-based bypass authority: these behaviors are specified in the scenario, not observed.

The author checked the additions against the existing rules and the supplied text of the
lesson. This inspection does not demonstrate a change in agent behavior. The repository checks
cover the format, the existing executable tools and skill health, not this fixture. A possible
independent review of the diff does not replace the session comparison.

## Input binding

Local base `origin/main`: `74ef100ae8111a52e057c0939fee599daaa4401b`. The candidate is bound to the final
bytes by SHA-256, without claiming their execution. Paths relative to `skills/`.

| Input                                                   | Base SHA-256                                                       | Candidate SHA-256                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `postgresql-engineering/SKILL.md`                       | `1fec10cb5ae53d4f16b93cca313cf749927437ced0b81e14d4d2c27bcce02570` | `1fec10cb5ae53d4f16b93cca313cf749927437ced0b81e14d4d2c27bcce02570` |
| `postgresql-engineering/references/schema-integrity.md` | `9fc04ee56a1a489e60e0e0ef2172aafd32403515e7454ea0d20ced0703c2bfae` | `a518aa553d7212f22100b19cffebb0140dc69b8963e707033b5c6492d97715ad` |
| `postgresql-engineering/evals/deletion-path.md`         | New scenario identical for both sessions                           | `e33151e5a4ac33e05028f4f2555335f35ab5f21f6e93b3fdcb712099a6071747` |

The fingerprints cover the instructions and the scenario. No executable fixture exists yet; its
fingerprint and those of the experimental trees must be kept at launch, with the commands,
outputs and observations planned by the scenario. The planned comparison is blind: neutral
labels, one judge for both variants, skill loading reported apart from procedure application.

## Environment and limits

Authoring: Claude Code, model `claude-sonnet-5-5` as declared by the session; sampling parameters
unavailable. Local commands on macOS ARM64 (`Darwin arm64`), zsh, Bun 1.4.4, Arnes 0.0.3.
No judge model or scenario environment was used. CI Linux x64 glibc, Bun 1.4.3 and activation in
Claude Code, Codex or Cursor not exercised by this case. The fictional facts are no proof of
operation on a real service.
