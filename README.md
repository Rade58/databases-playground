# HASURA

<https://hasura.io/> JE TOOL KOJI PRVI GRAPHQL LAYER IN FRONT OF YOUR DATABASE

POSTGRES JE ISTO SUPPORTED

[NESTO O HASURI, MOZES PROCITATI OVDE](https://btholt.github.io/complete-intro-to-databases/hasura)

ALI NIJE FUNKCIONISALO ONO STO JE HTEO DA PODESI BRIAN HOLT

ZATO SAM ISKOTRISTIO NACIN KOJI JE [OBJASNJEN OVDE](https://hasura.io/docs/latest/graphql/core/deployment/deployment-guides/docker.html#run-hasura-graphql-engine-using-docker)

PRVO KILL-UJ POSTOJECI CONTAINER U KOJEM TI JE POSTGRES INSTANCA

## UZECU JEDAN DOCKER COMPOSE YAML FILE, KOJEM JE ULOGA DA KREIRA DVA CONTAINERA, U JEDNOM CE BITI POSTGRES, A U DRUGOM HASURA

UGLAVNOM DOWNLOAD-OVAO SAM SLEDECI FILE

- `cat docker-compose.yaml`

```yaml
version: '3.6'
services:
  postgres:
    image: postgres:12
    restart: always
    volumes:
    - db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: schism
  graphql-engine:
    image: hasura/graphql-engine:v1.3.3
    ports:
    - "8080:8080"
    depends_on:
    - "postgres"
    restart: always
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:schism@postgres:5432/message_boards
      ## enable the console served by server
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true" # set to "false" to disable console
      ## enable debugging mode. It is recommended to disable this in production
      HASURA_GRAPHQL_DEV_MODE: "true"
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
      ## uncomment next line to set an admin secret
      # HASURA_GRAPHQL_ADMIN_SECRET: myadminsecretkey
volumes:
  db_data:
```

SAMO SAM GA MALO MODIFIKOVAO I SADA GA POKRECEM

- `docker-compose up -d`

DAKLE IMACU DVA CONTAINER-A

- `docker ps`

```zsh
CONTAINER ID   IMAGE                          COMMAND                  CREATED              STATUS                          PORTS      NAMES
3227273a43ea   hasura/graphql-engine:v1.3.3   "graphql-engine serve"   About a minute ago   Restarting (1) 11 seconds ago              databases-playground_graphql-engine_1
e4b74dc0d18e   postgres:12                    "docker-entrypoint.s…"   About an hour ago    Up About a minute               5432/tcp   databases-playground_postgres_1

```

SADA CEMO DA UDJEMO U CLI POSTGRES INSTANCE

- `docker exec -it -u postgres databases-playground_postgres_1 psql`

SADA SMO U POSTGRESS CLI

DA NAPRAVIMO `message_boards` DATBASE

- `CREATE DATABASE message_boards;`

DA SE KONEKTUJEMO NA NOVI DATBASE

- `\c message_boards;`

PREKOPIRACEMO [SVE ODAVDE](sample-postgresql.sql), I PAST-OVACEMO U CLI IEXECUTE-OVACEMO TO, KAKO BISMO DOBILI NOVE TABLE-OVE I KAKO BI MNOSTVO RECORDS-A BILO KREIRANO U TIM TABLE-OVIMA

POSTO SMO SVE TO URADILI RESTARTOVACEMO CONTAINER U KOJEM JE HASURA

- `docker ps`

```zsh
CONTAINER ID   IMAGE                          COMMAND                  CREATED             STATUS          PORTS                                       NAMES
3227273a43ea   hasura/graphql-engine:v1.3.3   "graphql-engine serve"   15 minutes ago      Up 4 seconds    0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   databases-playground_graphql-engine_1
e4b74dc0d18e   postgres:12                    "docker-entrypoint.s…"   About an hour ago   Up 15 minutes   5432/tcp                                    databases-playground_postgres_1
```

- `docker container retart 3227273a43ea`

## SADA MI VEC MOZEMO DA QUERY-UJEMO KORISCENJEM GRAAPHQL-A 

TOOL, KOJI JE BASED NA GRAPHIQL-U EXPOSED JE NA: <http://localhost:8080>

KLIKNI NA `DATA` TAB

TU MOGU VIDETI LISTED TABLOVE

MOZES DA KLIKNES NA `Track` BUTTON ISPRED NEKOG OD IMENA I VIDECES SVE FIELD-OVE, KOJE MOZE IMATI RECORD TOG TABLE-A

**ALI KADA SI KLIKNUO NA TO , MOZES DA SE VRATIS U TAB `GRAPHIQL` I VIDECES DA CE TAMO BITI DOSTUPNI TYPE-OVI ZA GRAPHQL QUERY-JE, KOJE MOZES OBAVLJATI ZA ONE RECORDE, ONE TABELE, ZA KOJU SI KLIKNUO MALOCAS NA `Track`**

NAPRAVICU JEDAN GRAPGL QUERY

```gql
{
  users( where: {user_id: {_eq: 1}}) {
    email
    created_on
   	last_login
    user_id
    full_name
  }
}
```

EVO KOJ ISAM DATA DOBIO

```json
{
  "data": {
    "users": [
      {
        "email": "dpuckring0@wikimedia.org",
        "created_on": "2021-06-06T12:54:50.318908",
        "last_login": null,
        "user_id": 1,
        "full_name": "Dicky Puckring"
      }
    ]
  }
}
```

## TI SI U `DATA` TBU, MOGAO DA KLIKNES I NA `Track all` KAKO BI TI SVI TYPE-OVI BILI DOSTUPNI

MEDJUTIM TO I NIJE NEKA DOBRA PRAKSA, JER NE TREBAS DA SCE UCINIS DA TI BUDE PUBLIC

