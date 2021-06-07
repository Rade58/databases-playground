# TEXT SEARCH INDEXES

AKO ZELIS DA IMAS MOGUCNOST SERCH-A PREMA TEXTU

ODNOSNO AKO NA PRIMER NA SITE-U IMAS NEKI FREE FORM GDE KORISNIK MOZE TRAZITI PREMA TEKSTU, NA PRIMER ON JE KUCAO U TAJ FIELD: "Havanese dog 8", ODNOSNO ON ZELO DA TAKO PRONADJE ODGOVARAJUCEG PASA

**MI CEMO ALLOW-OVATI DA SU FIELD-OVI type, breed I age USTVARI TEXT SEARCH INDEXED**

- `db.pets.createIndex({type: "text", name: "text", breed: "text"})`

```zsh
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 2,
        "numIndexesAfter" : 3,
        "ok" : 1
}
```

OVO JE KREIRALO NOVI INDEX, KOJI CONTAIN-UJE SVE STVARI KOJE SAM DEFINISAO

ISTO TAKO OVO SI SMEO SAMO DA URADIS JDNOM, **MOZS IMATI SAMO JEDAN TEXT SEARCH INDEX PER COLLECTION**

# SADA MOZES DA KORISTIS `$text` I `$search`, KADA QUERY-UJES

- `db.pets.find({$text: {$search: "Havanese Luna dog"}})`

I OVO JE NASLO MNOSTVO DOKUMENATA, KOJI ZADOVOLJAVAJU TEXT SERCH

ALI NISTA NIJE SORTED

# DA BI SORT-OVALI MORAMO KORISTITI `sort` METODU, SA `score` PARAMETROM, ALI MORAMO KORISTI POSEBAN OPERATOR, KAO STO JE `$meta`

- `db.pets.find({$text: {$search: "Havanese Luna dog"}}).sort({score: {$meta: "textScore"}})`

```zsh
{ "_id" : ObjectId("60be58108696f2886abf2a1d"), "name" : "Luna", "type" : "dog", "age" : 1, "breed" : "Havanese", "index" : 9828 }
{ "_id" : ObjectId("60be58108696f2886abf1571"), "name" : "Luna", "type" : "dog", "age" : 1, "breed" : "Havanese", "index" : 4536 }
{ "_id" : ObjectId("60be58108696f2886abf2729"), "name" : "Luna", "type" : "dog", "age" : 1, "breed" : "Havanese", "index" : 9072 }
{ "_id" : ObjectId("60be58108696f2886abf07a9"), "name" : "Luna", "type" : "dog", "age" : 1, "breed" : "Havanese", "index" : 1008 }
{ "_id" : ObjectId("60be58108696f2886abf1d51"), "name" : "Luna", "type" : "dog", "age" : 1, "breed" : "Havanese", "index" : 6552 }
{ "_id" : ObjectId("60be58108696f2886abf1e4d"), "name" : "Luna", "type" : "dog", "age" : 1, "breed" : "Havanese", "index" : 6804 }
{ "_id" : ObjectId("60be58108696f2886abf1181"), "name" : "Luna", "type" : "dog", "age" : 1, "breed" : "Havanese", "index" : 3528 }
// ...
// ...
// ...
```

ZNATNO BOLJI REZULTAT