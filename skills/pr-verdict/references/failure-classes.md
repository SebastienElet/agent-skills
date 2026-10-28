# Failure classes

Use these questions when designing, implementing or verifying a change. Read the domain index
first, then only the relevant classes; reading this reference does not invoke `pr-verdict`.
Its verdict policy lives in [SKILL.md](../SKILL.md#verdict-policy).

For a design document, question what it authorizes someone to build; an unresolved failure path
can become an implementation defect.

## Domain index

| Concern                                                        | Classes                              |
| -------------------------------------------------------------- | ------------------------------------ |
| Transactions, retries, identifiers and existing data           | 1, 2, 3, 25, 27, 30, 31              |
| Access, trust boundaries, input and display                    | 4, 5, 8, 9, 11, 12, 16, 20           |
| Contracts, claims, immutability and data lifecycle             | 6, 7, 10, 13, 18, 22, 27, 29, 30, 31 |
| Selection, verification, measurements and upgrades             | 14, 15, 19, 23, 28                   |
| Task graphs and validation caches                              | 1, 14, 19, 21                        |
| Installed tools, execution environment and process supervision | 17, 21, 24                           |
| Calendar rules and compound deadlines                          | 26, 28, 32                           |

## 1. Atomicity and ordering

**Ask:** is the read that grounds the decision inside the same transaction as the write it
authorizes?

**Broken when:** a snapshot, count or validation runs before the transaction opens. Intervening
commits escape the decision, authorizing a write from stale state.

**Lift:** read inside the transaction at an isolation level preventing the interleaving, or enforce
the invariant with a constraint rejecting the concurrent write.

Separate read-only planning from execution: complete all domain and authorization refusals before
the first irreversible effect, including permanent derived creation, consumption of a non-reusable
identifier or an external call. Admit each referenced entity's existence and relationship to the
authenticated scope before deriving anything from it; retain formerly related entities when the
authoritative contract permits them. Keep state-dependent checks within the atomic boundary above;
planning must not become a stale precheck. For each refusal path, assert that no derived resource
was persisted, no non-reusable identifier was consumed and no external effect occurred. Preflight
checks do not eliminate later storage or protocol failures; do not claim rollback covers effects
it cannot undo.

For `sum <= capacity`, identify the capacity-row lock shared by every contributor and capacity
mutation, with sum reread and write in that transaction. An ordinary transaction around an unlocked
sum is insufficient. Require overlapping separate-connection tests and persisted totals, as in
`tdd`'s database refusals. Across independent stores, require explicit order and durable recovery;
a local rollback cannot undo an object deposit. Classes 2 and 24 cover replay and compensation.

In a parallel task graph, declare every written output and order its readers after the producer.
A lock on another resource cannot protect those files. Verify the dependency with the native plan
and an execution trace. If graph edges cannot express the order, finish the producer invocation
before starting readers in a second invocation in the same container; concurrent invocations are
not a dependency.

## 2. Retry idempotence

**Ask:** after a conflict, does retry re-read the winning state or replay the pre-conflict decision?

**Broken when:** retrying only the write silently replays a stale decision, duplicating a successor,
invoice or charge.

**Lift:** the retry re-enters the whole read-decide-write unit, or the write is keyed so that the
duplicate is rejected by the database.

For each transition of an existing resource, including later workflow stages, require an expected
version or equivalent concurrency precondition checked atomically with the mutation. Creation needs
its own uniqueness/replay key, not a nonexistent prior version. Name the replay contract: refuse a
duplicate before any effect or return the prior result without repeating it. Exercise replay and,
where required, stale and missing versions through each action, observing unchanged state and no
additional external effect on refusal.
After a successful UI write, close or refresh the form so it cannot resubmit the consumed version.

Every new creation endpoint needs idempotence or an explicit justification for its absence. For
keyed creation, inspect key scope, lifetime, database uniqueness and atomic persistence of request
identity, effect and replayable response. Concurrent identical `Idempotency-Key` requests create
one row and replay the response; reuse with a different body receives a named refusal such as
`422`, without a second effect. Require these cases against the real database, not sequential mocks.

For an upload reservation, bind the organization-scoped durable key to server-computed digest and
detected type. Identical replay resumes and differing content refuses; reuse a deposited object
only if its content matches. Exercise failure after deposit followed by successful retry, plus
concurrent replay; finalization atomically records object, digest, type and completed state.

Reservations need an owner, a failure exit and defined expiry or recovery. Reassignment must exclude
an active write despite lease expiry; protect acquisition, holder authority and handoff to writing.
A stale holder cannot release or finalize a successor's reservation. Do not hold a database
connection during application-level waiting. Require real-database tests with a bounded pool for
refusal then recovery, an old failure after reassignment, expiry during a slow write without
reassignment, and contention beyond pool size without exhaustion from held waiting connections.

## 3. Invariant without a constraint

**Ask:** which database constraint or serialization protocol protects this invariant under
concurrent writes?

**Broken when:** only the service checks uniqueness or ordering: two processes read "absent" and
both insert. Require a database constraint, such as a unique index or exclusion constraint, or a
transaction protocol that actually serializes competing decisions, such as a serializable
transaction or the shared row lock in class 1; merely opening a transaction is insufficient.

For upgrades or resynchronization from a reference model, identify the local derivations, invariants
and user choices affecting each copied field. Exclude locally derived state from copying or recompute
it with its canonical rule; a reference default cannot override that rule. Preserve user choices
according to the established ownership contract. Require a regression case with derived state before
the upgrade that survives afterwards, and a diagnostic or upgrade report for excluded copies.

**Lift:** the constraint exists in the schema or the serialization protocol in every affected
write path; an overlapping real-database test proves the intended refusal instead of a forbidden
committed result.

For sequential or timestamped identifiers, compare the proposed value with the fetched destination,
relevant open PR heads including drafts, and relevant remote branches without a PR, not only the
local maximum. Check ADR and other decision/document numbers, migration order and module/permission
manifest versions bound to content. Recheck after each destination integration and record the chosen
values and inspected refs in delivery evidence. Refresh the destination and parallel refs before
publication; verify uniqueness and that every new migration follows the destination's latest one.
Coordinate every affected copy of a decision number, including copies on parallel branches.
A conflict-free merge is no uniqueness proof; use
the existing registry or migration validation when available. Do not renumber already applied
migrations or silently combine independently owned manifest contents. Disclose parallel changes to
the same versioned manifest in delivery evidence and coordinate their integration so a fresh version
preserves the intended union of keys instead of overwriting an earlier addition.
Repository-wide singleton resources also need this comparison: a dependency patch, override or pin
may already exist on the destination or an open PR. Inspect the relevant canonical list before
adding another entry; coordinate overlapping changes rather than appending duplicate keys.
Include shared entity prefixes. Compose the target and relevant parallel heads in a disposable
tree and run native registry checks and affected suites, not only isolated green branches. A
jointly delivered unpublished manifest version can preserve the key union; a published version
requires advancement under the deployment contract. Class 21 covers the separate typecheck.

For single-use records, require non-null keys and a named unique or exclusion constraint at the
proper organization scope. A pre-insert existence check does not prevent duplicate consumption;
require one concurrent success and one translated refusal with no partial writes, plus independent
organization controls. Class 6 governs translation of that exact constraint, not arbitrary errors.

## 4. Authorization as a side effect

**Ask:** is the access check named in a dedicated call, or obtained incidentally through a function
called for another reason? For exempt objects, keep the attributes that make them harmless fixed
across every mutation path.

**Broken when:** authorization relies on a loader filtering by caller scope. Replacing it with a
cheaper query removes the check while tests stay green and the security change goes unnoticed.

**Lift:** an explicit authorization call whose removal fails a test written against it.

Inventory every route/use case in the touched module and its existing neighbors on the integrated
tree in the PR description: `route/use case → permission → access scope → refusal test`.
Require explicit permission and scope or a documented intentionally public contract; authentication
and a permissive global guard do not suffice. Use minimally privileged subjects with separate
missing-permission and out-of-scope cases, not administrator-only tests. Isolate each refusal's
predicate and observe a failing assertion when it is removed or broken, then success after restoration.
For two-step flows (propose/approve, prepare/sign), record the first step's author and test refusal
of self-approval separately from permission. Enforce it with a deterministic database constraint and
named domain error where possible; apply step 5 of the `codebase-design` skill.
Resolve the permission named for the action by the design in force: a general parent edit
permission is insufficient where a dedicated action permission is required. With valid scope,
test the parent-only subject's refusal without writes and the action-authorized subject's success.

In a workflow promising independent proposal and approval, permission does not establish actor
independence. Persist the proposer, preparer or requester and refuse that actor's own approval or
signature with a named business error.
For `library-api`, an authorized proposer approving their own waiver receives `403` without writes;
another authorized actor succeeds, and a subject without permission is a separate refusal case.
Where possible, a named database check also enforces distinct actors with a required first actor;
exercise direct SQL against a real database and application translation to the same self-approval
error. If only one actor is eligible, require a policy decision rather than ignoring that case.

## 5. Tenant scope

**Ask:** can a client-supplied identifier override the scope established by authentication?

**Broken when:** a tenant, organization or account id arrives in the request body or path and is used
without being reconciled against the authenticated scope. The endpoint then reads or writes across
tenants for any caller who edits an id.

**Lift:** the authenticated scope is the only source of the identifier, or the supplied value is
verified against it and the mismatch is rejected — with a test for the mismatch.

Resolve every reference in caller scope even through a global service: existence or active status
alone does not prove membership. Refuse missing, inactive and foreign references without revealing
foreign data. Organization-local uniqueness also needs organization-scoped indexes; remove a
superseded global index compatibly and test the same reference in two organizations.

## 6. Error contract

**Ask:** are the returned status codes documented, and do the documented ones match the real
behavior?

**Broken when:** the code returns 409 where the documentation promises 412, or a new precondition
failure is added and nothing says so. Clients build retry logic on these codes; an undocumented
change is a silent behavioral break in every consumer.

**Lift:** documentation and implementation agree, and the mapping is asserted somewhere that runs in
CI.

A changed observable response on a versioned public API is a compatibility decision, including a
new blanket refusal where deletion previously succeeded. Preserve the published contract, introduce
a new version, or obtain an explicit owner-approved contract amendment before delivery. A newly
proposed retention policy alone does not authorize breaking existing clients.

For every added or expanded constraint, exclusion or trigger, name each expected refusal and its
business translation. Match structured driver identifiers and codes at the adapter boundary,
including errors raised at commit; do not parse free-form messages or turn unknown technical errors
into business refusals. Early application checks do not replace database concurrency protection.
Through the application and real database, assert exact status and stable business code and read
back all transaction writes to prove rollback. Include deferred commit refusal, a concurrent change
defeating the precheck, and an unknown technical error retaining generic handling. An expected
refusal becoming a generic server error violates the promised business error contract.

## 7. Deferred functionality

**Ask:** is the absent regulatory or business control declared as an explicit contract — what is
missing, why it is acceptable now, and the condition that lifts it — or is it silently omitted?

**Broken when:** a control the domain requires is simply not there, and the PR says nothing. The gap
then becomes invisible: it survives review, ships, and gets discovered by the party the control
protected.

**Lift:** the contract is written down in the code and in the PR, with its lift condition. Silence is
the defect; a stated deferral with a named lift condition does not break this class.

## 8. Parsing versus assertion

**Ask:** is the external value validated by a schema, or degraded by a ternary that turns anything
unexpected into a plausible default?

**Broken when:** `input.mode === "strict" ? "strict" : "lenient"` — a typo, a renamed enum member or
a null silently selects the permissive branch. The system keeps running and produces wrong results,
which is strictly worse than rejecting the input.

**Lift:** the value is parsed into the type it claims to be, and the unparseable case is an error
with a message naming what was received.

For values committed as valid at entry, enforce the downstream domain required by the workflow,
including amounts and open periods, so accepted objects cannot become permanently unprocessable.
An explicitly editable draft may be incomplete; validate its transition before it enters a stage
that promises finalization, and make its repair path explicit.
For multiple candidate sources, preserve an explicit unknown/ambiguous result instead of choosing
the first. Shared amounts need an explicit allocation whose total is conserved, not one full
amount per holder. Exercise out-of-domain input, ambiguity and allocation through the owning boundary.

## 9. Upstream control as a trust boundary

**Ask:** does this diff keep validation or confinement at the trust boundary distinct from every
upstream allowlist, index, internal view or owned schema?

**Broken when:** an upstream control is treated as proof that its output is trustworthy, so the
boundary guard does not run. The upstream mechanism controls selection or representation, not the
validity or confinement of every value it emits, and its drift crosses the boundary unchecked.

**Lift:** the boundary guard still validates the value or confines it against the canonical boundary
when it is consumed, independently of the upstream control, and each mechanism remains explicit.

For files, require actual binary signature and structure validation; a text exception is restricted
to real textual formats with their decoding rules. Compute the digest from received bytes and
verify retrieved bytes before release. A client digest, stored-but-unchecked checksum or fallback
after missing/corrupt content establishes no integrity. Require disguised-content, valid-content,
changed-object and absent-object cases through the actual boundaries.

## 10. Claim stronger than mechanism

**Ask:** does every guarantee claimed by this diff match what its mechanism actually establishes?

**Broken when:** the wording promotes a weaker property into a stronger outcome — intent into
effect, integrity into legal proof, or proposal into authority. A reader then builds or relies on
an assurance that no mechanism delivers.

**Lift:** the claim uses the weaker term the mechanism supports when no external obligation requires
more; otherwise the missing mechanism, evidence or authority makes the stronger guarantee true.

Before changing a factual assertion, warning or unresolved-gap entry, search the integrated tree's
data and documentation for the underlying fact and all its mentions. Keep a warning while its fact
holds; removing it requires cited evidence of the change. When the fact changes, update every affected
mention in the same change, including gap tables, and repeat the search. Historical records may remain
explicitly historical. For decisions on overlapping subjects, inspect relevant remote branches and
open PRs: reconcile conflicting positions or declare the dependency and unresolved conflict. A pending
proposal is not an accepted decision and cannot silently override one in force.

A guarantee that a document attributes to a layer (database, constraint, trigger, permission) must be
implemented at that layer and proven by a test that bypasses the layers above it, such as a direct
statement against the store. A guard in the application alone is a weaker mechanism than the claim.

Trace displayed amount/state labels to the real query or predicate: invoiced is not refundable.
Require paid/unpaid data through the real query and rendered card, asserting label and amount
together. Help text announcing a restriction needs the enforcing operation and its refusal case;
otherwise narrow it to the observed fact or remove it, without inventing a new product rule.

After a tooling refactor, search old routes and their consumers in registries, documentation and
code. Align declared routes and proof levels with actual calls and relevant evidence. Remove dead
functions and branches within scope; otherwise record their exact symbols, reason for deferral and
named debt with a lift condition. Reconcile concurrency claims and decision status against the
final candidate; an unmet target remains a target, not an achieved fact. Class 3 covers identifier
collisions; `implement` owns separation of independently reversible production fixes.

## 11. Hostile input in normalization and redaction

**Ask:** does every normalization or redaction of an untrusted URL or path use a real parser or
explicit grammar-aware analysis of its authority and boundaries, with a table of hostile inputs?

**Broken when:** an ad hoc regex decides identity or removes credentials without respecting those
boundaries. For example, `[^/@]*@` stops at the first `@`, leaving credentials after a second one,
and turns `https://evil.invalid?@github.com/...` into an apparently trusted GitHub URL. A query or
fragment becomes authority, or a secret survives into displayed output. A repository picker rejects
equivalent Git remotes because it requires an SCP user, compares DNS hosts literally, or preserves
the default SSH port as a distinct identity.

**Lift:** a real parser or explicit authority/boundary analysis replaces the ad hoc regex. An
executed hostile-input table covers multiple `@`, `@` in query or fragment, backslashes, control
characters, newlines, bidirectional controls, encoded delimiters, and repeated or adjacent
occurrences. Assert the expected identity or rejection and safe displayed output for each relevant
case, including malformed inputs; normalization must not turn a rejected authority into a trusted one.

For Git remotes, require protocol-aware parsing, including the SCP grammar `[user@]host:path`.
Extend the hostile-input table with these identity and rejection cases; provider rules must come
from the supported provider's contract, not a blanket lowercasing of paths.

| Input family                                                                              | Required observation                                                                                                                                              |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `github.com:Owner/Repo.git`, `git@github.com:Owner/Repo.git`                              | Optional SCP user does not change repository identity.                                                                                                            |
| `ssh://git@github.com/Owner/Repo.git`, `ssh://git@github.com:22/Owner/Repo.git`           | Omitted and explicit default SSH port 22 identify the same repository.                                                                                            |
| `git@GitHub.COM:Owner/Repo.git`, `ssh://git@GITHUB.COM/Owner/Repo.git`                    | DNS host casing does not change identity in either syntax.                                                                                                        |
| GitHub `Owner/Repo` versus `owner/repo`; GitLab `Team/Project` versus `team/project`      | GitHub case aliases match. For other providers, follow the supported identity contract; exact GitLab path matching may be a declared local rule.                  |
| `Repo`, `Repo.git`, `Repo/`, `Repo.git/` in supported remote forms                        | Final `.git` and trailing slash normalize according to the repository identity contract; interior path segments remain intact.                                    |
| `ssh://git@github.com:2222/Owner/Repo.git`, a foreign host, malformed SCP and local paths | Preserve distinct endpoints or reject with a diagnostic; never alias them to a trusted default endpoint.                                                          |
| Private-file paths `.ENV`, `ID_RSA`, `backup.P12`                                         | Case variants cannot bypass the declared private-file policy; exercise case-sensitive Git paths, including empty or encrypted files when that policy covers them. |

Missing executed cases are `unproven`; a traced rejection or trust-boundary violation is
`broken by` its mechanism. Class 12 separately checks every display output.

## 12. Complete display-output coverage

**Ask:** are all display outputs inventoried and covered by the presentation cleanup, including
stdout, stderr and every textual report field such as `version`, `steps.*` and `deferrals`?

**Broken when:** only the main error message or one output stream is cleaned. Untrusted host
metadata or a rejected path reaches another textual report field, which is serialized or rendered
unchanged; credentials or terminal controls still leak through that output despite the cleaned error.

**Lift:** trace every display output and textual report field to the presentation boundary, and
exercise hostile values through each reachable output in success and failure paths, including
stdout and stderr. Keep raw values available for internal decisions and execution; displayed
cleanup must not change trust or error classification. Name excluded internal-only fields and why
they cannot reach display instead of treating a cleaned sample report as complete coverage.

## 13. Unchanged public contract without exported comparison

**Ask:** does a claim that a public schema, MCP or CLI contract is unchanged have a byte-for-byte
comparison of the projection actually exported on the base and head?

**Broken when:** source types, shared schemas, passing validation fixtures or adapter reuse stand
in for exported equality. For example, `mcpSchema(PublicContractSchema)` can preserve accepted values
while dropping the published `version` description. Without the exported comparison, the
unchanged-contract claim is `unproven`; source similarity does not establish compatibility.

**Lift:** capture the actual public export on the named base and head with the public export command,
each revision's pinned dependencies and a recorded environment, then compare its bytes, including
descriptions and other metadata. Do not strip metadata or normalize away differences. If bytes differ, restore equality
or declare and assess the contract change; if the comparison cannot run, retain `unproven` and
state the precise evidence gap.

## 14. Selection without complete accounting

**Ask:** can every input occurrence be traced to a retained element or a diagnosed rejection?
Do eligibility and destination follow an independently established contract?
Does every file that changes a task's behavior — manifest, lockfile, tool configuration or pinned
version — belong to that task's inputs? When a file is removed, is its role carried over to the
relevant task inputs? Can a required job silently pass with no affected tasks on such a change?

**Broken when:** a candidate disappears before classification, an unavailable dependency is silent,
or a missing expected project becomes a successful empty selection. Filtering before counting hides
loss; equal counts still hide wrong eligibility or routing. For example, a selector keeps a parent
with an unfinished child despite a rule excluding it, or sends an update to a creation-only handler.
A behavior-changing file is absent from task inputs, so its change selects no affected tasks and
a required job succeeds without running the checks it owes.

**Lift:** observe `input = retained + diagnosed rejections` by identity and occurrence, with no loss
or double-counting and all required diagnostic reasons. Keep ambiguity visible until resolution or
rejection; an unclassifiable input fails explicitly. Validate expected projects and targets before
filtering. Derive eligibility, required prerequisites and authorized destinations from the independent
contract, then exercise valid, empty, ambiguous, unavailable and wrongly routed cases. A successful
empty result accounts for every exclusion. Native inspection, task graphs and existing diagnostics
suffice when they expose this proof; do not require a new mirror gate or validator.
Include every behavior-changing file in the relevant task inputs and carry over a removed file's
role to its replacements. Observe affected-task selection for changes to those files and verify
that a required job cannot silently succeed with an empty selection on those changes.
When task inputs are narrowed, inventory every runtime read, including dynamically loaded
architecture-test configuration. Change each input alone and observe the task in an affected
dry-run; verify local preflight and CI read the same configuration. A lint cache omitting its
configuration or a task selected only on unrelated changes has not covered the required input.
Inspect the native hash input listing too: being scheduled does not prove a runtime-read file is
hashed. Include documentation read by tests, generated inputs and tool configuration.

Before executing a required verification invocation, obtain its native plan and refuse malformed
or empty task lists. A planning failure must propagate explicitly; `set -e` does not reliably stop
failures inside an `&&` list. Retain a receipt per invocation with attempted, executed, cached and
failed task counts, exit status and a digest of the retained summary. Identify cache hits as reuse,
not new executions; a zero exit alone proves neither selection nor execution. Classes 1 and 21
cover producer ordering and Git prerequisites.

For new exposed API lists, require a bounded default, documented default and maximum limits,
stable ordering ending in a unique ID, and named behavior above the maximum. Default to cursor
pagination without overriding an established alternative contract. With more rows than the default,
exercise the bound and continuation through the terminal page without lost
or duplicate IDs on unchanged data. A complete list belongs across pages, not in an unbounded response.
Pagination must bound the underlying work too. Inspect scoped queries, indexes and representative
query plans; loading the full table and comparing every pair before slicing is not a bounded query.
For new endpoints, reads leave domain state unchanged; revision creation is an explicit command.
Keep sensitive searches out of URLs and diagnostics, and authorize sensitive fields separately
from list access. Classes 4, 5 and 11 govern permission, organization scope and disclosure evidence.

For reusable verification caches, input coverage is insufficient if a partial run publishes success.
Publish the complete success atomically only after all required checks succeed. Failure, interruption
or incomplete results must create no success entry and must not replace an existing validated one.
Require a later-check failure after an earlier success, nonzero status and no cache publication, then
a run from another worktree that executes the checks rather than replaying false success. Also
exercise interruption, preservation of a valid entry and reuse after complete success on equal inputs.

**Recurrences:** [dotfiles#604](https://github.com/SebastienElet/dotfiles/pull/604#pullrequestreview-5588717443)
— removing `.prototools` left the setup-moon manifest and `bun.lock` outside Harness task inputs;
a `@moonrepo/cli` update selected no tasks and the required job passed without validation.
[dotfiles#466](https://github.com/SebastienElet/dotfiles/pull/466#discussion_r4224027414)
— `/tsconfig.json` was missing from Bun-backed test inputs, so changes could skip those suites.

Missing accounting is `unproven`; observed loss, wrong eligibility or routing is `broken by` its
traced mechanism. The [verdict policy](../SKILL.md#verdict-policy) determines whether its consequence blocks.

## 15. Performance or rewritten instructions without comparison

**Ask:** before installation or merge, is the claimed performance or rewritten instruction's behavior
compared on base and head against a criterion fixed before measuring?

**Broken when:** shorter wording, source similarity, projection checks or green correctness tests
substitute for that comparison. For example, a rewritten instruction is installed without observing
its decisions, or an inconclusive benchmark is presented as satisfying a required performance budget.
Missing or inconclusive measurements leave the claim `unproven`; they demonstrate neither a
regression nor a gain.

**Lift:** bind observations to named base/head revisions, exact text or executable inputs, pinned
dependencies, recorded host/model/runtime and environment, identical scenarios or workload, metric
and a criterion declared before measuring. For instructions, execute violating and safe cases in
fresh contexts with each wording. For performance, preserve equivalent facts and workload, account
for noise and order effects, and keep inconclusive results `unproven`. Reuse traceable relevant
measurements under phase 4; a single favorable sample proves no uplift.

Compare before adopting a rewritten instruction. Before merge, remove or bound an unsupported
optional performance claim; a required budget or adoption criterion still blocks until qualified.
Class 13 separately requires byte-for-byte comparison of public exports.

## 16. A control trusts configuration from the PR it checks

**Ask:** is the control's enforcing configuration established outside the proposed change, and is
the authority for role or eligibility rules independent of the control under review?

**Broken when:** a PR weakens its own evaluator and the weakened result is accepted as proof. A
proposed scanner configuration with only a never-matching rule lets the scan miss a credential.
Candidate tests can catch that config-only change, but cannot prove independence if the PR can also
weaken them or the required workflow. A copied role guard cannot establish that its own exclusion
is an authorized prerequisite.

**Lift:** run enforcement with configuration from a named trusted base or an independently managed
source; assess proposed configuration separately. Derive role and eligibility expectations from an
independent product or authorization contract. Exercise a proposed weakening that still receives
the trusted refusal, and a permitted change that passes. If the evaluator, tests or workflow also
change, review them against the prior trusted policy; their own green result proves no independence.

Before enabling a new blocking scan, audit or lint control, require a trial of its exact command
on the target merged separately with every relevant open PR, including drafts, and narrow base
exceptions for legitimate fixtures in the rollout change. For history-scanning controls, check the
entire merge-base-to-head PR range or full pushed target range; scanning only `HEAD^..HEAD` misses
a non-final finding. For a shared history scanner with an allowlist, require behavioral tests of
the script actually called by CI on a synthetic Git repository: non-final
finding refused, candidate allowlist expansion still refused, trusted-base fixture accepted and
detailed diagnostics present. YAML text assertions do not exercise the step. Candidate-policy
changes need independent assessment; successful enforcement still uses the trusted target policy.

## 17. An installed tool is assumed usable

**Ask:** before relying on an installed tool or skipping installation, does the actual executable
run successfully on this host and report the required version, with its owner's execute permission?

**Broken when:** path existence, matching bytes or any execute bit substitutes for usability. A
version probe throws on an unusable cached binary before replacement can run, or a group/other
execute bit hides the missing owner bit `0o100` on a hook. The reverse error reruns installation
despite an already usable pinned CLI, adding registry dependency and mutation to replay.

**Lift:** probe the actual installed executable, not another binary on PATH; verify the owner bit
where required and successful execution/version on the target architecture. Treat absent, truncated,
wrong-architecture, non-executable and failed or empty version probes as needing preparation, without
letting the same failed probe abort replacement. Skip installation silently for a usable matching
version; propagate preparation failures. Exercise these failure paths, successful repair and an
offline replay with the matching CLI through native or existing checks.

## 18. A component is removed without retiring its footprint

**Ask:** does removing, renaming or superseding a component update its active references while
preserving cleanup of existing installations?

**Broken when:** documentation, configuration or install, upgrade and runtime commands still point
to the retired component, or its removal also deletes recognition of legacy hooks, links or
artifacts from cleanup. A clean checkout hides the installed hook still invoking a deleted binary.

**Lift:** search the former names and paths across docs, ADRs, READMEs, configuration, ignore rules
and install, upgrade and runtime commands. Update active guidance, distinguish historical records
and reconcile ignore rules with remaining artifacts. Retain owned legacy hooks, links and artifacts
in the cleanup inventory after their installation entries disappear. Exercise cleanup on an existing
installation, verifying removal of retired owned entries and preservation of foreign ones.

## 19. An inconclusive probe authorizes a decision

**Ask:** does every probe protecting a decision require a verified exit status and a complete,
relevant result before reporting success, keeping confirmed failure and inconclusive distinct?

**Broken when:** an error, timeout, unchecked child exit or incomplete output falls through to
exit 0 or `ok: true`. A shell's final status hides the failed probe, a no-match replacement is
published as configured, or a first page, public repository or empty repository stands in for
proof of a different property. The caller then acts on a conclusion the probe never established.

**Lift:** trace the probe result through the caller's decision. Fail closed on errors, timeouts,
unchecked statuses and incomplete results, with an explicit inconclusive diagnostic; retain
confirmed failure separately. Verify the intended postcondition and fetch all required pages.
Exercise those failure paths and successful controls through native or existing checks, including
legitimate empty results and public/private access distinctions where relevant. A probe failure
alone leaves the property `unproven`; a traced decision based on it is `broken by` its mechanism.

## 20. A filesystem path follows an unvalidated symlink

**Ask:** does checking, reading or writing a path preserve the intended file type, repository
boundary and symlink identity through the actual operation?

**Broken when:** a following check such as `is_file()` accepts a symlink as a regular witness,
a repository-relative path escapes through a symlinked ancestor, or a checked path is replaced
before it is reopened. Saving by renaming a regular file over a symlink silently destroys the link.

**Lift:** inspect entries without following links (`lstat` or Git tree modes), including relevant
ancestors, or canonicalize and verify containment within the canonical repository root. Consume the
validated object or handle; reopening the original path forfeits that validation. When saving through
an allowed existing symlink, preserve the link and update its validated target. Exercise regular
files, leaf and ancestor symlinks, outside and dangling targets, replacement between check and use,
and link-preserving saves. Missing executed cases are `unproven`, not a demonstrated escape.

## 21. The execution environment is assumed

**Ask:** does each suggested or executed command establish its Git remote and branch, executable
lookup path, inherited values, database session timezone and file modes against an independently
established contract, preserving declared, supported environment settings?
Does each command or wrapper receive its target (repository, worktree, PR) explicitly, without
inferring it from the current directory or branch? Are target options (`-C`, `--cd`, etc.) resolved
before any other processing, wherever they appear on the command line?

**Broken when:** undeclared or unsupported inherited state contradicts that contract: an assumed
ref such as `origin/main` makes a valid checkout fail, PATH prevents required executable lookup,
or an inherited flag defeats a promised bootstrap. Success in the author's shell alone does not
establish those prerequisites elsewhere.
A command selects a PR from the current branch despite an explicit repository, or a wrapper reads
Git metadata before resolving its target option, including when that option follows a subcommand.

Use observed environment values and test timestamp semantics with explicit offsets in a non-UTC database session.
For a CI commit identifier, verify the actual supplied abbreviation against the resolved commit under
the platform contract; an invented full-length SHA does not qualify that path. A fallback disabling
the promised feature needs an explicit diagnostic and a test proving the observed valid value avoids
it. Before a push, verify tracked executable bits and successful execution through the actual invocation.

**Lift:** resolve the conflicting state within the command's contract and verify the intended ref,
executable lookup or bootstrap in the actual execution context through native or existing checks.
Pass the target explicitly and resolve target options before any other processing. Exercise
different current directories and branches, with target options before and after a subcommand,
and verify that only the explicit target is used.
Preserve declared, supported settings such as offline mode, proxy or registry; diagnose genuinely
unavailable prerequisites without guessing.
For changed-file lint, make the Git base contract explicit. If an implicit default base is absent,
inspect all files and announce that fallback; an explicitly requested missing base remains an
error. Resolve the root with `git rev-parse --show-toplevel` for the selected repository, independent
of the working directory. Exercise both missing-base cases and a public subdirectory invocation.
For each added test, identify the CI step that runs it and whether dependencies are installed
there. Module-level `createRequire(import.meta.url).resolve("some-lint-cli/package.json")` fails
before assertions in a dependency-free job despite passing local preflight. Replay in the actual
prerequisite state, for example from `git archive` without `node_modules`; requiring a package is
valid when that step installs it, and an archive alone does not prove the rest of CI's environment.

A transpiling test runner does not establish type correctness. Require the separate project
typecheck on the composed tree, including contract-consuming fixtures and port implementations;
shared typed factories and test ports avoid dispersed stale copies. Class 13 still requires actual
export comparison for a claimed unchanged public contract; typecheck is not a substitute.
Before production exposure of widened file types, quotas or origins, require a pre-production
exercise naming environment and result. Missing access is a proof limit, not an invented success.

## 22. Personal data outlives its declared lifecycle

**Ask:** where can personal fields be persisted or exposed, and does export/erasure cover every
copy and reference on the integrated schema?

**Broken when:** an idempotency response, cache, log or queue copies personal labels without a
retention/erasure path; a handwritten context list omits a newly integrated reference; or a read
returns unused personal fields and aggregate views retain anonymized records contrary to contract.

**Lift:** inventory fields before adding persistence, redact unnecessary fields and justify retained
ones with the applicable policy. Assert the exact stored body independently of the caller's response,
with an observed assertion failure when redaction is removed or broken, followed by success after
restoration. Reconcile export/erasure coverage with the integrated schema and
actual storage paths, not another closed list. Exercise an uncovered personal reference and all
affected anonymized reads/aggregates. Missing retention decisions require owner validation; code
alone establishes neither policy approval nor legal compliance. Class 6 governs public API changes.

## 23. A dependency upgrade bypasses a compatibility restriction

**Ask:** do touched pins, overrides, patches and their recorded reasons permit this upgrade, and
does every affected service still build and start?

**Broken when:** an upgrade contradicts a recorded restriction, leaves a version-bound patch unused,
selects an unapproved prerelease or branch build, or breaks frozen installation in an image copying
only part of a workspace while application tests pass.

**Lift:** read the attached rationale, verify current upstream documentation and local configuration,
and retain restrictions until their lift condition is demonstrated. Verify patch application and
resolved versions; prereleases and branch builds require explicit approval. Build and start every
affected image that installs dependencies, exercising its actual copied manifests and frozen
lockfile, then start every upgraded service, startup migration included, and observe its health probe
green; an entrypoint run once in a throwaway container without its probe does not qualify. Then run
only checks the repository already runs for files and consumers affected by the upgrade. Reuse
evidence after comparing relevant source, oracle, configuration, dependency, environment and
integration inputs; preserve its provenance and the comparison justifying reuse. State any
uncertainty in the affected scope and investigate existing checks rather than defaulting to the
complete suite. Record commands, output, exit statuses and tested revisions for new runs, and
identify missing evidence. Report image names and environment; unit tests do not establish image
usability.

## 24. A supervisor reports success before cleanup completes

**Ask:** are process ownership, waits, cleanup and subprocess output checked through completion?

**Broken when:** a second signal interrupts cleanup, a child ignoring termination survives, a worker
wait is unbounded, cleanup failure leaves a success receipt, or a zero exit status hides a subprocess
error or truncated output.

**Lift:** preserve the original status before cleanup, prevent reentrant exit and ignore further
handled signals while cleaning up. Bound every wait, escalate termination for owned process groups
and verify exit. Cleanup failure makes an otherwise successful command fail without masking an
earlier nonzero status; success receipts wait for successful cleanup. Check execution errors and
output completeness as well as status. Exercise a second signal, a termination-resistant child,
an unresponsive worker, truncated output with status zero and cleanup failure after success/failure
using bounded offline tests. State direct uncatchable-kill and detached-descendant limits in delivery.

For cross-system writes, inspect durable compensation after partial failure, abandonment or
conflict. Cleanup removes only unreferenced objects and must preserve another operation's object;
observe eventual cleanup and successful replay. An outbox with an idempotent consumer is an
alternative under the storage contract. Do not announce completion before durable finalization.

## 25. A reference is checked for existence only

**Ask:** which attributes and states make each reference valid for this operation, and are all checked?

**Broken when:** "X must exist" accepts rejected, withdrawn, expired or never-granted X, or a mismatch
in unit, period, owner or scope. The dependent object freezes or feeds computations on an invalid
basis: approval accepts any existing linked review, or a count equals stock in another unit.

**Lift:** the design lists the validity attributes (status, unit, period, owner, withdrawal, provenance,
publication, source closure and current cycle where applicable) before
implementation. Each divergence is refused with its own error code and has a test that fails when the
corresponding comparison is removed.
Exercise provisional results, open sources and favorable results from a previous cycle, plus a valid
published result from the closed current cycle. Inspect reverse transitions too: where reopening a
referenced source is forbidden, refuse before modifying tracking or evidence, with a named error.
Protect the dependency check and transition atomically against a concurrent new association;
test refused reopening without loss of dependents, tracking or evidence.

Form-only rules need direct server refusals. Enforce a downstream precondition at the step producing
the state that promises it, with the same stable code and contracted status at both steps. Mutable
reference validity remains protected until the write. An explicitly incomplete draft is permitted;
class 27 governs incompatible historical rows without arbitrary repair or deletion.

A check that can conclude "nothing to report" first enumerates required evidence kinds: missing
items, unknown status or null expiry warn or refuse, never succeed, unless an explicit domain rule
permits null expiry to mean unlimited. For a warning-producing compliance check, an expired-only
filter cannot prove compliance: a missing required item is `missing`, and `UNKNOWN` or undated
evidence is `to_confirm`, not an empty warning list interpreted as verified. Require separate valid,
expired, unknown, undated and missing cases, plus the permitted unlimited control. Inspect the
recorded examined evidence and outcomes: verified compliant and unverifiable must remain
distinguishable.

## 26. A compound period is applied out of the rule's order

**Ask:** is each period of a compound deadline applied as a successive step in the order of the
rule's text, and does every expected value come from that text?

**Broken when:** successive periods are added together. With end-of-month clamping, "2 months after
the expiry of a one-month grace period" starting on January 31 gives February 28, then April 28;
adding three months at once gives April 30. A decision document aligned on the wrong calculation
hides the defect from review.

**Lift:** the steps are chained in the rule's order, with the source rule cited beside the function.
Tests start on days 28, 29, 30 and 31, cross short months and leap and non-leap years, and derive
their expected values from the rule's text, not from the code or a document aligned on it.

## 27. A schema change leaves existing rows and schema-walking routines behind

**Ask:** after this migration, what do pre-existing rows contain, and which routines walk the schema
(purge, archive, export, personal-data erasure, seed) now meet a new table or column?

**Broken when:** a new nullable column stays null on old rows and a predicate such as
`kind <> 'CLOSING'` evaluates to null, silently excluding them from a total; or a new table
references existing entities through a `RESTRICT` foreign key and a routine deleting the referenced
rows now fails.

**Lift:** the migration backfills the column before constraining it, or the null is handled
explicitly, proven by a test on a row inserted without the column. Every routine touching the related
tables is found by search and updated, deleting dependents first, with a test that creates a
dependent row and then runs the routine.
Populate every new relation in the routine test and assert the complete result. For new or widened
constraints, detect incompatible old data in the migration and apply an owner-validated treatment,
or refuse diagnostically before modification; never delete conflicting data arbitrarily. Exercise
the migration on representative historical data and the authorized exit from a pending state that
now blocks another operation.

## 28. Tests silently expire with the machine clock

**Ask:** does every date-sensitive assertion use time controlled in the system under test, and what
happens after its fixed fixtures cease to be future dates?

**Broken when:** an HTTP response expects the test's creation date, a literal event date is assumed
future, or a maximum-duration fixture becomes invalid as today advances. Passing once hides expiry.

**Lift:** search date literals in added or changed tests and explain each as a controlled-clock
anchor, a relative date from that clock, or an independent calendar case. Inject or freeze time in
the application; derive relative inputs from the same clock with the project's calendar operations.
Exercise the exact boundary and first refused value, replay at several controlled dates including
one beyond the old fixtures, and specify the timezone when crossing midnight matters. A fixed
calendar case independent of today is valid; moving an expiry farther into the future is no fix.
Trace domain time reads to the injected clock; `new Date()` or `Date.now()` outside its adapter
must not bypass it. Before restoring real timers, unmount consumers, drain pending fake work and
clear timers in `finally`. For Vitest UI tests this can be `cleanup()`,
`await vi.advanceTimersByTimeAsync(0)`, `vi.clearAllTimers()`, then `vi.useRealTimers()`.
Search all matching teardowns with `rg useRealTimers` after finding the pattern; fixing one neighbor
leaves order-dependent failures elsewhere. Replay repeatedly and in randomized order without retries.

## 29. Append-only storage remains mutable or blocks authorized erasure

**Ask:** which database mechanism protects every promised immutable collection, against which SQL
role, and how do authorized purge and erasure still work?

**Broken when:** application methods alone avoid edits, another version collection is forgotten,
row triggers leave `TRUNCATE` open, or new protections also prevent the required purge/erasure path.
A freely settable application flag makes an exception an ordinary-write bypass.

**Lift:** inventory all collections and mechanisms. With existing rows and the protected role,
exercise raw `UPDATE`, `DELETE` and `TRUNCATE` separately in independent transactions, asserting
refusal and unchanged content. Specify and test any one-time transition and permitted fields,
rejecting repeated transition or content mutation. Qualify claims against schema administrators.
Make purge, erasure or demo reset required or permitted by the established contract explicit, proving
success plus non-bypass by the ordinary role. Class 22 still governs personal-data policy; permanent refusal
does not prove compatibility with erasure.

Publication must refuse held items without lifting their protection; release is a distinct
authorized command. For every protection, identify erasure authority, scope and preconditions,
or leave the missing policy as an explicit open question. An undecided demo purge cannot justify
disabling protections or claiming an authorized cleanup path already works.
For filed documents, persist the exact deposited version and verify sealing before finalization.
Read that retained version without latest-version fallback; missing or failed integrity refuses.
Require sealing failure, deposit-to-record recovery and historical-read cases, not a field alone.

## 30. A derived concept omits a producer or legitimate historical input

**Ask:** have all producers and consumers of the new projection or precondition been accounted for,
including imports, periodic jobs, opening data and paths integrated from parallel work?

**Broken when:** only the new path feeds derived state, an import leaves completed work outstanding,
an arbitrary open row receives another operation's allocation, or a precondition requires an object
that admitted historical data never had.

**Lift:** search writes and reads of the concept with `rg`; record each producer and consumer in
the PR with its connection, migration, explicit historical handling or contract-backed exclusion.
Converge writes sharing the invariant within its atomic boundary, preserving origin and target
identity. Exercise every source, import replay without duplicates, allocation to the intended target
and admitted historical operations without fabricated new-workflow objects. Verify consumer results,
including that an imported completion suppresses the corresponding reminder.

## 31. Collection replacement loses referenced identity or signs unrelated metadata

**Ask:** which incoming references depend on retained IDs, and which fields actually belong to the
signed content?

**Broken when:** global delete/reinsert changes IDs of unchanged elements, or a fingerprint includes
an unsigned default flag, display order or technical timestamp and needlessly invalidates approval.

**Lift:** inventory incoming references and select a stable identity key; apply the difference in
one transaction, retaining unchanged IDs, inserting additions and explicitly handling duplicate keys
and referenced removals. A changed key is a removal plus an addition, with no undecided cascade.
List signed fields justified by the content presented for signature, using the existing canonical
serialization contract. Separately test addition, default change, signed-content change and
referenced removal: retained IDs and current approval survive unsigned changes, signed changes
invalidate approval, and removals follow the contract without dangling references.
For UI element keys, prefer stable IDs. A composite such as type plus nullable expiry can collide;
require uniqueness even with null or empty components, or replace it with the stable ID. Exercise
two such elements and independent selection or update; a render that ignores warnings proves little.

Freeze labels and attributes used to describe historical facts at first use. First use and rename
share the same lock; refuse a changed used label with the contracted error, while identical replay
succeeds. Require the overlapping first-use/rename case, not only a sequential already-used check.

## 32. A dated rule loses its reference date, boundary, exception or counting mode

**Ask:** which applicable source and version establish each effect's date, attribution, limits,
exceptions and counting modes?

**Broken when:** the common case substitutes an effective date for the required later notification,
attributes a result at period end instead of approval, drops a maximum duration or decision-date
bound, counts a participation mode incorrectly, or applies a minimum despite an established waiver.

**Lift:** cite the source's applicable version and status in the design, explicitly recording
reference dates, inclusive/exclusive bounds, exceptions and counting modes. Encode the established
rule in the domain. Derive tests independently from the source: before/equal/after dates, attribution
where candidate dates yield different holders, maximum and first excess, every counting mode and
each waiver plus the ordinary case. Control today-dependent comparisons as in class 28; class 26
still governs compound calendar arithmetic. Material ambiguity needs the rule owner's decision;
a proposal, code-aligned document or passing fictional-policy test establishes no real authority.
Distinguish manufacture from approval dates when the source names approval. For each entered date,
identify established ordering relations and enforce them at the API, domain and database boundaries, such as
`CHECK (terminated_on >= started_on)`, and test equality, the previous day and the next day.
A mandated duration requires or derives expiry; accepting null silently loses that bound. Class 25
covers how missing or undated evidence affects the later compliance decision.
