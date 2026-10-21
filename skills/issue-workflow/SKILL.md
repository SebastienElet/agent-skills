---
name: issue-workflow
description: >
  Apply shared issue execution and completion policy. Use when an issue execution skill composes
  it or when verifying merged work against acceptance evidence. Make sure to use this skill
  whenever starting, resuming, verifying or finishing Linear or GitHub Issues work, even if only
  an issue reference is given. Excludes product specification and simple status lookup.
compatibility: Requires access to the selected tracker and repository forge, independently.
metadata:
  category: dev
---

# Issue Workflow

## Overview

Keep tracker facts separate from Git and pull-request facts. Support Linear and GitHub Issues as
trackers, and GitHub and Bitbucket as repository forges. The composing workflow owns its procedure;
this skill owns shared policy and the explicit verification pass for merged work. Neither a tracker
state nor a merge proves acceptance criteria.

## Usage

Load `issue-workflow` alongside `issue-start` or `issue-sync`. Do not invoke it alone to shape,
implement or review an issue. An explicit request to verify merged work enters the verification pass
in [completion evidence](references/completion-evidence.md). Without a ticket, return to the task
owner under `orchestrate`; do not require tracker access or create an issue to continue.

## Steps

1. Resolve the tracker from the supplied issue and verified workspace or repository context. A
   GitHub issue number needs its host and owner/repository; a Linear identifier needs its workspace.
   Resolve the forge separately from the relevant Git fetch and push remotes, never from the tracker.
   Conflicting remotes or repository mappings block dependent writes.
2. Read [tracker transports](references/transports.md). For GitHub forge operations read
   [GitHub operations](references/github.md); for Bitbucket read
   [Bitbucket operations](references/bitbucket.md). Probe only the selected providers. Verify each
   identity, target, required read field and write permission; one provider's credentials prove
   nothing about another. Missing write access need not prevent an authorized read-only result.
3. Read ownership, current state, hierarchy, blockers and exact work links from structured tracker
   data. Exhaust relevant relation and child pages. Apply the selected tracker's ownership and
   lifecycle policy in the transport reference. Missing required fields or permissions are unknown,
   never empty relations or permission to self-assign. Recheck eligibility before starting work.
4. Read branches from Git and pull-request state, source repository/branch, target, canonical URL
   and checks from the selected forge. A title match never establishes an association. Distinguish
   open, merged, closed without merge, missing and inaccessible pull requests.
5. Before changing evidence or completing from merged work, read
   [completion evidence](references/completion-evidence.md). Its evidence semantics apply to both
   trackers; its dated Linear guard observations apply only to that transport. A required
   conditional write that is unavailable blocks that write, not classification or independent work.
6. On an explicit verification request, run that reference's verification pass. Otherwise return
   facts, decisions, evidence, partial effects and the next authorized action to the composing owner
   through `orchestrate`. Use `plan` only when consequential design preparation is needed; do not
   turn lifecycle maintenance into implementation, review or product analysis.

## Gotchas

- **Deriving the forge from Linear or a GitHub issue** — the tracker can describe another forge;
  resolve the working repository from Git and verify its identity independently.
- **Carrying Linear state names into GitHub** — invented review or progress states block ordinary
  Issues work; keep GitHub open and report the review or verification queue without requiring Projects.
- **Reading only assigned children** — an unassigned open child disappears and a parent closes
  early; inspect every direct child's structured state, while mutating only eligible candidates.
- **Equating issue and PR granularity** — sub-issues impose artificial review boundaries; allow a
  shared PR only with exact associations for each issue.
- **Treating merge or closure as evidence** — unchecked criteria disappear without a run; retain
  their status and report every unproven line.

## Constraints

- The selected tracker owns issue facts; Git and the selected forge own branch and PR facts.
- Never infer identity, rights, blockers, hierarchy or workflow state from prose when structured
  fields are required, or assign an issue implicitly to bypass eligibility.
- Never execute a parent while any direct sub-issue remains open.
- Name new Linear work branches `<ISSUE-ID>-<slug>` and GitHub work branches `issue-<number>-<slug>`;
  retain the full tracker identity in the handoff and verify every branch association.
- Never require a separate PR for every sub-issue, or an unrelated forge's client or credentials.
- Never derive checkbox state from workflow state or a merge. Check only evidence a named run proves.
- Never write a description-dependent state without the verified conditional mechanism required by
  completion evidence; never complete a parent through a read followed by an unconditional write.
- Never invent GitHub workflow states, impose Projects, or treat a closed issue as proof of acceptance.
- Never infer push, PR publication, approval, merge or tracker-write authority from skill activation.
