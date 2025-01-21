### First query

WITH top_blocks AS (
    SELECT block_height
    FROM test_txs
    GROUP BY block_height
    ORDER BY block_height DESC
    LIMIT 2
)
SELECT t.*
FROM test_txs t
JOIN top_blocks b ON t.block_height = b.block_height
ORDER BY t.block_height DESC;



### Second query | не смог придумать нормальное решение

WITH date_series AS (
    SELECT generate_series(
        '2024-08-03'::date,
        '2024-08-14'::date,
        '1 day'::interval
    )::date AS date
),

cumulative_gas_data AS (
    SELECT 
        date::date,
        SUM(gas) OVER (ORDER BY date::date) AS cumulative_gas
    FROM test_txs
)

SELECT 
    ds.date,
    COALESCE(
        (SELECT cumulative_gas 
         FROM cumulative_gas_data 
         WHERE date <= ds.date 
         ORDER BY date DESC 
         LIMIT 1),
        0
    ) AS cumulative_gas
FROM date_series ds
ORDER BY ds.date;

