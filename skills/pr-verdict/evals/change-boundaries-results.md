# Changed boundary evaluation record

## Scope and method

The [scenarios](change-boundaries.md) contain invented facts. Separate fresh evaluator contexts
read the same eleven violating cases and five safe controls with either the prior wording or the
revised wording. Each received the selected input paths and the protocol, without expected answers
or earlier conclusions, and returned decisions, mechanisms, minimal checks and evidence limits.
The fixed criterion was correct treatment of supplied violations while accepting safe controls
without inventing execution. This was a decision exercise, not a host activation test.

The final revised-wording pass also checked creation with an idempotency key but no prior resource
version, and an intentionally incomplete editable draft with a validated finalization transition
and repair path. These additional cases were not part of the base comparison.

Both compared passes rejected unsupported readiness or guarantees in all eleven cases and accepted
all five safe controls. No decision improvement was demonstrated. The prior wording often required
domain inference; the revision makes the specific checks explicit. One pass per compared wording
does not establish a reliable improvement rate. An earlier candidate pass preceded refinements for
creations and drafts; only the final pass binds the revised inputs below.

## Observed decisions

| Case                     | Prior / revised decision           | Mechanism identified in both passes                                          |
| ------------------------ | ---------------------------------- | ---------------------------------------------------------------------------- |
| Integrated consumer      | Readiness unsupported / same       | Branch CI and a conflict-free preview omit the destination consumer.         |
| Colliding identifiers    | Identity/order unsupported / same  | Local sequence values collide with destination or open changes.              |
| Permissive routing       | Authorization unsupported / same   | Missing permission/scope is hidden by administrator-only tests.              |
| Non-discriminating tests | Claims unsupported / same          | Empty scope, partial assertions and wrong adapter defaults hide faults.      |
| Cached or skipped guard  | Universal claim unsupported / same | Scanner/cache mismatch and skipped CI paths produce false success.           |
| Repeated state change    | Broken invariants / same           | Replay, stale state, ambiguity and allocation violate the supplied contract. |
| Personal copies          | Delivery unqualified / same        | Persistence/erasure gaps and a changed public response lack authority.       |
| Dependency installation  | Upgrade unqualified / same         | Restrictions, patches and image installation remain unqualified.             |
| Supervisor completion    | Success invalid / same             | Signals, waits, output errors and cleanup invalidate completion.             |
| Commit scope             | Remove or disclose / same          | Unrelated changes and unexplained tooling expansion need correction.         |
| Moved evidence           | Current proof unsupported / same   | Old head or another tree cannot be presented as the current run.             |

All five safe controls were accepted within their supplied scope by both evaluators. The final
revised pass also accepted both additional creation/draft boundaries, explicitly distinguishing
creation keys from existing-resource versions and editable incompleteness from an unprocessable
committed value.

## Native synthetic experiments

These local experiments check the illustrated mechanisms independently of the decision exercise.
They introduce no maintained validator or CI gate. Temporary sources and raw command outputs were
inspected by an independent reviewer before cleanup; this record retains summaries and selected
diagnostics, not a complete replay bundle.

1. A temporary Git repository contained a branch requiring `auditSink` and a destination adding
   `createHost({})`. The local pinned compiler ran as `tsc --project tsconfig.json`: isolated branch
   exit **0**; `git merge-tree --write-tree main HEAD` exit **0**; integrated typecheck exit **1**,
   with `neighbor.ts(2,12): error TS2741: Property 'auditSink' is missing in type '{}'`.
   Supplying the sink to that consumer restored typecheck exit **0**. The compiler's observed
   diagnostic exit code was 1; an initial experiment expecting 2 was corrected without changing
   the fixture's failing behavior.
2. A separate temporary predicate fixture ran `bun test flawed.test.ts` against a removed tenant
   filter and unredacted returned body: exit **0**, **2/2** tests passed. Running
   `bun test discriminating.test.ts` on those same faults exited **1**: **2 assertion failures**,
   with the authorized control still passing. The controlled mutation removed
   `&& row.tenant === tenant` and replaced the cleared label with the input label. Restoring both
   predicates made the same discriminating command exit **0**, **3/3** tests passed.

The second fixture is a pure stored-body stand-in: it does not persist data or independently read
a response and stored copy. It demonstrates assertion discrimination, not adapter fidelity,
database isolation, actual erasure, or end-to-end storage redaction.

## Input identities

SHA-256 identifies file bytes, not execution truth or a reviewed software commit. Paths below are
relative to each selected skill snapshot.

| Input                                      | Prior wording                                                      | Final revised wording                                              |
| ------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `pr-verdict/SKILL.md`                      | `15e574bd29823cf135f13db30770cc6604418636146232668a526c39bbc64d10` | `ce0f1513653616e24cd5d2f1aadc54484b60812a8c169f3f9351324ad3744c5f` |
| `pr-verdict/references/failure-classes.md` | `ec217e1a68af5ac43dca1ded24ef30f33454870e8db2f4f2b1324291a2538e03` | `0f7e353b343ee6c8a06a6397a689dd954f17f4fe40eeabc46789e12b90a45015` |
| `pr-fix/SKILL.md`                          | `d9b9e0ad911cd8e55dc17cfe4e880c0b07a0dd7f2fdce09640851472de045ee2` | `24f3a1363e0f15f45eef04fdca79dc6ca068ec352dc78f84fd4fcba1a8c4bca2` |
| `tdd/references/tests.md`                  | `b8fedcd3368fc43e3fd6413db2594246b4801e7aa2903b6287c8ff4a51a8d154` | `7d9f7a8227fc847985d5652061278bf6bfa0ac93279706955cabc7652411fd65` |
| `tdd/references/dependencies.md`           | `85bcdd4d3e80299b5c98233c6062d225bd7f183260faa6529fd07d2ed3f46c0a` | `1e8c284b60ab6cc4f948640ac7a5ff97613d10da5e2adc86cf8262a39f979680` |
| `code-enforcement/SKILL.md`                | `9db00b5fe5d366fa298ffb2d98d41afb210d7695a728f6dfaccc9c7d5bc47edd` | `b10e7c3b3600c352b2e8cd9e2d6811109c81a81f4c22d70d96f8881bebd4aeb6` |

Shared scenario fingerprint:
`6e1f099410c9f0ce4fa75daf0edfdd46eac8bc00ccd6da83fa67c65e3714c743`.
The protocol source was `skill-manager/references/evals.md`, fingerprint
`417aefc11d68deece685160582aea2051a4f63a96111b7539d44ce264ddc5b10`.

## Environment and limits

Observed local environment: Darwin 27.0.0 arm64, zsh, Bun 1.4.3 and TypeScript 7.0.2. Decision
evaluations used fresh Codex subagent contexts; exact served model/build and sampling parameters
were unavailable. Independent standards/spec review and proof review inspected the diff and
retained observations; formatted files and fingerprints were checked separately.

No represented API, database, image build, CI/cache execution, supervisor or privacy workflow was
run. No forge write, publication, deployment or installation into an agent host occurred. Linux,
Claude Code and Cursor were not exercised. Repository tests cover their existing executable
surface, not these instructions' effectiveness. The local experiments and single decision passes
support only the bounded observations above.
