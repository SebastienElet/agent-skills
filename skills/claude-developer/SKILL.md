---
name: claude-developer
description: >
  Prepare manual implementation and correction prompts for Claude Code without invoking it. Use
  when the user asks Codex or Cursor to pass work to Claude or returns its result for another manual
  iteration. Make sure to intercept delegation requests even when the user does not ask for a
  prompt; never invoke Claude automatically.
metadata:
  category: dev
---

# Claude Developer

## Overview

Prepare a launch command and one self-contained prompt for a manual Claude Code handoff. The user
runs the command, pastes the prompt, and returns with the result when ready. Prompts select the
common implementation or bug-fix path under `orchestrate`, preserving checks, optional independent
review and the user's delivery limits.

## Usage

`$claude-developer <task or returned result>` — prepare an implementation or correction handoff.
Direct implementation requests without Claude stay with the current agent.

## Steps

1. Inspect repository instructions and the minimum read-only context needed for the handoff.
   Record unresolved facts instead of guessing.
2. Identify the intended existing worktree from the task context; verify its absolute path and
   branch with `git worktree list --porcelain`. Use the current worktree when the task targets it.
   If the intended worktree is missing or ambiguous, ask for its path before issuing a launch
   command; do not invent a path or create a checkout.
3. Write one prompt with the outcome, verified worktree path and branch (or detached HEAD), relevant
   facts, constraints, acceptance criteria, allowed scope, expected verification, and delivery
   report. Tell Claude to inspect before editing, preserve unrelated changes, and surface conflicts.
   Include the user's authorization limits; reserve consequential actions for the user unless
   explicitly authorized.
4. Select the common entry from the authorized intent: `implement` for a feature, refactoring or
   configuration change; `bug-fix` for a bug repair. For ticket-backed implementation or bug repair
   outside an existing correction workflow, compose `issue-start` and `issue-workflow` only if their
   verified context is missing, keeping tracker and forge distinct. Require Claude to retain the task owner
   through `orchestrate`, with implementation, checks and only requested or already required
   independent review. Forward the original scope and bounded local correction authority,
   preserve stricter user limits, and require the report's candidate, dispositions, evidence and
   incomplete outcomes. Do not duplicate the finishing procedure. A planning-only handoff uses
   `plan`; a local review-only handoff uses `code-review`; neither authorizes implementation.
   A correction already owned by `code-review-fix` or an authorized `pr-fix` retains that owner
   without restarting development or another repair loop. Infer no open-PR repair or publication
   authority from the handoff.
5. Return two fenced blocks in order: a `sh` block with the copyable one-line command
   `cd <shell-quoted absolute worktree path> && claude`, then a `text` block with the prompt to paste
   into that session. Substitute the verified path, quoting shell metacharacters safely. Repeat both
   blocks for every replacement or corrective prompt, then stop.
6. On a returned result, review only supplied evidence and explicitly authorized local state.
   Produce a corrective handoff only when the user requests another iteration; an unexecuted prompt
   revision replaces the previous handoff.

## Gotchas

- **Starting in the wrong checkout** — a bare `claude` uses the terminal's current directory;
  supply the verified absolute path and `&&` so a failed `cd` prevents launch.
- **Losing the manual handoff** — executing the command or starting another iteration removes the
  user's control; supply the two blocks and wait.
- **Trusting a returned summary** — it may omit defects or failed checks; inspect the available diff
  and evidence before making a verification claim.
- **Inventing a review requirement** — a handoff can impose an unrequested runtime or review;
  preserve only requested or already required reviews and the existing correction authority.

## Constraints

- Activate only for requests explicitly involving Claude Code, a manual handoff, or its returned
  result; intercept automatic Claude delegation as a manual handoff.
- During preparation, never invoke Claude, an automation wrapper, or another implementation agent;
  never create a branch or checkout, edit files, or validate the implementation.
- Never authorize commits, pushes, merges, deletion, publication, or permission bypasses unless the
  user's current request explicitly permits them.
- Produce at most one prompt per response and wait for the user before every subsequent iteration.
- Never require an unrequested final Codex review, treat a prompted review as observed evidence,
  or bypass the user’s repair limits.
- This is advisory policy, not a technical execution barrier. Never claim Claude's result is
  verified without reviewing the named evidence in its stated environment.
