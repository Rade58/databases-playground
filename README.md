# SELECT, LIMIT, WHERE

U PROSLOM BRANCH-U, VEC SMO VIDELI: 

SELECT SA WILDARD-OM: `SELECT * FROM <table>` 

I VIDELI

PROJECTION: `SELECT <field1, field2, ...> FROM <table>`

[KOPIRACEMO ODAVDE](sample-postgresql.sql), EKSTREMNO VELIKI SQL QUERY KOJI CE INSERT-OVATI MNOSTVO RECORD-A INSIDE users TABLE

U PITANJU JE QUERY KOJI CE DODATI OKO 6000 RECORDA

ALI MI CEMO KOPIRATI CEO FILE, JER TU SU KOMANDE ZA DROPING, PA CREATING TALE-OVA, U SUSTINI RESETING SVEGA, PRE NEGO STO INSERT-UJEMO U DATBASE

DOBRO, KADA SAM TO URADIO, MOGU DA EXPLOR-UJEM, KAKO SVE MOGU DA QUERY-UJEM DATABASE

PRVO DA VIDIMO, KOJE SVE TABLE-OVE IMAMO

- `\d`

```zsh
                     List of relations
 Schema |            Name             |   Type   |  Owner   
--------+-----------------------------+----------+----------
 public | boards                      | table    | postgres
 public | boards_board_id_seq         | sequence | postgres
 public | comments                    | table    | postgres
 public | comments_comment_id_seq     | sequence | postgres
 public | rich_content                | table    | postgres
 public | rich_content_content_id_seq | sequence | postgres
 public | users                       | table    | postgres
 public | users_user_id_seq           | sequence | postgres
(8 rows)

```

AKO OPET ISKORISTIMO `SELECT * FROM users;` BICE LISTED OGROMAN BROJ RECORD-A, ODNONO MORACEMO DA PRITISKAMO ENTER, KAKO BI PRIKAZALI SLEDECU GRUPU RECORDA I TAKO DALJE

# DA GRAB-UJEMO ONOLIKO RECORD-A, KOLIKO ZELIMO, MOZEMO KORISTITI `LIMIT`

- `SELECT * FROM users LIMIT 8;`

```zsh
 user_id |  username  |              email              |    full_name    |         last_login         |         created_on         
---------+------------+---------------------------------+-----------------+----------------------------+----------------------------
       1 | dpuckring0 | dpuckring0@wikimedia.org        | Dicky Puckring  |                            | 2021-06-04 14:11:16.481305
       2 | ssiviour1  | ssiviour1@ow.ly                 | Suzanna Siviour | 2021-06-09 14:11:16.481305 | 2021-06-08 14:11:16.481305
       3 | gsomerled2 | gsomerled2@auda.org.au          | Geneva Somerled |                            | 2021-06-07 14:11:16.481305
       4 | wedginton3 | wedginton3@google.com           | Winny Edginton  | 2021-06-06 14:11:16.481305 | 2021-06-05 14:11:16.481305
       5 | mshine4    | mshine4@army.mil                | Mitchael Shine  | 2021-06-04 14:11:16.481305 | 2021-06-03 14:11:16.481305
       6 | marnli5    | marnli5@google.co.uk            | Magdalena Arnli | 2021-06-02 14:11:16.481305 | 2021-06-01 14:11:16.481305
       7 | wjohnston6 | wjohnston6@omniture.com         | Wandis Johnston | 2021-05-25 14:11:16.481305 | 2021-05-30 14:11:16.481305
       8 | shenstone7 | shenstone7@networksolutions.com | Sibyl Henstone  | 2021-05-29 14:11:16.481305 | 2021-05-28 14:11:16.481305
(8 rows)
```