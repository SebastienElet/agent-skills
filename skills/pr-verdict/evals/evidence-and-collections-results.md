# Evidence and collections: decision observations

Two fresh delegated contexts independently assessed the identical
[scenarios](evidence-and-collections.md) on 2026-10-26. Both used `fork_turns: none`, with no inherited
author conversation or conclusions. The base reader read the seven guidance files below only via
`git show` at `0aa0b8c404dc47537bcb7f445ebc1d875ac67ff3`; the candidate reader read their working-tree
counterparts only. Neither received the other response. The criterion and initial scenario text were fixed
before either assessment. The readers treated guidance as data and did not invoke a live PR workflow.

Both readers identified the supplied violations or essential gaps in all 11 cases and accepted all
11 safe controls, including their permitted exceptions. The base could infer decisions from the
supplied facts where its wording was less specific. The candidate explicitly named those mechanisms,
but this comparison establishes no detection-rate gain, repeatability or recurrence prevention.
No represented application, database, scanner, task runner, timer or UI behavior was executed.

| Case                        | Base specificity reported by its reader                                                                            | Candidate decision and required evidence                                                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Required evidence           | Validity, fail-closed empty results and evidentiary claims explicit; required-kind matrix inferred.                | Enumerated requirements; separate valid, expired, unknown, undated and missing outcomes; saved examined evidence and unverifiable/compliant distinction. Explicit unlimited validity and optional absence remain permitted.                                        |
| Blocking rollout            | Trusted configuration and actual guard execution explicit; complete pushed range and per-PR trial inferred.        | Trusted-target policy, exact-command trial on target plus each relevant PR/draft, independently reviewed fixture exceptions, full range, detailed logs and actual CI-script synthetic-repository refusals/acceptance. No YAML mirror test.                         |
| Independent approval        | Permission discrimination and claimed-layer proof explicit; persisted proposer and actor separation inferred.      | Authorized proposer refused with named `403` and no writes; distinct authorized actor succeeds, missing permission refuses separately; real SQL check and application translation. One eligible actor needs a policy decision.                                     |
| Collection contract         | Atomicity, creation replay and retained identity explicit; body binding, pagination and nullable UI keys inferred. | Real-database concurrent one-row creation, atomic replay and changed-body `422`; documented default/max and above-max behavior, bounded stable cursor traversal to termination; independent UI identity. Explicitly justified absence of replay remains permitted. |
| Narrowed task inputs        | Behavior-changing input coverage, cache inputs and planning/execution distinction explicit; path parity inferred.  | Every runtime read including dynamic configuration; isolated affected dry-runs, cache coverage and matching local/CI paths; a separate execution witness. Planning alone proves no execution.                                                                      |
| Dependency-free CI          | Actual environment and setup-versus-assertion distinction explicit; archive replay inferred.                       | Identify the actual step and prerequisites; reproduce dependency-free import and assertions from an archive. Installed-package resolution remains valid where the step installs it; no unrelated CI parity claim.                                                  |
| Fake-timer teardown         | No retries hiding flakes and complete affected verification explicit; exact teardown/search/random order inferred. | Inspect all matching teardowns, unmount, drain, clear and restore in `finally`; repeat and randomize without retries. Tests without fake timers need no invented cleanup.                                                                                          |
| Domain clock bypass         | Controlled system time and independent calendar cases explicit; exhaustive current-time search inferred.           | Route current-time reads through the adapter and replay controlled dates. Fixed-date construction remains permitted.                                                                                                                                               |
| Reference date and validity | Applicable source, distinct dates, bounds and exceptions explicit; mandated null-expiry refusal inferred.          | Distinct manufacture/approval inputs, source-derived bound and first excess, required or derived expiry. Pending alternatives lack authority; unrelated unlimited rules remain valid.                                                                              |
| Date ordering               | Database ordering, real refusal/translation and layer boundaries explicit; exact three-boundary matrix inferred.   | API, domain and real-database checks, equal/previous/next-day cases, stable business translation and rollback. Equality remains accepted.                                                                                                                          |
| Parallel allocations        | Refreshed refs, drafts, branches, manifest union and migration order explicit; singleton patch inferred.           | Recheck destination and parallel refs before publication and after integration; preserve manifest keys, one canonical overlapping patch and forward migration order. Applied migrations and unrelated patches remain valid.                                        |

Independent source review then identified overbroad scope in the first candidate. The final
wording ties actor separation and date ordering to their established contracts, preserves existing
bounded pagination alternatives, scopes historical scanner fixtures to history scanners with an
allowlist, and limits repository-allocation searches to that allocation space. Five corresponding
safe controls were added to cases 2, 3, 4, 10 and 11. The criterion and unsafe variants did not change.

