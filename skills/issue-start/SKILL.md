---
name: issue-start
description: >
  Start or resume implementation from a Linear or GitHub issue. Use when the user asks to begin
  coding an issue or resume its pull request. Make sure to use this skill whenever implementation
  starts from an issue reference, even if the tracker is unnamed. Excludes status lookup, review,
  ticket drafting and planning without an implementation request.
compatibility: Requires Git and authenticated access to the selected tracker and forge.
metadata:
  category: dev
---

# Start Issue Work

## Overview

Identify executable work, recover its exact branch and pull request, and pass the verified context
to the ongoing implementation or bug task. Compose `issue-workflow` for provider policy and
`orchestrate` for continuity. Starting does not supply a second development or correction loop.

## Usage

`/issue-start <issue URL or identifier with tracker context>`

Examples: "Implement my assigned ENG-482 in its GitHub repository" or "resume the invoice project's
GitHub issue from its pull request". A request without a ticket returns to the existing task owner;
it does not require a tracker or create an issue.

## Workflow

1. **Load shared policy.** Apply `issue-workflow` and only its selected tracker and forge adapters.
   Independently establish tracker identity, issue target, repository identity from Git remotes,
   authentication and the rights needed for the next operation. Inspect the working tree and
   preserve existing work. Missing identity, repository mapping or eligibility blocks dependent writes.

2. **Establish executable state.** Read the issue's canonical identity, title, owner, state,
   parent, every direct sub-issue, blocking relations and structured work links. Apply the
   tracker's ownership policy; do not self-assign to make an issue eligible. Refuse terminal issues,
   active blockers and parents with open children. An unavailable relation surface is not an empty
   relation set. A request to work on a named sub-issue does not authorize executing its parent.

3. **Keep shaping separate.** When the issue is too broad or materially underspecified, return the
   missing preparation to the owner. `issue-spec` owns explicitly requested functional shaping;
   `plan` owns consequential implementation design within the existing mandate. Do not rewrite
   product scope merely to start work.

4. **Recover existing work before creating.** Inspect structured issue links and exact issue-to-PR
   associations, then inspect local/remote issue-prefixed branches and the verified forge
   before deriving a new name. Search exact source branches even when an attachment is absent
   or the issue title has changed. Inspect canonical PR URLs with explicit repository identity. Verify source repository,
   branch, target and state. Reuse one matching open PR and its exact source branch, preserving
   local edits. Multiple matches, conflicting associations, unrelated repositories, or a merged or
   closed-without-merge attached PR block a new branch or PR; report the facts instead of guessing.

5. **Start a branch only when ready.** Derive a lowercase kebab-case title slug with ASCII letters
   and digits, collapse separators, and use `work` if none remain. Use `issue-workflow`'s branch
   format. Inspect exact local and remote branches and their associations before reuse; branch
   name alone does not prove that another repository's same-numbered issue belongs here. Recheck
   eligibility. Once implementation will actually start, apply the supported start transition
   (Linear's team-local `In Progress`; GitHub stays open), then create or check out the branch
   without overwriting work. Independently verify any tracker write and local branch result.
   Record a partial failure; do not reverse someone else's update or repeat the whole sequence.

6. **Continue the authorized task.** Return the canonical tracker and forge identities, issue
   outcome, eligibility, branch/PR, acceptance criteria, decisions, available checks, remaining
   limits and next action under `orchestrate`. Route a bug through `diagnosing-bugs`, design needs
   through `plan`, and owned executable changes through `tdd` as applicable. Continue the existing
   authorized development; do not invent a new implementation skill, require Claude, or end the
   user's task because startup finished. Existing specialist invocation limits still apply.

7. **Associate a PR when publication is authorized.** Search again by exact source repository and
   branch across PR states before creation. Reuse the existing PR; terminal or ambiguous results
   need resolution rather than a second PR. Otherwise create once through the selected forge,
   independently retrieve its canonical URL and attach it through the tracker adapter. Recover an
   uncertain create response by reading remote state; an empty search after a timeout does not
   prove failure. If linking fails, retain the PR and retry only a safe missing link operation
   after rereading both systems. Read every stored link back. Do not publish merely because this
   step exists, and do not add closing keywords that bypass the completion-evidence policy.

## Gotchas

- **Trusting the active CLI context** — it can point at another repository; derive identity from
  Git and pass explicit targets to every forge operation.
- **Searching only attached URLs** — a failed prior link hides an existing PR; search exact source
  branches before creating, then repair the missing association.
- **Reusing a fork branch by name alone** — two source repositories can share a branch name;
  verify the head repository and issue association before checkout.
- **Updating progress before eligibility is known** — repository or permission failures leave false
  progress; finish read-only prerequisites before applying a start transition.
- **Retrying creation after link failure** — a second PR duplicates successful work; retain the
  canonical URL and recover only the failed association.

## Constraints

- Never start ineligible, blocked, terminal or non-executable parent issues, or silently change owners.
- Never substitute description text for required structured ownership, relations, hierarchy or state.
- Never create concurrent work while a resumable exact PR or branch already exists.
- Never make speculative writes on identity, repository, permission or association ambiguity.
- Never create another issue, branch or PR to hide an uncertain or partially successful operation.
- Never infer external publication authority from an implementation request or a skill return.
