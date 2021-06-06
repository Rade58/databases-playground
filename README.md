# MongoDB

MI CEMO RUNN-OVATI DOCKER CONTAINER, U KOJEM CE RUNN-OVATI MONGODB VERZIJA `4.4.1` (TA JE VERZIJA DA NE BI ODSKAKO OD WORKSHOP-A)

VIDIS KAKO MAP-UJES PORTS, ONAJ NA KOJEM CE MONGO BITI SERVED U CONTAINER-U, MAP-UJES NA PORT KOD TEBE LOKALNO (ZADAO SAM DA LOKALNO TO BUDE PORT 27017) (--rm ZNACI DA SE SE SVE CLEN-UJE UP KAD SE ZAVRSI (PREDPOSTAVLJAM DA TO ZNACI UNISTAVANJE VIRTUAL MACHINE-A I DATBASE-A)) (ZA OSTALI INFO [POGLEDAJ OVO](https://docs.docker.com/engine/reference/commandline/run/))

- `docker run --name test-mongo -dit -p 27017:27017 --rm mongo:4.4.1`

OVO GORE BI BI TREBALO DA DOWNLOAD-UJE VALID IMAGE I DA POKRENE VIRTUAL MACHINE SA MONGODB INSTANCOM

A AKO SI ZABORAVIO KAKO SE ZAUSTAVLJA CONTAINER, [POGLEDAJ OVDE](https://github.com/Rade58/exploring_docker/tree/2_4_STOPPING_CONTAINERS)

DA PROVERIMO DA LI IMAMO RUNNING CONTAINER

- `docker ps`

```zsh
CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS                                           NAMES
e5080f752676   mongo:4.4.1   "docker-entrypoint.s…"   18 minutes ago   Up 18 minutes   0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   test-mongo
```

SADA CEMO DA POKRENEMO `mongo` EXECUTABLE U CONTAINERU DA BISMO MOGLI DA PRISTUPIMO INTERACTVE MONGODB SHELL-U

- `docker exec -it test-mongo mongo`

# SADA MOZEMO DA PISEMO QUERY-JE

- `show dbs`

```zsh
admin   0.000GB
config  0.000GB
local   0.000GB
```

MONGO IMA DVA KLJUCNA KONCEPTA, A TO JE `DATBASE` I TO JE `COLLECTION`; ZA RAZLIKU OD POSTGRESA I MSQL-A, GDE JE *DATABASE TABLE*, USTVARI KLJUCNI KONCEPT

# KREIRACU NOVI DATBASE

- `use adoption`

```zsh
switched to db adoption
```

**A POSTO JE QURY LANGUAGE ZA MONGODB, USTVARI SAMI JAVASCRIPT, JA MOGU PISATI I JAVASCRIPT U SHELL-U**

```zsh
> 2 + 2
4
> Date.now()
1622999563118
```