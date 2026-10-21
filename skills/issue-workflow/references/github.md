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

Inspect an attached canonical URL or exact PR number with `gh pr view --repo <target> --json <fields>`.
Read state, mergedAt, headRefName, headRepository, headRepositoryOwner, baseRefName and canonical URL.
A closed PR without a merge is terminal without landing; missing or inaccessible is unknown.

Before creating, use `gh pr list --repo <target> --head <branch> --state all --json <fields>` and
verify the exact head repository as well as branch. The head filter alone cannot distinguish forks.
Complete relevant pages through a verified paginated API when the CLI limit could truncate results.
Zero, one and multiple exact matches are different outcomes. Inspect checkout help and local edits
before reusing the verified source branch with `gh pr checkout <number> --repo <target>` or Git.

## Creation and association

Only with publication authority, confirm the remote source branch and target, then use the verified
`gh pr create` surface with explicit repository, head, base, title and `--body-file`. Do not add
closing keywords that bypass completion evidence. Independently retrieve the resulting PR and
canonical URL before associating it with the selected tracker through its transport adapter.
If creation succeeds and linking fails, keep the PR and retry only the safe missing association.
If creation times out, recover remote facts before any retry; a search miss is not proof of failure.

## Checks and limits

Read checks for the exact PR revision with `gh pr checks <number> --repo <target>` and structured
output when available; inspect `statusCheckRollup` and the source revision as needed. Pending,
failed, cancelled, missing or inaccessible checks are distinct from passing checks. Verify required
checks through the existing repository policy; an empty result is not green CI.

Use current native help for command fields and official provider contracts before relying on API
semantics. Do not assume issue relations, conditional updates or Projects permissions from PR access.
