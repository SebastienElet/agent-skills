# Evidence and collections: decision scenarios

All systems and policies below are fictional. The observations are supplied scenario facts, not
software executions. Compare guidance in separate fresh contexts: base at `0aa0b8c` through
`git show`, candidate from the working tree. Give both readers this identical file and the same
guidance paths; withhold the author's conclusions and the other reader's response. Do not run a
live PR workflow or execute the represented applications.

Criterion fixed before comparison: for every case identify each supplied violation or essential
proof gap, name the owning boundary and smallest relevant evidence, and accept the safe control
without rejecting permitted behavior. Record decisions and specificity separately; equal decisions
establish no detection-rate gain. Do not infer execution from scenario facts or aggregate tests.

## Cases

1. **Required evidence.** In `clinic-api`, `expiredCertificationWarnings(certs, today)` only
   selects expired status or a non-null expiry before today. Required kinds are not an input.
   Missing certification, `UNKNOWN` and null expiry each yield no warnings; that empty array is
   saved as verified compliance without the examined evidence. The applicable fictional rule
   requires dated validity. Control: required kinds are enumerated; separate valid, expired,
   unknown, undated and absent cases yield compliant, expired, `to_confirm`, `to_confirm` and
   `missing` outcomes. Saved examined evidence distinguishes unverifiable from verified compliant.
   A separate rule explicitly permitting unlimited validity accepts null expiry on otherwise
   verified evidence; an optional absent kind is not reported as required missing evidence.
2. **Blocking rollout.** `shop-api` adds a blocking secret scan without trying open PRs; an open
   draft contains a harmless fixture not authorized by the base. Target pushes scan only
   `HEAD^..HEAD`, missing a finding in the first of three pushed commits. The candidate can widen
   its own `.scan.toml` allowlist; logs omit detail, and only YAML text is tested. Control: the exact
   command is trialled on the target merged separately with every relevant open PR, including
   drafts, in disposable repositories. Narrow fixture exceptions receive independent review in
   the rollout change. Enforcement reads trusted-target configuration, covers the complete PR or
   pushed range and emits detailed diagnostics. The script actually called by CI is exercised on
   a synthetic Git repository: a non-final finding and candidate allowlist expansion both refuse,
   while a fixture already authorized by the trusted base passes. No YAML mirror test is required.
   A tree-scoped typecheck still exercises its declared inputs; it needs no invented history scan
   or scanner allowlist fixture.
3. **Independent approval.** `library-api` advertises two-person waiver approval, but
   `POST /fine-waivers/:id/approve` only checks `approveWaiver`. Its proposer has that permission;
   the proposer is not stored, and self-approval writes successfully. Control: a required
   `proposedBy` and a named database check protect distinct actors. An authorized proposer gets
   the named `403` without writes; another authorized actor succeeds; an actor without permission
   is refused separately. A real database rejects direct SQL self-approval, and the application
   maps the constraint to the same self-approval error. One eligible actor is escalated as a policy
   decision rather than bypassing the invariant.
   A separate draft-to-publish contract explicitly permitting the same actor does not promise
   independent approval and must not be converted into a two-person workflow.
4. **Collection contract.** `shop-api` creates two orders on concurrent duplicate submissions;
   reusing a key with a different body silently creates another. `GET /suppliers` returns all
   rows with no maximum; the UI uses type plus nullable expiry as a key for two distinct elements.
   Control: scoped, retained `Idempotency-Key` records and effects commit atomically under database
   uniqueness; identical requests replay the response, concurrent duplicates make one row and a
   changed body receives `422` without another effect. Default and maximum page limits and
   above-maximum behavior are documented. Tests with more rows than the default exercise bounded
   pages, stable cursor ordering ending in a unique ID, complete unchanged-data traversal and a
   terminal page. Stable element IDs preserve independent selection/update of two undated items.
   A different creation operation may omit replay only with an explicit justified contract.
   An existing bounded offset-pagination contract is preserved rather than forcibly migrated.
5. **Narrowed task inputs.** `shop-api` narrows architecture-test inputs, omitting a dynamically
   read configuration. An isolated change to that configuration selects no affected task, so CI
   reports success without executing the test. The lint cache also omits its configuration; local
   preflight reads a different configuration path from CI. Control: every runtime read is inventoried,
   each isolated input edit replans the task in the native affected dry-run, cache inputs cover
   those reads and local/CI paths agree. A controlled execution witness separately proves the check
   runs; planning output alone is not promoted to execution evidence.
6. **Dependency-free CI.** A `library-api` test resolves
   `createRequire(import.meta.url).resolve("some-lint-cli/package.json")` at module scope. Local
   preflight has dependencies; the CI step running that test has none, so import fails before
   assertions. Control: the actual CI step and its prerequisites are identified; a commit archive
   is replayed without installed dependencies under those conditions. Resolution of installed
   packages is retained only in a step that installs them; the dependency-free test no longer
   requires the CLI. The archive is not claimed to reproduce unrelated CI conditions.
7. **Fake-timer teardown.** A `shop-api` UI test calls `vi.useRealTimers()` while a fake-timer
   notification is still pending. An agent fixes one test, leaving other matching teardowns;
   order-dependent failures remain. Control: every occurrence is inspected with `rg useRealTimers`;
   affected teardowns use `cleanup()`, `await vi.advanceTimersByTimeAsync(0)`,
   `vi.clearAllTimers()`, then `vi.useRealTimers()` in `finally`. Repeated and randomized-order
   runs pass without retries. Tests with no fake timers need no invented timer cleanup.
8. **Domain clock bypass.** `library-api` injects a clock, but one domain function reads
   `new Date()` and another reads `Date.now()` directly, so frozen-clock tests miss the actual
   runtime date decision. Control: all owned current-time reads go through the clock adapter and
   replay across controlled dates. Construction of an independent fixed calendar date remains
   permitted; it does not read current time.
9. **Reference date and validity.** A fictional `clinic-api` certification policy in force
   calculates validity from approval, but code uses manufacture. A mandated duration also accepts
   null expiry as unlimited. Control: independent source-derived cases use different manufacture
   and approval dates, test the bound and first excess, and require or derive expiry. A pending
   alternative is not authority; an unrelated explicitly unlimited rule can still accept null.
10. **Date ordering.** `shop-api` accepts `terminatedOn` before `startedOn`; the API, domain and
    database have no ordering protection. Control: the established ordering is enforced at all
    three boundaries, including a named database check. Equality and the next day pass, the
    previous day refuses with the promised business translation and no partial write. Equality
    must not be rejected when the contract permits it.
    Two independent date attributes with no established ordering rule do not acquire an invented
    comparison merely because both are entered dates.
11. **Parallel repository allocations.** Two `shop-api` open PRs, one a draft, retain a manifest
    version already merged into the target. Both also append a patch entry for the same dependency;
    one migration timestamp precedes the target's latest migration. Both merge cleanly. Control:
    refreshed target, open PRs and relevant unassociated branches are inspected before publication
    and after integration; versions are coordinated to preserve the key union, the singleton patch
    has one canonical entry and new migrations follow the target's latest. Applied migrations are
    not renumbered and unrelated dependency patches remain permitted.
    Runtime-generated request identifiers outside the repository allocation space need no PR search.

## Limits

These offline decisions do not execute HTTP, database, Git-scanner, task-selection, UI or clock
behavior and do not qualify host activation or recurrence prevention. Record input fingerprints,
available model/runtime information and actual tool use separately in the results file. A missing
fresh context is an unavailable comparison, never an invented assessment.
