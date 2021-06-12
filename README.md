# JOINS

PRE NEGO STO BILO STA URADIMO RECI CU TI DA [POKRENES CONTAINER SA POSTGRES INSTANNCOM, I DA UDJES U CLI RUNNING POSTGRES-A](https://github.com/Rade58/databases-playground/tree/1_0_1_PostgreSQL), AKO SI GA SLUCAJNO UGASIO;

KREIRAJ OPET DATBASE AKO VEC NISI I KONEKTUJE SE DO NJEGA

- `CREATE DATABASE message_boards;`

- `\c message_boards`

I DA NAPUNIS DATBASE, SA ONE TRI TABLE, [STO CES URADITI, TAKO STO SADRZINU OVOG FILE-A PAST-UJES INSIDE CLI](sample-postgresql.sql)


A SADA DA POCNEMO INTERAKCIJU

HAJDE PRVO DA SELEKTUJEMO NEKOLIKO RECORD-A IZ comments TABLE-A, A ZELIMO DA SELECT-UJEMO PREMA board_id FIELD-U, DAKLE ZELIMO KOMENTARE SINGLE BOOARD-A; **ALI CEMO TAKODJE KORISTITI NESTO NOVO, A TO JE `AS`, I TO JE `LEFT()` I `RIGHT()` KKADA BUDEMO PISALI KLAUZULU**

`AS` JE NACIN DA DEFINISEMO NOVI FIELD KADA QUERY-UJEMO

A `LEFT()` I `RIGHT()` SU FUNKCIJE SA KOJIMA MOZEMO DEFINISATI DA SELEKTUJEMO ZELJENI BROJ KARAKTER NEKOG FIELD-A ,SA NJEGOVOG KRAJA ILI POCETKA, I SAM ZNAS KOJA OD OVE DVE FUNKCIJE SELEKTUJE KRAJ A STA POCETAK

USTVARI NEKA U PROJECTION-U BUDU SAMO comment_id I user_id; A SA `AS` I `LEFT()` DEFINISACEMO NOVI FIELD, CIJA VREDNOST CE BITI PRVIH 20 KA

- `SELECT comment_id, user_id, LEFT(comment,20) AS preview FROM comments WHERE board_id=69;`

```zsh
 user_id | comment_id |       preview        
---------+------------+----------------------
     721 |          6 | Curabitur gravida ni
     320 |         23 | Quisque id justo sit
     544 |         78 | Aenean lectus. Pelle
     700 |        155 | Quisque porta volutp
     219 |        243 | Phasellus in felis. 
     408 |        297 | Cras mi pede, malesu
     305 |        400 | Suspendisse potenti.
     530 |        562 | Cras mi pede, malesu
     498 |        784 | Phasellus in felis. 
     879 |        820 | Aenean fermentum. Do
     893 |        979 | In hac habitasse pla
(11 rows)
```
