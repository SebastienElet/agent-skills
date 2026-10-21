---
name: issue-sync
description: >
  Reconcile Linear or GitHub Issues with GitHub or Bitbucket pull-request facts. Use when the user
  manually asks to synchronize lifecycle state or repair missing work links. Make sure to use this
  skill whenever that reconciliation is requested, even if no provider is named. Excludes code
  review, implementation and producing acceptance evidence.
compatibility: Requires authenticated access to the selected tracker and forge for the requested operations.
metadata:
  category: dev
---

# Synchronize Issues

## Overview

Reconcile existing issue state and exact work links with forge facts. This is a manual lifecycle
workflow. It neither reviews implementation nor runs acceptance checks, and it never converts a
merge into proof of criteria.

## Usage

`/issue-sync <tracker scope or issue references>`

Use explicit tracker scope and the verified working repository. A canonical attached PR URL can
identify another repository; verify that repository independently. Return applied changes, repaired
links, work awaiting verification, relevant already-synchronized issues and unresolved inconsistencies.

## Workflow

1. **Load policy and resolve targets.** Apply `issue-workflow`, its selected tracker transport,
   forge adapter and completion-evidence rule. Verify each identity, target, permissions and
   required field. Resolve the forge from Git, not the tracker; inspect only the selected providers.

2. **Read bounded candidates.** For Linear, retrieve issues assigned to the authenticated identity.
   For GitHub, use the explicit repository/issue scope and established ownership policy; do not
   expand a named scope into a global backlog. Exhaust pages for candidates, direct children,
   blocking relations and links, and retrieve descriptions needed for completion classification.
   An unassigned child can inform a parent's eligibility but is not thereby a mutation candidate.
   Stop only operations whose required facts are unavailable; never infer empty relations.

3. **Resolve exact associations.** Prefer structured canonical PR links or metadata identifying
   both full issue identity and PR. Otherwise inspect an exact issue-prefixed source branch using
   the branch formats in `issue-workflow`, confined to the verified repository and issue-to-repository
   mapping. A GitHub number alone is not globally unique. Verify source repository, branch, target,
   state and canonical URL. Record zero, one and multiple matches separately. Titles only locate
   candidates for reporting; ambiguity authorizes no link or lifecycle write.

4. **Repair certain links.** For a single proven association lacking its canonical link, reread the
   tracker links and use its supported association mechanism once, then independently verify the
   stored result. If a write times out or fails after a forge success, preserve that success and
   inspect remote state before retrying only the safe missing operation. Never create a PR or issue
   from synchronization. Report an unsupported link mechanism rather than substituting duplicate
   comments or a destructive body rewrite.

5. **Route leaves from PR facts and existing evidence.** Read the PR from its forge. For an open
   PR, Linear uses the issue team's verified review state; GitHub Issues stays open and is reported
   as under review. A merge proves landing only. Classify acceptance/evidence sections through
   `completion-evidence.md`: all verification boxes checked, or no evidence section, makes completion
   eligible; unchecked boxes or evidence prose without recorded state leaves verification pending.
   Linear's pending destination is its team-local `In Progress`; GitHub stays open. Every merged
   transition dependent on the description, including completion with no evidence section, needs
   that reference's verified conditional write. Without it, report the classification and leave
   state untouched. Never check a box here. Independently verify any applied transition. A closed
   without merge, missing or inaccessible PR proves no completion; report it without resetting state.
   Several issues may share a PR only when every association is exact.

6. **Assess parents bottom-up.** After verifying any leaf changes, reread each eligible parent and
   every direct child's structured state. All children complete makes the parent eligible, not
   proven. Apply its own evidence policy too. Auto-completion additionally requires a documented,
   verified atomic mutation conditional on all direct children remaining complete at write time.
   A separate read then update does not qualify; absent that capability, leave the parent untouched
   and report eligibility for human decision. Never infer child state from task-list prose.

7. **Surface inconsistencies without speculative repair.** For active work explicitly mapped to
   the repository, search exact links, PR source branches across states and remote branches.
   Missing work in this repository says nothing about an issue with no repository mapping. Report
   conflicting or missing facts without moving an issue to backlog or completion. If GitHub has
   already closed an issue automatically while criteria remain unproven, report closure and residue;
   do not mark boxes, silently reopen it or accept that closure as evidence.

8. **Return the reconciliation.** Name each applied change and independent read, missing capability,
   partial failure, unproven criterion and necessary decision. Keep verification pending distinct
   from code review and completion eligibility distinct from an applied transition. Return to the
   existing owner through `orchestrate`; synchronization ends without a new review or implementation
   loop. Do not add automation; assess it only from observed repeated usage if relevant.

## Gotchas

- **Using Linear review state names on GitHub** — ordinary Issues has no such state;
  leave the issue open and report its queue without imposing Projects.
- **Matching titles or a bare issue number** — another repository's work is linked or closed;
  require the full issue identity and verified repository mapping.
- **Closing from assigned children only** — an unassigned open child disappears; inspect every
  direct child while keeping mutation scope unchanged.
- **Treating a post-write read as atomicity** — evidence or children can change during the write;
  require the relevant conditional mechanism or leave state untouched.
- **Retrying the whole reconciliation** — successful links can be duplicated; recover current
  remote state and retry only safe missing operations.
- **Tidying boxes after a merge** — the missing check is erased; preserve markers and report residue.

## Constraints

- Never mutate outside verified scope, ownership policy and the user's authorized effects.
- Never inspect diffs, review code, rerun acceptance checks or invoke a review skill here.
- Never check, uncheck, reword or remove acceptance evidence during synchronization.
- Never complete merged work over unproven evidence without an explicit human acceptance decision.
- Never write from ambiguous associations or unavailable eligibility fields.
- Never complete a parent through a read followed by an unconditional update.
- Never introduce hooks, schedules, an implicit trigger or a replacement synchronization CLI.
