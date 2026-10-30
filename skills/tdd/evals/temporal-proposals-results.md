# Dates and proposals: evaluation status

## Observed result

Without/with-instruction comparison **not run in a real session**. No fresh base or candidate
context was launched for this evaluation; no mini-repository was built or executed. No base failure,
candidate success, negative control or activation rate is observed. The criterion "fails without
the instruction and passes with it" remains unproven.

Late export, boundary days, validated proposal and canonical country table: these behaviors are
specified in the scenario, not observed.

The author checked the additions against the existing rules and the supplied text of the
lessons. This inspection does not demonstrate a change in agent behavior. The repository checks
cover the format, the existing executable tools and skill health, not this fixture. A possible
independent review of the diff does not replace the session comparison.

## Input binding

Local base `origin/main`: `3262df60b7b9b01537494f2c74db65cf85b7b79a`. The candidate is bound to the final
bytes by SHA-256, without claiming their execution. Paths relative to `skills/`.

| Input                                        | Base SHA-256                                                       | Candidate SHA-256                                                  |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `tdd/SKILL.md`                               | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` |
| `tdd/references/tests.md`                    | `984bfa4bd1fdaeaa296cc509a786d012d404668e71495c00a51a8ec12369996c` | `494dd7ca2ae52a6b68a8941f3f8869f509cab92aaa196b533a3703c46e1710a4` |
| `tdd/references/dependencies.md`             | `6db8ae3de4c3b6f2ec8e2e03ed8f3417207987b6a3b75c7d7f0c8420b51c7f8e` | `c0b8dba2bb9886c054c5c6e4e5e0546f9c0e46da9e5018e5918081c53843a804` |
| `codebase-design/SKILL.md`                   | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` |
| `codebase-design/references/dependencies.md` | `80762ed9777d428e0d439ce6659cea961b3f83ef553dbfd734439d9549f2d608` | `fffafb54eb29f240b2cd869c98d3e8089fb413055e4ef292eba394579e3305be` |
| `tdd/evals/temporal-proposals.md`            | New scenario identical for both sessions                           | `15bfbe961886e1e36b34497d796618874cfb85c70216f06296b2ce9ac8c0c3f6` |

The fingerprints cover the instructions and the scenario. No executable fixture exists yet; its
fingerprint and those of the experimental trees must be kept at launch, with the commands,
outputs and observations planned by the scenario.

The candidate fingerprints are updated for the enriched references; the previous version remains
in the earlier commit. No new session or observation is added.

## Environment and limits

Authoring: Codex; exact served model version and sampling parameters unavailable.
Local commands on macOS ARM64 (`Darwin arm64`), zsh, Bun 1.4.4, Arnes 0.0.3.
No judge model or scenario SQL environment was used. CI Linux x64 glibc, Bun 1.4.3 and activation
in Claude Code, Codex or Cursor not exercised by this case. The fictional facts are no proof of
operation on a real service.
