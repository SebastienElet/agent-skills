# Failure classes

Questions to put to the diff in phase 3. Each is a question, not a checklist item to tick: the
answer is a sentence about _this_ diff. Record one of four outcomes per class.

- **not applicable** — the diff does not touch that concern; say why in one clause.
- **holds because `<evidence>`** — name the constraint, the transaction, the schema, the test.
- **unproven** — the concern applies, but sufficient relevant evidence is missing; name the gap.
- **broken by `<mechanism>`** — an ordered sequence of steps that ends with a violated invariant.

`broken by` becomes a blocking defect only when its mechanism is written out.
"This looks racy" is not a mechanism; "request A snapshots at T1, request B writes at T2, A commits
at T3 and B's row is absent from the successor" is.

`unproven` becomes an evidence blocker only when the missing proof is essential to approval under
phase 5: explain why it is essential and what would lift the gap. Otherwise retain a bounded
reservation with its lift condition. Missing proof never establishes a violated invariant; do not
invent a failure mechanism or record `holds` to fit the verdict.

The same questions apply to a design document: the mechanism under review is what the document
authorizes someone to build. A document that leaves a class open produces the defect during
implementation instead of preventing it during review.

## 1. Atomicity and ordering

**Ask:** is the read that grounds the decision inside the same transaction as the write it
authorizes?

**Broken when:** a snapshot, a count, or a set of validation checks runs before the transaction
opens. Anything committed in that window is invisible to the decision but visible to everyone
afterwards — the write is authorized by a state that no longer exists.

**Lift:** the read moves inside the transaction, at an isolation level that actually prevents the
interleaving, or the invariant is enforced by a constraint the concurrent write cannot satisfy.

Separate read-only planning from execution: complete all domain and authorization refusals before
the first irreversible effect, including permanent derived creation, consumption of a non-reusable
identifier or an external call. Admit each referenced entity's existence and relationship to the
authenticated scope before deriving anything from it; retain formerly related entities when the
authoritative contract permits them. Keep state-dependent checks within the atomic boundary above;
planning must not become a stale precheck. For each refusal path, assert that no derived resource
was persisted, no non-reusable identifier was consumed and no external effect occurred. Preflight
checks do not eliminate later storage or protocol failures; do not claim rollback covers effects
it cannot undo.

## 2. Retry idempotence

**Ask:** after a conflict, does the retry re-read the winning state, or does it replay the decision
it computed before the conflict?

**Broken when:** the retry loop wraps only the write. The second attempt re-applies a stale
decision and produces a duplicate — a second successor, a second invoice, a second charge — with no
error anywhere.

**Lift:** the retry re-enters the whole read-decide-write unit, or the write is keyed so that the
duplicate is rejected by the database.

For each transition of an existing resource, including later workflow stages, require an expected
version or equivalent concurrency precondition checked atomically with the mutation. Creation needs
its own uniqueness/replay key, not a nonexistent prior version. Name the replay contract: refuse a
duplicate before any effect or return the prior result without repeating it. Exercise replay and,
where required, stale and missing versions through each action, observing unchanged state and no
additional external effect on refusal.
After a successful UI write, close or refresh the form so it cannot resubmit the consumed version.

## 3. Invariant without a constraint

**Ask:** which index or database constraint makes this invariant unfalsifiable?

**Broken when:** the answer is "the service checks it". Application-level uniqueness or ordering does
not exist under concurrency: two processes both read "absent" and both insert. A unique index, an
exclusion constraint or a serializable transaction is the only thing that survives.

For upgrades or resynchronization from a reference model, identify the local derivations, invariants
and user choices affecting each copied field. Exclude locally derived state from copying or recompute
it with its canonical rule; a reference default cannot override that rule. Preserve user choices
according to the established ownership contract. Require a regression case with derived state before
the upgrade that survives afterwards, and a diagnostic or upgrade report for excluded copies.

**Lift:** the constraint exists in a migration, and a test proves the second writer receives the
violation rather than succeeding.

