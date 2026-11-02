# Screens and time windows: evaluation status

## Observed result

Without/with-instruction comparison **not run in a real session**. No fresh base or candidate
context was launched for this evaluation; no mini-repository was built or executed. No base failure,
candidate success, negative control or activation rate is observed. The criterion "fails without
the instruction and passes with it" remains unproven.

Window bounds, rank after removal, shared business state and context reset: these behaviors are specified in the scenario, not observed.

The author checked the additions against the existing rules and the supplied text of the
lesson. This inspection does not demonstrate a change in agent behavior. The repository checks
cover the format, the existing executable tools and skill health, not this fixture. A possible
independent review of the diff does not replace the session comparison.

## Input binding

Local base `origin/main`: `74ef100ae8111a52e057c0939fee599daaa4401b`. The candidate is bound to the final
bytes by SHA-256, without claiming their execution. Paths relative to `skills/`.

| Input                              | Base SHA-256                                                       | Candidate SHA-256                                                  |
| ---------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `tdd/SKILL.md`                     | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` |
| `tdd/references/tests.md`          | `494dd7ca2ae52a6b68a8941f3f8869f509cab92aaa196b533a3703c46e1710a4` | `30cf8fe7952871e62c282f6320457ba62dbc59c2726e3f21d422608cbc2fe32c` |
| `tdd/evals/screens-and-windows.md` | New scenario identical for both sessions                           | `2572ee16bf9bd8b1dc85675aa76bd9fd93f4f9fdc1215a70e6454c8d5a43eb6d` |

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
