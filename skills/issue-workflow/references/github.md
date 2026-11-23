# GitHub Operations

Use this adapter only when Git remotes identify GitHub as the repository forge. Linear can remain
the tracker. No Bitbucket client, credentials or conventions are required. Prefer an authenticated
connector with the required operations; otherwise verify current `gh` help and authentication for
the target host. A command being installed does not establish write permission.

## Repository identity

1. Inspect Git fetch and push remotes; resolve the relevant host, owner and repository. Preserve
   fork/head and target repository identities separately. Conflicting or ambiguous remotes need
   resolution before any checkout, push or PR write.
2. Confirm with `gh repo view <host>/<owner>/<repo> --json nameWithOwner,url,viewerPermission`.
3. Pass `--repo <host>/<owner>/<repo>` on subsequent repository operations. For `gh api`, use
   `--hostname <host>` and explicit repository endpoints. Verify required permissions independently
   from tracker identity and issue access.

## Existing pull requests

Inspect an attached canonical URL or exact PR number with
`gh pr view <number-or-url> --repo <target> --json <fields>`.
Read state, mergedAt, headRefName, headRepository, headRepositoryOwner, baseRefName and canonical URL.
A closed PR without a merge is terminal without landing; missing or inaccessible is unknown.

Before creating, use `gh pr list --repo <target> --head <branch> --state all --json <fields>` and
verify the exact head repository as well as branch. The head filter alone cannot distinguish forks.
Complete relevant pages through a verified paginated API when the CLI limit could truncate results.
Zero, one and multiple exact matches are different outcomes. Inspect checkout help and local edits
before reusing the verified source branch with `gh pr checkout <number> --repo <target>` or Git.

## Creation and association

Only with publication authority, confirm the remote source branch and target, then use the verified
`gh pr create` surface with explicit repository, head, base, title and `--body-file`.

Read [completion-evidence.md](completion-evidence.md) before adding a closing link. Use
`Closes #<number>` in the PR body when the PR targets the default branch,
finishes the issue, and named evidence covers its current acceptance criteria. Use
`Closes <owner>/<repo>#<number>` for a verified cross-repository issue. Use `Refs` for partial work
or pending evidence. If that evidence arrives during review, refresh the issue and promote the link
on the authorized open PR. If a revision invalidates the evidence, restore the non-closing reference.
Keep closing keywords out of commit messages so the PR body controls the link. See the
[GitHub closing-link contract](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)
for native link behavior.

Read back the PR URL and exact issue association. For a closing link, verify the target with
`gh pr view --json closingIssuesReferences`. Reuse the native link as the tracker association.
For other links, follow the selected tracker adapter.
If creation succeeds and linking fails, keep the PR and retry only the safe missing association.
If creation times out, recover remote facts before any retry; a search miss is not proof of failure.

## Checks and limits

Read checks for the exact PR revision with `gh pr checks <number> --repo <target>` and structured
output when available; inspect `statusCheckRollup` and the source revision as needed. Pending,
failed, cancelled, missing or inaccessible checks are distinct from passing checks. Verify required
checks through the existing repository policy; an empty result is not green CI.

An unreadable branch protection or ruleset remains unknown. Inspect it when the requested action
requires an enforcement claim; do not make administrative read access a universal prerequisite for
an otherwise authorized push or draft PR. Report an authentication or permission failure once,
preserve local drafts and stop retrying that operation until its prerequisites change. Continue
independent authorized operations without escalating rights.

Bound CI observation by the task's existing recovery budget. Preserve the last exact revision and
check state with a resumption condition when observation cannot finish. A failed check reproduced
on the base remains failed: retain the paired evidence and dependency, keep mandatory gates
blocking the stage they protect, and distinguish an allowed progress push/draft PR from readiness.
When `implement` owns the task, use its verification-outcomes procedure for attribution, private
proof environments and indicative third-party compositions. Never silently exclude a failing check.

Use current native help for command fields and official provider contracts before relying on API
semantics. Do not assume issue relations, conditional updates or Projects permissions from PR access.
