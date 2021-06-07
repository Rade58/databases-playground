# PROJECTIONS

OVAJ KONCEPT POSTOJI U GOTOVO SVIM DATBASE-OVIMA, S KOJIMA CU SE DANAS UPOZNATI

SA OVOOM MOZES DEFINISATI, TACNO ONE FIELD-OVE KOJE ZELIS DA IMAJU QUERIED DOKUMENTI

DAKLE TI OVO KORISTIS AKO ZELIS DA SE U QUERIED REZULTATU OMMIT-UJU SOME FIELDS

ODNONO DEFINISES SAMO ONE KOJE ZELIS

**OVO ZADAJES KORISTECI DRUGI ARGUMENT, ZA `find` ILI `findOne`**

- `db.pets.find({}, {name: 1, age: 1}).limit(4).toArray()`

```zsh
[
        {
                "_id" : ObjectId("60bdf44ca031a28949020195"),
                "name" : "Luna",
                "age" : 1
        },
        {
                "_id" : ObjectId("60bdf44ca031a28949020196"),
                "name" : "Fido",
                "age" : 2
        },
        {
                "_id" : ObjectId("60bdf44ca031a28949020197"),
                "name" : "Fluffy",
                "age" : 3
        },
        {
                "_id" : ObjectId("60bdf44ca031a28949020198"),
                "name" : "Carina",
                "age" : 4
        }
]
```

U DOBIJENIM DOKUMENTIMA, IMACES DVA FIELD-A, KOJA SI NAVEO, PLUS _id ,KAO STO I SAM MOZES VIDETI GORE

A MOGAO SI DA ONEMOGUCIS INCLUDING `_id` ,TAKO STO BI OVO URADIO

- `db.pets.find({}, {name: 1, age: 1, _id: 0}).limit(4).toArray()`

```zsh
[
        {
                "name" : "Luna",
                "age" : 1
        },
        {
                "name" : "Fido",
                "age" : 2
        },
        {
                "name" : "Fluffy",
                "age" : 3
        },
        {
                "name" : "Carina",
                "age" : 4
        }
]
```

KAO STO VIDIS _id NIJE INCLUDED, JER SAM U PROJECTION-U PODESIO ZERO ZA _id

## OVO JE DOBRA PRAKSA, JER SE SVTUJE, DA SAMO INCLUDE-UJES ONE STVARI KOJE SU TI POTREBNE

# UMESTO PODESAVNAJ 0 I 1, MOZE SE KORISTITI O true I false

# ALI AKO PODESIS ODREDJENE STVARI NA flase, BICE INCLUDED SVE OSTALE STVARI, OSIM ONIH KOJE SI PROJECT-OVAO SA false

- `db.pets.find({}, {_id: false}).limit(4).toArray()`

U RECORDSIMA IMAS SVE OSIM _id FIELD-A

```zsh
[
        {
                "name" : "Luna",
                "type" : "dog",
                "age" : 1,
                "breed" : "Havanese",
                "index" : 0
        },
        {
                "name" : "Fido",
                "type" : "cat",
                "age" : 2,
                "breed" : "Bichon Frise",
                "index" : 1
        },
        {
                "name" : "Fluffy",
                "type" : "bird",
                "age" : 3,
                "breed" : "Beagle",
                "index" : 2
        },
        {
                "name" : "Carina",
                "type" : "reptile",
                "age" : 4,
                "breed" : "Cockatoo",
                "index" : 3
        }
]
```