# AGGREGATION

NECU TI DAVATI OBJASNJENJE, JER [O TOME MOZES PROCITATI OVDE](https://btholt.github.io/complete-intro-to-databases/aggregation)

POSTAVICU PROBLEM, KOJI OVO STO CU URADITI MOZE RESITI

ZELIM DA SAZNAM KOLIKO ANIMALA-A, KOJI SU "dog" type-A, SU USTVARI U STATUS-U SENIORA, ODNOSNO, STARIJIH SU OD 12 GODINA

MORACEMO GRUPISATI PEMA age-U, I PODESICEMO BOUNDARIES, DA IMAMO VISE GRUPE SA RAZLICITIM RASPONIMA GODINA

- `

db.pets.aggregate([
  {
    $match: {
      type: "dog"
    }
  },
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [0, 3, 9, 12],
      default: "12+",
      output: {
        count: {$sum: 1}
      }
    }
  }
])

`

DOBICES OVO

```zsh
{ "_id" : 0, "count" : 278 }
{ "_id" : 3, "count" : 834 }
{ "_id" : 9, "count" : 555 }
{ "_id" : "12+", "count" : 833 }
```

IMAS 833 SENIOR DOG-OVA

# OVDE SMOIMALI DVA STAGE-A, OD KOJIH JE JADAN BIO QUERYING PREMA type FILELDU DOKUMENTA, PA DRUGI STAGE, JE BILO GRUPISANJE; ALI MOZEMO DODATI JOS STAGE-OVA, NA PRIMER DA ZELIM DA SORT-UJEM, KOJA JE GRUPA NAJBROJNIJA

- `

db.pets.aggregate([
  {
    $match: {
      type: "dog"
    }
  },
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [0, 3, 9, 12],
      default: "12+",
      output: {
        count: {$sum: 1}
      }
    }
  },
  {
    $sort: {
      count: -1
    }
  }
])

`

I NAJBROJNIJA GRUPA JE ONIH PASA KOJI SU STARI OD 3 DO 9 GODINA 

```zsh
{ "_id" : 3, "count" : 834 }
{ "_id" : "12+", "count" : 833 }
{ "_id" : 9, "count" : 555 }
{ "_id" : 0, "count" : 278 }
```

# KAO STO SI VIDEO OVO VEC ULAZI U "DATA SCIENCY" STUFF

[POSTOJI MNOGO STAGE-OVA, KOJE MOZES VIDETI OVDE](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)
