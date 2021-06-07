# UPDATING MONGODB

VEC SMO SE UPOZNALI SA `insert`*, SA `insertOne` I `insertMany` ,KOJE SLUZE SA PRAVLJANJE DOKUMANTA U KOLEKCIJI, A UPOZNALI SMO SE I SA QUERY METODAMA `find` I `findOne`

***

**`insert` JE OLD WAY OF DOING IT, I NE PRPORUCUJE SE ,I NAJVISE LJUDI GRESI A NJIM**

***

UPDATING METODE KOJE UZIMAJU QUERY ZA PRONALAZENJE, A DRUGI ARGUMENT JE UPDATE, KOJ IPROVIDE-UJES, SU SLEDECE METODE

`updateMany` I `updateOne`

DAKLE, DEO ZA QUERYING FUNKCIONISE ISTO KAO ZA find ILI findOne

DOK ONAJ DRUGI DEO, ODNOSNO DRUGI ARGUMENT JRESTE UPDATE

**ALI KORISTI SE `$set` OPERATOR**, STO U SUSTIN IRADI Object.assign

- `db.pets.updateOne({type: "dog"}, {$set: {owner: "Rade"}})`

```zsh
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
```

MOZES PROBATI DA PRONADJES DOKUMENT, KOJI SI MODIFIKOVAO

- `db.pets.findOne({owner:  "Rade"})`

```zsh
{
        "_id" : ObjectId("60bdf44ca031a28949020195"),
        "name" : "Luna",
        "type" : "dog",
        "age" : 1,
        "breed" : "Havanese",
        "index" : 0,
        "owner" : "Rade"
}
```

## MI RANIJE KADA SMO DODALI OGROMAN BROJ DOKUMENATA pets KOLEKCIJE, NISMO NI JEDNOM DOKUMENTU PODSILI owner FIELDD

ALI SADA JESMO TO URADILI

**I TO JE LEPOTA MONGO-A**, MOZES DA DAODAJES I RADIS STA HOCES, MOZES U BILLO KOJI DOKUMENT DA DODAS STA GOD HOCES