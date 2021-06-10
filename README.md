# PostgreSQL

POKRENUCEMO CONTAINER, U KOJEM CE RUNN-OVATI VERZIJA `13.0` VERIJA `PostgreSQL`-A

- `docker run --name test-postgres -e POSTGRES_PASSWORD=schism -p 5432:5432 -d --rm postgres:13.0`

KAO STO VIDIS OVDE KORISTIMO: Run container in background and print container ID (-d FLAG, ODNOSNO --detach)

NE KORISTIMO -it FLAGOVE, KAO SA MONGO-OM

NARAVNO -e PREDSTAVLJA ENVIROMNT VARIABLE

`-rm` REMOVE-UJE LOGS KADA SE CONTAINER ZAUSTAVI SA `docker kill <containr id>` ILI `docker stop <container id>`

**DA POKRENEMO POSTGRES COMMAND LINE CLIENT, KORISTICEMO KOMANDU `psql`**

- `docker exec -it -u postgres test-postgres psql`

OVO `-u` PREDSTAVLJA USERNAME ILI TI UID

NAKON STO SAM EXECUTE-OVAO KOMANDU, POSTAO SAM CONNECTED SA INSTANCOM POSTGRES-A, KOJA RUNN-UJE U CONTAINER-U

U COMMAND LINE-U POSTGRESS-A, STOJI:

```
postgres=#
```

**ZA POCETAK MI SMO CONNECTED SA DATBASE-OM, KOJI SE ZOVE `postgres`, ALI CEMO TO UBRZO PROMENITI**

MOGU KUCATI I help

# MI CEMO KREITRATI NOVI DATABASE, KOJI CEMO NAZVATI `message_boards`

VODI RACUNA NA SEMICOLON JER JE TO KRITICNO, JER POSTGRES NE ZNA DA SI ZAVRSIO SA KOMANDOM, SEM AKO NE STAVIS SMICOLON

- `CREATE DATABASE message_boards;`

KAO ODGOVOR SI IMAO ECHOED ISTU KOMANDU, STO ZNACI DA JE USPESNO KREIRAN NOVI DATBASE

```
CREATE DATABASE
```

# NAKON STO SMO LLREIRALI DATBASE, MOZEMO EXECUTE-OVATI COMMAND DA KORISTIMO TAJ DATABASE, I TU KORISTIMO CONNECT, A TO PISEMO OVAKO `\c` ILI `\connect`

- `\c message_boards`

I OVO CE BITI OUTPUTED

```zsh
You are now connected to database "message_boards" as user "postgres".
```

SADA SMO POSTALI CONNECTED NA DRUGI DATBASE, I SADA VISE NE PISE `postgres=#`, TAMO GDE KUCAMO KOMANDE

VEC PISE

```
message_boards=#
```

# DATBASE ADMIN COMMANDS SE PISU SA SLASH-EM (`\`), KAO STO SI GORE I VIDEO

**DA VIDIS SVE DATABASE-OVE, KUCAS** `/l` ILI `\list`

- `/list`

```zsh
                                   List of databases
      Name      |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges 
  
----------------+----------+----------+------------+------------+---------------------
--
 message_boards | postgres | UTF8     | en_US.utf8 | en_US.utf8 | 
 postgres       | postgres | UTF8     | en_US.utf8 | en_US.utf8 | 
 template0      | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres         
 +
                |          |          |            |            | postgres=CTc/postgre
s
 template1      | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres         
 +
                |          |          |            |            | postgres=CTc/postgre
s
(4 rows)
```

**DA VIDIS TABLES U TRENUTNOM DATBASE-U, KUCAS** `\d`

- `\d`

```zsh
Did not find any relations.
```

KAO STO VIDIS ZA SADA NEMAM NI JEDAN TABLE U `message_boards` DATABASE-U

**DA VIDIS AVAILABLE COMMANDS, KUCAS** `\?`

- `\?`

