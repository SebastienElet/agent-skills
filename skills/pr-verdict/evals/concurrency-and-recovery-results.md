# Concurrency and recovery: decision observations

Two fresh delegated contexts independently assessed the identical
[scenarios](concurrency-and-recovery.md) on 2026-10-27. Both used `fork_turns: none`, without the
author's conversation, conclusions or the other reader's response. The base reader obtained the
eight guidance files below only through `git show` at
`ba3a7e8396bc7a62ec9fc1d80d1f66c866d42926`; the candidate reader read only their working-tree
counterparts. The criterion and scenarios were fixed before either assessment. Guidance was data,
not an instruction to invoke a live PR workflow. Neither reader modified files or used network.

Both identified the supplied violations or essential gaps in all seven cases and accepted all
seven safe controls. Both kept demo purge as an unresolved policy question. The base inferred
specific mechanisms from its broader rules and the supplied facts; the candidate named them
explicitly. Equal decisions establish no detection-rate gain, repeatability or recurrence
prevention. No represented application, database, renderer, storage or branch composition ran.

| Case                       | Base specificity reported by its reader                                                                                                                           | Candidate decision and smallest relevant evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared caps and single use | Atomic read/decide/write, uniqueness and refusal translation explicit; capacity-row protocol and concrete scope inferred.                                         | Shared lock across all cap/contributor writes, positive quantities and non-null scoped uniqueness; synchronized separate DB connections, every outcome, persisted sum and rollback. Exact capacity and different organizations remain allowed.                                                                                                                                                                                                                                                            |
| Server preconditions       | Invalid accepted states, tenant scope, reference validity and historical migration handling explicit; concrete form rules inferred.                               | Direct API bypasses; producing/downstream stable code and promised `422`; missing/inactive/foreign reference refusal without disclosure and mutable validity protected through write. Invalid historical migration refuses without changes; conforming data succeeds. Incomplete authorized drafts remain allowed.                                                                                                                                                                                        |
| Frozen facts and versions  | Atomicity, permissions, claimed-layer proof, protected-role SQL and undecided erasure policy explicit; deposited-version and first-use protocols inferred.        | Publication preserves holds; separate authorized release; sealing before finalization, exact retained version and no fallback, deposit/record recovery. Raw protected-role update/delete/truncate and overlapping first-use/rename, with changed-label refusal and unchanged replay. Demo purge remains open without bypass or claimed erasure success.                                                                                                                                                   |
| Parallel composition       | Refreshed allocations, coordinated manifest union and aggregate verification explicit; disposable composition, typed factories and exact compiler check inferred. | Target plus relevant heads/drafts composed in a disposable tree; unique prefixes, migration order, native registry checks, separate fixture/port typecheck and affected suites. Real public-export comparison when unchanged compatibility is claimed. Joint unpublished version allowed; published version advances; applied migrations stay unchanged.                                                                                                                                                  |
| Displayed claims           | Claims matching mechanisms and independent behavioral assertions explicit; query-to-render and help-predicate cases inferred.                                     | Paid/unpaid data through the real query and rendered card, amount and label asserted together; help predicate and any promised enforcing operation exercised. Accurate invoiced wording is allowed without inventing a refundable calculation or closing policy.                                                                                                                                                                                                                                          |
| Read endpoints             | Permissions, scope, privacy and bounded collection traversal explicit; pure GET, sensitive-body search and representative query-plan evidence inferred.           | Domain state unchanged by reads; explicit revision command, no secret in URL/logs/errors, scoped queries/indexes and compatible removal of the global index. Default/max/terminal traversal plus bounded underlying work on representative volume; sensitive-field authorization independent of list access. Existing bounded offset and authorized readers remain allowed.                                                                                                                               |
| File recovery              | Actual-content validation, consumption boundary and replay/atomicity explicit; read digest, multi-store protocol and specific pre-production trial inferred.      | Real binary signature/structure and valid text decoding, server digest checked before release, missing/changed-object refusals. Durable scoped key/digest/type, identical replay, changed-content refusal, atomic finalization; failure between stores followed by successful retry, concurrent replay and compensation preserving referenced objects. Named pre-production trial before widened types/quotas/origins are exposed. Valid uploads and an authorized outbox or compensation remain allowed. |

After the first assessments, source review found the existing class 3 wording too narrow: its
exclusive list omitted the shared-lock protocol now explicit in class 1. A first correction admitted
serialization protocols. The candidate reader then found that the class's Ask and Lift still
described only constraints. Those two passages were aligned too. In two follow-ups within its
existing independent context, the candidate reader accepted the final wording and confirmed all
seven decisions and controls unchanged. These were not additional fresh trials. The base guidance
and scenario never changed; no other reader's conclusions were supplied to the candidate.

