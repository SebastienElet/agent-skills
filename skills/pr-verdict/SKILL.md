---
name: pr-verdict
description: >
  Deliver a PR verdict on an open pull request, yours or another author's. Use only on explicit
  `$pr-verdict` or `/pr-verdict` invocation, or when an authorized `pr-fix` workflow composes it,
  including in a delegated review. Never select it for a standalone review, merge, approval,
  re-review, push, or PR-authoring request without explicit invocation.
compatibility: >
  Authenticated `gh` (GitHub) or `bkt` (Bitbucket) CLI, plus an issue tracker CLI (`linear`,
  `gh issue create`) when a blocking defect needs a fix ticket.
metadata:
  category: dev
---

# PR Verdict

## Overview

The output is a verdict that commits to a merge decision, not a list of remarks. Three properties
separate it from a default agent review: every blocking finding names either a failure mechanism
that breaks a claimed invariant or missing proof essential to approval, every changed observable behavior has explicit
behavior-level evidence, and the limits of that evidence are declared inside the verdict. A green
barrier whose gaps stay implicit is the failure this skill exists to prevent — a verdict is only as
strong as what it admits it did not test.

Not for re-reading your own diff before committing: perform that review and verification directly.
This skill judges an open pull request and engages a decision the team will act on. That the PR is
your own changes nothing about the verdict, only about how it is published — see phase 6, since
GitHub refuses a request-changes review on your own PR.

## Usage

Invoke `$pr-verdict <pr-number|pr-url>` in Codex or `/pr-verdict <pr-number|pr-url>` in Claude Code
and Cursor. The forge is detected from `git remote get-url origin`.

`pr-fix` is the sole composition entry point: a user-authorized repair permits both its initial
review and its delegated reviews to invoke this skill through the host's normal skill mechanism.
This permission does not authorize verdict publication or ticket creation; composed reviews stop
after phase 5. Other workflows require direct user invocation.

Activation is instruction-scoped, not host-enforced: the description and this usage contract limit
selection. Keep model invocation available because a host-level manual-only flag also blocks the
composed call; reading files manually after a rejected invocation is not the composition mechanism.

After explicit invocation, typical cases are: "is this PR safe to merge?" (phase 1 checks its
actual base), "review this PR before I approve it" (phase 3
turns a vague unease into a named mechanism, or drops it), "they pushed the fixes, re-review"
(phase 6 finds the previous marker, sees a new SHA, and publishes a second verdict rather than
editing the first).

Run the six phases in order; phase 4 precedes phase 5 because a verdict without an executed barrier
is an opinion. When `pr-fix` composes this skill for an initial or delegated review, stop after
phase 5 and return the unpublished verdict to that workflow. This skill and its references are
English; the published verdict follows the language of the PR. Publishing (phase 6) is
outward-facing and visible to the team — ask for confirmation first, unless the request explicitly
says to post directly.

## Steps

