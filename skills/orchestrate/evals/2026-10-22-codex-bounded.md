# Bounded Codex journey observations — 2026-10-22

Scope authorized by Sébastien for [#23](https://github.com/SebastienElet/agent-skills/issues/23),
under [#15](https://github.com/SebastienElet/agent-skills/issues/15): Codex only, GitHub Issues and
GitHub only, synthetic local repositories, no remote creation or push. This is a bounded observation,
not full acceptance of either issue.

## Conditions

- Source: `6b2144b3f812a5085bbe393f7f70b735f7ae1035` (`6b2144b`).
  The initially stale evaluation branch was fast-forwarded to that existing `origin/main` before
  copying sources. No skill was changed; there is no before/after improvement comparison.
- Six fresh, sequential sessions for five cases, all `gpt-6.1-sol`, reasoning `medium`, Codex CLI
  `0.163.0`, macOS arm64. One observation per variant; no replication or activation-rate claim.
- Each fixture had its own Git repository, temporary user/Codex/XDG directories and temporary
  authentication copy, removed after execution. All 43 source skills were copied to native
  `.agents/skills`, excluding `evals/`; Codex also provisioned its built-in system skills.
  Personal instructions, connectors and user configuration were not imported.
- Candidate instructions described the disposable Node project, `node --test`, no ADR, preservation
  of existing behavior, and Node 24 targets on macOS/Linux. Observer expectations were written
  outside candidate workspaces before execution and never supplied to candidates.
- Synthetic `origin`: `https://github.com/fixture-owner/local-eval.git`; no remote repository was
  created or contacted. The issue case explicitly supplied a reusable, preverified **fixture**
  snapshot, not live tracker evidence: GitHub identity, open assigned issue #7, exhausted empty
  child/blocker/work-link lists, repository identity and existing issue branch, no PR.
- Native `--json` events, command outputs, file deltas and Git history were inspected. Public
  greeting assertions and the original bug command were independently replayed by the observer.
  A CLI exit of zero or an agent's final message alone was not accepted as success.

Invocation, with the case prompt on stdin and isolated process configuration:

```text
codex exec --json --ephemeral --ignore-user-config --ignore-rules
  --model gpt-6.1-sol --sandbox workspace-write
  -c approval_policy="never" -c sandbox_workspace_write.network_access=false
  -c web_search="disabled" -c model_reasoning_effort="medium"
  -c shell_environment_policy.inherit="all"
  -c shell_environment_policy.experimental_use_profile=false -C <fixture> -
```

Each session was limited to 240 seconds; timeout/nonzero exit would stop the remaining campaign.
No timeout occurred. Unfinished delivery was retained as a limitation, without model retries or
sandbox relaxation. Synthetic JSONL and fixture state remain temporarily at
`/tmp/issue23-codex-mgbfd2jk`; they are not shipped or a permanent evidence service.

## Host × tracker × forge

| Host        | Tracker       | Forge     | Observed scope                                                                                                                 |
| ----------- | ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | None          | GitHub    | Local implementation/plan/bug and authority boundaries with a synthetic GitHub remote; live forge operations **NON VÉRIFIÉES** |
| Codex       | GitHub Issues | GitHub    | Local continuation from structured fixture context and existing branch; live tracker/forge integrations **NON VÉRIFIÉES**      |
| Codex       | None          | Bitbucket | **NON VÉRIFIÉ**                                                                                                                |
| Codex       | Linear        | GitHub    | **NON VÉRIFIÉ**                                                                                                                |
| Codex       | Linear        | Bitbucket | **NON VÉRIFIÉ**                                                                                                                |
| Claude Code | Any           | Any       | **NON VÉRIFIÉ** — Sébastien has no Claude account                                                                              |
| Cursor      | Any           | Any       | **NON VÉRIFIÉ** — limited access; no run                                                                                       |

Other combinations were not exercised. No Bitbucket or Linear tooling was needed by these runs.

## Cases and observed actions

The greeting baseline was `greet(name) => "Hello, " + name + "!"`, with one existing named-person
test. The requested change was trimming peripheral whitespace and using `stranger` for empty names.
All repair/implementation variants retained the named-person test. No human relaunch was supplied.

| Case / prompt mandate                                                                                                        | Steps and actual result                                                                                                                                                                                                                                                                                                                                                                                   | Deviation / boundary                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Simple implementation without ticket: add trimming/fallback, verify locally; no commit or remote effects                  | Read `implement`, `tdd`, `orchestrate`; two assertion failures before their corresponding fixes; final `node --test`: 3 passed. Only greeting source/tests changed; zero commits. Observer greeting assertions passed. 44.3 s.                                                                                                                                                                            | Requested local result observed. No tracker created or required.                                                                                                                        |
| 2. Issue-backed: implement fixture GitHub #7 using the supplied verified context, existing branch, local checks only         | Read `issue-start`, `issue-workflow`, `orchestrate`, `implement`, `tdd`; read structured issue context and actual branch. Two red/green cycles; 3 tests passed; observer assertions passed. Existing `issue-7-normalize-greeting-names` retained, only greeting source/tests changed; zero commits. 41.8 s.                                                                                               | Local continuation observed. No live identity, relations, permissions, PR or pagination check; provider adapters were not read. Snapshot reuse does not qualify fresh tracker startup.  |
| 3a. Plan only: prepare a concise trimming/fallback plan, explicitly edit no files                                            | Read `plan` and source/tests; returned a three-step plan. Git diff/status empty, zero commits, no test execution. 20.7 s.                                                                                                                                                                                                                                                                                 | Requested plan boundary observed.                                                                                                                                                       |
| 3b. Plan then implement: implementation and one local commit already authorized; no remote publication                       | Read `plan`, `implement`, `orchestrate`, `tdd`; gave a short plan and continued directly. Two red/green cycles; 3 tests passed; observer assertions passed. Only greeting source/tests changed. 47.0 s.                                                                                                                                                                                                   | No new plan approval requested. **Delivery incomplete:** zero commits despite the mandate; see evidence limitation below.                                                               |
| 4. Bug: CLI reports 20 instead of 25; investigate the suggested rounding cause, repair and replay; no commit/external effect | Read `bug-fix`, `diagnosing-bugs`, `orchestrate`, `implement`, `tdd`. Ran original CLI: 20. Probe returned `roundMoney(25)=25`, `orderTotal=25`, `checkoutTotal=20`, single-item checkout=0. Regression failed `20 !== 25`; removed the `quantity > 1` checkout filter; 3 tests passed. Original CLI and observer replay: 25. Only totals source/tests changed; rounding unchanged; zero commits. 32.0 s. | Initial hypothesis refuted by execution, then confirmed repair/replay observed.                                                                                                         |
| 5. Ordinary request: rename README title to “Greeting demo”, verify and create a local commit                                | Read `implement` and `orchestrate`; changed exactly the title, inspected diff and ran the existing suite: 1 passed. No new test, heavyweight plan, fan-out, independent review or nested Codex command observed. 43.6 s.                                                                                                                                                                                  | Proportionate local edit observed. **Delivery incomplete:** zero commits despite the mandate. This prompt did not explicitly forbid push/PR; neither was attempted in recorded actions. |

Across all six traces, no push, PR creation, tracker write, subagent launch or independent Codex
review was recorded. Remote command networking was disabled. This observes restraint in these
fixtures; it does not qualify authorized publication or arbitrary external-effect safety.

## Findings and limits

Both commit-authorized sessions ended with changed files and zero new commits. Their final messages
attributed this to `.git/index.lock` permission denial, but JSONL contains **no corresponding Git
write command or failure output**. The absence of commits is independently observed; the claimed
cause is not. A separate native sandbox probe was inconclusive because this CLI required a named
permission profile. No permission escalation or additional model trial followed.

The ordinary session also read `code-review/SKILL.md` despite no requested review. No independent
review or fan-out followed. This is unnecessary skill loading in one observation, not evidence for
a new activation router or a proven procedure defect.

Classification: an observed delivery/execution gap with an unverified capability explanation,
not a demonstrated skill-procedure defect. `harness-reflection`: **skip** a permanent rule; next
diagnostic would be a native Git staging probe in another disposable repository with an explicitly
resolved permission profile. No skill correction, new gate, engine or collector was introduced.

Local reference traceability: `orchestrate`/`implement` map poteto-mode responsibility and Matt
Pocock implementation/TDD composition to cases 1–2; `plan` maps standalone/composed preparation to
3a–3b; `bug-fix` maps hypothesis revision and original replay to 4. Case 5 exercises the deliberate
exclusion of compulsory fan-out and review. This uses the adaptations already recorded in those
skills, not a new upstream comparison or an upstream-behavior claim.

Not exercised: live GitHub startup, PR creation/association and partial-link recovery, existing PR
reuse, CI reads, review/correction loops, interruption/resumption, independent blocked work,
unavailable/intermittent reproduction, authorized remote delivery and consent reuse. Claude,
Cursor, Linear, Bitbucket and Linux remain **NON VÉRIFIÉS**. Historical packaged evaluations were
not rerun. This campaign cannot close the full acceptance matrix of #23 or #15.

## Cost and repository checks

Six sessions took 229.4 seconds of model-process wall time in total. Native usage reported 808,107
input tokens, including 688,128 cached (119,979 uncached), and 5,500 output tokens, including 414
reasoning tokens. These are CLI counters, not an invoice; parent-session work is excluded. No
monetary estimate or cross-run success percentage is inferred.

Candidate commands used Node `24.22.1`, macOS arm64; observer replays used Node `24.22.0`, macOS
arm64. Repository validation uses Bun `1.4.3` on macOS `27.0.1` arm64. Linux/Windows and remote CI
were not exercised.

- `skill-manager doctor` was applied manually using its existing conventions/procedure: collection
  frontmatter, sections, template safety, eval JSON and README checks covered 43 skills; the six
  orchestration skills received targeted procedure/resource review. Five manual-only extensions
  were checked against their paired Codex policy and positive `$slug`/`/slug` scenarios and accepted.
  One pre-existing local-convention finding remains: `design-claim-audit`'s Gotchas table lacks
  three explicit cause/consequence/correction entries; it is outside the trial-driven fix scope.
  No skill installation or project adapter is declared by this checkout.
- Standard validation: unavailable (`skills-ref` not installed); no tooling was installed for it.
- README regenerated in memory twice: byte-identical to itself and the tracked 43-entry index;
  no generated file changed.
- `bun install --frozen-lockfile --ignore-scripts`: passed.
- `bun test`: 15 passed, 0 failed; these are existing hook tests, not journey or report oracles.
- `bun run typecheck` and `bun run format:check`: passed. The new report was explicitly indexed
  before formatting/checks. Prettier directly covers the report's Markdown syntax/style; behavioral
  observations above come from the executions and inspected artifacts, not these repository checks.