The initial candidate failure-class fingerprint was
`c7d9078264c9276141a6e4ba7ac2e7c80dcfaeb616cd432d57b59c40c6c1d930`;
the intermediate fingerprint was
`e5f7c662389372029329460d985d785b3bb6a95549f07f31b59ac387eeb294e4`.
The final fingerprint below binds the last follow-up, not an invented initial assessment of final
text. All seven other guidance fingerprints remained unchanged.

## Input binding and environment

SHA-256 identifies the assessed text, not execution of the represented software. Paths are
relative to `skills/`; fingerprints were checked against the readers' returns.

| Guidance                                     | Base SHA-256                                                       | Final candidate SHA-256                                            |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `tdd/SKILL.md`                               | `bdaf2772d4563b9f312f6ffa3d2f5bd7953f1fbd41839e12855c458ab2bb5f97` | `2d4f50782422a9a996585541a68d74ee1ff2a3b3edfb68a1ce11b4054ce4cf67` |
| `tdd/references/tests.md`                    | `a235b5aa44bdc9399018d3b9bcaaa7143a3353c308ca26b5625b2b74b3cbef83` | `6d4cce628d7b31502f9bd21a02b15d0dc6d77447b79c0be61e60c00ea116bccb` |
| `tdd/references/dependencies.md`             | `1e8c284b60ab6cc4f948640ac7a5ff97613d10da5e2adc86cf8262a39f979680` | `0cb36e14ca43d6ddee45279a8a3a57370ccb328b25e88a533d6b8d760fa589c7` |
| `codebase-design/SKILL.md`                   | `13b5a125970cc5baa33a06a0c6d6a5128f84ebf3553abf8c284171cbf5a66898` | `13b5a125970cc5baa33a06a0c6d6a5128f84ebf3553abf8c284171cbf5a66898` |
| `codebase-design/references/dependencies.md` | `3420e5fd94d4176af8397e91080340f76419def44cf013b13c2cef64f0256433` | `090b4b2d00dd81f03bfda29ba2a0ca0b44647df19a8290ae459c98420ebf0a11` |
| `implement/SKILL.md`                         | `0c2b08f3c598a2bf5309c644e4550a440ba231372eddc5025011fea1b49970de` | `0585cebdb31d33185abae8d199337a66eef0221f50a503ace0d510b4b1c29963` |
| `code-enforcement/SKILL.md`                  | `7bdf256613bdcb9f29bc7cafc21212113f5674a16d9d74d96c8c8fd3863e8d8e` | `462a480bc31163c19ce82473de5847541a46ca92d8ee00b5f5f2f12b154aa981` |
| `pr-verdict/references/failure-classes.md`   | `166bb575d008e6d74fa4df3fbc6b53d7ede35c7c2a7cb31d896bc1b54967d43e` | `a3696a8f22a820cefebdf067489316222b7df9c52dab3a95827652a06d81da16` |

Scenario SHA-256: `d30424b79670698dd00addca24aed98b9357e61b86a7befd4d07de59a3449db2`.

Both readers used shell file reads and bounded rereads after truncated grouped output. The base
used `git show`, Python SHA-256 and environment probes; the candidate used line-numbered reads,
`shasum -a 256`, `uname` and `sw_vers`. Both observed macOS 27.0.1 ARM64, Git 2.54.0 and zsh 5.9;
the candidate also observed Darwin 27.0.0. The base's Python was 3.15.2. Both saw an inherited
`SHELL` naming fish, which is not proof of the execution shell. The supplied identity was
Codex/GPT-6; exact served model, build, V8 version and sampling settings were not exposed.
Each wording received one fresh assessment; only the candidate received the two follow-ups.

Separate repository verification on macOS ARM64 with Bun 1.4.4: `bun test` passed 15 tests with
39 assertions; `bun run typecheck`, `bun run format:check` and `git diff --cached --check`
exited zero. Those tests exercise the existing output hook, not these instruction changes.
Two README-index generations were byte-identical and unchanged. Local frontmatter/JSON parsing
and structural review retained the five skills' prior conventions; `skills-ref` was absent, so
standard-tool validation was unavailable.

The added `code-enforcement` queries are two positive and one negative activation scenarios,
not executed host-activation evidence. Bun 1.4.3, Ubuntu 24.04 CI, pre-production application
behavior and installation/activation in Claude Code, Codex and Cursor were not exercised.
These are bounded source-guidance decisions, not the mini-repository implementation evaluations
or recurrence-prevention proof described by the originating lessons.
