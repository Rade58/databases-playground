# ADDING NODES AND RELATIONSHIPS IN Neo4j

KREIRACEMO NAS PRVI NODE

`p` REPREZENTUJE VARIJABLU, A `Person` JE LABEL ZA OVAJ PARTICULAR NODE, A U `{}` SU PROPERTIJI ILI ATRIBUTI, ZA PARTICULAR Person NODE

- `CREATE (p: Person {name: "Michael Cera", born: 1988});`

```zsh
Added 1 nodes, Set 2 properties, Added 1 labels
```

SADA CEMO DA UERY-UJEMO ZA PARTICULAR NODE WE CREATED

- `MATCH (p {name: "Michael Cera"}) RETURN p;`

```zsh
+----------------------------------------------+
| p                                            |
+----------------------------------------------+
| (:Person {name: "Michael Cera", born: 1988}) |
+----------------------------------------------+

1 row available after 121 ms, consumed after another 6 ms
```

KREIRACEMO JO JEDAN NODE

- `CREATE (m: Movie {title: "Scott Pilgrim vs the World", release: 2010, tagline: "An epic of epic epicness."}) RETURN m;`

```zsh
+-----------------------------------------------------------------------------------------------------+
| m                                                                                                   |
+-----------------------------------------------------------------------------------------------------+
| (:Movie {tagline: "An epic of epic epicness.", title: "Scott Pilgrim vs the World", release: 2010}) |
+-----------------------------------------------------------------------------------------------------+

1 row available after 98 ms, consumed after another 21 ms
Added 1 nodes, Set 3 properties, Added 1 labels
```

SADA MOZEMO DA UZMEMO SVE NODE-OVE (STAVIO SAM a, OVO IZGLEDA NIJE BITNO STA SE STAVLJA, JER TO JE VARIJABLA)

- `MATCH (a) RETURN a;`

```zsh
+-----------------------------------------------------------------------------------------------------+
| a                                                                                                   |
+-----------------------------------------------------------------------------------------------------+
| (:Person {name: "Michael Cera", born: 1988})                                                        |
| (:Movie {tagline: "An epic of epic epicness.", title: "Scott Pilgrim vs the World", release: 2010}) |
+-----------------------------------------------------------------------------------------------------+

2 rows available after 74 ms, consumed after another 5 ms
```

# SADA CEMO DA NAPRAVIMO RELATIONSHIP IZMEDJU DVA NODE-A KOJA SMO NAPRAVILI

MEDJUTIM, MI U TOJ KLAUZULI MORAMO I QUERY-OVATI ZA POMENUTIM NODE-OVIMA

- `MATCH (person: Person), (movie: Movie) WHERE person.name = "Michael Cera" AND movie.title = "Scott Pilgrim vs the World" CREATE (person)-[relationship: ACTED_IN {roles: ["Scott Pilgrim"]}]->(movie) RETURN relationship;`

releationship PREDSTAVLJA VARIJABLU, TI SI TO MOGAO NZVATI KAKO GOD

**`ACTED_IN` MEDJUTIM PREDSTAVLJA TYPE OF RELATIONSHIP; PREDPOSTAVLJAM A SMO TO MI ISTO SMISLILI JER SE OVDE RADI O RELATIONSHIPPU IZMEDJU ACTORA AND THE MOVIE-A**

A VIDEO SI I DA SAM RELATIONSHIP MOZE IMATI PROPERTIES AT ITS OWN ,MI SMO DODALI SAMO roles, IAKO SMO MOGLI IMATI KOLIKO GOD HOCEMO

VIDIS U GORNJOJ SINTKSI KAKO SAM KORISTIO `-` I `->`, ODNOSNO NA KOJIM MESTIMA, ILI STRNAMA

EVO KOJI JE OUTPUT GORNJE KOMANDE

```zsh
+----------------------------------------+
| relationship                           |
+----------------------------------------+
| [:ACTED_IN {roles: ["Scott Pilgrim"]}] |
+----------------------------------------+

1 row available after 284 ms, consumed after another 54 ms
Created 1 relationships, Set 1 properties
```
