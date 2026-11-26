# Data types and boundary contracts

Trace the input representation, parsing and coercion, PostgreSQL type and constraints, driver
decoding, and consumer serialization. Define units, bounds, precision and the meaning of absence.
Exercise the real driver and normal entry point when their contract changes. Use direct SQL too
when the database must enforce the same invariant for other writers.

## Exact values and coercion

- Keep the established currency or unit and rounding policy. Use bounded integers for fixed
  minor units or `numeric` for exact decimals according to the contract. For approximate
  measurements, define the tolerance before choosing floating point.
- `numeric(p,s)` rounds inputs to the declared scale before checking the precision limit. A
  column constraint sees the rounded value. To reject excess scale for all writers, consider
  unconstrained `numeric` with explicit scale and finite range checks. A prior cast or client
  conversion can still discard precision before the value reaches the column. If the original
  spelling matters, validate it before parsing. Decide whether trailing zeros such as those
  in `1.230` count against the limit.
- Exercise a valid value at the limit, excess scale, overflow, NULL, and non-finite values the
  type accepts. PostgreSQL sorts numeric NaN above finite numbers, so a lower bound alone can
  let it through. Check the rejecting constraint and the serialized decimal value.
- For `bigint` and exact decimals, verify the driver and wire representations. Exercise
  `9007199254740993` if a JavaScript consumer might convert a large integer to `Number`.

## Civil time and instants

Use `date` for a civil day and `timestamptz` for an instant. `timestamptz` uses the session time
zone on output and does not retain the original zone. For a recurring civil time, preserve the
local schedule and its IANA zone when the rule depends on both. Decide what happens for
nonexistent or repeated local times at transitions. Distinguish elapsed time from calendar
arithmetic. Test the returned civil date and any instant precision the driver must preserve.
For period constraints see [schema and integrity](schema-integrity.md).

## Absence and JSON

Use `NOT NULL` for required values. Distinguish omission, explicit clearing and unknown values
when callers treat them differently. For JSON validation exercise missing keys, JSON null,
SQL NULL and wrong types. A CHECK accepts unknown, so ensure a required property predicate
rejects missing values.

Keep keys, relationships and independently constrained facts in typed columns. Use `jsonb` for
document-shaped data and choose operator classes or expression indexes from the actual operators
used. A GIN index covers particular operators. For byte-for-byte retention, preserve the original
bytes before parsing or recoding.

## Closed values

Match the type to the vocabulary's lifecycle. A local CHECK can enforce a small table-specific
set. An enum works for schema-owned values when its evolution fits PostgreSQL's add and rename
operations. A domain shares a stable scalar rule across columns, with requiredness set at the
column boundary. A reference table with a foreign key fits values with their own metadata or
lifecycle. Exercise the expected change and how the driver decodes the type.

Official PostgreSQL 18 references: [numeric types](https://www.postgresql.org/docs/18/datatype-numeric.html),
[date and time](https://www.postgresql.org/docs/18/datatype-datetime.html),
[JSON](https://www.postgresql.org/docs/18/datatype-json.html),
[enums](https://www.postgresql.org/docs/18/datatype-enum.html),
[domains](https://www.postgresql.org/docs/18/sql-createdomain.html).
