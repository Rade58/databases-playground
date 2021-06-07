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

# `findOne`

**SADA ZELIM DA UZMEM NEKI DOKUMENT, IZ "pets" KOLEKCIJE**

**UZIMA SE FIRST DOCUMENT IN A COLLECTION KOJI ZADOVOLJAVA QUERY**

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

MOGAO SAM DA BUDEM NESTO VISE SPECIFIC U QUERY-JU

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

# `find`

UZECU VISE DOKUMENATA, JEDNE KOLEKCIJE

I OVO

- `db.pets.find()`

A I OVO

- `db.pets.find({})`

CE ITERATOVATI ALL DOCUMENTS IN A COLLECTION

**KAO STO VIDIS, NISAM STAVIO NIKAKAV QUERY, I ZATO DAJE NIZ SVIH DOKUMNATA DATBASE-A**

# `insertMany`

DAKLE METODA KOJOJ DAJEM ARRAY JAVASCRIPT DOKUMENATA, A KOJI CE BITI UNETI U KOLEKCIJU

SADA CEMO DA UBACIMO MNOSTVO DOKUMENATA, U KOLEKCIJU, KAKO BI SMO IMALI DOSTUPNE MNOGE DOKUMENTE ZA QUERYING

- `
db.pets.insertMany(
  Array.from({ length: 10000 }).map((_, index) => ({
    name: [
      "Luna",
      "Fido",
      "Fluffy",
      "Carina",
      "Spot",
      "Beethoven",
      "Baxter",
      "Dug",
      "Zero",
      "Santa's Little Helper",
      "Snoopy",
    ][index % 9],
    type: ["dog", "cat", "bird", "reptile"][index % 4],
    age: (index % 18) + 1,
    breed: [
      "Havanese",
      "Bichon Frise",
      "Beagle",
      "Cockatoo",
      "African Gray",
      "Tabby",
      "Iguana",
    ][index % 7],
    index: index,
  }))
);    
`

DAKLE OVO CE UNETI 10000 DOKUMENATA U pets KOLEKCIJU, A UNOSI CE BITI RANDOMIZED

DAKLE IMAM 10000 RECORDS IN MY DATABASE