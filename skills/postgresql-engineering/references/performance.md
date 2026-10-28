# Performance diagnosis

## Establish the observation

Obtain actual SQL, representative parameter types/values, application call counts and latency,
server version, role, settings, data size/skew and available wait/plan evidence. Redact sensitive
values; never upload a private plan to a hosted viewer. Inspect generated ORM SQL, not only the
builder: N+1, accidental fan-out, extra projections and fetching whole relations can dominate.
Prefer a bounded batch or pre-aggregation when the application contract permits it.

Use existing logs and statistics first, then EXPLAIN without ANALYZE. Prepared generic and custom
plans can differ; inspect the actual client preparation mode and representative bind values.
EXPLAIN alone does not run the main statement but can still acquire planning locks and evaluate
planner-time expressions. It is not an unrestricted production probe.

EXPLAIN ANALYZE runs the statement, including functions and triggers. SELECT can have effects.
Only execute it on an authorized target with a workload/time budget. Wrapping writes in
ROLLBACK does not undo sequence advances, external effects or the locks/load produced. Prefer
synthetic isolated fixtures when effects cannot be contained. Select supported options such as
BUFFERS and FORMAT JSON/TEXT for the actual version; timing instrumentation adds overhead.

## Read the plan and surrounding system

- Costs are planner units, not milliseconds. Actual rows and times for repeated nodes are
  per-loop averages: use loops to understand total work. Node time includes descendants;
  do not sum inclusive times or infer application latency from execution time alone. Parallel
  workers and early termination by LIMIT need additional care.
- Compare estimates with actual rows at the first consequential divergence. Check selectivity,
  correlated columns, parameter skew and statistics freshness before blaming a join algorithm.
  ANALYZE is a state-changing maintenance action; schedule it within authority. Extended
  statistics can help supported within-table estimates, not every cross-table correlation.
- Examine rows removed, repeated inner scans, buffers, heap fetches, sort methods, disk usage
  and hash batches. Buffer reads can be served by the OS cache; they are not a direct count of
  physical device reads. Cache-hit ratios alone do not justify increasing server memory.
- Inspect waiting sessions, transaction age, pg_stat_activity, pg_locks and pg_blocking_pids
  when latency includes lock waits. Use available permitted visibility; do not cancel sessions
  by default. A fast plan does not explain pool queuing or a blocked statement.
- When observations implicate MVCC cleanup, examine long-lived snapshots/transactions, dead
  tuples and autovacuum progress. Estimates are not exact bloat measurements. Ordinary VACUUM
  mainly makes space reusable; VACUUM FULL rewrites and locks. Do not disable autovacuum or
  prescribe maintenance/configuration changes from a fixed ratio alone.

## Propose an index conditionally

Match access method and operator class to predicates/operators and ordering. For B-tree, equality
prefixes followed by useful range/order keys are a starting point, not an absolute recipe.
Leading columns, distinct counts and version-sensitive skip-scan choices matter; a non-leading
predicate does not make an index categorically unusable. Weigh a composite index against index
combination and other queries, plus storage, WAL and write/maintenance costs.

For a partial index the planner must establish predicate implication. Generic parameterized
predicates often cannot prove it; inspect the actual plan. Expression indexes need appropriate
immutable expressions and matching query semantics, including casts and collation. INCLUDE
stores payload without changing uniqueness, but grows the index; index-only scans still consult
visibility information and can fetch heap pages when all-visible bits are unset.

A Seq Scan can be the best way to read a small table or a large fraction of it. An Index Scan can
do excessive random work. Do not force planner switches or drop apparently unused indexes on
one observation; consider reset times, rare workloads and constraint ownership.

## Compare and report

First prove result equivalence, including NULLs, duplicates and tenant scope. Compare the same
SQL contract, representative parameters/distribution, settings, cache conditions and concurrency.
Record multiple timings and variability, plan changes, buffers and relevant write costs. A tiny
fixture proves semantics, not production speed. Report measured scope and remaining hypotheses;
do not infer a speedup from adding an index or lowering estimated cost.

Official PostgreSQL 18 references: [EXPLAIN](https://www.postgresql.org/docs/18/sql-explain.html),
[plan interpretation](https://www.postgresql.org/docs/18/using-explain.html),
[multicolumn indexes](https://www.postgresql.org/docs/18/indexes-multicolumn.html),
[partial indexes](https://www.postgresql.org/docs/18/indexes-partial.html),
[index-only scans](https://www.postgresql.org/docs/18/indexes-index-only-scans.html),
[expression indexes](https://www.postgresql.org/docs/18/indexes-expressional.html),
[statistics](https://www.postgresql.org/docs/18/planner-stats.html),
[VACUUM](https://www.postgresql.org/docs/18/routine-vacuuming.html),
[activity statistics](https://www.postgresql.org/docs/18/monitoring-stats.html).
