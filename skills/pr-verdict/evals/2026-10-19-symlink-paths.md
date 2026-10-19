# Symlink decision evaluation

## Scope and inputs

Decision-only comparison observed on 2026-10-19 in Codex on macOS ARM64, with Bun 1.4.3 and
zsh. Two distinct subagents received fresh contexts (`fork_turns=none`), one per wording. Model
and reasoning settings were inherited, not independently recorded. Each initially read only its
`SKILL.md` and `references/failure-classes.md` snapshots, without expected answers, the issue,
Case M or the other response. The candidate evaluator's subsequent specification review is separate.

The base is commit `0ca04f50840105f3ac4ae9ad9a9ac3ed429e521d`. Candidate snapshots contain the
class 20 addition and count-neutral routing. SHA-256 fingerprints bind the exact evaluated text:

| Input                                     | SHA-256                                                            |
| ----------------------------------------- | ------------------------------------------------------------------ |
| Base `SKILL.md`                           | `33b08191fc3ca4d3ad4dfe1653df1a0a719e78dc9702a94c5c8e444598e3bb54` |
| Base `references/failure-classes.md`      | `4f765385faf7350ecd78cfb8e5b5bdf13ded95e111ca28a283bc33a4e9b9ed14` |
| Candidate `SKILL.md`                      | `15e574bd29823cf135f13db30770cc6604418636146232668a526c39bbc64d10` |
| Candidate `references/failure-classes.md` | `4fb73c1840ece9e4a101b8636dc975dc5548eb45d1560c294b2a6cef0d8c9396` |

Both received the same seven hypothetical inputs below, with unrelated required evidence stipulated
sufficient. They were asked for applicable class, sweep outcome, verdict impact, mechanism or missing
evidence, and lift; no forge operation or execution of the represented software was requested.

1. S1: the contract reads regular files only inside `/repo`. Git entry `linked/alpha` has mode
   `120000` and content `../../outside/secret`; `/outside/secret` exists. The checker accepts a
   lexical `/repo/` prefix, calls following `is_file()` and reads the original path.
2. S2: a regular-only witness `/repo/witness` becomes a symlink to an unrelated existing inside
   file; following `is_file()` accepts it.
3. S3: a path is canonicalized and checked inside the root. Before reopen, its ancestor becomes
   a symlink outside; the checker reopens the original path.
4. S4: a supported symlinked configuration is saved by renaming a regular temporary file over
   the link; the link vanishes and the original target stays unchanged.
5. S5: observed no-link policy rejects leaf and ancestor symlinks; an inside regular file succeeds;
   outside and dangling links fail explicitly.
6. S6: observed allow-link policy checks canonical containment and reads a retained validated
   handle despite replacement of the original path; configuration save updates the validated target
   while retaining its link.
7. S7: only ordinary-file tests are supplied, with no traced symlink failure or symlink execution
   evidence.

## Criterion and observed decisions

Before either run, [Case M](../references/cases.md#case-m--symlink-traversal-and-identity-class-20)
fixed the criterion: refuse the four demonstrated failures, accept the two supplied safe policies
within their observed scope, and retain missing evidence as `unproven` with phase-5 essentiality.
The following are normalized observations from one response per wording, not software test counts.

| Input | Base observation                                                                                | Candidate observation                        |
| ----- | ----------------------------------------------------------------------------------------------- | -------------------------------------------- |
| S1    | Class 9 broken; changes required for outside read                                               | Class 20 broken; same mechanism and decision |
| S2    | Class 10 / phase 2 broken; changes required for false regular witness                           | Class 20 broken; same mechanism and decision |
| S3    | Class 9 broken; changes required for ancestor substitution before reopen                        | Class 20 broken; same mechanism and decision |
| S4    | Phases 2/5 broken, no exact numbered class; changes required for lost link and unchanged target | Class 20 broken; same mechanism and decision |
| S5    | Holds on supplied no-link observations; no blocker                                              | Class 20 holds; no blocker                   |
| S6    | Holds on supplied handle/save observations; no blocker                                          | Class 20 holds; no blocker                   |
| S7    | Unproven; block only if missing proof is essential                                              | Class 20 unproven; same essentiality rule    |

Both responses named lifts addressing the actual operation: reject disallowed links or validate
containment, consume the validated object rather than reopening the path, preserve the link when
saving, and exercise relevant failure and safe paths. Neither inferred a demonstrated defect from S7.

The candidate met the declared decision criterion in this bounded run. The base already reached
the same decisions through broader rules; no detection uplift or reliability rate is established.
The represented filesystem operations and tests were supplied facts, not executed here. No historical
PR head, complete six-phase review, host activation, measurement integration or publication was
replayed. This synthetic case substitutes for the historical replay without establishing its result.
