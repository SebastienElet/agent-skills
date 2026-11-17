# Verification outcomes

Apply this procedure when a selected check fails or its execution is unavailable. Keep the check's
actual result separate from defect attribution and from permission to deliver.

## Establish the result

1. Record the exact candidate and fetched target SHAs, command, inputs, environment, exit status
   and failure signature. A timeout, missing runtime, denied access or incomplete output establishes
   no application failure or success. Preserve the work and investigate within the existing budget.
2. For an observed failure, run the same check on the target base and candidate in disposable
   checkouts, with the same inputs, toolchain and relevant environment. Preserve staged, unstaged,
   untracked and ignored work in the caller. Compare the failing assertion or diagnostic, not just
   a nonzero exit code. An unavailable or incompatible comparison leaves attribution unknown;
   a nearby ticket or green narrowed check cannot establish a base defect.
3. Classify each failure separately. A check may reveal both an existing defect and a regression:

   | Observation                                                            | Conclusion and next action                                                         |
   | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
   | Same failure reproduced on base and candidate                          | Existing base defect reproduced; retain both failures and the dependency.          |
   | Base passes and candidate fails, or the candidate adds another failure | Candidate regression; repair within scope and rerun affected checks.               |
   | Required execution cannot start or finish                              | Verification unavailable; name the missing capability and replay steps.            |
   | Missing, incompatible or ambiguous observations                        | Unknown result or attribution; obtain the missing observation or retain the limit. |

4. Keep mandatory gates intact. A reproduced base defect does not waive the gate or make the
   candidate green. Deliver only to a stage whose policy permits that result. When both mandate
   and repository permit a progress push or draft PR, publish the preserved work with the failed
   check, paired reproduction, dependency ticket/PR when known and precise readiness condition.
   Otherwise stop only the dependent delivery. Never exclude, skip, weaken or silently narrow a
   failing check to claim success; continue independent authorized work.

## Obtain a missing proof environment

Use the repository's supported setup to start a disposable private environment when authorized.
Verify ownership before creating or cleaning resources. Do not rebuild or modify a shared image,
container, database or other shared resource to obtain proof. An occupied resource does not become
available merely because the investigation budget expired.

If private setup is forbidden, unavailable or fails, retain the proof as unperformed with the setup
error, missing capability and exact replay steps. Continue independent work and permitted progress
delivery; a mandatory environment-dependent gate still blocks the stage it protects. Do not ask
which environment to use when the repository already supplies an authorized private path.

## Investigate an unmerged third-party fix

When a known unmerged PR may fix the base defect, first verify its repository, target and exact
head. If local composition is permitted, create a disposable branch/worktree from that head and
apply the candidate's delta there without changing the delivery branch. Record the composition's
inputs and conflicts, then run the relevant checks in the same environment. If composition or
execution fails, preserve that result without altering the original candidate to make it pass.

Label any successful result **indicative composition evidence**: it belongs to the combined tree,
not to the original candidate. Verify the delivery branch and outgoing ancestry remain unchanged
by the experiment. Remove only the experiment's owned worktree and branch, including on failure;
report cleanup failure without forcing deletion of unknown work. Never merge or copy the third
party's fix into the outgoing PR. Leave a concrete resumption condition, such as the fix merging
into the target followed by target integration and the original gate replay. Do not monitor an
unmerged PR indefinitely or spend the remaining task budget waiting for it.

## Handle external access failures

Report an authentication, token or permission failure once with the affected operation and saved
work. Stop repeating that failed operation until credentials or another relevant condition changes;
do not request broader permissions merely to support an unnecessary claim. An inaccessible branch
protection remains unknown, not absent and not a universal prerequisite for a push or draft PR.
Preserve local drafts and continue independent authorized work. A required remote proof remains
pending or unavailable until observed; a local success cannot stand in for it.
