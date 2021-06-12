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

ISTO TAKO, KADA QUERY-UJES BILO KOJI FIELD, TI MOZES PISATI I IME TABLE-A, NA PRIMER ZA FIELD KOJI PRIPADA RECORD-U, TI PISES `<IME TRNUTNOG TABLEA>.<NJEGOV FIELD>`, A AKO JE U PITANJU REFERENCA, TO NE SMES RADITI DOK NE INTRODUCE-UJEMO JOINS

- `SELECT comments.comment_id, comments.user_id, LEFT(comment, 20) AS preview FROM comments WHERE board_id=69;`

```zsh
 comment_id | user_id |       preview        
------------+---------+----------------------
          6 |     721 | Curabitur gravida ni
         23 |     320 | Quisque id justo sit
         78 |     544 | Aenean lectus. Pelle
        155 |     700 | Quisque porta volutp
        243 |     219 | Phasellus in felis. 
        297 |     408 | Cras mi pede, malesu
        400 |     305 | Suspendisse potenti.
        562 |     530 | Cras mi pede, malesu
        784 |     498 | Phasellus in felis. 
        820 |     879 | Aenean fermentum. Do
        979 |     893 | In hac habitasse pla
(11 rows)
```

DA SI GORE NAPISAO `users.user_id` IMAO BI ERROR

## ONOME KOJEM DISPLAY-UJES DATA VEROVATNO NIJE STALO DO TOGA DA GLEDA U user_id FIELD, VEROVATNO GA ZANIMA username, ILI fill_name RECORDA, IZ users TABLE-A; `ZATO CEMO DA DEFINISEMO JOIN, RACNIJE, DEFINISACEMO INNER JOIN`

TREBA RECI NEKOLIKO STVARI O TOME STA CU PISATI KADA PISEM PROJECTION, U SLUCAJU REFERENCE, KOJA SE U MOM SLUCAJU ZOVE `user_id`

TADA CU SPECIFICIRATI KOJE TO FIELD-OVE ZELIM IZ TOG RECORDA IZ DIFFERENT TABLE-A ,A TO RADIM TAKO STO PISEM `<IME DIFFERENT TABLE-A>.<ZELJENI FIELD DIFFERENT TABLE-A>`

A DEO KLAUZULE U KOJOJ SE VRSI JOIN, TREBA DA IDE TAKO, DA SE TU KORISTE ODREDNICE `INNER JOIN <IME DIFFERENT TABLE-A>` I `ON <USLOV O JEDNAKOSTI>`

- `SELECT comment_id, users.email, users.username, time, LEFT(comment, 20) AS preview FROM comments INNER JOIN users ON comments.user_id = users.user_id WHERE board_id=69;`

EVO STA SAM DOBIO IN RETURN

DAKLE REZULTATU CE BITI DODATI, POTPUNO NOVI FIELD-OVI `email` I `username`

```zsh
 comment_id |           email           |   username    |        time         |       preview        
------------+---------------------------+---------------+---------------------+----------------------
        243 | gde62@sfgate.com          | gde62         | 2019-08-21 07:01:01 | Phasellus in felis. 
        400 | cstebles8g@ovh.net        | cstebles8g    | 2020-09-02 20:04:31 | Suspendisse potenti.
         23 | mhamsson8v@sina.com.cn    | mhamsson8v    | 2020-03-13 00:56:44 | Quisque id justo sit
        297 | rhenstridgebb@51.la       | rhenstridgebb | 2019-07-10 10:18:50 | Cras mi pede, malesu
        784 | hjumeaudt@yale.edu        | hjumeaudt     | 2020-05-01 00:44:03 | Phasellus in felis. 
        562 | sdallynep@squarespace.com | sdallynep     | 2019-02-14 09:54:49 | Cras mi pede, malesu
         78 | bdotterillf3@sun.com      | bdotterillf3  | 2018-10-20 09:35:49 | Aenean lectus. Pelle
        155 | jyakebovichjf@state.gov   | jyakebovichjf | 2018-12-10 00:55:18 | Quisque porta volutp
          6 | tberreyk0@adobe.com       | tberreyk0     | 2019-05-25 13:46:06 | Curabitur gravida ni
        820 | fginnaneoe@answers.com    | fginnaneoe    | 2018-11-16 02:56:52 | Aenean fermentum. Do
        979 | jpowdrillos@netscape.com  | jpowdrillos   | 2018-08-16 10:00:51 | In hac habitasse pla
(11 rows)
```

DA SMO TRAZILI FIELD, KOJI JE REFERENCA, NE BISMO SMELI BITI AMBIGOUS, ODNONO DVOSMISLENIS

TO ZNACI DA SMO TRAZILI `user_id` FIELD, MORALI SMO GA OVAKO NAPISATI: `users.user_id` ILI `comments.comment_id`, A NE DRUGACIJE, JER DA SAMO NAPISEMO `user_id` BILI BISMO AMBIGOUS I ERROR BI BIO THROWN

- `SELECT users.user_id, LEFT(comment, 20) AS preview FROM comments INNER JOIN users ON comments.user_id = users.user_id WHERE board_id=16;`

```zsh
 user_id |       preview        
---------+----------------------
      56 | Nulla ut erat id mau
     223 | Aliquam quis turpis 
     370 | Lorem ipsum dolor si
     377 | Vestibulum ac est la
     416 | Maecenas tristique, 
     426 | Nullam sit amet turp
     513 | Proin interdum mauri
     611 | Cras non velit nec n
     617 | Duis aliquam convall
     653 | Donec diam neque, ve
     716 | Nulla ut erat id mau
     965 | In congue. Etiam jus
(12 rows)
```


