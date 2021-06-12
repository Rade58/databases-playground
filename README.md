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

OVO GORE JE JAKO LOS QUERY, POGOTOVO ZBOG cost BROJI, KOJE SU U RANGU 60, STO JESTE POKAZATELJ DA SE RADI O SKUPOM QUERY-JU

I TAKODJE "`SEQUENTIAL SCAN`" (`"Seq Scan"`) JE JAKO LOSA STVAR

# ZATO CEMO INDEX-OVATI GORNJI QUERY

- `CREATE INDEX ON comments (board_id);`

DAKLE REKLI SMO DA ON THE comments TABLE, INDEKSIRAJ FIELD board_id ,JER TO JE NESTO STO PLNIRAMO DA QUERY-UJEMO QUITE A BIT  

I COST CE BITI PREPOLOVLJEN

PROBAJ PA SE UVERI

- `EXPLAIN SELECT comment_id, user_id, time, LEFT(comment, 20) FROM comments WHERE board_id=39 ORDER BY time DESC LIMIT 38;`

```zsh
                                           QUERY PLAN                                            
-------------------------------------------------------------------------------------------------
 Limit  (cost=33.73..33.76 rows=12 width=48)
   ->  Sort  (cost=33.73..33.76 rows=12 width=48)
         Sort Key: "time" DESC
         ->  Bitmap Heap Scan on comments  (cost=4.37..33.51 rows=12 width=48)
               Recheck Cond: (board_id = 39)
               ->  Bitmap Index Scan on comments_board_id_idx  (cost=0.00..4.37 rows=12 width=0)
                     Index Cond: (board_id = 39)
(7 rows)
```

SADA JE cost KAO STO VIDIS U RANGU OKO 30

I NIJE SE KORISTIO SEQUENTIAL SCAN, VEC `Bitmap Index Scan`

## MEDJUTIM OVO (CREATING OF INDEX) SE NE RADI U PRODUCTION-U JER JE REC O HEFTY STVARI

OVO JE KOD NAS RADILO ODMA JR SMO NA PERSONAL RACUNARU, OJI NISTA DRUGO NE RADI RIGHT NOW