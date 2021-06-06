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
> Math.floor(4.4)
4
```

## KADA GOVORIMO O KOLEKCIJA, MOZEMO RECI DA SE KOLEKCIJA SASTOJI OD DOKUMENATA

ALI DOKUMENTE, NEKI NAZIVAJU I `RECORDS`

# SADA CU U DATBASE-U `adoption`, DODATI PAR DOKUMNATA, U KOLEKCIJU `pets`

DAKLE U PITANJU JE JAVASCRIPT

- `db.pets.insertOne({name: "Stavros", type: "parot", breed: "ara", age: "8"})`

```zsh
{
        "acknowledged" : true,
        "insertedId" : ObjectId("60bd04a70d21879dbcbd52b6")
}
```

MONGO IMA INTERNAL ID SYSTEM, KAO STO VIDIS BLOB JE AUTOMATSKI ZADAT

# SADA CU DA VIDIM KOLIKO DOKUMENATA IMAM U `pets` KOLEKCIJI

ALI A VIDIM SADA KOJE DATBASE-OVE IMAM

- `show dbs`

```zsh
admin     0.000GB
adoption  0.000GB
config    0.000GB
local     0.000GB
```

PA DA VIDIM KOJE KOLEKCIJE IMAM U adoption DATABASE-U

- `show collections`

```zsh
pets
```

E SADA DA VIDIM KOLIKO RECORD-A, ODNOSNO DOKUMENATA IMA

- `db.pets.count()`

```zsh
1
```

# HELP

- `db.<ime kolekcije>.help()`

VIDECES KOJE SVE QFUNKCIJE MOZES DA RUNN-UJES NA KOLEKCIJI

A AKO ZELIS DA VIDS STA MOZES DA IZVRSAVAS NA SAMOM DATBASE-U, KUCAS

- `db.help()`

EVO NAPRIMER DA VIDIM STATS, ZA MOJ DATBASE

- `db.stats()`

```zsh
{
        "db" : "adoption",
        "collections" : 1,
        "views" : 0,
        "objects" : 1,
        "avgObjSize" : 84,
        "dataSize" : 84,
        "storageSize" : 20480,
        "indexes" : 1,
        "indexSize" : 20480,
        "totalSize" : 40960,
        "scaleFactor" : 1,
        "fsUsedSize" : 725873471488,
        "fsTotalSize" : 983427170304,
        "ok" : 1
}
```