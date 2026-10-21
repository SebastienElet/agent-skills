# Tracker Transports

Select the tracker independently of the repository forge. Probe only the selected provider.
The business workflow remains in its composing skill and `issue-workflow`.

## Identity, ownership and lifecycle

- Resolve Linear by workspace and issue identifier, and GitHub Issues by host, owner/repository and
  number. Verify the authenticated identity and required permissions for that exact target.
- Linear work remains limited to issues assigned to the current identity. Resolve `In Progress`,
  `In Review` and `Done` by enumerating the issue team's states and matching exact configured names,
  never by state type. Missing names or enumeration block that transition.
- GitHub work follows the repository's established ownership/start policy and the explicit mandate.
  When assignment is required, verify that the current identity is among the assignees. An absent
  policy or an unassigned issue does not imply permission to take ownership; resolve the uncertainty
  before writes. Never self-assign to bypass a refusal. Synchronization without explicit issue
  scope defaults to the current identity's assigned issues in the verified repository.
- Read structured blockers, parent and every direct child for both providers. Missing fields,
  truncated lists and denied relation reads are unknown, not proof of no blockers or children.
  Only active blockers prevent startup; a prerequisite hyperlink is not a native blocking relation.
- GitHub Issues uses open/closed lifecycle state. Starting, review and pending verification leave
  it open, with the queue reported to the user. Do not invent Linear states or require Projects.
  A repository using Projects may use its existing verified mapping only within the mandate.
- Read every stored mutation back independently. On failure, timeout, null required fields, unknown
  response shapes, GraphQL errors or false mutation success, report partial or unknown effects.
  Inspect remote state before a safe retry; do not infer rollback from an error.

## GitHub Issues

Prefer an authenticated connector covering the required identity, issue, relation, pagination and
link operations. Otherwise inspect `gh version`, `gh auth status --hostname <host>` and current
command help. The installed CLI may expose fewer fields on a different host or version.

- Read identity with `gh api --hostname <host> user` and the exact issue with
  `gh issue view <number> --repo <host>/<owner>/<repo> --json <fields>`. Verify body, state, assignees,
  canonical URL and repository identity. Current help exposes `parent`, `subIssues`, `blockedBy`
  and `blocking`; verify completeness and the host's support before relying on them.
- Use `gh issue list --state all --assignee @me --repo <host>/<owner>/<repo> --json <fields>` for
  assigned candidates, with an explicit bounded scope. Its limit is a maximum, not pagination:
  use a verified paginated API or connector for exhaustive candidates and relation connections.
  `gh api --paginate` supports REST pages and GraphQL connections when the query supplies cursors.
- Keep the issue repository independent from the code repository. For linking, reuse an existing
  structured association when one exists. Otherwise a canonical PR URL in a dedicated issue
  comment can record the exact association when comment writes are authorized. Read existing
  comments first, add only a missing exact URL, then independently read it back. Such a comment
  is an explicit association record, not a native closing relation or evidence of acceptance.
  Do not infer arbitrary prose links as work associations.
- Do not add automatic closing keywords to PRs or commits to bypass evidence checks. Report any
  existing auto-closure and unproven residue; closure does not establish acceptance.
- No conditional description-dependent closure or child-dependent parent completion has been
  qualified here. Ordinary issue close/edit and a read-before-write do not supply that guarantee.
  Classify and report eligible completion; leave such writes to a human unless a current provider
  contract and an authorized isolated check verify an appropriate mechanism.
- Body/checkbox edits require a verified anchored or version-conditional operation preserving
  concurrent edits. Do not substitute a full-body update with `gh issue edit --body-file`.

## Linear

### Selection

1. Prefer an authenticated Linear connector exposed by the current agent when its current schema
   covers identity, filtered issue listing with pagination, issue details, hierarchy, blocking
   relations, links or attachments, workflow state updates, and URL attachment. Routing an issue by
   its completion evidence additionally requires listing a team's workflow states, an anchored
   partial edit of a description, and applying such an edit in the same save as a state change;
   check each and the documented whole-save failure semantics, then require the two live
   observations in [completion evidence](completion-evidence.md) before writing state. Missing the anchored guard does not disqualify the transport for
   reading and classifying — it removes the authority to write the state, which then goes to a
   human. Recording accepted residue on a closing transition also needs reading and writing issue
   comments.
2. Otherwise use the installed `linear` CLI only after its local help confirms the commands and
   `linear auth whoami` succeeds for the intended workspace.
3. Otherwise use Linear GraphQL only when authentication and the current schema are already
   available and every response is checked for transport failure, top-level errors, null required
   fields, and mutation success.
4. Stop before the first uncovered operation. Never combine partial transports unless identity and
   workspace equality are proven.

### Connector adapter

- Inspect the connector's tools in the current session; configuration or marketplace availability
  alone does not prove activation or authentication.
- If no integrated connector tool is exposed, the [official MCP authentication
  documentation](https://linear.app/docs/mcp) permits an existing API key or OAuth token in the
  bearer header to `https://mcp.linear.app/mcp`. Inspect that server's live `tools/list` before
  declaring MCP unavailable; never expose or persist the credential. The
  [2026-09-10 experiment](linear-guard-observation-2026-09-10.md) reached it this way, but found that
  `save_issue` rejects identity replacements even with a unique anchor: state writes using that
  guard remain disabled. A valid schema and a whole-save contract do not override this observation.
- Retrieve issue data and relations with structured fields. Resolve attachment URLs without
  inferring their meaning from prose.
- After a state or link mutation, retrieve the issue independently and compare the stored value.

### CLI adapter

The locally inspected `linear` 2.6.0 help (2026-09-09) exposes:

- `linear auth whoami --workspace <workspace>` for identity and authentication;
- `linear issue query --workspace <workspace> --assignee <username> --all-states --limit 0 --json`
  for an exhaustive structured list of one user's issues;
- `linear issue view <issue-id> --workspace <workspace> --json` for structured issue, hierarchy,
  inverse relations, and attachments;
- `linear issue relation list <issue-id> --workspace <workspace>` to inspect relations;
- `linear issue update <issue-id> --workspace <workspace> --state <state>` for lifecycle
  transitions;
- `linear issue link <issue-id> <pull-request-url> --workspace <workspace>` for URL attachment.

It also exposes `linear team states <team-key> --json` and full-description replacement through
`linear issue update --description` or `--description-file`. Neither is an anchored edit.
`linear api` provides GraphQL access, but the inspected `IssueUpdateInput` has `stateId` and
`description` without a patch or condition field; `issueUpdate` takes only `id` and `input`.
Evidence-based state writes remain uncovered on these inspected paths. See the
[dated inspection and limits](linear-guard-observation-2026-09-09.md); command availability is not
proof of a successful mutation or whole-save atomicity.

Run current local help again before use. This binary is a third-party Linear CLI, not an official
Linear CLI. Do not use `linear issue pr` for forge discovery or Bitbucket creation: its installed documentation
delegates to GitHub's `gh`. For either forge, use the independently verified forge adapter.

## Common limits

- An unauthenticated CLI is unavailable even when it has stored workspace names.
- A read-only connector cannot update an issue or attach a pull request.
- Do not install a plugin, add a connector, log in, or create test data merely to complete probing.
