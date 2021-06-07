# INDEXES MONGODB

I OVO POSTOJI U SVIM DATBASE-OVIMA

NECES ODJEDNOM UZIMATI 1000000 DOKUMENATA IZ `pets` KOLEKCIJE, JER TO MOZE BITI SLOW

ZATO JE BOLJEE DA SE DEFINISU SHORTCUTS, DA NE MORA DATABASE DA POGLEDA EVERY SINGLE DOCUMENT

EVO JA ZA SADA IMAM NEKIH 10000 DOKUMENATA U KOLEKCIJI, I TO NIJE NISTA PROBLEMATICNO ZA MONGO, JER ON MOZE HANDLE-OVATI MILIJARDE BEZ PROBLEMA

**KAKO BI VIDEO KAKO CE MONGO PRAVITI QUERY, KORISTICU explain METODU**

- `db.pets.find({name: "Fido"}).explain("executionStats")`

```zsh
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "adoption.pets",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "name" : {
                                "$eq" : "Fido"
                        }
                },
                "winningPlan" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                                "name" : {
                                        "$eq" : "Fido"
                                }
                        },
                        "direction" : "forward"
                },
                "rejectedPlans" : [ ]
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 1110,
                "executionTimeMillis" : 15,
                "totalKeysExamined" : 0,
                "totalDocsExamined" : 9999,
                "executionStages" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                                "name" : {
                                        "$eq" : "Fido"
                                }
                        },
                        "nReturned" : 1110,
                        "executionTimeMillisEstimate" : 2,
                        "works" : 10001,
                        "advanced" : 1110,
                        "needTime" : 8890,
                        "needYield" : 0,
                        "saveState" : 10,
                        "restoreState" : 10,
                        "isEOF" : 1,
                        "direction" : "forward",
                        "docsExamined" : 9999
                }
        },
        "serverInfo" : {
                "host" : "79bcd999ea8d",
                "port" : 27017,
                "version" : "4.4.1",
                "gitVersion" : "ad91a93a5a31e175f5cbf8c69561e788bbc55ce1"
        },
        "ok" : 1
}
```

`"COLLSCAN"` JE WORST CASE SCENARIO, ZA GORNJI FIELD `"winningPlan"` (GORE JE PRIKAZAN), A TO ZNACI DA JE DATBASE PRETRAZIO EVERY SINGLE ITEM IN THE COLLECTION (PISE GORE `"docsExamined" : 9999`)

AKO TVOJ KORISNIK RADI OVO JEDNOM DNEVNO, TO BI BILO OKA, ALI AKO AKO SE PODACI ZAHTEVAJU EVERY COUPLE OF MINUTES ILI JOS GORE SECONDS, OVO GORE JE PROBLEMATICNO

# JA CU SADA KREITRATI INDEX

TI OVO NEMOJ DA RADIS IN PRODUCTION JER JE OVO HEAVY STVAR

OVO MOZE IZAZVATI DOWNTIME

JA CU TO RADITI ZA BLIZU 10000 ITEMA

I TO NECE SADA BITI PROBLEMATICNO, ALI TI OVO NEMOJ RADITI U PRODUCTION-U, POGOTOVO AKO IMAS VELIKI DATABASE

JER TO MOZE TAKE DOWN-OVATI, TVOJ ENTIRE APP

- `db.pets.createIndex({name: 1})`

```zsh
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}

```

DA OPET POKRENEMO FIND KOMANDU SA EXECUTION STATS

- `db.pets.find({name: "Fido"}).explain("executionStats")`

```zsh
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "adoption.pets",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "name" : {
                                "$eq" : "Fido"
                        }
                },
                "winningPlan" : {
                        "stage" : "FETCH",
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "name" : 1
                                },
                                "indexName" : "name_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "name" : [
                                                "[\"Fido\", \"Fido\"]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 1110,
                "executionTimeMillis" : 40,
                "totalKeysExamined" : 1110,
                "totalDocsExamined" : 1110,
                "executionStages" : {
                        "stage" : "FETCH",
                        "nReturned" : 1110,
                        "executionTimeMillisEstimate" : 17,
                        "works" : 1111,
                        "advanced" : 1110,
                        "needTime" : 0,
                        "needYield" : 0,
                        "saveState" : 2,
                        "restoreState" : 2,
                        "isEOF" : 1,
                        "docsExamined" : 1110,
                        "alreadyHasObj" : 0,
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "nReturned" : 1110,
                                "executionTimeMillisEstimate" : 15,
                                "works" : 1111,
                                "advanced" : 1110,
                                "needTime" : 0,
                                "needYield" : 0,
                                "saveState" : 2,
                                "restoreState" : 2,
                                "isEOF" : 1,
                                "keyPattern" : {
                                        "name" : 1
                                },
                                "indexName" : "name_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "name" : [
                                                "[\"Fido\", \"Fido\"]"
                                        ]
                                },
                                "keysExamined" : 1110,
                                "seeks" : 1,
                                "dupsTested" : 0,
                                "dupsDropped" : 0
                        }
                }
        },
        "serverInfo" : {
                "host" : "79bcd999ea8d",
                "port" : 27017,
                "version" : "4.4.1",
                "gitVersion" : "ad91a93a5a31e175f5cbf8c69561e788bbc55ce1"
        },
        "ok" : 1
}
```

KAO STO VIDIS GORE winningPlan JE BIO "FETCH", I OVO JE BIL OWAY FASTER

A IMAS I OVO: "docsExamined" : 1110

STO ZNACI DA JE EXAMINED ZNATNO MANJE

TOLIKI BROJ I PET-OVA IMA name: "Fido"

# DA PROVERIMO KOJ ISU FIELD-OVI INDEXED

- `db.pets.getIndexes()`

KAO STO VIDIS _id JE UVEK INDEXED; A MI SMO MALOCAS OMOGUCILI INDEXES ZA name FIELD

```zsh
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_"
        },
        {
                "v" : 2,
                "key" : {
                        "name" : 1
                },
                "name" : "name_1"
        }
]
```

# COMPOUND INDEXS

NA PRIMER TI CESTO QUERY-UJES PREMA DVA FIELD-A, TO MOGU BITI name I age NA PRIMER

CESTO LJUDI PRVO KORISTE SVOJ DATBASE I VIDE, KAKAVE QUERY-JE PRAVE, PA NAKNADNO ONDA ALLOW-UJU INDEX-E, ZA ODREDJENE FIELD-OVE

# UNIQUE INDEXES

TO RADIS KADA METODI `createIndex` DODAS DRUGI OBJECT ARGUMENT, SA VREDNOSCU `unique: true`
