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

## OVO JE DOBRA PRAKSA, JER SE SVTUJE, DA SAMO INCLUDE-UJES ONE STVARI KOJE SU TI POTREBNE



