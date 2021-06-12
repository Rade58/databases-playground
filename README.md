# INDEXES IN POSTGRES

KAO I STO JE SLUCAJ I SA [MONG-OM](https://github.com/Rade58/databases-playground/tree/0_1_0_INEXES_____MONGODB), I U PSOTGRES-U MOZES EXPLAIN-OVATI QUERY

KORISTIS `EXPLAIN`

- `EXPLAIN SELECT comment_id, user_id, time, LEFT(comment, 20) FROM comments WHERE board_id=39 ORDER BY time DESC LIMIT 38;`

EVO STA CES DOBITI

```zsh
                              QUERY PLAN                               
-----------------------------------------------------------------------
 Limit  (cost=65.75..65.78 rows=12 width=48)
   ->  Sort  (cost=65.75..65.78 rows=12 width=48)
         Sort Key: "time" DESC
         ->  Seq Scan on comments  (cost=0.00..65.53 rows=12 width=48)
               Filter: (board_id = 39)
(5 rows)
```
