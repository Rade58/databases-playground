# CREATING TABLES AND RECORDS IN PostgreSQL

CISTO DA TI KAZEM DA KOMANDE NE MORAS PISATI IN CAPITAL, ALI PRAKSA JE DA SE TO OBICNO RADI, KAKO BI BILO VIDLJIVO STA JE KOMANDA

PRE NEGO STO NAPRAVIMO TABLE, SWITCH-OVACEMO TO `"message_boards"` DATBASE, KOJU SMO KREIRALI U PROSLOM BRANCH-U (NARAVNO, AKO SI VEV U POMENUTOM, DATBASE-U, NE MORAS OVO RADITI)

- `\c message_boards`

**SADA CEMO DA KRIRAMO TABLE**

UNOSICU IZ VISE REDOVA; DAKLE TO RADIM KADA `NE STAVIM` `;`, A PRITISNEM ENTER (KORISTI SPACE ZA INDENTATION)

```sql
message_boards=# CREATE TABLE users(
message_boards(#   user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
message_boards(#   username VARCHAR ( 25 ) UNIQUE NOT NULL,
message_boards(#   email VARCHAR ( 50 ) UNIQUE NOT NULL,
message_boards(#   full_name VARCHAR ( 100 ) NOT NULL,
message_boards(#   last_login TIMESTAMP,
message_boards(#   created_on TIMESTAMP NOT NULL
message_boards(# );
CREATE TABLE
```

KREIRALI SMO `user` TABLE U `message_boards` DATBASE-U

DA OBJASNIMO KAKAV SMO TABLE KREIRALI

`user_id` (OVO CE BITI STVAR KKOJU CE DATBASE PRMARNO INDEKSIRALI JER SMO MII TO DEFINISALI (KORISCENJEM `PRIMARY KEY`), A DEFINISALI SMO I AUTO INCREMENTING OVOG FIELD-A, KORISCENJEM `GENERATED ALWAYS AS IDENTITY`); I SMAM ZNAS STA ZNACI INTEGER

ZA MJOGE FIELD-OVE, KORISTILI SMO `VARCHAR` STO DEFINISE BUKVALNO STRING, A TO ZNACI **VARIABLE AMOUT OF CHARACTERS**

SA BROJEM U ZAGRADI SMO DEFINISALI LIMIT KARAKTERA, A `NOT NULL` ZNACI DA AKO ZELIS DA INSERT-UJES U POMENUTI DATBASE, DA MORAS INCLUDE-OVATI POMENUTI FIELD ;ODNONO QUERY NECE BITI ACCEPTED

`UNIQUE` ZNAS I SAM STA ZNACI, A ZNAS STA I `TIME STAMP`

**MOZEMO SADA DA POGLEDAMO LIST OF RELATIONS**

- `\d`

```zsh
                List of relations
 Schema |       Name        |   Type   |  Owner   
--------+-------------------+----------+----------
 public | users             | table    | postgres
 public | users_user_id_seq | sequence | postgres
(2 rows)
```

KAO STO VIDIS GORE, IMAS users TABLE

A DRUGO SE TICE ONAOG AUTOINCREMENTINGA ONOG user_id FIELD-A, KOJI PREDSTAVLJA U SUSTINI INDEX, JER NA OSNOVU TOGA SE KEEP-UJE TRACK WHERE WE ARE IN DATABASE

## PORED `VARCHAR`, MOZES KORISTITI I `TEXT` DA TYPE-UJES FIELD

TDA SE NE SETT-UJE LIMIT I ON MOZE DA BUDE PREKO 50000 KARAKTERA

A POSTOJE I JAKO MNOGO DRUGIH TYPE-OVA ZA DATA POSTGRES-A

POSTOJI I **LINK** TYPE

[EVO OVDE MOZES DA VIDIS I DRUGE TYPE-OVE](https://www.postgresql.org/docs/9.5/datatype.html#DATATYPE-TABLE)

# JA SADA IMAM TABLE I ON JE EMPTY; I SADA CU DA INSERT-UJEM NESTO U TAJ TABLE; KORISTIM KOMANDU `INSERT INTO`

OVDE CEMO PRVO TYPE-OVATI IME TABLE-A, A TO JE users, A TAKODJE MORAMO DA NAPISEMO SVAKI FIELD, ILI IME KOLONE, KOJU MORAMO POPUNITI (KOLONE SPECIFICIRAMO U ZAGRADI)

ISTO TAKO DODAJEMO ODREDNICU `VALUES`, KAKO BI SMO ONDA OPET U ZAGRADI, SPECIFICIRALI SVE VALUES ZA POMENUTE KOLONE

ISTO TAKO TI IMAS JEDAN FIELD, KOJI MOZE BITI NULL, I TO JE last_login, KO MOZEMO OMMIT-OVATI TOKOM INSERTING, I NECES IMATI NIKAKAV ERROR AKO GA OMMIT-UJES JER SMES

ISTO TAKO, ZA VALLUES MORAS KORISTITI SINGLE QUOTES, JER TAKO MORA U SQL-U

**STO SE TICE FIELD-A created_on, KOJ ISMO TYPE-OVALI, KAO `TIMESTAMP`, MOZEMO MU VREDOST ZADATI KORISCENJEM FUNKCIJE *`NOW()`*, KOJA JE BUILT INTO POSTGRESS, I KOJU MOGU KORISTIODMAH KADA KREIRAM RECORD**

```sql
message_boards=# INSERT INTO users (username ,email, full_name, created_on) VALUES ('rade', 'magnificet@lol.com', 'Rade Bajic', NOW());
INSERT 0 1
message_boards=# 
```

DOBIO SAM NAZAD `INSERT 0 1` STO REPEREZENTUJE DA SAM USPESNO KREIRAO RECORD

0 REPREZENTUJE `OID` (STO NECEMO COVER-OVATI ILI IKAKO KORISTITI U OVOM WORKSHOP-U)

A `1` PREDSTAVLJA BROJ RECORD-A KOJI JE ADDED TO THE TABLE

# SADA CEMO DA READ-UJEMO FROM THE DATABASE; A MOST EASY AND BASIC WAY TO DO IT JE KORISCENJEM `SELECT * FROM`

- `SELECT * FROM users`

OVIM BI TREBALI DA OBTAIN-UJEMO SVE RECORDS JEDNOG TABLE-A