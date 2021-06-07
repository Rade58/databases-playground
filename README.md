# UPSERT

U SUSTINI OVO ZNACI **POKUSAJ DA PRONADJES NESTO, AKO POSTOJI UPDATEDUJ, A AKO TOGA NEMA, TI INSERTUJ**

U SUSTINI TO JE JEDNA OPCIJA KOJA SE PODESAVA, KAO TRECI ARGUMENT, `updateOne` ILI `updateMany` METODE

- `db.pets.updateOne({name: "Stavros"}, { $set: {ocupation: "podcster"}}, {upsert: true})`

```zsh
{
        "acknowledged" : true,
        "matchedCount" : 0,
        "modifiedCount" : 0,
        "upsertedId" : ObjectId("60be227100dc5889eae1029c")
}
```

DAKLE NIJE POSTOJA RANIJE ALI JE INSERTED, HAJDE DA GA PRONADJEMO

- `db.pets.findOne({name: "Stavros"})`

```zsh
{
        "_id" : ObjectId("60be227100dc5889eae1029c"),
        "name" : "Stavros",
        "ocupation" : "podcster"
}
```
