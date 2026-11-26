# PR repair journal template

Keep one local journal per canonical PR URL at the path defined in `SKILL.md`. Reload it across
sessions and retain it outside Git after publication. Link raw evidence rather than copying it:
commands, exit statuses, counts, tested head/base refs and SHAs, environment, limits, review policy and history,
and approval transitions with account, SHA and time. Keep linked evidence available across sessions.

## Skeleton

```markdown
# Repair journal

PR: <canonical URL; source repository:ref>
Owner: <single repair owner>
Authority: <request source and limits on edits, commits, push, publication, approval and merge>
Current head: <SHA>
Status: <in progress | pending validation | pending approval | pending publication | published>
Pending: <remaining work, disagreements, decisions or history gaps; none when complete>
History: <recovered | partial | unknown; attributable evidence, scope and gaps>
Correction passes: <verified earlier passes; current execution and observed passes>
Limits: <applicable human or resource limits; remaining resources and recovery charged by mechanism>

## Corrections

- <SHA; prepared | pushed | reverted | superseded | skipped> — <failure mechanism → outcome, or omission reason>; proof: <red → green or refutation, evidence link>.

## Findings

- <mechanism and scope> — <disposition, evidence and applicable lift condition or follow-up draft>.

## Passes

- <pass number, date, starting SHA → resulting SHA> — <isolated worktree path; slate scope and mechanisms>; <barrier tier and review result>; proof: <one-sentence result, evidence link>.

Description: <draft and candidate; presented head, full raw body snapshot and diff; authorization and publication status>

Delivery: <SHA; verdict; CI result/link or none required; approval state/account/time; PR state; comment ID/URL@published SHA or pending; evidence link>
```

## Resume checks

- Verify PR/source/head against the forge; recover authority, pending work and consumed passes.
  Persist the charged pass before its first correction write; resume an interrupted slate without
  charging it twice. Preserve history gaps, applicable limits and recovery by mechanism.
- Reconcile uncertain pushes, comments by stable marker, and approvals before retrying.
- Retain evidence on its original head/base; a new head needs current review, CI and approval.
