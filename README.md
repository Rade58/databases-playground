# COUNT, SORT, UPDATE, DELETE

PRVO CEMO DA UPOTREBIMO JOS NEKE STVARI U NASEM FILTERINGU REZULTTA

NA PRIMER UZECU 6 RECORDA, KOD KOJIH laast_login FIELD IMA VREDNOST NULL

- `SELECT username FROM users WHERE last_login IS NULL LIMIT 6;`

```zsh
   username   
--------------
 dpuckring0
 gsomerled2
 sfaiera
 gsukbhansd
 aaizikovj
 hmaccurtaink
(6 rows)
```

**HAJDE SADA DA UZMEMO ISTO, ALI DODATNO DA IMAMO USLOV, ODNONO DA DODAMO DODATNU KLAUZULU, KORISCENJEM `AND`**

ZELIMO DA UZMEMO SAMO USERE, KOJI IMAJU NULL VREDNOST ZA `last_login` FIELD; **ALI ZELIMO DA VREDNOST FIELDA `created_on`  NIJA TAKVA DA PREDSTAVLJA DATE, KOJI JE STARIJI OD SEST MESECI, VEC MANJE OD 6 MSESECI**

LEPOTA JE STO MI DIREKTNO U NASIM KLAUZULAMA MOZEMO KORISTITI DATA AND MATH, AND DATE MATH

A U OKVIRU DATE MATHA-A IMAMO STVARI SA KOJIMA MOZEMO RACUNATI

NA PRIMER OVDE JA MOGU RACUNATI UZ POMOC `NOW()` I NECEGA STO SE ZOVE `interval`

- `SELECT user_id, full_name FROM users WHERE last_login IS NULL AND created_on < NOW() - interval '6 months' LIMIT 6`

```zsh
 user_id |    full_name    
---------+-----------------
     562 | Gabbey Godbolt
     566 | Gualterio Plank
     569 | Gan Turle
     574 | Agna Ordemann
     576 | Tan Aldis
     579 | Caddric Wayon
(6 rows)
```

# HAJDE SADA DA PRONADJEMO RECORDS, CIJI FIELD created_on IMA DATE, KOJI PREDSTAVLJA NAJSTARIJI DATE; MISLIM DA CU SADA KORISTITI KLAUZULU SA `ORDER BY`

- `SELECT full_name, created_on FROM users ORDER BY created_on LIMIT 6;`

```zsh
     full_name     |         created_on         
-------------------+----------------------------
 Katleen Doherty   | 2020-06-08 14:11:16.481305
 Herculie Derrick  | 2020-06-08 14:11:16.481305
 Adolphus Karleman | 2020-06-08 14:11:16.481305
 Gerrie Tivolier   | 2020-06-08 14:11:16.481305
 Viva Windridge    | 2020-06-08 14:11:16.481305
 Elvis De Malchar  | 2020-06-08 14:11:16.481305
(6 rows)
```

A MOZEMO KORISTITI I DESCENDING ORDER, TAKO STO CEMO DODATI `DESC`

- `SELECT full_name, created_on FROM users ORDER BY created_on DESC LIMIT 6;`

```zsh
    full_name    |         created_on         
-----------------+----------------------------
 Suzanna Siviour | 2021-06-08 14:11:16.481305
 Geneva Somerled | 2021-06-07 14:11:16.481305
 Winny Edginton  | 2021-06-05 14:11:16.481305
 Dicky Puckring  | 2021-06-04 14:11:16.481305
 Mitchael Shine  | 2021-06-03 14:11:16.481305
 Magdalena Arnli | 2021-06-01 14:11:16.481305
(6 rows)
```

MOZES STAVITI I `ASC` ZA ASCCENDING (ALI TO JE ON OSTO JE IMPLIED)

# MOZEMO UMESTO, SAMO SELECT, DA KORISTIMO   `SELECT COUNT(*)`, AKO NAS ZANIMA SAMO BROJ RECORDA, KOJI ZADOVOLJAVAJU QUERY

SADA CEMO IZBROJATI KOLIKO IMAMO RECORDA, KOJI IMAJU FIELD last_login SA VRENOSCU NULL

U ZAGRADI COUNT, STAVLJAS WILDCARD `*`

- `SELECT COUNT(*) FROM users WHERE last_login IS NULL;`

```zsh
 count 
-------
   322
(1 row)
```

A DA SAM ZELEO QUERY PO KOJEM ZELIM DA IZBROJATI KOLIKO IMAMO RECORDA, KOJI IMAJU FIELD last_login SA VRENOSCU KOJA NIJE NULL, URADIO BIH SLEDECE

- `SELECT COUNT(last_login) FROM users;`

```zsh
 count 
-------
   678
(1 row)
```

# UPDATE

OVDE MOZEMO KORISTITI DAKLE `UPDATE` U KLAUZULI, KKO BI SMO UPDATE-OVALI RECORD, A ONO STA UPDATE-UJEMO ODREDJUJEMO SA `SET`

- `UPDATE users SET last_login=NOW WHERE user_id=6;`

```zsh
UPDATE 1
```

KAO STO VIIS MI SMO UPDATE-OVALI SAMO JEDAN RECORD, CIJI JE UNIQUE FIELD user_id JEDNAK SESTICI

PROBACU DA GA NADJEM DA VIDIM DA LI JE UPDATED

- `SELECT full_name, last_login FROM users WHERE user_id=6;`

```zsh
    full_name    |         last_login         
-----------------+----------------------------
 Magdalena Arnli | 2021-06-11 16:40:31.558894
(1 row)
```

# A DA UPDATE-UJES, I TAKODJE DOBIJES TAJ UPDATED RECORD BACK, MOZES KORISTITI `RETURNING *`, ILI `RETURNING <field1, field2 ...>`

- `UPDATE users SET last_login=NOW() WHERE user_id=69 RETURNING *;`

```zsh
 user_id | username |        email         |  full_name  |        last_login         |         created_on         
---------+----------+----------------------+-------------+---------------------------+----------------------------
      69 | larthy1w | larthy1w@sina.com.cn | Lukas Arthy | 2021-06-11 16:49:29.84975 | 2021-05-17 14:11:16.481305
(1 row)
```


** HAJDE SADA DA PRONADJEMO OLDEST **

ZA POCETAK HAJDE DA DELET-UJEM EVERY DOCUMENT, KOJEM JE ONAJ JEDINI FIELLD `last_login` IMA VREDNOST NULL

PRVO CEMO IH LISTOVATI

A SADA CU DA DELET-UJEM SVAKOG

- `DELETE * FROM users WHERE last_login IS NULL;`