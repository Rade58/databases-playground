# FOREIGN KEYS IN POSTGRES

OVO O CEMU CU GOVORITI PRIPADA COMPLEX SQL QUERY-JIMA

A JEDINA STVAR NA KOJU CE TE OVO PODSECATI JESTE ONO TO SI U SLUCAJU MONGOOSE-A RADJENO SA REF-OVIMA I POPULATE-OVANJU REF FIELD-A; **ALI TO JE MONGOOSE FAKE-OVAO, KORISTECI PRINCIP RLATIONAL DATA, DATABASE-A, KOJI JE RELATIONAL**

EVO OVDE MOZES VIDETI KREIRANJE TRI TABELE; PRVU SMO NARAVNO VEC KREIRALI, ALI I [OSTALE SMO VEC KREIALI, KOPIRAJUCI, PASTUJUCI I EXECUTE-UJUCI OVO INSIDE PASTGRESS CLI](sample-postgresql.sql)

```sql
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 25 ) UNIQUE NOT NULL,
  email VARCHAR ( 50 ) UNIQUE NOT NULL,
  full_name VARCHAR ( 100 ) NOT NULL,
  last_login TIMESTAMP,
  created_on TIMESTAMP NOT NULL
);

CREATE TABLE boards (
  board_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  board_name VARCHAR ( 50 ) UNIQUE NOT NULL,
  board_description TEXT NOT NULL
);

CREATE TABLE comments (
  comment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  board_id INT REFERENCES boards(board_id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  time TIMESTAMP
);
```

DRUGA TABELA NIJE SPORNA JER SMO VEC OBJASNILI I KORISTILI FIELD TYPE-OVE, SA KOJIMA SE OPISUJE `boards` TABLE

**ALI KREIRANJE `comments` TABLE-A JE DRUGACIJA**

ZANIMLJIVI SU NAM TYPE-OVI ZA FIELD-OVE `user_id` I `board_id`; JER JASNO JE D ONI REFERENCIRAJU RECORD-E DRUGIH TABELA, I KORISTE `REFERENCES` ODREDNICU U KLAUZULI

AKO POSMATRAM JEDAN OD POMENUTIH FIELDOVA JASNO JE DA POMENUTI FIELD REFERENCIRA FIELD IZ RECORD-A DRUGE TABLE

NA PRIMER user_id REFERENCIRA users(user_id), ODNOSNO **`user_id` RECORDA IZ TABELE `comments` REFERENCIRA `user_id` FIELD RECORDA IZ TABELE `users`**; ISTI PRINCIP VAZI I ZA board_id FIELD

# ONO STO MOZES VIDETI, U POMENUTIM KLAUZULAMA JESTE `ON DELETE CASCADE`, A NAJBOLJE CES GA RAZUMETI KROZ JEDAN SCENARIO

RECIMO DA IMAS JEDAN RECORD U comments TABELI; A USER, KOJI OWN-UJE TAJ RECORD, ODNONO TAJ COMMENT, ODLUCI DA DELET-UJE SVOJ PROFILE, ODNOSNO ON IZVRSI DELETING TOG RECORD-A IZ users KOLEKCIJE, A NARAVNO TAJ RECORD, ODNOSNO NJEGOV user_id FIELD JE REFERENCED BY ANOTHER RECORD FROM ANOTHER TABLE, I OVOG PUTA TAJ RECORD JE IZ comments KOLEKCIJE 

**DA NEMAMO `ON DELETE CASCADE`, A POKUSAMO DA DELET-UJEMO RECORD, POSTGRES NAM TO NE BI DOZVOLIO, REKAO BI NAM DA PRVO UKLONIMO ONU REFERENCU, KOJU RECORD-OV FIELD REFERENCIRA, MEDJUTIM POSTO SMO MI DEFINISALI POMENUTO INSIDE KLAUZULE, BICE NAM DOZVOLJENO DA UKLONIMO RECORD, KADA TO ZELIMO**

`ON DELETE CASCADE` JE JOS MOCNIJI **ZNACI DA KADA SE GOD DELET-UJE RECORD, KOJI JE REFERENCED INSIDE RECORD KOJI POSMATRAMO; DA CE SE `UKLONITI SVI RECORD-I, KOJI REFERENCIRAJU, POMENUTI RECORD`**

STO U NASEM SLUCAJU, DA KADA DELET-UJEMO USERA, TO CE INICIRATI I DELETING, SVIH NJEGOVIH KOMENATARA
