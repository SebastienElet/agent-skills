# User Skills

This directory is the canonical source for user-scoped agent skills.

## Conventions

- One skill per subdirectory.
- Each skill must include a `SKILL.md` file.
- Optional folders: `agents/`, `scripts/`, `references/`, `assets/`, `evals/`.
- Manage skills with `/skill-manager`.

## Dev

| Skill                           | Description                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `agent-instructions`            | Maintain coding-agent instructions and their discovery paths.                                                       |
| `assertledger`                  | Qualify committed Git/JS `node:test` regressions; replay AssertLedger evidence.                                     |
| `bug-fix`                       | Carry a bug through reproduction, confirmed cause, repair, replay and authorized delivery.                          |
| `claude-developer`              | Prepare manual implementation and correction prompts for Claude Code without invoking it.                           |
| `code-enforcement`              | Write code whose purpose is to refuse: hook, guard, validator, permission check, lint rule, CI gate.                |
| `code-review`                   | Review a local diff for standards and requirement compliance.                                                       |
| `code-review-fix`               | Repair local code-review findings before delivery.                                                                  |
| `code-simplify`                 | Simplify code to reduce understanding and maintenance costs.                                                        |
| `codebase-design`               | Design cohesive modules with simple public interfaces.                                                              |
| `design-claim-audit`            | Audit architectural and domain guarantees.                                                                          |
| `design-taste-frontend`         | Art direction and visual critique for frontend pages and app screens.                                               |
| `diagnosing-bugs`               | Diagnose bugs and performance regressions.                                                                          |
| `harness-reflection`            | Turn repeated agent failures into evidence-backed harness improvements.                                             |
| `implement`                     | Carry an authorized feature, refactoring or configuration change through implementation, verification and delivery. |
| `improve-codebase-architecture` | Survey architectural friction and present improvement candidates.                                                   |
| `issue-creation`                | Draft, validate, review, and publish tracker issues across forges.                                                  |
| `issue-start`                   | Start or resume implementation from a Linear or GitHub issue.                                                       |
| `issue-sync`                    | Reconcile Linear or GitHub Issues with GitHub or Bitbucket pull-request facts.                                      |
| `issue-workflow`                | Apply shared issue execution and completion policy.                                                                 |
| `orchestrate`                   | Preserve task ownership and state across skill transitions.                                                         |
| `plan`                          | Prepare an architecture or actionable development plan.                                                             |
| `pr-feedback`                   | Collect evidence-backed review feedback and reviewer-authored fixes from merged pull requests.                      |
| `pr-fix`                        | Repair an open pull request after an independent merge review.                                                      |
| `pr-verdict`                    | Deliver a PR verdict on an open pull request, yours or another author's.                                            |
| `prepare-next`                  | Select and prepare the next available project ticket before development.                                            |
| `requirements-clarification`    | Resolve undecided requirements within delegated authority.                                                          |
| `tdd`                           | Develop owned behavior with test-driven development.                                                                |
| `visual-explanation`            | Explain relationships, diagnostics and changes visually.                                                            |

## Product

| Skill            | Description                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| `grill-me`       | Challenge an idea through a requested design interview.                   |
| `grilling`       | Run a design interview by dependent decisions.                            |
| `issue-simplify` | Simplify GitHub or Linear issues and drafts.                              |
| `issue-spec`     | Prepare Linear or GitHub development issues as functional specifications. |
| `to-spec`        | Synthesize the current conversation into a functional specification.      |
| `wayfinder`      | Map a large effort as dependent decisions across sessions.                |

## Ops

| Skill                 | Description                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| `harness-simplify`    | Simplify a real harness workflow.                                                                |
| `obsidian-retrieval`  | Retrieve read-only knowledge from Obsidian vaults or local Markdown corpora with rg.             |
| `output-discipline`   | Shape responses so decisive information and next actions are easy to find.                       |
| `prose-edit`          | Revise existing prose while preserving the writer's voice and meaning.                           |
| `skill-manager`       | Manage user and project skills: create, doctor, fix, cross-check, and sync their README indexes. |
| `skill-simplify`      | Simplify an identified skill's content.                                                          |
| `things-tasks`        | Manage Things 3 tasks, projects, and areas through the thangs CLI.                               |
| `workflow-automation` | Turn evidenced repeated human or agent workflows into supported automation.                      |
