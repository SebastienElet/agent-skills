# Native approval

Read this in step 8: evaluate the gate before asking the user, and run the procedure only after
their answer allows approval and before building the repair record. A
repository's own forge skill wins over these raw commands. `pr-verdict` never runs this procedure:
native approval belongs to the `pr-fix` invocation, not to the composed review.

## Gate

Approve only when every condition holds on one freshly read head SHA:

- the latest independent verdict is exactly `approved` and concerns that SHA;
- the required remote CI succeeded on that SHA, or the journal records that none is required;
- no correction, push or reconciliation remains pending;
- the user has not forbidden approval in this invocation or an earlier message about this PR;
- the authenticated account is not the PR author.

Approving additionally requires the user's explicit "publish and approve" or "approve only" answer
to the step 8 question, given for this SHA. A moved head voids the answer.

A failed condition records `approval: not performed — <condition>` in the journal's `Delivery` line
and skips the forge call.
`approved with reservations`, pending or failed CI and a moved head keep the repair pending exactly
as step 8 requires; a user prohibition, a user decline or own PR is a final outcome, not a pending
one.

## Commands

| Step               | GitHub (`gh`)                                                                           | Bitbucket Cloud (`bkt`)                                                                       |
| ------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Authenticated user | `gh api user --jq .login`                                                               | `bkt api /2.0/user` → `.uuid`                                                                 |
| PR author          | `gh pr view <n> --json author --jq .author.login`                                       | `bkt pr view <n> --json` → `.pull_request.author.uuid`                                        |
| Existing approval  | `gh api repos/{owner}/{repo}/pulls/<n>/reviews` → `.user.login`, `.state`, `.commit_id` | `bkt pr view <n> --json` → `.pull_request.participants[]` `.user.uuid`, `.approved`, `.state` |
| Approve            | `gh pr review <n> --approve --body-file approval.md`                                    | `bkt pr approve <n>`                                                                          |
| Withdraw           | not available to the reviewer; report instead                                           | `bkt api -X DELETE /2.0/repositories/{ws}/{repo}/pullrequests/<n>/approve`                    |
| PR state           | `gh pr view <n> --json state`                                                           | `bkt pr view <n> --json` → `.pull_request.state`                                              |

Observed on 2026-09-23 with `bkt` 0.32.1 against Bitbucket Cloud: the participant payload exposes
`role`, `approved` and `state: "approved"` per user, and the PR `state` stayed `OPEN` after the
reviewer's approval. The withdraw endpoint is the documented Cloud REST `DELETE …/approve`
(response 204); this skill has not exercised it. GitHub documents that authors cannot approve their
own pull requests and may dismiss an approval when a new commit lands. Bitbucket Data Center has not
been exercised: read `bkt pr view --help` and the actual payload before claiming an equivalent.

Pass the GitHub approval body through a file, one sentence in the PR's language naming the SHA and
pointing to the repair record; it is not a verdict. Bitbucket approval carries no body.

## Procedure

1. Re-read head SHA, required checks, PR state and the authenticated user. Evaluate the gate.
2. Read existing approvals. An approval by the authenticated account that binds the current SHA —
   GitHub `APPROVED` with `commit_id` equal to it, or Bitbucket `approved: true` read after the
   head was confirmed unchanged — is `already present`: record it and do not call the forge again.
   Bitbucket does not bind an approval to a SHA; record that the approval may predate this head.
   A GitHub approval on an older `commit_id` does not count; submit a new one.
3. Set `approval: requested on <SHA>` in `Delivery` before the forge call.
4. Call the native approve command once.
5. Read approvals and the head again, whatever the exit code. Record `confirmed` only when the
   authenticated account's approval is present and the head is still the approved SHA. On
   Bitbucket, record the reviewer approval and the PR state separately: `approved` describes the
   participant, while the PR stays `OPEN` until a separate merge.
6. A refusal records the forge's message: missing permission, own PR, closed or merged PR, or a
   merge check. Never publish a comment, task or reaction as a substitute for the refused action.
