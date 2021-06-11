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