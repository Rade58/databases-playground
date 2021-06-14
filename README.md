# QUERYING WITH MATCH AND CONSTRAINT

SADA CEMO NAPRAVITI QUERY ZA SVIM RELATIONSHIP-OVIMA, KOJE SMO NAPRAVILI U PROSLOM BRANCH-U, PAST-UJUCI IN ONIH NEKOLIKO KLUZULA KOJIMA SMO KREIRALI RELATIONSHIPS

- `MATCH (p: Person)-[r: ACTED_IN]->(m: Movie) RETURN r;`

```zsh
+-----------------------------------------+
| r                                       |
+-----------------------------------------+
| [:ACTED_IN {roles: ["Scott Pilgrim"]}]  |
| [:ACTED_IN {roles: ["Scott Pilgrim"]}]  |
| [:ACTED_IN {roles: ["Stacey Pilgrim"]}] |
| [:ACTED_IN {roles: ["Envy Adams"]}]     |
| [:ACTED_IN {roles: ["Julie Powers"]}]   |
| [:ACTED_IN {roles: ["Ramona Flowers"]}] |
| [:ACTED_IN {roles: ["Wallace Wells"]}]  |
| [:ACTED_IN {roles: ["Lucas Lee"]}]      |
+-----------------------------------------+

8 rows available after 332 ms, consumed after another 32 ms
```

DAKLI MOGLI SMO DA QUERY-UJEMO ZA EDGES, ODNOSNO RELATIONSHIPS

SADA CEMO DODATI I WHERE KLAUZULU, KAKO BISMO QUERY-OVAL U ODNOSU NA RELATIONSHIP

- `MATCH (p: Person)-[r: ACTED_IN]->(m: Movie) WHERE p.name = 'Brie Larson' RETURN p;`

```zsh
+---------------------------------------------+
| p                                           |
+---------------------------------------------+
| (:Person {name: "Brie Larson", born: 1989}) |
+---------------------------------------------+

1 row available after 174 ms, consumed after another 7 ms
```

MI MO MOGLI RETURN-OVATI I m VARIJABLU, ILI r VARIJABLU

- `MATCH (p: Person)-[r: ACTED_IN]->(m: Movie) WHERE p.name = 'Brie Larson' RETURN r;`

```zsh
+-------------------------------------+
| r                                   |
+-------------------------------------+
| [:ACTED_IN {roles: ["Envy Adams"]}] |
+-------------------------------------+

1 row available after 145 ms, consumed after another 5 ms
```

- `MATCH (p: Person)-[r: ACTED_IN]->(m: Movie) WHERE p.name = 'Brie Larson' RETURN m;`

```zsh
+-----------------------------------------------------------------------------------------------------+
| m                                                                                                   |
+-----------------------------------------------------------------------------------------------------+
| (:Movie {tagline: "An epic of epic epicness.", title: "Scott Pilgrim vs the World", release: 2010}) |
+-----------------------------------------------------------------------------------------------------+

1 row available after 4 ms, consumed after another 12 ms
```

# MOZEMO DA QUERY-UJEMO ZA NODE-OVE, KOJI SU ASOCIATED WITH A RELATINSHIP, ALI I DA OMMIT-UJEMO NODE-OVE FROM RESULT

MISLIM DA CE TI BITNI JASNIJE KADA VIDIS KAKO SAM UPOTREBIO VARIJABLE

***

digresija:

ISTO TAKO, JASNO CE TI BITI DA TI NE MORAS SVE DA ASSIGN-UJES TO VARIABLES, JER ONO STO NECES UPOTREBLJAVATI U KLAUZULI, VEC SAMO REFERENCIRATI, NJEMU I NE TREBA VARIJABLA, KAO STO SI URADIO ZA Movie, ALI OVDE NISI RELATIONSHIP TAKODJE ASSIGN-OVAO TO THE VARIABLE

ISTO TAKO VIDIS DA SU PORED `->` DOZVOLJENE I STRELICE `<-`

***

A ZNAKOVI `<>` PREDSTAVLJAJU NEJEDNAKOST


- `MATCH (p:Person)-[:ACTED_IN]->(Movie)<-[:ACTED_IN]-(q: Person) WHERE p.name = "Chris Evans" AND q.name <> "Chris Evans" RETURN q.name;`

DOBICU SVE PERSONS KOJI NISU "Chris Evans"

```zsh
+---------------------------+
| q.name                    |
+---------------------------+
| "Kieran Culkin"           |
| "Mary Elizabeth Winstead" |
| "Aubrey Plaza"            |
| "Brie Larson"             |
| "Anna Kendrick"           |
| "Michael Cera"            |
| "Michael Cera"            |
+---------------------------+

7 rows available after 359 ms, consumed after another 16 ms
```