For sequential or timestamped identifiers, compare the proposed value with the fetched destination,
relevant open PR heads including drafts, and relevant remote branches without a PR, not only the
local maximum. Check ADR and other decision/document numbers, migration order and module/permission
manifest versions bound to content. Recheck after each destination integration and record the chosen
values and inspected refs in delivery evidence. A conflict-free merge is no uniqueness proof; use
the existing registry or migration validation when available. Do not renumber already applied
migrations or silently combine independently owned manifest contents. Disclose parallel changes to
the same versioned manifest in delivery evidence and coordinate their integration so a fresh version
preserves the intended union of keys instead of overwriting an earlier addition.

## 4. Authorization as a side effect

**Ask:** is the access check named in a dedicated call, or obtained incidentally through a function
called for another reason? For exempt objects, keep the attributes that make them harmless fixed
across every mutation path.

**Broken when:** authorization happens because some loader happens to filter by the caller's scope. A
refactor that swaps that loader for a cheaper query removes the check, every test stays green, and
nothing in the diff looks like a security change.

**Lift:** an explicit authorization call whose removal fails a test written against it.

Inventory every route and use case in the touched module on the integrated tree, including existing
neighbors: `route/use case → permission → access scope → refusal test`. Include the inventory in
the PR description. Require explicit permission and scope, or a documented intentionally public
contract; authentication and a permissive global guard are insufficient. Use minimally privileged
subjects, with separate missing-permission and out-of-scope cases, rather than administrator-only
tests. Arrange each refusal case so only the targeted predicate can reject it, and observe an
assertion failure when that predicate is removed or broken, followed by success after restoration.

## 5. Tenant scope

**Ask:** can a client-supplied identifier override the scope established by authentication?

**Broken when:** a tenant, organization or account id arrives in the request body or path and is used
without being reconciled against the authenticated scope. The endpoint then reads or writes across
tenants for any caller who edits an id.

**Lift:** the authenticated scope is the only source of the identifier, or the supplied value is
verified against it and the mismatch is rejected — with a test for the mismatch.

## 6. Error contract

**Ask:** are the returned status codes documented, and do the documented ones match the real
behavior?

**Broken when:** the code returns 409 where the documentation promises 412, or a new precondition
failure is added and nothing says so. Clients build retry logic on these codes; an undocumented
change is a silent behavioral break in every consumer.

**Lift:** documentation and implementation agree, and the mapping is asserted somewhere that runs in
CI. This class alone is usually a reservation, not a block — unless a consumer's retry path depends
on the code that changed.

A changed observable response on a versioned public API is a compatibility decision, including a
new blanket refusal where deletion previously succeeded. Preserve the published contract, introduce
a new version, or obtain an explicit owner-approved contract amendment before delivery. A newly
proposed retention policy alone does not authorize breaking existing clients.

## 7. Deferred functionality

**Ask:** is the absent regulatory or business control declared as an explicit contract — what is
missing, why it is acceptable now, and the condition that lifts it — or is it silently omitted?

**Broken when:** a control the domain requires is simply not there, and the PR says nothing. The gap
then becomes invisible: it survives review, ships, and gets discovered by the party the control
protected.

**Lift:** the contract is written down in the code and in the PR, with its lift condition. Silence is
the defect; a stated deferral with a named condition is a reservation.

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