```zsh
General
  \copyright             show PostgreSQL usage and distribution terms
  \crosstabview [COLUMNS] execute query and display results in crosstab
  \errverbose            show most recent error message at maximum verbosity
  \g [(OPTIONS)] [FILE]  execute query (and send results to file or |pipe);
                         \g with no arguments is equivalent to a semicolon
  \gdesc                 describe result of query, without executing it
  \gexec                 execute query, then execute each value in its result
  \gset [PREFIX]         execute query and store results in psql variables
  \gx [(OPTIONS)] [FILE] as \g, but forces expanded output mode
  \q                     quit psql
  \watch [SEC]           execute query every SEC seconds

Help
  \? [commands]          show help on backslash commands
  \? options             show help on psql command-line options
  \? variables           show help on special variables
  \h [NAME]              help on syntax of SQL commands, * for all commands

Query Buffer
  \e [FILE] [LINE]       edit the query buffer (or file) with external editor
  \ef [FUNCNAME [LINE]]  edit function definition with external editor
  \ev [VIEWNAME [LINE]]  edit view definition with external editor
  \p                     show the contents of the query buffer
  \r                     reset (clear) the query buffer
  \s [FILE]              display history or save it to file
  \w FILE                write query buffer to file

Input/Output
  \copy ...              perform SQL COPY with data stream to the client host
  \echo [-n] [STRING]    write string to standard output (-n for no newline)
  \i FILE                execute commands from file
  \ir FILE               as \i, but relative to location of current script
  \o [FILE]              send all query results to file or |pipe
  \qecho [-n] [STRING]   write string to \o output stream (-n for no newline)
  \warn [-n] [STRING]    write string to standard error (-n for no newline)

Conditional
  \if EXPR               begin conditional block
  \elif EXPR             alternative within current conditional block
  \else                  final alternative within current conditional block
  \endif                 end conditional block

Informational
  (options: S = show system objects, + = additional detail)
  \d[S+]                 list tables, views, and sequences
  \d[S+]  NAME           describe table, view, sequence, or index
  \da[S]  [PATTERN]      list aggregates
  \dA[+]  [PATTERN]      list access methods
  \dAc[+] [AMPTRN [TYPEPTRN]]  list operator classes
  \dAf[+] [AMPTRN [TYPEPTRN]]  list operator families
  \dAo[+] [AMPTRN [OPFPTRN]]   list operators of operator families
```

OVO GORE JE SAMO DEO KOMANDI, KOJE NASTAVLJAS DA LISTAS KADA PRISTISNES ENTER

MOZES HIT-OVATI Q PREDPOSTAVLJAM DA IZADJES IZ LISTANJA

# DA VIDIS KOJE SVE QUERY-JE MOZES PRAVITI, KUCAS `\h`

OVO MOE BITI SOMETIMES USEFUL

- `\h`

```zsh
Available help:
  ABORT                            CREATE USER
  ALTER AGGREGATE                  CREATE USER MAPPING
  ALTER COLLATION                  CREATE VIEW
  ALTER CONVERSION                 DEALLOCATE
  ALTER DATABASE                   DECLARE
  ALTER DEFAULT PRIVILEGES         DELETE
  ALTER DOMAIN                     DISCARD
  ALTER EVENT TRIGGER              DO
  ALTER EXTENSION                  DROP ACCESS METHOD
  ALTER FOREIGN DATA WRAPPER       DROP AGGREGATE
  ALTER FOREIGN TABLE              DROP CAST
  ALTER FUNCTION                   DROP COLLATION
  ALTER GROUP                      DROP CONVERSION
  ALTER INDEX                      DROP DATABASE
  ALTER LANGUAGE                   DROP DOMAIN
  ALTER LARGE OBJECT               DROP EVENT TRIGGER
  ALTER MATERIALIZED VIEW          DROP EXTENSION
  ALTER OPERATOR                   DROP FOREIGN DATA WRAPPER
  ALTER OPERATOR CLASS             DROP FOREIGN TABLE
  ALTER OPERATOR FAMILY            DROP FUNCTION
  ALTER POLICY                     DROP GROUP
  ALTER PROCEDURE                  DROP INDEX
  ALTER PUBLICATION                DROP LANGUAGE
  ALTER ROLE                       DROP MATERIALIZED VIEW
  ALTER ROUTINE                    DROP OPERATOR
  ALTER RULE                       DROP OPERATOR CLASS
  ALTER SCHEMA                     DROP OPERATOR FAMILY
  ALTER SEQUENCE                   DROP OWNED
  ALTER SERVER                     DROP POLICY
  ALTER STATISTICS                 DROP PROCEDURE
  ALTER SUBSCRIPTION               DROP PUBLICATION
  ALTER SYSTEM                     DROP ROLE
  ALTER TABLE                      DROP ROUTINE
  ALTER TABLESPACE                 DROP RULE
  ALTER TEXT SEARCH CONFIGURATION  DROP SCHEMA
  ALTER TEXT SEARCH DICTIONARY     DROP SEQUENCE
  ALTER TEXT SEARCH PARSER         DROP SERVER
  ALTER TEXT SEARCH TEMPLATE       DROP STATISTICS
  ALTER TRIGGER                    DROP SUBSCRIPTION
  ALTER TYPE                       DROP TABLE
  ALTER USER                       DROP TABLESPACE
  ALTER USER MAPPING               DROP TEXT SEARCH CONFIGURATION
  ALTER VIEW                       DROP TEXT SEARCH DICTIONARY
  ANALYZE                          DROP TEXT SEARCH PARSER
  BEGIN                            DROP TEXT SEARCH TEMPLATE
  CALL                             DROP TRANSFORM
  CHECKPOINT                       DROP TRIGGER
  CLOSE                            DROP TYPE
  CLUSTER                          DROP USER
  COMMENT                          DROP USER MAPPING
  COMMIT                           DROP VIEW
```

ISTO MOZES DA NASTAVIS DA LISTAS PRITISKOM NA ENTER
