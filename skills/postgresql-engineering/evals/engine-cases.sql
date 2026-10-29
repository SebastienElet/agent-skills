\set ON_ERROR_STOP on
\pset pager off
SELECT version(), current_setting('TimeZone');
BEGIN;
SET LOCAL statement_timeout = '10s';
SET LOCAL lock_timeout = '1s';
CREATE TEMP TABLE parent (id integer PRIMARY KEY);
CREATE TEMP TABLE payment (parent_id integer, amount integer);
CREATE TEMP TABLE adjustment (parent_id integer, amount integer);
INSERT INTO parent VALUES (1), (2);
INSERT INTO payment VALUES (1, 10), (1, 10);
INSERT INTO adjustment VALUES (1, 1), (1, 2), (1, 3);

DO $$
DECLARE bad_total integer; good_total integer; good_adjustment integer;
BEGIN
    SELECT sum(p.amount) INTO bad_total
    FROM parent x JOIN payment p ON p.parent_id = x.id
    JOIN adjustment a ON a.parent_id = x.id;
    WITH p AS (SELECT parent_id, sum(amount) AS amount FROM payment GROUP BY parent_id),
         a AS (SELECT parent_id, sum(amount) AS amount FROM adjustment GROUP BY parent_id)
    SELECT p.amount, a.amount INTO good_total, good_adjustment
    FROM parent x LEFT JOIN p ON p.parent_id = x.id
    LEFT JOIN a ON a.parent_id = x.id WHERE x.id = 1;
    IF bad_total IS DISTINCT FROM 60 OR good_total IS DISTINCT FROM 20
       OR good_adjustment IS DISTINCT FROM 6 THEN
        RAISE EXCEPTION 'independent child totals';
    END IF;
END $$;
\echo PASS independent-child-totals

CREATE TEMP TABLE contact (parent_id integer, name text);
INSERT INTO contact VALUES (1, 'Ada');
DO $$
DECLARE scalar_rows integer; join_rows integer; filtered_rows integer; kept_rows integer;
BEGIN
    SELECT count(*) INTO scalar_rows FROM
        (SELECT x.id, (SELECT c.name FROM contact c WHERE c.parent_id = x.id) FROM parent x) q;
    SELECT count(*) INTO join_rows FROM parent x JOIN contact c ON c.parent_id = x.id;
    SELECT count(*) INTO filtered_rows FROM parent x LEFT JOIN contact c ON c.parent_id = x.id
        WHERE c.name = 'Ada';
    SELECT count(*) INTO kept_rows FROM parent x LEFT JOIN contact c
        ON c.parent_id = x.id AND c.name = 'Ada';
    IF scalar_rows <> 2 OR join_rows <> 1 OR filtered_rows <> 1 OR kept_rows <> 2 THEN
        RAISE EXCEPTION 'unmatched parent preservation';
    END IF;
    INSERT INTO contact VALUES (1, 'Grace');
    BEGIN
        PERFORM (SELECT name FROM contact WHERE parent_id = 1);
        RAISE EXCEPTION 'expected scalar cardinality violation';
    EXCEPTION WHEN cardinality_violation THEN NULL;
    END;
END $$;
\echo PASS scalar-join-and-left-join

DO $$
BEGIN
    IF (2 NOT IN (SELECT v FROM (VALUES (1), (NULL::integer)) t(v))) IS NOT NULL
       OR NOT (NOT EXISTS (SELECT FROM (VALUES (1), (NULL::integer)) t(v) WHERE v = 2))
       OR (NULL::integer NOT IN (SELECT 1 WHERE false)) IS DISTINCT FROM true
       OR (SELECT count(*) FROM payment WHERE false) <> 0
       OR (SELECT sum(amount) FROM payment WHERE false) IS NOT NULL THEN
        RAISE EXCEPTION 'NULL and empty set semantics';
    END IF;
END $$;
\echo PASS null-and-empty-inputs