1. **Anchor.** Resolve the PR number, head SHA, real destination branch and checks state with
   `references/forges.md`, then check out that exact head. For GitHub, inspect the target branch's
   effective rules and relevant bypasses before describing any merge barrier; follow the enforcement
   procedure in that reference. A repository that has its own forge skill
   wins over those raw commands. If the PR is stacked on another unmerged PR, say so and make
   retargeting after the parent merges part of the verdict: the diff you are reading is not the diff
   that will land on the integration branch. A review not anchored on a named SHA is invalid, and
   the marker in phase 6 is what makes that anchoring visible to the next reader. When the request
   anticipates a PR that is not open yet, poll until it exists and anchor on it; reviewing the
   branch instead is a review of something the team has not proposed to merge.

   Before declaring readiness in phase 1, read the [integration checks](references/forges.md#integration-checks)
   for destination integration and barrier replay requirements.

2. **Understand before judging.** Read the PR description, the design documents it cites, and the
   whole diff. The attachments are part of the description: a screenshot or an uploaded log is
   evidence the author supplied, and the forge returns it as raw markup that a text pass slides
   over — download every one and look at it, in the comments too (`references/forges.md`).
   Restate the invariant the code claims to hold, in one sentence. Producing a blocking defect
   before the flow is traced end to end is forbidden: its mechanism must demonstrate the violated
   invariant, and you cannot name a mechanism you have not followed.

   In phase 2, read [commit scope](references/forges.md#commit-scope) before mapping every commit
   against the resolved destination to the stated PR outcome.

   Inventory every externally observable behavior added, removed or changed by the diff and start
   a changed-behavior ledger with one row per behavior. In phase 2, read
   [behavior evidence](references/behavior-evidence.md) for ledger, witness and user-action checks.

   When the aggregate PR diff changes a verification mechanism (CI routing, test oracles, caches,
   proof policy, or agent review rules), activate `proof-integrity-review` on the same base and
   exact head. This also applies when `pr-fix` composes the review. Select by the semantic change,
   not filenames alone; ordinary application changes and editorial-only changes do not require
   this audit. Complete it before phase 5, retaining its anchored evidence report with the review's
   evidence. Structured receipts are optional unless explicitly requested by the user or an
   established external workflow. Reuse relevant observed commands on the same inputs instead of
   running a duplicate barrier; preserve the proof auditor's fresh context and independent first pass.

3. **Sweep the failure classes.** Put every question in `references/failure-classes.md` to the
   diff. Record, per class, one of: not applicable, holds because `<evidence>`, unproven, or broken by
   `<mechanism>`. Explain non-applicability in one clause and name the constraint, transaction,
   schema or executed test supporting `holds`. For unproven, name the missing evidence: block only when that proof is essential
   to approval under phase 5, explaining why and what would lift the gap; otherwise retain a bounded
   reservation. A demonstrated defect needs its named mechanism; missing proof does not establish
   one. When applicable, classes 11, 14 and 15 require Git-remote identity and hostile-input
   evidence, accounting for every selection input, and base/head measurements of performance or
   rewritten instructions. For class 14, check that every behavior-changing manifest, lockfile,
   tool configuration and pinned version is in the relevant task inputs, that file removal carries
   its role over to those inputs, and that a required job cannot silently pass with an empty
   affected-task selection on such changes. When the head under review was written in this session, delegate the review to a distinct auditor in a fresh context with no inherited
   conversation history, scoped to the diff. Every review requires an auditor distinct from the author
   in a fresh context with no inherited conversation history and an independent first analysis:
   withhold prior verdicts and author conclusions until
   that pass is recorded. Instruct
   the auditor not to modify the candidate and verify its state before and after. Available write
   tools alone do not block; technical isolation is mandatory only for an explicit security
   obligation. Keep unknown capabilities unknown. Reconcile the sweep with the changed-behavior ledger:
   the sweep can add findings, but cannot replace a row or turn absent behavior-level evidence into
   `holds`.

4. **Establish the barrier, then declare its holes.** Select only checks the repository already runs
   for affected files and consumers. Run or reuse them in the project's required environment;
   numbers from the wrong runner are not evidence for this head. If selection is uncertain,
   investigate the affected scope and existing checks, then state the uncertainty and evidence gap
   rather than defaulting to the complete barrier. Read the CI configuration and effective target-branch
   rules to identify any required merge gate; a successful CI check is advisory if no rule requires
   it. The relevant command is often not the package script of the same name. Report counts: builds,
   errors, warnings against the project's threshold, tests passed over
   tests run. Then enumerate what the barrier does not reach: sequential tests say nothing about a
   race, jsdom nothing about a browser, an in-memory database nothing about PostgreSQL, one platform
   nothing about the others. If nothing exercises the changed code, that absence is the review's
   first finding, not a reason to announce green.
   In phase 4, read [behavior evidence](references/behavior-evidence.md#evidence-attribution-and-reuse)
   before attributing evidence, reusing observations or recording description evidence.

5. **Return a verdict.** Exactly one of _changes required_, _approved with reservations_,
   _approved_. Complete the internal audit using `assets/verdict-template.md`, with
   the complete changed-behavior ledger before the blocking paragraph. Keep one row per inventoried
   behavior; a prose summary does not replace the rows. Both approval verdicts require every ledger
   row to have sufficient relevant positive evidence and required negative witnesses, with provenance
   and no contradictory result. Block on a demonstrated defect or essential missing evidence;
   explain why that proof is essential and state its lift criterion. Document other evidence limits
   without automatically blocking or downgrading approval. Each other blocking
   finding carries its named mechanism and its lift criterion — what must become true for the block
   to go away. Reservations are for mechanisms whose consequence is bounded; a mechanism that can
   lose or corrupt data blocks even when the author disagrees. A style, naming or structure
   preference never blocks: label it non-blocking, or drop it.

   For an applicable proof-integrity audit, `PROOF_WEAK`, `PROOF_CIRCULAR`, or an absent or stale
   audit requires _changes required_; name the missing evidence or failing
   mechanism and its lift criterion. `PROOF_ADEQUATE` satisfies this additional requirement only,
   not the rest of the PR review. Include the proof result and observed evidence in the existing
   evidence gaps and behavior ledger, retaining its report as a linked review artifact. If a
   structured receipt was explicitly required, its missing, stale or rejected gate also blocks;
   absence of an optional receipt alone does not.
   Retain the full audit and its evidence in the review context or a local artifact; return it to
   `pr-fix` when composed. Use `assets/comment-template.md` for the public summary. A shorter comment
   never waives an audit step, ledger row, negative witness or approval prerequisite.
   Do not publish a separate proof verdict or interpret a path-only `NOT_APPLICABLE` as an exemption.

6. **Trace and publish.** When running inside any review pass of `pr-fix`, return the phase 5
   verdict without a ticket or publication and let that workflow continue. Otherwise, open or reuse
   a fix ticket for blocking defects, and link the initial verdict if one exists. Never open a
   ticket solely to request or record a re-review: the new
   head-specific verdict comment is that record. Write one general comment from
   `assets/comment-template.md`, prefixed with the idempotency marker
   `<!-- pr-verdict:<pr>:<head-sha-12> -->` — not a rain of inline comments.
   Before any update or new publication in phase 6, read the
   [publication policy](references/forges.md#publication-policy) for identity, marker, native-state
   and reassessment procedures.

## Verdict policy

Separate review completeness from publication length. For _approved_ with no reviewer changes or
findings, publish at most eight lines: marker, verdict with short head and destination, one sentence
linking decisive evidence with its actual tested candidate, and only material residual limits
(at most two bullets). Omit the ledger, task counts, proof-audit codes, method narration and routine
"no changes made" statements. State advisory scope once, as a verdict qualifier when applicable;
do not repeat the conclusion. Do not invent limits to fill the template.

For other verdicts or findings, put actionable findings and lift criteria first, followed by the
relevant evidence and limits. Keep the public summary within about thirty lines; retain the full
ledger internally rather than dropping audit rows to fit. Publish full audit details only when
requested, still bounded and with findings first. A material limit, unresolved native review state,
stacked-base requirement or actual synthetic CI candidate must remain explicit when it affects the
decision; brevity cannot turn incomplete evidence into approval.

`broken by` becomes a blocking defect only when its ordered failure mechanism is written out.
"This looks racy" is not a mechanism; "request A snapshots at T1, request B writes at T2, A commits
at T3 and B's row is absent from the successor" is. Missing proof never establishes a violated
invariant; do not invent a failure mechanism or record `holds` to fit the verdict. An `unproven`
class blocks only when its proof is essential under phase 5; otherwise retain a bounded reservation
with its lift condition.

Classes 1, 2, 3, 4, 5, 7, 9, 11 and 12 name mechanisms that lose data, corrupt state or cross a security
boundary: when broken, they block. Class 14 blocks when its demonstrated loss, wrong eligibility or
routing removes required checks or prevents a promised workflow; other diagnostic omissions are
bounded reservations unless their evidence is essential under phase 5.
Classes 6, 8, 10 and 13 are usually reservations — promote class 6
when a concrete consumer's retry path depends on the changed code, class 8 when the degraded value
reaches a person or a legal act, and class 10 when the claim is legal, evidentiary or contractual;
a class 7 deferral stated with its lift condition is a reservation.
Class 6 also blocks a demonstrated violation of a promised business refusal, including a named
database refusal escaping as a generic server error.
For class 13, label the unchanged-contract claim `unproven` until the exported bytes are compared;
block when the comparison exposes a promised compatibility break or when compatibility proof is
essential to approval. Missing hostile-input or output coverage in classes 11 and 12 is an evidence
gap, not an invented leak: apply phase 5's essential-evidence rule and name the missing proof.
For class 15, retain `unproven` until a relevant base/head comparison satisfies the declared criterion;
block installation or merge when rule adoption or a required performance budget depends on it.
An optional unsupported claim can instead be removed or bounded; do not invent a measured defect.
Class 16 blocks when a proposed weakening defeats a required security or authorization control.
Class 17 blocks when an unusable tool skips a required check or prevents a promised workflow;
redundant installation with a bounded consequence is a reservation. Missing independence or usability
evidence remains `unproven`; apply phase 5's essential-evidence rule rather than inventing a bypass.
Class 18 blocks when stale references or missing legacy cleanup break a promised workflow or cleanup
contract; documentation-only omissions with bounded consequences are reservations.
Class 19 blocks when an unsupported probe conclusion authorizes a protected operation, skips a
required check or prevents a promised workflow. Otherwise bound its consequence as a reservation;
missing essential probe evidence follows phase 5's `unproven` rule.

Class 20 blocks when following or replacing a symlink crosses the repository boundary, defeats a
required file-type check or loses data or link identity. Missing symlink evidence remains `unproven`;
apply phase 5's essential-evidence rule without inventing an escape or race.

Class 21 blocks when undeclared or unsupported inherited state contradicts the command's independent
contract and skips a required check or prevents a promised workflow; declared, supported settings
are not defects. Bounded inconvenience is a reservation; missing evidence remains `unproven` under phase 5.

Class 22 blocks demonstrated unauthorized retention, disclosure or incomplete promised erasure.
Classes 23 and 24 block a demonstrated contract violation or failure of a required build, workflow
or cleanup guarantee. Missing evidence follows phase 5; do not invent a leak or surviving process.

Classes 25 to 27 block a demonstrated wrong result, accepted invalid reference or failing routine on
existing data; missing evidence follows phase 5 without inventing a mechanism.
Classes 28 to 32 block a demonstrated expiring test, broken immutability or authorized erasure,
omitted legitimate source, lost reference, incorrect signature validity or source-rule violation.
Missing evidence follows phase 5; do not infer a runtime failure from an unexecuted scenario.

The default below does not downgrade phase-2 defects: a demonstrated guard that prevents a promised
user action blocks, even outside these classes.

Other findings outside these classes are legitimate but non-blocking by default: report at most three
of them, one line each, labelled non-blocking, or drop them. The cap is what stops the sweep from
turning into a second review that competes with the verdict — rank them by whether they would change
a reviewer's decision and keep the top three. If the verdict runs past about thirty lines, that is
the symptom that preferences have crept into the blocking section.

## Gotchas

- **The base the forge reports is not the base to review** — and it errs in both directions. A PR
  that targets its parent branch hides what the parent still owes; a PR that targets the integration
  branch while sitting on an unmerged parent includes the parent's work. Recompute the base from the parent's head
  and put retargeting in the lift criterion.
- **The comment body passed inline** — apostrophes and backticks in a verdict break shell quoting
  and silently truncate the comment. Always pass the body through a file (see
  `references/forges.md`).
- **Renaming the visible command marker** — existing comments become invisible to the duplicate
  guard. Keep `pr-verdict` as the stable external protocol key.
- **A stale marker updated instead of superseded** — the SHA in the marker going stale on the next
  push is the point. Same `<pr>:<sha>` → update that comment; different SHA → publish a new verdict
  and leave the old one as the record of what was judged.
- **A re-review ticket opened for traceability** — it duplicates the head-specific verdict and adds
  tracker noise without tracking a defect. Link the previous verdict, publish the new SHA marker,
  and reserve tickets for blocking defects.
- **"Approved with reservations" used to avoid a disagreement** — that state is a claim that the
  consequence is bounded. If you cannot state the bound, the verdict is _changes required_.
- **A missing feature reported as an omission** — an absent regulatory or business control is either
  a declared contract (what, why, lift condition) or a blocker. Silence is the defect, not the
  absence.
- **The author's evidence read as absent** — a screenshot of the output comes back from the forge
  as an `<img>` tag inside the body, and a text pass slides over it. The verdict then announces that
  nothing was observed and makes the merge conditional on steps the author has already run and
  attached, which reads as not having read the PR. Open every attachment in phase 2, and label
  supplied evidence not reproduced here as theirs.
- **An unexamined green CI badge** — it does not identify the exercised checks. Inspect traceable
  logs and relevant inputs; reuse them with their remote provenance instead of demanding a local rerun.
- **The package script mistaken for the CI gate** — the repository's `lint` script may walk the whole
  tree while the pipeline lints only the changed files. Its count then measures a backlog that
  predates the head under review, and reporting it as the barrier drowns the diff in noise. Take the
  command from the CI configuration, and name in the verdict which one you ran.
- **A request-changes review mistaken for branch protection** — GitHub may record the review while
  still allowing a merge. Inspect the target branch's effective rules and bypasses, and describe the
  verdict as advisory without a controlled refusal.

## Constraints

- Never approve without sufficient traceable barrier evidence applicable to the reviewed candidate.
- Never write "everything is green": retain exact counts or non-execution in the internal audit;
  publish only decisive traceable evidence and material limits using `assets/comment-template.md`.
- Never report a count from a command the pipeline does not run; name the gate you executed.
- Never publish a blocking defect without a named failure mechanism and a lift criterion.
- Never publish an essential-evidence blocker without the missing proof, why approval needs it,
  and a lift criterion.
- Never block on style, naming or structure preference; label it non-blocking.
- Never open a review that is not anchored on a head SHA.
- Never approve with a demonstrated defect or essential proof missing. Require negative witnesses
  for modified oracles and critical guarantees, with reasoned exemptions for other behavior.
- Never infer behavior-level evidence from an aggregate green barrier.
- Never call a passing test a negative witness without an observed failure when the claimed behavior
  is broken.
- Never leave a limit of the evidence implicit; the barrier's gaps belong in the verdict text.
- Never report as absent, or demand in a lift criterion, evidence the PR already supplies.
- Never update a verdict without confirming its exact `<pr>:<sha>` marker and publishing account;
  never choose arbitrarily among multiple owned matches or publish after an incomplete lookup.
- Never publish two verdicts for the same `<pr>:<sha>` from the same account; update its single
  existing issue comment or review summary instead.
- Never infer the current GitHub review state from any historical matching review; inspect the
  account's latest opinionated review before a native state transition.
- Never sweep the failure classes on a head you wrote in this session from the context that wrote it.
- Never create a ticket solely to request, schedule or record a re-review.
- Never create a ticket or publish a verdict when `pr-fix` composes phases 1 through 5.
- Never publish without confirmation, unless the request explicitly says to post directly.
- Never claim GitHub mechanically blocks merging solely because a request-changes review was recorded.

## References

- [references/forges.md](references/forges.md) — forge detection and the GitHub/Bitbucket command
  parity table. Read in phase 1, before the first CLI call.
- [references/failure-classes.md](references/failure-classes.md) — the failure classes as
  questions to put to the diff. Read in phase 3.
- [assets/verdict-template.md](assets/verdict-template.md) — the verdict skeleton with its required
  slots for the internal audit. Completed in phase 5.
- [references/cases.md](references/cases.md) — behavioral cases with their expected verdicts,
  forge coverage, and the record of what they have never validated.
- [assets/comment-template.md](assets/comment-template.md) — proportional public summaries;
  the complete audit stays in `assets/verdict-template.md`.
