# POSTOJI I SET METODA `findOneAnd<Delete,Update, Replace>`

U SUSTINI RADE ISTO KAO STO RADE I `updateOne` `deleteOne` `replaceOne`

UKLONICU JEDAN

- `db.pets.findOneAndDelete({type: "reptile", name: "Fido"})`

```zsh
{ "acknowledged" : true, "deletedCount" : 1 }
{
        "_id" : ObjectId("60be200afca169101def4d4a"),
        "name" : "Fido",
        "type" : "reptile",
        "age" : 2,
        "breed" : "Tabby",
        "index" : 19
}
```

ZA RAZLIKU OD `deleteOne`, GORNJA METODA RETURN-UJE DELETED DOCUMENT

DAKLE DOCUMENT JE DAT PRE UPDATINGA, REPLACEMENTA-A, ILI DELETION-A