# `JSONB` IN PostgreSQL

***
***

digresija:

OVDE CEMO POKAZATI I `DISTINCT`, ALI I NESTO STO SE ZOVE `CAST()`

MOGLI SMO TO I RANIJE A POKAZEMO, JER NIJE PRETEZNO ONO STO JE TEMA OVE LEKCIJE, ALI NEMA VEZE, URADICEMO TO OVDE

***
***

OVO NIJE GENERIC SQL STVAR, TIME SMO SE U PROSLIM BRANCHEVIMA EXTENZIVNO BAVILI, VEC OVO JE STVAR KOJA JE VEZANA ONLY ZA `PostgreSQL` I OVA STVAR **PostgreSQL CINI MULTI PARADIGM DATBASE-OM**

MOGUCE JE STORE-OVANJE JSON-A KAO DATA TYPE-A, U POSTGRES-U

A JSON ZNA KAKO DA QUERY-UJE JSON ZA TEBE

TAKO DA MOZES DA IMAS SCHEMA I SCHEMALESS DATA KOJI ZIVE SIDE BY SIDE

A `JSONP`, KAO NI `TEXT` NEMA LIMITA U POGLEDU BROJA KARAKTERA, KAO STO `VARCHAR` IMA LIMITE

DODACEMO NOVI TABLE I RECORD-E ZA NJEGA (ALI USLOV JE DA POSTOJE I [DRUGE STVARI KOJE SI RANIJE DODAO](sample-postgresql.sql)),JER POSTOJE REFERENCE (TCNIJE JEDNA KOJA SE ODNOSI NA comment_id)

```sql
DROP TABLE IF EXISTS rich_content;

CREATE TABLE rich_content (
  content_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  comment_id INT REFERENCES comments(comment_id) ON DELETE CASCADE,
  content JSONB NOT NULL
);

INSERT INTO rich_content
  (comment_id, content)
VALUES
  (63, '{ "type": "poll", "question": "What is your favorite color?", "options": ["blue", "red", "green", "yellow"] }'),
  (358, '{ "type": "video", "url": "https://youtu.be/dQw4w9WgXcQ", "dimensions": { "height": 1080, "width": 1920 }}'),
  (358, '{ "type": "poll", "question": "Is this your favorite video?", "options": ["yes", "no", "oh you"] }'),
  (410, '{ "type": "image", "url": "https://btholt.github.io/complete-intro-to-linux-and-the-cli/WORDMARK-Small.png", "dimensions": { "height": 400, "width": 1084 }}'),
  (485, '{ "type": "image", "url": "https://btholt.github.io/complete-intro-to-linux-and-the-cli/HEADER.png", "dimensions": { "height": 237 , "width": 3301 }}');
```

KAO STO VIDIS `rich_content` TABLE, ODNOSNO NJEGOV RECORD IMA I content FIELD, KOJI JE KAO STO VIDIS `JSONB` TYPE-A

- `SELECT content FROM rich_content WHERE content_id=1;`

ONO STO SAM DOBIO JE ZAISTA JSON

```zsh
                                                   content                                                   
-------------------------------------------------------------------------------------------------------------
 {"type": "poll", "options": ["blue", "red", "green", "yellow"], "question": "What is your favorite color?"}
(1 row)
```

KAO STO VIDIS OVDE IMAS POOL

DAKLE IMAS MOGUCNOST DA OVAKO STORE-UJES, NEKI RICH CONTENT

TAKVI SU I OSTALI RECORDI

- `SELECT * FROM rich_content;`

```zsh
 content_id | comment_id |                                                                          content                                          
                                
------------+------------+---------------------------------------------------------------------------------------------------------------------------
--------------------------------
          1 |         63 | {"type": "poll", "options": ["blue", "red", "green", "yellow"], "question": "What is your favorite color?"}
          2 |        358 | {"url": "https://youtu.be/dQw4w9WgXcQ", "type": "video", "dimensions": {"width": 1920, "height": 1080}}
          3 |        358 | {"type": "poll", "options": ["yes", "no", "oh you"], "question": "Is this your favorite video?"}
          4 |        410 | {"url": "https://btholt.github.io/complete-intro-to-linux-and-the-cli/WORDMARK-Small.png", "type": "image", "dimensions": 
{"width": 1084, "height": 400}}
          5 |        485 | {"url": "https://btholt.github.io/complete-intro-to-linux-and-the-cli/HEADER.png", "type": "image", "dimensions": {"width"
: 3301, "height": 237}}
(5 rows)
```

KAO STO VIDIS IMA MOGUCNOST DA STORE-UJES URL VIDEO-A I DA IMAS DIMENZIJE ZA VIDEO

DAKLE OVO SU SVE NEKE VRSTE RICH CONTENT-A

ZA TO JE POTREBAN SCHEMALESS WAY PF EXPRESSIN, STO JE OVDE I URADJENO