**Recurrences:** [dotfiles#604](https://github.com/SebastienElet/dotfiles/pull/604#pullrequestreview-5588717443)
— removing `.prototools` left the setup-moon manifest and `bun.lock` outside Harness task inputs;
a `@moonrepo/cli` update selected no tasks and the required job passed without validation.
[dotfiles#466](https://github.com/SebastienElet/dotfiles/pull/466#discussion_r4224027414)
— `/tsconfig.json` was missing from Bun-backed test inputs, so changes could skip those suites.

Missing accounting is `unproven`; observed loss, wrong eligibility or routing is `broken by` its
traced mechanism. The Reporting section determines whether its consequence blocks.

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

**Broken when:** undeclared or unsupported inherited state contradicts that contract: an assumed
ref such as `origin/main` makes a valid checkout fail, PATH prevents required executable lookup,
or an inherited flag defeats a promised bootstrap. Success in the author's shell alone does not
establish those prerequisites elsewhere.

Use observed environment values and test timestamp semantics with explicit offsets in a non-UTC database session.
For a CI commit identifier, verify the actual supplied abbreviation against the resolved commit under
the platform contract; an invented full-length SHA does not qualify that path. A fallback disabling
the promised feature needs an explicit diagnostic and a test proving the observed valid value avoids
it. Before a push, verify tracked executable bits and successful execution through the actual invocation.

**Lift:** resolve the conflicting state within the command's contract and verify the intended ref,
executable lookup or bootstrap in the actual execution context through native or existing checks.
Preserve declared, supported settings such as offline mode, proxy or registry; diagnose genuinely
unavailable prerequisites without guessing.

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
do the dependency-installing images still build and start?

**Broken when:** an upgrade contradicts a recorded restriction, leaves a version-bound patch unused,
selects an unapproved prerelease or branch build, or breaks frozen installation in an image copying
only part of a workspace while application tests pass.

**Lift:** read the attached rationale, verify current upstream documentation and local configuration,
and retain restrictions until their lift condition is demonstrated. Verify patch application and
resolved versions; prereleases and branch builds require explicit approval. Build and start every
affected image that installs dependencies, exercising its actual copied manifests and frozen
lockfile. Report image names, commands and environment; unit tests do not establish image usability.

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

## Reporting

Classes 1, 2, 3, 4, 5, 7, 9, 11 and 12 name mechanisms that lose data, corrupt state or cross a security
boundary: when broken, they block. Class 14 blocks when its demonstrated loss, wrong eligibility or
routing removes required checks or prevents a promised workflow; other diagnostic omissions are
bounded reservations unless their evidence is essential under phase 5.
Classes 6, 8, 10 and 13 are usually reservations — promote class 6
when a concrete consumer's retry path depends on the changed code, class 8 when the degraded value
reaches a person or a legal act, and class 10 when the claim is legal, evidentiary or contractual.
For class 13, label the unchanged-contract claim `unproven` until the exported bytes are compared;
block when the comparison exposes a promised compatibility break or when compatibility proof is
essential to approval. Missing hostile-input or output coverage in classes 11 and 12 is an evidence
gap, not an invented leak: apply phase 5's essential-evidence rule and name the missing proof.
For class 15, retain `unproven` until a relevant base/head comparison satisfies the declared criterion;
block installation or merge when rule adoption or a required performance budget depends on it.
An optional unsupported claim can instead be removed or bounded; do not invent a measured defect.
Class 16 blocks when a proposed weakening defeats a required security or authorization control.
Class 17 blocks when an unusable tool skips a required check or prevents a promised workflow;
redundant installation with a bounded consequence is a reservation. Missing independence or usability
evidence remains `unproven`; apply phase 5's essential-evidence rule rather than inventing a bypass.
Class 19 blocks when an unsupported probe conclusion authorizes a protected operation, skips a
required check or prevents a promised workflow. Otherwise bound its consequence as a reservation;
missing essential probe evidence follows phase 5's `unproven` rule.

Class 20 blocks when following or replacing a symlink crosses the repository boundary, defeats a
required file-type check or loses data or link identity. Missing symlink evidence remains `unproven`;
apply phase 5's essential-evidence rule without inventing an escape or race.

Class 21 blocks when undeclared or unsupported inherited state contradicts the command's independent
contract and skips a required check or prevents a promised workflow; declared, supported settings
are not defects. Bounded inconvenience is a reservation; missing evidence remains `unproven` under phase 5.

Class 22 blocks demonstrated unauthorized retention, disclosure or incomplete promised erasure.
Classes 23 and 24 block a demonstrated contract violation or failure of a required build, workflow
or cleanup guarantee. Missing evidence follows phase 5; do not invent a leak or surviving process.

The default below does not downgrade phase-2 defects: a demonstrated guard that prevents a promised
user action blocks, even outside these classes.

Other findings outside these classes are legitimate but non-blocking by default: report at most three
of them, one line each, labelled non-blocking, or drop them. The cap is what stops the sweep from
turning into a second review that competes with the verdict — rank them by whether they would change
a reviewer's decision and keep the top three. If the verdict runs past about thirty lines, that is
the symptom that preferences have crept into the blocking section.
