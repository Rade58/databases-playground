# SQL DATABASES

SQL STANDS FOR `STRUCTURED QUERY LANGUAGE`

NAJVAZNIJA STVAR U VEZI OVOGA JETE DA SE OVDE RADI O RELATIONAL DATABASE-OVIMA

ILI SE KORISTI ABRIVATION: `RDBMS` (*RELATIONAL DATABASE MANAGEMENT SYSTEM*)

MOZDA JE DOBRO NAPOMENUTI DA NE KORISTE SQL, BAS SVE RELATIONAL DATABASES

# O RELATINAL DATBASE-OVIMA JE NJBOLJE RAZMISLJATI, KAO EXEL-U ILI SPREADSHEET-OVIMA

DAKLE TO JE TABLE OF DATA

U RELATIONAL DATBASE-OVIMA SE NE KORISTI TERMIN COLLECTION; VEC SE KORISTI TERMIN `TABLE` **I TO NIJE SLUCAJNOST**

KORISTICEMO TERMINE `ROWS AND COLUMNS`

# RELATIONAL DATBASES IMAJU DEINED AND VERY STRUCTURAL SCHEMA-U

ZADAVANJE NOVOG FIELD-A ON THE FLY, KAO STO SE MOZE RADITI SA MONGOM, NIJE OPCIJA U RELATIONAL DATBASE-OVIMA

TI NE SMES TU IZACI IZ PRAVOUGAONIKA TABELE, DA SE TAKO IZRAIM; NE MOZES ON THE FLY ZADAVATI DODATNU KOLONU

AKO POKUSAS DA DODAS NESTO STO NIJE U SKLADU SA SCHEMA-OM, RELATIONAL DATBASE TI JEDNOSTAVNO TO NECE DOZVOLITI

JEDINO SE KORISTI "TABLE ALTERING", ALI TO JE VEOMA EXPENSSIVE

# POWER RELATIONAL DATBASE-OVA LEZI U TOME STO SU VEOMA DOBRE U DECRIBING-U RELTIONS-A BETWEEN DATA

U MONGO-U TI NE ZELIS DA IMAS JEDNU KOLEKCIJU KOJA REFER-UJE TO ANOTHER COLLECTION, JER TO JE VEOMA EXPENSSIVE (AKO RADIS JOINS, KORISTIS MONGODB INCORRECTLY)

A SQL TAK OFUNKCIONISE DA ZELIS DA IMAS DATA THAT RELATES TO EACHOTHER

IMACES MULTIPLE DIFFERENT TABLES, KOJI CE DA REFERE-UJU TO EACH OTHER

EXAMPLE JE MESSAGE BOARD, KOJI CEMO MI KREIRATI

# POSTOJI MNOGO RAZLICITIH SQL DATBASE-OVA

TAKVA STVAR NIJE SA DOCUMENT BASED ONES; JER TAMO TI IMAS MONGO I COUPLE MORE

DAKLE POSTOJI MNOGO VRSTA SQL DATABASE-OVA

# MI SMO IZBRALI DA RADIMO SA `PostgreSQL`