CREATE TEMP TABLE event (id integer PRIMARY KEY, occurred_at timestamptz NOT NULL);
INSERT INTO event VALUES (1, '2024-01-01Z'), (2, '2024-01-01Z'),
    (3, '2024-01-01Z'), (4, '2024-01-02Z');
DO $$
DECLARE ids integer[]; bad_ids integer[];
BEGIN
    SELECT array_agg(id ORDER BY occurred_at, id) INTO ids FROM
        (SELECT * FROM event WHERE (occurred_at, id) > ('2024-01-01Z'::timestamptz, 2)
         ORDER BY occurred_at, id LIMIT 2) q;
    SELECT array_agg(id ORDER BY occurred_at, id) INTO bad_ids FROM
        (SELECT * FROM event WHERE occurred_at > '2024-01-01Z'
         ORDER BY occurred_at, id LIMIT 2) q;
    IF ids IS DISTINCT FROM ARRAY[3,4] OR bad_ids IS DISTINCT FROM ARRAY[4] THEN
        RAISE EXCEPTION 'cursor must include tie-breaker';
    END IF;
END $$;
\echo PASS pagination-ties

DO $$
DECLARE start_at timestamptz; end_at timestamptz; selected integer;
BEGIN
    start_at := timestamp '2024-03-31' AT TIME ZONE 'Europe/Paris';
    end_at := timestamp '2024-04-01' AT TIME ZONE 'Europe/Paris';
    SELECT count(*) INTO selected FROM
        (VALUES (start_at - interval '1 microsecond'), (start_at),
                (end_at - interval '1 microsecond'), (end_at)) t(instant)
        WHERE instant >= start_at AND instant < end_at;
    IF end_at - start_at <> interval '23 hours' OR selected <> 2 THEN
        RAISE EXCEPTION 'spring business day bounds';
    END IF;
    IF (timestamp '2024-10-28' AT TIME ZONE 'Europe/Paris') -
       (timestamp '2024-10-27' AT TIME ZONE 'Europe/Paris') <> interval '25 hours' THEN
        RAISE EXCEPTION 'autumn business day bounds';
    END IF;
END $$;
\echo PASS business-date-dst

DO $$
DECLARE peer_total integer; row_total integer;
BEGIN
    SELECT a, b INTO peer_total, row_total FROM
        (SELECT id, sum(id) OVER (ORDER BY k) a,
                sum(id) OVER (ORDER BY k, id ROWS UNBOUNDED PRECEDING) b
         FROM (VALUES (1, 1), (2, 1), (3, 2)) t(id, k)) q WHERE id = 1;
    IF peer_total <> 3 OR row_total <> 1 THEN RAISE EXCEPTION 'window peers'; END IF;
END $$;
\echo PASS window-peers

CREATE TEMP TABLE tenant_parent (tenant_id integer, id integer, PRIMARY KEY (tenant_id, id));
CREATE TEMP TABLE tenant_child (
    tenant_id integer NOT NULL, parent_id integer NOT NULL, amount integer CHECK (amount > 0),
    CONSTRAINT tenant_child_parent FOREIGN KEY (tenant_id, parent_id) REFERENCES tenant_parent
);
INSERT INTO tenant_parent VALUES (1, 10), (2, 20);
INSERT INTO tenant_child VALUES (1, 10, NULL);
DO $$
BEGIN
    BEGIN
        INSERT INTO tenant_child VALUES (1, 20, 1);
        RAISE EXCEPTION 'expected tenant FK refusal';
    EXCEPTION WHEN foreign_key_violation THEN NULL;
    END;
    BEGIN
        INSERT INTO tenant_child VALUES (1, 10, -1);
        RAISE EXCEPTION 'expected CHECK refusal';
    EXCEPTION WHEN check_violation THEN NULL;
    END;
END $$;
\echo PASS tenant-fk-and-null-check

CREATE TEMP TABLE scan_case (id integer PRIMARY KEY, payload text NOT NULL);
INSERT INTO scan_case SELECT n, repeat('x', 100) FROM generate_series(1, 1000) n;
ANALYZE scan_case;
EXPLAIN SELECT * FROM scan_case;
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM scan_case;
ROLLBACK;
