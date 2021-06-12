# `JSONB` IN PostgreSQL

OVO NIJE GENERIC SQL STVAR, TIME SMO SE U PROSLIM BRANCHEVIMA EXTENZIVNO BAVILI, VEC OVO JE STVAR KOJA JE VEZANA ONLY ZA `PostgreSQL` I OVA STVAR **PostgreSQL CINI MULTI PARADIGM DATBASE-OM**

MOGUCE JE STORE-OVANJE JSON-A KAO DATA TYPE-A, U POSTGRES-U

A JSON ZNA KAKO DA QUERY-UJE JSON ZA TEBE

TAKO DA MOZES DA IMAS SCHEMA I SCHEMALESS DATA KOJI ZIVE SIDE BY SIDE

A `JSONP`, KAO NI `TEXT` NEMA LIMITA U POGLEDU BROJA KARAKTERA, KAO STO `VARCHAR` IMA LIMITE

DODACEMO NOVI TABLE I RECORD-E ZA NJEGA (ALI USLOV JE DA POSTOJE I [DRUGE STVARI KOJE SI RANIJE DODAO](sample-postgresql.sql))

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