Both original readers assessed the identical expanded scenario in one follow-up within their
existing independent contexts. They accepted all five added controls and confirmed all original
case decisions unchanged. This was not a second fresh trial. The base reread and hashed only the
scenario, using its unchanged guidance; the candidate reread all seven guidance files and verified
the final bytes after reflow. No other reader or author conclusions were supplied to either.
The initial scenario hash was
`2dc4da8dc8ec5a27d1c4ef73ed620293dea709e1087c98f09d5fc3fccca756d9`;
the final fingerprints below bind the follow-up, not an invented initial assessment of final text.

## Input binding and environment

SHA-256 identifies the assessed text, not execution of the represented software. Paths below are
relative to `skills/`; fingerprints were checked against both reader returns.

| Guidance                                     | Base SHA-256                                                       | Candidate SHA-256                                                  |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `tdd/SKILL.md`                               | `3b2eb0e83673649c539af3e027f7f98548328aa75e08b3325caa2f5b5e8d2896` | `bdaf2772d4563b9f312f6ffa3d2f5bd7953f1fbd41839e12855c458ab2bb5f97` |
| `tdd/references/tests.md`                    | `9b711e288a89acf08d26b46ed948231fca4980cc4719504e9364800e6f6ac61b` | `a235b5aa44bdc9399018d3b9bcaaa7143a3353c308ca26b5625b2b74b3cbef83` |
| `codebase-design/SKILL.md`                   | `794791581cbd4afdd355a217060b7c5d83a899606fe45ee290588fd297f3045d` | `13b5a125970cc5baa33a06a0c6d6a5128f84ebf3553abf8c284171cbf5a66898` |
| `codebase-design/references/dependencies.md` | `109567cf9ddee325bdca4527765d7a4b617438a8443adb39f6b3cb2e8aba5ec1` | `3420e5fd94d4176af8397e91080340f76419def44cf013b13c2cef64f0256433` |
| `implement/SKILL.md`                         | `9a059edaab3933054caf1f4f806f702aa815373d5c9bfdf3d27a7d92d6afb60c` | `0c2b08f3c598a2bf5309c644e4550a440ba231372eddc5025011fea1b49970de` |
| `code-enforcement/SKILL.md`                  | `c0d29945d40675345c70b283e7540cbb43374eab5813e2c0a5ccefcdde4a50e6` | `7bdf256613bdcb9f29bc7cafc21212113f5674a16d9d74d96c8c8fd3863e8d8e` |
| `pr-verdict/references/failure-classes.md`   | `ece41fb00ccd15f92b1b542a8897d78c66c04b92a96a6a5d37f55f38dbc2ac23` | `166bb575d008e6d74fa4df3fbc6b53d7ede35c7c2a7cb31d896bc1b54967d43e` |

Scenario SHA-256: `85ec4459265409a5e0eb83c1b1593b10e001bdff76c7560eab63b31d2085edd1`.

The base reader used shell file reads, `git show`, `git rev-parse`, Python hashing and Git/zsh
version probes. It observed macOS 27.0.1 ARM64, Python 3.15.1, Git 2.54.0 and zsh 5.9.
The candidate reader used shell file reads, SHA-256, host/Node probes and an unsuccessful process
inspection. It observed Darwin 27.0.0 ARM64 and Node 24.22.1; an explicitly selected zsh reported
5.9. Both saw an inherited `SHELL` value naming fish; the earlier command-launcher process was not
independently established. Truncated reads were followed by bounded rereads. Both identify a GPT-6
family from supplied system context; exact serving model, build and sampling settings were not
exposed. Each wording received one initial assessment and one follow-up, not repeated independent
trials. Neither reader edited files or used network.

Repository checks ran separately on macOS ARM64 with Bun 1.4.4: `bun test` passed 15 tests
(39 assertions), `bun run typecheck` and `bun run format:check` exited zero. The tests exercise the
existing output hook, not these new instructions. Two index generations were byte-identical and
unchanged. Local frontmatter/JSON parsing and structural review retained the prior conventions;
`skills-ref` was absent, so standard-tool validation was unavailable.

The three added `code-enforcement` activation queries are scenarios, not executed host-activation
evidence. Bun 1.4.3, the Ubuntu 24.04 CI target, installation and activation in Claude Code, Codex
and Cursor were not exercised. These observations support bounded source-guidance decisions only;
they do not qualify the fictional systems or an installed harness.
