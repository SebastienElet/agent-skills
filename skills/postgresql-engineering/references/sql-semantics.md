# SQL semantics

## Choose by the result contract

| Need                         | Candidate                           | Verify before accepting                                                                                   |
| ---------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Columns from related rows    | JOIN                                | Zero, one and many matches; an inner join drops unmatched parents                                         |
| Whether any relation exists  | EXISTS / NOT EXISTS                 | Keep the outer row's multiplicity; define how nullable keys match                                         |
| One scalar per parent        | Scalar subquery                     | Zero rows yields NULL; multiple rows raises an error; an aggregate without GROUP BY still returns one row |
| Independent child totals     | Aggregate each child before joining | Group on the full parent/tenant key; one row per group                                                    |
| Detail plus group statistics | Window                              | Preserve detail rows; define partition, peers, frame and output order                                     |
| Per-parent top-N             | LATERAL                             | CROSS JOIN drops parents with no result; LEFT JOIN LATERAL ... ON true preserves them                     |
| Named intermediate relation  | CTE                                 | Readability is useful; folding/materialization depends on version, references and side effects            |

Two one-to-many joins form combinations: two payments and three adjustments produce six joined
rows. Summing either child then counts it repeatedly. Aggregate separately at the required grain,
then join; `SUM(DISTINCT amount)` discards legitimate equal amounts. `DISTINCT` is not a repair
until the contract actually requires deduplication. Verify UPDATE ... FROM also has at most one
source match per target row; PostgreSQL does not promise which duplicate match supplies values.

A right-side condition in WHERE after a LEFT JOIN rejects null-extended rows when it evaluates
to unknown or false. Put a match condition in ON when unmatched parents must survive. Moving
it changes semantics; do not move every predicate mechanically.

## NULL, empty and duplicate inputs

- WHERE retains true, not false or unknown. Use IS NULL and, when null-equality is intended,
  IS [NOT] DISTINCT FROM. Do not conflate absent, unknown and zero with automatic COALESCE.
- `x NOT IN (subquery)` can be unknown when the subquery contains NULL. NOT EXISTS with an
  equality predicate is often the desired anti-match, but a NULL outer key then has no equal
  match and survives. Choose that policy explicitly. NOT IN over an empty set is true even
  for a NULL outer value; test both sides' NULL and empty cases.
- `COUNT(*)` counts rows, `COUNT(expression)` counts non-NULL inputs. On a LEFT JOIN, `COUNT(*)`
  counts the preserved parent; count a non-null child key to count matches. SUM ignores NULL
  inputs and is NULL on no inputs; COUNT is zero. Grouped queries can return no groups at all.
- UNION removes duplicate rows; UNION ALL preserves them. Avoid changing multiplicity during
  a rewrite, including across tenant keys.

## Windows, ordering and pagination

Window ORDER BY is not final result ORDER BY. With an ordered window, the default frame extends
through the current row's last peer; equal sort values can share a running total. Choose ROWS,
RANGE or GROUPS and bounds deliberately. `last_value` over the default frame is usually not the
last value of the partition. A row-based calculation needs a complete order when ties matter;
rank/dense_rank intentionally retain peer groups.

Pagination requires a total order, such as `created_at, id`, and a cursor containing every sort
component. For ascending non-NULL keys, `(created_at, id) > (cursor_time, cursor_id)` can express
the next page. Mixed directions or nullable keys require a predicate matching their exact
direction and NULLS FIRST/LAST policy; row comparisons with NULL can be unknown. Include the
tenant/filter scope in cursor validation. Stable tie-breaking alone does not freeze a dataset:
define whether inserts, deletions or changed sort keys may affect later pages, or require a
snapshot/export boundary. OFFSET can be adequate for small pages or random page access; measure
deep-page cost instead of declaring keyset constant-time.

## Business dates and instants

Use the existing domain contract: date for a calendar date, timestamptz for an instant, timestamp
without time zone for intentionally local wall time. Timestamptz does not retain the original
zone identifier. Implicit casts and output can depend on session TimeZone.

For a local calendar day, derive each midnight independently in the named business zone and
filter the instant column using a half-open interval `[start, next_start)`. A daylight-saving
day need not have 24 hours. Do not use an inclusive BETWEEN for adjacent periods or append a
fixed 24 hours to a UTC start when the contract is a local day. Explicitly settle ambiguous or
nonexistent local input times at the application boundary. Check the real client's date
serialization and precision, including loss of fractional seconds in pagination cursors.

Official PostgreSQL 18 references: [table expressions](https://www.postgresql.org/docs/18/queries-table-expressions.html),
[subqueries](https://www.postgresql.org/docs/18/functions-subquery.html),
[scalar expressions and window frames](https://www.postgresql.org/docs/18/sql-expressions.html),
[aggregates](https://www.postgresql.org/docs/18/functions-aggregate.html),
[windows](https://www.postgresql.org/docs/18/functions-window.html),
[LIMIT](https://www.postgresql.org/docs/18/queries-limit.html),
[date/time types](https://www.postgresql.org/docs/18/datatype-datetime.html),
[date/time operators](https://www.postgresql.org/docs/18/functions-datetime.html),
[UPDATE](https://www.postgresql.org/docs/18/sql-update.html).
Use the target major's manual when it differs.
