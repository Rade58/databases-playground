# HASURA

<https://hasura.io/> JE TOOL KOJI PRVI GRAPHQL LAYER IN FRONT OF YOUR DATABASE

POSTGRES JE ISTO SUPPORTED

[NESTO O HASURI, MOZES PROCITATI OVDE](https://btholt.github.io/complete-intro-to-databases/hasura)

ALI NIJE FUNKCIONISALO ONO STO JE HTEO DA PODESI BRIAN HOLT

ZATO SAM ISKOTRISTIO NACIN KOJI JE [OBJASNJEN OVDE](https://hasura.io/docs/latest/graphql/core/deployment/deployment-guides/docker.html#run-hasura-graphql-engine-using-docker)

## UZECU JEDAN DOCKER COMPOSE YAML FILE, KOJEM JE ULOGA DA KREIRA DVA CONTAINERA, U JEDNOM CE BITI POSTGRES, A U DRUGOM HASURA

UGLAVNOM DOWNLOAD-OVAO SAM SLEDECI FILE

- `cat docker-compose.yaml`

```zsh
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







AKO SI UGASIO CONTAINER SA INSTANCOM, [PONOVO GA POKRENI, I UDJU U POSTGRES CLI](https://github.com/Rade58/databases-playground/tree/1_0_1_PostgreSQL#postgresql)

[KREIRAJ DATABASE](https://github.com/Rade58/databases-playground/tree/1_0_1_PostgreSQL#mi-cemo-kreitrati-novi-database-koji-cemo-nazvati-message_boards) message_boards

[KONEKTUJ SE NA NJEGA](https://github.com/Rade58/databases-playground/tree/1_0_2_CREATING_TABLES_AND_RECORDS_IN_PostgreSQL)

I [KREIRAJ TABLE-OVE, I POPULATE-UJ IH SA RECORDIMA](sample-postgresql.sql)

SADA MOZEMO DA POKRENEMO CONTAINER U KOJEM JE HASURA

# JA CU DAKLE POKRENUTI CONTAINER SA HASUROM, KOJOJ MORAM OBEZBEDITI KONEKCIJU DO MOG DATBASE-A

SECRET SA KOJI MSAM RUNN-OVAO POSTGRES MORAM I OVDE OBEZBEDITI: TO JE STRING `"schism"`

IMAGE KOJI CE BITI DOWNLOADED I KOJI CE BITI RUNNED JESTE `hasura/graphql-engine:v1.3.3`

- `

docker run -d -p 8080:8080 \
  -e HASURA_GRAPHQL_DATABASE_URL=postgresql://postgres:schism@host.docker.internal:5432/message_boards \
  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true --name=my-hasura --rm \
  hasura/graphql-engine:v1.3.2

`

NAKON OVOGA GRAPHQL PLAYGROUND BICE EXPOSED NA: <http://localhost:8080>


