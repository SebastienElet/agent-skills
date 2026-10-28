# Schema and integrity

Start from the invariant and its existing owner, not a preferred datatype. Inspect real DDL,
catalogs, historical rows, application writes and the ADR before changing the model.

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

## Types, JSONB and indexes

- Preserve the canonical money contract, currency and rounding boundary. Integer minor units
  can be correct; bound their range and client integer handling. NUMERIC can be correct for
  exact decimal quantities; define precision, scale and client serialization. Neither choice
  supplies exchange-rate or rounding policy. Avoid approximate floating arithmetic for exact
  amounts, without silently migrating an established representation.
- Keep relationships and independently constrained entities relational by default. JSONB is
  useful for documents with actual structural variability and matching query needs. JSON null,
  SQL NULL, an absent key and text extraction differ. Choose validation, operator class and
  expression indexes from real operators; one GIN index does not accelerate every JSON query.
- PostgreSQL indexes referenced unique/primary keys; it does not automatically index child FK
  columns. Consider the referencing-side access pattern, parent updates/deletes, selectivity
  and write cost instead of adding every FK index mechanically.

Official PostgreSQL 18 references: [constraints](https://www.postgresql.org/docs/18/ddl-constraints.html),
[numeric types](https://www.postgresql.org/docs/18/datatype-numeric.html),
[JSON](https://www.postgresql.org/docs/18/datatype-json.html),
[error codes](https://www.postgresql.org/docs/18/errcodes-appendix.html).
Confirm version support and the actual driver's error and type APIs.
