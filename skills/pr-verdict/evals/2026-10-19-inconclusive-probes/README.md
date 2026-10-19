# Inconclusive probe decisions

## Contract and criterion

A probe protecting a decision must distinguish confirmed success, confirmed failure and
inconclusive results; an inconclusive result must not authorize the protected operation.

The [supplied scenarios](scenarios.md) are decision-only inputs. Before comparing results, the
criterion is: A–F must identify the unsupported conclusion and its mechanism or evidence gap;
A must explicitly identify timeout → unread declaration → default false → exit 0 → authorization.
The candidate must route these concerns through class 19. G must accept the supplied corrected
probe behavior within its stated scope, without inventing missing evidence. No improvement claim
depends on the base missing a defect: earlier classes can already detect related failures.

| Scenario | Expected assessment                                                                                               |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| A        | Changes required: the hook authorizes a protected operation after the timeout.                                    |
| B        | Changes required: an unverified repository is accepted as a configured installation target.                       |
| C        | Changes required: the successful final shell command hides the failed readiness probe.                            |
| D        | Changes required: a no-match replacement reports success despite a missing required endpoint.                     |
| E        | Incomplete evidence: fetch all pages and assess effective rules; a rule listing alone cannot prove merge refusal. |
| F        | Public readability proves no private authenticated access; an empty repository proves no credential rejection.    |
| G        | The supplied complete observations support the corrected probe-decision behavior only.                            |

## Execution scope

The base is `0ca04f50840105f3ac4ae9ad9a9ac3ed429e521d`. Separate fresh Codex subagent contexts
receive the base or candidate `SKILL.md` and `references/failure-classes.md`, plus the identical
scenario file. They receive no expected-answer table or other evaluator's conclusions. Their
task is to apply the supplied wording and return decisions, not invoke a complete PR workflow.

The orchestrator runs on macOS 27.0.1, ARM64, with zsh and Bun 1.4.3. Exact model identifier and
reasoning settings are not exposed in the orchestration request. This exercise does not establish
Claude Code or Cursor behavior, repeated-run reliability, software execution or forge enforcement.

## Historical acceptance boundary

The historical PR's initial head is not replayed. Read-only `gh pr view` inspection found a merged
PR with 58 changed files and later guard repairs; reviewing its current head would not test the
requested initial head. A complete historical checkout, dependency preparation and PR barrier
replay are outside this bounded decision exercise. Scenario A reproduces the requested mechanism;
it does not establish that the historical implementation was executed here.

These scenarios are not an automatic gate, and repository tests do not execute them. Observed
agent decisions are separate from the supplied software outcomes.

## Observed decisions

On 2026-10-19, one fresh context per wording returned the retained
[base response](base-results.md) and [candidate response](candidate-results.md).
Both identified A–F as requiring changes within the supplied concern and accepted G's corrected
probe behavior. The candidate used class 19 for all seven scenarios; its A finding explicitly
traced the timeout to exit 0 authorizing the protected operation. E retained advisory scope
without claiming a mechanical merge refusal; F did not infer unauthorized downstream access.
D established false success, without inventing an observed external publication.

The declared criterion is met for these decision inputs. The base also detected the defects
through existing classes and phase 5, so this run establishes explicit class-19 routing and
preserved decisions, not an effectiveness gain. G is the safe counterexample to A's violating
input. Its software test and faulty variant are supplied facts; the observed negative witness
here is the candidate reviewer rejecting A, not an executed hook test.

Input SHA-256 fingerprints (candidate sources match the final skill text):

| Input                     | SHA-256                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| Base `SKILL.md`           | `33b08191fc3ca4d3ad4dfe1653df1a0a719e78dc9702a94c5c8e444598e3bb54` |
| Base failure classes      | `4f765385faf7350ecd78cfb8e5b5bdf13ded95e111ca28a283bc33a4e9b9ed14` |
| Candidate `SKILL.md`      | `15e574bd29823cf135f13db30770cc6604418636146232668a526c39bbc64d10` |
| Candidate failure classes | `bedfc14fee5df931f557c9a0730c3a0abfa05ee3645b069e4fd012fa977d44ee` |
| Shared scenarios          | `7070d3dd0410448b8b8695f6b027c8a25832336ece4b17c5423676baae0ca783` |
