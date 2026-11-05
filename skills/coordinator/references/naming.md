# Coordinator and unit naming

Use one coordinator per project in the existing main repository workspace, named exactly after the
repository. It supervises all authorized units, regardless of issue parent. Reconcile live work
before launching; do not create another coordinator for another batch. Resume legacy coordinators
and executors in place without renaming or relocating their resources. If multiple coordinators
already exist, identify their owned units and avoid duplicate writers; do not merge or stop live
sessions automatically.

## Names

| Resource                    | Rule                                                       | Example                      |
| --------------------------- | ---------------------------------------------------------- | ---------------------------- |
| Coordinator workspace       | Existing repository workspace on its native branch         | `shop-api`                   |
| Coordinator tab             | Existing coordinator tab                                   | `Coordinator`                |
| Executor worktree and agent | `a-<unit>` using its lead issue                            | `a-abc-124`                  |
| Helper agent                | Executor name plus `-review` or `-diag`                    | `a-abc-124-review`           |
| New executor initial tab    | `Agent`                                                    | `Agent`                      |
| Branch                      | `<ISSUE>-<subject>` under the `issue-workflow` prefix rule | `ABC-124-receipt-allocation` |

Use lowercase issue identifiers in resource names. Record every issue covered by a grouped unit in
the tracking table. Agents launched directly outside
this skill retain their existing naming. Keep coordination prefixes out of branches.

## Agent-name limits and collisions

Herdr accepts 1–32 characters matching `[a-z][a-z0-9_-]`, unique among live agents. Never truncate.
If the unit and intended helper role cannot fit, assign a short unit id and record its issue mapping
before launch. If that still cannot fit, block the launch and report the limit. On a collision, first
reconcile live agents, worktrees, branches and PRs; resume matching work. Only for confirmed distinct
work, append `-02`, then `-03`, before the helper role. Use the same executor name for its worktree
and workspace label. Never add a random suffix.

## Worktrees and linkage

Create executor worktrees with `herdr worktree create`; resume with `herdr worktree open` without
changing existing labels. Never use `git worktree add`. Label only a new executor's initial tab
`Agent`; preserve reused tabs. A helper uses an existing checkout unless its mandate requires
another, and never relabels a shared tab. Naming does not create, split, move or close tabs or panes.
Do not change Herdr configuration, install plugins or write pane metadata.

For each agent, record its coordinator name, exact workspace and pane IDs, session, role, unit and
all covered issues, short-id mapping if applicable, instance, absolute checkout and branch. For a
helper, record the exact executor it assists. After resumption or replacement, re-read live agent,
workspace, tab and pane IDs and cwd; update the row before sending input or relaunching.
