# Execution environment scenarios

These fixtures expand [Case O](../references/cases.md#case-o--execution-environment-assumptions-class-21)
and exercise phase-3 decisions, not forge anchoring, tool installation or publication.
They are not evidence that the initial head of any historical PR was replayed.

## Evaluation prompt

Read `references/failure-classes.md`. Review each fixture independently and report the applicable
class, outcome, failure sequence and lift criterion. Do not modify files or publish a verdict.
For a live evaluation, supply only this prompt and the fixtures to a fresh reviewer; retain the
reviewer's first response before comparing it with the expected decisions below.

## Fixtures

### A — hard-coded base

A changed CLI promises to inspect any valid checkout's diff against its configured integration
branch. This checkout has only remote `upstream`, whose default branch is `trunk`;
`refs/remotes/upstream/trunk` resolves successfully. The CLI instead runs:

```sh
git merge-base HEAD origin/main
```

The failed lookup returns `GIT_BASE_UNAVAILABLE` and aborts the inspection. Neither `origin` nor
`main` is a declared prerequisite, and the implementation never consults repository or forge metadata.

### B — executable lookup

A changed setup command promises to refresh a formatter's cache in a non-interactive shell. The
formatter is installed and runs by absolute path, but its directory is absent from that shell's
PATH. Setup calls the bare executable name without establishing PATH and exits with command not
found before refreshing the cache.

### C — inherited bootstrap flags

A changed bootstrap's independent contract promises online preparation of an empty tool home when
network access is available; inherited installer offline flags are neither declared nor supported
by this bootstrap. It sets the home to a fresh temporary directory, inherits an offline-only flag
from the parent shell and passes it to the installer. The installer cannot obtain the missing tool
offline, so preparation fails despite the promised prerequisites being satisfied.

### D — verified environment

The CLI derives `upstream/trunk` from the checkout's configured remote and default branch and
verifies that the ref resolves before computing the merge base. Setup establishes the formatter's
lookup path for its actual shell. Bootstrap resolves C's unsupported offline flag for its contracted
online invocation using the fresh home. Native executions succeed in those three environments; a genuinely
unavailable base or executable produces an explicit prerequisite diagnostic. These observations
are supplied fixture facts, not executions performed by the evaluator.

### E — evidence missing

The implementation in D is unchanged, but no executions in the alternate checkout, minimal PATH
or conflicting-variable environment are supplied. Source inspection finds no demonstrated failure.

### F — intentional inherited offline mode

A changed bootstrap's independent documentation explicitly supports an inherited offline setting:
use the local cache without network requests, or report a missing prerequisite when the cache lacks
the requested tool. The operator enables that setting even though network access is available.
The bootstrap preserves it, installs from a populated cache and succeeds without network requests.
With an empty cache it preserves the setting and reports the documented missing prerequisite,
without contacting the registry. These observations are supplied fixture facts.

## Expected decisions

- **A:** class 21 is `broken by` the unresolved hard-coded `origin/main`, which aborts a promised
  inspection in a valid checkout. Require changes; derive and verify the intended base instead.
- **B:** class 21 is `broken by` lookup on the actual shell's PATH. Require changes; establish that
  lookup path. An installation or permission finding under class 17 does not explain this fixture.
- **C:** class 21 is `broken by` the inherited offline-only flag against an empty home. Require
  changes; resolve the unsupported state for the independently promised online bootstrap.
- **D:** class 21 holds on the supplied observations within their stated scope. Do not demand
  literal `origin/main`, a global shell change or neutralization of every environment variable.
- **E:** class 21 is `unproven`, not a demonstrated defect. Name the missing environment evidence
  and apply phase 5's essential-evidence rule before deciding whether it blocks.
- **F:** class 21 holds within the supplied observations, including the documented empty-cache
  outcome. Do not report the intentional offline setting as a defect or require overriding it
  or making network requests; both outcomes satisfy the declared, supported contract.

## Execution status

### Original fixtures

On 2026-10-19, fresh Codex collaboration contexts `baseline_eval` and `environment_eval` evaluated
the original A–E fixtures recorded in commit `bfadfc6` on Darwin arm64, before reading expected
decisions. This historical run did not evaluate the revised C/D fixtures or the added F fixture.
The inherited session model's exact identifier was not recorded. Base policy: commit
`0ca04f50840105f3ac4ae9ad9a9ac3ed429e521d`. Candidate `failure-classes.md` SHA-256:
`03a5d7e0413c772a58e0354e5817bf9ce9d725923773d54a576c78a8c472c736`.

The criterion fixed before evaluation was: flag A's hard-coded ref, reject the demonstrated
workflow failures A–C, accept D within its evidence and keep E unproven. Both contexts met it;
the candidate assigned A–C to class 21, while the base used phase 2's promised-workflow rule.
This comparison establishes no detection-rate improvement. An independent standards review found
no defect in the four-file change.

### Revised fixtures

On 2026-10-19, fresh Codex context `/root/environment_eval` evaluated the revised A–F fixtures on
Darwin arm64 before reading expected decisions. Exact model identifier: unknown.
Evaluated `failure-classes.md` SHA-256:
`74412a661178003bce86409971d0d186e9626d296478f7d9a9abadf8282e98ab`.
Observed decisions: A–C `broken by`, D/F `holds`, E `unproven`. F preserved offline mode for both
cache outcomes without demanding network access. This run evaluated reviewer decisions only;
it did not compare detection rates with the prior policy or evaluate other supported settings.

These are observed reviewer decisions on supplied fixture facts. No underlying CLI/bootstrap
execution, complete six-phase historical PR replay, Claude Code or Cursor evaluation was performed.
