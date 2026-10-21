# Bitbucket Operations

Use Git for local and remote branch state, and `bkt` for Bitbucket Cloud repository and pull-request
state. The active `bkt` context is not repository discovery. Verify current local help, authentication
and required read/write permissions before use. This path does not require GitHub forge access;
any tracker authentication is separate.

## Repository identity

1. Inspect Git fetch and push remotes and select the Bitbucket remote relevant to the requested
   work.
2. Extract and validate its workspace and repository slug.
3. Confirm the target with `bkt repo view --workspace <workspace> --repo <repository> --json`.
4. Pass `--workspace` and `--repo` to every subsequent `bkt` operation.

## Attached pull request

For a canonical Bitbucket Cloud URL shaped as
`https://bitbucket.org/<workspace>/<repository>/pull-requests/<id>`, validate every path component,
then inspect it with:

```text
bkt pr view <id> --workspace <workspace> --repo <repository> --json
```

Read the pull request under the returned `pull_request` object, including its state, source branch,
destination branch, and canonical HTML URL. `bkt pr checkout` can fetch and check out the source
branch, but inspect the command's current help and the local working tree before allowing that
mutation.

## Existing pull request by branch

`bkt pr list` has no source-branch filter. List open, merged and declined pull requests with explicit
repository identity using `bkt pr list --state <OPEN-or-MERGED-or-DECLINED> --limit 0 --workspace <workspace>
--repo <repository> --json`, then select an exact source branch match locally. Treat zero, one, and
multiple matches as distinct outcomes.

## Creation and attachment

Current local help exposes `bkt pr create` with explicit `--workspace`, `--repo`, `--source`, and
`--target` arguments. Verify the remote branch exists, create once, then retrieve the new pull
request independently to obtain its canonical URL before attaching it to the selected tracker. A successful
Bitbucket creation followed by a failed tracker link is a partial success, not permission to create
again.

## Pull-request checks

Read check/build status for the exact source revision through the current verified `bkt` surface
or authenticated Bitbucket API. Probe available schemas first. A successful merge or absent status
list is not a green pipeline; report pending, failed, missing or inaccessible checks and their
revision. Do not invent command flags or require GitHub checks for Bitbucket work.

## Limits

- `bkt branch create` is not a Bitbucket Cloud operation; create and push Cloud branches with Git.
- `bkt mcp serve` is read-only and cannot create a pull request.
- Never open a browser or depend on human-formatted output when structured output is available.
