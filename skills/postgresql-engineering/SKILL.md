---
name: postgresql-engineering
description: >
  Engineer and verify PostgreSQL queries, schemas, transactions and migrations. Use when writing
  or reviewing SQL, changing constraints or indexes, or diagnosing slow queries, locks or races.
  Make sure to use this skill whenever ORM-generated PostgreSQL affects the task, even if SQL
  is not explicitly requested. Excludes full administration, backups, replication and specialized extensions.
license: MIT
metadata:
  category: dev
---

# PostgreSQL Engineering

## Overview

Choose SQL from the required result and invariant, then test it at the boundary PostgreSQL owns.
Correctness precedes performance; a plausible plan is not a measured improvement. Load only the
references relevant to the task. Specialized extensions and full database operations are outside
the core scope.

## Usage

Use `$postgresql-engineering <task>` or `/postgresql-engineering <task>`, or apply it implicitly
to PostgreSQL work, including SQL emitted by an ORM. Example: `Review this tenant-scoped invoice
summary: two child joins inflate the totals.`

This skill supplies database reasoning to the current implementation, diagnosis or review
workflow. That workflow retains ownership, test policy and delivery authority. When available
and applicable, compose the `implement`, `diagnosing-bugs`, `code-review` and `tdd` skills;
otherwise follow the project's existing workflow. Do not restart their procedures here.

## Steps

1. **Establish the actual boundary.** Identify server major/minor version, client/ORM/pool and
   configuration, relevant ADRs in force, application callers and deployed schema: types,
   constraints, indexes and tenant keys. Gather relevant volumes, distributions, skew and
   existing observations. Use authorized metadata or synthetic equivalents; identify missing
   facts and keep hypotheses separate. Verify version-sensitive behavior in that major's
   official manual, including the client's documented transaction and parameter APIs.
2. **State the result contract.** Name what one row represents, expected cardinality, allowed
   duplicates, NULL meanings, unmatched relations, ordering, limits, tenant scope and time
   boundaries. For writes, name the invariant, competing operations, affected-row expectations,
   failure paths and what success means after commit. A confirmed ADR contradiction blocks the
   affected path; investigate plausible migration intent before proposing an exception.
3. **Choose the smallest correct operation.** Read [SQL semantics](references/sql-semantics.md)
   for queries and ORM SQL; [schema and integrity](references/schema-integrity.md) for model
   changes; [transactions](references/transactions.md) for writes or races. Choose JOIN, EXISTS,
   pre-aggregation, window, LATERAL or CTE by their result semantics. Prefer set operations when
   they simplify the work without unbounded fan-out. Bind values; use the client's supported
   identifier composition and an authorized name set for dynamic identifiers.
4. **Diagnose before tuning.** For latency, blocking or index changes, read
   [performance](references/performance.md). Obtain the SQL actually executed, representative
   parameters and available observations, then start with EXPLAIN. EXPLAIN ANALYZE executes the
   statement: use only an authorized target and execution, with bounded time and workload.
   Inspect estimate errors, actual rows and loops, buffers, sorts/spills, waits and statistics.
   Compare equivalent results and comparable before/after workloads; label unmeasured tuning
   as a hypothesis.
5. **Make change and failure recoverable.** For DDL or data transitions, read
   [migrations](references/migrations.md). Identify locks, rewrites, runner transaction behavior,
   mixed application versions, backfill concurrency, partial states and resumption. For
   transactions, define SQLSTATE-based retry eligibility and limits, complete transaction
   replay and uncertain-commit recovery before implementation.
6. **Prove the relevant behavior.** Reuse repository checks and real, isolated PostgreSQL with
   synthetic data for engine-owned semantics, constraints and concurrency. Include empty,
   NULL, duplicate, tenant and failure cases that can change the result. Use controlled session
   interleavings for races; in-memory substitutes do not prove them. Report the result, actual
   server/client environment, evidence, hypotheses and untested boundaries. The optional
   [evaluation cases](evals/cases.md) exercise this skill's reasoning; they are not a new gate
   for every consuming project.

## Gotchas

- **Replacing a scalar lookup with JOIN** — zero or many matches change cardinality; prove
  missing-row and duplicate behavior before calling the rewrite equivalent.
- **Treating ANALYZE as inspection** — the query and its functions run; choose an authorized
  execution, and do not assume ROLLBACK undoes sequence or external effects.
- **Retrying only the failed statement** — earlier decisions use an obsolete snapshot; replay
  the whole eligible transaction and keep external effects outside blind retry.
- **Treating CONCURRENTLY as lock-free** — waits and invalid indexes survive failures; inspect
  catalogs and runner state before declaring completion or retrying.

## Constraints

- Never weaken tenant boundaries, invariants, money contracts or an ADR for a local SQL shortcut.
- Never interpolate untrusted values or identifiers into SQL, or expose sensitive parameters in
  shared plans and reports. Do not send private SQL or plans to hosted analysis services.
- Never execute diagnostic writes, DDL or heavy queries on a shared target without authority;
  a transaction rollback alone is not isolation from operational effects.
- Never promise a plan choice, speedup, absence of blocking or concurrency guarantee without
  relevant execution evidence. State unavailable evidence explicitly.
- Never impose server configuration changes, extensions, tools or dependencies by default.

## References

- [Sources and decisions](references/sources.md) — reviewed revisions, official manuals and
  conditional or rejected upstream advice.
- [Activation scenarios](evals/trigger-queries.json) — expected selection boundaries, not proof
  of host activation.