BEZ OVOGA JA BI MORAO DA IMAM JEDAN TYPE, KOJI DESCRIBE-UJE URL, DRUGI KOJI DESCRIBE-UJE VISINU, TRECI SIRINU VIDEO I TAKO DALJE; SHVATS POENTU, MOGAO SI SVE DA EXPRESS-UJES SA TABLE-OVIMA, ALI TO BI BILO MESSY

**OVAKO SVE MOZES DA STAVIS U JEDAN TABLE I DA GA EXPRESS-UJES KAO JSON**

# ALI TI NE MORAS SAMO DA DOBIJES DUGACKI STRING KADA QUERY-UJES, U TOME I JESTE POENTA, TI IMAS MOGUCNOST DA QUERY-UJES TAJ JSON, KORISCENJEM SIMBOLA NA KOJE SE TRBAS NAVICI, A TO SU OVE ARROWS: `->` `->>`

SADA CU DA QUERY-UJEM, I BIRACU FIELD "type" IZ JSON-A

- `SELECT content -> 'type' FROM rich_content;`

EVO STA SAM DOBIO

```zsh
 ?column? 
----------
 "poll"
 "video"
 "poll"
 "image"
 "image"
(5 rows)
```

QUESTION MARKS ZA COLUMN SU ZATO STO NISMO DALI NAME ,MOZEMO TO DA POPRAVIMO SA `AS`

- `SELECT content -> 'type' AS content_type FROM rich_content;`

```zsh
 content_type 
--------------
 "poll"
 "video"
 "poll"
 "image"
 "image"
(5 rows)
```

# OBRATI PAZNJU DA ONO STO TYPE-UJES SA `JSONP` ,DA TU PRILIKOM INSERTING-A RECOORDA MORAS OBEZBEDITI PROPER VREDNOST

AKO PROBAS DA FEED-UJES SA OBICNIM STRINGOM, BICE THROWN ERROR

# DA TI OBJASNIM SADA STA JE `DISTINCT`

`DISTINCT` JE NACIN DA KADA NESTO QUERY-UJES, DA OMOGUCIS DA SE U REZULTATU NE POJAVLJUJU REZULTATI

AKO BI NA PRIMER IMAO TABLE, U KOJEM IMAS MNOSTVO RECORDA, OD KOJIH SVAKI IMA **type** FIELD

TAJ type FILED, RECIMO DA MOZE IMATI DO 6 RAZLICITIH VREDNOSTI

TI KADA BI KORISTIO PROJECTION I QUERY-OVAO SVE RECORDE, DA PRIKAZES SAMO type FIELD, JASNO JE DA BI BIO U PROBLEMU, POGOTOVO KADA BI IMAO DESETINE HILJADA DOKUMENATA, A INTENTION TI JE BIO DA SAMO IZLISTAS TIH SEST MOGUCIS VREDNOSTI ZA type FIELD

I TADA BI KORISTIO DISTINCT

PROBACEMO TO, SA RECORDIMA IZ NASEG rich_content TABLE-A

- `SELECT DISTINCT content -> 'type' AS content_type FROM rich_content;`

EVO STA CES DOBITI

```zsh
 content_type 
--------------
 "image"
 "poll"
 "video"
(3 rows)
```

KAO STO VIDIS NEMA DUPLICCATE VREDNOSTI

TREBA DA TI JE JASNO DA OVO NIJE STVAR KOJA SE TICE JSON, VEC SQL, ODNOSNO TI MOZES KORISTITI `DISTINCT` I AKO JE NEKI FIELD TYPED SA `TEXT` ILI `VARCHAR` 

# RANIJE, OVO NIJE BILO MOGUCE, KADA SU LJUDI KORISTITLI `JSON` UMESTO `JSONP` TYPE-A ZA FIELD-OVE, JER SQL NIJE IMAO PREDSTAVU O TOME KAKO NA PURE JSON-U MOZE DA UPOTREBI DISTINCT, I TADA JE KORISCEN CASTING JSON INTO `TEXT` TYPE; TAD BI MORAO KORISTITI `CAST()` FUNKCIJU KOJA BI OBAVLJALA CASTING

- `SELECT DISTINCT CAST(content -> 'type' AS TEXT) AS content_type FROM rich_content;`

I OVO CE FUNKCIONISATI, IAKO ZA OVO NEMAM POTREBU JER KOTRISTIM JSONP

```zsh
 content_type 
--------------
 "image"
 "poll"
 "video"
(3 rows)
```

A DRUGI NACIN DA SE NE KORISTI `CAST()` FUNKCIJA, JESTE DA SE KORISTI `->>` SIMBOL, KOJI AUTOMATSKI CAST-UJE AS THE TEXT

- `SELECT DISTINCT content ->> 'type' AS content_type FROM rich_content;`

```zsh
 content_type 
--------------
 video
 poll
 image
(3 rows)
```
