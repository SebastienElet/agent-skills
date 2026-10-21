# Issue workflow scenarios

Offline fixtures for the current family. These expected decisions are not executed provider writes
or cross-host qualification. Historical runs under `2026-09-16/` retain the old skill names and
observations; moving them here does not qualify the renamed family.

## Provider combinations

For each row, supply complete structured identity, permissions, blockers, hierarchy and repository
mapping. The issue is open, eligible under the stated ownership policy, with no active blocker or
open child. Only the named providers are available.

| Tracker                              | Forge                             | New work                                                                                           | Resume existing work                                                                        |
| ------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| GitHub Issues, current user assigned | GitHub, no `bkt` or Linear access | Verify issue host/repository independently of code remote, use `issue-42-export`, leave issue open | Exact linked open PR and verified head repository/branch are reused; no second branch or PR |
| Linear, current user assigned        | GitHub, no `bkt`                  | Resolve team-local start state, use `ENG-482-export`, return context to the existing owner         | Inspect GitHub PR, reuse its exact source branch, preserve Linear as tracker                |
| Linear, current user assigned        | Bitbucket, no GitHub forge access | Verify explicit workspace/repository with `bkt`, retain Linear branch and start rules              | Inspect Bitbucket PR and reuse its exact source branch without GitHub tools                 |

In every row, a bug returns through `diagnosing-bugs`, consequential design through `plan`, and
implementation continues under the same `orchestrate` owner within the original authority.
Without an issue, GitHub or Bitbucket development returns to its existing owner without a tracker
probe, issue creation or new workflow imposed by this family.

## Safety and recovery

| Fixture                                                                                   | Expected decision                                                                 |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Linear issue is unassigned or assigned to another identity                                | No startup or self-assignment                                                     |
| GitHub ownership policy requires assignment, current identity absent                      | No startup or self-assignment                                                     |
| GitHub ownership policy is unknown and unassigned issue has no explicit ownership mandate | Resolve policy before writes; do not infer permission                             |
| Native active blocker or parent with one open unassigned child                            | No startup; a prerequisite hyperlink alone is not a native blocking relation      |
| Relation permission denied, a child page unavailable, or GitHub number lacks repository   | Unknown eligibility; no speculative writes                                        |
| Git remote conflicts with tracker repository mapping, or two exact PR candidates exist    | Report ambiguity; no checkout, link or creation                                   |
| Exact branch has a PR but its tracker link is missing                                     | Recover and verify the existing PR; repair only the supported missing association |
| PR creation succeeded and tracker link failed                                             | Retain canonical PR; reread both systems and recover the link only                |
| PR create timed out and a later search is empty                                           | Indeterminate outcome; no blind create retry                                      |
| Attached PR is merged or closed without merge                                             | Report terminal state; do not silently create replacement work                    |
| Same branch name occurs in two forks, or same issue number in two trackers' repositories  | Verify full head and issue identities; a name alone is insufficient               |

## Synchronization and specification

| Fixture                                                    | Expected decision                                                                                                                             |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Open GitHub PR, Linear tracker                             | Use verified team review state; independently read a permitted write back                                                                     |
| Open PR, GitHub Issues tracker                             | Keep issue open, report review pending, require no Projects                                                                                   |
| Merged PR with unchecked acceptance boxes                  | Report each unproven line; pending verification is Linear `In Progress` or GitHub open; absent conditional write means no state mutation      |
| Same merged work with prose acceptance criteria            | Same pending classification; synchronization neither edits criteria nor runs checks                                                           |
| Merged PR with all boxes checked, or no evidence section   | Completion eligible; absent verified conditional write still means no state mutation                                                          |
| Parent's direct children all complete                      | Apply parent's own evidence policy; absent atomic child-dependent completion means report eligibility only                                    |
| GitHub auto-closure with unchecked criteria                | Report closed state and unproven residue; do not check boxes or silently reopen                                                               |
| Explicit verification but required measurement unavailable | Retain unproven criterion, name missing oracle, no completion claim                                                                           |
| Product draft for either tracker, no publication authority | `issue-spec` supplies functional content; `issue-creation` owns draft/review lifecycle, no publication or implementation                      |
| Existing product-publication mandate                       | `issue-spec` supplies content; `issue-creation` separately verifies authority and stored publication; no new write authority from composition |
