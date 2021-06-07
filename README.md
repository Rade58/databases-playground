# MONGODB LOGICAL OPERATORS

AKO NA PRIMER ZELIS DA QUERY-UJES ZA PETS, KOJI SU BETWEEN AGE 4 AND 8; **E PA U TAKVOM QUERY-JU BI MORAO DA PROVIDE-UJES LOGICKI OPRATOR A ONDA BI TK KORISTIO [query operators](https://github.com/Rade58/databases-playground/tree/0_0_2_QUERYING_MongoDB#query-operators), ODNOSNO `$lte` I `$gte`**

LOGICKI OPERATOR U OVOM SLUCAJU JE `$and`

- `db.pets.count({type: "bird", $and: [{age: {$lte:8}}, {age: {$gte:4}}] })`

KAO STO VIDIS GORE MORAO SI DA PROVIDE-UJES ARRAY

**POSTOJE `$or` ,A POSTOJI I `$not`**