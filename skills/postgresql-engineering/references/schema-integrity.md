# Schema and integrity

Start from the invariant and its existing owner, not a preferred datatype. Inspect real DDL,
catalogs, historical rows, application writes and the ADR before changing the model.

Define what each row represents, which writers own the fact and the cardinality in both
directions. A required child FK still allows a parent with zero children. Uniqueness on the
child's FK columns enforces at most one child per parent. A stable business key can identify
the row. If the business key can change, consider a stable identifier and enforce business
uniqueness separately.

| Invariant                          | Candidate             | Failure path to exercise                                     |
| ---------------------------------- | --------------------- | ------------------------------------------------------------ |
| Value required                     | NOT NULL              | Omitted value and explicit NULL                              |
| Row-local predicate                | CHECK                 | False rejects; NULL passes unless independently prohibited   |
| One row per business key           | UNIQUE / unique index | Concurrent duplicate, nullable keys and intended NULL policy |
| Relationship exists                | FK                    | Missing parent, delete/update action, nullable composite key |
| Incompatible values cannot overlap | EXCLUDE               | Boundary-touching ranges, NULLs and concurrent conflict      |

CHECK is not a cross-row or cross-table consistency mechanism, including a function hiding a
lookup. Prefer a constraint capable of enforcing the invariant; otherwise define the complete
transactional protocol across all writers. Name important constraints and map violations by
SQLSTATE plus structured constraint identity, not localized message text. Test the application's
translation as well as the database refusal.

UNIQUE normally allows multiple NULL values. PostgreSQL 15+ supports NULLS NOT DISTINCT when
that matches the business rule; do not change nullable semantics just to use it. Composite FKs
with MATCH SIMPLE allow a row to escape matching if any referencing column is NULL. Use NOT
NULL or an appropriate MATCH FULL contract where required, and verify its interactions.

## Tenant keys and access

For tenant-local parent identities, a referenced unique key such as `(tenant_id, id)` and a
matching child FK can prevent a child pointing to another tenant. Join and aggregate on the
same identity. Test identical local IDs in two tenants and reject cross-tenant relationships.
These constraints do not authorize reads or replace access controls or existing RLS policies.
Examine the real role and any pool/session tenant-context behavior before making isolation
claims; do not invent or alter a rights policy as a schema optimization.

## History and periods

- Keep current state in a mutable row when history is irrelevant. For as-of queries, preserve
  a stable identity and versions with business validity periods. If retroactive corrections must
  preserve what was known at an earlier time, record when each version was known as well.
  Exercise a correction and query both time axes independently.
- Choose period granularity, bounds and the meaning of an open end. The canonical form of
  `daterange` is lower-inclusive and upper-exclusive. With that convention, adjacent periods
  share a boundary without overlapping. Decide whether empty periods and gaps are allowed.
- Model non-overlap and full coverage as separate invariants. PostgreSQL 18 introduced temporal
  keys with `WITHOUT OVERLAPS` and foreign keys with `PERIOD`. The latter checks that matching
  parent periods together cover the child period. Check GiST operator-class requirements and
  supported foreign-key actions for the target version. On older majors, an exclusion constraint
  can guard overlap. A coverage query observes its snapshot. If coverage must hold after commits,
  coordinate every affected child write and parent change in the same enforcement protocol.
- Exercise adjacency, a gap in otherwise matching coverage, a different business key, an empty
  period, a parent update or deletion that would break coverage and a competing write when
  concurrency matters.

Keep facts with their owner. Derive projections at read time by default. If measured needs justify
materializing a projection, define freshness, refresh and rebuild. A value captured as part of a
historical event is its own fact and should survive later changes to the source.

## Immutable tables and deletion paths

A delete-refusing trigger on an append-only table, or a foreign key without a cascading action
(`RESTRICT`, or `NO ACTION`, the default), blocks any routine deleting its parent. Ship the
deletion path with the table, and list the referencing tables in an automated check comparing
`pg_constraint` foreign keys (`contype = 'f'`, `confdeltype` of `a` or `r`) onto the routine's
tables with the routine's own list. Take the bypass's authority from the identity the application
role cannot assume: the trigger allows the delete only when `current_user` is a dedicated purge role,
and the routine is a `SECURITY DEFINER` function owned by that role with a pinned `search_path`.
An unregistered custom setting (`app.*`) can be set by an ordinary session; `SET LOCAL` scopes
its lifetime, not its authority, so no trigger may trust it alone. Test that the ordinary role,
after setting that flag itself, still has its `DELETE` refused. Truncation needs its own statement-level guard.

Reconcile this inventory on the integrated schema, including append-only relations from parallel
branches. Populate each new relation before testing the established purge: remove its scoped rows
before the parent, preserve other accounts and refuse non-demo targets under the demo-reset contract.
Keep `UPDATE` and `TRUNCATE` forbidden during authorized deletion as well as outside it. On the real
database, test ordinary-role immutability before purge and after the privileged routine returns
within the same transaction; use savepoints for expected refusals so the transaction can continue.
Retain a regression that fails on the old purge with the new relation populated, then succeeds
after restoration. A transaction setting may narrow scope, but never grants purge authority.

## Referencing-side indexes

PostgreSQL indexes referenced unique and primary keys. Child FK columns need a separate decision
based on referencing-side access, parent updates or deletes, selectivity and write cost.

Official PostgreSQL 18 references: [constraints](https://www.postgresql.org/docs/18/ddl-constraints.html),
[ranges](https://www.postgresql.org/docs/18/rangetypes.html),
[temporal keys and foreign keys](https://www.postgresql.org/docs/18/sql-createtable.html),
[error codes](https://www.postgresql.org/docs/18/errcodes-appendix.html).
Confirm version support and the actual driver's error and type APIs.
