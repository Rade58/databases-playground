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

CE ITERATOVATI VISE DOKUMENATA MOJE KOLEKCIJA (ALI SAMO CE ITERATE-OVATI 20 AT THE TIME)

# `insertMany`

DAKLE METODA KOJOJ DAJEM ARRAY JAVASCRIPT DOKUMENATA, A KOJI CE BITI UNETI U KOLEKCIJUgi

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

# `count`

- `db.pets.count()`

```zsh
10001
```

# SADA IMAMO ST DA QUERY-UJEMO

KORISCENJEM VEC POMENUTIH METODA

- `db.pets.find({name: "Spot"})`

OVO TI NECE DATI ALL RECORDS AT ONCE, VEC 20 AT THE TIME

# MORACES DA KUCAS `it` DA DOBIJES MORE

TO JE USTVARI UPOTREBLJEN CURSOR, KOJI PRATI KOLIKO SI ITERATE-OVAO, I GDE SE ZAUSTAVIO ITERATION

- `it`

`"it"` ZNACI ITERATE

I DOBICES NOVIH 20

## ILI MOZDA ZELIMO DA VIDIMO KOLIKO IMA DOKUMENATA, KOJE CE PRONACI QUERY KOJI CEMO PROVIDE-OVAATI

- `db.pets.count({breed: "Iguana", age: 8})`

```zsh
69
```

# `limit`

- `db.pets.find({type: "cat"}).limit(8)`

A UZEO SAM SAMO OSAM DOKUMENATA, II SADA VISE NEMAS OPCIJU DA MOZES DA KUCAS `it`

# `find` ITER-UJE, KAO STO SI VIDEO; A DA DOBIJES ACTUAL ARRAY, KORISTIO BI `toArray`

- `db.pets.find({type: "cat"}).limit(8).toArray()`

I OUTPUTED JE ARRAY ITEM-A

SKUP QUERY, KOJI BI NARAVNO BIO LOS, BI BIO NA PRIMER UZIMANJE 500 ITEMA OD JEDNOM, I AKO NA PRIMER IMAS 10000 USERA, I IZA SVAKOG USERA DA SE RADI TAKVO NESTO, TO BI BILO VEOMA VEOMA SKUPO, I ZATO VELIKE APLIKACIJE, POPUT REDDIT-A IMAJU EXPENSIVE QUERY-JE, KOJI U CENI PREMASUJU OSTALE STVARI, POPUT ENE HOSTING-A

# QUERY OPERATORS

# SADA CEMO NAPISATI QUERY U KOJEM CEMO KORISTITI OPERATOR GREATHER THAN (`$gt`), A MOZES GORITITI GRATHER THAN AND EQUAL TO (`$gte`)

TRAZIMO SVE DOGS, KOJI IMAJU DVE GODINE, ALI I ONE KOJI SU STARIJI OD DVE GODINE

- `db.pets.count({type: "dog", age: {$gte: 2}})`

```zsh
2069
```

NARAVNO, POSTOJE I OPERATORI `$lt` I `$lte`

**A AKO HOCES DA BUDES VERBOSE, MOZES DA KORISTIS I EQUAL TO, ODNOSNO `$eq`**

MOZES DA KORISTIS I NEGACIJU `$ne`, ODNONO NOT EQUAL
