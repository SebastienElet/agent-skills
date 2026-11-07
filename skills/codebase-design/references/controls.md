# Refusal Controls

Use this reference when designing, implementing, simplifying or reviewing a permission check,
validator, hook, lint rule or blocking CI check. The enclosing workflow retains ownership;
control work does not introduce a separate development stage.

## Contract and boundary

Identify the protected operation, the value it actually receives and the independently established
rule. Check resolved paths, received bytes and effective permissions at the boundary owning the
effect. A command string, declared type, log or upstream UI validation may describe another value
or miss another caller. Label such heuristics advisory; they cannot be the sole barrier to an
irreversible consequence.

Use the project's permission model; require a separate action permission only when its contract
does. For an exemption, identify the attributes making it safe and preserve them through updates,
attachments and ownership transfers, or reapply the control atomically before they change.
Use one canonical policy for allowlists and derived defaults. Unknown input refuses unless an
explicit contract permits keeping it raw, isolated and replayable.

When removing a blanket or transitional authorization, inventory every route it covered, including
neighboring reads and agent tools. Preserve each route's applicable permission before any data
access; a denied read must not reach the repository. Resolve authorization once at the request
boundary and pass that result through the request context, rather than resolving it again downstream.
Test every guard choice of application identity or strategy, and exercise the supported host's
context installation and refusal when that context is missing. Remove unused resolution providers.
Bind a versioned permission manifest's version and complete key set in the same contract assertion.
Observe request completion or an explicit synchronization point when proving one resolution;
a fixed delay cannot prove the request finished.

Use syntax the repository's existing static controls can follow. If its error-catalog check tracks
literal `ERRORS.orders.refundTooLate` members, emit that form instead of hiding codes behind
`const codes = ERRORS.orders` or computed access. Do not bypass or weaken the check to admit an
untracked construction. For a new refusal or prerequisite, use `tdd`'s affected-flow inventory before
claiming readiness.

Distinguish a complete empty set allowed by the contract from missing runtime, unreadable input,
parser failure and incomplete discovery. A control unable to examine its required inputs refuses
with a diagnostic; keep probe errors visible rather than converting them into a clean result.

## Observable evidence

Use `tdd` at the owning boundary for permitted behavior, named refusals without forbidden effects,
valid empty inputs and unavailable or incomplete inputs. Enumerate relevant alternate entry points
and bypasses before choosing cases: direct API calls, aliases, argument variants, changed paths
and missing prerequisites. Exercise each claimed refusal with a discriminating automated case;
native validation or existing behavioral checks suffice for declarative changes.

Observe the refusal assertion fail when the protected behavior is removed in a disposable copy,
then pass after restoration. Test-first failure for that same missing behavior already supplies
this witness. When a cheap bypass has a material consequence, use a fresh context to attempt it
and retain attempts and results; a warning-only control does not require this adversarial pass.

## CI controls and verification caches

Before activating a new blocking check, `implement` trials its exact command on the fetched target
and its separate compositions with relevant open PRs, including drafts. Put narrow exceptions for
legitimate fixtures in the rollout change. A tree check examines its complete declared tree inputs;
a history check examines the full merge-base-to-head PR range or pushed target range, including
non-final commits. Keep enforcing configuration outside the candidate's authority and assess any
proposed policy change independently.

Read the relevant classes in the `pr-verdict/references/failure-classes.md` catalogue: 4 for
authorization, 8–9 for actual input and content integrity, 14 for selection and atomic cache
publication, 16 for trusted configuration and rollout, 19 for inconclusive probes and 20 for paths.
This reads shared design guidance without invoking `pr-verdict`.

Trace the actual CI entry point and its log or controlled failing witness; a task plan alone
does not prove execution. Derive cache keys from all runtime inputs and publish success atomically
only after every selected check succeeds. Failures, interruptions and incomplete runs publish no
success and preserve an existing validated entry; exercise this through the cache's public interface.
Use `proof-integrity-review` for independent assessment when verification mechanisms change;
missing essential execution evidence remains an explicit delivery limit.

For any fingerprint authorizing cache reuse or replay, enumerate environment capabilities that
can change the verdict, including the effective role, privileges and incompletely modeled grants.
Observe each at the execution boundary and validate its strict runtime type before creating a
reusable fingerprint; a declared type or truthy coercion is insufficient. Missing or invalid
observations refuse reuse or add a fresh nonce. If the capability is not fully modeled, use a nonce
and execute afresh on every invocation, even when the observed fields are unchanged. For example,
a SQL validation fingerprint covering only superuser status cannot authorize reuse for ordinary
roles whose grants remain unmodeled. Write failing assertions exposing misleading replay first,
then implement the correction; include missing and invalid observations and a reusable control.

Trace environment APIs read by assertions into the executor witness. Observe availability as a
strict boolean or a stable capability digest in the fingerprint, never the volatile measurement.
For resident memory, probe the actual reader and accept only a strictly positive safe integer;
a missing API, exception or invalid value means unavailable. `residentMemoryAvailable: true`
describes that capability without hashing `rss`. Image and runtime identities alone do not prove
optional host capabilities. Unavailable or invalid availability disables replay, forces fresh
execution and reports the uncovered capability. Keep the assertions unchanged: fresh execution
may fail and must not become a cached success through skipped or weakened assertions.
