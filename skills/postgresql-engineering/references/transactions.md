# Transactions and concurrency

## Choose from competing operations

Name the invariant, all writers, affected rows and reads that inform a decision. Put them inside
one appropriate transaction on one connection. Shared pools or separate ORM clients do not
establish a shared transaction. Verify connection pinning, transaction APIs, isolation defaults,
autocommit, timeout/cancellation behavior and pool mode in the actual client documentation.

| Situation                        | Candidate                                         | What still needs proof                                                         |
| -------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| Increment or decrement one value | Atomic UPDATE using the stored value              | Predicate, bounds, constraint refusal and affected rows                        |
| Reject stale user edits          | Version predicate / compare-and-set               | Zero updated rows becomes an explicit conflict                                 |
| Read then modify existing rows   | Row locks in a consistent order                   | All competing paths lock; missing rows cannot be row-locked                    |
| Multi-row decision               | Serializable, or a proven shared locking protocol | All relevant writers participate; complete retry on failure                    |
| Insert-or-update one key         | Unique arbiter plus ON CONFLICT                   | Exact conflict key, alternate constraints, RETURNING and concurrent visibility |

At Read Committed, successive statements can see different snapshots. An UPDATE waiting on an
updated row rechecks its condition against the updated version. `SET value = value + delta`
does not have the same lost-update risk as writing a literal computed from an earlier unlocked
read; neither proves an arbitrary multi-row invariant. Recheck affected-row counts.

Repeatable Read gives a stable snapshot but permits write skew: two transactions can each
observe a valid cross-row condition and change different rows into an invalid combined state.
Serializable detects serialization anomalies, with possible failure during a statement or
commit; it does not supply business rules missing from each transaction or cover unrelated
nonparticipating writers automatically.

Row locks do not protect an absent row or a predicate range. Acquire known resources in a
consistent order across paths to reduce deadlocks, including FK and unique-index interactions.
A single multi-row UPDATE is not a promise of universal lock ordering or deadlock freedom.
SKIP LOCKED can suit queue claiming, not a consistent general-purpose view; durable claiming,
crash recovery and external job effects remain separate concerns.

## UPSERT and visibility

Do not SELECT-before-INSERT to enforce uniqueness. Use the constraint and choose whether a
conflict is a business refusal, DO NOTHING or a real update. ON CONFLICT DO UPDATE has an atomic
insert/update outcome for its arbiter, barring independent errors; it does not close every
application race. MERGE has different concurrent-insert semantics and is not a drop-in UPSERT.

At Read Committed, DO NOTHING can lose to an uncommitted row invisible to its statement
snapshot. A fallback SELECT in the same statement/CTE can therefore return no row. A subsequent
statement gets a fresh snapshot, but deletion can still race: define bounded recovery and the
required consistency. DO NOTHING, and DO UPDATE with an unsatisfied WHERE, may return zero
rows. Do not add a meaningless update solely to force RETURNING without considering triggers,
row versions, locks and write amplification. Do not use internal tuple fields as business APIs.

## Failure, retry and commit

1. Identify error codes in structured driver/ORM errors. Consider `40001` serialization failure
   and `40P01` deadlock for eligible whole-transaction replay. A `23505` uniqueness violation or
   `23P01` exclusion violation is normally a domain conflict; retry only when the observed
   decision protocol makes that particular conflict transient. Do not retry all integrity,
   timeout or connection failures indiscriminately.
2. Roll back an aborted transaction and release its connection correctly. Retry from BEGIN,
   including every read and decision that chose the SQL/values. Keep a finite attempt count,
   deadline and bounded backoff appropriate to the enclosing operation; expose exhaustion.
3. Keep nontransactional external effects out of blind replay. Use the established durable
   outbox/idempotency protocol when needed. A successful database retry does not deduplicate
   an email, payment or message sent by an earlier attempt.
4. A connection loss while COMMIT is in flight leaves its result uncertain. Do not assume either
   rollback or success. Reconcile using a durable operation identity and recorded outcome before
   repeating a non-idempotent operation; state when the client cannot establish the result.
5. Prove races with at least two real sessions and explicit synchronization at reads, writes,
   waits and commit. Assert final state and SQLSTATE, not just that both promises settled.
   Database sessions do not qualify an ORM retry wrapper or an external delivery protocol.

Official PostgreSQL 18 references: [isolation](https://www.postgresql.org/docs/18/transaction-iso.html),
[locks](https://www.postgresql.org/docs/18/explicit-locking.html),
[serialization failure handling](https://www.postgresql.org/docs/18/mvcc-serialization-failure-handling.html),
[INSERT](https://www.postgresql.org/docs/18/sql-insert.html),
[error codes](https://www.postgresql.org/docs/18/errcodes-appendix.html).
