# Application migrations

## Plan the transition

Identify the deployed DDL and existing data, target invariant, application readers/writers,
deployment order, migration runner transaction policy, privileges and operational budget. Check
the target version's lock and rewrite behavior for each exact command. A short metadata change
can still wait for ACCESS EXCLUSIVE and block a queue behind it; fast on an empty fixture says
nothing about a busy table. Set suitable session-local lock/statement timeouts through the
supported runner, and define failure handling rather than allowing an unbounded wait.

Use expand/contract when old and new applications coexist. Keep intermediate writes valid,
backfill with bounded batches and durable progress, and make restarts safe under concurrent
updates. Decide how to detect omissions, reconcile errors and verify completion before enforcing
or removing old structures. Test interruption and resumption. Do not renumber applied migrations
or assume a destructive down-migration recovers data.

Adding defaults, changing types, generated expressions and attaching constraints have different
scan/rewrite/lock behavior across versions. Confirm the exact operation instead of treating
every ADD COLUMN as a rewrite or every default as free. Assess disk/WAL space and transaction
duration as well as elapsed time.

## Constraints and indexes

- For eligible CHECK and FK constraints, ADD ... NOT VALID avoids validating historical rows
  immediately, while enforcing applicable new writes. It does not prove historical validity;
  clean up/reconcile old violations and VALIDATE CONSTRAINT before claiming completion. Check
  command-specific locks and version support for other constraint types; do not apply NOT VALID
  to UNIQUE mechanically.
- A unique index built concurrently can sometimes be attached as a constraint with USING INDEX.
  Check eligibility: partial or expression indexes cannot simply become a standard unique
  constraint. Attachment still takes locks; verify the catalog and runner outcome.
- CREATE INDEX CONCURRENTLY cannot run inside a transaction block. It uses multiple phases,
  scans and waits, adds load, and is not lock-free. Only one concurrent build per table may run
  at once; partitioned parents require a version-appropriate per-partition/attachment strategy.
- A failed concurrent build may leave an invalid index, ignored by the planner but still
  imposing update overhead. A unique index that failed in a later phase can continue enforcing
  uniqueness. Inspect pg_index.indisvalid/indisready and the exact definition; existence or
  IF NOT EXISTS is not success. Diagnose duplicates, blockers or expression errors, then choose
  an authorized drop/recreate or supported reindex path. Inspect dependency and constraint
  ownership before removing anything.

## Prove completion

Exercise the runner's real execution boundary on an isolated database, including any forbidden
transaction wrapping. Test representative existing data, a competing writer/long transaction,
bounded lock failure, mid-backfill restart and partial index/constraint state where relevant.
After recovery, verify catalog definitions and validity, application compatibility and the
target invariant with real queries. Separate a schema proof from load/availability claims and
from deployed behavior; a migration file applying once is not sufficient evidence for all three.

Official PostgreSQL 18 references: [ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html),
[CREATE INDEX and concurrent failures](https://www.postgresql.org/docs/18/sql-createindex.html),
[locks](https://www.postgresql.org/docs/18/explicit-locking.html),
[index catalog](https://www.postgresql.org/docs/18/catalog-pg-index.html).