7. An ambiguous result — timeout, network error, unparseable output — is resolved by reading
   approvals before any retry. Retry the approve call only when the read shows no approval. If the
   read itself fails, keep `approval: uncertain` in `Delivery` and pause publication; never report it.
8. If the head moved between the gate and the confirmation, the approval may attach to a
   head no one reviewed. On Bitbucket, withdraw it, verify `approved: false` and re-anchor; a
   failed withdrawal or unreadable result is `uncertain` and is reported to the user as an approval
   that may cover a head no one reviewed. On GitHub, the review stays bound to its `commit_id`; report that
   it concerns the older SHA. Either way the moved head keeps the repair pending.

## Journal states

`requested`, `confirmed`, `already present`, `not performed — <reason>`, `refused — <forge
message>`, `uncertain — <failed read>` and `withdrawn — <reason>`. Each entry carries the account,
the SHA and the observation time in the evidence linked from `Delivery`; keep its current state on
that line. Only `confirmed` and `already present` may appear as an approval
in the repair record; every other state is stated as the absence of a native approval.

## Step 8 publication protocol

Read this protocol whenever step 8 continues past its verdict, CI and pending-correction checks.
The repair-record construction and publication rules below apply even when native approval is not
performed for an own PR, a user prohibition or a user decline, and when approval is already present.

When the [approval gate](#gate) holds, present these three items and
wait for the answer:

1. the independent verdict (`approved`), the head SHA and the SHA of the CI run;
2. the draft verdict comment, built from `pr-verdict/assets/comment-template.md` in the PR's
   language, written to the scratchpad and carrying its marker
   `<!-- pr-verdict:<pr>:<sha12> -->`;
3. the question "Publish this verdict, then approve?" in the user's language, with three
   answers: publish and approve, approve only, do nothing.

Never publish the verdict or approve before an explicit answer; the invocation of this workflow,
an earlier general authorization or silence is not one. The answer binds the presented SHA: after
it, re-read the head, and if it moved discard the answer and ask again on the new head. When no
user can answer, keep the journal pending, record the awaited answer and report it.

- **Publish and approve:** publish the draft through `pr-verdict/references/forges.md` (its
  marker lookup updates a same-head verdict in place), read it back, record its comment ID and URL
  in the journal, then approve. A failed or uncertain publication pauses the approval until a
  remote read by marker settles it.
- **Approve only:** approve without publishing the verdict.
- **Do nothing:** publish no verdict and do not approve; record `approval: not performed — user declined` in `Delivery`.

Use the journal's evidence for the publications permitted by this step. Update the PR description
only if the user explicitly authorized the presented evidence update on this same head; permission
to publish a verdict or approve alone does not authorize that description change.

Approve by applying the [native approval procedure](#procedure). Keep the current approval state in `Delivery`
and each transition in its linked evidence with account, SHA and time. A confirmed or already
present approval, a refusal, a user decline
or prohibition, or an own PR lets publication continue with that outcome stated; an uncertain or
withdrawn approval pauses it.
The approval never authorizes merging or adding the PR to a merge queue; each requires a
separate explicit request.

Build `assets/repair-record.md` from all journal passes in the PR's language: one opening sentence
with the final SHA, one short bullet per corrected problem, validation counts and limits, then
the independent verdict and the verified native approval state as separate lines.
Consolidate repeated fixes by their final outcome and omit superseded attempts; retain their
history and detailed mechanisms in the journal. Block publication if missing history prevents
an accurate cumulative summary. If nothing was corrected, no repair comment is needed; the
native approval still applies and its state is reported in step 9.

Search all existing comments for the stable marker `<!-- pr-fix:<pr> -->`. Update the matching
comment only when owned by the publishing account; otherwise keep publication pending and report
the ownership conflict. Create one only when none exists. For legacy `<pr>:<sha>` markers, reuse
the latest repair comment owned by the publishing account and replace its marker, preserving other comments
and replies. Pass the body through a file using `pr-verdict/references/forges.md` and save the
returned comment ID, URL and published SHA in `Delivery`. After a timeout or uncertain response,
re-read remote comments before retrying; if lookup fails, keep publication pending.
