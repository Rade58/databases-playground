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

SADA MOZEMO DA UZMEMO SVE NODE-OVE (KARAKTERE )

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


