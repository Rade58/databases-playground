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

ALI OVO MOZE BITI I DOWNFALL U ISTO VREME, JER JE LAKO NAPRAVITI TYPO I TAKO INSERT-OVATI NESTO POD POGRESNIM IMENOM I SLICNO

DAKLE GUARD RAILS ARE OFF I MOZES DA RADIS STA HOCES, I TO PONEKA MILI CESTO MOZE BITI POINT OF MISTAKE

# POSTOJ I I INCREMENTING OPERTOR (`$inc`), STO TI OMOGUCAVA ACROSS MANY DOCUMENTS, TI INCREMENT-UJES SAME NUMBER FIELD; MOZES ZADATI INCREMENTIG U BILO KOM AMOUNT-U

- `db.pets.updateMany({type: "cat"}, {$inc: {age: 10}})`

KAO STO MOZES VIDETI IZ OUTPUTA, OVO SI URADIO ZA 2500 DOKUMENATA

```zsh
{ "acknowledged" : true, "matchedCount" : 2500, "modifiedCount" : 2500 }
```

# EVO TI LINK I ZA DRUGE UPDATING OPERATORE, JER IH IMA MNOGO

[UPDATING OPERATORS](https://docs.mongodb.com/manual/reference/operator/update/#id1)

CAK POSTOJI I $rename OPERATOR, KOJI MOZES KORISTITI ZA RENAMING FIELD-OVA, ALI I $unset, KOJIM MOZES KOMPLETNO DELET-OVATI FIELD