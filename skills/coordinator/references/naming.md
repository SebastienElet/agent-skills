# Hierarchical naming

Applies to new coordinations and launches. Preserve existing coordination names and layout unless
the user explicitly requests renaming. The examples are fictional: parent issue `ABC-123`,
unit issue `ABC-124`, repository `shop-api`. Use lowercase issue identifiers in resource names.

## Names

| Resource             | Rule                                                                       | Example                      |
| -------------------- | -------------------------------------------------------------------------- | ---------------------------- |
| Coordinator worktree | User creates `c-<parent>` manually; keep its workspace and checkout        | `c-abc-123`                  |
| Executor worktree    | `<worktrees-root>/<repo>/a-<parent>-<unit>`; use the basename as its label | `a-abc-123-abc-124`          |
| Coordinator agent    | `c-<parent>` when assigning a new name; retain an existing live name       | `c-abc-123`                  |
| Executor agent       | `a-<parent>-<unit>`                                                        | `a-abc-123-abc-124`          |
| Helper agent         | `a-<parent>-<unit>-<role>`; role is `review` or `diag`                     | `a-abc-123-abc-124-review`   |
| Initial tab          | `Coordinator` for the coordinator; `Agent` for an executor                 | `Coordinator`, `Agent`       |
| Branch               | `<ISSUE>-<subject>` under the `issue-workflow` prefix rule                 | `ABC-124-receipt-allocation` |

The parent identifies the coordinated batch, not the current child. The unit is its lead issue;
record every issue covered by a grouped unit in the tracking table. A single-issue coordination
uses that issue as both parent and unit. Keep coordination prefixes out of branches. Agents
launched directly outside this skill retain their existing naming.

If the user supplied coordinator worktree `c-abc-123-02`, carry its instance immediately after
the parent in every new executor worktree, workspace label and agent name:
`a-abc-123-02-abc-124`. Its helpers use that executor name plus their role. Thus replacing the
leading `a-` with `c-` and removing the unit and helper suffixes recovers the coordinator label.
Verify this association against the mandate before launching; never infer another parent issue
from an instance suffix.

## Agent-name limits

Herdr accepts 1-32 characters matching `[a-z][a-z0-9_-]`, unique among live agents.

1. Build the name from the rule above. Never truncate it.
2. If it exceeds 32 characters, give the unit a short id (`u01`, `u02`) and record the mapping
   to its issue in the tracking table. The name becomes `a-abc-123-u01`, with a helper role when
   needed. Choose a short id before the first executor launch, accounting for intended helper
   roles and instance suffixes; keep it across the worktree, agent and subsequent helpers. If a
   later launch cannot fit the established unit id, or the parent, role or instance suffix still
   prevents a valid name, block that launch and report the limit instead of changing its identity.
3. On a duplicate, first reconcile live agents, worktrees, branches and PRs: a collision may mean
   existing work to resume. Only when it is confirmed distinct, append a numeric suffix
   (`-02`, then `-03`). Never append a random suffix. Apply the same `-02` rule to a duplicate
   worktree path and its label. An executor's instance suffix precedes a helper role, for example
   `a-abc-123-abc-124-02-review`, so the assisted executor remains identifiable.
   A duplicate coordinator agent name never allocates a new coordination instance automatically:
   reuse the verified coordination or report the conflict with the user-supplied worktree identity.

## Worktrees

1. The user prepares the coordinator worktree manually. Keep the coordinator there; never create
   or relocate its checkout automatically. Verify the parent issue against the mandate. A
   `c-<parent>` workspace referring to another batch blocks new launches until reconciled.
   Resume older coordinations in place even when their workspace predates this convention.
2. Create executor worktrees with `herdr worktree create`, passing the derived path and label;
   resume an existing branch or PR with `herdr worktree open` without changing its existing label.
   Never use `git worktree add`. For a new coordination, label only the coordinator's current tab
   `Coordinator`; label only a newly created executor worktree's initial tab `Agent`. Reused
   executor tabs retain their names unless renaming is explicitly requested. Naming creates,
   splits, moves or closes no tab or pane. Cleanup uses the native worktree operation.
3. A reviewer or diagnosis helper gets no checkout of its own by role alone; it uses an existing
   checkout, typically that of the executor it assists, unless the mandate states another need.
   Helpers never relabel a shared tab. A new helper assisting a legacy executor still uses
   `a-<parent>-<unit>-<role>`; record the assisted executor's exact legacy name in its tracking row.

## Finding the coordinator

In the Spaces list, `c-abc-123` identifies the coordinator and `a-abc-123-abc-124` identifies one
of its executors. Find `c-abc-123` to return to that coordinator. An executor named
`a-abc-123-02-abc-124` belongs to `c-abc-123-02`. For a legacy coordination, use the exact parent
workspace recorded in the table.
The Agents panel can show workspace and tab on separate rows: the workspace carries the
association and the tab carries the role. This is a naming convention, not a nested sidebar or a
navigation action. Do not change the user's Herdr configuration or install a plugin from this skill.

## Linkage

Do not write pane metadata or tokens (`pane report-metadata`); keep the sidebar minimal.
Parent linkage is the agent name plus the coordinator tracking table. For every agent, record:

| Field               | Content                                                           |
| ------------------- | ----------------------------------------------------------------- |
| Parent coordinator  | name, exact workspace label and id, pane id, Herdr session        |
| Role                | `exec`, `review` or `diag`; for a helper, the executor it assists |
| Unit                | issues covered; short id and its mapping when one was assigned    |
| Instance            | `-02` or higher when a duplicate was created, otherwise first     |
| Checkout and branch | absolute path, exact branch                                       |

## After a resume or replacement

Re-read the agent name, workspace/tab/pane ids and cwd from live Herdr and update the row.
Do not assume a previous alias or pane still exists; a replacement keeps the unit and takes the
next instance suffix only after the reconciliation above.
