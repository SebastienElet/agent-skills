# Hierarchical naming

Applies to new launches only. Never rename an existing agent, tab, worktree, branch or PR.
The examples are fictional: coordination `c-abc-123`, repositories `shop-api` and `shop-web`.

## Names

| Resource    | Rule                                                                                   | Example                             |
| ----------- | -------------------------------------------------------------------------------------- | ----------------------------------- |
| Coordinator | `c-<issue>` names the agent; its existing tab label changes only if the mandate allows | `c-abc-123`                         |
| Sub-agent   | `<coord>-<role>-<unit>`; role is `exec`, `review` or `diag`                            | `c-abc-123-exec-abc-124`            |
| Tab         | Label the worktree's initial tab with the agent name                                   | `c-abc-123-exec-abc-124`            |
| Worktree    | `<worktrees-root>/<repo>/<unit-issue>`, short name                                     | `<worktrees-root>/shop-api/abc-124` |
| Branch      | `<ISSUE>-<subject>` under the `issue-workflow` prefix rule                             | `ABC-124-receipt-allocation`        |

The coordinator name never appears in a branch.

## Agent-name limits

Herdr accepts 1-32 characters matching `[a-z][a-z0-9_-]`, unique among live agents.

1. Build the name from the rule above. Never truncate it.
2. If it exceeds 32 characters, give the unit a short id (`u01`, `u02`) and record the mapping
   to its issue in the tracking table. The name becomes `c-abc-123-exec-u01`.
3. On a duplicate, first reconcile live agents, worktrees, branches and PRs: a collision may mean
   existing work to resume. Only when it is confirmed distinct, append a numeric suffix
   (`-02`, then `-03`). Never append a random suffix. Apply the same `-02` rule to a duplicate
   worktree path.

## Worktrees

1. Create with `herdr worktree create`; resume an existing branch or PR with
   `herdr worktree open`. Never use `git worktree add`.
2. The coordinator stays in its existing worktree workspace. Units use the worktree's initial
   terminal; naming never creates, splits, moves or closes a tab or pane. Cleanup uses the native
   worktree operation.
3. A reviewer or diagnosis helper gets no checkout of its own by role alone; it uses an existing
   checkout, typically that of the executor it assists, unless the mandate states another need.

## Linkage

Do not write pane metadata or tokens (`pane report-metadata`); keep the sidebar minimal.
Parent linkage is the agent name plus the coordinator tracking table. For every agent, record:

| Field               | Content                                                           |
| ------------------- | ----------------------------------------------------------------- |
| Parent coordinator  | name, pane id, Herdr session                                      |
| Role                | `exec`, `review` or `diag`; for a helper, the executor it assists |
| Unit                | issues covered; short id and its mapping when one was assigned    |
| Instance            | `-02` or higher when a duplicate was created, otherwise first     |
| Checkout and branch | absolute path, exact branch                                       |

## After a resume or replacement

Re-read the agent name, workspace/tab/pane ids and cwd from live Herdr and update the row.
Do not assume a previous alias or pane still exists; a replacement keeps the unit and takes the
next instance suffix only after the reconciliation above.
