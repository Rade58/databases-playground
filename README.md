# AGGREGATION

NECU TI DAVATI OBJASNJENJE, JER [O TOME MOZES PROCITATI OVDE](https://btholt.github.io/complete-intro-to-databases/aggregation)

POSTAVICU PROBLEM, KOJI OVO STO CU URADITI MOZE RESITI

ZELIM DA SAZNAM KOLIKO ANIMALA-A, KOJI SU "dog" type-A, SU USTVARI U STATUS-U SENIORA, ODNOSNO, STARIJIH SU OD 12 GODINA

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