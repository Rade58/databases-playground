# QUERYING  MongoDB

I DALJE SMO U MONGODB SHELL-U INSIDE CONTAINER

I DALJE KORISTIMO DATABASE, KOJI SMO NAZVALI `adoption`

ALI MOZEMO OPET DA EXECUTE-UJEMO OVO, NECEMO POGRESITI

- `show dbs`

- `use adoption`

- `show collections`

```zsh
pets
```

**SADA ZELIM DA UZMEM NEKI DOKUMENT, IZ "pets" KOLEKCIJE**

- `db.pets.findOne()`

```zsh
{
        "_id" : ObjectId("60bd20f3e6e758fb3b29d46e"),
        "name" : "Stavros",
        "type" : "parot",
        "breed" : "ara",
        "age" : 8
}
```

DAKLE JA SAM ZADO QUERY DA UZMEM BILO KOJI DOKUMENT, A DAT MI JE ONAJ JEDINI DOKUMENT, KOJEG SAM STORE-OVAO

MOGAO SAM DA BUDEM NESTO VISE SPECIFIC U QUERY-JU

- `db.pets.findOne({})`

```zsh
{
        "_id" : ObjectId("60bd20f3e6e758fb3b29d46e"),
        "name" : "Stavros",
        "type" : "parot",
        "breed" : "ara",
        "age" : 8
}
```

- `db.pets.findOne({breed: "ara"})`

```zsh
{
        "_id" : ObjectId("60bd20f3e6e758fb3b29d46e"),
        "name" : "Stavros",
        "type" : "parot",
        "breed" : "ara",
        "age" : 8
}
```

EVO SADA CU NNAMERNO NAPRAVITI LOS QUERY KAKO NE BI NISTA NASAO

- `db.pets.findOne({type: "dog"})`

```zsh
null
```