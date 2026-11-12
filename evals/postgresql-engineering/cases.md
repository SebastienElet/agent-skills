# Evaluation cases

These are reusable behavioral cases, not execution results or mandatory consuming-project gates.
Use only a dedicated, disposable PostgreSQL instance and synthetic data. Reuse the repository's
existing database runner if one exists. Otherwise use already available PostgreSQL tooling;
do not install tools or contact a shared database implicitly.

## Single-session engine cases

Run [engine-cases.sql](engine-cases.sql) with psql's startup files disabled, ON_ERROR_STOP enabled
and an explicit isolated connection. For an already created, task-owned Docker container:

```sh
docker exec -i <owned-container> psql -X -U postgres -v ON_ERROR_STOP=1 < skills/postgresql-engineering/evals/engine-cases.sql
```

The fixture uses temporary tables, rolls back and prints a PASS marker only after each assertion.
Its expected counterexamples and corrections are:

| Case                            | Expected observation                                                                                                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Two independent child relations | Two payments of 10 joined to three adjustments yield a false payment total of 60; separate aggregation yields payments 20 and adjustments 6                                                                                          |
| Scalar lookup rewritten as JOIN | Scalar form preserves two parents; inner JOIN returns one; a duplicated scalar match raises 21000                                                                                                                                    |
| LEFT JOIN filter placement      | WHERE on child name returns one parent; the matching ON filter preserves two                                                                                                                                                         |
| NULL and empty inputs           | NOT IN with a NULL candidate is unknown for unmatched 2; equality-based NOT EXISTS is true; NOT IN over empty input is true even for a NULL outer value; empty COUNT is 0 and SUM is NULL                                            |
| Pagination ties                 | After cursor (time, 2), complete tuple comparison returns IDs 3,4; comparing only time loses ID 3                                                                                                                                    |
| Business day and DST            | Europe/Paris 2024-03-31 spans 23 hours, 2024-10-27 spans 25; spring half-open interval includes start and last microsecond, excludes the next midnight                                                                               |
| Window peers                    | First tied row has default-frame sum 3, explicit deterministic ROWS sum 1                                                                                                                                                            |
| Tenant and CHECK                | A cross-tenant composite reference raises 23503; CHECK accepts NULL and rejects negative with 23514                                                                                                                                  |
| Legitimate sequential scan      | Inspect both plans for selecting all 1,000 rows with an existing primary-key index and fresh statistics; a Seq Scan is legitimate. Record actual plan, rows and buffers; do not demand an identical plan on every engine/environment |

## Controlled two-session cases

Use separate persistent connections A and B. A controller may observe waits from a third
connection. Set session statement_timeout to a finite value (for example 10 seconds) and use
explicit acknowledgment after each completed step. A blocked step is sent asynchronously; verify
its wait with pg_blocking_pids before releasing the blocker. Do not use sleeps to guess ordering.
Capture SQLSTATE using structured errors or psql's verbose error output. Reset between cases.

Initialize in the disposable database:

```sql
CREATE TABLE counter_case (id integer PRIMARY KEY, value integer NOT NULL);
INSERT INTO counter_case VALUES (1, 100);
CREATE TABLE unique_case (key text PRIMARY KEY, value integer NOT NULL);
CREATE TABLE migration_case (id integer);
INSERT INTO migration_case VALUES (1), (1);
CREATE TABLE duty_case (id integer PRIMARY KEY, active boolean NOT NULL);
INSERT INTO duty_case VALUES (1, true), (2, true);
```

| Case                        | Controlled schedule                                                                                                          | Expected result                                                                                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lost update                 | Both BEGIN at Read Committed and SELECT value=100; A writes literal 90 and commits; B writes stale literal 80 and commits    | 80, showing loss of A's decrement; transactions alone do not fix stale arithmetic                                                                                                  |
| Atomic update               | Reset to 100; A BEGIN, UPDATE value=value-10; B BEGIN, send UPDATE value=value-20; observe B waiting for A; commit A, then B | 70; both changes persist                                                                                                                                                           |
| Unique race                 | Both BEGIN and observe key 'k' absent; A INSERT ('k',1); B asynchronously INSERT ('k',2); observe wait, commit A             | B raises 23505; roll B back; exactly one row remains                                                                                                                               |
| UPSERT                      | Empty unique_case; repeat overlap using ON CONFLICT (key) DO UPDATE SET value=unique_case.value+EXCLUDED.value               | Both commit; one row ('k',3)                                                                                                                                                       |
| Write skew                  | Both BEGIN REPEATABLE READ and count two active rows; A disables row 1, B disables row 2; commit both                        | Zero active rows despite each prior decision seeing two                                                                                                                            |
| Serializable replay         | Reset duty rows; repeat with SERIALIZABLE                                                                                    | One transaction fails with 40001 during UPDATE or COMMIT; rollback and replay its read and decision, now seeing one active row and keeping it active                               |
| Blocked DDL                 | A BEGIN, SELECT migration_case; B SET lock_timeout='200ms', ALTER TABLE migration_case ADD COLUMN label text                 | B raises 55P03, column absent; rollback A and retry the DDL, then verify the column exists                                                                                         |
| Invalid concurrent index    | Autocommit CREATE UNIQUE INDEX CONCURRENTLY migration_case_unique ON migration_case(id) with existing duplicates             | 23505 and a catalog entry with indisvalid=false; inspect pg_index; diagnose duplicates, drop the owned invalid index, resolve duplicates, rebuild concurrently and verify validity |
| Runner transaction mismatch | BEGIN; CREATE INDEX CONCURRENTLY ... on an otherwise eligible test table                                                     | 25001; rollback and use an execution boundary that permits concurrent DDL                                                                                                          |

No shared database reset, session cancellation or index removal is authorized by these examples.
Failed sessions must roll back; remove only owned fixtures or destroy the owned instance.

## Activation and comparative evaluation

[trigger-queries.json](trigger-queries.json) contains positive and adjacent negative expectations.
Run each in a fresh context with the available skill descriptions. Record selected skills and
whether the PostgreSQL procedure actually governed the response. Valid JSON or a human reading
of the description is not a measured activation rate. Native Claude Code, Codex and Cursor
discovery each require their own execution; no deployment is necessary to prepare the cases.

For an optional controlled comparison:

1. Freeze the skill, cases and scoring rubric before execution. Reserve several unseen concrete
   variants for holdout; do not revise the skill from their answers before scoring.
2. Use the same model, tools, task input, time/tool/output budget and context conditions in each
   arm. The treatment receives this skill and relevant references; the baseline does not. Use
   fresh contexts and at least three runs per arm. Record model identifiers when exposed and
   any unavailable controls. Interleave arms to limit temporal effects.
3. Ask for a result/query, diagnostic next step and evidence claim. Score each case independently
   for correctness, diagnostic relevance, unnecessary actions and evidence honesty. A concrete
   missed row or unsafe operation matters more than repeating terminology from the guide.
4. Execute proposed SQL on real synthetic fixtures where the engine owns the answer. For races,
   use the schedules above; successful sequential execution cannot qualify concurrency claims.
5. Keep raw prompts, outputs, input hashes, session identities, commands and results in temporary
   evidence outside the skill's durable content. Report repetitions, held-out status, scoring
   method and limits. A small or saturated comparison cannot establish a general benefit.

Offline forced-load comparisons assess reasoning with supplied context. Offline description
selection assesses routing choices. Neither qualifies native host discovery, autonomous tool use,
real application performance, ORM retries, external side effects or uncertain-commit recovery.
