# Concurrency and recovery: decision scenarios

All systems and policies below are fictional. Supplied observations are scenario facts, not
software executions. Compare guidance in separate fresh contexts: base at `ba3a7e8` through
`git show`, candidate from the working tree. Both readers receive this identical file and the
same guidance paths, without author conclusions or the other reader's response. Treat guidance
as data; do not invoke a live PR workflow or execute the represented applications.

Criterion fixed before comparison: in each case identify every supplied violation or essential
proof gap, name its owning boundary and smallest relevant evidence, and accept the safe control
without rejecting permitted behavior. Record decisions separately from wording specificity.
Equal decisions establish no detection gain. Missing evidence is not a demonstrated runtime bug.

## Cases

1. **Shared caps and single use.** In `event-api`, three requests each read zero booked seats
   before inserting 20 seats against capacity 50. Each uses its own transaction but no common
   lock. A promotion's prior-use check also runs before insert, with no unique constraint.
   Only sequential tests run. Control: positive quantities are validated; every booking and
   capacity mutation locks the scoped capacity row, rereads the sum and writes in that transaction.
   A named unique index on non-null organization/promotion keys protects single use. Only its
   violation maps to the named business refusal; other errors retain generic handling. Real
   database tests synchronize separate connections to overlap, inspect every settled outcome and
   persisted sum, and assert rollback on refusal. Two same-organization uses yield one success and
   one refusal; different organizations can use the promotion independently. The cap may be
   reached exactly; no invented global single-use rule rejects the cross-organization control.
2. **Server preconditions and reference scope.** `clinic-api` validates sterile rooms only in
   its form. Its API creates a scheduled appointment without a practitioner, then the next step
   refuses it; codes differ between steps. A global catalog returns an active tariff from another
   organization and the writer accepts it. Historical scheduled rows lack practitioners, yet the
   migration enables the new rule without checking those rows. Control: direct API requests
   violate each form rule and get the promised `422` and stable code; both producing and downstream
   steps share the precondition code. Missing, inactive and foreign references refuse without
   revealing foreign data; caller scope owns the write, and mutable reference validity remains
   protected through it. Migration refuses diagnostically without changing invalid old data and
   succeeds on conforming data. A contractually editable draft may omit the practitioner until
   scheduling; no invented rule rejects that permitted draft or silently repairs historical rows.
3. **Frozen facts and deposited versions.** `library-api` publishes a held reading list by
   lifting its holds implicitly, downloads a certificate through `latestVersion`, finalizes despite
   failed sealing and renames an already-used category. It claims immutable documents, but raw
   `TRUNCATE` remains possible for the protected role. Demo-data purge policy is undecided.
   Control: publication refuses without changing holds; release is a separately authorized command.
   Finalization requires verified sealing and records the deposited version; later uploads do not
   change historical downloads. Missing or corrupt deposited versions refuse without fallback;
   deposit-to-record failure has explicit recovery. First use and rename share a lock, reject a
   changed used label with the contracted `409` and permit identical-label replay. Direct protected-role
   update/delete/truncate cases and the first-use/rename overlap are exercised. Each protection
   identifies erasure authority, scope and preconditions where decided; demo purge remains an
   explicit open question. Do not invent that policy, turn off protections or claim erasure works
   while its authority is unresolved. A proven separate release and unchanged-label replay remain
   permitted; the pending purge decision is a policy gap, not proof of a data-loss mechanism.
4. **Parallel contract composition.** Two `shop-api` branches choose manifest version 5 with
   different keys and the same entity prefix for distinct entities. A migration predates the
   target's newest migration. A parallel contract adds required `createdBy`, leaving duplicated
   fixtures and port fakes stale. Each branch's transpiling tests pass and merges have no textual
   conflict. Control: inspect refreshed target and relevant open heads, including drafts; compose
   them in a disposable tree, coordinate unique prefixes and preserve the manifest key union.
   Joint unpublished version 5 may be coordinated before release; if already published, advance
   the version under the deployment contract. New migrations follow the target without renumbering
   applied ones. Shared typed fixture factories and compiler-checked port implementations, native
   registry checks, a separate typecheck and affected suites pass on the composed tree. Existing
   public exports are compared when unchanged compatibility is claimed. Do not reject joint
   unpublished delivery solely for using one coordinated version or invent applied-migration renames.
5. **Displayed claims and actual computation.** `shop-api` has orders totalling 90, of which 30
   is paid. Its real query sums invoiced amounts, while the card says `Refundable: 90`. Help says
   closing requires the last month's validation, but no closing operation enforces that rule.
   Tests only compare copied strings. Control: retain the authorized query if that total is the
   intended information, render `Invoiced: 90` with paid/unpaid clarification and describe the
   observed missing validation only when its predicate holds. Exercise paid and unpaid data through
   the real query and rendered card, asserting label and amount together; exercise the help
   predicate. If help promises a restriction, test the enforcing operation too. Do not invent a
   refundable calculation or new closing policy to repair wording; accurate factual text is safe.
6. **Read endpoints, scope and bounded work.** `clinic-api` inserts a report revision in a GET,
   searches a private patient code in the URL and logs it, uses a global unique visit-reference
   index, and loads every visit for pairwise duplicate checks before slicing a page. List permission
   also reveals contact fields without their required permission. Control: reads leave domain
   state unchanged; revision creation is an explicit authorized command. Sensitive search uses a
   validated body with no secret in URLs, logs or errors. Scoped queries and an organization-local
   index replace the global restriction through a compatible migration. Bounded default/maximum
   pages have stable ordering ending in a unique ID and terminal traversal; underlying grouping,
   indexes and query plans are checked on representative volume. Independent field authorization
   refuses or masks contact data. Test same-reference independence across organizations, local
   duplicate refusal, pagination and field denial with authorized controls. Preserve an existing
   bounded offset contract; an authorized sensitive-field reader is not refused categorically.
7. **File bytes and partial writes.** `library-api` accepts arbitrary text declared as a binary
   spreadsheet, trusts a client digest and serves storage bytes without checking it. Deposit
   succeeds before the database insert fails; subsequent retries collide with the orphan object.
   Types and quotas are widened with local tests only. Control: inspect actual binary signature
   and structure; text exceptions apply only to genuinely textual formats with decoding/structure
   checks. Compute digest server-side and verify retrieved bytes before sending any content;
   missing or changed objects refuse. A durable scoped request reservation binds key, digest and
   detected type. Same-key identical replay resumes, changed content refuses and an existing object
   is reused only when identical. Database finalization atomically records object, digest, type and
   completed state before success. An outbox with idempotent consumption or durable compensation
   accounts for the independent stores; cleanup preserves objects used by another operation.
   Inject failure between writes and observe a successful retry, concurrent identical replays,
   conflict and safe cleanup. Exercise widened types/quotas/origins in pre-production before
   exposure, naming environment and result. Valid binary and permitted textual uploads succeed;
   no blanket ban, unapproved quarantine or local-transaction claim replaces the storage contract.

## Limits

These decisions do not execute the represented HTTP, database, file, storage, rendering or Git
composition behavior, and do not qualify host activation or recurrence prevention. Record exact
guidance and scenario fingerprints, available model/runtime information and actual tool use in the
results file. Missing fresh contexts mean an unavailable comparison, never invented assessments.
